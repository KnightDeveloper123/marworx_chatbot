-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: chatbot
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat_titles`
--

DROP TABLE IF EXISTS `chat_titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_titles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chat_titles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_titles`
--

LOCK TABLES `chat_titles` WRITE;
/*!40000 ALTER TABLE `chat_titles` DISABLE KEYS */;
INSERT INTO `chat_titles` VALUES (1,'Hello, how are you',2,'2025-03-28 06:25:52',NULL,1),(2,'Hello, how are you',2,'2025-03-28 06:27:14',NULL,0),(3,'Hello',3,'2025-03-28 06:29:13',NULL,0),(4,'New Chat 28 March 2025',NULL,'2025-03-28 10:02:44',NULL,0),(5,'New Chat 28 March 2025',NULL,'2025-03-28 10:05:37',NULL,0),(6,'New Chat 28 March 2025',NULL,'2025-03-28 10:06:31',NULL,0),(7,'New Chat 28 March 2025',2,'2025-03-28 10:08:50',NULL,1),(8,'New Chat 28 March 2025',2,'2025-03-28 10:10:45',NULL,1),(9,'New Chat 28 March 2025',2,'2025-03-28 10:11:25',NULL,1),(10,'New Chat 28 March 2025',2,'2025-03-28 10:13:02',NULL,1),(11,'New Chat 28 March 2025',2,'2025-03-28 10:19:10',NULL,0),(12,'New Chat 28 March 2025',2,'2025-03-28 10:36:27',NULL,0),(13,'New Chat 29 March 2025',3,'2025-03-29 05:48:32',NULL,0),(14,'New Chat 29 March 2025',3,'2025-03-29 05:51:37',NULL,0);
/*!40000 ALTER TABLE `chat_titles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_id` int DEFAULT NULL,
  `sender` enum('user','bot') DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `title_id` (`title_id`),
  CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`title_id`) REFERENCES `chat_titles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- 
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (3,2,'user','Hello, how are you doing today?','2025-03-28 06:27:14'),(4,2,'bot','I\'m doing well, thank you!','2025-03-28 06:27:14'),(5,3,'user','Hello','2025-03-28 06:29:13'),(6,3,'bot','Hi,How are You?','2025-03-28 06:29:13'),(8,1,'user','Hello, this is a new chat message!','2025-03-28 06:36:43'),(9,2,'user','Hello, this is a new chat message!','2025-03-28 06:37:22'),(10,2,'bot','Ok,what can i help you?','2025-03-28 06:37:57'),(11,2,'user','hello','2025-03-28 07:50:59'),(12,2,'bot','Hi there! How can I help you today?','2025-03-28 07:50:59'),(13,1,'user','hi','2025-03-28 07:51:38'),(14,1,'bot','Hello! How can I help? ','2025-03-28 07:51:38'),(15,4,NULL,NULL,'2025-03-28 10:02:44'),(16,4,NULL,NULL,'2025-03-28 10:02:44'),(17,5,NULL,NULL,'2025-03-28 10:05:37'),(18,5,NULL,NULL,'2025-03-28 10:05:37'),(19,6,NULL,NULL,'2025-03-28 10:06:31'),(20,6,NULL,NULL,'2025-03-28 10:06:31'),(21,7,'user','Hi','2025-03-28 10:08:50'),(22,7,NULL,NULL,'2025-03-28 10:08:50'),(23,7,'user','hello','2025-03-28 10:10:08'),(24,7,'bot','Hi there! How can I help you today?','2025-03-28 10:10:09'),(25,8,'user','hey there','2025-03-28 10:10:45'),(26,8,NULL,NULL,'2025-03-28 10:10:45'),(27,9,'user','hey there','2025-03-28 10:11:25'),(28,9,NULL,NULL,'2025-03-28 10:11:25'),(29,10,'user','hello','2025-03-28 10:13:02'),(30,10,NULL,NULL,'2025-03-28 10:13:02'),(31,10,'user','helllo','2025-03-28 10:15:27'),(32,10,'bot','Hi there! How can I help you today?','2025-03-28 10:15:27'),(33,10,'user','how are you','2025-03-28 10:15:39'),(34,10,'bot','I\'m doing well. Thank you. How can I assist you today?','2025-03-28 10:15:39'),(35,11,'user','hello theree','2025-03-28 10:19:10'),(36,11,'bot',' I\'m not sure about that. Can you ask something related to Thermax, chillers, or water treatment?','2025-03-28 10:19:10'),(37,12,'user','Hello','2025-03-28 10:36:27'),(38,12,'bot','Hi there! How can I help you today?','2025-03-28 10:36:27'),(39,NULL,'user','dsadsa','2025-03-29 05:17:53'),(40,3,'user','water','2025-03-29 05:24:46'),(41,3,'user','what is water','2025-03-29 05:25:40'),(42,3,'user','hiiii','2025-03-29 05:28:30'),(43,13,'user','water','2025-03-29 05:48:32'),(44,13,'bot','Network Error','2025-03-29 05:48:32'),(45,13,'user','hjhjhj','2025-03-29 05:48:49'),(46,13,'bot','Network Error','2025-03-29 05:48:51'),(47,13,'user','jhgjhghjg','2025-03-29 05:51:28'),(48,13,'bot','Network Error','2025-03-29 05:51:37'),(49,14,'user','sdsadsads','2025-03-29 05:51:37'),(50,14,'bot','Network Error','2025-03-29 05:51:37'),(51,14,'user','water','2025-03-29 05:54:44'),(52,14,'bot','Network Error','2025-03-29 05:54:46'),(53,14,'user','gjfgj','2025-03-29 05:57:38'),(54,13,'user','fdgdf','2025-03-29 05:57:43'),(55,14,'bot','Network Error','2025-03-29 05:59:21'),(56,13,'bot','Network Error','2025-03-29 05:59:21');
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,'NewDatasets.pdf','2025-03-27 12:29:08',0),(2,'Thermax Datasets .xlsx','2025-03-27 12:29:21',0),(3,'Ecomac Dataset.txt','2025-03-28 05:43:55',0);
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(10) DEFAULT NULL,
  `role` varchar(40) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  `date_of_birth` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Animesh Pradhan','dr.illuminati.06@gmail.com','$2b$10$Y4hJ1yLveTxjJL23vmam5evCyTHDWoSkvhE85q2OCibbJR6LNeBXC','8765789087','admin',0,'2025-03-27 06:57:22','2025-04-25 13:03:16','2025-04-25 13:03:16',NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sector`
