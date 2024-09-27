-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : lun. 23 sep. 2024 à 07:45
-- Version du serveur : 10.10.2-MariaDB
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tastymeet`
--

-- --------------------------------------------------------

--
-- Structure de la table `picture`
--

DROP TABLE IF EXISTS `picture`;
CREATE TABLE IF NOT EXISTS `picture` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `picture_name` varchar(255) DEFAULT NULL,
  `version` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfa3htlps9ddix2jx1spmpedko` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `picture`
--

INSERT INTO `picture` (`id`, `picture_name`, `version`, `user_id`) VALUES
(1, 'pexels-athena-1758144.jpg', 0, 1),
(3, 'pexels-rb-audiovisual-2130795.jpg', 0, 1),
(4, 'pexels-godisable-jacob-226636-944762.jpg', 0, 2),
(5, 'pexels-guilhermealmeida-1858175.jpg', 0, 3),
(6, 'pexels-moose-photos-170195-1036622.jpg', 0, 4),
(7, 'pexels-olly-733872.jpg', 0, 5),
(8, 'pexels-olly-774909.jpg', 0, 6),
(9, 'pexels-pixabay-415829.jpg', 0, 7),
(10, 'pexels-vinicius-wiesehofer-289347-1130626.jpg', 0, 8),
(11, 'pexels-chloekalaartist-1043474.jpg', 0, 9);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `age` date NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `gender` tinyint(4) NOT NULL CHECK (`gender` between 0 and 3),
  `last_name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `orientation` tinyint(4) DEFAULT NULL CHECK (`orientation` between 0 and 3),
  `password` varchar(255) NOT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `version` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `age`, `city`, `description`, `email`, `first_name`, `gender`, `last_name`, `location`, `orientation`, `password`, `phone`, `version`) VALUES
(1, '1992-03-15', NULL, 'Passionnée de photographie et de voyages.', 'clara.dupont@email.com', 'Clara', 1, 'Dupont', NULL, 0, '123', 612345678, 8),
(2, '1990-11-10', NULL, 'Adepte de la cuisine végétarienne et des livres.', 'sophie.martin@email.com', 'Sophie', 1, 'Martin', NULL, 0, '123', 634567890, 3),
(3, '1995-07-30', NULL, 'Amoureuse des animaux et du jardinage.', 'emilie.petit@email.com', 'Émilie', 1, 'Petit', NULL, 0, '123', 656789012, 2),
(4, '1994-09-27', NULL, 'Passionnée de danse et de théâtre.', 'camille.moreau@email.com', 'Camille', 1, 'Moreau', NULL, 0, '123', 678901234, 2),
(5, '1991-05-08', NULL, 'Passionnée de mode et d\'art.', 'alice.lambert@email.com', 'Alice', 1, 'Lambert', NULL, 0, '123', 690123456, 2),
(6, '1996-10-12', NULL, 'Adepte de yoga et de méditation.', 'ines.chevalier@email.com', 'Inès', 1, 'Chevalier', NULL, 0, '123', 612345678, 2),
(7, '1993-01-25', NULL, 'Passionnée de cinéma et de voyages.', 'laura.caron@email.com', 'Laura', 1, 'Caron', NULL, 0, '123', 634567890, 2),
(8, '1991-11-16', NULL, 'Passionnée de littérature et de peinture.', 'lucie.masson@email.com', 'Lucie', 1, 'Masson', NULL, 0, '123', 656789012, 2),
(9, '1996-08-30', NULL, 'Amateur de sports extrêmes et de musique.', 'adrien.fontaine@email.com', 'Adrien', 0, 'Fontaine', NULL, 1, '123', 645678901, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `roles` tinyint(4) DEFAULT NULL CHECK (`roles` between 0 and 1),
  KEY `FK55itppkw3i07do3h7qoclqd4k` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `roles`) VALUES
(1, 0),
(2, 0),
(3, 0),
(4, 0),
(5, 0),
(6, 0),
(7, 0),
(8, 0),
(9, 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `picture`
--
ALTER TABLE `picture`
  ADD CONSTRAINT `FKfa3htlps9ddix2jx1spmpedko` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
