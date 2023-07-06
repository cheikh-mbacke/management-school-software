
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `grades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` float NOT NULL,
  `studentId` int(11) NOT NULL,
  `teacherId` int(11) NOT NULL,
  `semestreValue` int(11) NOT NULL,
  `moduleName` varchar(255) NOT NULL,
  `className` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `ressources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `intitule` varchar(255) NOT NULL,
  `moduleName` varchar(255) NOT NULL,
  `className` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `timetables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startHour` int(11) NOT NULL,
  `startMinute` int(11) NOT NULL,
  `endHour` int(11) NOT NULL,
  `endMinute` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `className` varchar(255) NOT NULL,
  `moduleName` varchar(255) NOT NULL,
  `teacherId` int(11) NOT NULL,
  `descColor` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `classroom` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `userclasses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `usermodules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `moduleName` varchar(255) NOT NULL,
  `className` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;


/*
INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `date_of_birth`, `createdAt`, `updatedAt`) VALUES
(1, 'manager', 'manager', 'manager@gmail.com', '$2y$10$MrKTh99osUH7gjAC8XeK9O8z2k4QU8SXltJhFMuTW6f5KyOfAEUfK', '2001-01-01 00:00:00', '2023-03-10 06:44:40', '2023-03-10 06:44:40'),
(2, 'teacher', 'teacher', 'teacher@gmail.com', '$2y$10$6NEbTkw2QqJaQzt32T.koupXn2kZF.CTZaeRJCQPW3BqHCLtII5j6', '2001-01-01 00:00:00', '2023-03-10 06:46:49', '2023-03-10 06:46:49'),
(3, 'student', 'student', 'student@gmail.com', '$2y$10$Mm7cFwULplIb5DvxnYD5sO9OeNn3VVzEU8RbdFQCta2vtZQDWjzxC', '2001-01-01 00:00:00', '2023-03-10 06:47:44', '2023-03-10 06:47:44'),

INSERT INTO `roles` (`id`, `role`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'manager', '2023-03-10 06:44:40', '2023-03-10 06:44:40', 1),
(2, 'teacher', '2023-03-10 06:46:49', '2023-03-10 06:46:49', 2),
(3, 'student', '2023-03-10 06:47:44', '2023-03-10 06:47:44', 3)

INSERT INTO `userclasses` (`id`, `className`, `userId`, `createdAt`, `updatedAt`) VALUES
(2, 'CI', 2, '2023-03-10 06:44:40', '2023-03-10 06:44:40'),
(3, 'CI', 3, '2023-03-10 06:46:49', '2023-03-10 06:46:49')


*/