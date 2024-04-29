-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : lun. 29 avr. 2024 à 23:56
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `learnup`
--

-- --------------------------------------------------------

--
-- Structure de la table `class`
--

CREATE TABLE `class` (
  `idclass` int(11) NOT NULL,
  `nameclass` varchar(30) NOT NULL,
  `idspe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `class`
--

INSERT INTO `class` (`idclass`, `nameclass`, `idspe`) VALUES
(1, '1ére', 3),
(2, '2eme', 3),
(3, '3eme', 3);

-- --------------------------------------------------------

--
-- Structure de la table `document`
--

CREATE TABLE `document` (
  `id_d` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `dataD` longblob NOT NULL,
  `type` enum('cour','examn') NOT NULL,
  `date` date NOT NULL,
  `nblike` int(11) DEFAULT 0,
  `nbdislike` int(11) DEFAULT 0,
  `report` tinyint(1) NOT NULL DEFAULT 0,
  `subject_id2` int(11) NOT NULL,
  `id_U` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `level`
--

CREATE TABLE `level` (
  `namelevel` varchar(30) NOT NULL,
  `idlevel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `level`
--

INSERT INTO `level` (`namelevel`, `idlevel`) VALUES
('Primaire ', 1),
('Secondaire', 2),
('licence', 3),
('master', 4),
('doctorat', 5);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `msg` varchar(255) NOT NULL,
  `idMessage` bigint(20) UNSIGNED NOT NULL,
  `dateMessage` date NOT NULL,
  `nblike` int(11) NOT NULL DEFAULT 0,
  `nbdislike` int(11) NOT NULL DEFAULT 0,
  `report` tinyint(1) NOT NULL DEFAULT 0,
  `id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`msg`, `idMessage`, `dateMessage`, `nblike`, `nbdislike`, `report`, `id`) VALUES
('mpl', 2147483668, '2024-04-27', 0, 0, 1, 1),
('lpp', 2147483669, '2024-04-27', 0, 0, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

CREATE TABLE `reponse` (
  `id_r` bigint(20) NOT NULL,
  `msg` varchar(255) NOT NULL,
  `id` bigint(20) UNSIGNED NOT NULL,
  `idM` bigint(20) UNSIGNED NOT NULL,
  `dateMessage` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reponse`
--

INSERT INTO `reponse` (`id_r`, `msg`, `id`, `idM`, `dateMessage`) VALUES
(2147483657, 'koko', 1, 2147483668, '2024-04-29 00:53:30'),
(2147483659, 'mpolo', 1, 2147483668, '2024-04-29 22:24:06');

-- --------------------------------------------------------

--
-- Structure de la table `speciality`
--

CREATE TABLE `speciality` (
  `idspe` int(11) NOT NULL,
  `namespe` varchar(30) NOT NULL,
  `idlevel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `speciality`
--

INSERT INTO `speciality` (`idspe`, `namespe`, `idlevel`) VALUES
(1, 'Scientifique', 2),
(2, 'Technique', 2),
(3, 'Glsi', 3),
(4, 'Iot', 3),
(5, 'Lai', 3);

-- --------------------------------------------------------

--
-- Structure de la table `subject`
--

CREATE TABLE `subject` (
  `nameSub` varchar(30) NOT NULL,
  `idsubject` int(11) NOT NULL,
  `idclass` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `subject`
--

INSERT INTO `subject` (`nameSub`, `idsubject`, `idclass`) VALUES
('Java', 1, 2),
('Web', 2, 2),
('Base de Données', 3, 2);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_U` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `type` enum('user','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_U`, `username`, `password`, `email`, `type`) VALUES
(1, 'admin', 'admin', 'oussamameddeb4454@gmail.com', 'admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`idclass`),
  ADD KEY `spe_id` (`idspe`);

--
-- Index pour la table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id_d`),
  ADD KEY `subDoc_id` (`subject_id2`),
  ADD KEY `docUser` (`id_U`);

--
-- Index pour la table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`idlevel`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`idMessage`),
  ADD KEY `MessageFK` (`id`);

--
-- Index pour la table `reponse`
--
ALTER TABLE `reponse`
  ADD PRIMARY KEY (`id_r`),
  ADD KEY `MessageR` (`idM`),
  ADD KEY `FkuserReponse` (`id`);

--
-- Index pour la table `speciality`
--
ALTER TABLE `speciality`
  ADD PRIMARY KEY (`idspe`),
  ADD KEY `level_id` (`idlevel`);

--
-- Index pour la table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`idsubject`),
  ADD KEY `classSub` (`idclass`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_U`,`email`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `document`
--
ALTER TABLE `document`
  MODIFY `id_d` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `idMessage` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483670;

--
-- AUTO_INCREMENT pour la table `reponse`
--
ALTER TABLE `reponse`
  MODIFY `id_r` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483660;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_U` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `spe_id` FOREIGN KEY (`idspe`) REFERENCES `speciality` (`idspe`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `docUser` FOREIGN KEY (`id_U`) REFERENCES `user` (`id_U`),
  ADD CONSTRAINT `subDoc_id` FOREIGN KEY (`subject_id2`) REFERENCES `subject` (`idsubject`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `MessageFK` FOREIGN KEY (`id`) REFERENCES `user` (`id_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `reponse`
--
ALTER TABLE `reponse`
  ADD CONSTRAINT `FkuserReponse` FOREIGN KEY (`id`) REFERENCES `user` (`id_U`),
  ADD CONSTRAINT `MessageR` FOREIGN KEY (`idM`) REFERENCES `message` (`idMessage`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `speciality`
--
ALTER TABLE `speciality`
  ADD CONSTRAINT `FkIdLevel` FOREIGN KEY (`idlevel`) REFERENCES `level` (`idlevel`);

--
-- Contraintes pour la table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `classSub` FOREIGN KEY (`idclass`) REFERENCES `class` (`idclass`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
