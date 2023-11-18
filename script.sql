CREATE DATABASE IF NOT EXISTS RollerDreams;

USE RollerDreams;

CREATE TABLE Productos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Precio DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL
);

CREATE TABLE Usuarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    CorreoElectronico VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE Comentarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ProductoID INT,
    UsuarioID INT,
    Comentario TEXT,
    FechaPublicacion TIMESTAMP,
    FOREIGN KEY (ProductoID) REFERENCES Productos(ID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(ID)
);

DROP DATABASE IF EXISTS RollerDreams;  -- Comentario: Puedes comentar o eliminar esta línea si no es necesaria
