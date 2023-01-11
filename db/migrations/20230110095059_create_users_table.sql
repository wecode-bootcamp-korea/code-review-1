-- migrate:up
CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `point` DECIMAL(10, 3) DEFAULT 100000,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT email_constraint UNIQUE (email)
);
-- migrate:down
DROP TABLE users;