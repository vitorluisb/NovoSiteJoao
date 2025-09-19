
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_user_id INTEGER NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, name) 
VALUES ('admin@clubedosbichos.com', '$2b$10$rQ8KqZZKqZKqZKqZKqZKqOJXY8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8', 'Administrador');
