-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: chatbot
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
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
  `profile` varchar(255) DEFAULT NULL,
  `is_active` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Animesh Pradhan','priyanka123@mailinator.com','$2b$10$Czhow0YK6axeda2Whpet3./nI29mE8.xSuDqdlf6yHLZv0ZOkBCX.','1234567899','Super-Admin',0,'2025-03-27 06:57:22','2025-05-22 05:45:31','2025-05-22 05:45:31','2025-02-23 18:30:00','1745844099857-919036082.png',0),(2,'priyanka','priyanka@mailinator.com','$2b$10$PNredsQm8ld0m.JBLWvkY.dZSrXep3lARrEJtgJCHdvLwdS5vqkrO','1234567898','Admin',0,'2025-04-28 10:04:41','2025-05-22 06:59:38','2025-05-22 06:59:38','2025-04-15 18:30:00','1745836640644-101652830.jpg',0),(3,'sushil','sushil@mailintor.com',NULL,'2345678987','Admin',0,'2025-04-30 07:47:45','2025-04-30 07:47:45',NULL,'2025-04-09 18:30:00',NULL,0);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bot_events`
--

DROP TABLE IF EXISTS `bot_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bot_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bot_id` int NOT NULL,
  `bot_type` varchar(100) DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `event_type` varchar(50) DEFAULT 'start',
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `bot_id` (`bot_id`),
  CONSTRAINT `bot_events_ibfk_1` FOREIGN KEY (`bot_id`) REFERENCES `bots` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bot_events`
--

LOCK TABLES `bot_events` WRITE;
/*!40000 ALTER TABLE `bot_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `bot_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bot_users`
--

DROP TABLE IF EXISTS `bot_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bot_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bot_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `bot_id` (`bot_id`),
  CONSTRAINT `bot_users_ibfk_1` FOREIGN KEY (`bot_id`) REFERENCES `bots` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bot_users`
--

