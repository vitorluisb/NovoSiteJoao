import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { getCookie, setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";
import { 
  CreateLoveMessageSchema, 
  CreateProductSchema, 
  CreateServiceSchema,
  AdminLoginSchema 
} from "@/shared/types";

const app = new Hono<{ Bindings: Env; Variables: { adminUser: any } }>();

app.use("*", cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

// Middleware for admin authentication
const requireAuth = async (c: any, next: any) => {
  const sessionToken = getCookie(c, "admin_session");
  
  if (!sessionToken) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const db = c.env.DB;
  const session = await db.prepare(
    "SELECT s.*, u.email, u.name FROM admin_sessions s JOIN admin_users u ON s.admin_user_id = u.id WHERE s.session_token = ? AND s.expires_at > datetime('now') AND u.is_active = 1"
  ).bind(sessionToken).first();

  if (!session) {
    return c.json({ error: "Invalid session" }, 401);
  }

  c.set("adminUser", session);
  await next();
};

// Generate session token
function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Admin Authentication endpoints
app.post("/api/admin/login", zValidator("json", AdminLoginSchema), async (c) => {
  try {
    const db = c.env.DB;
    const { email, password } = c.req.valid("json");
    
    const user = await db.prepare(
      "SELECT * FROM admin_users WHERE email = ? AND is_active = 1"
    ).bind(email).first();
    
    if (!user || !await bcrypt.compare(password, user.password_hash as string)) {
      return c.json({ error: "Email ou senha inválidos" }, 401);
    }

    // Create session
    const sessionToken = generateSessionToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    await db.prepare(
      "INSERT INTO admin_sessions (admin_user_id, session_token, expires_at) VALUES (?, ?, ?)"
    ).bind(user.id, sessionToken, expiresAt.toISOString()).run();

    setCookie(c, "admin_session", sessionToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "Lax",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return c.json({ 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Erro interno do servidor" }, 500);
  }
});

app.post("/api/admin/logout", requireAuth, async (c) => {
  try {
    const sessionToken = getCookie(c, "admin_session");
    const db = c.env.DB;
    
    if (sessionToken) {
      await db.prepare("DELETE FROM admin_sessions WHERE session_token = ?")
        .bind(sessionToken).run();
    }

    setCookie(c, "admin_session", "", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 0,
      path: "/",
    });

    return c.json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    console.error("Logout error:", error);
    return c.json({ error: "Erro interno do servidor" }, 500);
  }
});

app.get("/api/admin/me", requireAuth, async (c) => {
  const user = c.get("adminUser");
  return c.json({ 
    user: { 
      id: user.admin_user_id, 
      email: user.email, 
      name: user.name 
    } 
  });
});

// Admin Love Messages management
app.get("/api/admin/love-messages", requireAuth, async (c) => {
  try {
    console.log("Admin fetching love messages...");
    const db = c.env.DB;
    
    // First check if we have any messages at all
    const countResult = await db.prepare("SELECT COUNT(*) as count FROM love_messages").first();
    console.log("Total messages in database:", countResult?.count);
    
    const { results } = await db.prepare(
      "SELECT * FROM love_messages ORDER BY created_at DESC"
    ).all();
    
    console.log("Messages fetched for admin:", results?.length || 0);
    console.log("Sample message:", results?.[0]);
    
    return c.json({ messages: results || [] });
  } catch (error) {
    console.error("Error fetching admin love messages:", error);
    return c.json({ error: "Failed to fetch messages", details: error.message }, 500);
  }
});

app.patch("/api/admin/love-messages/:id/approve", requireAuth, async (c) => {
  try {
    const db = c.env.DB;
    const id = c.req.param("id");
    
    await db.prepare(
      "UPDATE love_messages SET is_approved = 1, updated_at = datetime('now') WHERE id = ?"
    ).bind(id).run();
    
    return c.json({ message: "Mensagem aprovada com sucesso" });
  } catch (error) {
    console.error("Error approving message:", error);
    return c.json({ error: "Failed to approve message" }, 500);
  }
});

app.delete("/api/admin/love-messages/:id", requireAuth, async (c) => {
  try {
    const db = c.env.DB;
    const id = c.req.param("id");
    
    await db.prepare("DELETE FROM love_messages WHERE id = ?").bind(id).run();
    
    return c.json({ message: "Mensagem excluída com sucesso" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return c.json({ error: "Failed to delete message" }, 500);
  }
});

// Admin Products management
app.get("/api/admin/products", requireAuth, async (c) => {
  try {
    const db = c.env.DB;
    const { results } = await db.prepare(
      "SELECT * FROM products ORDER BY created_at DESC"
    ).all();
    
    return c.json({ products: results });
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});

app.post("/api/admin/products", requireAuth, zValidator("json", CreateProductSchema), async (c) => {
  try {
    const db = c.env.DB;
    const data = c.req.valid("json");
    
    const result = await db.prepare(
      "INSERT INTO products (name, description, price, image_url, category, created_at, updated_at) VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))"
    ).bind(data.name, data.description || null, data.price || null, data.image_url || null, data.category || null).run();
    
    return c.json({ 
      message: "Produto criado com sucesso",
      id: result.meta.last_row_id 
    }, 201);
  } catch (error) {
    console.error("Error creating product:", error);
    return c.json({ error: "Failed to create product" }, 500);
  }
});

app.patch("/api/admin/products/:id", requireAuth, zValidator("json", CreateProductSchema), async (c) => {
  try {
    const db = c.env.DB;
    const id = c.req.param("id");
    const data = c.req.valid("json");
    
    await db.prepare(
      "UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, category = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(data.name, data.description || null, data.price || null, data.image_url || null, data.category || null, id).run();
    
    return c.json({ message: "Produto atualizado com sucesso" });
  } catch (error) {
    console.error("Error updating product:", error);
    return c.json({ error: "Failed to update product" }, 500);
  }
});

app.delete("/api/admin/products/:id", requireAuth, async (c) => {
  try {
    const db = c.env.DB;
    const id = c.req.param("id");
    
    await db.prepare("DELETE FROM products WHERE id = ?").bind(id).run();
    
    return c.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return c.json({ error: "Failed to delete product" }, 500);
  }
});

// Admin Services management
app.get("/api/admin/services", requireAuth, async (c) => {
  try {
    const db = c.env.DB;
    const { results } = await db.prepare(
      "SELECT * FROM services ORDER BY created_at DESC"
    ).all();
    
    return c.json({ services: results });
  } catch (error) {
    console.error("Error fetching admin services:", error);
    return c.json({ error: "Failed to fetch services" }, 500);
  }
});

app.post("/api/admin/services", requireAuth, zValidator("json", CreateServiceSchema), async (c) => {
  try {
    const db = c.env.DB;
    const data = c.req.valid("json");
    
    const result = await db.prepare(
      "INSERT INTO services (name, description, price, duration, image_url, category, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))"
    ).bind(data.name, data.description || null, data.price || null, data.duration || null, data.image_url || null, data.category || null).run();
    
    return c.json({ 
      message: "Serviço criado com sucesso",
      id: result.meta.last_row_id 
    }, 201);
  } catch (error) {
    console.error("Error creating service:", error);
    return c.json({ error: "Failed to create service" }, 500);
  }
});

app.patch("/api/admin/services/:id", requireAuth, zValidator("json", CreateServiceSchema), async (c) => {
  try {
    const db = c.env.DB;
    const id = c.req.param("id");
    const data = c.req.valid("json");
    
    await db.prepare(
      "UPDATE services SET name = ?, description = ?, price = ?, duration = ?, image_url = ?, category = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(data.name, data.description || null, data.price || null, data.duration || null, data.image_url || null, data.category || null, id).run();
    
    return c.json({ message: "Serviço atualizado com sucesso" });
  } catch (error) {
    console.error("Error updating service:", error);
    return c.json({ error: "Failed to update service" }, 500);
  }
});

app.delete("/api/admin/services/:id", requireAuth, async (c) => {
  try {
    const db = c.env.DB;
    const id = c.req.param("id");
    
    await db.prepare("DELETE FROM services WHERE id = ?").bind(id).run();
    
    return c.json({ message: "Serviço excluído com sucesso" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return c.json({ error: "Failed to delete service" }, 500);
  }
});

// Public Love Messages endpoints
app.get("/api/love-messages", async (c) => {
  try {
    const db = c.env.DB;
    const { results } = await db.prepare(
      "SELECT * FROM love_messages WHERE is_approved = 1 ORDER BY created_at DESC LIMIT 50"
    ).all();
    
    return c.json({ messages: results });
  } catch (error) {
    console.error("Error fetching love messages:", error);
    return c.json({ error: "Failed to fetch messages" }, 500);
  }
});

// File upload endpoint for love messages
app.post("/api/love-messages/upload-image", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return c.json({ error: "Nenhuma imagem enviada" }, 400);
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return c.json({ error: "Apenas imagens são permitidas" }, 400);
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: "Imagem muito grande. Máximo 5MB." }, 400);
    }

    // Convert file to base64 data URL for storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const base64 = btoa(String.fromCharCode(...buffer));
    const dataUrl = `data:${file.type};base64,${base64}`;

    return c.json({ 
      message: "Imagem carregada com sucesso",
      imageUrl: dataUrl
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return c.json({ error: "Erro ao fazer upload da imagem" }, 500);
  }
});

// File upload endpoint for products
app.post("/api/admin/products/upload-image", requireAuth, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return c.json({ error: "Nenhuma imagem enviada" }, 400);
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return c.json({ error: "Apenas imagens são permitidas" }, 400);
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: "Imagem muito grande. Máximo 5MB." }, 400);
    }

    // Convert file to base64 data URL for storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const base64 = btoa(String.fromCharCode(...buffer));
    const dataUrl = `data:${file.type};base64,${base64}`;

    return c.json({ 
      message: "Imagem carregada com sucesso",
      imageUrl: dataUrl
    });
  } catch (error) {
    console.error("Error uploading product image:", error);
    return c.json({ error: "Erro ao fazer upload da imagem" }, 500);
  }
});

// File upload endpoint for services
app.post("/api/admin/services/upload-image", requireAuth, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return c.json({ error: "Nenhuma imagem enviada" }, 400);
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return c.json({ error: "Apenas imagens são permitidas" }, 400);
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: "Imagem muito grande. Máximo 5MB." }, 400);
    }

    // Convert file to base64 data URL for storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const base64 = btoa(String.fromCharCode(...buffer));
    const dataUrl = `data:${file.type};base64,${base64}`;

    return c.json({ 
      message: "Imagem carregada com sucesso",
      imageUrl: dataUrl
    });
  } catch (error) {
    console.error("Error uploading service image:", error);
    return c.json({ error: "Erro ao fazer upload da imagem" }, 500);
  }
});

