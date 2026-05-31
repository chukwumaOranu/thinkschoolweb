INSERT INTO roles (name, slug, description, is_system)
VALUES ('User', 'user', 'Default registered user access', 1)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  is_system = VALUES(is_system);
