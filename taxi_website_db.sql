-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2024 at 12:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taxi_website_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_trips`
--

CREATE TABLE `active_trips` (
  `activeTripID` bigint(20) NOT NULL,
  `tripID` bigint(20) DEFAULT NULL,
  `clientID` bigint(20) NOT NULL,
  `driverID` bigint(20) DEFAULT NULL,
  `pickupAddress` varchar(255) NOT NULL,
  `dropoffAddress` varchar(255) NOT NULL,
  `waitingTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `clientID` bigint(20) NOT NULL,
  `userID` bigint(20) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `gender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`clientID`, `userID`, `firstName`, `lastName`, `email`, `dateOfBirth`, `gender`) VALUES
(1, 1, 'Admin', 'Adminov', 'vladiv291@gmail.com', '2005-07-16', 'male'),
(6, 8, 'qwe', 'qwe', 'fsdjkf@df.com', '2024-02-07', 'male'),
(22, 26, 'Ivan', 'Ivanov', 'ivan@gmail.com', '2019-05-06', 'male'),
(26, 36, 'fdsij', 'sofdij', 'aldo@gmail.com', '0000-00-00', 'male');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `driverID` bigint(20) NOT NULL,
  `userID` bigint(20) NOT NULL,
  `vehicleID` bigint(20) DEFAULT NULL,
  `tripCount` int(11) NOT NULL DEFAULT 0,
  `averageRating` decimal(5,1) DEFAULT 0.0,
  `status` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `gender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`driverID`, `userID`, `vehicleID`, `tripCount`, `averageRating`, `status`, `firstName`, `lastName`, `email`, `dateOfBirth`, `gender`) VALUES
(3766, 18, 2, 8, 4.0, 'active', 'Petar', 'Vladimirov', 'pepino@vvtaxi.net', '2003-03-15', 'male'),
(8305, 3, 1, 54, 3.7, 'active', 'Vladimir', 'Vladimirov', 'vladov@vvtaxi.net', '2005-05-16', 'attack-helicopter'),
(9241, 31, 3, 2, 2.3, 'active', 'ivan', 'ivanov', 'ivan@vvtaxi.net', '2003-05-16', 'male');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `reviewID` bigint(20) NOT NULL,
  `tripID` bigint(20) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `reviewDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`reviewID`, `tripID`, `rating`, `comment`, `reviewDate`) VALUES
(61, 115, 5, 'review sled iztrivaneto', '2024-04-14 09:19:02'),
(62, 116, 4, 'sfoijd', '2024-04-15 06:36:00'),
(63, 117, 4, 'haha\n', '2024-04-15 06:37:48'),
(64, 118, 5, 'good good', '2024-04-16 14:45:26'),
(65, 119, 4, 'Very good trip 👍', '2024-04-17 08:02:35'),
(66, 121, 5, 'good good\n', '2024-04-17 08:03:32'),
(67, 122, 4, 'good good', '2024-04-18 09:04:52'),
(68, 124, 5, 'ok', '2024-04-18 09:05:54'),
(69, 123, 4, 'qwe', '2024-04-18 09:06:06'),
(70, 125, 4, 'good', '2024-04-20 08:21:35'),
(71, 126, 4, 'good', '2024-04-21 10:01:22');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `tripID` bigint(20) NOT NULL,
  `clientID` bigint(20) DEFAULT NULL,
  `driverID` bigint(20) DEFAULT NULL,
  `reviewID` bigint(20) DEFAULT NULL,
  `pickupAddress` varchar(255) NOT NULL,
  `dropoffAddress` varchar(255) NOT NULL,
  `tripDateTime` datetime DEFAULT current_timestamp(),
  `currentStatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`tripID`, `clientID`, `driverID`, `reviewID`, `pickupAddress`, `dropoffAddress`, `tripDateTime`, `currentStatus`) VALUES
