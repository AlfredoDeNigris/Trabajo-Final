INSERT INTO user (full_name, username, license, date_birth, password, billing_address, phone_number, email, role)
VALUES ('John Admin', 'johnA', 123456789, '1985-05-15', '$2a$12$GSFPHUaic0oxZyMB8zvOZuo5nO231rd4ecCj04hr5DOaxS7t9lBxW', '1234 Elm Street', '555-1234', 'johnAdmin@example.com', 'admin');


INSERT INTO fine_reason (reason_description, amount) VALUES
('Exceeding speed limit', 300.00),
('Illegal parking', 500.00),
('Driving without a license', 1000.00),
('Expired registration', 750.00);