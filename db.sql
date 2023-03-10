CREATE DATABASE `new_america` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `tutorial_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tutorialId` int NOT NULL,
  `userId` int NOT NULL,
  `timeMs` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `tutorials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `description` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `steamid` int DEFAULT NULL,
  `personaname` varchar(180) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `tutorials` (
  `id` varchar(12) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `tutorial_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tutorialId` varchar(12) COLLATE utf8mb4_bin NOT NULL,
  `userId` int NOT NULL,
  `timeMs` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Tutorial_User_Tutorials` (`tutorialId`),
  CONSTRAINT `FK_Tutorial_User_Tutorials` FOREIGN KEY (`tutorialId`) REFERENCES `tutorials` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `steamid` int DEFAULT NULL,
  `personaname` varchar(180) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `new_america`.`tutorials` (`id`, `name`, `description`) VALUES ('MOVEMENT_1', 'Basic Movement', 'Capture the flag');
INSERT INTO `new_america`.`tutorials` (`id`, `name`, `description`) VALUES ('MOVEMENT_2', 'More advanced movement', 'Capture the flag in a base with obstacles');
INSERT INTO `new_america`.`tutorials` (`id`, `name`, `description`) VALUES ('ATTACK_1', 'Destroy the box', 'Pickup a pistol and shoot the box until it blows up!');
INSERT INTO `new_america`.`tutorials` (`id`, `name`, `description`) VALUES ('ATTACK_2', 'Destroy the line of site (LOS) turret', 'Destroying this turret will require strafing [A, D]');

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_tutorial_users` AS select `tu`.`created` AS `created`,`tu`.`updated` AS `updated`,`tu`.`tutorialId` AS `tutorialId`,`tu`.`userId` AS `userId`,`tu`.`timeMs` AS `timeMs`,`t`.`name` AS `tutorialName`,`t`.`description` AS `tutorialDescription`,`u`.`steamid` AS `userSteamId`,`u`.`personaname` AS `userPersonaname`,(select count(`sub`.`userId`) from `tutorial_users` `sub` where (`sub`.`timeMs` < `tu`.`timeMs`)) AS `userRank` from ((`tutorial_users` `tu` join `tutorials` `t` on((`tu`.`tutorialId` = `t`.`id`))) join `users` `u` on((`tu`.`userId` = `u`.`id`)));

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_tutorials` AS select `tutorials`.`id` AS `id`,`tutorials`.`name` AS `name`,`tutorials`.`description` AS `description` from `tutorials`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_users` AS select `users`.`id` AS `id`,`users`.`steamid` AS `steamid`,`users`.`personaname` AS `personaname` from `users`;

USE `new_america`;
DROP procedure IF EXISTS `sp_create_update_user`;

DELIMITER $$
USE `new_america`$$
CREATE PROCEDURE `sp_create_update_user` (
	IN _id int,
    IN _steamid int,
    IN _personaname VARCHAR(180)
)
BEGIN
	IF EXISTS (SELECT 1 FROM v_users WHERE id=_id) THEN
		BEGIN
			UPDATE users 
			SET
				 steamid=_steamid,
                 personaname=_personaname
			WHERE id=_id;
		END;
        SELECT id, steamid, personaname FROM v_users WHERE id=_id LIMIT 1;
	ELSE
    BEGIN
			INSERT into users (
				steamid, 
                personaname
			) VALUES (
				_steamid,
				_personaname
			);
		END;
        SELECT id, steamid, personaname FROM v_users WHERE id=LAST_INSERT_ID() LIMIT 1;
	END IF;
END$$

DELIMITER ;