app.post("/api/love-messages", async (c) => {
  try {
    const db = c.env.DB;
    
    // Check if it's form data (with potential file) or JSON
    const contentType = c.req.header('content-type') || '';
    let data;
    
    if (contentType.includes('application/json')) {
      data = await c.req.json();
    } else {
      return c.json({ error: "Content-Type deve ser application/json" }, 400);
    }

    // Validate the data
    const validation = CreateLoveMessageSchema.safeParse(data);
    if (!validation.success) {
      return c.json({ error: "Dados inválidos", details: validation.error.issues }, 400);
    }

    const validData = validation.data;
    
    const result = await db.prepare(
      "INSERT INTO love_messages (author_name, message, pet_name, pet_type, image_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))"
    ).bind(validData.author_name, validData.message, validData.pet_name || null, validData.pet_type || null, validData.image_url || null).run();
    
    if (result.success) {
      return c.json({ 
        message: "Mensagem enviada com sucesso! Será analisada antes de aparecer no mural.",
        id: result.meta.last_row_id 
      }, 201);
    } else {
      return c.json({ error: "Failed to create message" }, 500);
    }
  } catch (error) {
    console.error("Error creating love message:", error);
    return c.json({ error: "Failed to create message" }, 500);
  }
});

// Public Products endpoints
app.get("/api/products", async (c) => {
  try {
    const db = c.env.DB;
    const { results } = await db.prepare(
      "SELECT * FROM products WHERE is_available = 1 ORDER BY category, name"
    ).all();
    
    return c.json({ products: results });
  } catch (error) {
    console.error("Error fetching products:", error);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});

// Public Services endpoints
app.get("/api/services", async (c) => {
  try {
    const db = c.env.DB;
    const { results } = await db.prepare(
      "SELECT * FROM services WHERE is_available = 1 ORDER BY category, name"
    ).all();
    
    return c.json({ services: results });
  } catch (error) {
    console.error("Error fetching services:", error);
    return c.json({ error: "Failed to fetch services" }, 500);
  }
});

export default app;
