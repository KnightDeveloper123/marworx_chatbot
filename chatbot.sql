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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Animesh Pradhan','priyanka123@mailinator.com','$2b$10$Czhow0YK6axeda2Whpet3./nI29mE8.xSuDqdlf6yHLZv0ZOkBCX.','1234567899','Super-Admin',0,'2025-03-27 06:57:22','2025-06-12 06:09:32','2025-06-12 06:09:32','2025-02-23 18:30:00','1745844099857-919036082.png',0),(2,'priyanka','priyanka@mailinator.com','$2b$10$PNredsQm8ld0m.JBLWvkY.dZSrXep3lARrEJtgJCHdvLwdS5vqkrO','1234567898','Admin',0,'2025-04-28 10:04:41','2025-06-13 05:14:11','2025-06-13 05:14:11','2025-04-15 18:30:00','1745836640644-101652830.jpg',0),(3,'sushil','sushil@mailintor.com',NULL,'2345678987','Admin',0,'2025-04-30 07:47:45','2025-04-30 07:47:45',NULL,'2025-04-09 18:30:00',NULL,0),(4,'Paras mehata','paras@mailinator.com','$2b$10$7H9OeldWe1MPuY6YwhmEI.XHJGjpo8HrluIkNbss7Z8hYxe/y.pca',NULL,'Admin',0,'2025-06-11 08:08:19','2025-06-11 08:09:46','2025-06-11 08:09:46',NULL,NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bot_users`
--

