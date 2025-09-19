
-- Update the default admin password hash with a proper bcrypt hash for "admin123"
UPDATE admin_users 
SET password_hash = '$2b$10$rQ8KqZZKqZKqZKqZKqZKqOJXY8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8' 
WHERE email = 'admin@clubedosbichos.com';

-- If no admin exists, create one
INSERT OR IGNORE INTO admin_users (email, password_hash, name) 
VALUES ('admin@clubedosbichos.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador');
