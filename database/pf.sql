SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `bodegas` (
  `codigo_bodega` int NOT NULL,
  `ubicacion_bodega` varchar(25) NOT NULL,
  `nombre_bodega` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
