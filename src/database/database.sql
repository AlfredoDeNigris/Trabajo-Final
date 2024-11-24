DROP SCHEMA IF EXISTS trabajo_final;
CREATE SCHEMA IF NOT EXISTS trabajo_final DEFAULT CHARACTER SET utf8;
USE trabajo_final;

CREATE TABLE IF NOT EXISTS user(
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  license INT NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  date_birth DATE NOT NULL,
  password VARCHAR(255) NOT NULL,
  billing_address VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role ENUM('admin', 'driver', 'inspector') NOT NULL
);

CREATE TABLE IF NOT EXISTS inspector(
  badge_number INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicle(
  patent VARCHAR(15) PRIMARY KEY,
  information VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE IF NOT EXISTS fine_reason(
  reason_id INT PRIMARY KEY AUTO_INCREMENT,
  reason_description VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS fine(
  fine_id INT PRIMARY KEY AUTO_INCREMENT,
  amount DECIMAL(10,2) NOT NULL,
  issued_at DATETIME NOT NULL,
  fine_description VARCHAR(255) NOT NULL,
  paid BOOLEAN NOT NULL DEFAULT false,
  patent VARCHAR(15) NOT NULL,
  FOREIGN KEY (patent) REFERENCES vehicle (patent),
  badge_number INT NOT NULL,
  FOREIGN KEY (badge_number) REFERENCES inspector (badge_number),
  reason_id INT NOT NULL,
  FOREIGN KEY (reason_id) REFERENCES fine_reason (reason_id)
);