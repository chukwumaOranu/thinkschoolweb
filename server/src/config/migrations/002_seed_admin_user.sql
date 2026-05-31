INSERT INTO roles (name, slug, description, is_system)
VALUES ('Administrator', 'admin', 'Full administrative access', 1)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  is_system = VALUES(is_system);

INSERT INTO users (username, password_hash, status)
VALUES ('oranich', '$2b$12$5LpmCyPn4YrfYcgutKBi3e63kI.IPtTKUWx75UI8T8uLpIxGpT30W', 'active')
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  status = VALUES(status);

INSERT IGNORE INTO user_roles (user_id, role_id)
SELECT users.id, roles.id
FROM users
JOIN roles ON roles.slug = 'admin'
WHERE users.username = 'oranich';