--

DROP TABLE IF EXISTS `product_sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_sector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sector_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sector_id` (`sector_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_sector_ibfk_1` FOREIGN KEY (`sector_id`) REFERENCES `sector` (`id`),
  CONSTRAINT `product_sector_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product_service` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sector`
--

LOCK TABLES `product_sector` WRITE;
/*!40000 ALTER TABLE `product_sector` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_service`
--

DROP TABLE IF EXISTS `product_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_service`
--

LOCK TABLES `product_service` WRITE;
/*!40000 ALTER TABLE `product_service` DISABLE KEYS */;
INSERT INTO `product_service` VALUES (1,'Thermax','Thermax Ltd is an Indian multinational engineering conglomerate, involved in clean air, clean energy and clean water, headquartered in Pune.','1745585982930-490550320.jpg','2025-04-25 12:59:42',NULL,0);
/*!40000 ALTER TABLE `product_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` text,
  `icon` varchar(255) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
/*!40000 ALTER TABLE `sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support`
--

DROP TABLE IF EXISTS `support`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `support` (
  `id` int NOT NULL AUTO_INCREMENT,
  `query` text,
  `user_id` int DEFAULT NULL,
  `assignee_id` int DEFAULT NULL,
  `status` int DEFAULT '0',
  `query_status` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `assignee_id` (`assignee_id`),
  CONSTRAINT `support_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `support_ibfk_2` FOREIGN KEY (`assignee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support`
--

LOCK TABLES `support` WRITE;
/*!40000 ALTER TABLE `support` DISABLE KEYS */;
INSERT INTO `support` VALUES (1,'Unable to Login to the application.',1,1,0,'resolved','2025-03-27 09:46:39','2025-03-27 09:48:34');
/*!40000 ALTER TABLE `support` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(10) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  `date_of_birth` timestamp NULL DEFAULT NULL,
  `account_status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Ashwin Gh','ashwingh@gmail.com','$2b$10$Yhv1Lkt3OaZFn00SYws.7ePBC4G.qwK0fKyJRK/MTNtAz74kvJYjW','123456789',1,'2025-03-27 08:45:59','2025-03-27 09:09:01',NULL,NULL,0),(2,'Sharv S','sharv@gmail.com','$2b$10$A.CS56i73o1XQSJfIM4OpeyeOCsVnc8DJYMFdrOuWMMbx9LG.J1.e','1234567890',0,'2025-03-27 08:50:22','2025-03-28 10:31:31','2025-03-28 10:31:31',NULL,0),(3,'Animesh','animesh@gmail.com','$2b$10$wSJywrCLACEzOt.6SgQPtuvpaaTG3tLAeT4de9g9JN/QAqIC/Onim','1234567890',0,'2025-03-27 08:50:42','2025-03-29 05:07:35','2025-03-29 05:07:35',NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-26 10:35:18
