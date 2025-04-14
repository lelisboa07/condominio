CREATE DATABASE db_portaria;
USE db_portaria;

CREATE TABLE morador(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    bloco VARCHAR(255) NOT NULL,
    apartamento VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status ENUM('residente', 'proprietário', 'visitante') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE veiculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(255) UNIQUE NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    cor VARCHAR(255) NOT NULL,
    morador_id INT NOT NULL,
    box VARCHAR(255) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (morador_id) references morador (id)
);

insert into morador (nome, bloco, apartamento, telefone, email, status) values ('julia', 'A', '101', '(51) 99999-9999', 'julia@email.com', 'residente');
insert into veiculo (placa, modelo, cor, morador_id, box) values ('ABC1234', 'Civic', 'Branco', 1, 'A1');

select * from morador;
select * from veiculo;