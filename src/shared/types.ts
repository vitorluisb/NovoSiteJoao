import { z } from "zod";

// Love Messages
export const CreateLoveMessageSchema = z.object({
  author_name: z.string().min(1, "Nome é obrigatório"),
  message: z.string().min(1, "Mensagem é obrigatória"),
  pet_name: z.string().optional(),
  pet_type: z.string().optional(),
  image_url: z.string().optional(),
});

export type CreateLoveMessage = z.infer<typeof CreateLoveMessageSchema>;

export interface LoveMessage {
  id: number;
  author_name: string;
  message: string;
  pet_name?: string;
  pet_type?: string;
  image_url?: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

// Products
export interface Product {
  id: number;
  name: string;
  description?: string;
  price?: string;
  image_url?: string;
  category?: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  price: z.string().optional(),
  image_url: z.string().url().optional(),
  category: z.string().optional(),
});

export type CreateProduct = z.infer<typeof CreateProductSchema>;

// Services
export interface Service {
  id: number;
  name: string;
  description?: string;
  price?: string;
  duration?: string;
  image_url?: string;
  category?: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export const CreateServiceSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  price: z.string().optional(),
  duration: z.string().optional(),
  image_url: z.string().url().optional(),
  category: z.string().optional(),
});

export type CreateService = z.infer<typeof CreateServiceSchema>;

// Admin Authentication
export const AdminLoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type AdminLogin = z.infer<typeof AdminLoginSchema>;

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminSession {
  id: number;
  admin_user_id: number;
  session_token: string;
  expires_at: string;
  created_at: string;
}
