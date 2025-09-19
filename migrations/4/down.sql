
-- Revert to original state
UPDATE admin_users 
SET password_hash = '$2b$10$rQ8KqZZKqZKqZKqZKqZKqOJXY8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8Y8' 
WHERE email = 'admin@clubedosbichos.com';