LOCK TABLES `bot_users` WRITE;
/*!40000 ALTER TABLE `bot_users` DISABLE KEYS */;
INSERT INTO `bot_users` VALUES (1,90,2,'2025-05-27 06:00:04'),(2,90,1,'2025-05-27 06:12:54'),(3,93,1,'2025-05-27 06:13:10'),(4,93,3,'2025-05-27 06:13:17'),(5,93,2,'2025-05-27 06:13:22'),(6,94,2,'2025-05-27 07:25:39'),(7,2,1,'2025-05-27 07:27:04'),(8,10,3,'2025-05-27 07:27:51'),(9,90,1,'2025-05-27 09:29:05'),(10,90,2,'2025-05-27 09:29:11'),(11,90,3,'2025-05-27 09:29:17'),(12,10,3,'2025-05-28 07:21:59'),(13,54,2,'2025-05-28 09:54:38'),(14,56,2,'2025-05-28 10:18:55');
/*!40000 ALTER TABLE `bot_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bots`
--

DROP TABLE IF EXISTS `bots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `nodes` json DEFAULT NULL,
  `edges` json DEFAULT NULL,
  `sector_id` int DEFAULT NULL,
  `bot_type` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `admin_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bots`
--

LOCK TABLES `bots` WRITE;
/*!40000 ALTER TABLE `bots` DISABLE KEYS */;
INSERT INTO `bots` VALUES (1,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -150.5, \"y\": 37}, \"selected\": false, \"positionAbsolute\": {\"x\": -150.5, \"y\": 37}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"position\": {\"x\": -47, \"y\": 86.5}, \"positionAbsolute\": {\"x\": -47, \"y\": 86.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:39:28',NULL),(2,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -165.5, \"y\": 100}, \"selected\": false, \"positionAbsolute\": {\"x\": -165.5, \"y\": 100}}, {\"id\": \"2\", \"data\": {\"label\": \"hii\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 14.5, \"y\": 135}, \"selected\": false, \"positionAbsolute\": {\"x\": 14.5, \"y\": 135}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:41:05',NULL),(3,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -165.5, \"y\": 100}, \"selected\": false, \"positionAbsolute\": {\"x\": -165.5, \"y\": 100}}, {\"id\": \"2\", \"data\": {\"label\": \"hii\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 14.5, \"y\": 135}, \"selected\": false, \"positionAbsolute\": {\"x\": 14.5, \"y\": 135}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:41:45',NULL),(4,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -165.5, \"y\": 100}, \"selected\": false, \"positionAbsolute\": {\"x\": -165.5, \"y\": 100}}, {\"id\": \"2\", \"data\": {\"label\": \"hii\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 14.5, \"y\": 135}, \"selected\": false, \"positionAbsolute\": {\"x\": 14.5, \"y\": 135}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:43:59',NULL),(5,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -164, \"y\": 101}, \"selected\": false, \"positionAbsolute\": {\"x\": -164, \"y\": 101}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 143.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -45, \"y\": 143.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:44:27',NULL),(6,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -164, \"y\": 101}, \"selected\": false, \"positionAbsolute\": {\"x\": -164, \"y\": 101}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 143.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -45, \"y\": 143.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:44:50',NULL),(7,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -164, \"y\": 101}, \"selected\": false, \"positionAbsolute\": {\"x\": -164, \"y\": 101}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 143.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -45, \"y\": 143.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:45:34',NULL),(8,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -164, \"y\": 101}, \"selected\": false, \"positionAbsolute\": {\"x\": -164, \"y\": 101}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 143.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -45, \"y\": 143.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:46:42',NULL),(9,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -164, \"y\": 101}, \"selected\": false, \"positionAbsolute\": {\"x\": -164, \"y\": 101}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 143.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -45, \"y\": 143.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:46:53',NULL),(10,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -164, \"y\": 101}, \"selected\": false, \"positionAbsolute\": {\"x\": -164, \"y\": 101}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 143.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -45, \"y\": 143.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:47:31',NULL),(11,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -164, \"y\": 101}, \"selected\": false, \"positionAbsolute\": {\"x\": -164, \"y\": 101}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 143.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -45, \"y\": 143.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:49:52',NULL),(12,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -164, \"y\": 101}, \"selected\": false, \"positionAbsolute\": {\"x\": -164, \"y\": 101}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 143.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -45, \"y\": 143.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 10:50:19',NULL),(13,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -164, \"y\": 101}, \"selected\": false, \"positionAbsolute\": {\"x\": -164, \"y\": 101}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 143.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -45, \"y\": 143.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 11:02:03',2),(14,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -164, \"y\": 101}, \"selected\": false, \"positionAbsolute\": {\"x\": -164, \"y\": 101}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 143.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -45, \"y\": 143.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 11:34:01',2),(15,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -136.5, \"y\": 52}, \"selected\": false, \"positionAbsolute\": {\"x\": -136.5, \"y\": 52}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -31, \"y\": 84.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -31, \"y\": 84.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"not\"]}, \"type\": \"ReplyButton\", \"width\": 152, \"height\": 122, \"dragging\": false, \"position\": {\"x\": 119.5, \"y\": 161}, \"selected\": false, \"positionAbsolute\": {\"x\": 119.5, \"y\": 161}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 11:42:13',2),(16,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -200.5, \"y\": 99.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -200.5, \"y\": 99.5}}, {\"id\": \"2\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"option one \", \"option two\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 138, \"dragging\": false, \"position\": {\"x\": -67, \"y\": 130.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -67, \"y\": 130.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 143, \"y\": 150}, \"selected\": true, \"positionAbsolute\": {\"x\": 143, \"y\": 150}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option-0-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}]',NULL,NULL,'2025-05-19 11:43:30',2),(17,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -200.5, \"y\": 99.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -200.5, \"y\": 99.5}}, {\"id\": \"2\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"option one \", \"option two\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 138, \"dragging\": false, \"position\": {\"x\": -67, \"y\": 130.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -67, \"y\": 130.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 143, \"y\": 150}, \"selected\": true, \"positionAbsolute\": {\"x\": 143, \"y\": 150}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option-0-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}]',NULL,NULL,'2025-05-19 11:43:57',2),(18,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -200.5, \"y\": 99.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -200.5, \"y\": 99.5}}, {\"id\": \"2\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"option one \", \"option two\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 138, \"dragging\": false, \"position\": {\"x\": -67, \"y\": 130.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -67, \"y\": 130.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 143, \"y\": 150}, \"selected\": true, \"positionAbsolute\": {\"x\": 143, \"y\": 150}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option-0-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}]',NULL,NULL,'2025-05-19 11:43:58',2),(19,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -200.5, \"y\": 99.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -200.5, \"y\": 99.5}}, {\"id\": \"2\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"option one \", \"option two\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 138, \"dragging\": false, \"position\": {\"x\": -67, \"y\": 130.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -67, \"y\": 130.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 143, \"y\": 150}, \"selected\": false, \"positionAbsolute\": {\"x\": 143, \"y\": 150}}, {\"id\": \"4\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": 326.5, \"y\": 200}, \"selected\": true, \"positionAbsolute\": {\"x\": 326.5, \"y\": 200}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option-0-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-19 11:44:12',2),(20,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -208, \"y\": 28}, \"selected\": false, \"positionAbsolute\": {\"x\": -208, \"y\": 28}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -10.5, \"y\": 42.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -10.5, \"y\": 42.5}}, {\"id\": \"3\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"item one \", \"item two\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 138, \"dragging\": false, \"position\": {\"x\": 148, \"y\": 74}, \"selected\": false, \"positionAbsolute\": {\"x\": 148, \"y\": 74}}]','[{\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',2,'algorithmic','2025-05-22 09:09:20',NULL),(21,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -186, \"y\": 32.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -186, \"y\": 32.5}}, {\"id\": \"5\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"item one \", \"item two\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 138, \"dragging\": false, \"position\": {\"x\": 4.5, \"y\": -58.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 4.5, \"y\": -58.5}}, {\"id\": \"6\", \"data\": {\"label\": \"yes\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 220.25, \"y\": -64.4}, \"selected\": false, \"positionAbsolute\": {\"x\": 220.25, \"y\": -64.4}}, {\"id\": \"7\", \"data\": {\"label\": \"no\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 222.75, \"y\": 20.59999999999999}, \"selected\": true, \"positionAbsolute\": {\"x\": 222.75, \"y\": 20.59999999999999}}]','[{\"id\": \"reactflow__edge-1-5\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"5\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-5option-0-4\", \"type\": \"smoothstep\", \"source\": \"5\", \"target\": \"4\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-5option-0-6\", \"type\": \"smoothstep\", \"source\": \"5\", \"target\": \"6\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-5option-1-7\", \"type\": \"smoothstep\", \"source\": \"5\", \"target\": \"7\", \"sourceHandle\": \"option-1\", \"targetHandle\": null}]',3,'algorithmic','2025-05-22 09:11:18',NULL),(22,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -185.5, \"y\": 72}, \"selected\": false, \"positionAbsolute\": {\"x\": -185.5, \"y\": 72}}, {\"id\": \"8\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -18.5, \"y\": 61}, \"selected\": false, \"positionAbsolute\": {\"x\": -18.5, \"y\": 61}}, {\"id\": \"9\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"no\"]}, \"type\": \"ReplyButton\", \"width\": 152, \"height\": 122, \"dragging\": false, \"position\": {\"x\": 133, \"y\": 86.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 133, \"y\": 86.5}}, {\"id\": \"10\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"item one\", \"item two\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 138, \"dragging\": false, \"position\": {\"x\": 334, \"y\": 112}, \"selected\": false, \"positionAbsolute\": {\"x\": 334, \"y\": 112}}]','[{\"id\": \"reactflow__edge-1-8\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"8\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-8-9\", \"type\": \"smoothstep\", \"source\": \"8\", \"target\": \"9\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-9option-0-10\", \"type\": \"smoothstep\", \"source\": \"9\", \"target\": \"10\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}]',NULL,NULL,'2025-05-22 09:12:11',NULL),(23,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -185.5, \"y\": 72}, \"selected\": false, \"positionAbsolute\": {\"x\": -185.5, \"y\": 72}}, {\"id\": \"8\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -18.5, \"y\": 61}, \"selected\": false, \"positionAbsolute\": {\"x\": -18.5, \"y\": 61}}, {\"id\": \"9\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"no\"]}, \"type\": \"ReplyButton\", \"width\": 152, \"height\": 122, \"dragging\": false, \"position\": {\"x\": 133, \"y\": 86.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 133, \"y\": 86.5}}, {\"id\": \"10\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"item one\", \"item two\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 138, \"dragging\": false, \"position\": {\"x\": 334, \"y\": 112}, \"selected\": false, \"positionAbsolute\": {\"x\": 334, \"y\": 112}}]','[{\"id\": \"reactflow__edge-1-8\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"8\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-8-9\", \"type\": \"smoothstep\", \"source\": \"8\", \"target\": \"9\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-9option-0-10\", \"type\": \"smoothstep\", \"source\": \"9\", \"target\": \"10\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}]',NULL,NULL,'2025-05-22 09:12:27',NULL),(24,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": 52, \"y\": 116.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 52, \"y\": 116.5}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 191, \"y\": 129.75}, \"selected\": true, \"positionAbsolute\": {\"x\": 191, \"y\": 129.75}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',2,'algorithmic','2025-05-22 09:14:46',NULL),(25,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -182, \"y\": 93.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -182, \"y\": 93.5}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -51, \"y\": 118.75}, \"selected\": false, \"positionAbsolute\": {\"x\": -51, \"y\": 118.75}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',2,'algorithmic','2025-05-22 09:17:58',2),(26,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -182, \"y\": 93.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -182, \"y\": 93.5}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -51, \"y\": 118.75}, \"selected\": false, \"positionAbsolute\": {\"x\": -51, \"y\": 118.75}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-22 10:02:18',NULL),(27,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -182, \"y\": 93.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -182, \"y\": 93.5}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -51, \"y\": 118.75}, \"selected\": false, \"positionAbsolute\": {\"x\": -51, \"y\": 118.75}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-22 10:23:25',NULL),(28,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -182, \"y\": 93.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -182, \"y\": 93.5}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -51, \"y\": 118.75}, \"selected\": false, \"positionAbsolute\": {\"x\": -51, \"y\": 118.75}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-22 13:07:39',NULL),(29,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -182, \"y\": 93.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -182, \"y\": 93.5}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -51, \"y\": 118.75}, \"selected\": false, \"positionAbsolute\": {\"x\": -51, \"y\": 118.75}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-22 13:14:13',NULL),(30,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Flight Data and Time \"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -132.5, \"y\": 69}, \"selected\": false, \"positionAbsolute\": {\"x\": -132.5, \"y\": 69}}, {\"id\": \"2\", \"data\": {\"file\": \"RS_Session_266_AU_3_A_i.csv\", \"label\": \"Google Sheets\"}, \"type\": \"GoogleSheetsNode\", \"width\": 273, \"height\": 81, \"dragging\": false, \"position\": {\"x\": 14.5, \"y\": 119.25}, \"selected\": false, \"positionAbsolute\": {\"x\": 14.5, \"y\": 119.25}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',3,'algorithmic','2025-05-24 09:44:31',2),(31,'New Bot',NULL,'[{\"id\": \"reactflow__edge-1-3\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',3,'algorithmic','2025-05-24 09:47:14',2),(32,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Passanger Information \"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -125, \"y\": 61.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -125, \"y\": 61.5}}, {\"id\": \"4\", \"data\": {\"label\": \"https://www.progressivetravel.org/form/passenger-information-form.php\"}, \"type\": \"CustomNode\", \"width\": 119, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -7, \"y\": 96.75}, \"selected\": true, \"positionAbsolute\": {\"x\": -7, \"y\": 96.75}}]','[{\"id\": \"reactflow__edge-1-4\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',3,'algorithmic','2025-05-24 09:49:25',2),(33,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Booking form\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -159, \"y\": 60}, \"selected\": false, \"positionAbsolute\": {\"x\": -159, \"y\": 60}}, {\"id\": \"5\", \"data\": {\"label\": \"https://www.jotform.com/form-templates/flight-booking-form\"}, \"type\": \"CustomNode\", \"width\": 119, \"height\": 57, \"dragging\": false, \"position\": {\"x\": 6.5, \"y\": 99.75}, \"selected\": false, \"positionAbsolute\": {\"x\": 6.5, \"y\": 99.75}}]','[{\"id\": \"reactflow__edge-1-5\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"5\", \"sourceHandle\": null, \"targetHandle\": null}]',3,'algorithmic','2025-05-24 09:50:21',2),(34,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"View Ticket\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": 100, \"y\": 150}, \"selected\": false, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}, {\"id\": \"7\", \"data\": {\"label\": \"Image\", \"fileUrl\": \"blob:http://localhost:5173/8defa821-1d62-431a-93b8-2fa0222b6ca0\", \"fileName\": \"Flight Ticket Billing Format.jpg\"}, \"type\": \"imageNode\", \"width\": 191, \"height\": 411, \"dragging\": false, \"position\": {\"x\": 224.5, \"y\": 197.25}, \"selected\": true, \"positionAbsolute\": {\"x\": 224.5, \"y\": 197.25}}]','[{\"id\": \"reactflow__edge-1-7\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"7\", \"sourceHandle\": null, \"targetHandle\": null}]',3,'algorithmic','2025-05-24 09:51:42',2),(35,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -496.7064498664386, \"y\": -179.98589265552255}, \"selected\": false, \"positionAbsolute\": {\"x\": -496.7064498664386, \"y\": -179.98589265552255}}, {\"id\": \"8\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"Flight\", \"Hotel\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 138, \"dragging\": false, \"position\": {\"x\": -419.6484066312336, \"y\": -115.19360603640548}, \"selected\": false, \"positionAbsolute\": {\"x\": -419.6484066312336, \"y\": -115.19360603640548}}, {\"id\": \"9\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"Booking \", \"Cancel\", \"Question\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 178, \"dragging\": false, \"position\": {\"x\": -234.2644931016436, \"y\": -122.46773574202052}, \"selected\": false, \"positionAbsolute\": {\"x\": -234.2644931016436, \"y\": -122.46773574202052}}, {\"id\": \"10\", \"data\": {\"label\": \"Ask for an email?\"}, \"type\": \"CustomNode\", \"width\": 119, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -50.661671632748146, \"y\": 60.509875141134245}, \"selected\": false, \"positionAbsolute\": {\"x\": -50.661671632748146, \"y\": 60.509875141134245}}, {\"id\": \"11\", \"data\": {\"label\": \"Thank You \"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -7.961011924103907, \"y\": -38.0838222124306}, \"selected\": false, \"positionAbsolute\": {\"x\": -7.961011924103907, \"y\": -38.0838222124306}}, {\"id\": \"12\", \"data\": {\"label\": \"Chosse Destination?(Button)\"}, \"type\": \"CustomNode\", \"width\": 119, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -68.2242769256185, \"y\": -211.04111442183205}, \"selected\": false, \"positionAbsolute\": {\"x\": -68.2242769256185, \"y\": -211.04111442183205}}, {\"id\": \"13\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"Pune to Mumbai\", \"Mumbai to Delhi\", \"Delhi  to Pune\", \"NO option\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 218, \"dragging\": false, \"position\": {\"x\": 120.04519940517184, \"y\": -194.1928550106019}, \"selected\": false, \"positionAbsolute\": {\"x\": 120.04519940517184, \"y\": -194.1928550106019}}, {\"id\": \"15\", \"data\": {\"label\": \"NO Option\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 298.3232277855239, \"y\": -17.37026765287294}, \"selected\": true, \"positionAbsolute\": {\"x\": 298.3232277855239, \"y\": -17.37026765287294}}]','[{\"id\": \"reactflow__edge-1-8\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"8\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-8option-0-9\", \"type\": \"smoothstep\", \"source\": \"8\", \"target\": \"9\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-9option-2-10\", \"type\": \"smoothstep\", \"source\": \"9\", \"target\": \"10\", \"sourceHandle\": \"option-2\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-9option-1-11\", \"type\": \"smoothstep\", \"source\": \"9\", \"target\": \"11\", \"sourceHandle\": \"option-1\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-9option-0-12\", \"type\": \"smoothstep\", \"source\": \"9\", \"target\": \"12\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-12-13\", \"type\": \"smoothstep\", \"source\": \"12\", \"target\": \"13\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-13option-3-15\", \"type\": \"smoothstep\", \"source\": \"13\", \"target\": \"15\", \"sourceHandle\": \"option-3\", \"targetHandle\": null}]',3,'algorithmic','2025-05-24 10:28:53',2),(36,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -136.5, \"y\": 52}, \"selected\": false, \"positionAbsolute\": {\"x\": -136.5, \"y\": 52}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -31, \"y\": 84.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -31, \"y\": 84.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"not\"]}, \"type\": \"ReplyButton\", \"width\": 151, \"height\": 121, \"dragging\": false, \"position\": {\"x\": 119.5, \"y\": 161}, \"selected\": false, \"positionAbsolute\": {\"x\": 119.5, \"y\": 161}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 07:38:22',2),(37,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -136.5, \"y\": 52}, \"selected\": false, \"positionAbsolute\": {\"x\": -136.5, \"y\": 52}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -31, \"y\": 84.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -31, \"y\": 84.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"not\"]}, \"type\": \"ReplyButton\", \"width\": 151, \"height\": 121, \"dragging\": false, \"position\": {\"x\": 119.5, \"y\": 161}, \"selected\": false, \"positionAbsolute\": {\"x\": 119.5, \"y\": 161}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:05:07',2),(38,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -136.5, \"y\": 52}, \"selected\": false, \"positionAbsolute\": {\"x\": -136.5, \"y\": 52}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -31, \"y\": 84.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -31, \"y\": 84.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"not\"]}, \"type\": \"ReplyButton\", \"width\": 151, \"height\": 121, \"dragging\": false, \"position\": {\"x\": 119.5, \"y\": 161}, \"selected\": false, \"positionAbsolute\": {\"x\": 119.5, \"y\": 161}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:06:00',2),(39,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -136.5, \"y\": 52}, \"selected\": false, \"positionAbsolute\": {\"x\": -136.5, \"y\": 52}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -31, \"y\": 84.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -31, \"y\": 84.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"not\"]}, \"type\": \"ReplyButton\", \"width\": 151, \"height\": 121, \"dragging\": false, \"position\": {\"x\": 119.5, \"y\": 161}, \"selected\": false, \"positionAbsolute\": {\"x\": 119.5, \"y\": 161}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:07:43',2),(40,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -136.5, \"y\": 52}, \"selected\": false, \"positionAbsolute\": {\"x\": -136.5, \"y\": 52}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -31, \"y\": 84.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -31, \"y\": 84.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"not\"]}, \"type\": \"ReplyButton\", \"width\": 151, \"height\": 121, \"dragging\": false, \"position\": {\"x\": 119.5, \"y\": 161}, \"selected\": false, \"positionAbsolute\": {\"x\": 119.5, \"y\": 161}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:17:31',2),(41,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -136.5, \"y\": 52}, \"selected\": false, \"positionAbsolute\": {\"x\": -136.5, \"y\": 52}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -31, \"y\": 84.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -31, \"y\": 84.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"not\"]}, \"type\": \"ReplyButton\", \"width\": 151, \"height\": 121, \"dragging\": false, \"position\": {\"x\": 119.5, \"y\": 161}, \"selected\": false, \"positionAbsolute\": {\"x\": 119.5, \"y\": 161}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:19:37',2),(42,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -136.5, \"y\": 52}, \"selected\": false, \"positionAbsolute\": {\"x\": -136.5, \"y\": 52}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -31, \"y\": 84.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -31, \"y\": 84.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:31:02',2),(43,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -136.5, \"y\": 52}, \"selected\": false, \"positionAbsolute\": {\"x\": -136.5, \"y\": 52}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -31, \"y\": 84.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -31, \"y\": 84.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:32:57',2),(44,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -136.5, \"y\": 52}, \"selected\": false, \"positionAbsolute\": {\"x\": -136.5, \"y\": 52}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -31, \"y\": 84.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -31, \"y\": 84.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:41:36',2),(45,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -213, \"y\": 15.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -213, \"y\": 15.5}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -71.5, \"y\": 41.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -71.5, \"y\": 41.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:43:58',2),(46,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -213, \"y\": 15.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -213, \"y\": 15.5}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -71.5, \"y\": 41.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -71.5, \"y\": 41.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:45:47',2),(47,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -213, \"y\": 15.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -213, \"y\": 15.5}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -71.5, \"y\": 41.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -71.5, \"y\": 41.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:47:07',2),(48,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -213, \"y\": 15.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -213, \"y\": 15.5}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -71.5, \"y\": 41.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -71.5, \"y\": 41.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:48:03',2),(49,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -213, \"y\": 15.5}, \"selected\": true, \"positionAbsolute\": {\"x\": -213, \"y\": 15.5}}, {\"id\": \"2\", \"data\": {\"label\": \"hi\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": -71.5, \"y\": 41.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -71.5, \"y\": 41.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:48:04',2),(50,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": 68, \"y\": 75}, \"selected\": false, \"positionAbsolute\": {\"x\": 68, \"y\": 75}}, {\"id\": \"2\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"no\"]}, \"type\": \"ReplyButton\", \"width\": 151, \"height\": 121, \"dragging\": false, \"position\": {\"x\": 133.75, \"y\": 114.25}, \"selected\": true, \"positionAbsolute\": {\"x\": 133.75, \"y\": 114.25}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:49:13',2),(51,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": 68, \"y\": 75}, \"selected\": false, \"positionAbsolute\": {\"x\": 68, \"y\": 75}}, {\"id\": \"2\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"no\"]}, \"type\": \"ReplyButton\", \"width\": 151, \"height\": 121, \"dragging\": false, \"position\": {\"x\": 133.75, \"y\": 114.25}, \"selected\": true, \"positionAbsolute\": {\"x\": 133.75, \"y\": 114.25}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:49:31',2),(52,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": 68, \"y\": 75}, \"selected\": false, \"positionAbsolute\": {\"x\": 68, \"y\": 75}}, {\"id\": \"2\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"yes\", \"no\"]}, \"type\": \"ReplyButton\", \"width\": 151, \"height\": 121, \"dragging\": false, \"position\": {\"x\": 133.75, \"y\": 114.25}, \"selected\": true, \"positionAbsolute\": {\"x\": 133.75, \"y\": 114.25}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:50:34',2),(53,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"hi\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": 62, \"y\": 93.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 62, \"y\": 93.5}}, {\"id\": \"2\", \"data\": {\"label\": \"how are you?\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 151.75, \"y\": 155.25}, \"selected\": false, \"positionAbsolute\": {\"x\": 151.75, \"y\": 155.25}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:52:09',2),(54,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": 49.5, \"y\": 85}, \"selected\": false, \"positionAbsolute\": {\"x\": 49.5, \"y\": 85}}, {\"id\": \"2\", \"data\": {\"label\": \"hello\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 132.25, \"y\": 142.75}, \"selected\": true, \"positionAbsolute\": {\"x\": 132.25, \"y\": 142.75}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 09:54:37',2),(55,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": 49.5, \"y\": 85}, \"selected\": false, \"positionAbsolute\": {\"x\": 49.5, \"y\": 85}}, {\"id\": \"2\", \"data\": {\"label\": \"hello\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 132.25, \"y\": 142.75}, \"selected\": true, \"positionAbsolute\": {\"x\": 132.25, \"y\": 142.75}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-28 10:04:21',2),(56,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -200.5, \"y\": 99.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -200.5, \"y\": 99.5}}, {\"id\": \"2\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"option one \", \"option two\"]}, \"type\": \"ListButton\", \"width\": 151, \"height\": 129, \"dragging\": false, \"position\": {\"x\": -67, \"y\": 130.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -67, \"y\": 130.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 143, \"y\": 150}, \"selected\": true, \"positionAbsolute\": {\"x\": 143, \"y\": 150}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option-0-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}]',NULL,NULL,'2025-05-28 10:18:53',2);
/*!40000 ALTER TABLE `bots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int DEFAULT NULL,
  `channel_name` varchar(255) DEFAULT NULL,
  `campaign_name` varchar(255) DEFAULT NULL,
  `message_content` varchar(255) DEFAULT NULL,
  `template_name` varchar(255) DEFAULT NULL,
  `sector_id` int DEFAULT NULL,
  `template_type` varchar(255) DEFAULT NULL,
  `template_lang` varchar(255) DEFAULT NULL,
  `header` varchar(255) DEFAULT NULL,
  `body` varchar(300) DEFAULT NULL,
  `button` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  `is_status` varchar(25) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `from` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (1,2,'marworx1','Advertsie','Sales all product','sales',NULL,'marketing','marathi','sales','all sales done?',NULL,'2025-04-29 06:05:20','2025-04-29 06:15:07',1,NULL,NULL,NULL),(2,2,'marworx2','Advertsie','Sales all product','sales',NULL,'marketing','marathi','sales','all sales done?',NULL,'2025-04-29 06:15:03','2025-04-29 09:04:59',1,NULL,NULL,NULL),(3,2,'marworx3','Advertsie','Sales all product','sales',1,'marketing','marathi','sales','all sales done?',NULL,'2025-04-29 07:38:53','2025-04-29 09:05:57',0,'Sent',NULL,NULL),(4,NULL,'marworx3','Advertsie','Sales all product','sales',1,'department','marathi','sales','all sales done?',NULL,'2025-04-29 07:40:29',NULL,0,'Sent',NULL,NULL),(5,2,'Whatsapp','Advertise1',NULL,'sales',1,'alert','marathi','sales','sales',NULL,'2025-05-28 10:28:01',NULL,0,'Sent','Preston',NULL),(6,2,'Whatsapp','Adervise2',NULL,'sales',1,'alert','english','sales','sales',NULL,'2025-05-28 10:33:26',NULL,0,'Sent','Aimee',NULL),(7,2,'Whatsapp','Advertise',NULL,'sales',1,'marketing ','english','sales','sales',NULL,'2025-05-28 10:53:50',NULL,0,'Sent','Linda',NULL),(8,2,'Whatsapp','Advertise',NULL,'sales',1,'marketing ','english','sales','sales',NULL,'2025-05-28 10:54:42',NULL,0,'Sent','Linda',NULL),(9,2,'Whatsapp','Advertsie1',NULL,'sales',1,'alert','marathi','sales','sales',NULL,'2025-05-28 11:00:41',NULL,0,'Sent','Darren',NULL);
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campaign_users`
--

DROP TABLE IF EXISTS `campaign_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `campaign_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign_users`
--

LOCK TABLES `campaign_users` WRITE;
/*!40000 ALTER TABLE `campaign_users` DISABLE KEYS */;
INSERT INTO `campaign_users` VALUES (1,9,2,'2025-05-28 11:00:41');
/*!40000 ALTER TABLE `campaign_users` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_titles`
--

LOCK TABLES `chat_titles` WRITE;
/*!40000 ALTER TABLE `chat_titles` DISABLE KEYS */;
INSERT INTO `chat_titles` VALUES (1,'Hello, how are you',2,'2025-03-28 06:25:52',NULL,1),(2,'Hello, how are you',2,'2025-03-28 06:27:14',NULL,0),(3,'Hello',3,'2025-03-28 06:29:13',NULL,0),(4,'New Chat 28 March 2025',NULL,'2025-03-28 10:02:44',NULL,0),(5,'New Chat 28 March 2025',NULL,'2025-03-28 10:05:37',NULL,0),(6,'New Chat 28 March 2025',NULL,'2025-03-28 10:06:31',NULL,0),(7,'New Chat 28 March 2025',2,'2025-03-28 10:08:50',NULL,1),(8,'New Chat 28 March 2025',2,'2025-03-28 10:10:45',NULL,1),(9,'New Chat 28 March 2025',2,'2025-03-28 10:11:25',NULL,1),(10,'New Chat 28 March 2025',2,'2025-03-28 10:13:02',NULL,1),(11,'New Chat 28 March 2025',2,'2025-03-28 10:19:10',NULL,0),(12,'New Chat 28 March 2025',2,'2025-03-28 10:36:27',NULL,0),(13,'New Chat 29 March 2025',3,'2025-03-29 05:48:32',NULL,0),(14,'New Chat 29 March 2025',3,'2025-03-29 05:51:37',NULL,0),(15,'New Chat 13 May 2025',4,'2025-05-13 09:47:33',NULL,0),(16,'New Chat 13 May 2025',4,'2025-05-13 10:08:00',NULL,0),(17,'New Chat 14 May 2025',4,'2025-05-14 06:11:00',NULL,0),(18,'New Chat 14 May 2025',4,'2025-05-14 06:30:37',NULL,0),(19,'New Chat 15 May 2025',4,'2025-05-15 05:31:31',NULL,0),(20,'New Chat 15 May 2025',4,'2025-05-15 10:45:20',NULL,0),(21,'New Chat 15 May 2025',4,'2025-05-15 10:56:29',NULL,0),(22,'New Chat 15 May 2025',4,'2025-05-15 10:57:36',NULL,0),(23,'New Chat 15 May 2025',4,'2025-05-15 11:21:17',NULL,0),(24,'New Chat 15 May 2025',4,'2025-05-15 11:22:47',NULL,0),(25,'New Chat 17 May 2025',4,'2025-05-17 09:14:26',NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (3,2,'user','Hello, how are you doing today?','2025-03-28 06:27:14'),(4,2,'bot','I\'m doing well, thank you!','2025-03-28 06:27:14'),(5,3,'user','Hello','2025-03-28 06:29:13'),(6,3,'bot','Hi,How are You?','2025-03-28 06:29:13'),(8,1,'user','Hello, this is a new chat message!','2025-03-28 06:36:43'),(9,2,'user','Hello, this is a new chat message!','2025-03-28 06:37:22'),(10,2,'bot','Ok,what can i help you?','2025-03-28 06:37:57'),(11,2,'user','hello','2025-03-28 07:50:59'),(12,2,'bot','Hi there! How can I help you today?','2025-03-28 07:50:59'),(13,1,'user','hi','2025-03-28 07:51:38'),(14,1,'bot','Hello! How can I help? ','2025-03-28 07:51:38'),(15,4,NULL,NULL,'2025-03-28 10:02:44'),(16,4,NULL,NULL,'2025-03-28 10:02:44'),(17,5,NULL,NULL,'2025-03-28 10:05:37'),(18,5,NULL,NULL,'2025-03-28 10:05:37'),(19,6,NULL,NULL,'2025-03-28 10:06:31'),(20,6,NULL,NULL,'2025-03-28 10:06:31'),(21,7,'user','Hi','2025-03-28 10:08:50'),(22,7,NULL,NULL,'2025-03-28 10:08:50'),(23,7,'user','hello','2025-03-28 10:10:08'),(24,7,'bot','Hi there! How can I help you today?','2025-03-28 10:10:09'),(25,8,'user','hey there','2025-03-28 10:10:45'),(26,8,NULL,NULL,'2025-03-28 10:10:45'),(27,9,'user','hey there','2025-03-28 10:11:25'),(28,9,NULL,NULL,'2025-03-28 10:11:25'),(29,10,'user','hello','2025-03-28 10:13:02'),(30,10,NULL,NULL,'2025-03-28 10:13:02'),(31,10,'user','helllo','2025-03-28 10:15:27'),(32,10,'bot','Hi there! How can I help you today?','2025-03-28 10:15:27'),(33,10,'user','how are you','2025-03-28 10:15:39'),(34,10,'bot','I\'m doing well. Thank you. How can I assist you today?','2025-03-28 10:15:39'),(35,11,'user','hello theree','2025-03-28 10:19:10'),(36,11,'bot',' I\'m not sure about that. Can you ask something related to Thermax, chillers, or water treatment?','2025-03-28 10:19:10'),(37,12,'user','Hello','2025-03-28 10:36:27'),(38,12,'bot','Hi there! How can I help you today?','2025-03-28 10:36:27'),(39,NULL,'user','dsadsa','2025-03-29 05:17:53'),(40,3,'user','water','2025-03-29 05:24:46'),(41,3,'user','what is water','2025-03-29 05:25:40'),(42,3,'user','hiiii','2025-03-29 05:28:30'),(43,13,'user','water','2025-03-29 05:48:32'),(44,13,'bot','Network Error','2025-03-29 05:48:32'),(45,13,'user','hjhjhj','2025-03-29 05:48:49'),(46,13,'bot','Network Error','2025-03-29 05:48:51'),(47,13,'user','jhgjhghjg','2025-03-29 05:51:28'),(48,13,'bot','Network Error','2025-03-29 05:51:37'),(49,14,'user','sdsadsads','2025-03-29 05:51:37'),(50,14,'bot','Network Error','2025-03-29 05:51:37'),(51,14,'user','water','2025-03-29 05:54:44'),(52,14,'bot','Network Error','2025-03-29 05:54:46'),(53,14,'user','gjfgj','2025-03-29 05:57:38'),(54,13,'user','fdgdf','2025-03-29 05:57:43'),(55,14,'bot','Network Error','2025-03-29 05:59:21'),(56,13,'bot','Network Error','2025-03-29 05:59:21'),(57,15,'user','what is thermax','2025-05-13 09:47:33'),(58,15,'user','Hello','2025-05-13 09:50:06'),(59,15,'user','How does water treatment technology improve industrial efficiency?','2025-05-13 09:53:23'),(60,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 09:54:16'),(61,15,'user','sure','2025-05-13 09:55:23'),(62,15,'user','sure','2025-05-13 09:58:11'),(63,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 09:58:19'),(64,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 09:59:17'),(65,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:01:51'),(66,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:03:56'),(67,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:05:27'),(68,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:06:58'),(69,16,'user','Hi','2025-05-13 10:08:00'),(70,16,'user','sure','2025-05-13 10:10:18'),(71,17,'user','hi','2025-05-14 06:11:00'),(72,17,'user','sure','2025-05-14 06:22:19'),(73,17,'user','How does energy technology improve industrial efficiency?','2025-05-14 06:22:29'),(74,18,'user','hii','2025-05-14 06:30:37'),(75,19,'user','hi','2025-05-15 05:31:31'),(76,19,'user','sure','2025-05-15 05:32:53'),(77,15,'user','How does energy technology improve industrial efficiency?','2025-05-15 05:33:57'),(78,20,'user','hi','2025-05-15 10:45:20'),(79,20,'user','hi','2025-05-15 10:56:06'),(80,21,'user','hi','2025-05-15 10:56:29'),(81,15,'user','How does energy technology improve industrial efficiency?','2025-05-15 10:56:59'),(82,15,'user','Hello','2025-05-15 10:57:26'),(83,22,'user','Hello','2025-05-15 10:57:36'),(84,22,'user','How does energy technology improve industrial efficiency?','2025-05-15 11:00:33'),(85,23,'user','hi','2025-05-15 11:21:17'),(86,24,'user','How does energy technology improve industrial efficiency?','2025-05-15 11:22:47'),(87,24,'user','How does energy technology improve industrial efficiency?','2025-05-17 06:33:52'),(88,24,'bot','Optimizing Energy Usage In An Industrial Plant Requires A Combination Of Strategies. Implementing Waste Heat Recovery Systems Can Significantly Reduce Energy Losses By Utilizing Excess Heat For Preheating Processes. Upgrading Insulation In Pipeline And Boilers Helps Minimize Heat Loss. Using Energy-Efficient Equipment, Such As Variable Frequency Drives (Vfds) And High-Efficient Motors, Further Enhances Energy Saving. Regular Energy Audits Help Identify Areas For Improvement And Ensure Sustainable Energy Management.','2025-05-17 06:34:07'),(89,24,'user','hi','2025-05-17 06:34:33'),(90,24,'bot','I\'M Doing Well. Thank You. How Can I Assist You Today?','2025-05-17 06:34:37'),(91,24,'user','sure','2025-05-17 06:35:02'),(92,24,'bot','I Don\'T Know.','2025-05-17 06:35:03'),(93,24,'user','hello','2025-05-17 06:35:09'),(94,24,'bot','I\'M Doing Well. Thank You. How Can I Assist You Today?','2025-05-17 06:35:14'),(95,24,'user','hello','2025-05-17 06:37:17'),(96,24,'bot','I Don\'T Know.','2025-05-17 06:37:18'),(97,24,'user','What\'s up?','2025-05-17 06:37:45'),(98,24,'bot','I Don\'T Know.','2025-05-17 06:37:45'),(99,24,'user','Hi! How are you?','2025-05-17 06:38:20'),(100,24,'bot','I Don\'T Know.','2025-05-17 06:38:21'),(101,24,'user','Hi! How are you?','2025-05-17 06:38:25'),(102,24,'bot','I Don\'T Know.','2025-05-17 06:38:25'),(103,25,'user','Greetings and salutations','2025-05-17 09:14:26'),(104,25,'bot','I Don\'T Know.','2025-05-17 09:14:26'),(105,24,'user','hii','2025-05-17 12:01:55'),(106,24,'bot','Holi Is A Hindu Festival That Celebrates The Triumph Of Good Over Evil, The Arrival Of Spring, And The End Of Winter.','2025-05-17 12:04:57');
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `contact_name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,2,'conatct.csv','2025-04-30 12:55:55',0,'Sheryl','229.077.5154','zunigavanessa@smith.info'),(2,2,'conatct.csv','2025-04-30 12:55:55',0,'Preston','5153435776','vmata@colon.com'),(3,2,'conatct.csv','2025-04-30 12:55:55',0,'Roy','-1199','beckycarr@hogan.com'),(4,2,'conatct.csv','2025-04-30 12:55:55',0,'Linda','001-808-617-6467x12895','stanleyblackwell@benson.org'),(5,2,'conatct.csv','2025-04-30 12:55:55',0,'Joanna','001-234-203-0635x76146','colinalvarado@miles.net'),(6,2,'conatct.csv','2025-04-30 12:55:55',0,'Aimee','(283)437-3886x88321','louis27@gilbert.com'),(7,2,'conatct.csv','2025-04-30 12:55:55',0,'Darren','(496)452-6181x3291','tgates@cantrell.com'),(8,2,'conatct.csv','2025-04-30 12:55:55',0,'Brett','001-583-352-7197x297','asnow@colon.com'),(9,2,'conatct.csv','2025-04-30 12:55:55',0,'Sheryl','854-138-4911x5772','mariokhan@ryan-pope.org');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `sector_id` int DEFAULT NULL,
  `bot_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (7,2,'chatbot dataset.csv','2025-05-13 09:52:31',1,NULL,NULL),(8,2,'thermax.csv','2025-05-13 09:52:50',0,NULL,NULL);
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
  `admin_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(10) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  `date_of_birth` timestamp NULL DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `is_active` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,1,'rohit','rohit@gmail.com',NULL,'3456787654',0,'2025-04-30 10:18:46','2025-04-30 10:18:46',NULL,'2025-04-09 18:30:00',NULL,0),(2,2,'priyanka sharma','sharma@mailinator.com',NULL,'8308459428',0,'2025-05-13 05:25:21','2025-05-13 05:25:21',NULL,'2025-05-14 18:30:00',NULL,0),(3,2,'rohit','rohit@mailinator.com',NULL,'2345676567',0,'2025-05-17 09:16:32','2025-05-17 09:16:32',NULL,'2025-05-22 18:30:00',NULL,0);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `end_employee`
--

DROP TABLE IF EXISTS `end_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `end_employee` (
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
  `profile` varchar(255) DEFAULT NULL,
  `is_active` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `end_employee`
--

LOCK TABLES `end_employee` WRITE;
/*!40000 ALTER TABLE `end_employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `end_employee` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sector`
--

LOCK TABLES `product_sector` WRITE;
/*!40000 ALTER TABLE `product_sector` DISABLE KEYS */;
INSERT INTO `product_sector` VALUES (3,1,2),(4,1,1),(6,3,1),(7,2,1);
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
  `admin_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_service`
--

LOCK TABLES `product_service` WRITE;
/*!40000 ALTER TABLE `product_service` DISABLE KEYS */;
INSERT INTO `product_service` VALUES (1,2,'thermax pro1','dumy text','1745647829370-256756583.webp','2025-04-25 12:59:42',NULL,0),(2,NULL,'Thermax 1','Thermax Ltd is an Indian multinational engineering conglomerate, involved in clean air, clean energy and clean water, headquartered in Pune.','1745650438580-168009331.jpg','2025-04-26 06:53:58',NULL,0);
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
  `admin_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` text,
  `icon` varchar(255) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
INSERT INTO `sector` VALUES (1,2,'Dermatology','Healthcare','Bots for Dermatologyclinics','1745652248426-467745167.ico','2025-04-26 06:59:32',NULL,0),(2,2,'Industry','industrial','In the fast-paced manufacturing industry, scheduling meetings efficiently is critical to maintaining production timelines.','1747903453303-409849841.jpg','2025-05-14 10:13:11',NULL,0),(3,2,'Hotel','industrial',' is simply dummy text of the printing and typesetting industry.','1747475316323-467780180.jpg','2025-05-17 09:48:36',NULL,0);
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
  CONSTRAINT `support_ibfk_2` FOREIGN KEY (`assignee_id`) REFERENCES `admin` (`id`)
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
-- Table structure for table `template`
--

DROP TABLE IF EXISTS `template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `template` (
  `id` int NOT NULL AUTO_INCREMENT,
  `industry` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `node` json DEFAULT NULL,
  `edges` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template`
--

LOCK TABLES `template` WRITE;
/*!40000 ALTER TABLE `template` DISABLE KEYS */;
INSERT INTO `template` VALUES (7,'Manufacturing ','Quotation ','In the manufacturing industry, a \"quotation\" refers to the formal document outlining the cost, scope, and timeline for producing a specified set of goods','[{\"id\": \"1\", \"data\": {\"label\": \"Hello! Looking to get a quote for our products?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -50.5, \"y\": 59}, \"selected\": false, \"positionAbsolute\": {\"x\": -50.5, \"y\": 59}}, {\"id\": \"6\", \"data\": {\"label\": \"Please provide the product name and specifications.\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 68, \"dragging\": false, \"position\": {\"x\": -179, \"y\": 146}, \"selected\": false, \"positionAbsolute\": {\"x\": -179, \"y\": 146}}, {\"id\": \"7\", \"data\": {\"label\": \"How many units are you interested in?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 43.5, \"y\": 186.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 43.5, \"y\": 186.5}}, {\"id\": \"8\", \"data\": {\"label\": \"Based on your input, the estimated quote is ₹X. Would you like to proceed?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 182, \"y\": 48}, \"selected\": false, \"positionAbsolute\": {\"x\": 182, \"y\": 48}}, {\"id\": \"9\", \"data\": {\"label\": \"Great! Your order has been placed. You\'ll receive a confirmation email shortly.\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 214.5, \"y\": 172.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 214.5, \"y\": 172.5}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"position\": {\"x\": 237, \"y\": 269.75}, \"positionAbsolute\": {\"x\": 237, \"y\": 269.75}}, {\"id\": \"3\", \"data\": {\"label\": \"exit\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 237, \"y\": 269.75}, \"selected\": true, \"positionAbsolute\": {\"x\": 237, \"y\": 269.75}}]','[{\"id\": \"reactflow__edge-1-6\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"6\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-6-7\", \"type\": \"smoothstep\", \"source\": \"6\", \"target\": \"7\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-7-8\", \"type\": \"smoothstep\", \"source\": \"7\", \"target\": \"8\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-8-9\", \"type\": \"smoothstep\", \"source\": \"8\", \"target\": \"9\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-9-3\", \"type\": \"smoothstep\", \"source\": \"9\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 09:57:59'),(8,'Manufacturing ','Support & Maintenance ','The Manufacturing Support & Maintenance sector focuses on ensuring uninterrupted production by proactively managing equipment health','[{\"id\": \"1\", \"data\": {\"label\": \"Hi! Need assistance with our equipment?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -172, \"y\": 69}, \"selected\": false, \"positionAbsolute\": {\"x\": -172, \"y\": 69}}, {\"id\": \"2\", \"data\": {\"label\": \"Is your issue related to installation, malfunction, or maintenance?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -139.5, \"y\": 162}, \"selected\": false, \"positionAbsolute\": {\"x\": -139.5, \"y\": 162}}, {\"id\": \"3\", \"data\": {\"label\": \"Here\'s a guide to help you troubleshoot the issue.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -5.5, \"y\": 257.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -5.5, \"y\": 257.5}}, {\"id\": \"4\", \"data\": {\"label\": \"Would you like to connect with our support team?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 225.5, \"y\": 140}, \"selected\": false, \"positionAbsolute\": {\"x\": 225.5, \"y\": 140}}, {\"id\": \"5\", \"data\": {\"label\": \": Please provide your preferred date and time for a technician visit.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 258.5, \"y\": 253}, \"selected\": false, \"positionAbsolute\": {\"x\": 258.5, \"y\": 253}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-4-5\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"5\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 12:16:17'),(9,'Manufacturing ','Scheduling Meetings ','In the fast-paced manufacturing industry, scheduling meetings efficiently is critical to maintaining production timelines','[{\"id\": \"1\", \"data\": {\"label\": \"Welcome! Want to schedule a meeting with our team?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -173.4938488846612, \"y\": -99.46080852014288}, \"selected\": false, \"positionAbsolute\": {\"x\": -173.4938488846612, \"y\": -99.46080852014288}}, {\"id\": \"6\", \"data\": {\"label\": \"What\'s the purpose of the meeting?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -103.80720568009524, \"y\": 11.269595739928562}, \"selected\": false, \"positionAbsolute\": {\"x\": -103.80720568009524, \"y\": 11.269595739928562}}, {\"id\": \"7\", \"data\": {\"label\": \"Here are our available time slots this week\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -6.94007038630221, \"y\": 111.47612810127472}, \"selected\": false, \"positionAbsolute\": {\"x\": -6.94007038630221, \"y\": 111.47612810127472}}, {\"id\": \"9\", \"data\": {\"label\": \"Thanks priyanka! Your meeting has been scheduled. A confirmation has been sent to priyanka@mailinator.com\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 240.25272393360257, \"y\": 147.08295253536264}, \"selected\": false, \"positionAbsolute\": {\"x\": 240.25272393360257, \"y\": 147.08295253536264}}, {\"id\": \"10\", \"data\": {\"label\": \"Please enter your full name and email address.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 217.929349695315, \"y\": 30.898594118620903}, \"selected\": false, \"positionAbsolute\": {\"x\": 217.929349695315, \"y\": 30.898594118620903}}]','[{\"id\": \"reactflow__edge-1-6\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"6\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-6-7\", \"type\": \"smoothstep\", \"source\": \"6\", \"target\": \"7\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-7-10\", \"type\": \"smoothstep\", \"source\": \"7\", \"target\": \"10\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-10-9\", \"type\": \"smoothstep\", \"source\": \"10\", \"target\": \"9\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 12:34:17'),(10,'Pharmaceutical ','Prescription Upload ','Our Prescription Upload bot streamlines the process of submitting patient prescriptions directly into your pharmaceutical management system','[{\"id\": \"1\", \"data\": {\"label\": \"Hi! Looking to purchase medication?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -173.5, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -173.5, \"y\": 45}}, {\"id\": \"11\", \"data\": {\"label\": \"Please enter the medication name.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -55.5, \"y\": 142.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -55.5, \"y\": 142.5}}, {\"id\": \"12\", \"data\": {\"label\": \"This medication requires a prescription. Please upload it.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -10.5, \"y\": 238}, \"selected\": false, \"positionAbsolute\": {\"x\": -10.5, \"y\": 238}}, {\"id\": \"13\", \"data\": {\"label\": \"Upload your prescription here.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 305, \"y\": 95.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 305, \"y\": 95.5}}, {\"id\": \"14\", \"data\": {\"label\": \"Thank you! Your order has been placed and will be delivered soon.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 331.5, \"y\": 222}, \"selected\": false, \"positionAbsolute\": {\"x\": 331.5, \"y\": 222}}]','[{\"id\": \"reactflow__edge-1-11\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"11\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-11-12\", \"type\": \"smoothstep\", \"source\": \"11\", \"target\": \"12\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-12-13\", \"type\": \"smoothstep\", \"source\": \"12\", \"target\": \"13\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-13-14\", \"type\": \"smoothstep\", \"source\": \"13\", \"target\": \"14\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 12:38:33'),(11,'Pharmaceutical ','Medicine Reminder','A Medicine Reminder bot in the pharmaceutical industry helps patients adhere to prescribed regimens by sending timely alerts','[{\"id\": \"1\", \"data\": {\"label\": \"Hello! Need a reminder for your medication?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -154.5, \"y\": 43.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -154.5, \"y\": 43.5}}, {\"id\": \"15\", \"data\": {\"label\": \"Please provide the medication name and dosage times.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -99, \"y\": 146}, \"selected\": false, \"positionAbsolute\": {\"x\": -99, \"y\": 146}}, {\"id\": \"16\", \"data\": {\"label\": \"Your reminders have been set. You\'ll receive notifications accordingly.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 8, \"y\": 245}, \"selected\": false, \"positionAbsolute\": {\"x\": 8, \"y\": 245}}, {\"id\": \"17\", \"data\": {\"label\": \"Would you like to modify your reminders?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 244.5, \"y\": 216}, \"selected\": true, \"positionAbsolute\": {\"x\": 244.5, \"y\": 216}}]','[{\"id\": \"reactflow__edge-1-15\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"15\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-15-16\", \"type\": \"smoothstep\", \"source\": \"15\", \"target\": \"16\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-16-17\", \"type\": \"smoothstep\", \"source\": \"16\", \"target\": \"17\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 12:51:35'),(12,'Pharmaceutical ','Appointment Scheduling ','A pharmaceutical appointment scheduling bot streamlines patient bookings by integrating directly with clinic calendars.','[{\"id\": \"1\", \"data\": {\"label\": \"Hi! Want to schedule a consultation?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 59, \"dragging\": false, \"position\": {\"x\": -347.226625, \"y\": 60.138874999999985}, \"selected\": false, \"positionAbsolute\": {\"x\": -347.226625, \"y\": 60.138874999999985}}, {\"id\": \"19\", \"data\": {\"label\": \"Please specify your concern.\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 59, \"dragging\": false, \"position\": {\"x\": -187.22275, \"y\": 83.87299999999999}, \"selected\": false, \"positionAbsolute\": {\"x\": -187.22275, \"y\": 83.87299999999999}}, {\"id\": \"21\", \"data\": {\"label\": \"Here are the available appointment slots\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 59, \"dragging\": false, \"position\": {\"x\": -31.877375000000026, \"y\": 176.0475}, \"selected\": false, \"positionAbsolute\": {\"x\": -31.877375000000026, \"y\": 176.0475}}, {\"id\": \"22\", \"data\": {\"label\": \" Please provide your full name and a valid email address for confirmation.\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 59, \"dragging\": false, \"position\": {\"x\": 103.92799999999995, \"y\": 80.7775}, \"selected\": false, \"positionAbsolute\": {\"x\": 103.92799999999995, \"y\": 80.7775}}, {\"id\": \"23\", \"data\": {\"label\": \"Thank you priyanka. Your session has been booked. Confirmation sent to priyanka@gmail.com\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 59, \"dragging\": false, \"position\": {\"x\": 169.05112499999996, \"y\": 167.82112499999997}, \"selected\": false, \"positionAbsolute\": {\"x\": 169.05112499999996, \"y\": 167.82112499999997}}, {\"id\": \"2\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 59, \"position\": {\"x\": 299.23850000000004, \"y\": 258.36125000000004}, \"positionAbsolute\": {\"x\": 299.23850000000004, \"y\": 258.36125000000004}}, {\"id\": \"3\", \"data\": {\"label\": \"update \"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 59, \"dragging\": false, \"position\": {\"x\": 299.23850000000004, \"y\": 258.36125000000004}, \"selected\": false, \"positionAbsolute\": {\"x\": 299.23850000000004, \"y\": 258.36125000000004}}]','[{\"id\": \"reactflow__edge-1-19\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"19\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-19-20\", \"type\": \"smoothstep\", \"source\": \"19\", \"target\": \"20\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-20-21\", \"type\": \"smoothstep\", \"source\": \"20\", \"target\": \"21\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-21-22\", \"type\": \"smoothstep\", \"source\": \"21\", \"target\": \"22\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-22-23\", \"type\": \"smoothstep\", \"source\": \"22\", \"target\": \"23\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-23-2\", \"type\": \"smoothstep\", \"source\": \"23\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-19-21\", \"type\": \"smoothstep\", \"source\": \"19\", \"target\": \"21\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 13:00:24');
/*!40000 ALTER TABLE `template` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Ashwin Gh','ashwingh@gmail.com','$2b$10$Yhv1Lkt3OaZFn00SYws.7ePBC4G.qwK0fKyJRK/MTNtAz74kvJYjW','123456789',1,'2025-03-27 08:45:59','2025-03-27 09:09:01',NULL,NULL,0),(2,'Sharv S','sharv@gmail.com','$2b$10$A.CS56i73o1XQSJfIM4OpeyeOCsVnc8DJYMFdrOuWMMbx9LG.J1.e','1234567890',0,'2025-03-27 08:50:22','2025-04-26 10:40:59','2025-04-26 10:40:59',NULL,0),(3,'Animesh','animesh@gmail.com','$2b$10$wSJywrCLACEzOt.6SgQPtuvpaaTG3tLAeT4de9g9JN/QAqIC/Onim','1234567890',0,'2025-03-27 08:50:42','2025-03-29 05:07:35','2025-03-29 05:07:35',NULL,0),(4,'priyanka','priyanka@mailinator.com','$2b$10$FTKgANOd/mZaSRHMaCwDUezUY38P2HQHGvbnDQ4BHktbMQtvbi6l6',NULL,0,'2025-05-13 09:46:44','2025-05-17 09:14:03','2025-05-17 09:14:03',NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_answers`
--

DROP TABLE IF EXISTS `user_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(20) DEFAULT NULL,
  `flow_id` int DEFAULT NULL,
  `node_id` varchar(100) DEFAULT NULL,
  `answer` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_answers`
--

LOCK TABLES `user_answers` WRITE;
/*!40000 ALTER TABLE `user_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_node_progress`
--

DROP TABLE IF EXISTS `user_node_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_node_progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(15) DEFAULT NULL,
  `flow_id` int DEFAULT NULL,
  `current_node_index` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_node_progress`
--

LOCK TABLES `user_node_progress` WRITE;
/*!40000 ALTER TABLE `user_node_progress` DISABLE KEYS */;
INSERT INTO `user_node_progress` VALUES (1,'919022030279',60,0),(2,'919022030279',61,0),(3,'919022030279',62,0),(4,'919022030279',63,0),(5,'919022030279',64,0),(6,'919022030279',65,0),(7,'919022030279',66,0),(8,'919022030279',67,0),(9,'+919022030279',68,0),(10,'919022030279',69,0),(11,'919022030279',70,0),(12,'919022030279',71,0),(13,'919022030279',72,0),(14,'919022030279',73,0),(15,'919022030279',74,0),(16,'919022030279',75,0),(17,'919022030279',76,0),(18,'919022030279',77,0),(19,'919022030279',78,0),(20,'919022030279',79,0),(21,'919022030279',80,0),(22,'919022030279',81,0),(23,'919022030279',82,0),(24,'919022030279',83,0),(25,'919022030279',84,0),(26,'919022030279',85,0),(27,'919022030279',86,0),(28,'919022030279',87,0),(29,'919022030279',88,0),(30,'919022030279',89,0),(31,'919022030279',90,0),(32,'919022030279',91,0),(33,'919022030279',92,0),(34,'919022030279',93,0),(35,'919022030279',89,0),(36,'919022030279',89,0),(37,'919022030279',89,0),(38,'919022030279',89,0),(39,'919022030279',89,0),(40,'919022030279',89,0),(41,'919022030279',89,0),(42,'919022030279',90,0),(43,'919022030279',91,0),(44,'919022030279',91,0),(45,'919022030279',93,0);
/*!40000 ALTER TABLE `user_node_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whatsup_number`
--

DROP TABLE IF EXISTS `whatsup_number`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `whatsup_number` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(25) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whatsup_number`
--

LOCK TABLES `whatsup_number` WRITE;
/*!40000 ALTER TABLE `whatsup_number` DISABLE KEYS */;
INSERT INTO `whatsup_number` VALUES (1,'9022030279',0,'2025-05-28 07:38:15'),(2,'919022030279',0,'2025-05-28 09:05:55');
/*!40000 ALTER TABLE `whatsup_number` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-28 16:46:26
