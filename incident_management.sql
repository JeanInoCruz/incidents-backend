-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2024 a las 01:55:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `incident_management`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `incidentId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `comment` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `incidentId`, `userId`, `comment`, `createdAt`, `updatedAt`) VALUES
(1, 1, 3, 'We have scheduled a plumber to visit your apartment tomorrow.', '2024-06-13 03:41:57', '2024-06-13 03:41:57'),
(2, 2, 3, 'The maintenance team is on it.', '2024-06-13 03:41:57', '2024-06-13 03:41:57'),
(3, 3, 1, 'Power is back. Thanks for the quick response.', '2024-06-13 03:41:57', '2024-06-13 03:41:57'),
(4, 4, 3, 'Pest control will visit tomorrow.', '2024-06-13 03:41:57', '2024-06-13 03:41:57'),
(5, 5, 3, 'Elevator technician has been notified.', '2024-06-13 03:41:57', '2024-06-13 03:41:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidents`
--

CREATE TABLE `incidents` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `type` enum('cleaning','maintenance','plumbing','electrical','security','HVAC','landscaping','elevator','pest_control','other') NOT NULL,
  `description` text NOT NULL,
  `location` enum('101','102','103','104','201','202','203','204','301','302','303','304','401','402','403','404','501','502','503','504','common_area_1','common_area_2','common_area_3','common_area_4','common_area_5','reception_hall','parking_lot','rooftop') NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('pending','in_progress','resolved') NOT NULL DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidents`
--

INSERT INTO `incidents` (`id`, `userId`, `subject`, `type`, `description`, `location`, `image`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Water Leakage', 'plumbing', 'Water leaking from the ceiling in the living room.', '101', NULL, 'pending', '2024-06-13 03:41:48', '2024-06-13 03:41:48'),
(2, 2, 'Broken Window', 'maintenance', 'Window in the kitchen is broken.', '202', NULL, 'in_progress', '2024-06-13 03:41:48', '2024-06-13 03:41:48'),
(3, 1, 'Electrical Issue', 'electrical', 'No power in the bedroom.', '301', NULL, 'resolved', '2024-06-13 03:41:48', '2024-06-13 03:41:48'),
(4, 4, 'Pest Infestation', 'cleaning', 'Seeing a lot of cockroaches in the kitchen.', 'common_area_1', NULL, 'pending', '2024-06-13 03:41:48', '2024-06-13 03:41:48'),
(5, 2, 'Elevator Not Working', 'elevator', 'Elevator is stuck on the 3rd floor.', 'common_area_3', NULL, 'pending', '2024-06-13 03:41:48', '2024-06-13 03:41:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('resident','admin') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Alice Johnson', 'alice@example.com', '$2a$08$Vh5ZL8uW2G/Uf1asry5b8Of/Lu.DcN2PgdlyKOnCWZsF0bdgIXY4y', 'resident', '2024-06-13 03:41:32', '2024-06-13 03:41:32'),
(2, 'Bob Smith', 'bob@example.com', '$2a$08$Vh5ZL8uW2G/Uf1asry5b8Of/Lu.DcN2PgdlyKOnCWZsF0bdgIXY4y', 'resident', '2024-06-13 03:41:32', '2024-06-13 03:41:32'),
(3, 'Charlie Davis', 'charlie@example.com', '$2a$08$Vh5ZL8uW2G/Uf1asry5b8Of/Lu.DcN2PgdlyKOnCWZsF0bdgIXY4y', 'admin', '2024-06-13 03:41:32', '2024-06-13 03:41:32'),
(4, 'Diana Evans', 'diana@example.com', '$2a$08$Vh5ZL8uW2G/Uf1asry5b8Of/Lu.DcN2PgdlyKOnCWZsF0bdgIXY4y', 'resident', '2024-06-13 03:41:32', '2024-06-13 03:41:32'),
(5, 'Edward Green', 'edward@example.com', '$2a$08$Vh5ZL8uW2G/Uf1asry5b8Of/Lu.DcN2PgdlyKOnCWZsF0bdgIXY4y', 'admin', '2024-06-13 03:41:32', '2024-06-13 03:41:32');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `incidentId` (`incidentId`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `incidents`
--
ALTER TABLE `incidents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`incidentId`) REFERENCES `incidents` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `incidents`
--
ALTER TABLE `incidents`
  ADD CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
