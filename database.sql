SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `classes` (
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `value` float NOT NULL,
  `studentId` int(11) NOT NULL,
  `teacherId` int(11) NOT NULL,
  `semestreValue` int(11) NOT NULL,
  `moduleName` varchar(255) NOT NULL,
  `className` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `modules` (
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `ressources` (
  `id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `intitule` varchar(255) NOT NULL,
  `moduleName` varchar(255) NOT NULL,
  `className` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `roles` (`id`, `role`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'manager', '2023-03-10 06:44:40', '2023-03-10 06:44:40', 1),
(2, 'teacher', '2023-03-10 06:46:49', '2023-03-10 06:46:49', 2),
(3, 'student', '2023-03-10 06:47:44', '2023-03-10 06:47:44', 3)


CREATE TABLE `timetables` (
  `id` int(11) NOT NULL,
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
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `userclasses` (
  `id` int(11) NOT NULL,
  `className` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `userclasses` (`id`, `className`, `userId`, `createdAt`, `updatedAt`) VALUES
(2, 'CI', 2, '2023-03-10 06:44:40', '2023-03-10 06:44:40'),
(3, 'CI', 3, '2023-03-10 06:46:49', '2023-03-10 06:46:49')

CREATE TABLE `usermodules` (
  `id` int(11) NOT NULL,
  `moduleName` varchar(255) NOT NULL,
  `className` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `date_of_birth`, `createdAt`, `updatedAt`) VALUES
(1, 'manager', 'manager', 'manager@gmail.com', '$2y$10$MrKTh99osUH7gjAC8XeK9O8z2k4QU8SXltJhFMuTW6f5KyOfAEUfK', '2001-01-01 00:00:00', '2023-03-10 06:44:40', '2023-03-10 06:44:40'),
(2, 'teacher', 'teacher', 'teacher@gmail.com', '$2y$10$6NEbTkw2QqJaQzt32T.koupXn2kZF.CTZaeRJCQPW3BqHCLtII5j6', '2001-01-01 00:00:00', '2023-03-10 06:46:49', '2023-03-10 06:46:49'),
(3, 'student', 'student', 'student@gmail.com', '$2y$10$Mm7cFwULplIb5DvxnYD5sO9OeNn3VVzEU8RbdFQCta2vtZQDWjzxC', '2001-01-01 00:00:00', '2023-03-10 06:47:44', '2023-03-10 06:47:44'),


ALTER TABLE `classes`
  ADD PRIMARY KEY (`name`);


ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `modules`
  ADD PRIMARY KEY (`name`);

ALTER TABLE `ressources`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

ALTER TABLE `timetables`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `userclasses`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `usermodules`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `ressources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `timetables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `userclasses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `usermodules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