(115, 6, 8305, 61, 'nadejda', 'nsa', '2024-04-14 12:18:46', 'reviewed'),
(116, 6, 8305, 62, 'afoi', 'pij', '2024-04-15 09:27:41', 'reviewed'),
(117, 6, 8305, 63, 'efisdvh', 'odwihfh', '2024-04-15 09:36:20', 'reviewed'),
(118, 6, 8305, 64, 'nadejda', 'iztok', '2024-04-16 17:45:12', 'reviewed'),
(119, 6, 3766, 65, 'ул. \"Райко Алексиев\" 48', 'бул. „св. Климент Охридски\" 23', '2024-04-17 10:34:40', 'reviewed'),
(121, 6, 8305, 66, 'blah blah blah blah blah blah balh blah', 'wah wah wah wah wah wah wah wah wahwah wah wah wah', '2024-04-17 11:03:12', 'reviewed'),
(122, 6, 8305, 67, 'haha', 'hehe', '2024-04-18 12:04:01', 'reviewed'),
(123, 6, 8305, 69, 'dso', 'dfi', '2024-04-18 12:05:01', 'reviewed'),
(124, 22, 8305, 68, 'dfkuvhs', 'udh', '2024-04-18 12:05:20', 'reviewed'),
(125, 6, 8305, 70, 'fsdvjsn', 'oinsd', '2024-04-20 11:19:16', 'reviewed'),
(126, 1, 8305, 71, 'nadejda', 'iztok', '2024-04-21 12:59:02', 'reviewed');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `profileType` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `pwd`, `profileType`) VALUES
(1, 'admin', '$2y$10$ppahuzquyWsRokTukIpCXuFYEu05CHvcRfyvFzeeZzZPxkGDNJYS2', 'admin'),
(3, 'vladov', '$2y$10$OBiHMxU8/FgVPIwT2G9DfOmZ8oiU5tXtLBRKXcgXSJk50zMvNcA6e', 'driver'),
(8, 'qwe', '$2y$10$1O4ntQBMFQQwuYt6cwYLr.WZUk9qKVrgf3npMIh1qFF0vYrFWIIOK', 'client'),
(18, 'pepino', '$2y$10$dTlOFkv1bNtZaljvhM.DiuDUS7ummlRdJmgpMkWg7nWmYkWmHIu7S', 'driver'),
(26, 'ivan', '$2y$10$b78quD6g3rWmdSgcT.FGNuCnohzWxKh3w2StwxYAlURVyasWLcbK.', 'client'),
(31, 'ivaan', '$2y$10$kSpokRZnoZV3M0aELcDFMu6My5BS/jBgQJ.eeBr0xNHOLRYWYNE6e', 'driver'),
(36, 'aldo', '$2y$10$KzcVQmPt46mSmlZuj6vJ3Oxx.a8tmwvn4IMzgf.K67zn.rYayV9Uu', 'client');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicleID` bigint(20) NOT NULL,
  `driverID` bigint(20) NOT NULL,
  `licensePlate` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `currentStatus` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`vehicleID`, `driverID`, `licensePlate`, `brand`, `model`, `year`, `currentStatus`) VALUES
(1, 8305, 'qdfkudh', 'Opel', 'Ursa', 1994, 'sdsfww'),
(2, 3766, 'СВ4950ТХ', 'toyota', 'corolla', 2022, 'active'),
(3, 9241, NULL, 'bmw', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_trips`
--
ALTER TABLE `active_trips`
  ADD PRIMARY KEY (`activeTripID`),
  ADD KEY `active_trips_ibfk_1` (`clientID`),
  ADD KEY `active_trips_ibfk_2` (`driverID`),
  ADD KEY `active_trips_ibfk_16` (`tripID`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`clientID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `clients_ibfk_1` (`userID`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`driverID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `drivers_ibfk_1` (`userID`),
  ADD KEY `drivers_ibfk_2` (`vehicleID`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`reviewID`),
  ADD KEY `reviews_ibfk_3` (`tripID`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`tripID`),
  ADD KEY `trips_ibfk_1` (`clientID`),
  ADD KEY `trips_ibfk_2` (`driverID`),
  ADD KEY `fk_reviewID` (`reviewID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicleID`),
  ADD UNIQUE KEY `licensePlate` (`licensePlate`),
  ADD KEY `vehicles_ibfk_1` (`driverID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `active_trips`
--
ALTER TABLE `active_trips`
  MODIFY `activeTripID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `clientID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `reviewID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `tripID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `active_trips`
--
ALTER TABLE `active_trips`
  ADD CONSTRAINT `active_trips_ibfk_1` FOREIGN KEY (`clientID`) REFERENCES `clients` (`clientID`) ON DELETE CASCADE,
  ADD CONSTRAINT `active_trips_ibfk_16` FOREIGN KEY (`tripID`) REFERENCES `trips` (`tripID`),
  ADD CONSTRAINT `active_trips_ibfk_2` FOREIGN KEY (`driverID`) REFERENCES `drivers` (`driverID`);

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE;

--
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE,
  ADD CONSTRAINT `drivers_ibfk_2` FOREIGN KEY (`vehicleID`) REFERENCES `vehicles` (`vehicleID`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`tripID`) REFERENCES `trips` (`tripID`) ON DELETE CASCADE;

--
-- Constraints for table `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `fk_reviewID` FOREIGN KEY (`reviewID`) REFERENCES `reviews` (`reviewID`) ON DELETE SET NULL,
  ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`clientID`) REFERENCES `clients` (`clientID`) ON DELETE CASCADE,
  ADD CONSTRAINT `trips_ibfk_2` FOREIGN KEY (`driverID`) REFERENCES `drivers` (`driverID`) ON DELETE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`driverID`) REFERENCES `drivers` (`driverID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
