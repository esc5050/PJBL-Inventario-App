# Banco criado
CREATE DATABASE inventario_db;
USE inventario_db;

# tabela de items
CREATE TABLE itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco_recomendado DECIMAL(10,2) NOT NULL,
    preco_maximo DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Inserir item de teste
INSERT INTO itens (nome, preco_recomendado, preco_maximo, imagem)
VALUES 
('Mouse Gamer', 120.00, 180.00, 'https://via.placeholder.com/150');

# Ver item
SELECT * FROM itens;