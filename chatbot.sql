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
INSERT INTO `admin` VALUES (1,'Animesh Pradhan','priyanka123@mailinator.com','$2b$10$Czhow0YK6axeda2Whpet3./nI29mE8.xSuDqdlf6yHLZv0ZOkBCX.','1234567899','Super-Admin',0,'2025-03-27 06:57:22','2025-05-14 09:27:59','2025-05-14 09:27:59','2025-02-23 18:30:00','1745844099857-919036082.png',0),(2,'priyanka','priyanka@mailinator.com','$2b$10$PNredsQm8ld0m.JBLWvkY.dZSrXep3lARrEJtgJCHdvLwdS5vqkrO','1234567898','Admin',0,'2025-04-28 10:04:41','2025-05-16 05:36:34','2025-05-16 05:36:34','2025-04-15 18:30:00','1745836640644-101652830.jpg',0),(3,'sushil','sushil@mailintor.com',NULL,'2345678987','Admin',0,'2025-04-30 07:47:45','2025-04-30 07:47:45',NULL,'2025-04-09 18:30:00',NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bots`
--

LOCK TABLES `bots` WRITE;
/*!40000 ALTER TABLE `bots` DISABLE KEYS */;
INSERT INTO `bots` VALUES (1,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nE-learining website\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": -999.5, \"y\": -829.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -999.5, \"y\": -829.5}}, {\"id\": \"3\", \"data\": {\"type\": \"custom\", \"label\": \"what is image name\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": -963.25, \"y\": -712.6500015258789}, \"selected\": false, \"positionAbsolute\": {\"x\": -963.25, \"y\": -712.6500015258789}}, {\"id\": \"5\", \"data\": {\"type\": \"imageNode\", \"label\": \"image\", \"fileUrl\": \"blob:http://localhost:5173/c2a65c50-9425-4a9d-b418-3ecef44bec52\", \"fileName\": \"6077795031181282074.jpg\"}, \"type\": \"imageNode\", \"width\": 1127, \"height\": 771, \"dragging\": false, \"position\": {\"x\": -1087.25, \"y\": -605.1500015258789}, \"selected\": false, \"positionAbsolute\": {\"x\": -1087.25, \"y\": -605.1500015258789}}, {\"id\": \"6\", \"data\": {\"type\": \"custom\", \"label\": \"yes /no\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": 402.75, \"y\": -724.1500015258789}, \"selected\": false, \"positionAbsolute\": {\"x\": 402.75, \"y\": -724.1500015258789}}, {\"id\": \"7\", \"data\": {\"type\": \"custom\", \"label\": \"yes\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": 456.5169662022327, \"y\": -525.5104586273256}, \"selected\": false, \"positionAbsolute\": {\"x\": 456.5169662022327, \"y\": -525.5104586273256}}, {\"id\": \"8\", \"data\": {\"type\": \"custom\", \"label\": \"no\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": 776.8795734952064, \"y\": -485.46513271570393}, \"selected\": false, \"positionAbsolute\": {\"x\": 776.8795734952064, \"y\": -485.46513271570393}}, {\"id\": \"9\", \"data\": {\"file\": \"customers-100.csv\", \"type\": \"googleSheets\", \"label\": \"Google Sheets\"}, \"type\": \"googleSheets\", \"width\": 461, \"height\": 87, \"dragging\": false, \"position\": {\"x\": 388.6140222651351, \"y\": -285.2385031575954}, \"selected\": false, \"positionAbsolute\": {\"x\": 388.6140222651351, \"y\": -285.2385031575954}}]','[{\"id\": \"reactflow__edge-1-3\", \"source\": \"1\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-5\", \"source\": \"3\", \"target\": \"5\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-5-6\", \"source\": \"5\", \"target\": \"6\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-6-7\", \"source\": \"6\", \"target\": \"7\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-6-8\", \"source\": \"6\", \"target\": \"8\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-7-9\", \"source\": \"7\", \"target\": \"9\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-08 06:00:47',NULL),(2,'My Flow','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"position\": {\"x\": 100, \"y\": 150}, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}]','[]',NULL,NULL,'2025-05-08 09:42:00',NULL),(3,'My Flow','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"position\": {\"x\": 100, \"y\": 150}, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}]','[]',NULL,NULL,'2025-05-08 09:43:41',NULL),(4,'My Flow','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"position\": {\"x\": 100, \"y\": 150}, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}]','[]',NULL,NULL,'2025-05-08 09:45:42',NULL),(5,'My Flow','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"position\": {\"x\": 100, \"y\": 150}, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}, {\"id\": \"3\", \"data\": {\"type\": \"custom\", \"label\": \"new text\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": 36.25, \"y\": 268.5999984741211}, \"selected\": false, \"positionAbsolute\": {\"x\": 36.25, \"y\": 268.5999984741211}}]','[{\"id\": \"reactflow__edge-1-3\", \"source\": \"1\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-08 09:46:56',NULL),(6,'My Flow','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"position\": {\"x\": 100, \"y\": 150}, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}, {\"id\": \"3\", \"data\": {\"type\": \"custom\", \"label\": \"new text\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": 36.25, \"y\": 268.5999984741211}, \"selected\": false, \"positionAbsolute\": {\"x\": 36.25, \"y\": 268.5999984741211}}]','[{\"id\": \"reactflow__edge-1-3\", \"source\": \"1\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-08 09:48:34',NULL),(7,'My Flow','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"position\": {\"x\": 100, \"y\": 150}, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}, {\"id\": \"3\", \"data\": {\"type\": \"custom\", \"label\": \"new text\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": 36.25, \"y\": 268.5999984741211}, \"selected\": false, \"positionAbsolute\": {\"x\": 36.25, \"y\": 268.5999984741211}}]','[{\"id\": \"reactflow__edge-1-3\", \"source\": \"1\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-08 09:50:55',NULL),(8,'My Flow','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"position\": {\"x\": 100, \"y\": 150}, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}, {\"id\": \"3\", \"data\": {\"type\": \"custom\", \"label\": \"new text\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": 36.25, \"y\": 268.5999984741211}, \"selected\": false, \"positionAbsolute\": {\"x\": 36.25, \"y\": 268.5999984741211}}]','[{\"id\": \"reactflow__edge-1-3\", \"source\": \"1\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-08 09:51:42',NULL),(9,'My Flow','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"position\": {\"x\": 100, \"y\": 150}, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}, {\"id\": \"3\", \"data\": {\"type\": \"custom\", \"label\": \"new text\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": 36.25, \"y\": 268.5999984741211}, \"selected\": false, \"positionAbsolute\": {\"x\": 36.25, \"y\": 268.5999984741211}}]','[{\"id\": \"reactflow__edge-1-3\", \"source\": \"1\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-08 09:53:20',NULL),(10,'My Flow','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"position\": {\"x\": 100, \"y\": 150}, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}, {\"id\": \"3\", \"data\": {\"type\": \"custom\", \"label\": \"new text\"}, \"type\": \"custom\", \"width\": 197, \"height\": 80, \"dragging\": false, \"position\": {\"x\": 36.25, \"y\": 268.5999984741211}, \"selected\": false, \"positionAbsolute\": {\"x\": 36.25, \"y\": 268.5999984741211}}]','[{\"id\": \"reactflow__edge-1-3\", \"source\": \"1\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-08 09:53:37',NULL),(13,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 150, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -109, \"y\": 97}, \"selected\": false, \"positionAbsolute\": {\"x\": -109, \"y\": 97}}, {\"id\": \"2\", \"data\": {\"label\": \"priyanka\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 19.5, \"y\": 107}, \"selected\": false, \"positionAbsolute\": {\"x\": 19.5, \"y\": 107}}, {\"id\": \"3\", \"data\": {\"label\": \"no question\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 329, \"y\": 175.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 329, \"y\": 175.5}}, {\"id\": \"4\", \"data\": {\"label\": \"Image\", \"fileUrl\": \"blob:http://localhost:5173/00c953b7-ebbf-4ea5-80c7-4ed0a6d59a15\", \"fileName\": \"6077795031181282074.jpg\"}, \"type\": \"imageNode\", \"width\": 270, \"height\": 51, \"dragging\": false, \"position\": {\"x\": 42.5, \"y\": 230.66000366210935}, \"selected\": true, \"positionAbsolute\": {\"x\": 42.5, \"y\": 230.66000366210935}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-09 06:40:06',NULL),(14,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 150, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 6, \"y\": 132}, \"selected\": false, \"positionAbsolute\": {\"x\": 6, \"y\": 132}}, {\"id\": \"2\", \"data\": {\"label\": \"Image\", \"fileUrl\": \"blob:http://localhost:5173/5ba54d28-0694-4e02-964f-fc81a12e2f5e\", \"fileName\": \"6077795031181282074.jpg\"}, \"type\": \"imageNode\", \"width\": 270, \"height\": 159, \"dragging\": false, \"position\": {\"x\": 201, \"y\": 93}, \"selected\": false, \"positionAbsolute\": {\"x\": 201, \"y\": 93}}, {\"id\": \"3\", \"data\": {\"file\": \"customers-100.csv\", \"label\": \"Google Sheets\"}, \"type\": \"GoogleSheetsNode\", \"width\": 204, \"height\": 70, \"dragging\": false, \"position\": {\"x\": 83, \"y\": 250.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 83, \"y\": 250.5}}, {\"id\": \"4\", \"data\": {\"label\": \"Video\", \"fileUrl\": \"blob:http://localhost:5173/e131cfb5-9ec4-4234-9a2f-70cd01e4156d\", \"fileName\": \"your_video (2).mp4\"}, \"type\": \"VideoNode\", \"width\": 1526, \"height\": 932, \"dragging\": false, \"position\": {\"x\": -266.7931468663043, \"y\": 21.10070263324532}, \"selected\": true, \"positionAbsolute\": {\"x\": -266.7931468663043, \"y\": 21.10070263324532}}]','[]',NULL,NULL,'2025-05-09 06:45:38',NULL),(15,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 150, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 55, \"y\": 72.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 55, \"y\": 72.5}}, {\"id\": \"2\", \"data\": {\"label\": \"priyanka\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 308, \"y\": 103}, \"selected\": false, \"positionAbsolute\": {\"x\": 308, \"y\": 103}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-09 12:47:06',NULL),(16,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 150, \"height\": 58, \"position\": {\"x\": 100, \"y\": 150}, \"positionAbsolute\": {\"x\": 100, \"y\": 150}}, {\"id\": \"3\", \"data\": {\"label\": \"priyanka\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 45.5, \"y\": 248}, \"selected\": false, \"positionAbsolute\": {\"x\": 45.5, \"y\": 248}}]','[{\"id\": \"reactflow__edge-1-3\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-09 12:55:27',NULL),(17,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 150, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 15.5, \"y\": 41}, \"selected\": false, \"positionAbsolute\": {\"x\": 15.5, \"y\": 41}}, {\"id\": \"4\", \"data\": {\"label\": \"hello marworx\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 33.5, \"y\": 146.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 33.5, \"y\": 146.5}}, {\"id\": \"5\", \"data\": {\"label\": \"yes\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 24.5, \"y\": 234.5}, \"selected\": true, \"positionAbsolute\": {\"x\": 24.5, \"y\": 234.5}}]','[{\"id\": \"reactflow__edge-1-4\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-4-5\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"5\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-09 13:02:03',NULL),(18,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 150, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -68, \"y\": 27.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -68, \"y\": 27.5}}, {\"id\": \"2\", \"data\": {\"label\": \"hii \"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -45, \"y\": 117.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -45, \"y\": 117.5}}, {\"id\": \"3\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 6, \"y\": 210}, \"selected\": false, \"positionAbsolute\": {\"x\": 6, \"y\": 210}}, {\"id\": \"4\", \"data\": {\"label\": \"Ask for an email?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 165, \"y\": 285}, \"selected\": false, \"positionAbsolute\": {\"x\": 165, \"y\": 285}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',1,'algorithmic','2025-05-14 07:13:06',NULL),(19,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 150, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 30.5, \"y\": 95}, \"selected\": false, \"positionAbsolute\": {\"x\": 30.5, \"y\": 95}}, {\"id\": \"2\", \"data\": {\"label\": \"demo\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 221.5, \"y\": 219}, \"selected\": true, \"positionAbsolute\": {\"x\": 221.5, \"y\": 219}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',2,'algorithmic','2025-05-14 07:46:58',2),(20,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\\nWhere your bot begins\"}, \"type\": \"custom\", \"width\": 150, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -139, \"y\": 34}, \"selected\": false, \"positionAbsolute\": {\"x\": -139, \"y\": 34}}, {\"id\": \"2\", \"data\": {\"label\": \"hii\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 75, \"y\": 89}, \"selected\": false, \"positionAbsolute\": {\"x\": 75, \"y\": 89}}, {\"id\": \"4\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 42, \"y\": 251.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 42, \"y\": 251.5}}, {\"id\": \"5\", \"data\": {\"label\": \"hello\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 9.5, \"y\": 178}, \"selected\": false, \"positionAbsolute\": {\"x\": 9.5, \"y\": 178}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-5\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"5\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-5-4\", \"type\": \"smoothstep\", \"source\": \"5\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',2,'algorithmic','2025-05-14 10:19:04',2),(21,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"save image \"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -170.5, \"y\": 13.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -170.5, \"y\": 13.5}}, {\"id\": \"2\", \"data\": {\"label\": \"Image\", \"fileUrl\": \"blob:http://localhost:5173/48f9927f-be16-464d-bf62-9ff2ae33cda1\", \"fileName\": \"paint.png\"}, \"type\": \"imageNode\", \"width\": 272, \"height\": 161, \"dragging\": false, \"position\": {\"x\": -101.5, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -101.5, \"y\": 76}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',2,'algorithmic','2025-05-15 10:25:47',2),(22,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -183, \"y\": 28.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -183, \"y\": 28.5}}, {\"id\": \"2\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"one\", \"two\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 136, \"dragging\": false, \"position\": {\"x\": -160.5, \"y\": 103}, \"selected\": false, \"positionAbsolute\": {\"x\": -160.5, \"y\": 103}}, {\"id\": \"3\", \"data\": {\"label\": \"You should be using the Mailinator API ! Request a FREE Verified Pro Subscription now!\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 200.5, \"y\": 184.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 200.5, \"y\": 184.5}}, {\"id\": \"4\", \"data\": {\"label\": \"You should be using the Mailinator API ! Request a FREE Verified Pro Subscription now!\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 162.5, \"y\": 68.5}, \"selected\": true, \"positionAbsolute\": {\"x\": 162.5, \"y\": 68.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option-0-4\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"4\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option-1-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": \"option-1\", \"targetHandle\": null}]',1,'algorithmic','2025-05-15 13:05:33',2),(23,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -194.5, \"y\": -10.800000000000018}, \"selected\": false, \"positionAbsolute\": {\"x\": -194.5, \"y\": -10.800000000000018}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -140.5, \"y\": 43.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -140.5, \"y\": 43.5}}, {\"id\": \"3\", \"data\": {\"label\": \"Ask a Question?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -88.5, \"y\": 125}, \"selected\": false, \"positionAbsolute\": {\"x\": -88.5, \"y\": 125}}, {\"id\": \"4\", \"data\": {\"label\": \"Ask for an email?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -30, \"y\": 209}, \"selected\": false, \"positionAbsolute\": {\"x\": -30, \"y\": 209}}, {\"id\": \"5\", \"data\": {\"label\": \"Ask for Phone number?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": 37, \"y\": 273.11993408203125}, \"selected\": false, \"positionAbsolute\": {\"x\": 37, \"y\": 273.11993408203125}}, {\"id\": \"6\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 183.91546592494691, \"y\": -42.4595040573279}, \"selected\": false, \"positionAbsolute\": {\"x\": 183.91546592494691, \"y\": -42.4595040573279}}, {\"id\": \"7\", \"data\": {\"label\": \"Image\", \"fileUrl\": \"blob:http://localhost:5173/c2056133-2425-4633-9137-ff9e15035135\", \"fileName\": \"6138852939096245186.jpg\"}, \"type\": \"imageNode\", \"width\": 191, \"height\": 156, \"dragging\": false, \"position\": {\"x\": 265.7249563928663, \"y\": 37.37072454443221}, \"selected\": false, \"positionAbsolute\": {\"x\": 265.7249563928663, \"y\": 37.37072454443221}}, {\"id\": \"8\", \"data\": {\"label\": \"Reply Buttons\", \"targetValues\": [\"one\", \"two\"]}, \"type\": \"ReplyButton\", \"width\": 152, \"height\": 120, \"dragging\": false, \"position\": {\"x\": 440.559754570275, \"y\": 199.01044361411175}, \"selected\": false, \"positionAbsolute\": {\"x\": 440.559754570275, \"y\": 199.01044361411175}}, {\"id\": \"9\", \"data\": {\"label\": \"List Buttons\", \"targetValues\": [\"option one \", \"option two\"]}, \"type\": \"ListButton\", \"width\": 152, \"height\": 136, \"dragging\": false, \"position\": {\"x\": 436.6012308379563, \"y\": 350.09400275396234}, \"selected\": false, \"positionAbsolute\": {\"x\": 436.6012308379563, \"y\": 350.09400275396234}}, {\"id\": \"10\", \"data\": {\"file\": \"campaigns (4).csv\", \"label\": \"Google Sheets\"}, \"type\": \"GoogleSheetsNode\", \"width\": 272, \"height\": 80, \"dragging\": false, \"position\": {\"x\": 627.974029548505, \"y\": 87.98284808767913}, \"selected\": false, \"positionAbsolute\": {\"x\": 627.974029548505, \"y\": 87.98284808767913}}, {\"id\": \"11\", \"data\": {\"label\": \"Video\", \"fileUrl\": \"blob:http://localhost:5173/72ef8749-83fb-4be4-8498-21315d84279c\", \"fileName\": \"movie.mp4\"}, \"type\": \"VideoNode\", \"width\": 191, \"height\": 208, \"dragging\": false, \"position\": {\"x\": 904.6757527275374, \"y\": 101.24517237872324}, \"selected\": false, \"positionAbsolute\": {\"x\": 904.6757527275374, \"y\": 101.24517237872324}}, {\"id\": \"12\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 741.2253940698969, \"y\": 323.90412208504625}, \"selected\": true, \"positionAbsolute\": {\"x\": 741.2253940698969, \"y\": 323.90412208504625}}, {\"id\": \"13\", \"data\": {\"label\": \"Message\"}, \"type\": \"CustomText\", \"width\": 126, \"height\": 68, \"dragging\": false, \"position\": {\"x\": 816.2253940698969, \"y\": 464.90412208504625}, \"selected\": false, \"positionAbsolute\": {\"x\": 816.2253940698969, \"y\": 464.90412208504625}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-4-5\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"5\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-5-6\", \"type\": \"smoothstep\", \"source\": \"5\", \"target\": \"6\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-6-7\", \"type\": \"smoothstep\", \"source\": \"6\", \"target\": \"7\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-7-8\", \"type\": \"smoothstep\", \"source\": \"7\", \"target\": \"8\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-8option-0-10\", \"type\": \"smoothstep\", \"source\": \"8\", \"target\": \"10\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-8option-1-11\", \"type\": \"smoothstep\", \"source\": \"8\", \"target\": \"11\", \"sourceHandle\": \"option-1\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-7-9\", \"type\": \"smoothstep\", \"source\": \"7\", \"target\": \"9\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-9option-0-12\", \"type\": \"smoothstep\", \"source\": \"9\", \"target\": \"12\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-9option-1-13\", \"type\": \"smoothstep\", \"source\": \"9\", \"target\": \"13\", \"sourceHandle\": \"option-1\", \"targetHandle\": null}]',2,'algorithmic','2025-05-16 06:41:16',NULL),(24,'Welcome Journey','[{\"id\": \"1\", \"data\": {\"label\": \"Starting point\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -159, \"y\": 23}, \"selected\": false, \"positionAbsolute\": {\"x\": -159, \"y\": 23}}, {\"id\": \"2\", \"data\": {\"label\": \"Image\", \"fileUrl\": \"blob:http://localhost:5173/31a3a8c1-0a15-4ac8-bf29-bc5664788ec1\", \"fileName\": \"6138852939096245186.jpg\"}, \"type\": \"imageNode\", \"width\": 191, \"height\": 156, \"dragging\": false, \"position\": {\"x\": 133.5, \"y\": 116}, \"selected\": true, \"positionAbsolute\": {\"x\": 133.5, \"y\": 116}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}]',2,'algorithmic','2025-05-16 07:29:16',NULL),(25,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:13',NULL),(26,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:19',NULL),(27,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:20',NULL),(28,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:21',NULL),(29,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:21',NULL),(30,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:44',NULL),(31,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:45',NULL),(32,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:45',NULL),(33,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:46',NULL),(34,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:46',NULL),(35,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:20:46',NULL),(36,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:29:05',NULL),(37,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:31:51',NULL),(38,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 09:34:43',NULL),(39,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 10:02:41',NULL),(40,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 10:06:27',NULL),(41,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 10:09:23',NULL),(42,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 10:10:24',NULL),(43,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 10:11:07',NULL),(44,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 10:17:22',NULL),(45,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 10:24:02',NULL),(46,'E-commerce Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome\"}, \"type\": \"Custom\", \"width\": 113, \"height\": 26, \"dragging\": false, \"position\": {\"x\": -286.7, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -286.7, \"y\": 45}}, {\"id\": \"2\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -180.2, \"y\": 76}, \"selected\": false, \"positionAbsolute\": {\"x\": -180.2, \"y\": 76}}, {\"id\": \"3\", \"data\": {\"label\": \"show your profile\"}, \"type\": \"CustomNode\", \"width\": 118, \"height\": 57, \"dragging\": false, \"position\": {\"x\": -83.69999999999999, \"y\": 139.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -83.69999999999999, \"y\": 139.5}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}]',NULL,NULL,'2025-05-16 10:42:22',NULL);
/*!40000 ALTER TABLE `bots` ENABLE KEY */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (1,2,'marworx1','Advertsie','Sales all product','sales',NULL,'marketing','marathi','sales','all sales done?',NULL,'2025-04-29 06:05:20','2025-04-29 06:15:07',1,NULL,NULL,NULL),(2,2,'marworx2','Advertsie','Sales all product','sales',NULL,'marketing','marathi','sales','all sales done?',NULL,'2025-04-29 06:15:03','2025-04-29 09:04:59',1,NULL,NULL,NULL),(3,2,'marworx3','Advertsie','Sales all product','sales',1,'marketing','marathi','sales','all sales done?',NULL,'2025-04-29 07:38:53','2025-04-29 09:05:57',0,'Sent',NULL,NULL),(4,NULL,'marworx3','Advertsie','Sales all product','sales',1,'department','marathi','sales','all sales done?',NULL,'2025-04-29 07:40:29',NULL,0,'Sent',NULL,NULL);
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_titles`
--

LOCK TABLES `chat_titles` WRITE;
/*!40000 ALTER TABLE `chat_titles` DISABLE KEYS */;
INSERT INTO `chat_titles` VALUES (1,'Hello, how are you',2,'2025-03-28 06:25:52',NULL,1),(2,'Hello, how are you',2,'2025-03-28 06:27:14',NULL,0),(3,'Hello',3,'2025-03-28 06:29:13',NULL,0),(4,'New Chat 28 March 2025',NULL,'2025-03-28 10:02:44',NULL,0),(5,'New Chat 28 March 2025',NULL,'2025-03-28 10:05:37',NULL,0),(6,'New Chat 28 March 2025',NULL,'2025-03-28 10:06:31',NULL,0),(7,'New Chat 28 March 2025',2,'2025-03-28 10:08:50',NULL,1),(8,'New Chat 28 March 2025',2,'2025-03-28 10:10:45',NULL,1),(9,'New Chat 28 March 2025',2,'2025-03-28 10:11:25',NULL,1),(10,'New Chat 28 March 2025',2,'2025-03-28 10:13:02',NULL,1),(11,'New Chat 28 March 2025',2,'2025-03-28 10:19:10',NULL,0),(12,'New Chat 28 March 2025',2,'2025-03-28 10:36:27',NULL,0),(13,'New Chat 29 March 2025',3,'2025-03-29 05:48:32',NULL,0),(14,'New Chat 29 March 2025',3,'2025-03-29 05:51:37',NULL,0),(15,'New Chat 13 May 2025',4,'2025-05-13 09:47:33',NULL,0),(16,'New Chat 13 May 2025',4,'2025-05-13 10:08:00',NULL,0),(17,'New Chat 14 May 2025',4,'2025-05-14 06:11:00',NULL,0),(18,'New Chat 14 May 2025',4,'2025-05-14 06:30:37',NULL,0),(19,'New Chat 15 May 2025',4,'2025-05-15 05:31:31',NULL,0),(20,'New Chat 15 May 2025',4,'2025-05-15 10:45:20',NULL,0),(21,'New Chat 15 May 2025',4,'2025-05-15 10:56:29',NULL,0),(22,'New Chat 15 May 2025',4,'2025-05-15 10:57:36',NULL,0),(23,'New Chat 15 May 2025',4,'2025-05-15 11:21:17',NULL,0),(24,'New Chat 15 May 2025',4,'2025-05-15 11:22:47',NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (3,2,'user','Hello, how are you doing today?','2025-03-28 06:27:14'),(4,2,'bot','I\'m doing well, thank you!','2025-03-28 06:27:14'),(5,3,'user','Hello','2025-03-28 06:29:13'),(6,3,'bot','Hi,How are You?','2025-03-28 06:29:13'),(8,1,'user','Hello, this is a new chat message!','2025-03-28 06:36:43'),(9,2,'user','Hello, this is a new chat message!','2025-03-28 06:37:22'),(10,2,'bot','Ok,what can i help you?','2025-03-28 06:37:57'),(11,2,'user','hello','2025-03-28 07:50:59'),(12,2,'bot','Hi there! How can I help you today?','2025-03-28 07:50:59'),(13,1,'user','hi','2025-03-28 07:51:38'),(14,1,'bot','Hello! How can I help? ','2025-03-28 07:51:38'),(15,4,NULL,NULL,'2025-03-28 10:02:44'),(16,4,NULL,NULL,'2025-03-28 10:02:44'),(17,5,NULL,NULL,'2025-03-28 10:05:37'),(18,5,NULL,NULL,'2025-03-28 10:05:37'),(19,6,NULL,NULL,'2025-03-28 10:06:31'),(20,6,NULL,NULL,'2025-03-28 10:06:31'),(21,7,'user','Hi','2025-03-28 10:08:50'),(22,7,NULL,NULL,'2025-03-28 10:08:50'),(23,7,'user','hello','2025-03-28 10:10:08'),(24,7,'bot','Hi there! How can I help you today?','2025-03-28 10:10:09'),(25,8,'user','hey there','2025-03-28 10:10:45'),(26,8,NULL,NULL,'2025-03-28 10:10:45'),(27,9,'user','hey there','2025-03-28 10:11:25'),(28,9,NULL,NULL,'2025-03-28 10:11:25'),(29,10,'user','hello','2025-03-28 10:13:02'),(30,10,NULL,NULL,'2025-03-28 10:13:02'),(31,10,'user','helllo','2025-03-28 10:15:27'),(32,10,'bot','Hi there! How can I help you today?','2025-03-28 10:15:27'),(33,10,'user','how are you','2025-03-28 10:15:39'),(34,10,'bot','I\'m doing well. Thank you. How can I assist you today?','2025-03-28 10:15:39'),(35,11,'user','hello theree','2025-03-28 10:19:10'),(36,11,'bot',' I\'m not sure about that. Can you ask something related to Thermax, chillers, or water treatment?','2025-03-28 10:19:10'),(37,12,'user','Hello','2025-03-28 10:36:27'),(38,12,'bot','Hi there! How can I help you today?','2025-03-28 10:36:27'),(39,NULL,'user','dsadsa','2025-03-29 05:17:53'),(40,3,'user','water','2025-03-29 05:24:46'),(41,3,'user','what is water','2025-03-29 05:25:40'),(42,3,'user','hiiii','2025-03-29 05:28:30'),(43,13,'user','water','2025-03-29 05:48:32'),(44,13,'bot','Network Error','2025-03-29 05:48:32'),(45,13,'user','hjhjhj','2025-03-29 05:48:49'),(46,13,'bot','Network Error','2025-03-29 05:48:51'),(47,13,'user','jhgjhghjg','2025-03-29 05:51:28'),(48,13,'bot','Network Error','2025-03-29 05:51:37'),(49,14,'user','sdsadsads','2025-03-29 05:51:37'),(50,14,'bot','Network Error','2025-03-29 05:51:37'),(51,14,'user','water','2025-03-29 05:54:44'),(52,14,'bot','Network Error','2025-03-29 05:54:46'),(53,14,'user','gjfgj','2025-03-29 05:57:38'),(54,13,'user','fdgdf','2025-03-29 05:57:43'),(55,14,'bot','Network Error','2025-03-29 05:59:21'),(56,13,'bot','Network Error','2025-03-29 05:59:21'),(57,15,'user','what is thermax','2025-05-13 09:47:33'),(58,15,'user','Hello','2025-05-13 09:50:06'),(59,15,'user','How does water treatment technology improve industrial efficiency?','2025-05-13 09:53:23'),(60,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 09:54:16'),(61,15,'user','sure','2025-05-13 09:55:23'),(62,15,'user','sure','2025-05-13 09:58:11'),(63,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 09:58:19'),(64,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 09:59:17'),(65,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:01:51'),(66,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:03:56'),(67,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:05:27'),(68,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:06:58'),(69,16,'user','Hi','2025-05-13 10:08:00'),(70,16,'user','sure','2025-05-13 10:10:18'),(71,17,'user','hi','2025-05-14 06:11:00'),(72,17,'user','sure','2025-05-14 06:22:19'),(73,17,'user','How does energy technology improve industrial efficiency?','2025-05-14 06:22:29'),(74,18,'user','hii','2025-05-14 06:30:37'),(75,19,'user','hi','2025-05-15 05:31:31'),(76,19,'user','sure','2025-05-15 05:32:53'),(77,15,'user','How does energy technology improve industrial efficiency?','2025-05-15 05:33:57'),(78,20,'user','hi','2025-05-15 10:45:20'),(79,20,'user','hi','2025-05-15 10:56:06'),(80,21,'user','hi','2025-05-15 10:56:29'),(81,15,'user','How does energy technology improve industrial efficiency?','2025-05-15 10:56:59'),(82,15,'user','Hello','2025-05-15 10:57:26'),(83,22,'user','Hello','2025-05-15 10:57:36'),(84,22,'user','How does energy technology improve industrial efficiency?','2025-05-15 11:00:33'),(85,23,'user','hi','2025-05-15 11:21:17'),(86,24,'user','How does energy technology improve industrial efficiency?','2025-05-15 11:22:47');
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
INSERT INTO `documents` VALUES (7,2,'chatbot dataset.csv','2025-05-13 09:52:31',0,NULL,NULL),(8,2,'thermax.csv','2025-05-13 09:52:50',0,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,1,'rohit','rohit@gmail.com',NULL,'3456787654',0,'2025-04-30 10:18:46','2025-04-30 10:18:46',NULL,'2025-04-09 18:30:00',NULL,0),(2,2,'priyanka sharma','sharma@mailinator.com',NULL,'8308459428',0,'2025-05-13 05:25:21','2025-05-13 05:25:21',NULL,'2025-05-14 18:30:00',NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sector`
--

LOCK TABLES `product_sector` WRITE;
/*!40000 ALTER TABLE `product_sector` DISABLE KEYS */;
INSERT INTO `product_sector` VALUES (3,1,2),(4,1,1),(5,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
INSERT INTO `sector` VALUES (1,2,'Dermatology','Healthcare','Bots for Dermatologyclinics','1745652248426-467745167.ico','2025-04-26 06:59:32',NULL,0),(2,2,'Industry','chemicals','In the fast-paced manufacturing industry, scheduling meetings efficiently is critical to maintaining production timelines.','1747217591377-797604384.png','2025-05-14 10:13:11',NULL,0);
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
INSERT INTO `template` VALUES (7,'Manufacturing ','Quotation ','In the manufacturing industry, a \"quotation\" refers to the formal document outlining the cost, scope, and timeline for producing a specified set of goods','[{\"id\": \"1\", \"data\": {\"label\": \"Hello! Looking to get a quote for our products?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -50.5, \"y\": 59}, \"selected\": false, \"positionAbsolute\": {\"x\": -50.5, \"y\": 59}}, {\"id\": \"6\", \"data\": {\"label\": \"Please provide the product name and specifications.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -179, \"y\": 146}, \"selected\": false, \"positionAbsolute\": {\"x\": -179, \"y\": 146}}, {\"id\": \"7\", \"data\": {\"label\": \"How many units are you interested in?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 133.5, \"y\": 189}, \"selected\": false, \"positionAbsolute\": {\"x\": 133.5, \"y\": 189}}, {\"id\": \"8\", \"data\": {\"label\": \"Based on your input, the estimated quote is ₹X. Would you like to proceed?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 368, \"y\": 144.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 368, \"y\": 144.5}}, {\"id\": \"9\", \"data\": {\"label\": \"Great! Your order has been placed. You\'ll receive a confirmation email shortly.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 366.5, \"y\": 230.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 366.5, \"y\": 230.5}}]','[{\"id\": \"reactflow__edge-1-6\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"6\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-6-7\", \"type\": \"smoothstep\", \"source\": \"6\", \"target\": \"7\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-7-8\", \"type\": \"smoothstep\", \"source\": \"7\", \"target\": \"8\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-8-9\", \"type\": \"smoothstep\", \"source\": \"8\", \"target\": \"9\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 09:57:59'),(8,'Manufacturing ','Support & Maintenance ','The Manufacturing Support & Maintenance sector focuses on ensuring uninterrupted production by proactively managing equipment health','[{\"id\": \"1\", \"data\": {\"label\": \"Hi! Need assistance with our equipment?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -172, \"y\": 69}, \"selected\": false, \"positionAbsolute\": {\"x\": -172, \"y\": 69}}, {\"id\": \"2\", \"data\": {\"label\": \"Is your issue related to installation, malfunction, or maintenance?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -139.5, \"y\": 162}, \"selected\": false, \"positionAbsolute\": {\"x\": -139.5, \"y\": 162}}, {\"id\": \"3\", \"data\": {\"label\": \"Here\'s a guide to help you troubleshoot the issue.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -5.5, \"y\": 257.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -5.5, \"y\": 257.5}}, {\"id\": \"4\", \"data\": {\"label\": \"Would you like to connect with our support team?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 225.5, \"y\": 140}, \"selected\": false, \"positionAbsolute\": {\"x\": 225.5, \"y\": 140}}, {\"id\": \"5\", \"data\": {\"label\": \": Please provide your preferred date and time for a technician visit.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 258.5, \"y\": 253}, \"selected\": false, \"positionAbsolute\": {\"x\": 258.5, \"y\": 253}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-4-5\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"5\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 12:16:17'),(9,'Manufacturing ','Scheduling Meetings ','In the fast-paced manufacturing industry, scheduling meetings efficiently is critical to maintaining production timelines','[{\"id\": \"1\", \"data\": {\"label\": \"Welcome! Want to schedule a meeting with our team?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -173.4938488846612, \"y\": -99.46080852014288}, \"selected\": false, \"positionAbsolute\": {\"x\": -173.4938488846612, \"y\": -99.46080852014288}}, {\"id\": \"6\", \"data\": {\"label\": \"What\'s the purpose of the meeting?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -103.80720568009524, \"y\": 11.269595739928562}, \"selected\": false, \"positionAbsolute\": {\"x\": -103.80720568009524, \"y\": 11.269595739928562}}, {\"id\": \"7\", \"data\": {\"label\": \"Here are our available time slots this week\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -6.94007038630221, \"y\": 111.47612810127472}, \"selected\": false, \"positionAbsolute\": {\"x\": -6.94007038630221, \"y\": 111.47612810127472}}, {\"id\": \"9\", \"data\": {\"label\": \"Thanks priyanka! Your meeting has been scheduled. A confirmation has been sent to priyanka@mailinator.com\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 240.25272393360257, \"y\": 147.08295253536264}, \"selected\": false, \"positionAbsolute\": {\"x\": 240.25272393360257, \"y\": 147.08295253536264}}, {\"id\": \"10\", \"data\": {\"label\": \"Please enter your full name and email address.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 217.929349695315, \"y\": 30.898594118620903}, \"selected\": false, \"positionAbsolute\": {\"x\": 217.929349695315, \"y\": 30.898594118620903}}]','[{\"id\": \"reactflow__edge-1-6\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"6\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-6-7\", \"type\": \"smoothstep\", \"source\": \"6\", \"target\": \"7\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-7-10\", \"type\": \"smoothstep\", \"source\": \"7\", \"target\": \"10\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-10-9\", \"type\": \"smoothstep\", \"source\": \"10\", \"target\": \"9\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 12:34:17'),(10,'Pharmaceutical ','Prescription Upload ','Our Prescription Upload bot streamlines the process of submitting patient prescriptions directly into your pharmaceutical management system','[{\"id\": \"1\", \"data\": {\"label\": \"Hi! Looking to purchase medication?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -173.5, \"y\": 45}, \"selected\": false, \"positionAbsolute\": {\"x\": -173.5, \"y\": 45}}, {\"id\": \"11\", \"data\": {\"label\": \"Please enter the medication name.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -55.5, \"y\": 142.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -55.5, \"y\": 142.5}}, {\"id\": \"12\", \"data\": {\"label\": \"This medication requires a prescription. Please upload it.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -10.5, \"y\": 238}, \"selected\": false, \"positionAbsolute\": {\"x\": -10.5, \"y\": 238}}, {\"id\": \"13\", \"data\": {\"label\": \"Upload your prescription here.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 305, \"y\": 95.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 305, \"y\": 95.5}}, {\"id\": \"14\", \"data\": {\"label\": \"Thank you! Your order has been placed and will be delivered soon.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 331.5, \"y\": 222}, \"selected\": false, \"positionAbsolute\": {\"x\": 331.5, \"y\": 222}}]','[{\"id\": \"reactflow__edge-1-11\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"11\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-11-12\", \"type\": \"smoothstep\", \"source\": \"11\", \"target\": \"12\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-12-13\", \"type\": \"smoothstep\", \"source\": \"12\", \"target\": \"13\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-13-14\", \"type\": \"smoothstep\", \"source\": \"13\", \"target\": \"14\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 12:38:33'),(11,'Pharmaceutical ','Medicine Reminder','A Medicine Reminder bot in the pharmaceutical industry helps patients adhere to prescribed regimens by sending timely alerts','[{\"id\": \"1\", \"data\": {\"label\": \"Hello! Need a reminder for your medication?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -154.5, \"y\": 43.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -154.5, \"y\": 43.5}}, {\"id\": \"15\", \"data\": {\"label\": \"Please provide the medication name and dosage times.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -99, \"y\": 146}, \"selected\": false, \"positionAbsolute\": {\"x\": -99, \"y\": 146}}, {\"id\": \"16\", \"data\": {\"label\": \"Your reminders have been set. You\'ll receive notifications accordingly.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 8, \"y\": 245}, \"selected\": false, \"positionAbsolute\": {\"x\": 8, \"y\": 245}}, {\"id\": \"17\", \"data\": {\"label\": \"Would you like to modify your reminders?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 244.5, \"y\": 216}, \"selected\": true, \"positionAbsolute\": {\"x\": 244.5, \"y\": 216}}]','[{\"id\": \"reactflow__edge-1-15\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"15\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-15-16\", \"type\": \"smoothstep\", \"source\": \"15\", \"target\": \"16\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-16-17\", \"type\": \"smoothstep\", \"source\": \"16\", \"target\": \"17\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 12:51:35'),(12,'Pharmaceutical ','Appointment Scheduling ','A pharmaceutical appointment scheduling bot streamlines patient bookings by integrating directly with clinic calendars.','[{\"id\": \"1\", \"data\": {\"label\": \"Hi! Want to schedule a consultation?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -179.5, \"y\": 65.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -179.5, \"y\": 65.5}}, {\"id\": \"19\", \"data\": {\"label\": \"Please specify your concern.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 16.5, \"y\": 90}, \"selected\": false, \"positionAbsolute\": {\"x\": 16.5, \"y\": 90}}, {\"id\": \"20\", \"data\": {\"label\": \"Would you like to meet with a Pharmacist or a Medical Expert?\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": -102.5, \"y\": 211.5}, \"selected\": false, \"positionAbsolute\": {\"x\": -102.5, \"y\": 211.5}}, {\"id\": \"21\", \"data\": {\"label\": \"Here are the available appointment slots\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 119, \"y\": 222}, \"selected\": false, \"positionAbsolute\": {\"x\": 119, \"y\": 222}}, {\"id\": \"22\", \"data\": {\"label\": \": Please provide your full name and a valid email address for confirmation.\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 324.5, \"y\": 188}, \"selected\": false, \"positionAbsolute\": {\"x\": 324.5, \"y\": 188}}, {\"id\": \"23\", \"data\": {\"label\": \": Thank you priyanka. Your session has been booked. Confirmation sent to priyanka@gmail.com\"}, \"type\": \"CustomNode\", \"width\": 178, \"height\": 58, \"dragging\": false, \"position\": {\"x\": 347.5, \"y\": 285}, \"selected\": true, \"positionAbsolute\": {\"x\": 347.5, \"y\": 285}}]','[{\"id\": \"reactflow__edge-1-19\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"19\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-19-20\", \"type\": \"smoothstep\", \"source\": \"19\", \"target\": \"20\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-20-21\", \"type\": \"smoothstep\", \"source\": \"20\", \"target\": \"21\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-21-22\", \"type\": \"smoothstep\", \"source\": \"21\", \"target\": \"22\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-22-23\", \"type\": \"smoothstep\", \"source\": \"22\", \"target\": \"23\", \"sourceHandle\": null, \"targetHandle\": null}]','2025-05-12 13:00:24');
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
INSERT INTO `user` VALUES (1,'Ashwin Gh','ashwingh@gmail.com','$2b$10$Yhv1Lkt3OaZFn00SYws.7ePBC4G.qwK0fKyJRK/MTNtAz74kvJYjW','123456789',1,'2025-03-27 08:45:59','2025-03-27 09:09:01',NULL,NULL,0),(2,'Sharv S','sharv@gmail.com','$2b$10$A.CS56i73o1XQSJfIM4OpeyeOCsVnc8DJYMFdrOuWMMbx9LG.J1.e','1234567890',0,'2025-03-27 08:50:22','2025-04-26 10:40:59','2025-04-26 10:40:59',NULL,0),(3,'Animesh','animesh@gmail.com','$2b$10$wSJywrCLACEzOt.6SgQPtuvpaaTG3tLAeT4de9g9JN/QAqIC/Onim','1234567890',0,'2025-03-27 08:50:42','2025-03-29 05:07:35','2025-03-29 05:07:35',NULL,0),(4,'priyanka','priyanka@mailinator.com','$2b$10$FTKgANOd/mZaSRHMaCwDUezUY38P2HQHGvbnDQ4BHktbMQtvbi6l6',NULL,0,'2025-05-13 09:46:44','2025-05-15 11:21:12','2025-05-15 11:21:12',NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whatsup_number`
--

LOCK TABLES `whatsup_number` WRITE;
/*!40000 ALTER TABLE `whatsup_number` DISABLE KEYS */;
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

-- Dump completed on 2025-05-16 17:59:03
