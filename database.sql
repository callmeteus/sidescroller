-- phpMyAdmin SQL Dump
-- version 4.7.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 13-Jun-2018 às 04:03
-- Versão do servidor: 5.7.20
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sidescroller`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `app_stages`
--

CREATE TABLE `app_stages` (
  `stageid` int(11) UNSIGNED NOT NULL,
  `stagename` varchar(100) NOT NULL,
  `stageimage` varchar(100) NOT NULL,
  `stagefile` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `app_stages`
--

INSERT INTO `app_stages` (`stageid`, `stagename`, `stageimage`, `stagefile`) VALUES
(1, 'Stage 1', '/img/maps/1.png', '1.json'),
(2, 'Stage 2', '/img/maps/2.png', '2.json');

-- --------------------------------------------------------

--
-- Estrutura da tabela `app_user`
--

CREATE TABLE `app_user` (
  `userid` int(11) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL,
  `useremail` varchar(325) NOT NULL,
  `userpassword` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `app_user_stages`
--

CREATE TABLE `app_user_stages` (
  `stageuid` int(11) UNSIGNED NOT NULL,
  `stageid` int(11) UNSIGNED NOT NULL,
  `stageuser` int(11) UNSIGNED NOT NULL,
  `stagewin` tinyint(1) NOT NULL DEFAULT '0',
  `stagetime` int(5) UNSIGNED NOT NULL DEFAULT '0',
  `stagescore` smallint(5) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_stages`
--
ALTER TABLE `app_stages`
  ADD PRIMARY KEY (`stageid`);

--
-- Indexes for table `app_user`
--
ALTER TABLE `app_user`
  ADD PRIMARY KEY (`userid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `useremail` (`useremail`);

--
-- Indexes for table `app_user_stages`
--
ALTER TABLE `app_user_stages`
  ADD PRIMARY KEY (`stageuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app_stages`
--
ALTER TABLE `app_stages`
  MODIFY `stageid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `app_user`
--
ALTER TABLE `app_user`
  MODIFY `userid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `app_user_stages`
--
ALTER TABLE `app_user_stages`
  MODIFY `stageuid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