LOCK TABLES `bot_users` WRITE;
/*!40000 ALTER TABLE `bot_users` DISABLE KEYS */;
INSERT INTO `bot_users` VALUES (1,90,2,'2025-05-27 06:00:04'),(2,90,1,'2025-05-27 06:12:54'),(3,93,1,'2025-05-27 06:13:10'),(4,93,3,'2025-05-27 06:13:17'),(5,93,2,'2025-05-27 06:13:22'),(6,94,2,'2025-05-27 07:25:39'),(7,2,1,'2025-05-27 07:27:04'),(8,10,3,'2025-05-27 07:27:51'),(9,90,1,'2025-05-27 09:29:05'),(10,90,2,'2025-05-27 09:29:11'),(11,90,3,'2025-05-27 09:29:17'),(12,10,3,'2025-05-28 07:21:59'),(13,54,2,'2025-05-28 09:54:38'),(14,56,2,'2025-05-28 10:18:55'),(15,57,2,'2025-05-30 05:17:58'),(16,58,2,'2025-05-30 05:19:52'),(17,59,2,'2025-05-30 05:19:53'),(18,60,2,'2025-05-30 05:22:08'),(19,61,2,'2025-05-30 05:30:02'),(20,62,2,'2025-05-30 05:47:42'),(21,63,2,'2025-05-30 06:21:01'),(22,65,2,'2025-05-30 07:56:37'),(23,66,2,'2025-05-30 09:44:25'),(24,67,2,'2025-05-30 09:48:27'),(25,68,2,'2025-05-30 09:53:38'),(26,69,2,'2025-05-30 09:53:39'),(27,70,2,'2025-05-30 09:54:34'),(28,71,2,'2025-05-30 10:01:55'),(29,72,2,'2025-05-30 10:35:12'),(30,73,2,'2025-05-30 10:37:24'),(31,75,2,'2025-05-30 10:42:24'),(32,76,2,'2025-05-30 10:43:06'),(33,77,2,'2025-05-30 10:44:43'),(34,78,2,'2025-05-30 10:45:30'),(35,79,2,'2025-05-30 10:50:56'),(36,80,2,'2025-05-30 10:51:50'),(37,81,2,'2025-05-30 11:01:26'),(38,82,2,'2025-05-30 11:02:48'),(39,83,2,'2025-05-30 11:04:10'),(40,84,2,'2025-05-30 11:07:02'),(41,85,2,'2025-05-30 11:21:52'),(42,86,2,'2025-05-30 11:24:20'),(43,88,2,'2025-05-30 11:40:58'),(44,89,2,'2025-05-30 11:42:55'),(45,90,2,'2025-05-30 13:20:17'),(46,91,2,'2025-05-30 13:22:32'),(47,92,2,'2025-05-30 13:25:07'),(48,93,2,'2025-05-31 09:48:53'),(49,94,2,'2025-05-31 09:49:51'),(50,95,2,'2025-05-31 10:02:05'),(51,96,2,'2025-05-31 10:04:04'),(52,97,2,'2025-05-31 10:13:24'),(53,98,2,'2025-05-31 10:36:32'),(54,99,2,'2025-05-31 10:41:12'),(55,100,2,'2025-05-31 10:58:22'),(56,101,2,'2025-05-31 10:58:39'),(57,102,2,'2025-05-31 11:41:42'),(58,103,2,'2025-05-31 11:47:26'),(59,104,2,'2025-05-31 11:48:05'),(60,105,2,'2025-05-31 11:51:36'),(61,106,2,'2025-05-31 11:51:58'),(62,107,2,'2025-05-31 12:36:56'),(63,108,2,'2025-05-31 12:40:53'),(64,109,2,'2025-06-02 05:11:32'),(65,110,2,'2025-06-02 05:13:42'),(66,111,2,'2025-06-02 05:13:43'),(67,112,2,'2025-06-02 05:15:22'),(68,113,2,'2025-06-02 05:16:47'),(69,114,2,'2025-06-02 05:40:37'),(70,115,2,'2025-06-02 05:50:12'),(71,116,2,'2025-06-02 05:51:01'),(72,117,2,'2025-06-02 05:52:12'),(73,118,2,'2025-06-02 05:53:35'),(74,119,2,'2025-06-02 05:56:38'),(75,120,2,'2025-06-02 06:14:23'),(76,121,2,'2025-06-02 06:24:37'),(77,122,2,'2025-06-02 06:25:59'),(78,123,2,'2025-06-02 06:29:52'),(79,124,2,'2025-06-02 06:33:39'),(80,125,2,'2025-06-02 06:43:14'),(81,126,2,'2025-06-02 06:45:32'),(82,127,2,'2025-06-02 06:49:04'),(83,128,2,'2025-06-02 06:49:42'),(84,129,2,'2025-06-02 06:51:22'),(85,130,2,'2025-06-02 06:51:23'),(86,131,2,'2025-06-02 06:52:45'),(87,132,2,'2025-06-02 06:54:12'),(88,133,2,'2025-06-02 06:58:11'),(89,134,2,'2025-06-02 07:01:14'),(90,135,2,'2025-06-02 07:04:42'),(91,136,2,'2025-06-02 07:09:53'),(92,137,2,'2025-06-02 07:10:55'),(93,138,2,'2025-06-02 07:21:44'),(94,139,2,'2025-06-02 07:23:21'),(95,140,2,'2025-06-02 07:26:39'),(96,141,2,'2025-06-02 07:37:24'),(97,142,2,'2025-06-02 07:45:26'),(98,143,2,'2025-06-02 07:46:30'),(99,144,2,'2025-06-02 07:49:19'),(100,145,2,'2025-06-02 08:43:59'),(101,146,2,'2025-06-02 08:46:03'),(102,147,2,'2025-06-02 08:52:04'),(103,148,2,'2025-06-02 09:08:50'),(104,149,2,'2025-06-02 09:15:52'),(105,150,2,'2025-06-02 09:27:43'),(106,151,2,'2025-06-02 09:29:12'),(107,152,2,'2025-06-02 10:00:37'),(108,153,2,'2025-06-02 10:15:57'),(109,154,2,'2025-06-02 10:31:31'),(110,155,2,'2025-06-02 10:33:53'),(111,156,2,'2025-06-02 10:36:07'),(112,157,2,'2025-06-02 10:37:50'),(113,158,2,'2025-06-02 10:38:26'),(114,159,2,'2025-06-02 10:41:17'),(115,160,2,'2025-06-02 10:42:36'),(116,161,2,'2025-06-02 10:43:56'),(117,162,2,'2025-06-02 10:43:57'),(118,163,2,'2025-06-02 11:00:45'),(119,164,2,'2025-06-02 11:11:13'),(120,165,2,'2025-06-02 11:12:52'),(121,166,2,'2025-06-02 11:16:26'),(122,167,2,'2025-06-02 11:35:57'),(123,168,2,'2025-06-02 11:37:36'),(124,169,2,'2025-06-02 11:38:54'),(125,170,2,'2025-06-02 11:40:41'),(126,171,2,'2025-06-02 11:45:36'),(127,172,2,'2025-06-02 11:47:52'),(128,173,2,'2025-06-02 11:48:22'),(129,174,2,'2025-06-02 11:48:45'),(130,175,2,'2025-06-02 11:49:09'),(131,176,2,'2025-06-02 11:53:20'),(132,177,2,'2025-06-02 11:57:57'),(133,178,2,'2025-06-02 11:59:52'),(134,179,2,'2025-06-02 12:46:09'),(135,180,2,'2025-06-02 12:59:14'),(136,181,2,'2025-06-02 13:00:59'),(137,182,2,'2025-06-02 13:02:30'),(138,183,2,'2025-06-02 13:03:58'),(139,184,2,'2025-06-02 13:23:43'),(140,185,2,'2025-06-02 13:25:29'),(141,186,2,'2025-06-02 13:26:05'),(142,187,2,'2025-06-02 13:27:40'),(143,188,2,'2025-06-02 13:28:29'),(144,190,2,'2025-06-02 13:30:23'),(145,189,2,'2025-06-02 13:30:24'),(146,191,2,'2025-06-03 05:14:15'),(147,192,2,'2025-06-03 05:18:13'),(148,193,2,'2025-06-03 05:38:41'),(149,194,2,'2025-06-03 05:40:32'),(150,195,2,'2025-06-03 05:42:45'),(151,196,2,'2025-06-03 05:45:42'),(152,197,2,'2025-06-03 05:45:43'),(153,199,2,'2025-06-03 05:48:59'),(154,200,2,'2025-06-03 06:02:05'),(155,201,2,'2025-06-03 06:02:54'),(156,202,2,'2025-06-03 06:16:39'),(157,203,2,'2025-06-03 06:40:26'),(158,204,2,'2025-06-03 06:45:54'),(159,205,2,'2025-06-03 06:47:28'),(160,206,2,'2025-06-03 06:49:30'),(161,207,2,'2025-06-03 06:52:36'),(162,208,2,'2025-06-03 06:57:23'),(163,209,2,'2025-06-03 06:59:11'),(164,210,2,'2025-06-03 07:03:19'),(165,211,2,'2025-06-03 07:05:50'),(166,212,2,'2025-06-03 07:20:07'),(167,214,2,'2025-06-03 07:23:56'),(168,215,2,'2025-06-03 07:50:41'),(169,216,2,'2025-06-03 07:51:58'),(170,217,2,'2025-06-03 09:15:35'),(171,218,2,'2025-06-03 09:17:04'),(172,219,2,'2025-06-03 09:18:46'),(173,221,2,'2025-06-03 09:33:52'),(174,222,2,'2025-06-03 09:35:10'),(175,224,2,'2025-06-03 09:46:21'),(176,225,2,'2025-06-03 09:47:17'),(177,226,2,'2025-06-03 09:47:59'),(178,227,2,'2025-06-03 10:00:22'),(179,229,2,'2025-06-03 10:07:14'),(180,230,2,'2025-06-03 10:12:46'),(181,231,2,'2025-06-03 10:14:16'),(182,232,2,'2025-06-03 10:16:45'),(183,233,2,'2025-06-03 10:16:53'),(184,234,2,'2025-06-03 10:21:11'),(185,235,2,'2025-06-03 10:23:13'),(186,236,2,'2025-06-03 10:23:13'),(187,237,2,'2025-06-03 10:23:43'),(188,238,2,'2025-06-03 10:24:38'),(189,239,2,'2025-06-03 10:31:53'),(190,240,2,'2025-06-03 10:32:12'),(191,241,2,'2025-06-03 10:32:19'),(192,242,2,'2025-06-03 10:33:22'),(193,243,2,'2025-06-03 10:34:34'),(194,244,2,'2025-06-03 10:35:37'),(195,245,2,'2025-06-03 10:36:10'),(196,246,2,'2025-06-03 10:36:41'),(197,247,2,'2025-06-03 10:38:32'),(198,248,2,'2025-06-03 10:45:49'),(199,249,2,'2025-06-03 10:49:28'),(200,250,2,'2025-06-03 10:50:01'),(201,251,2,'2025-06-03 10:50:55'),(202,252,2,'2025-06-03 10:51:13'),(203,253,2,'2025-06-03 10:52:55'),(204,254,2,'2025-06-03 10:54:21'),(205,255,2,'2025-06-03 10:56:32'),(206,256,2,'2025-06-03 10:56:50'),(207,257,2,'2025-06-03 11:00:55'),(208,258,2,'2025-06-03 11:03:38'),(209,259,2,'2025-06-03 11:09:21'),(210,260,2,'2025-06-03 11:09:49'),(211,261,2,'2025-06-03 11:13:21'),(212,262,2,'2025-06-03 11:16:36'),(213,263,2,'2025-06-03 11:18:55'),(214,264,2,'2025-06-03 11:19:36'),(215,265,2,'2025-06-03 11:24:34'),(216,266,2,'2025-06-03 11:37:04'),(217,267,2,'2025-06-03 11:41:58'),(218,268,2,'2025-06-03 11:42:44'),(219,269,2,'2025-06-03 11:47:51'),(220,270,2,'2025-06-03 12:36:56'),(221,271,2,'2025-06-03 12:38:48'),(222,272,2,'2025-06-03 12:56:45'),(223,273,2,'2025-06-03 12:57:18'),(224,274,2,'2025-06-03 13:03:15'),(225,275,2,'2025-06-03 13:10:47'),(226,276,2,'2025-06-03 13:11:45'),(227,277,2,'2025-06-03 13:15:32'),(228,278,2,'2025-06-03 13:22:04'),(229,279,2,'2025-06-03 13:23:54'),(230,280,2,'2025-06-03 13:25:04'),(231,281,2,'2025-06-03 13:28:26'),(232,282,2,'2025-06-03 13:30:24'),(233,283,2,'2025-06-04 05:30:32'),(234,284,2,'2025-06-04 05:33:25'),(235,285,2,'2025-06-04 05:42:57'),(236,286,2,'2025-06-04 05:44:23'),(237,287,2,'2025-06-04 05:45:50'),(238,288,2,'2025-06-04 05:52:07'),(239,289,2,'2025-06-04 05:53:46'),(240,290,2,'2025-06-04 06:16:49'),(241,291,2,'2025-06-04 06:18:40'),(242,292,2,'2025-06-04 06:19:27'),(243,293,2,'2025-06-04 06:50:49'),(244,294,2,'2025-06-04 06:51:07'),(245,295,2,'2025-06-04 06:52:19'),(246,296,2,'2025-06-04 07:23:24'),(247,297,2,'2025-06-04 07:23:56'),(248,298,2,'2025-06-04 07:24:22');
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
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bots`
--

LOCK TABLES `bots` WRITE;
/*!40000 ALTER TABLE `bots` DISABLE KEYS */;
INSERT INTO `bots` VALUES (1,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Hello\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": 0, \"y\": 86.5}, \"selected\": false, \"positionAbsolute\": {\"x\": 0, \"y\": 86.5}}, {\"id\": \"2\", \"data\": {\"label\": \"How are you?\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 20.5, \"y\": 140.75}, \"selected\": true, \"positionAbsolute\": {\"x\": 20.5, \"y\": 140.75}}, {\"id\": \"3\", \"data\": {\"label\": \"What is your name?\"}, \"type\": \"CustomNode\", \"width\": 119, \"height\": 56, \"position\": {\"x\": 201, \"y\": 118.75}, \"positionAbsolute\": {\"x\": 201, \"y\": 118.75}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": null, \"targetHandle\": null}]',1,'algorithmic','2025-06-13 06:19:20',2,0),(2,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"Hello\"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -99.25511158276292, \"y\": 42.489776834474185}, \"selected\": false, \"positionAbsolute\": {\"x\": -99.25511158276292, \"y\": 42.489776834474185}}, {\"id\": \"2\", \"data\": {\"label\": \"Do you want to book an appointment now?\", \"targetValues\": [\"Yes\", \"No\"]}, \"type\": \"ReplyButton\", \"width\": 201, \"height\": 143, \"dragging\": false, \"position\": {\"x\": -75.11493877707582, \"y\": 104.2570914388274}, \"selected\": false, \"positionAbsolute\": {\"x\": -75.11493877707582, \"y\": 104.2570914388274}}, {\"id\": \"3\", \"data\": {\"label\": \"Please select the department for appointment\", \"targetValues\": [\"General Medicine\", \"Dental\", \"Dermatology\"]}, \"type\": \"ListButton\", \"width\": 171, \"height\": 205, \"dragging\": false, \"position\": {\"x\": 171.82040975078974, \"y\": 25.932715797451863}, \"selected\": false, \"positionAbsolute\": {\"x\": 171.82040975078974, \"y\": 25.932715797451863}}, {\"id\": \"4\", \"data\": {\"label\": \"Please choose a date and time\", \"targetValues\": [\"Today -4pm\", \"Tommorrow -6pm\", \"Today - 8pm\"]}, \"type\": \"ListButton\", \"width\": 171, \"height\": 205, \"dragging\": false, \"position\": {\"x\": 390.0880470986749, \"y\": 22.757911969815552}, \"selected\": false, \"positionAbsolute\": {\"x\": 390.0880470986749, \"y\": 22.757911969815552}}, {\"id\": \"5\", \"data\": {\"label\": \"Please enter your full name and contact number\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 609.943087535628, \"y\": 95.77836293470985}, \"selected\": false, \"positionAbsolute\": {\"x\": 609.943087535628, \"y\": 95.77836293470985}}, {\"id\": \"6\", \"data\": {\"label\": \"Your appointment is booked\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 772.3066674651943, \"y\": 92.69858701048577}, \"selected\": false, \"positionAbsolute\": {\"x\": 772.3066674651943, \"y\": 92.69858701048577}}, {\"id\": \"7\", \"data\": {\"label\": \"No problem! Let us know whenever you\'re ready to book. Have a nice day\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 183.72749184751817, \"y\": 276.679150560136}, \"selected\": false, \"positionAbsolute\": {\"x\": 183.72749184751817, \"y\": 276.679150560136}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option_0-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": \"option_0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-3option-0-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-3option-1-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": \"option-1\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-3option-2-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": \"option-2\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-4option-0-5\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"5\", \"sourceHandle\": \"option-0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-4option-1-5\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"5\", \"sourceHandle\": \"option-1\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-4option-2-5\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"5\", \"sourceHandle\": \"option-2\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-5-6\", \"type\": \"smoothstep\", \"source\": \"5\", \"target\": \"6\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option_1-7\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"7\", \"sourceHandle\": \"option_1\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-3option_0-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": \"option_0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-3option_1-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": \"option_1\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-3option_2-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": \"option_2\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-4option_0-5\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"5\", \"sourceHandle\": \"option_0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-4option_1-5\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"5\", \"sourceHandle\": \"option_1\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-4option_2-5\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"5\", \"sourceHandle\": \"option_2\", \"targetHandle\": null}]',5,'algorithmic','2025-06-13 06:55:44',2,0),(3,'New Bot','[{\"id\": \"1\", \"data\": {\"label\": \"welcome \"}, \"type\": \"Custom\", \"width\": 112, \"height\": 25, \"dragging\": false, \"position\": {\"x\": -276.6706755013107, \"y\": 59.14086923292865}, \"selected\": false, \"positionAbsolute\": {\"x\": -276.6706755013107, \"y\": 59.14086923292865}}, {\"id\": \"2\", \"data\": {\"label\": \"What do you want to do ?\", \"targetValues\": [\"Booking\", \"Cancel\"]}, \"type\": \"ListButton\", \"width\": 171, \"height\": 169, \"dragging\": false, \"position\": {\"x\": -210.53178179776535, \"y\": 108.49007902117538}, \"selected\": false, \"positionAbsolute\": {\"x\": -210.53178179776535, \"y\": 108.49007902117538}}, {\"id\": \"4\", \"data\": {\"label\": \"To which city are you flying?\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 167.41865664001935, \"y\": 69.93845526576064}, \"selected\": false, \"positionAbsolute\": {\"x\": 167.41865664001935, \"y\": 69.93845526576064}}, {\"id\": \"5\", \"data\": {\"label\": \"Please enter your travel date.\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 494.2102890612721, \"y\": 50.62220134353825}, \"selected\": false, \"positionAbsolute\": {\"x\": 494.2102890612721, \"y\": 50.62220134353825}}, {\"id\": \"6\", \"data\": {\"label\": \"How many passengers are traveling?\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 330.6517005343189, \"y\": 100.70910307631172}, \"selected\": false, \"positionAbsolute\": {\"x\": 330.6517005343189, \"y\": 100.70910307631172}}, {\"id\": \"7\", \"data\": {\"label\": \"Choose your travel class:\", \"targetValues\": [\"First Class\", \"Economy\", \"Business\"]}, \"type\": \"ListButton\", \"width\": 171, \"height\": 205, \"dragging\": false, \"position\": {\"x\": 651.7004114143558, \"y\": -65.08424651865425}, \"selected\": false, \"positionAbsolute\": {\"x\": 651.7004114143558, \"y\": -65.08424651865425}}, {\"id\": \"8\", \"data\": {\"label\": \"Here are available flights on your date. Please choose a flight\", \"targetValues\": [\"Flight 1 - 9:00 AM\", \"Flight 2 - 2:00 PM\", \"Flight 3 - 8:00 PM\"]}, \"type\": \"ListButton\", \"width\": 171, \"height\": 205, \"dragging\": false, \"position\": {\"x\": 864.2896341951216, \"y\": -67.20409539899336}, \"selected\": false, \"positionAbsolute\": {\"x\": 864.2896341951216, \"y\": -67.20409539899336}}, {\"id\": \"9\", \"data\": {\"label\": \"Please confirm your booking details:\", \"targetValues\": [\"Confirm\", \"Cancel\"]}, \"type\": \"ListButton\", \"width\": 171, \"height\": 169, \"dragging\": false, \"position\": {\"x\": 1085.783742272498, \"y\": -57.124727568396096}, \"selected\": false, \"positionAbsolute\": {\"x\": 1085.783742272498, \"y\": -57.124727568396096}}, {\"id\": \"11\", \"data\": {\"label\": \"From which city are you flying?\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 8.551305377407814, \"y\": 67.60744933524589}, \"selected\": false, \"positionAbsolute\": {\"x\": 8.551305377407814, \"y\": 67.60744933524589}}, {\"id\": \"12\", \"data\": {\"label\": \"Click here to complete payment: [Payment Link]\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 783.4027073545776, \"y\": 256.5955961589461}, \"selected\": true, \"positionAbsolute\": {\"x\": 783.4027073545776, \"y\": 256.5955961589461}}, {\"id\": \"13\", \"data\": {\"label\": \" Your flight has been booked successfully\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 957.160595462292, \"y\": 240.29599211094956}, \"selected\": false, \"positionAbsolute\": {\"x\": 957.160595462292, \"y\": 240.29599211094956}}, {\"id\": \"14\", \"data\": {\"label\": \"Enter your Booking ID \"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 28.5988340685126, \"y\": 325.97061867102684}, \"selected\": false, \"positionAbsolute\": {\"x\": 28.5988340685126, \"y\": 325.97061867102684}}, {\"id\": \"15\", \"data\": {\"label\": \"To confirm your identity, please enter the passenger name or registered phone number\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 192.3885613157193, \"y\": 320.9309347557282}, \"selected\": false, \"positionAbsolute\": {\"x\": 192.3885613157193, \"y\": 320.9309347557282}}, {\"id\": \"16\", \"data\": {\"label\": \"Do you want to proceed with the cancellation?\", \"targetValues\": [\"Yes\", \"No\"]}, \"type\": \"ReplyButton\", \"width\": 201, \"height\": 143, \"dragging\": false, \"position\": {\"x\": 378.85686618177, \"y\": 286.9130683274622}, \"selected\": false, \"positionAbsolute\": {\"x\": 378.85686618177, \"y\": 286.9130683274622}}, {\"id\": \"17\", \"data\": {\"label\": \"Your flight has been canceled successfully\"}, \"type\": \"CustomText\", \"width\": 127, \"height\": 67, \"dragging\": false, \"position\": {\"x\": 639.660508798476, \"y\": 328.49046062867615}, \"selected\": false, \"positionAbsolute\": {\"x\": 639.660508798476, \"y\": 328.49046062867615}}]','[{\"id\": \"reactflow__edge-1-2\", \"type\": \"smoothstep\", \"source\": \"1\", \"target\": \"2\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option_0-3\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"3\", \"sourceHandle\": \"option_0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-3-4\", \"type\": \"smoothstep\", \"source\": \"3\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-4-6\", \"type\": \"smoothstep\", \"source\": \"4\", \"target\": \"6\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-6-5\", \"type\": \"smoothstep\", \"source\": \"6\", \"target\": \"5\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-5-7\", \"type\": \"smoothstep\", \"source\": \"5\", \"target\": \"7\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-7option_0-8\", \"type\": \"smoothstep\", \"source\": \"7\", \"target\": \"8\", \"sourceHandle\": \"option_0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-7option_1-8\", \"type\": \"smoothstep\", \"source\": \"7\", \"target\": \"8\", \"sourceHandle\": \"option_1\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-7option_2-8\", \"type\": \"smoothstep\", \"source\": \"7\", \"target\": \"8\", \"sourceHandle\": \"option_2\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-8option_0-9\", \"type\": \"smoothstep\", \"source\": \"8\", \"target\": \"9\", \"sourceHandle\": \"option_0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-8option_1-9\", \"type\": \"smoothstep\", \"source\": \"8\", \"target\": \"9\", \"sourceHandle\": \"option_1\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-8option_2-9\", \"type\": \"smoothstep\", \"source\": \"8\", \"target\": \"9\", \"sourceHandle\": \"option_2\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option_0-11\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"11\", \"sourceHandle\": \"option_0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-11-4\", \"type\": \"smoothstep\", \"source\": \"11\", \"target\": \"4\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-9option_0-12\", \"type\": \"smoothstep\", \"source\": \"9\", \"target\": \"12\", \"sourceHandle\": \"option_0\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-12-13\", \"type\": \"smoothstep\", \"source\": \"12\", \"target\": \"13\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-2option_1-14\", \"type\": \"smoothstep\", \"source\": \"2\", \"target\": \"14\", \"sourceHandle\": \"option_1\", \"targetHandle\": null}, {\"id\": \"reactflow__edge-14-15\", \"type\": \"smoothstep\", \"source\": \"14\", \"target\": \"15\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-15-16\", \"type\": \"smoothstep\", \"source\": \"15\", \"target\": \"16\", \"sourceHandle\": null, \"targetHandle\": null}, {\"id\": \"reactflow__edge-16option_0-17\", \"type\": \"smoothstep\", \"source\": \"16\", \"target\": \"17\", \"sourceHandle\": \"option_0\", \"targetHandle\": null}]',2,'algorithmic','2025-06-13 07:25:38',2,0);
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
-- Table structure for table `chat_feedback`
--

DROP TABLE IF EXISTS `chat_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int NOT NULL,
  `user_id` int NOT NULL,
  `feedback` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chat_feedback_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chat_feedback_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_feedback`
--

LOCK TABLES `chat_feedback` WRITE;
/*!40000 ALTER TABLE `chat_feedback` DISABLE KEYS */;
INSERT INTO `chat_feedback` VALUES (1,112,5,0,'2025-06-05 18:21:43'),(2,112,5,NULL,'2025-06-05 18:21:49'),(3,110,5,0,'2025-06-05 18:30:07'),(4,110,5,1,'2025-06-05 18:39:25'),(5,110,5,0,'2025-06-05 18:41:37'),(6,110,5,NULL,'2025-06-05 18:43:16'),(7,110,5,0,'2025-06-05 18:43:22'),(8,112,5,0,'2025-06-05 18:43:51'),(9,112,5,NULL,'2025-06-05 18:43:52'),(10,112,5,0,'2025-06-05 18:44:46'),(11,112,5,NULL,'2025-06-05 18:44:49'),(12,112,5,0,'2025-06-05 18:45:01'),(13,112,5,NULL,'2025-06-05 18:45:02'),(14,112,5,0,'2025-06-05 18:48:45'),(15,112,5,NULL,'2025-06-05 18:48:46'),(16,108,5,1,'2025-06-05 18:53:25'),(17,108,5,NULL,'2025-06-05 18:53:27'),(18,108,5,0,'2025-06-05 18:53:28'),(19,108,5,NULL,'2025-06-05 18:53:48'),(20,108,5,1,'2025-06-05 18:53:50'),(21,108,5,NULL,'2025-06-05 18:53:51'),(22,108,5,0,'2025-06-05 19:00:33'),(23,108,5,NULL,'2025-06-05 19:00:34'),(24,108,5,0,'2025-06-05 19:00:44'),(25,108,5,NULL,'2025-06-05 19:00:45'),(26,108,5,0,'2025-06-05 19:01:17'),(27,108,5,NULL,'2025-06-05 19:01:18'),(28,108,5,1,'2025-06-05 19:01:19'),(29,108,5,NULL,'2025-06-05 19:01:19'),(30,108,5,0,'2025-06-05 19:02:05'),(31,108,5,1,'2025-06-05 19:02:07'),(32,108,5,NULL,'2025-06-05 19:02:50'),(33,118,5,0,'2025-06-05 19:15:31'),(34,118,5,0,'2025-06-05 19:15:57'),(35,120,5,0,'2025-06-05 19:18:11'),(36,126,5,0,'2025-06-05 19:29:54'),(37,128,5,0,'2025-06-05 19:30:02'),(38,132,5,0,'2025-06-05 19:34:26'),(39,130,5,1,'2025-06-05 19:34:29'),(40,134,5,0,'2025-06-05 19:34:52'),(41,140,5,0,'2025-06-05 19:46:17');
/*!40000 ALTER TABLE `chat_feedback` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_titles`
--

