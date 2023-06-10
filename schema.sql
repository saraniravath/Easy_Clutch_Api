CREATE TABLE `trainer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `session_per_package` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trainer_idx` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `trainee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `active` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_trainee_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `vehicle_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `leave` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `FN_or_AN` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `package` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trainee_id` int NOT NULL,
  `transaction_id` varchar(45) NOT NULL,
  `package_vehicle_type_id` int NOT NULL,
  `remaining_sessions` int NOT NULL,
  `active` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`trainee_id`),
  KEY `id_idx` (`trainee_id`),
  KEY `trainee_id_idx` (`trainee_id`),
  KEY `type_idx` (`package_vehicle_type_id`),
  CONSTRAINT `package_ibfk_1` FOREIGN KEY (`package_vehicle_type_id`) REFERENCES `vehicle_type` (`id`),
  CONSTRAINT `package_trainee_id` FOREIGN KEY (`trainee_id`) REFERENCES `trainee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- CREATE TABLE `trainee_access_token` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `trainee_id` int NOT NULL,
--   `token` varchar(45) DEFAULT NULL,
--   `expiry` varchar(45) NOT NULL DEFAULT '5 days',
--   PRIMARY KEY (`id`),
--   KEY `trainee_id_idx` (`trainee_id`),
--   CONSTRAINT `trainee_id` FOREIGN KEY (`trainee_id`) REFERENCES `trainee` (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `trainee_otp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trainee_id` int NOT NULL,
  `otp_key` varchar(45) DEFAULT NULL,
  `expiry` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trainee_id_idx` (`trainee_id`),
  CONSTRAINT `id` FOREIGN KEY (`trainee_id`) REFERENCES `trainee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- CREATE TABLE `trainer_access_token` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `token` varchar(45) DEFAULT NULL,
--   `trainer_id` int NOT NULL,
--   `expiry` varchar(45) DEFAULT '5 days',
--   PRIMARY KEY (`id`,`trainer_id`),
--   KEY `id_idx` (`trainer_id`),
--   CONSTRAINT `trainer_token_id` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `trainer_otp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trainer_id` int NOT NULL,
  `otp_key` varchar(45) DEFAULT NULL,
  `expiry` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`trainer_id`),
  KEY `trainer_otp_idx` (`trainer_id`),
  CONSTRAINT `trainer_id` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model_name` varchar(20) NOT NULL,
  `registration_number` varchar(20) NOT NULL,
  `type` int NOT NULL,
  `active` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `type_idx` (`type`),
  CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`type`) REFERENCES `vehicle_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `booked_session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `date` date NOT NULL,
  `FN_or_AN` varchar(45) NOT NULL,
  `vehicle_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id_idx` (`package_id`),
  KEY `vehicle_id_idx` (`vehicle_id`),
  CONSTRAINT `package_id` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`),
  CONSTRAINT `vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `vehicle_type` (`id`,`name`,`price`) VALUES (2,'2 wheeler','1000');
INSERT INTO `vehicle_type` (`id`,`name`,`price`) VALUES (3,'3 wheeler','2000');
INSERT INTO `vehicle_type` (`id`,`name`,`price`) VALUES (4,'4 wheeler','5000');
INSERT INTO `vehicle_type` (`id`,`name`,`price`) VALUES (5,'Heavy','5000');