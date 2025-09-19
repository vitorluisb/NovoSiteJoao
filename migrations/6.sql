
INSERT OR IGNORE INTO admin_users (email, password_hash, name, is_active, created_at, updated_at) 
VALUES ('admin@clubedosbichos.com', '$2a$12$LQv3c1yqBwlVHpPjrSMqNebKb2ZbJL.5aNlh9RVQj2qJQw2K8.H5a', 'Administrador', 1, datetime('now'), datetime('now'));
