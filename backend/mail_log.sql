-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2024 at 06:58 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sudisa`
--

-- --------------------------------------------------------

--
-- Table structure for table `mail_log`
--

CREATE TABLE `mail_log` (
  `id` int(11) NOT NULL,
  `body` varchar(1024) NOT NULL,
  `emails` varchar(55) NOT NULL,
  `is_sent` int(11) NOT NULL COMMENT '0 => mail not sent\r\n1 => mail sent\r\n2 => Mail in QUEUE',
  `datetime` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mail_log`
--

INSERT INTO `mail_log` (`id`, `body`, `emails`, `is_sent`, `datetime`) VALUES
(10, '{\"dept_name\":\"System\",\"camera\":\"Camera10\",\"image\":\"1696932759165-frameb7dcefc4-7047-4bc9-980f-b52b8a165265.jpg\",\"alarm_type\":\"Warn\"}', 'upasanabharti145@gmail.com,mrinmoyghosh102@gmail.com', 1, '2024-03-07T12:42:29.697Z'),
(11, '{\"dept_name\":\"System\",\"camera\":\"Camera10\",\"image\":\"1696932759165-frameb7dcefc4-7047-4bc9-980f-b52b8a165265.jpg\",\"alarm_type\":\"Warn\"}', '\"upasanabharti145@gmail.com\"', 2, '2024-03-07T12:50:26.922Z'),
(12, '{\"dept_name\":\"System\",\"camera\":\"Camera10\",\"image\":\"1696932759165-frameb7dcefc4-7047-4bc9-980f-b52b8a165265.jpg\",\"alarm_type\":\"Warn\"}', '\"upasanabharti145@gmail.com\"', 2, '2024-03-07T12:51:06.734Z'),
(13, '{\"dept_name\":\"System\",\"camera\":\"Camera10\",\"image\":\"1696932759165-frameb7dcefc4-7047-4bc9-980f-b52b8a165265.jpg\",\"alarm_type\":\"Warn\"}', '\"upasanabharti145@gmail.com, ria@gmail.com\"', 2, '2024-03-08T10:24:10.671Z'),
(14, '{\"dept_name\":\"System\",\"camera\":\"Camera10\",\"image\":\"1696932759165-frameb7dcefc4-7047-4bc9-980f-b52b8a165265.jpg\",\"alarm_type\":\"Warn\"}', '\"upasanabharti145@gmail.com, ria@gmail.com\"', 1, '2024-03-08T10:27:48.476Z'),
(29, '{\"dept_name\":\"System\",\"camera\":\"Camera10\",\"image\":\"1696932759165-frameb7dcefc4-7047-4bc9-980f-b52b8a165265.jpg\",\"alarm_type\":\"Warn\"}', '\"upasanabharti145@gmail.com\"', 2, '2024-03-11T10:44:22.462Z'),
(30, '{\"dept_name\":\"System\",\"camera\":\"Camera10\",\"image\":\"1696932759165-frameb7dcefc4-7047-4bc9-980f-b52b8a165265.jpg\",\"alarm_type\":\"Warn\"}', '\"upasanabharti145@gmail.com\"', 2, '2024-03-11T10:48:57.750Z'),
(31, '{\"dept_name\":\"System\",\"camera\":\"Camera10\",\"image\":\"1696932759165-frameb7dcefc4-7047-4bc9-980f-b52b8a165265.jpg\",\"alarm_type\":\"Warn\"}', '\"upasanabharti145@gmail.com\"', 2, '2024-03-11T15:11:44.332Z'),
(32, '{\"dept_name\":\"System\",\"camera\":\"Camera10\",\"image\":\"1696932759165-frameb7dcefc4-7047-4bc9-980f-b52b8a165265.jpg\",\"alarm_type\":\"Warn\"}', '\"upasanabharti145@gmail.com\"', 2, '2024-03-12T11:22:58.428Z');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mail_log`
--
ALTER TABLE `mail_log`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mail_log`
--
ALTER TABLE `mail_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