LOCK TABLES `chat_titles` WRITE;
/*!40000 ALTER TABLE `chat_titles` DISABLE KEYS */;
INSERT INTO `chat_titles` VALUES (1,'Hello, how are you',2,'2025-03-28 06:25:52',NULL,1),(2,'Hello, how are you',2,'2025-03-28 06:27:14',NULL,0),(3,'Hello',3,'2025-03-28 06:29:13',NULL,0),(4,'New Chat 28 March 2025',NULL,'2025-03-28 10:02:44',NULL,0),(5,'New Chat 28 March 2025',NULL,'2025-03-28 10:05:37',NULL,0),(6,'New Chat 28 March 2025',NULL,'2025-03-28 10:06:31',NULL,0),(7,'New Chat 28 March 2025',2,'2025-03-28 10:08:50',NULL,1),(8,'New Chat 28 March 2025',2,'2025-03-28 10:10:45',NULL,1),(9,'New Chat 28 March 2025',2,'2025-03-28 10:11:25',NULL,1),(10,'New Chat 28 March 2025',2,'2025-03-28 10:13:02',NULL,1),(11,'New Chat 28 March 2025',2,'2025-03-28 10:19:10',NULL,0),(12,'New Chat 28 March 2025',2,'2025-03-28 10:36:27',NULL,0),(13,'New Chat 29 March 2025',3,'2025-03-29 05:48:32',NULL,0),(14,'New Chat 29 March 2025',3,'2025-03-29 05:51:37',NULL,0),(15,'New Chat 13 May 2025',4,'2025-05-13 09:47:33',NULL,0),(16,'New Chat 13 May 2025',4,'2025-05-13 10:08:00',NULL,0),(17,'New Chat 14 May 2025',4,'2025-05-14 06:11:00',NULL,0),(18,'New Chat 14 May 2025',4,'2025-05-14 06:30:37',NULL,0),(19,'New Chat 15 May 2025',4,'2025-05-15 05:31:31',NULL,0),(20,'New Chat 15 May 2025',4,'2025-05-15 10:45:20',NULL,0),(21,'New Chat 15 May 2025',4,'2025-05-15 10:56:29',NULL,0),(22,'New Chat 15 May 2025',4,'2025-05-15 10:57:36',NULL,0),(23,'New Chat 15 May 2025',4,'2025-05-15 11:21:17',NULL,0),(24,'New Chat 15 May 2025',4,'2025-05-15 11:22:47',NULL,0),(25,'New Chat 17 May 2025',4,'2025-05-17 09:14:26',NULL,0),(26,'New Chat 5 June 2025',5,'2025-06-05 15:55:07',NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (3,2,'user','Hello, how are you doing today?','2025-03-28 06:27:14'),(4,2,'bot','I\'m doing well, thank you!','2025-03-28 06:27:14'),(5,3,'user','Hello','2025-03-28 06:29:13'),(6,3,'bot','Hi,How are You?','2025-03-28 06:29:13'),(8,1,'user','Hello, this is a new chat message!','2025-03-28 06:36:43'),(9,2,'user','Hello, this is a new chat message!','2025-03-28 06:37:22'),(10,2,'bot','Ok,what can i help you?','2025-03-28 06:37:57'),(11,2,'user','hello','2025-03-28 07:50:59'),(12,2,'bot','Hi there! How can I help you today?','2025-03-28 07:50:59'),(13,1,'user','hi','2025-03-28 07:51:38'),(14,1,'bot','Hello! How can I help? ','2025-03-28 07:51:38'),(15,4,NULL,NULL,'2025-03-28 10:02:44'),(16,4,NULL,NULL,'2025-03-28 10:02:44'),(17,5,NULL,NULL,'2025-03-28 10:05:37'),(18,5,NULL,NULL,'2025-03-28 10:05:37'),(19,6,NULL,NULL,'2025-03-28 10:06:31'),(20,6,NULL,NULL,'2025-03-28 10:06:31'),(21,7,'user','Hi','2025-03-28 10:08:50'),(22,7,NULL,NULL,'2025-03-28 10:08:50'),(23,7,'user','hello','2025-03-28 10:10:08'),(24,7,'bot','Hi there! How can I help you today?','2025-03-28 10:10:09'),(25,8,'user','hey there','2025-03-28 10:10:45'),(26,8,NULL,NULL,'2025-03-28 10:10:45'),(27,9,'user','hey there','2025-03-28 10:11:25'),(28,9,NULL,NULL,'2025-03-28 10:11:25'),(29,10,'user','hello','2025-03-28 10:13:02'),(30,10,NULL,NULL,'2025-03-28 10:13:02'),(31,10,'user','helllo','2025-03-28 10:15:27'),(32,10,'bot','Hi there! How can I help you today?','2025-03-28 10:15:27'),(33,10,'user','how are you','2025-03-28 10:15:39'),(34,10,'bot','I\'m doing well. Thank you. How can I assist you today?','2025-03-28 10:15:39'),(35,11,'user','hello theree','2025-03-28 10:19:10'),(36,11,'bot',' I\'m not sure about that. Can you ask something related to Thermax, chillers, or water treatment?','2025-03-28 10:19:10'),(37,12,'user','Hello','2025-03-28 10:36:27'),(38,12,'bot','Hi there! How can I help you today?','2025-03-28 10:36:27'),(39,NULL,'user','dsadsa','2025-03-29 05:17:53'),(40,3,'user','water','2025-03-29 05:24:46'),(41,3,'user','what is water','2025-03-29 05:25:40'),(42,3,'user','hiiii','2025-03-29 05:28:30'),(43,13,'user','water','2025-03-29 05:48:32'),(44,13,'bot','Network Error','2025-03-29 05:48:32'),(45,13,'user','hjhjhj','2025-03-29 05:48:49'),(46,13,'bot','Network Error','2025-03-29 05:48:51'),(47,13,'user','jhgjhghjg','2025-03-29 05:51:28'),(48,13,'bot','Network Error','2025-03-29 05:51:37'),(49,14,'user','sdsadsads','2025-03-29 05:51:37'),(50,14,'bot','Network Error','2025-03-29 05:51:37'),(51,14,'user','water','2025-03-29 05:54:44'),(52,14,'bot','Network Error','2025-03-29 05:54:46'),(53,14,'user','gjfgj','2025-03-29 05:57:38'),(54,13,'user','fdgdf','2025-03-29 05:57:43'),(55,14,'bot','Network Error','2025-03-29 05:59:21'),(56,13,'bot','Network Error','2025-03-29 05:59:21'),(57,15,'user','what is thermax','2025-05-13 09:47:33'),(58,15,'user','Hello','2025-05-13 09:50:06'),(59,15,'user','How does water treatment technology improve industrial efficiency?','2025-05-13 09:53:23'),(60,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 09:54:16'),(61,15,'user','sure','2025-05-13 09:55:23'),(62,15,'user','sure','2025-05-13 09:58:11'),(63,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 09:58:19'),(64,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 09:59:17'),(65,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:01:51'),(66,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:03:56'),(67,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:05:27'),(68,15,'user','How does energy technology improve industrial efficiency?','2025-05-13 10:06:58'),(69,16,'user','Hi','2025-05-13 10:08:00'),(70,16,'user','sure','2025-05-13 10:10:18'),(71,17,'user','hi','2025-05-14 06:11:00'),(72,17,'user','sure','2025-05-14 06:22:19'),(73,17,'user','How does energy technology improve industrial efficiency?','2025-05-14 06:22:29'),(74,18,'user','hii','2025-05-14 06:30:37'),(75,19,'user','hi','2025-05-15 05:31:31'),(76,19,'user','sure','2025-05-15 05:32:53'),(77,15,'user','How does energy technology improve industrial efficiency?','2025-05-15 05:33:57'),(78,20,'user','hi','2025-05-15 10:45:20'),(79,20,'user','hi','2025-05-15 10:56:06'),(80,21,'user','hi','2025-05-15 10:56:29'),(81,15,'user','How does energy technology improve industrial efficiency?','2025-05-15 10:56:59'),(82,15,'user','Hello','2025-05-15 10:57:26'),(83,22,'user','Hello','2025-05-15 10:57:36'),(84,22,'user','How does energy technology improve industrial efficiency?','2025-05-15 11:00:33'),(85,23,'user','hi','2025-05-15 11:21:17'),(86,24,'user','How does energy technology improve industrial efficiency?','2025-05-15 11:22:47'),(87,24,'user','How does energy technology improve industrial efficiency?','2025-05-17 06:33:52'),(88,24,'bot','Optimizing Energy Usage In An Industrial Plant Requires A Combination Of Strategies. Implementing Waste Heat Recovery Systems Can Significantly Reduce Energy Losses By Utilizing Excess Heat For Preheating Processes. Upgrading Insulation In Pipeline And Boilers Helps Minimize Heat Loss. Using Energy-Efficient Equipment, Such As Variable Frequency Drives (Vfds) And High-Efficient Motors, Further Enhances Energy Saving. Regular Energy Audits Help Identify Areas For Improvement And Ensure Sustainable Energy Management.','2025-05-17 06:34:07'),(89,24,'user','hi','2025-05-17 06:34:33'),(90,24,'bot','I\'M Doing Well. Thank You. How Can I Assist You Today?','2025-05-17 06:34:37'),(91,24,'user','sure','2025-05-17 06:35:02'),(92,24,'bot','I Don\'T Know.','2025-05-17 06:35:03'),(93,24,'user','hello','2025-05-17 06:35:09'),(94,24,'bot','I\'M Doing Well. Thank You. How Can I Assist You Today?','2025-05-17 06:35:14'),(95,24,'user','hello','2025-05-17 06:37:17'),(96,24,'bot','I Don\'T Know.','2025-05-17 06:37:18'),(97,24,'user','What\'s up?','2025-05-17 06:37:45'),(98,24,'bot','I Don\'T Know.','2025-05-17 06:37:45'),(99,24,'user','Hi! How are you?','2025-05-17 06:38:20'),(100,24,'bot','I Don\'T Know.','2025-05-17 06:38:21'),(101,24,'user','Hi! How are you?','2025-05-17 06:38:25'),(102,24,'bot','I Don\'T Know.','2025-05-17 06:38:25'),(103,25,'user','Greetings and salutations','2025-05-17 09:14:26'),(104,25,'bot','I Don\'T Know.','2025-05-17 09:14:26'),(105,24,'user','hii','2025-05-17 12:01:55'),(106,24,'bot','Holi Is A Hindu Festival That Celebrates The Triumph Of Good Over Evil, The Arrival Of Spring, And The End Of Winter.','2025-05-17 12:04:57'),(107,26,'user','hello','2025-06-05 15:55:07'),(108,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 15:55:12'),(109,26,'user','how can i help you','2025-06-05 16:07:34'),(110,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 16:07:39'),(111,26,'user','hi','2025-06-05 16:13:04'),(112,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 16:13:09'),(113,26,'user','hello','2025-06-05 16:34:24'),(114,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 16:34:29'),(115,26,'user','hello','2025-06-05 19:03:04'),(116,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:03:09'),(117,26,'user','hello','2025-06-05 19:15:07'),(118,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:15:13'),(119,26,'user','hello','2025-06-05 19:16:34'),(120,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:16:35'),(121,26,'user','he','2025-06-05 19:18:17'),(122,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:18:17'),(123,26,'user','j','2025-06-05 19:20:12'),(124,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:20:12'),(125,26,'user','hi','2025-06-05 19:28:00'),(126,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:28:05'),(127,26,'user','hello','2025-06-05 19:29:59'),(128,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:29:59'),(129,26,'user','dgg','2025-06-05 19:31:59'),(130,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:31:59'),(131,26,'user','hello','2025-06-05 19:32:30'),(132,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:32:30'),(133,26,'user','hello','2025-06-05 19:34:34'),(134,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:34:39'),(135,26,'user','hi','2025-06-05 19:34:43'),(136,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:34:43'),(137,26,'user','hello','2025-06-05 19:37:39'),(138,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:37:39'),(139,26,'user','hello','2025-06-05 19:45:56'),(140,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:46:01'),(141,26,'user','hello','2025-06-05 19:47:36'),(142,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:47:36'),(143,26,'user','hi','2025-06-05 19:47:54'),(144,26,'bot','I\'m sorry, but there are no data documents available for me to search at the moment. Please try again later or contact an administrator.','2025-06-05 19:47:54');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (7,2,'chatbot dataset.csv','2025-05-13 09:52:31',1,NULL,NULL),(8,2,'thermax.csv','2025-05-13 09:52:50',0,NULL,NULL),(9,4,'lead.csv','2025-06-11 08:22:15',0,1,'Genarative ai');
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
  `sector_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sector_id` (`sector_id`),
  CONSTRAINT `fk_sector_id` FOREIGN KEY (`sector_id`) REFERENCES `sector` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_service`
--

LOCK TABLES `product_service` WRITE;
/*!40000 ALTER TABLE `product_service` DISABLE KEYS */;
INSERT INTO `product_service` VALUES (1,2,'thermax pro1','dumy text','1745647829370-256756583.webp','2025-04-25 12:59:42',NULL,0,NULL),(2,NULL,'Thermax 1','Thermax Ltd is an Indian multinational engineering conglomerate, involved in clean air, clean energy and clean water, headquartered in Pune.','1745650438580-168009331.jpg','2025-04-26 06:53:58',NULL,0,NULL),(3,2,'Teravista','Teravista.io is a startup company focused on software solutions and consultancy services. With data and technology at the core of our solutions.','1749642491331-456380696.jpg','2025-06-11 11:25:05',NULL,0,1);
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
  `employee_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employee_id` (`employee_id`),
  CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
INSERT INTO `sector` VALUES (1,2,'Dermatology','Healthcare','Bots for Dermatologyclinics','1745652248426-467745167.ico','2025-04-26 06:59:32',NULL,0,NULL),(2,2,'Industry','industrial','In the fast-paced manufacturing industry, scheduling meetings efficiently is critical to maintaining production timelines.','1747903453303-409849841.jpg','2025-05-14 10:13:11',NULL,0,NULL),(3,2,'Hotel','industrial',' is simply dummy text of the printing and typesetting industry.','1747475316323-467780180.jpg','2025-05-17 09:48:36',NULL,0,NULL),(4,2,'Hospital1','industrial','A hospital is a healthcare facility that provides medical and nursing care to patients','1749636845907-63427795.jpg','2025-06-11 10:13:42',NULL,0,NULL),(5,2,'Hospital','chemicals','A grocery shop is a retailing shop where a general range freshly packed food products are available.','1749727013310-986260454.jpg','2025-06-12 11:16:53',NULL,0,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Ashwin Gh','ashwingh@gmail.com','$2b$10$Yhv1Lkt3OaZFn00SYws.7ePBC4G.qwK0fKyJRK/MTNtAz74kvJYjW','123456789',1,'2025-03-27 08:45:59','2025-03-27 09:09:01',NULL,NULL,0),(2,'Sharv S','sharv@gmail.com','$2b$10$A.CS56i73o1XQSJfIM4OpeyeOCsVnc8DJYMFdrOuWMMbx9LG.J1.e','1234567890',0,'2025-03-27 08:50:22','2025-04-26 10:40:59','2025-04-26 10:40:59',NULL,0),(3,'Animesh','animesh@gmail.com','$2b$10$wSJywrCLACEzOt.6SgQPtuvpaaTG3tLAeT4de9g9JN/QAqIC/Onim','1234567890',0,'2025-03-27 08:50:42','2025-03-29 05:07:35','2025-03-29 05:07:35',NULL,0),(4,'priyanka','priyanka@mailinator.com','$2b$10$FTKgANOd/mZaSRHMaCwDUezUY38P2HQHGvbnDQ4BHktbMQtvbi6l6',NULL,0,'2025-05-13 09:46:44','2025-05-17 09:14:03','2025-05-17 09:14:03',NULL,0),(5,'Sushil Patil','sushil@mailinator.com','$2b$10$5F8Azs4PtXH34ShazK9exeO3vsO6hK6IXKHiBMpvyw28GQrxgsvLW',NULL,0,'2025-06-05 15:54:46','2025-06-05 17:34:03','2025-06-05 17:34:03',NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_answers`
--

LOCK TABLES `user_answers` WRITE;
/*!40000 ALTER TABLE `user_answers` DISABLE KEYS */;
INSERT INTO `user_answers` VALUES (1,'919022030279',1,'product_selection','Laptop'),(2,'919022030279',1,'product_selection','Headphones'),(3,'919022030279',1,'product_selection','Laptop'),(4,'919022030279',1,'product_selection','Laptop'),(5,'919022030279',60,'1','fhkf'),(6,'919022030279',60,'1','hi'),(7,'919022030279',60,'2','hello'),(8,'919022030279',1,'1','hello'),(9,'919022030279',1,'2','hi'),(10,'919022030279',103,'1','hi'),(11,'919022030279',103,'2','fine'),(12,'919022030279',103,'3','sayali'),(13,'919022030279',104,'1','hello'),(14,'919022030279',104,'2','fine'),(15,'919022030279',104,'3','sayali'),(16,'919022030279',1,'1','hello'),(17,'919022030279',1,'2','hello'),(18,'919022030279',105,'1','hello'),(19,'919022030279',105,'7','hi'),(20,'919022030279',105,'4','sayali'),(21,'919022030279',105,'5','shelakesayali9022@gmail.com'),(22,'919022030279',105,'6','03777747333'),(23,'919022030279',106,'1','hello'),(24,'919022030279',106,'7','hi'),(25,'919022030279',106,'4','sayali'),(26,'919022030279',106,'5','shelake@gmail.com'),(27,'919022030279',106,'6','7890567890'),(28,'919022030279',107,'1','hello'),(29,'919022030279',107,'7','fine'),(30,'919022030279',107,'4','sayali'),(31,'919022030279',107,'5','abc@gmail.com'),(32,'919022030279',107,'6','6807665783'),(33,'919022030279',108,'1','hi'),(34,'919022030279',108,'8','hotel'),(35,'919022030279',108,'9','bookings'),(36,'919022030279',108,'10','abc@gmail.com'),(37,'919022030279',1,'1','hello'),(38,'919022030279',1,'2','hi'),(39,'919022030279',1,'1','jjofcjn'),(40,'919022030279',1,'2','hi'),(41,'918308459428',1,'1','hii'),(42,'918308459428',1,'2','hii'),(43,'919022030279',109,'1','hello'),(44,'919022030279',109,'7','hi'),(45,'919022030279',109,'4','sayali'),(46,'919022030279',109,'5','abc@gmail.com'),(47,'919022030279',109,'6','8907876544'),(48,'919022030279',110,'1','hello'),(49,'919022030279',110,'7','hello'),(50,'919022030279',110,'4','hello'),(51,'919022030279',110,'5','hello'),(52,'919022030279',110,'6','hello'),(53,'919022030279',111,'1','hello'),(54,'919022030279',111,'7','hi'),(55,'919022030279',111,'4','sayali'),(56,'919022030279',111,'5','asd@gmail.com'),(57,'919022030279',111,'6','7899768900'),(58,'919022030279',1,'1','hello'),(59,'919022030279',1,'2','hi'),(60,'919022030279',160,'1','hi'),(61,'919022030279',160,'7','hi'),(62,'919022030279',160,'4','abc'),(63,'919022030279',160,'5','abc@gmail.com'),(64,'919022030279',160,'6','68976667888'),(65,'919022030279',160,'6','flight'),(66,'919022030279',161,'1','flight'),(67,'919022030279',161,'8','1'),(68,'919022030279',161,'9','1'),(69,'919022030279',161,'10','flight'),(70,'919022030279',162,'1','hello'),(71,'919022030279',162,'8','flight'),(72,'919022030279',162,'9','hello'),(73,'919022030279',162,'10','flight'),(74,'919022030279',1,'1','hi'),(75,'919022030279',1,'2','hello'),(76,'919022030279',1,'1','flights'),(77,'919022030279',1,'1','Hello'),(78,'919022030279',1,'2','Hi'),(79,'919022030279',1,'1','Hello'),(80,'919022030279',1,'2','Hi'),(81,'919022030279',1,'1','hello'),(82,'919022030279',1,'1','ff'),(83,'919022030279',1,'1','hi'),(84,'919022030279',1,'1','hi'),(85,'919022030279',1,'1','hi'),(86,'919022030279',1,'1','hi'),(87,'919022030279',1,'1','hi'),(88,'919022030279',1,'1','hello'),(89,'919022030279',1,'2','hi'),(90,'919022030279',295,'7','hello'),(91,'919022030279',295,'7','hello'),(92,'919022030279',298,'7','iam good'),(93,'919022030279',299,'2','hello'),(94,'919022030279',299,'3','sayali'),(95,'919022030279',299,'4','bsc'),(96,'919022030279',297,'7','hello'),(97,'919022030279',299,'2','flight'),(98,'919022030279',299,'3','hello'),(99,'919022030279',299,'4','hello'),(100,'919022030279',299,'2','sayali'),(101,'919022030279',299,'3','bsc'),(102,'919022030279',299,'4','bye'),(103,'919022030279',292,'5','good'),(104,'919022030279',295,'4','6'),(105,'918308459428',1,'2','hello'),(106,'919022030279',295,'5','hello'),(107,'918308459428',1,'2','hello'),(108,'918308459428',1,'2','hello'),(109,'919022030279',294,'4','6'),(110,'919022030279',294,'5','hello'),(111,'919022030279',1,'2','hi'),(112,'919022030279',295,'4','7'),(113,'918308459428',1,'2','hello'),(114,'919022030279',295,'5','hello'),(115,'919022030279',295,'4','6'),(116,'919022030279',295,'5','hello'),(117,'919022030279',295,'4','6'),(118,'919022030279',295,'5','hello'),(119,'918308459428',1,'2','flight'),(120,'919022030279',299,'2','abc'),(121,'919022030279',299,'3','bsc'),(122,'918308459428',1,'2','hello'),(123,'918308459428',1,'2','hello'),(124,'919022030279',299,'4','hello'),(125,'919022030279',295,'4','7'),(126,'919022030279',295,'5','hello'),(127,'919022030279',295,'4','8'),(128,'919022030279',295,'5','hello'),(129,'919022030279',295,'4','6'),(130,'919022030279',295,'5','hello'),(131,'919022030279',295,'4','8'),(132,'919022030279',295,'5','hello'),(133,'919022030279',295,'4','8'),(134,'919022030279',295,'5','hello'),(135,'919022030279',295,'2','Booking'),(136,'919022030279',295,'3','Pune to Mumbai'),(137,'919022030279',295,'4','8'),(138,'919022030279',295,'5','hello'),(139,'919022030279',295,'2','Booking'),(140,'919022030279',295,'3','Pune to Mumbai'),(141,'919022030279',295,'4','8'),(142,'919022030279',295,'5','hello'),(143,'919022030279',295,'2','Booking'),(144,'919022030279',295,'3','Pune to Mumbai'),(145,'919022030279',295,'4','7'),(146,'919022030279',295,'5','hello'),(147,'919022030279',295,'2','Booking'),(148,'919022030279',295,'3','Pune to Mumbai'),(149,'919022030279',295,'4','7'),(150,'919022030279',295,'5','hello'),(151,'919022030279',295,'2','Cancel'),(152,'919022030279',295,'6','8'),(153,'919022030279',295,'7','hello'),(154,'919022030279',155,'8','Flight'),(155,'919022030279',155,'9','Booking '),(156,'918308459428',1,'2','flight'),(157,'918308459428',1,'2','hello'),(158,'919022030279',300,'4','Flight '),(159,'919022030279',300,'5','Booking'),(160,'919022030279',300,'7','Pune to Delhi'),(161,'919022030279',300,'8','14-05-2025'),(162,'919022030279',300,'2','Morning'),(163,'919022030279',300,'16','12:10'),(164,'919022030279',300,'3','yes'),(165,'919022030279',300,'4','Flight '),(166,'919022030279',300,'5','Cancel'),(167,'919022030279',300,'13','9235425869'),(168,'919022030279',300,'14','15-5-2025'),(169,'919022030279',296,'7','i am good'),(170,'919022030279',301,'2','yes'),(171,'919022030279',301,'3','yes'),(172,'919022030279',301,'4','17-6-2025 ,at 6 pm'),(173,'919022030279',302,'2','customers details'),(174,'919022030279',302,'3','customers-100.csv'),(175,'919022030279',302,'2','customers details'),(176,'919022030279',302,'2','customers details'),(177,'919022030279',302,'3','customers-100.csv'),(178,'919022030279',302,'3','customers-100.csv'),(179,'919022030279',302,'3','customers-100.csv'),(180,'919022030279',302,'2','customers details'),(181,'919022030279',302,'3','customers-100.csv'),(182,'919022030279',302,'3','customers-100.csv'),(183,'919022030279',302,'2','customers details'),(184,'919022030279',302,'3','customers-100.csv'),(185,'919022030279',302,'2','customers'),(186,'919022030279',302,'3','customers-100.csv'),(187,'919022030279',303,'2','yes'),(188,'919022030279',303,'2','yes'),(189,'919022030279',303,'3','customers-100.csv'),(190,'919022030279',303,'2','yes'),(191,'919022030279',303,'2','yes'),(192,'919022030279',303,'2','yes'),(193,'919022030279',304,'4','yes'),(194,'919022030279',304,'4','yes'),(195,'919022030279',275,'2','Booking'),(196,'919022030279',275,'3','Pune to Mumbai'),(197,'919022030279',275,'4','6'),(198,'919022030279',290,'2','Cancel'),(199,'919022030279',290,'6','7'),(200,'919022030279',290,'7','hotel'),(201,'919022030279',305,'3','yes'),(202,'919022030279',305,'2','customers-100.csv'),(203,'919022030279',306,'5','yes'),(204,'919022030279',306,'6','customers-100.csv'),(205,'919022030279',306,'5','yes'),(206,'919022030279',306,'6','customers-100.csv'),(207,'919022030279',309,'2','Yes'),(208,'919022030279',309,'2','Yes'),(209,'919022030279',309,'2','Yes'),(210,'919022030279',309,'2','Yes'),(211,'919022030279',309,'2','Yes'),(212,'919022030279',298,'7','good'),(213,'919022030279',300,'4','Flight '),(214,'919022030279',300,'5','Booking'),(215,'919022030279',300,'7','Pune to Delhi'),(216,'919022030279',300,'8','12-7-2025'),(217,'919022030279',300,'2','Morning'),(218,'919022030279',300,'16','12am'),(219,'919022030279',300,'3','yes'),(220,'918308459428',1,'2','hello'),(221,'919022030279',314,'3','yes'),(222,'919022030279',314,'4','₹30,000 - ₹50,000'),(223,'919022030279',314,'5','Hp'),(224,'919022030279',314,'6','SSD'),(225,'919022030279',315,'9','yes'),(226,'919022030279',315,'10','₹30,000 - ₹50,000'),(227,'919022030279',315,'11','Hp'),(228,'919022030279',315,'12','SSD'),(229,'919022030279',315,'9','yes'),(230,'919022030279',315,'10','₹30,000 - ₹50,000'),(231,'919022030279',315,'11','Hp'),(232,'919022030279',315,'12','SSD'),(233,'919022030279',315,'13',' HP -Buy Now'),(234,'918308459428',315,'9','yes'),(235,'918308459428',315,'10','Under ₹30,000'),(236,'918308459428',315,'11','Dell'),(237,'918308459428',315,'12','Touchscreen'),(238,'918308459428',315,'13',' Dell -Buy now '),(239,'919022030279',1,'2','i am good'),(240,'919022030279',2,'2','Yes'),(241,'919022030279',2,'3','Dermatology'),(242,'919022030279',2,'4','Tommorrow -6pm'),(243,'919022030279',2,'5','sayali shelake'),(244,'919022030279',2,'2','No'),(245,'919022030279',3,'2','Cancel'),(246,'919022030279',3,'14','78'),(247,'919022030279',3,'15','sayali - 9865237400'),(248,'919022030279',3,'16','Yes'),(249,'919022030279',3,'2','Booking'),(250,'919022030279',3,'2','Booking');
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
  `current_node_id` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=473 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_node_progress`
--

LOCK TABLES `user_node_progress` WRITE;
/*!40000 ALTER TABLE `user_node_progress` DISABLE KEYS */;
INSERT INTO `user_node_progress` VALUES (285,'+919022030279',1,'1','2025-06-03 11:36:39'),(463,'918308459428',315,'14','2025-06-11 06:59:17'),(464,'918308459428',315,'0','2025-06-11 07:24:01'),(465,'918308459428',315,'0','2025-06-11 07:25:04'),(467,'919022030279',2,'3','2025-06-13 08:55:07'),(468,'919022030279',2,'3','2025-06-13 08:55:07'),(469,'919022030279',3,'3','2025-06-13 08:55:07'),(470,'919022030279',3,'3','2025-06-13 08:55:07'),(471,'919022030279',3,'3','2025-06-13 08:55:07'),(472,'919022030279',3,'3','2025-06-13 08:55:07');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whatsup_number`
--

LOCK TABLES `whatsup_number` WRITE;
/*!40000 ALTER TABLE `whatsup_number` DISABLE KEYS */;
INSERT INTO `whatsup_number` VALUES (1,'9022030279',0,'2025-05-28 07:38:15'),(2,'919022030279',0,'2025-05-28 09:05:55'),(3,'919022030279',1,'2025-05-30 07:42:05'),(4,'918308459428',0,'2025-06-04 10:39:27');
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

-- Dump completed on 2025-06-13 14:29:04
