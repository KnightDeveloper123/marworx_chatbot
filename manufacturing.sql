-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: manufacturing
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
  `type` varchar(25) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  `is_enable` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'priyanka1','admin','priyanka1','8984565678','priyanka@mailinator.com','$2a$10$kxc2ipvm//.I4W11Cfh/ceDHoY2zlqS25VvQb0vEFoPRWaDpiCevS',NULL,'2024-10-24 09:59:59',0,0),(2,'priyanka1','developer',NULL,'9898787876','developer@mailinator.com','$2a$10$vYvCWqb34M7T6XDw.TWaUeRf2I.hC5NKmAl6Pdq9BGDw5GfbI0GHu','2024-10-17 11:35:17','2024-10-17 12:53:38',1,0),(3,'priyanka','employees',NULL,'3434342343','Priya@gmail.com',NULL,'2024-10-21 05:54:27','2024-10-21 05:54:27',0,0),(4,'rohit','employees',NULL,'2342342342','rohit@mailinator.com',NULL,'2024-11-08 08:43:43','2024-11-08 08:43:43',0,0),(5,'amr','employees',NULL,'3456456454','am@mailinator.com',NULL,'2024-11-08 08:45:18','2024-11-08 08:45:18',0,0),(6,'Barate Priyanka',NULL,'Priyanka',NULL,'baratepriyanka17@gmail.com',NULL,NULL,NULL,0,0),(7,'Nikhil Kharche',NULL,'Kharche',NULL,'nikhilkharche101199@gmail.com',NULL,NULL,NULL,0,0);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `people_id` int DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `created_On` timestamp NULL DEFAULT NULL,
  `updated_On` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_logo`
--

DROP TABLE IF EXISTS `company_logo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_logo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logo` text,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_logo`
--

LOCK TABLES `company_logo` WRITE;
/*!40000 ALTER TABLE `company_logo` DISABLE KEYS */;
INSERT INTO `company_logo` VALUES (1,'logo.png',0,NULL,NULL);
/*!40000 ALTER TABLE `company_logo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_setting`
--

DROP TABLE IF EXISTS `company_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL,
  `tax_number` varchar(20) DEFAULT NULL,
  `gst_number` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_setting`
--

LOCK TABLES `company_setting` WRITE;
/*!40000 ALTER TABLE `company_setting` DISABLE KEYS */;
INSERT INTO `company_setting` VALUES (1,'Marworx Technology Private Limited.','support@marworx.com','8978767656','https://marworx.com','GSTIN 67353892761','GSTIN 56472625283','Sakore Nagar, Viman Nagar','Pune','Maharastra','India',0,'2024-10-21 09:32:38','2025-01-23 09:28:51');
/*!40000 ALTER TABLE `company_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currency_name` varchar(50) DEFAULT NULL,
  `currency_code` varchar(50) DEFAULT NULL,
  `currency_symbol` varchar(50) DEFAULT NULL,
  `is_enable` int DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES (1,'Euro','EUR','Γé¼',NULL,'2024-10-14 12:16:15','2024-10-14 12:22:15',1),(2,'Euroq','EURq','Γé¼',0,'2024-10-14 12:19:09','2024-10-23 13:30:04',1),(3,'Euro','EUR','$',0,'2024-10-23 13:01:44','2024-10-23 13:01:44',0),(4,'USA','USD','$',1,'2024-10-23 13:02:25','2024-10-23 13:02:25',0);
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency_setting`
--

DROP TABLE IF EXISTS `currency_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currency_id` int DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency_setting`
--

LOCK TABLES `currency_setting` WRITE;
/*!40000 ALTER TABLE `currency_setting` DISABLE KEYS */;
INSERT INTO `currency_setting` VALUES (1,1,0,NULL,NULL);
/*!40000 ALTER TABLE `currency_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `b_date` timestamp NULL DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `active` int DEFAULT '0' COMMENT '0 is active, 1 is inactive ',
  `created_date` timestamp NULL DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  `lead_id` int DEFAULT NULL,
  `assignee_id` int DEFAULT NULL,
  `subscription` text,
  PRIMARY KEY (`id`),
  KEY `assignee_id` (`assignee_id`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`assignee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (31,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,'2024-12-27 10:21:18',1,NULL,17,NULL),(32,'priyanka1','priyanka11@mailinator.com','$2a$10$l4byNH83UE.kFIfJPzPHJuLi/Xaw9H5dX7nfC1ct0txr9waRYGt0O','7876567654','2023-03-16 18:30:00','pune','Lab-Sar','Balkh','Afghanistan',NULL,0,'2024-12-27 10:18:50','2024-12-28 11:23:18',0,14,17,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/cbrWarY5PEo:APA91bEYJkhCYGTKSRNWdzliRDjEXQCpV1-vHC0bMmvbnUKRO2Y8I3h99Tc4DhnTcG0ZyPoEs9HXWhCzqXXgaKX-wjMzjzXhARNQY6q3GMf6h-JH2O0Klu5ZOmDMHZSL-Q3xEfickCcs\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BFaMKEIi-535TIYJy9ZJoRhz9BNmnALG3h-PhEoz5bd8Jajr-0s0qscsWGrHALv8gt3wve0yN5qVia8dlVVb4jo\",\"auth\":\"dZi0ikELRm6nQaJTf4z_Og\"}}'),(33,'nikhil','nikhil@gmail.com',NULL,'8987876787','2024-12-28 18:30:00','pune','la Massana','La Massana','Andorra',NULL,0,'2024-12-28 12:45:56','2024-12-28 12:45:56',0,NULL,17,NULL),(34,'rohini','ronini@mailinator.com',NULL,'6789878767','2024-12-30 18:30:00','katraj','Pune','Maharashtra','India',NULL,0,'2024-12-30 13:35:58','2024-12-30 13:35:58',0,NULL,17,NULL),(35,'rohini','ronini@mailinator.com',NULL,'6789878767','2024-12-30 18:30:00','katraj','Pune','Maharashtra','India',NULL,0,'2024-12-30 13:35:58','2024-12-30 13:35:58',0,NULL,17,NULL),(36,'rohini','ronini@mailinator.com',NULL,'6789878767','2024-12-30 18:30:00','katraj','Pune','Maharashtra','India',NULL,0,'2024-12-30 13:35:58','2024-12-30 13:35:58',0,NULL,17,NULL),(37,'rohini','ronini@mailinator.com',NULL,'6789878767','2024-12-30 18:30:00','katraj','Pune','Maharashtra','India',NULL,0,'2024-12-30 13:35:58','2024-12-30 13:35:58',0,NULL,17,NULL),(38,'rohini','ronini@mailinator.com',NULL,'6789878767','2024-12-30 18:30:00','katraj','Pune','Maharashtra','India',NULL,0,'2024-12-30 13:35:58','2024-12-30 13:35:58',0,NULL,17,NULL),(39,'priyanka','priyanka123@mailinator.com',NULL,'8787678769','2024-12-25 18:30:00','pune','Baksa','Assam','India',NULL,0,'2024-12-31 08:11:39','2024-12-31 08:11:39',0,NULL,17,NULL),(40,'priyanka','priyanka123@mailinator.com',NULL,'8787678769','2024-12-31 18:30:00','pune','Baksa','Assam','India',NULL,0,'2024-12-31 09:41:06','2024-12-31 09:41:06',0,NULL,17,NULL),(41,'priyanka','priyanka123@mailinator.com',NULL,'8787678769','2025-01-01 18:30:00','pune','Baksa','Assam','India',NULL,0,'2024-12-31 09:41:47','2024-12-31 09:41:47',0,NULL,17,NULL),(42,'mansi','mansi@mailinator.com',NULL,'1232342343','2025-01-14 18:30:00','pune','Shivaji Nagar','Maharashtra','India',NULL,0,'2025-01-06 06:13:13','2025-01-06 06:13:13',0,6,17,NULL),(43,'anushka','anushka@mailinator.com',NULL,'7876567654','2023-03-16 18:30:00','pune','pune','maharashtra','india',NULL,0,'2025-01-06 09:33:21','2025-01-06 09:33:21',0,NULL,17,NULL),(44,'bharti','bharti@mailinator.com',NULL,'7876567654','2023-03-16 18:30:00','pune','pune','maharashtra','india',NULL,0,'2025-01-06 09:35:05','2025-01-06 09:35:05',0,NULL,17,NULL),(45,'sahil','sahil@mailinator.com',NULL,'7876567654','2023-03-16 18:30:00','pune','pune','maharashtra','india',NULL,0,'2025-01-06 09:36:02','2025-01-06 09:36:02',0,NULL,17,NULL),(46,'sahil1234','sahil1234@mailinator.com',NULL,'7876567654','2023-03-16 18:30:00','pune','pune','maharashtra','india',NULL,0,'2025-01-06 09:37:41','2025-01-06 09:37:41',0,NULL,17,NULL),(47,'priyanka','priyanka123@mailinator.com',NULL,'8787678769','2025-01-23 18:30:00','pune','Baksa','Assam','India',NULL,0,'2025-01-08 06:35:14','2025-01-08 06:35:14',0,3,17,NULL),(48,'Srivalli Punde','srivalii@gmail.com',NULL,'1245457839','2025-01-11 18:30:00','Street 242, Block A','Bashkia Berat','Berat District','Albania',NULL,0,'2025-01-11 11:14:36','2025-01-25 10:56:50',0,7,17,NULL),(49,'asdfgh','sadf@gmail.com',NULL,'2345675678','2025-01-13 18:30:00','ABC','Ghormach','Badghis','Afghanistan',NULL,0,'2025-01-14 05:17:56','2025-01-14 05:17:56',0,5,17,NULL),(50,'sadsads','adsadsad@gmail.com',NULL,'8767876787','2025-01-15 18:30:00',' ABC','Ashk─üsham','Badakhshan','Afghanistan',NULL,0,'2025-01-16 05:29:53','2025-01-16 05:29:53',0,4,NULL,NULL),(51,'Yogesh ','yogesh22@mailinator.com',NULL,'9898989898','2025-01-16 18:30:00','pune','les Escaldes','Escaldes-Engordany','Andorra',NULL,0,'2025-01-31 05:29:19','2025-01-31 05:29:19',0,17,17,NULL),(52,'Nikhil Mandar','nik12@mailinator.com',NULL,'7897678972','2025-01-16 18:30:00','pune','Encamp','Encamp','Andorra',NULL,0,'2025-01-31 05:31:21','2025-01-31 05:31:21',0,15,17,NULL),(53,'Nikhil Mandar','nikhil@mailinator.com','$2a$10$PYQpke6O6SDBN3jcR8R6FOw0LBMxZ1v6BFbubmaqctHunxtyHdJSW','7658796432','2025-02-20 18:30:00','Street 242, Block A','Nīlī','Daykundi','Afghanistan',NULL,0,'2025-02-05 09:11:01','2025-02-05 09:11:01',0,16,17,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/cq-Nek7nRvA:APA91bHfYb-hIxYtqUqrm4-ZXPTTOO15EbjE_Qnz-Gm8inuu6M5dmkNDEX2K4N72Y6Ige5tcKJOZcuqbgRss9XvpXn-e8sw8ha9BYgGaQsBwy2IMsQwWFmEKBhl7JwcnbjkYLJcqhWgY\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BAGP2qLCTNRRDH56bcmjxjyllrRQSW3ZQnvm8tpdbgMEUFy-Y5-Zt1PkGQYUxL2zFvFgzLmtta8M8pBPd5nQkvA\",\"auth\":\"EwIhmFFYmvxHYLAC9Yiuyw\"}}'),(54,'yogesh','yogesh@mailinator.com','$2a$10$oSDM426PS1DZKPsR3e3A.uNyjqWXQwKIONDqiYoHI8rPvaSh4/exK','0987654321','2025-02-13 18:30:00','pune','Amarpur','Bihar','India',NULL,0,'2025-02-05 09:57:37','2025-02-05 09:57:37',0,12,17,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/f8vB6lBu8II:APA91bHbX33KSykPPgWGKfWwloI_Urbtnl4_ipIt2TN9xL0CB949Q2NJWIsVzYQe9vXqe6H-0bmgL0ICHkAy4_3wDuGDAa13Po29OylEqkhezGv46xQVsmVMJZi1tyKDOe12cY4ktMFK\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BMX5v18BJJuoy0Rhyt0LewZktPyS8wW3M-1N-ySwa2t5dOvkyMmKGFban21MWCuAKo7L8kcm4gvS11RN9kDc11w\",\"auth\":\"j1JwXHcFQNeD3dMn-c0WHA\"}}'),(55,'sidhhi','siddhi@mailinator.com','$2a$10$BEegarssMUaeP4JIOMMjhOND7cVrWHUfZ1coI07D/OIEMmVx/U0rC','6546789876','2003-02-13 18:30:00','pune','Pune Division','Maharashtra','India',NULL,0,'2025-02-06 06:33:44','2025-02-06 06:33:44',0,18,17,'{\"endpoint\":\"https://wns2-pn1p.notify.windows.com/w/?token=BQYAAADgqA7ESp%2b87RtE1%2fDNQ%2bP3KgVDQJ2Jz7Gkgmkz%2baNaqyxd6yOsbFO5Ti8Xm65RuhdNf9rN1wcN%2fzqLG7bGH5KiQUt%2fVro%2bwu3YS0c9%2bqs%2b%2b5o2HjnQoKzg4yMMs0ozS5CUf9G2E3F3pRdTZwB%2f9Ss2vG2vciFlkxZdkx1VgErF6RAj%2beR4LC0089%2fZ01Y1UfxYBNws9uQeyESze6J5AmHvh5DcTUpMo5yAH1RtN88rLFB%2b60jFHJ1QnOIRcNjqK0UUEuStXR5P9GuhoxU1oEbsG2We44zd3tKuWQN%2f%2blsKMwMmry5K1xhQDulRlEBr1JbrBimIDlgOzWo1UaTu674w\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BIlx5lNlL5xpaweJGunOfliJyHgUR526Z8vRV1zbwLc9DYBiVRTmMwRkg7MIAaShEb0ubEiGP_riyn8Vosj9xGo\",\"auth\":\"TLUjyYBDnTujTVJSK6foRw\"}}'),(56,'mr .ronald','ronald@mailinator.com',NULL,'2345678765','2025-04-23 18:30:00','pune','','','',NULL,0,'2025-04-21 10:34:00','2025-04-21 10:34:00',0,19,30,NULL),(57,'jon','jon@mailinator.com',NULL,'2345678764','2025-04-29 18:30:00','pune','','','',NULL,0,'2025-04-21 10:45:47','2025-04-21 10:45:47',0,20,30,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_notifications`
--

DROP TABLE IF EXISTS `customer_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) DEFAULT NULL,
  `content` text,
  `status` int DEFAULT '0',
  `seen` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `link` text,
  `to_cus` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `to_cus` (`to_cus`),
  CONSTRAINT `customer_notifications_ibfk_1` FOREIGN KEY (`to_cus`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_notifications`
--

LOCK TABLES `customer_notifications` WRITE;
/*!40000 ALTER TABLE `customer_notifications` DISABLE KEYS */;
INSERT INTO `customer_notifications` VALUES (1,'New Account Created','Your new account has been created by Eco Manage to manage your services and products.',0,0,'2025-01-31 05:29:20','/customer/profile',51),(2,'New Account Created','Your new account has been created by Eco Manage to manage your services and products.',0,0,'2025-01-31 05:31:21','/customer/profile',52),(3,'New Account Created','Your new account has been created by Eco Manage to manage your services and products.',0,0,'2025-02-05 09:11:02','/customer/profile',53),(4,'New Account Created','Your new account has been created by Eco Manage to manage your services and products.',0,0,'2025-02-05 09:57:37','/customer/profile',54),(5,'Quotation created','A new Quotation with Quotation No: QU-53 is created and assigned to Animesh Pradhan',0,1,'2025-02-05 10:04:51','/customer/cusViewQuoatation/53',54),(6,'New Account Created','Your new account has been created by Eco Manage to manage your services and products.',0,0,'2025-02-06 06:33:44','/customer/profile',55),(7,'Invoice created','New Invoice IN-7 is created and assigned to Animesh Pradhan',0,0,'2025-02-07 09:26:33','/customer/cusViewinvoice/7',53),(8,'Quotation created','A new Quotation with Quotation No: QU-58 is created and assigned to Animesh Pradhan',0,0,'2025-02-08 10:21:56','/customer/cusViewQuoatation/58',52),(9,'Invoice created','New Invoice IN-8 is created and assigned to Animesh Pradhan',0,0,'2025-02-10 09:12:41','/customer/cusViewinvoice/8',53),(10,'Quotation created','A new Quotation with Quotation No: QU-59 is created and assigned to Animesh Pradhan',0,0,'2025-02-10 09:54:54','/customer/cusViewQuoatation/59',53),(11,'Quotation created','A new Quotation with Quotation No: QU-60 is created and assigned to Animesh Pradhan',0,0,'2025-02-10 10:01:08','/customer/cusViewQuoatation/60',53),(12,'Quotation created','A new Quotation with Quotation No: QU-61 is created and assigned to Animesh Pradhan',0,0,'2025-02-10 10:06:12','/customer/cusViewQuoatation/61',53),(13,'Quotation created','A new Quotation with Quotation No: QU-63 is created and assigned to Animesh Pradhan',0,0,'2025-02-10 10:28:21','/customer/cusViewQuoatation/63',53),(14,'Quotation created','A new Quotation with Quotation No: QU-64 is created and assigned to Animesh Pradhan',0,0,'2025-02-10 10:35:32','/customer/cusViewQuoatation/64',53),(15,'Quotation created','A new Quotation with Quotation No: QU-65 is created and assigned to Animesh Pradhan',0,0,'2025-02-10 10:42:56','/customer/cusViewQuoatation/65',53),(16,'Quotation created','A new Quotation with Quotation No: QU-66 is created and assigned to Animesh Pradhan',0,0,'2025-02-10 10:46:27','/customer/cusViewQuoatation/66',53),(17,'Quotation created','A new Quotation with Quotation No: QU-67 is created and assigned to Animesh Pradhan',0,0,'2025-02-10 10:48:57','/customer/cusViewQuoatation/67',53),(18,'Invoice created','New Invoice IN-9 is created and assigned to Animesh Pradhan',0,0,'2025-02-11 06:34:24','/customer/cusViewinvoice/9',53),(19,'Invoice created','New Invoice IN-10 is created and assigned to Animesh Pradhan',0,1,'2025-02-11 06:39:53','/customer/cusViewinvoice/10',53),(20,'Invoice created','New Invoice IN-11 is created and assigned to Animesh Pradhan',0,0,'2025-02-11 07:14:34','/customer/cusViewinvoice/11',52),(21,'New Account Created','Your new account has been created by Eco Manage to manage your services and products.',0,0,'2025-04-21 10:34:01','/customer/profile',56),(22,'New Account Created','Your new account has been created by Eco Manage to manage your services and products.',0,0,'2025-04-21 10:45:47','/customer/profile',57);
/*!40000 ALTER TABLE `customer_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'IT 10',1,'2024-12-10 09:27:04','2024-12-10 09:32:23'),(2,'Finance',0,'2024-12-10 09:28:06','2024-12-10 09:28:06'),(3,'HR',0,'2024-12-10 09:28:15','2024-12-10 09:28:15'),(4,'Sales',0,'2024-12-10 09:28:23','2024-12-10 09:28:23'),(5,'Testing',0,'2024-12-10 09:28:30','2025-01-30 04:02:27'),(6,'IT',0,'2024-12-10 09:28:34','2024-12-10 09:28:34');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dependancy_employee`
--

DROP TABLE IF EXISTS `dependancy_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dependancy_employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `task_title` varchar(255) DEFAULT NULL,
  `task_file` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `emp_task_status` varchar(20) DEFAULT NULL,
  `is_approved` varchar(255) DEFAULT NULL,
  `completed_on` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dependancy_employee`
--

LOCK TABLES `dependancy_employee` WRITE;
/*!40000 ALTER TABLE `dependancy_employee` DISABLE KEYS */;
INSERT INTO `dependancy_employee` VALUES (1,15,17,'task sub title','null','2025-04-14 07:17:51',0,'Open',NULL,NULL),(2,15,18,'task sub title','5_6300709498449303958.docx','2025-04-14 07:17:51',0,NULL,NULL,NULL),(3,18,32,'task for heyansh','null','2025-04-15 13:20:24',0,NULL,NULL,NULL),(4,18,17,'hello animesh','null','2025-04-21 07:42:45',0,NULL,NULL,NULL),(5,19,17,'new game build one part  ','null','2025-04-22 05:21:34',0,NULL,NULL,NULL),(6,19,27,'added new task by animesh','null','2025-04-22 05:30:07',1,NULL,NULL,NULL),(7,19,18,'new one add depenadancy','null','2025-04-22 05:36:51',1,NULL,NULL,NULL),(8,19,29,'assign the task nikhil','null','2025-04-22 06:31:24',1,NULL,NULL,NULL),(9,21,27,'new add task status','null','2025-04-23 05:58:45',0,'Closed',NULL,NULL),(10,21,30,'add new task','null','2025-04-23 06:56:48',0,'Open',NULL,NULL),(11,23,32,'zxczxc','null','2025-04-23 07:39:48',0,'Open',NULL,NULL),(12,24,29,'check task apis for nikhil','null','2025-04-23 09:19:14',0,'Open',NULL,NULL),(13,25,29,'add next task for check for nikhil','null','2025-04-23 09:27:19',0,'Completed','Approved',NULL),(14,25,17,'check tsak status','null','2025-04-23 11:14:06',1,'Open','Rejected',NULL),(15,25,17,'addd new task check status','null','2025-04-23 11:19:06',0,'Open','Rejected',NULL);
/*!40000 ALTER TABLE `dependancy_employee` ENABLE KEYS */;
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
  `type` varchar(255) DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `reporting_manager` varchar(255) DEFAULT NULL,
  `payment_frequency` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `b_date` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `marital_status` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `work_location` varchar(255) DEFAULT NULL,
  `shift_timing` varchar(255) DEFAULT NULL,
  `weekly_offs` varchar(255) DEFAULT NULL,
  `any_id` varchar(500) DEFAULT NULL,
  `adderss_proof` varchar(500) DEFAULT NULL,
  `resume` varchar(500) DEFAULT NULL,
  `emr_contact_name` varchar(50) DEFAULT NULL,
  `emr_contact_num` varchar(50) DEFAULT NULL,
  `note` varchar(50) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `salary` decimal(15,2) DEFAULT NULL,
  `active` int DEFAULT '0' COMMENT '0 is active, 1 is inactive',
  `department_id` int DEFAULT NULL,
  `skill_id` int DEFAULT NULL,
  `emp_type_id` int DEFAULT NULL,
  `account_status` int DEFAULT '0',
  `subscription` text,
  PRIMARY KEY (`id`),
  KEY `fk_department` (`department_id`),
  KEY `fk_skill` (`skill_id`),
  KEY `fk_employment_type` (`emp_type_id`),
  CONSTRAINT `fk_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `fk_employment_type` FOREIGN KEY (`emp_type_id`) REFERENCES `employment_type` (`id`),
  CONSTRAINT `fk_skill` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (16,'priyanka','admin','8984565678','priyanka@mailinator.com','$2a$10$YWQn6syey..Q5HmMo.OnW.L0NsGme/t4jeLLvjrUgrdtGrnp2MAp6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-01-06 10:07:46','2025-04-18 08:57:12',0,NULL,0,3,1,6,0,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/fNqxTmPGwds:APA91bFt9E2YNrNltN4s-nb1EhOATAPAoPdb4G3Y2w-ZASOCxWNu503o0EHG1XzSStEZj19Xa1T4fWCPlRRiLC5FjsJKFhu1dR4v87nz-UvnTpZpMO6TSRAN_9JYpoo9KF6Y13sWjUWl\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BJplcW81OErapA5G2YTC9Xl_T1x1FWVkt9GoMBzi_uluYyeXyJPxXXHqUB_owVduwSrN_oSRn408XBus4PNZgz8\",\"auth\":\"u5qD0JG4A7qmMT3ujo2zew\"}}'),(17,'Animesh Pradhan','employee','2345678987','animesh.pradhan6666@gmail.com','$2a$10$8w80TQLuTHNIPLJs1nNquupNluN.V15e7GjiDMgkjrwxLc4T7M8Ry','Team Lead','2025-01-15','harshal joshi','Bi-Weekly','23456789876543','2025-01-15','Male','Married','pune','Ahmadnagar','Maharashtra','India',414243,'Onsite','Day','Monday,Thursday,Saturday,Tuesday','1733132121292.pdf','invoice-4-2024 (2).pdf','Manufacturing CRM.pdf','harshal','4325674567','good','2025-01-06 10:26:13','2025-04-18 08:56:30',0,5000000.00,1,3,1,7,0,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/fNqxTmPGwds:APA91bFt9E2YNrNltN4s-nb1EhOATAPAoPdb4G3Y2w-ZASOCxWNu503o0EHG1XzSStEZj19Xa1T4fWCPlRRiLC5FjsJKFhu1dR4v87nz-UvnTpZpMO6TSRAN_9JYpoo9KF6Y13sWjUWl\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BJplcW81OErapA5G2YTC9Xl_T1x1FWVkt9GoMBzi_uluYyeXyJPxXXHqUB_owVduwSrN_oSRn408XBus4PNZgz8\",\"auth\":\"u5qD0JG4A7qmMT3ujo2zew\"}}'),(18,'simon','employee','1234567889','simon@mailinator.com','$2a$10$YWQn6syey..Q5HmMo.OnW.L0NsGme/t4jeLLvjrUgrdtGrnp2MAp6','manager','2025-01-10','simon','Weekly','3245676567','2025-01-23','Male','Married','pune','Pune Division','Maharashtra','India',411010,'Onsite','Day','Tuesday,Thursday,Wednesday','1733132121292.pdf','payment-1-undefined.pdf','payment-1-undefined.pdf','simon','1234567898','good','2025-01-06 10:58:37','2025-04-22 06:29:49',0,500000.00,1,4,1,8,0,'{\"endpoint\":\"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABnpGKNMzSyrDbOVlicvR-H8rwswIKb0D6edBG-6_lAT8gh9VdZJas5u6N6894w3OyxpMVQjBCDdmjzzVztFaU0K5rZjrtyAsfUIgfUfYZWjIR3MTBhbI5oVE_GqS-5y8NiE2D6EUrePsS4RtQ59HeZnYCyfmABAyRuO149-Flhmylscbo\",\"expirationTime\":null,\"keys\":{\"auth\":\"jSLfuip4K_hDZHy6bpPzjw\",\"p256dh\":\"BIMpCZfQMJws_6QegokXAcXwrg_Hy_SS5Lut9_9NYX0kIc3JODZ38WjNdxdPnnNlMdd5R8FzFaSv3yByC0szjxs\"}}'),(19,'John Cena',NULL,'9455722334','dr.illuminati.06@gmail.com','$2a$10$7WOl3DMSZGS8/Duag66PnOngEBORh3v2Qlxg7vMN2.YttEH3bxK.m','Manager','2025-01-13','harshal joshi','Monthly','1547895632',NULL,'Male','Single','Street 242, Block A','Qala i Naw','Badghis','Afghanistan',452689,'Onsite','Night','Wednesday,Friday',NULL,NULL,'wallpaper.jpg',NULL,NULL,NULL,'2025-01-11 11:07:49','2025-01-29 09:10:44',0,25000.00,0,6,1,3,0,NULL),(24,'Naazma Masumdar','hr','9099922334','masumdarnazma1609@gmail.com','$2a$10$BUVv.wGngzHMsBsDVyhdIumYzIU7vHahEVLDj7VFDDht6pXeHwVYO',NULL,'2025-01-13',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-01-13 06:36:38','2025-02-06 05:28:39',1,NULL,0,3,3,2,0,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/cpFy5gbxFUE:APA91bFFn5G-sD1NJ4DJqd8Cv1_Fdj-1dUt9P0OhJzWPtu1Vhh77Ma71qrCQ2Jkuurt_I6cNejQbZ4YMtvgLF4wIqebyvb6bK7dgjPcQCOzEUEkhpU_hLqhsVJ-BIzXfOTzTc5stHVBG\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BKbR-El4uXgUsgps8Pw-Ej8ibjlO3E31X2vBTjrb_G36_LvY6c_k0hB2wYKODJS-w_2RVYb4HLJsFJ4DfpDIOhM\",\"auth\":\"jJf5zpF6ykE0odhPPJtGpg\"}}'),(25,'Harshal joshi','employee','6787656545','er.priyankabarate@gmail.com',NULL,NULL,'2021-10-26','abhijit','Monthly','12345678987654','1995-11-22','Male','Single','pune','Pune','Maharashtra','India',411037,'Remote','Day','Monday','Screenshot 2025-01-23 141808.png','Screenshot 2025-01-23 141808.png','document (18).pdf','harshal','5654345676','dumy','2025-02-06 05:54:49','2025-02-14 06:29:00',1,10000.00,0,6,1,7,0,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/f8vB6lBu8II:APA91bHbX33KSykPPgWGKfWwloI_Urbtnl4_ipIt2TN9xL0CB949Q2NJWIsVzYQe9vXqe6H-0bmgL0ICHkAy4_3wDuGDAa13Po29OylEqkhezGv46xQVsmVMJZi1tyKDOe12cY4ktMFK\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BMX5v18BJJuoy0Rhyt0LewZktPyS8wW3M-1N-ySwa2t5dOvkyMmKGFban21MWCuAKo7L8kcm4gvS11RN9kDc11w\",\"auth\":\"j1JwXHcFQNeD3dMn-c0WHA\"}}'),(26,'Shriya','hr','2345678923','Shriya@mailinator.com','$2a$10$613jqB/vk/aXBmuYxgd6vOzat1C8i2pE1QbtDz7Q2ODOvE8QvgSua',NULL,'2025-02-14',NULL,NULL,NULL,NULL,'Female',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-06 07:17:01','2025-02-12 10:41:59',0,NULL,1,3,3,2,0,'{\"endpoint\":\"https://wns2-pn1p.notify.windows.com/w/?token=BQYAAADgqA7ESp%2b87RtE1%2fDNQ%2bP3KgVDQJ2Jz7Gkgmkz%2baNaqyxd6yOsbFO5Ti8Xm65RuhdNf9rN1wcN%2fzqLG7bGH5KiQUt%2fVro%2bwu3YS0c9%2bqs%2b%2b5o2HjnQoKzg4yMMs0ozS5CUf9G2E3F3pRdTZwB%2f9Ss2vG2vciFlkxZdkx1VgErF6RAj%2beR4LC0089%2fZ01Y1UfxYBNws9uQeyESze6J5AmHvh5DcTUpMo5yAH1RtN88rLFB%2b60jFHJ1QnOIRcNjqK0UUEuStXR5P9GuhoxU1oEbsG2We44zd3tKuWQN%2f%2blsKMwMmry5K1xhQDulRlEBr1JbrBimIDlgOzWo1UaTu674w\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BIlx5lNlL5xpaweJGunOfliJyHgUR526Z8vRV1zbwLc9DYBiVRTmMwRkg7MIAaShEb0ubEiGP_riyn8Vosj9xGo\",\"auth\":\"TLUjyYBDnTujTVJSK6foRw\"}}'),(27,'sidhu','hr','1234567898','sidhu@mailinator.com','$2a$10$7xA/XaaqyVTGgJpsvf4BIePetbuRPXQV2l8iron6r.dbyqaeBExyS',NULL,'2025-02-14','26',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-07 05:46:56','2025-04-22 05:34:25',0,200.00,1,3,3,2,0,'{\"endpoint\":\"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABnpGKNMzSyrDbOVlicvR-H8rwswIKb0D6edBG-6_lAT8gh9VdZJas5u6N6894w3OyxpMVQjBCDdmjzzVztFaU0K5rZjrtyAsfUIgfUfYZWjIR3MTBhbI5oVE_GqS-5y8NiE2D6EUrePsS4RtQ59HeZnYCyfmABAyRuO149-Flhmylscbo\",\"expirationTime\":null,\"keys\":{\"auth\":\"jSLfuip4K_hDZHy6bpPzjw\",\"p256dh\":\"BIMpCZfQMJws_6QegokXAcXwrg_Hy_SS5Lut9_9NYX0kIc3JODZ38WjNdxdPnnNlMdd5R8FzFaSv3yByC0szjxs\"}}'),(28,'saket','hr','2345678917','saket@mailinator.com','$2a$10$XsBqUVpLSb70YdmI1O/TnOr7nqSCuWRmMInBaQDIUUQQ6s7i2OHsO',NULL,'2025-02-20','simon','Bi-Weekly','67567656787678','2025-02-03','Male','Married','pune','Banaj','Berat District','Albania',202020,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-08 07:03:34','2025-02-11 05:44:57',0,200.00,1,6,3,4,0,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/f8vB6lBu8II:APA91bHbX33KSykPPgWGKfWwloI_Urbtnl4_ipIt2TN9xL0CB949Q2NJWIsVzYQe9vXqe6H-0bmgL0ICHkAy4_3wDuGDAa13Po29OylEqkhezGv46xQVsmVMJZi1tyKDOe12cY4ktMFK\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BMX5v18BJJuoy0Rhyt0LewZktPyS8wW3M-1N-ySwa2t5dOvkyMmKGFban21MWCuAKo7L8kcm4gvS11RN9kDc11w\",\"auth\":\"j1JwXHcFQNeD3dMn-c0WHA\"}}'),(29,'nikhil','employee','1224567898','nikhilkharche101199@gmail.com','$2a$10$YWQn6syey..Q5HmMo.OnW.L0NsGme/t4jeLLvjrUgrdtGrnp2MAp6',NULL,'2025-02-28',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-11 05:47:08','2025-04-23 06:57:34',0,NULL,0,6,3,3,0,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/fNqxTmPGwds:APA91bFt9E2YNrNltN4s-nb1EhOATAPAoPdb4G3Y2w-ZASOCxWNu503o0EHG1XzSStEZj19Xa1T4fWCPlRRiLC5FjsJKFhu1dR4v87nz-UvnTpZpMO6TSRAN_9JYpoo9KF6Y13sWjUWl\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BJplcW81OErapA5G2YTC9Xl_T1x1FWVkt9GoMBzi_uluYyeXyJPxXXHqUB_owVduwSrN_oSRn408XBus4PNZgz8\",\"auth\":\"u5qD0JG4A7qmMT3ujo2zew\"}}'),(30,'Akshada','project','7654321890','akshada1@mailinator.com','$2a$10$X05uCZh2EiTe95i.Y339MORyqL4Obidq5tygFpc.NU6km7T/EYSpW',NULL,NULL,'nikhil',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-04-15 06:35:21','2025-04-22 13:13:12',0,NULL,0,6,3,9,0,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/fNqxTmPGwds:APA91bFt9E2YNrNltN4s-nb1EhOATAPAoPdb4G3Y2w-ZASOCxWNu503o0EHG1XzSStEZj19Xa1T4fWCPlRRiLC5FjsJKFhu1dR4v87nz-UvnTpZpMO6TSRAN_9JYpoo9KF6Y13sWjUWl\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BJplcW81OErapA5G2YTC9Xl_T1x1FWVkt9GoMBzi_uluYyeXyJPxXXHqUB_owVduwSrN_oSRn408XBus4PNZgz8\",\"auth\":\"u5qD0JG4A7qmMT3ujo2zew\"}}'),(32,'Heyansh','business','8765432109','heyansh@mailinator.com','$2a$10$ionq2wxrUMmsbTc7q5/hAuFaFrc3PavX.Y/ssemD.OpGRhlkT/Pje',NULL,NULL,'Akshada',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-04-15 09:20:44','2025-04-18 09:23:02',0,NULL,0,6,3,10,0,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/fNqxTmPGwds:APA91bFt9E2YNrNltN4s-nb1EhOATAPAoPdb4G3Y2w-ZASOCxWNu503o0EHG1XzSStEZj19Xa1T4fWCPlRRiLC5FjsJKFhu1dR4v87nz-UvnTpZpMO6TSRAN_9JYpoo9KF6Y13sWjUWl\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BJplcW81OErapA5G2YTC9Xl_T1x1FWVkt9GoMBzi_uluYyeXyJPxXXHqUB_owVduwSrN_oSRn408XBus4PNZgz8\",\"auth\":\"u5qD0JG4A7qmMT3ujo2zew\"}}');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_notifications`
--

DROP TABLE IF EXISTS `employee_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) DEFAULT NULL,
  `content` text,
  `status` int DEFAULT '0',
  `seen` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `link` text,
  `to_emp` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `to_emp` (`to_emp`),
  CONSTRAINT `employee_notifications_ibfk_1` FOREIGN KEY (`to_emp`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_notifications`
--

LOCK TABLES `employee_notifications` WRITE;
/*!40000 ALTER TABLE `employee_notifications` DISABLE KEYS */;
INSERT INTO `employee_notifications` VALUES (1,'Task Updated','Task is Updated by Animesh Pradhan',0,1,'2025-01-30 09:19:13','/admin/edittask/9',16),(2,'New Task Created','A new task is created againest title 3 is assigned to you.',0,0,'2025-01-30 09:22:02','/admin/edittask/10',17),(3,'New lead added','New lead added by name Yogesh  with Cold status',0,1,'2025-01-30 10:47:01','/admin/edit_lead/17',17),(4,'Customer added','A lead by name Yogesh  is converted to customer and assigned to you',0,0,'2025-01-31 05:29:20','/admin/editcustomer/51',17),(5,'Customer added','A lead by name Nikhil Mandar is converted to customer and assigned to you',0,0,'2025-01-31 05:31:21','/admin/editcustomer/52',17),(6,'Quotation created','New quotation QU-51 is created againest Nikhil Mandar.',0,0,'2025-01-31 07:37:41','/admin/viewquotation/51',17),(7,'Quotation created','New quotation QU-52 is created againest Nikhil Mandar.',0,0,'2025-01-31 08:54:22','/admin/viewquotation/52',17),(8,'Next Follow Up added','Your next Follow Up added againest yogesh at date 2025-02-14',0,0,'2025-02-03 10:22:46','/admin/edit_lead/12',17),(9,'Next Follow Up added','Your next Follow Up added againest yogesh at date 2025-03-01',0,0,'2025-02-03 10:32:52','/admin/edit_lead/12',NULL),(10,'Next Follow Up added','Your next Follow Up added againest nikhil at date 2025-02-08',0,0,'2025-02-03 12:13:53','/admin/edit_lead/13',24),(11,'Next Follow Up added','Your next Follow Up added againest priyanka at date 2025-02-28',0,0,'2025-02-03 12:14:21','/admin/edit_lead/3',17),(12,'Customer added','A lead by name Nikhil Mandar is converted to customer and assigned to you',0,0,'2025-02-05 09:11:02','/admin/editcustomer/53',17),(13,'Task Updated','Task is Updated by Animesh Pradhan',0,1,'2025-02-05 09:14:30','/admin/edittask/9',16),(14,'Customer added','A lead by name yogesh is converted to customer and assigned to you',0,0,'2025-02-05 09:57:37','/admin/editcustomer/54',17),(15,'Quotation created','New quotation QU-53 is created againest yogesh.',0,0,'2025-02-05 10:04:51','/admin/viewquotation/53',17),(16,'New Quotation file is upload','New quotation QU-15 is created againest vendor .',0,1,'2025-02-05 11:06:17','/admin/procurementprofile/7',16),(17,'New Quotation file is upload','New quotation QU-16 is created againest vendor .',0,1,'2025-02-05 11:29:30','/admin/procurementprofile/6',16),(18,'New Invoice file is upload','New invoice IN-2 is created againest vendor .',0,1,'2025-02-05 11:34:56','/admin/procurementprofile/7',16),(19,'New Quotation file is upload','New quotation QU-17 is created againest vendor .',0,1,'2025-02-05 12:33:35','/admin/procurementprofile/5',16),(20,'New lead added','New lead added by name sidhhi with Cold status',0,0,'2025-02-06 06:15:27','/admin/edit_lead/18',17),(21,'Next Follow Up added','Your next Follow Up added againest sidhhi at date 2025-02-14',0,0,'2025-02-06 06:18:32','/admin/edit_lead/18',NULL),(22,'Quotation created','New quotation QU-54 is created againest sidhhi.',0,0,'2025-02-06 06:26:49','/admin/viewquotation/54',17),(23,'Customer added','A lead by name sidhhi is converted to customer and assigned to you',0,0,'2025-02-06 06:33:44','/admin/editcustomer/55',17),(24,'New Task Created','A new task is created againest RTX website is assigned to you.',0,0,'2025-02-06 06:46:03','/admin/edittask/11',17),(25,'Task Updated','Task is Updated by Animesh Pradhan',0,1,'2025-02-06 07:07:02','/admin/edittask/11',16),(26,'Task Updated','Task is Updated by simon',0,1,'2025-02-06 07:10:42','/admin/edittask/11',16),(27,'Next Follow Up added','Your next Follow Up added againest nikhil at date 2025-02-08',0,0,'2025-02-07 06:36:46','/admin/edit_lead/13',24),(28,'Next Follow Up added','Your next Follow Up added againest nikhil at date 2025-02-08',0,0,'2025-02-07 06:39:04','/admin/edit_lead/13',24),(29,'Next Follow Up added','Your next Follow Up added againest nikhil at date 2025-02-22',0,0,'2025-02-07 06:40:47','/admin/edit_lead/13',24),(30,'Quotation created','New quotation QU-57 is created againest nikhil.',0,0,'2025-02-07 09:23:48','/admin/viewquotation/57',24),(31,'Invoice created','New Invoice IN-7 is created againest undefined.',0,0,'2025-02-07 09:26:33','/admin/viewinvoice/7',17),(32,'New Task Created','A new task is created againest Project 5 is assigned to you.',0,0,'2025-02-08 10:00:03','/admin/edittask/12',17),(33,'Quotation created','New quotation QU-58 is created againest Nikhil Mandar.',0,0,'2025-02-08 10:21:56','/admin/viewquotation/58',17),(34,'Next Follow Up added','Your next Follow Up added againest nikhil at date 2025-02-22',0,0,'2025-02-08 12:18:04','/admin/edit_lead/13',NULL),(35,'Invoice created','New Invoice IN-8 is created againest undefined.',0,0,'2025-02-10 09:12:41','/admin/viewinvoice/8',17),(36,'Quotation created','New quotation QU-59 is created againest Nikhil Mandar.',0,0,'2025-02-10 09:54:54','/admin/viewquotation/59',17),(37,'Quotation created','New quotation QU-60 is created againest Nikhil Mandar.',0,0,'2025-02-10 10:01:08','/admin/viewquotation/60',17),(38,'Quotation created','New quotation QU-61 is created againest Nikhil Mandar.',0,0,'2025-02-10 10:06:12','/admin/viewquotation/61',17),(39,'Quotation created','New quotation QU-63 is created againest Nikhil Mandar.',0,0,'2025-02-10 10:28:21','/admin/viewquotation/63',17),(40,'Quotation created','New quotation QU-64 is created againest Nikhil Mandar.',0,0,'2025-02-10 10:35:32','/admin/viewquotation/64',17),(41,'Quotation created','New quotation QU-65 is created againest Nikhil Mandar.',0,0,'2025-02-10 10:42:56','/admin/viewquotation/65',17),(42,'Quotation created','New quotation QU-66 is created againest Nikhil Mandar.',0,0,'2025-02-10 10:46:27','/admin/viewquotation/66',17),(43,'Quotation created','New quotation QU-67 is created againest Nikhil Mandar.',0,0,'2025-02-10 10:48:57','/admin/viewquotation/67',17),(44,'New Task Created','A new task is created againest create  rtx  is assigned to you.',0,0,'2025-02-10 11:23:33','/admin/edittask/13',26),(45,'New Quotation file is upload','New quotation QU-18 is created againest srisha.',0,0,'2025-02-10 13:21:36','/admin/procurementprofile/7',17),(46,'New Invoice file is upload','New invoice IN-3 is created againest srisha.',0,0,'2025-02-10 13:22:37','/admin/procurementprofile/7',17),(47,'Invoice created','New Invoice IN-9 is created againest undefined.',0,0,'2025-02-11 06:34:24','/admin/viewinvoice/9',17),(48,'Invoice created','New Invoice IN-10 is created againest undefined.',0,0,'2025-02-11 06:39:53','/admin/viewinvoice/10',17),(49,'Payment added','A New Payment of ₹1,999.00 is added againest Invoice IN-10.',0,0,'2025-02-11 06:40:24','/admin/viewinvoice/10',17),(50,'Payment added','A New Payment of ₹15,298.00 is added againest Invoice IN-7.',0,0,'2025-02-11 06:51:17','/admin/viewinvoice/7',17),(51,'Payment added','A New Payment of ₹31,400.00 is added againest Invoice IN-8.',0,0,'2025-02-11 06:51:33','/admin/viewinvoice/8',17),(52,'Invoice created','New Invoice IN-11 is created againest undefined.',0,1,'2025-02-11 07:14:34','/admin/viewinvoice/U2FsdGVkX18Mc5J5nFpt2iaTzY5NfwwxJObsjClzMi0%3D',17),(53,'Task Updated','Task is Updated by Animesh Pradhan',0,1,'2025-02-12 09:17:17','/admin/edittask/U2FsdGVkX18sZN6ROkaBJHA9qWecK4pEVQ%2Bqu4rNSbo%3D',16),(54,'Task Updated','Task is Updated by Animesh Pradhan',0,1,'2025-02-12 09:18:32','/admin/edittask/U2FsdGVkX19N8wmhZFhyPcor2M9cDje3r5Eqn1anDFQ%3D',16),(55,'Task Updated','Task is Updated by Shriya',0,1,'2025-02-12 10:09:07','/admin/edittask/U2FsdGVkX19rlRm%2FlisxQc1yNYbW8%2FfbafUZfZW1RoU%3D',16),(56,'Task Updated','Task is Updated by Animesh Pradhan',0,1,'2025-02-12 10:40:34','/admin/edittask/U2FsdGVkX1%2By%2FdUixcaW%2BR0uAsqHwmWdL93uB0Sz5Fc%3D',16),(57,'Task Updated','Task is Updated by Shriya',0,1,'2025-02-12 11:29:12','/admin/edittask/U2FsdGVkX1%2Fczq9uCHtBlz7Ax%2BQpK%2FLb6052y4xZjS8%3D',16),(58,'New Invoice file is upload','New invoice IN-4 is created againest vendor .',0,1,'2025-02-13 07:33:40','/admin/procurementprofile/U2FsdGVkX1%2FgBFIqHGDamBz31O%2FkBf35MeCSpaJuvkE%3D',16),(59,'New Invoice file is upload','New invoice IN-5 is created againest vendor .',0,1,'2025-02-13 07:34:09','/admin/procurementprofile/U2FsdGVkX195kc1qA%2FKMMB7zLF0hdfgVcW5j8hvUers%3D',16),(60,'New Invoice file is upload','New invoice IN-6 is created againest vendor .',0,1,'2025-02-13 07:37:58','/admin/procurementprofile/U2FsdGVkX18a1ts6R%2FfGwQphqQD9mJfeD3Cn0MmRJkU%3D',16),(61,'New Invoice file is upload','New invoice IN-7 is created againest vendor .',0,1,'2025-02-13 09:03:06','/admin/procurementprofile/U2FsdGVkX1%2BoBcY7z3VUr8jn3OKjzwZixOHvCfxdC%2Fw%3D',16),(62,'New Invoice file is upload','New invoice IN-8 is created againest vendor .',0,1,'2025-02-13 09:07:41','/admin/procurementprofile/U2FsdGVkX1%2Bwr%2FKGk%2Fl%2BIS0MqiB2ZtRNylUvO5wP54Q%3D',16),(63,'New Invoice file is upload','New invoice IN-9 is created againest vendor .',0,1,'2025-02-13 12:34:13','/admin/procurementprofile/U2FsdGVkX1%2FbiiR2KA9GtBrnt7FU%2BmMK7vxe9e8cRaM%3D',16),(64,'New Invoice file is upload','New invoice IN-10 is created againest vendor .',0,1,'2025-02-14 05:09:41','/admin/procurementprofile/U2FsdGVkX19z26kLDfM2EP0DLqbnsW9I3dd5kJu%2BooA%3D',16),(65,'New Invoice file is upload','New invoice IN-11 is created againest vendor .',0,1,'2025-02-14 05:09:55','/admin/procurementprofile/U2FsdGVkX19rsex0OwF6kCozKF5EWkWrUINRu0%2BYWWM%3D',16),(66,'New Quotation file is upload','New quotation QU-19 is created againest vendor .',0,1,'2025-02-17 05:21:47','/admin/procurementprofile/U2FsdGVkX19n2dv73M7pkuOoqNMTllMTbdo8R3GvYzg%3D',16),(67,'New Quotation file is upload','New quotation QU-20 is created againest vendor .',0,1,'2025-02-17 05:26:56','/admin/procurementprofile/U2FsdGVkX19pwgDB8t5vyazujBhEdrITlCCOtr4YU4A%3D',16),(68,'New Quotation file is upload','New quotation QU-21 is created againest vendor .',0,1,'2025-02-17 05:30:11','/admin/procurementprofile/U2FsdGVkX1%2FVRX0uLPjzswRCHIxr3ltb739occVDEl0%3D',16),(69,'New Quotation file is upload','New quotation QU-22 is created againest vendor .',0,1,'2025-02-17 05:35:47','/admin/procurementprofile/U2FsdGVkX18BrwbceYeWqiuICFbwcm3Ycs52sYZmlKI%3D',16),(70,'New Quotation file is upload','New quotation QU-23 is created againest vendor .',0,1,'2025-02-17 05:41:42','/admin/procurementprofile/U2FsdGVkX1%2Fpg8VWSAnMxtOVIkjwVKZW1pc%2Ff6wPl1A%3D',16),(71,'New Quotation file is upload','New quotation QU-24 is created againest vendor .',0,1,'2025-02-17 05:44:30','/admin/procurementprofile/U2FsdGVkX192mgu5RAVYVbv2KIJe4AodA2GW0tFuA%2Fw%3D',16),(72,'New Quotation file is upload','New quotation QU-25 is created againest vendor .',0,1,'2025-02-17 05:45:22','/admin/procurementprofile/U2FsdGVkX19%2Bwu5nExlN2AYRGEoDEP4m8zBg78x7mHk%3D',16),(73,'New Quotation file is upload','New quotation QU-26 is created againest vendor .',0,1,'2025-02-17 05:52:06','/admin/procurementprofile/U2FsdGVkX18DieLmESi%2FEmcrxlcwYw5lpWo3%2BJEwQys%3D',16),(74,'New Quotation file is upload','New quotation QU-27 is created againest vendor .',0,1,'2025-02-17 05:53:00','/admin/procurementprofile/U2FsdGVkX18iiRobYPtB5Rrq0qndZKTY7ycAGqY%2B1L4%3D',16),(75,'New Quotation file is upload','New quotation QU-28 is created againest vendor .',0,1,'2025-02-17 05:59:29','/admin/procurementprofile/U2FsdGVkX18jA8fi%2Bj8O2wW%2FY49L3Bm6ylz2YTNpOCk%3D',16),(76,'New Quotation file is upload','New quotation QU-29 is created againest vendor .',0,1,'2025-02-17 06:08:59','/admin/procurementprofile/U2FsdGVkX19X9YiwAa6QFQq4cW35LfPHy%2FSyU8A24ik%3D',16),(77,'New Task Created','A new task is created against rtx and assigned to you.',0,1,'2025-04-14 07:17:53','/admin/edittask/U2FsdGVkX1%2Bg7u5t%2FzBmSi8MkdGwwCmTfZ1om97pxWk%3D',16),(78,'New Task Created','A new task is created against RTX website and assigned to you.',0,0,'2025-04-14 11:03:16','/admin/edittask/U2FsdGVkX1%2BDSxyH5j8XO%2Ffc7DgDCo0kg%2FEsg166BG0%3D',28),(79,'Task Updated','Task is Updated by undefined',0,1,'2025-04-15 13:20:24','/admin/edittask/U2FsdGVkX189lpMfc6AyIWqGkub4si3GFEmnecv7cQE%3D',16),(80,'Task Updated','Task is Updated by undefined',0,1,'2025-04-21 07:42:45','/admin/edittask/U2FsdGVkX19G8xWvp7GJoRiPrdxGnbJRokTzoezR7VU%3D',16),(81,'New lead added','New lead added by name mr .ronald with Dormant status',0,0,'2025-04-21 10:33:32','/admin/edit_lead/U2FsdGVkX18IWtVDybPr%2BMWWX7kdO9a2BXOEnjcs0tw%3D',30),(82,'Customer added','A lead by name mr .ronald is converted to customer and assigned to you',0,0,'2025-04-21 10:34:01','/admin/editcustomer/U2FsdGVkX1%2FbOHOVTM6SakkHsrb59CxAm75s5RqeDQ8%3D',30),(83,'New lead added','New lead added by name jon with Cold status',0,0,'2025-04-21 10:45:21','/admin/edit_lead/U2FsdGVkX18h64x%2FV%2FVagRh8So0md7nPEazWyYxEFeQ%3D',30),(84,'Customer added','A lead by name jon is converted to customer and assigned to you',0,0,'2025-04-21 10:45:47','/admin/editcustomer/U2FsdGVkX1%2B5CNBaFOq2pGWz1LiIURl1hEJxTcYZMZA%3D',30),(85,'New Task Created','A new task is created against RTX website and assigned to you.',0,0,'2025-04-22 05:21:35','/admin/edittask/U2FsdGVkX19Tgq89566HQ3kyK7935%2BBQoAiyh1t10As%3D',30),(86,'Task Updated','Task is Updated by undefined',0,1,'2025-04-22 05:30:07','/admin/edittask/U2FsdGVkX1%2BrBPr5%2Fp31BXgBG0VDHL1vHPoa%2FQBAhQc%3D',16),(87,'Task Updated','Task is Updated by undefined',0,1,'2025-04-22 05:36:51','/admin/edittask/U2FsdGVkX1%2Fr4CLOFImUnd0Zo%2F7Vs5p9DDykXY8mfek%3D',16),(88,'Task Updated','Task is Updated by undefined',0,1,'2025-04-22 06:31:24','/admin/edittask/U2FsdGVkX18ZVtpHMF%2BFXnpFv3d6hHyqOC0kdeAS0i8%3D',16),(89,'New Task Created','A new task is created against RTX website and assigned to you.',0,1,'2025-04-23 05:58:46','/admin/edittask/U2FsdGVkX18TKo3ONt3XFC0DShvlFuzETM5fR4xsneM%3D',29),(90,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:16:27','/admin/edittask/U2FsdGVkX1%2Bke07gV4sDE243ee175RxXIdXVP1WY8I4%3D',16),(91,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:17:23','/admin/edittask/U2FsdGVkX194AfOSUDAOG6tLBQZ2ebviPCkWZpuy3Xo%3D',16),(92,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:18:06','/admin/edittask/U2FsdGVkX18JUyFEW5cBDUCd1gE6xe4FyN7sxFeE0gs%3D',16),(93,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:23:48','/admin/edittask/U2FsdGVkX19sJebqTJqKVu36p%2F0mZ9RIhwHYSVBg8QU%3D',16),(94,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:24:02','/admin/edittask/U2FsdGVkX18iti%2FS%2FKVRoGhwDhx9CwR3mu5xXEQgq2I%3D',16),(95,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:24:11','/admin/edittask/U2FsdGVkX1%2BfkdR%2FomgTTjymbCdK67ivurpd%2F1eEJxY%3D',16),(96,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:50:09','/admin/edittask/U2FsdGVkX1%2Fd8MCoMVfAhPJpzPxV0WfUJ5kR%2FIYR8tA%3D',16),(97,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:54:04','/admin/edittask/U2FsdGVkX19MZCyUkdnESjggMNnSZtxxR5ZsneP9ELo%3D',16),(98,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:55:20','/admin/edittask/U2FsdGVkX18ep5Ya66AptWsiC8Lke1zh4jKtS9LdX74%3D',16),(99,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:56:48','/admin/edittask/U2FsdGVkX1%2F0wkxgq%2FR0GYCVn9SwVq8%2FYXyPhOS7Z0Q%3D',16),(100,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 06:58:09','/admin/edittask/U2FsdGVkX19zbxxtYadQiQ%2FYDAUPmgol6Xa%2FKkKKYeM%3D',16),(101,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 07:33:24','/admin/edittask/U2FsdGVkX1%2FFX01uqyHuL7H33kvhhJ9%2BYVmeXFv9QLY%3D',16),(102,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 07:33:59','/admin/edittask/U2FsdGVkX1905EqAQgWJh7GIZ%2B4R7JEEebJSDLbLMy0%3D',16),(103,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 07:36:22','/admin/edittask/U2FsdGVkX1%2Fh3BdgDQigcGT8YUjFo3kiEeuDIbChrWo%3D',16),(104,'Task Updated','Task is Updated by undefined',0,1,'2025-04-23 07:36:53','/admin/edittask/U2FsdGVkX1%2FuD9VQvzVzj0Dp3fn2Bd0Si0hKLO2IbDQ%3D',16),(105,'New Task Created','A new task is created against RTX website and assigned to you.',0,1,'2025-04-23 07:38:50','/admin/edittask/U2FsdGVkX1%2BLXz8TqBWIK5VAvXXEoyOGDNt%2FIVoULHQ%3D',29),(106,'New Task Created','A new task is created against service and assigned to you.',0,1,'2025-04-23 07:39:48','/admin/edittask/U2FsdGVkX1%2Bt7S8UJ98MzTjY6nVyalXTbs5mmEZcTjM%3D',17),(107,'You have been assigned a dependent task','Dependancy : add next task for check for nikhil for Project: RTX website',0,1,'2025-04-23 09:27:20','/admin/edittask/U2FsdGVkX1%2FczXu%2FKCcVmO1UW6TlaqXzr338%2F1xDz9s%3D',29),(108,'New Task Created','A new task is created against RTX website and assigned to you.',0,0,'2025-04-23 09:27:20','/admin/edittask/U2FsdGVkX18vUF46BUlcNVj4oYH%2BdkLwI8kteDMgVko%3D',30),(109,'add next task for check for nikhil','Task is Updated by priyanka',0,0,'2025-04-23 11:04:11','/admin/edittask/U2FsdGVkX1%2BGxl1l9FzGzk51Yk4jv3bI8jSJVZLq07I%3D',29),(110,'Task Updated','Task is Updated by priyanka',0,1,'2025-04-23 11:04:11','/admin/edittask/U2FsdGVkX18xDQ1zfm1ERhZDl67aKWx4RnHzhdZz8DA%3D',16),(111,'add next task for check for nikhil','Task is Updated by priyanka',0,0,'2025-04-23 11:14:06','/admin/edittask/U2FsdGVkX19gm30GF%2FQ2z5BJKGB62l6vkX2DrlapUHo%3D',29),(112,'add next task for check for nikhil','Task is Updated by priyanka',0,0,'2025-04-23 11:19:06','/admin/edittask/U2FsdGVkX1%2FvRteGwh3t5yhqqweEzY0DPWr7uErQrVI%3D',29),(113,'You have been assigned a dependent task','Dependancy : \"addd new task check status\" for Project: RTX website',0,1,'2025-04-23 11:19:06','/admin/edittask/U2FsdGVkX19vT8axkdw1u7pKvM9VYR3pbRXf1%2BIFg%2BE%3D',17),(114,'Task Updated','Task is Updated by priyanka',0,0,'2025-04-23 11:19:07','/admin/edittask/U2FsdGVkX199VknPYQU6osYSjHjISCbbe7HheOhu%2Fi0%3D',16);
/*!40000 ALTER TABLE `employee_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employment_type`
--

DROP TABLE IF EXISTS `employment_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employment_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employment_type`
--

LOCK TABLES `employment_type` WRITE;
/*!40000 ALTER TABLE `employment_type` DISABLE KEYS */;
INSERT INTO `employment_type` VALUES (1,'Sr. Developer','2024-11-12 10:48:53',0),(2,'HR','2024-11-12 10:51:41',0),(3,'React Js Developer','2024-11-12 11:50:07',0),(4,'Sr. HR','2024-11-12 13:28:06',0),(5,'Tester','2024-11-20 12:04:34',0),(6,'Manager','2025-01-13 05:38:26',0),(7,'Team Lead','2025-01-13 05:38:26',0),(8,'Account Manager','2025-01-13 05:38:26',0),(9,'Project Manager','2025-04-15 06:14:28',0),(10,'business development executive','2025-04-15 07:16:55',0),(11,'manager','2025-04-15 07:28:39',0);
/*!40000 ALTER TABLE `employment_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `expense_cate_id` int DEFAULT NULL,
  `currency` varchar(50) DEFAULT NULL,
  `total` int DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (1,'sdfsdfsd',2,'INR',3000,'lorem','2024-10-15 07:46:23','2024-10-15 07:49:36',1),(2,'tdhfth dddddddd',1,'INR',5000,'lorem lorem','2024-10-15 07:49:52','2024-10-15 07:49:52',0),(3,'tdhfth ddddddd dddddddd',1,'INR',5000,'lorem lorem','2024-10-15 07:49:55','2024-10-15 07:49:55',0),(4,'Expense 4',3,'INR',14700,'desc','2024-11-20 12:45:16','2024-11-20 12:45:16',0);
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense_category`
--

DROP TABLE IF EXISTS `expense_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `is_enable` int DEFAULT '0',
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense_category`
--

LOCK TABLES `expense_category` WRITE;
/*!40000 ALTER TABLE `expense_category` DISABLE KEYS */;
INSERT INTO `expense_category` VALUES (1,'new2','ascs2','red',0,'2024-10-15 06:47:10','2024-10-15 06:50:26',1),(2,'new1','ascs','red',0,'2024-10-15 06:49:37','2024-10-15 06:49:37',0),(3,'new12','ascs2','red',0,'2024-10-15 06:49:41','2024-10-15 06:49:41',0),(4,'new1','ascs','red',0,'2024-12-10 09:18:13','2024-12-10 09:18:13',0);
/*!40000 ALTER TABLE `expense_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finance_setting`
--

DROP TABLE IF EXISTS `finance_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `finance_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_invoice_num` varchar(10) DEFAULT NULL,
  `last_quote_num` varchar(10) DEFAULT NULL,
  `last_payment_num` varchar(10) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finance_setting`
--

LOCK TABLES `finance_setting` WRITE;
/*!40000 ALTER TABLE `finance_setting` DISABLE KEYS */;
INSERT INTO `finance_setting` VALUES (1,'IN-11','QU-67','PY-28','2024-10-18 06:59:57','2024-10-18 06:59:57',0);
/*!40000 ALTER TABLE `finance_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow_up`
--

DROP TABLE IF EXISTS `follow_up`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_up` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follow_up_channel` varchar(255) DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `next_follow_up_date` date DEFAULT NULL,
  `lead_status` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  `leads_id` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `fk_leads_id` (`leads_id`),
  CONSTRAINT `fk_leads_id` FOREIGN KEY (`leads_id`) REFERENCES `leads` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_up`
--

LOCK TABLES `follow_up` WRITE;
/*!40000 ALTER TABLE `follow_up` DISABLE KEYS */;
INSERT INTO `follow_up` VALUES (1,'mail','2024-12-28','2024-12-28','warm','2024-12-28','2024-12-28 10:41:00',1,NULL,NULL),(2,'mail','2024-12-28','2024-12-28','warm','2024-12-28','2024-12-28 10:30:21',0,NULL,NULL),(3,'mail','2024-12-28','2024-12-28','Hot','2024-12-28','2025-01-01 06:25:16',1,1,NULL),(4,'mail','2024-12-28','2024-12-28','Hot','2024-12-28','2024-12-28 10:38:14',0,NULL,NULL),(5,'WhatsUp','2025-01-24','2024-12-28','Hot','2024-12-31','2025-01-01 09:29:23',0,3,NULL),(6,'Call','2025-01-16','2025-01-24','Cold','2025-01-01','2025-01-01 08:00:27',0,2,NULL),(7,'Call','2025-01-30','2025-01-31','Cold','2025-01-01','2025-01-01 08:02:03',0,2,NULL),(8,'Call','2025-01-30','2025-01-31','Hot','2025-01-01','2025-01-01 08:05:41',0,3,NULL),(9,'WhatsUp','2025-01-31','2025-01-31','Hot','2025-01-01','2025-01-01 09:06:55',0,3,NULL),(10,'WhatsUp','2025-01-31','2025-03-08','Dormant','2025-01-01','2025-01-01 09:33:52',0,2,NULL),(11,'WhatsUp','2025-01-24','2025-01-22','Dormant','2025-01-01','2025-01-01 10:20:37',0,5,NULL),(12,'WhatsUp','2025-01-24','2025-01-22','Dormant','2025-01-01','2025-01-01 10:21:31',0,5,NULL),(13,'WhatsUp','2025-01-24','2025-01-22','Dormant','2025-01-01','2025-01-01 10:24:08',0,5,NULL),(14,'Phone','2025-01-09','2025-01-22','Cold','2025-01-06','2025-01-06 08:00:13',0,6,NULL),(15,'Phone','2025-01-11','2025-01-22','Cold','2025-01-06','2025-01-06 07:40:15',0,6,NULL),(16,'Phone','2025-01-22','2025-01-22','Hot','2025-01-06','2025-01-06 07:41:52',0,6,NULL),(17,'Phone','2025-01-15','2025-01-22','Cold','2025-01-06','2025-01-06 07:42:48',0,6,NULL),(18,'SMS','2025-01-08','2025-01-22','Dormant','2025-01-06','2025-01-06 07:50:52',0,6,NULL),(19,'Phone','2025-01-13','2025-01-22','Cold','2025-01-11','2025-01-11 11:12:58',0,7,NULL),(20,'Call','2025-01-16','2025-01-22','Dormant','2025-01-11','2025-01-11 11:14:12',0,7,NULL),(21,'SMS','2025-01-23','2025-01-26','Hot','2025-01-23','2025-01-23 07:31:48',0,15,NULL),(22,'SMS','2025-01-23','2025-01-26','Hot','2025-01-23','2025-01-23 08:49:40',0,16,NULL),(23,'Call','2025-02-13','2025-02-14','Hot','2025-02-03','2025-02-03 10:33:09',0,12,'dumy 1'),(24,'Phone','2025-02-28','2025-03-01','Cold','2025-02-03','2025-02-03 10:32:52',0,12,'dumy'),(25,'Phone','2025-02-20','2025-02-08','Dormant','2025-02-03','2025-02-08 12:18:26',0,13,'dumy'),(26,'WhatsApp','2025-02-20','2025-02-28','Dormant','2025-02-03','2025-02-03 12:14:21',0,3,'dumy'),(27,'Phone','2025-02-06','2025-02-14','Hot','2025-02-06','2025-02-06 06:18:32',0,18,'call to next week'),(28,'Phone','2025-02-21','2025-02-08','Cold','2025-02-07','2025-02-07 06:36:45',0,13,'dumy'),(29,'Phone','2025-02-19','2025-02-08','Hot','2025-02-07','2025-02-08 12:19:23',0,13,'dumy'),(30,'SMS','2025-02-07','2025-02-22','Cold','2025-02-07','2025-02-07 06:40:47',0,13,'dumy'),(31,'Phone','2025-02-08','2025-02-22','Cold','2025-02-08','2025-02-08 12:16:49',0,13,'dumy'),(32,'Phone','2025-02-08','2025-02-22','Cold','2025-02-08','2025-02-08 12:18:03',0,13,'dumy');
/*!40000 ALTER TABLE `follow_up` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` varchar(20) DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `customer_id` int DEFAULT NULL,
  `lead_id` int DEFAULT NULL,
  `quotation_id` int DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT 'Unpaid',
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `customer_id` (`customer_id`),
  KEY `quotation_id` (`quotation_id`),
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `invoice_ibfk_3` FOREIGN KEY (`quotation_id`) REFERENCES `quotation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,'IN-1',17,'2025-01-15','2024-11-16 05:18:41',0,48,NULL,28,'Paid'),(2,'IN-2',17,'2025-01-15','2025-01-16 05:50:45',0,48,NULL,28,''),(3,'IN-3',17,'2025-01-15','2025-01-16 05:18:41',0,48,NULL,28,'Paid'),(4,'IN-4',17,'2025-01-15','2024-12-16 05:18:41',0,48,NULL,28,'Paid'),(5,'IN-5',NULL,'2025-01-16','2025-01-16 05:31:32',0,50,NULL,34,'Unpaid'),(6,'IN-6',16,'2025-01-20','2025-01-20 10:55:50',0,32,NULL,46,'Paid'),(7,'IN-7',17,'2025-02-07','2025-02-11 06:51:17',0,53,NULL,52,'Paid'),(8,'IN-8',17,'2025-02-10','2025-02-11 06:51:33',0,53,NULL,47,'Paid'),(9,'IN-9',17,'2025-02-11','2025-02-11 06:34:23',0,53,NULL,47,'Unpaid'),(10,'IN-10',17,'2025-02-11','2025-02-11 06:40:24',0,53,NULL,51,'Paid'),(11,'IN-11',17,'2025-02-11','2025-02-11 07:14:34',0,52,NULL,58,'Unpaid');
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_field`
--

DROP TABLE IF EXISTS `invoice_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `total` varchar(25) DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_field`
--

LOCK TABLES `invoice_field` WRITE;
/*!40000 ALTER TABLE `invoice_field` DISABLE KEYS */;
INSERT INTO `invoice_field` VALUES (23,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `invoice_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_product`
--

DROP TABLE IF EXISTS `invoice_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `subtotal` int DEFAULT NULL,
  `tax_id` int DEFAULT NULL,
  `tax_name` varchar(255) DEFAULT NULL,
  `tax_amount` int DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `invoice_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `invoice_id` (`invoice_id`),
  CONSTRAINT `invoice_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `invoice_product_ibfk_2` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_product`
--

LOCK TABLES `invoice_product` WRITE;
/*!40000 ALTER TABLE `invoice_product` DISABLE KEYS */;
INSERT INTO `invoice_product` VALUES (1,8,2000,10,2000,4,'GST1',40,2030,1,'2025-01-15 12:17:22',NULL,0,1),(2,8,2000,1,2000,3,'GST',40,2039,1,'2025-01-15 12:17:22',NULL,0,1),(3,8,2000,1,2000,3,'GST',40,2039,1,'2025-01-15 12:39:48',NULL,0,2),(4,8,2000,10,2000,4,'GST1',40,2030,1,'2025-01-15 12:39:48',NULL,0,2),(5,8,2000,1,2000,3,'GST',40,2039,1,'2025-01-15 12:41:57',NULL,0,3),(6,8,2000,1,2000,3,'GST',40,2039,1,'2025-01-15 12:41:57',NULL,0,3),(7,8,2000,1,2000,3,'GST',40,2039,1,'2025-01-15 12:41:57',NULL,0,3),(8,8,2000,10,2000,4,'GST1',40,2030,1,'2025-01-15 12:41:57',NULL,0,3),(9,8,2000,10,2000,4,'GST1',40,2030,1,'2025-01-15 13:01:00',NULL,0,4),(10,8,2000,1,2000,3,'GST',40,2039,1,'2025-01-15 13:01:00',NULL,0,4),(11,8,2000,50,4000,5,'GSTN',320,4320,2,'2025-01-16 05:31:32',NULL,0,5),(12,9,14999,0,59996,5,'GSTN',4800,64796,4,'2025-01-16 05:31:32',NULL,0,5),(13,9,14999,199,14999,5,'GSTN',1200,16000,1,'2025-01-20 09:53:46',NULL,0,6),(14,9,14999,1,14999,4,'GST1',300,15298,1,'2025-02-07 09:26:33',NULL,0,7),(15,9,14999,998,29998,5,'GSTN',2400,31400,2,'2025-02-10 09:12:41',NULL,0,8),(16,9,14999,998,29998,5,'GSTN',2400,31400,2,'2025-02-11 06:34:23',NULL,0,9),(17,8,2000,1,2000,4,'GST1',0,1999,1,'2025-02-11 06:39:53',NULL,0,10),(18,9,14999,1,14999,3,'GST',300,15298,1,'2025-02-11 07:14:34',NULL,0,11);
/*!40000 ALTER TABLE `invoice_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `assigen_to` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `lead_status` varchar(50) DEFAULT NULL,
  `source` varchar(50) DEFAULT NULL,
  `product` int DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `is_converted` int DEFAULT '0',
  `notes` varchar(500) DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `budget` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_on` date DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_approve` varchar(50) DEFAULT 'Pending',
  PRIMARY KEY (`id`),
  KEY `fk_assigen` (`assigen_to`),
  CONSTRAINT `fk_assigen` FOREIGN KEY (`assigen_to`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leads`
--

LOCK TABLES `leads` WRITE;
/*!40000 ALTER TABLE `leads` DISABLE KEYS */;
INSERT INTO `leads` VALUES (1,'suraj','7687867876',17,'suraj123@mailinator.com',NULL,'Warm','email',8,'india',1,'dumy text','2024-12-27','20000','123122','pune','8768768768','Developer','marwor','maharashtra','pune',1,'2024-12-28','2025-02-06 12:54:53',NULL),(2,'priyanka','8787678769',17,'priyanka123@mailinator.com',NULL,'Cold','Website',8,'India',1,'dumy text','2025-03-08','10,0000-150,000','411037','pune','Email','developer','marworx','Assam','Baksa',1,'2024-12-30','2025-01-06 10:54:12',NULL),(3,'priyanka','8787678769',17,'priyanka123@mailinator.com',NULL,'Dormant','Social Media',8,'India',0,'dumy text','2025-02-28','10,0000-150,000','411037','pune','Email','developer','marworx','Assam','Baksa',0,'2024-12-30','2025-02-03 12:14:21',NULL),(4,'sadsads','8767876787',17,'adsadsad@gmail.com',NULL,'Cold','Website',8,'Afghanistan',1,'','2025-01-31','50,000-10,0000','457895',' ABC','Phone','developer','marworx','Badakhshan','Ashk─üsham',0,'2025-01-01','2025-01-16 05:29:53',NULL),(5,'asdfgh','2345675678',17,'sadf@gmail.com',NULL,'Dormant','Advertising',8,'Afghanistan',1,'','2025-01-31','','4578963','ABC','Email','yyyyyyyyyyyyyrtrtyr','edfg','Badghis','Ghormach',0,'2025-01-01','2025-01-14 05:57:51','Approved'),(6,'mansi','1232342343',17,'mansi@mailinator.com',NULL,'Cold','Linkedin',8,'India',1,'Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered','2025-01-09','50,000-10,0000','411031','pune','Email','management','marworx','Maharashtra','Shivaji Nagar',0,'2025-01-06','2025-01-08 12:35:33','Rejected'),(7,'Srivalli Punde','1122334456',19,'srivalii@gmail.com',NULL,'Dormant','Linkedin',NULL,'Albania',1,'','2025-01-18','50,000-10,0000','124578','Street 242, Block A','Phone','Manager','Punde Information Technologies','Berat District','Bashkia Berat',0,'2025-01-11','2025-01-14 05:13:56','Pending'),(12,'yogesh','0987654321',17,'yogesh@mailinator.com',NULL,'Hot','Social Media',NULL,'',1,'','2025-02-14','','','','','','','','',0,'2025-01-18','2025-02-05 09:57:37','Pending'),(13,'nikhil','0987654321',24,'nik@mailinator.com',NULL,'Hot','Social Media',NULL,'',0,'','2025-02-08','','','','','','','','',0,'2025-01-18','2025-02-08 12:19:23','Pending'),(14,'Harshal','8765432190',17,'harshal@mailinator.com',NULL,'Hot','Social Media',NULL,'',1,'','2025-01-10','','','','','','','','',0,'2025-01-18','2025-01-20 09:48:56','Pending'),(15,'Nikhil Mandar','7897678972',17,'nik12@mailinator.com',NULL,'Hot','Website',NULL,'',1,'','2025-01-26','','','','','','','','',0,'2025-01-23','2025-02-10 05:41:00',NULL),(16,'Nikhil Mandar','7658796432',17,'nikhil@mailinator.com',NULL,'Hot','Social Media',NULL,'Afghanistan',1,'','2025-01-26','','987654','Street 242, Block A','Email','Manager','','Badakhshan','Ashkāsham',0,'2025-01-23','2025-02-05 09:11:01','Pending'),(17,'Yogesh ','9898989898',17,'yogesh22@mailinator.com',NULL,'Cold','Website',NULL,'',1,'','2025-01-18','50,000-10,0000','','','Phone','Manager','Punde Information Technologies','','',0,'2025-01-30','2025-01-31 05:29:19','Pending'),(18,'sidhhi','6546789876',17,'siddhi@mailinator.com',NULL,'Hot','Website',NULL,'',1,'','2025-02-14','','','','','','','','',0,'2025-02-06','2025-02-06 06:33:44','Pending'),(19,'mr .ronald','2345678765',30,'ronald@mailinator.com',NULL,'Dormant','Linkedin',NULL,'',1,'','2025-04-17','','','','','','','','',0,'2025-04-21','2025-04-21 10:34:00','Pending'),(20,'jon','2345678764',30,'jon@mailinator.com',NULL,'Cold','Linkedin',NULL,'',1,'','2025-04-25','','','','','','','','',0,'2025-04-21','2025-04-21 10:45:47','Pending');
/*!40000 ALTER TABLE `leads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `leave_type_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `description` text,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `leave_status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `total_leaves` int DEFAULT '22',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

LOCK TABLES `leaves` WRITE;
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
INSERT INTO `leaves` VALUES (1,3,17,'casual leave for vacation ','2024-11-13','2024-11-21',1,'2024-11-13 10:41:03',0,22),(2,2,17,'i have to take casual leave for family emgency ','2024-11-13','2024-11-20',1,'2024-11-13 10:44:13',0,22),(3,3,1,'casual leave for vacation ','2024-11-13','2024-11-21',2,'2024-11-13 11:00:55',0,22),(4,1,NULL,'sick leave','2024-11-06','2024-11-21',0,'2024-11-16 06:35:08',0,22),(5,1,5,'sick leave','2024-11-15','2024-11-17',0,'2024-11-16 06:40:13',0,22),(6,2,17,'Home Visit after 10 years','2024-11-20','2024-11-30',1,'2024-11-20 13:08:35',0,22),(7,2,14,'good','2025-01-19','2025-01-30',0,'2025-01-03 12:35:29',0,22),(8,1,17,'Sick','2025-01-18','2025-01-17',1,'2025-01-10 10:26:57',0,22),(9,2,17,'','2025-01-25','2025-01-25',0,'2025-01-10 10:29:50',0,22),(10,1,19,'Sick leave','2025-01-14','2025-01-15',0,'2025-01-11 11:09:30',0,22),(11,1,24,NULL,'2025-01-14','2025-01-14',2,'2025-01-13 10:40:15',0,22),(12,1,24,NULL,'2025-01-14','2025-01-14',1,'2025-01-13 10:40:15',0,22),(13,1,24,NULL,'2025-01-14','2025-01-14',1,'2025-01-13 10:40:15',0,22),(14,1,24,NULL,'2025-01-14','2025-01-14',1,'2025-01-13 10:40:15',0,22),(15,1,19,NULL,'2025-01-14','2025-01-14',1,'2025-01-13 10:40:15',0,22),(16,1,19,NULL,'2025-01-14','2025-01-14',1,'2025-01-13 10:40:15',0,22),(17,1,19,NULL,'2025-01-14','2025-01-14',1,'2025-01-13 10:40:15',0,22),(18,2,17,'Casual','2025-01-15','2025-01-15',0,'2025-01-13 11:19:39',0,22),(19,2,17,'','2025-01-01','2025-01-01',3,'2025-01-13 11:20:55',0,22),(20,2,18,'i am going to wet n joy','2025-02-13','2025-02-13',1,'2025-02-06 07:22:10',0,22);
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leavetype`
--

DROP TABLE IF EXISTS `leavetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leavetype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `leaves` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leavetype`
--

LOCK TABLES `leavetype` WRITE;
/*!40000 ALTER TABLE `leavetype` DISABLE KEYS */;
INSERT INTO `leavetype` VALUES (1,'Sick Leaves','2024-11-13 07:23:39',0),(2,'Casual Leave','2024-11-13 10:27:11',0),(3,'Holi Leave','2024-11-13 10:31:17',1);
/*!40000 ALTER TABLE `leavetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mailestones`
--

DROP TABLE IF EXISTS `mailestones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mailestones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `due_date` date DEFAULT NULL,
  `deliverables` text,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `mailestones_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mailestones`
--

LOCK TABLES `mailestones` WRITE;
/*!40000 ALTER TABLE `mailestones` DISABLE KEYS */;
INSERT INTO `mailestones` VALUES (1,1,'admin_page, blog page','create admin page','2002-02-02','dumy text and optional text ',0,'2024-12-11 11:53:10','2024-12-11 11:56:03'),(2,1,'admin_page, blog page','create admin page','2002-02-02','dumy text and optional text ',0,'2024-12-11 11:54:33','2024-12-11 11:54:33'),(3,12,NULL,'Description for item 1',NULL,NULL,0,'2025-01-02 12:52:48','2025-01-02 12:52:48'),(4,12,NULL,'Description for item 2',NULL,NULL,0,'2025-01-02 12:52:48','2025-01-02 12:52:48'),(5,13,NULL,'Description for item 1',NULL,NULL,0,'2025-01-02 12:54:01','2025-01-02 12:54:01'),(6,13,NULL,'Description for item 2',NULL,NULL,0,'2025-01-02 12:54:01','2025-01-02 12:54:01'),(7,16,'Item 1','Description for item 1','2002-02-02','500',0,'2025-01-03 05:41:05','2025-01-03 05:41:05'),(8,16,'Item 2','Description for item 2','2002-02-02','100',0,'2025-01-03 05:41:05','2025-01-03 05:41:05'),(9,18,'delicer','htygrtfer','2025-01-16',NULL,0,'2025-01-10 07:24:30','2025-01-10 13:23:38'),(10,19,'delicer','htygrtfer','2025-01-16',NULL,0,'2025-01-10 07:26:43','2025-01-11 11:22:33'),(11,20,'dymy text','Delivery on pune','2025-01-25','text',0,'2025-01-17 12:23:56','2025-02-10 11:21:53');
/*!40000 ALTER TABLE `mailestones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_id` varchar(50) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `payment_mode` int DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  `lead_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (13,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL),(14,NULL,2000,4,'dumy text','2025-01-08 12:35:33','2025-01-08 12:43:45',1,6,17),(15,NULL,2000,4,'dumy text','2025-01-08 12:36:21','2025-01-08 12:36:21',0,6,17),(16,'PY-16',2000,4,'dumy text','2025-01-08 12:41:34','2025-01-08 12:41:34',0,6,17),(17,'PY-17',2000,4,'dumy text','2025-01-09 13:06:16','2025-01-09 13:06:16',0,3,17),(18,'PY-18',2000,4,'dumy text','2025-01-09 13:06:59','2025-01-09 13:06:59',0,3,17),(19,'PY-19',2000,4,'dumy text','2025-01-09 13:10:06','2025-01-09 13:10:06',0,3,17),(20,'PY-20',2000,4,'dumy text','2025-01-09 13:11:02','2025-01-09 13:11:02',0,3,17),(21,'PY-21',2000,4,'dumy text','2025-01-09 13:14:55','2025-01-09 13:14:55',0,3,17),(22,'PY-22',2000,4,'dumy text','2025-01-09 13:15:23','2025-01-09 13:15:23',0,3,17),(23,'PY-23',2000,4,'dumy text','2025-01-09 13:23:42','2025-01-09 13:23:42',0,3,17),(24,'PY-24',2000,4,'dumy text','2025-01-09 13:24:02','2025-01-09 13:24:02',0,3,17),(25,'PY-25',2000,4,'dumy text','2025-01-09 13:24:47','2025-01-09 13:24:47',0,3,17),(26,'PY-26',2000,4,'dumy text','2025-01-09 13:26:12','2025-01-09 13:26:12',0,3,17),(27,'PY-27',2000,4,'dumy text','2025-01-09 13:26:49','2025-01-09 13:26:49',0,3,17),(28,'PY-28',78,4,'dumy text','2025-01-09 13:27:17','2025-01-09 13:27:17',0,3,17);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_mode`
--

DROP TABLE IF EXISTS `payment_mode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_mode` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_mode` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `is_enable` int DEFAULT '0',
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_mode`
--

LOCK TABLES `payment_mode` WRITE;
/*!40000 ALTER TABLE `payment_mode` DISABLE KEYS */;
INSERT INTO `payment_mode` VALUES (1,'cash on delivery','lorem',0,'2024-10-14 09:33:12','2024-10-14 09:39:24',1),(2,'cash1','lorem1',0,'2024-10-14 09:43:56','2024-10-23 13:57:28',1),(3,'card','lorem',0,'2024-10-14 09:44:06','2024-10-23 13:57:35',1),(4,'upi','its good way..... sedssdasd',1,'2024-10-23 13:44:58','2024-12-06 07:27:47',0),(5,'rozer ','pay is not good way....',0,'2024-10-23 13:45:53','2024-10-23 13:57:46',1),(6,'paytm','paytm',0,'2024-11-08 14:28:47','2024-11-28 10:22:39',0);
/*!40000 ALTER TABLE `payment_mode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pdf_setting`
--

DROP TABLE IF EXISTS `pdf_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pdf_setting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_pdf` text,
  `quote_pdf` text,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pdf_setting`
--

LOCK TABLES `pdf_setting` WRITE;
/*!40000 ALTER TABLE `pdf_setting` DISABLE KEYS */;
INSERT INTO `pdf_setting` VALUES (3,'In publishing and graphic design. lorem','In publishing and graphic design.lorem',0,'2024-10-22 12:26:22','2024-10-22 12:32:32');
/*!40000 ALTER TABLE `pdf_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `id` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(255) DEFAULT NULL,
  `l_name` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `created_On` timestamp NULL DEFAULT NULL,
  `updated_On` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=510 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procurement`
--

DROP TABLE IF EXISTS `procurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procurement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `priority` varchar(20) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `vendor_name` int DEFAULT NULL,
  `vendor_contact_person` varchar(255) DEFAULT NULL,
  `vendor_email` varchar(50) DEFAULT NULL,
  `vendor_phone_number` varchar(50) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` int DEFAULT NULL,
  `total_cost` int DEFAULT NULL,
  `estimated_budget` int DEFAULT NULL,
  `payment_terms` varchar(255) DEFAULT NULL,
  `payment_method` int DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  `expected_delivery_date` date DEFAULT NULL,
  `delivery_location` varchar(50) DEFAULT NULL,
  `quotation` text,
  `upload_supporting_documents` text,
  `approver_name` int DEFAULT NULL,
  `approval_status` varchar(50) DEFAULT NULL,
  `notes` text,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `service_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procurement`
--

LOCK TABLES `procurement` WRITE;
/*!40000 ALTER TABLE `procurement` DISABLE KEYS */;
INSERT INTO `procurement` VALUES (1,'mansi naik','Raw Materials','High','dumy text',1,'shree','shree@mailinator.com','87678787876',8,3,2000,6000,30000,'Upon Delivery',3,'2024-12-30','2024-01-30','pune','Priyanka_08_2024.pdf','1733132121292.pdf',14,'Pending','dumy text',0,'2025-01-03 07:20:40','2025-01-03 07:20:40',NULL),(2,'Graphics Cards','IT Equipment','Medium','Diamonds',NULL,NULL,NULL,NULL,8,5,15000,75000,75000,'Upon Delivery',6,'2025-01-23','2025-01-23','pune',NULL,NULL,17,'Approved','Notes',0,'2025-01-11 10:54:29','2025-01-11 11:03:27',NULL),(3,'priyanka','IT Equipment','Medium','dumy text',NULL,NULL,NULL,NULL,9,2,200,400,2000,'Upon Delivery',4,'2025-01-17','2025-01-18','pune',NULL,NULL,NULL,NULL,NULL,0,'2025-01-16 06:54:00','2025-01-16 06:54:00',NULL),(4,'RAM','Raw Materials','Medium','dumy',NULL,NULL,NULL,NULL,8,2,200,400,2000,'Upon Delivery',4,NULL,'2025-02-17','pune',NULL,NULL,NULL,NULL,NULL,0,'2025-02-03 06:09:15','2025-02-03 06:42:17',NULL),(5,'video ','IT Equipment','Low','dumy',NULL,NULL,NULL,NULL,10,0,NULL,NULL,2000,'Upon Delivery',6,NULL,'2025-02-22','pune',NULL,NULL,NULL,NULL,NULL,0,'2025-02-03 07:48:23','2025-02-03 07:48:23',NULL),(6,'farma','IT Equipment','Low','dumy',NULL,NULL,NULL,NULL,9,2,NULL,NULL,1,'Upon Delivery',6,NULL,'2025-02-21','pune',NULL,NULL,NULL,NULL,NULL,0,'2025-02-03 07:55:17','2025-02-03 09:12:26',11),(7,'video editor','Services','Medium','dumy',NULL,NULL,NULL,NULL,9,1,NULL,NULL,1,'Upon Delivery',6,NULL,'2025-02-21','pune',NULL,NULL,NULL,NULL,NULL,0,'2025-02-03 08:02:10','2025-02-03 08:02:10',11),(8,'Metals','Raw Materials','Medium','some raw material names categorized by different manufacturing industries',NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-21',NULL,NULL,NULL,NULL,NULL,NULL,0,'2025-02-13 06:18:09','2025-02-13 06:18:09',11);
/*!40000 ALTER TABLE `procurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) DEFAULT NULL,
  `product_category_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `sku_unit` varchar(50) DEFAULT NULL,
  `inventory_status` varchar(50) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `reorder_level` int DEFAULT NULL,
  `service_duration` int DEFAULT NULL,
  `service_coverage_area` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `tax_id` int DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `vendor_id` int DEFAULT NULL,
  `vendor_contact` varchar(100) DEFAULT NULL,
  `description` text,
  `tag` varchar(100) DEFAULT NULL,
  `warranty` varchar(10) DEFAULT NULL,
  `image` text,
  `speci_sheet` text,
  `user_manual_doc` text,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_category_id` (`product_category_id`),
  KEY `product_ibfk_2` (`customer_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`id`),
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (8,'website',13,NULL,'product',' TSH-000-S','In Stock',2,2,20,'pune',2000,1,20,NULL,'898787676','lorem dumy text','software','2',NULL,NULL,NULL,0,'2024-12-30 07:14:22','2024-12-30 07:14:22'),(9,'RTX 4090',14,48,'Product','SKI6547','In Stock',50,10,0,'',14999,NULL,NULL,NULL,NULL,'14999','','',NULL,NULL,'',0,'2025-01-11 11:16:41','2025-01-11 11:17:13'),(10,'marworx ',15,32,'Product','1234@3$5##','Out of Stock',2,1,0,'',NULL,NULL,NULL,NULL,NULL,'2000','1 year','dumy','document (18).pdf','Quotation (5).pdf','software, cloud-based',0,'2025-02-03 05:31:20','2025-02-03 05:31:20'),(11,'marworx service',15,33,'Service','','',0,0,10,'pune,',200,NULL,NULL,NULL,NULL,'20000','10','dumy','produrment.txt','document (18).pdf','softwear',0,'2025-02-03 05:33:56','2025-02-10 06:26:36');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `is_enable` int DEFAULT '0',
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (12,NULL,NULL,NULL,0,NULL,NULL,0),(13,'Hard disk','lorem','#fff',0,'2024-12-30 07:13:30','2024-12-30 07:13:30',0),(14,'Hard disk','lorem','#fff',0,'2024-12-30 07:13:32','2024-12-30 07:13:32',0),(15,'softwear','good product','#FBCEB1',0,'2025-01-06 06:19:51','2025-01-06 06:19:51',0),(16,'Custom Parts Fabrication','Custom Parts Fabrication','#E9D66B',0,'2025-02-13 05:35:28','2025-02-13 05:35:28',0);
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `service_id` int DEFAULT NULL,
  `project_name` varchar(50) DEFAULT NULL,
  `project_category` int DEFAULT NULL,
  `description` text,
  `priority_level` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `expected_completion_date` date DEFAULT NULL,
  `budget_allc` int DEFAULT NULL,
  `budget_utili` int DEFAULT NULL,
  `porject_status` varchar(50) DEFAULT NULL,
  `progress` int DEFAULT NULL,
  `approval_status` varchar(50) DEFAULT 'Pending',
  `notes` text,
  `project_plan` text,
  `support_doc` text,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `customer_id` (`customer_id`),
  KEY `project_category` (`project_category`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `project_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `project_ibfk_3` FOREIGN KEY (`project_category`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (18,NULL,NULL,'Project 1',13,'Project 1','Medium','2025-01-10','2025-01-16','2025-01-23',450000,350000,'Cancelled',0,'Approved','done','tasks.sql','tasks.sql',0,'2024-12-10 07:24:30','2025-01-10 13:23:38',NULL),(19,NULL,NULL,'Project 2',NULL,'Project 1]2','Medium','2025-01-07','2025-01-21','2025-02-04',45898,35624,'Completed',0,'Pending','done',NULL,NULL,0,'2025-01-10 07:26:42','2025-01-11 11:22:33',NULL),(20,9,NULL,'hard disk',14,'dumy text','Low','2025-01-21','2025-01-23','2025-01-22',2000,200,'Delayed',-2,'Approved','good','Quotation (3).pdf','Untitled-2.html',0,'2025-01-17 12:23:55','2025-02-10 11:21:53',53),(21,8,NULL,'title',13,'dwadwwdaw','Medium','2025-01-13','2025-01-20','2025-01-19',45222,45222,'Not Started',0,'Pending','null','CRM Rquirement (1).docx','CRM Rquirement (1).docx',0,'2025-01-21 10:20:26','2025-01-29 05:21:10',49),(22,8,NULL,'title 3',13,'aaw dawd ','Low','2025-01-08','2025-01-13','2025-01-14',4522,3566,'In Progress',0,'Pending','null','CRM Rquirement (3).docx','CRM Rquirement (1).docx',0,'2025-01-21 10:28:06','2025-01-30 05:32:42',32),(23,8,11,'Project  service5',13,'Project 202','Medium','2025-01-04','2025-01-15','2025-01-22',90,87,'In Progress',0,'Pending',NULL,'company_logoc1.png','company_logoc1.png',0,'2025-01-30 05:38:18','2025-02-11 12:49:29',32),(24,9,NULL,'create  rtx ',14,'dumy','Medium','2025-02-21','2025-02-21','2025-02-22',1,1,'In Progress',1,NULL,NULL,'document (18).pdf','CRM Rquirement (3).docx',0,'2025-02-03 09:45:22','2025-02-03 09:45:22',52),(25,9,11,'service',14,'dumy','Medium','2025-02-12','2025-02-19','2025-02-19',2,2,'Completed',0,NULL,NULL,'Cipla Phlebotomist Web App (1).pdf','document (18).pdf',0,'2025-02-03 09:46:54','2025-02-11 06:56:47',52),(26,9,NULL,'RTX website',15,'dumy','Low','2025-02-14','2025-02-28','2025-02-26',300,200,'In Progress',10,NULL,NULL,'document (18).pdf','Cipla Phlebotomist Web App (1).pdf',0,'2025-02-06 06:41:36','2025-02-06 06:41:36',55),(27,NULL,11,'service',14,'dumy','Low','2025-02-20','2025-02-27','2025-02-21',1,1,'Delayed',0,NULL,NULL,'roboto-mono-v13-latin-500.woff2','fontawesome.woff2',0,'2025-02-11 11:41:21','2025-04-21 10:34:42',56),(28,8,11,'rtx',15,'dumy','Medium','2025-02-25','2025-02-26','2025-02-26',1,1,'Completed',0,NULL,NULL,'roboto-mono-v13-latin-500.woff2','fontawesome.woff2',0,'2025-02-11 12:52:23','2025-04-22 12:59:01',57);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation`
--

DROP TABLE IF EXISTS `quotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quotation_id` varchar(20) DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `lead_id` int DEFAULT NULL,
  `is_approve` varchar(30) DEFAULT NULL,
  `total` int DEFAULT NULL,
  `remaing_payment` int DEFAULT NULL,
  `is_payment` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `fk_lead_id` (`lead_id`),
  CONSTRAINT `fk_lead_id` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`),
  CONSTRAINT `quotation_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation`
--

LOCK TABLES `quotation` WRITE;
/*!40000 ALTER TABLE `quotation` DISABLE KEYS */;
INSERT INTO `quotation` VALUES (27,'QU-27',17,'2024-11-08','2025-01-14 06:52:14',0,4,NULL,15000,0,'Paid'),(28,'QU-28',17,'2024-12-08','2025-01-14 06:52:32',0,7,NULL,35999,0,'Paid'),(29,'QU-29',17,'2025-01-09','2025-01-14 06:52:28',0,6,'Approved',1999,0,'Paid'),(31,'QU-31',17,'2025-01-14','2025-01-14 09:12:22',0,4,NULL,64316,NULL,NULL),(32,'QU-32',17,'2025-01-14','2025-01-14 09:13:38',0,4,NULL,64316,NULL,NULL),(33,'QU-33',17,'2025-01-14','2025-01-14 09:14:19',0,4,NULL,64316,NULL,NULL),(34,'QU-34',17,'2025-01-14','2025-01-14 12:55:49',0,4,NULL,69116,NULL,NULL),(35,'QU-35',17,'2025-01-14','2025-01-14 09:25:27',0,4,NULL,60696,NULL,NULL),(36,'QU-36',17,'2025-01-14','2025-01-14 12:50:05',0,3,NULL,63136,NULL,NULL),(37,'QU-37',19,'2025-01-16','2025-01-16 05:27:31',0,7,NULL,9790,NULL,NULL),(38,'QU-38',17,'2025-01-17','2025-01-17 12:52:45',0,3,NULL,15288,NULL,NULL),(39,'QU-39',17,'2025-01-17','2025-01-17 12:56:44',0,3,NULL,2040,NULL,NULL),(40,'QU-40',17,'2025-01-17','2025-01-17 12:58:34',0,3,NULL,4078,NULL,NULL),(41,'QU-41',17,'2025-01-17','2025-01-17 13:03:20',0,3,NULL,4078,NULL,NULL),(42,'QU-42',17,'2025-01-17','2025-01-17 13:05:12',0,3,NULL,2039,NULL,NULL),(43,'QU-43',17,'2025-01-17','2025-01-17 13:16:05',0,3,NULL,30600,NULL,NULL),(44,'QU-44',17,'2025-01-17','2025-01-17 13:21:15',0,3,NULL,4080,NULL,NULL),(45,'QU-45',17,'2025-01-17','2025-01-17 13:28:43',0,3,'Approved',4080,NULL,NULL),(46,'QU-46',17,'2025-01-20','2025-01-20 09:53:11',0,14,NULL,16000,NULL,NULL),(47,'QU-47',17,'2025-01-23','2025-02-10 09:36:53',0,16,'Approved',32940,NULL,NULL),(48,'QU-48',17,'2025-01-23','2025-02-10 09:40:50',0,16,'Approved',0,NULL,NULL),(49,'QU-49',19,'2025-01-25','2025-01-25 06:16:06',0,7,NULL,15199,NULL,NULL),(50,'QU-50',17,'2025-01-31','2025-02-10 09:52:58',0,16,'Approved',14997,NULL,NULL),(51,'QU-51',17,'2025-01-31','2025-02-10 09:49:49',0,16,'Approved',1999,NULL,NULL),(52,'QU-52',17,'2025-01-31','2025-01-31 09:31:20',0,16,'Approved',15298,NULL,NULL),(53,'QU-53',17,'2025-02-05','2025-02-05 10:06:50',0,12,'Approved',14999,NULL,NULL),(54,'QU-54',17,'2025-02-06','2025-02-06 06:27:46',0,18,'Approved',17038,NULL,NULL),(55,'QU-55',24,'2025-02-07','2025-02-07 09:18:19',0,13,NULL,15297,NULL,NULL),(56,'QU-56',24,'2025-02-07','2025-02-07 09:20:11',0,13,NULL,15298,NULL,NULL),(57,'QU-57',24,'2025-02-07','2025-02-07 09:23:48',0,13,NULL,15298,NULL,NULL),(58,'QU-58',17,'2025-02-08','2025-02-10 05:41:00',0,15,NULL,15298,NULL,NULL),(59,'QU-59',17,'2025-02-10','2025-02-10 10:58:30',0,16,'Approved',215,NULL,NULL),(60,'QU-60',17,'2025-02-10','2025-02-10 11:01:19',0,16,'Approved',203,NULL,NULL),(61,'QU-61',17,'2025-02-10','2025-02-10 10:06:11',0,16,NULL,203,NULL,NULL),(62,'QU-62',17,'2025-02-10','2025-02-10 11:21:07',0,16,'Approved',15298,NULL,NULL),(63,'QU-63',17,'2025-02-10','2025-02-10 10:28:20',0,16,NULL,15298,NULL,NULL),(64,'QU-64',17,'2025-02-10','2025-02-10 10:35:31',0,16,NULL,2039,NULL,NULL),(65,'QU-65',17,'2025-02-10','2025-02-10 10:42:55',0,16,NULL,15298,NULL,NULL),(66,'QU-66',17,'2025-02-10','2025-02-10 10:46:26',0,16,NULL,15298,NULL,NULL),(67,'QU-67',17,'2025-02-10','2025-02-10 10:54:52',0,16,'Approved',15298,NULL,NULL);
/*!40000 ALTER TABLE `quotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation_product`
--

DROP TABLE IF EXISTS `quotation_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `subtotal` int DEFAULT NULL,
  `tax_id` int DEFAULT NULL,
  `tax_name` varchar(255) DEFAULT NULL,
  `tax_amount` int DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `leads_id` int DEFAULT NULL,
  `quotation_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `quotation_id` (`quotation_id`),
  CONSTRAINT `quotation_product_ibfk_1` FOREIGN KEY (`quotation_id`) REFERENCES `quotation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation_product`
--

LOCK TABLES `quotation_product` WRITE;
/*!40000 ALTER TABLE `quotation_product` DISABLE KEYS */;
INSERT INTO `quotation_product` VALUES (1,8,2000,10,3000,2,'GST',20000,200000,3,'2025-01-07','2025-01-14 06:32:05',1,7,NULL),(2,8,2000,18,3000,2,'GST',20000,200000,4,'2025-01-07','2025-01-14 06:32:05',0,7,NULL),(3,8,2000,10,2000,4,'GST1',40,2030,1,'2025-01-08','2025-01-27 09:11:23',1,7,28),(4,8,2000,1,2000,3,'GST',40,2039,1,'2025-01-08','2025-01-14 07:14:20',0,NULL,28),(5,8,2000,1,2000,3,'GST',40,2039,1,'2025-01-08','2025-01-14 07:14:20',0,NULL,28),(6,8,2000,1,2000,3,'GST',40,2039,1,'2025-01-08','2025-01-14 07:14:20',0,6,28),(7,8,2000,1,2000,4,'GST1',40,2039,1,'2025-01-09','2025-01-09 10:23:27',0,3,NULL),(8,8,2000,1,2000,3,'GST',40,2039,1,'2025-01-09','2025-01-09 10:24:56',0,3,NULL),(9,9,14999,100,29998,4,'GST1',600,30498,2,'2025-01-14','2025-01-14 07:32:30',1,4,NULL),(10,8,2000,49,8000,4,'GST1',160,8111,4,'2025-01-14','2025-01-14 07:32:34',1,4,NULL),(11,8,2000,50,4000,5,'GSTN',320,4320,2,'2025-01-14','2025-01-14 09:13:38',0,NULL,32),(12,8,2000,50,4000,5,'GSTN',320,4320,2,'2025-01-14','2025-01-14 09:14:19',0,NULL,33),(13,9,14999,0,59996,5,'GSTN',4800,64796,4,'2025-01-14','2025-01-14 12:28:04',0,NULL,34),(14,8,2000,50,4000,5,'GSTN',320,4320,2,'2025-01-14','2025-01-14 09:14:56',0,NULL,34),(15,9,14999,500,59996,4,'GST1',1200,60696,4,'2025-01-14','2025-01-14 09:25:27',0,NULL,35),(16,9,14999,149,14999,3,'GST',300,15150,1,'2025-01-14','2025-01-14 12:21:04',0,NULL,NULL),(17,9,14999,100,14999,5,'GSTN',1200,16099,1,'2025-01-14','2025-01-14 12:21:49',0,NULL,NULL),(18,8,2000,0,2000,5,'GSTN',160,2160,1,'2025-01-14','2025-01-14 12:29:32',1,NULL,34),(19,8,2000,0,4000,3,'GST',80,4080,2,'2025-01-14','2025-01-14 12:28:45',1,NULL,34),(20,9,14999,100,59996,4,'GST1',1200,61096,4,'2025-01-14','2025-01-14 12:47:37',0,NULL,36),(21,8,2000,0,2000,4,'GST1',40,2040,1,'2025-01-14','2025-01-14 12:49:32',0,NULL,36),(22,8,2000,10,2000,5,'GSTN',160,2150,1,'2025-01-16','2025-01-16 05:27:31',0,NULL,37),(23,8,2000,1000,8000,5,'GSTN',640,7640,4,'2025-01-16','2025-01-16 05:27:31',0,NULL,37),(24,9,14999,11,14999,4,'GST1',300,15288,1,'2025-01-17','2025-01-17 12:52:45',0,NULL,38),(25,8,2000,0,2000,4,'GST1',40,2040,1,'2025-01-17','2025-01-17 12:56:44',0,NULL,39),(26,8,2000,2,4000,4,'GST1',80,4078,2,'2025-01-17','2025-01-17 12:58:34',0,NULL,40),(27,8,2000,2,4000,4,'GST1',80,4078,2,'2025-01-17','2025-01-17 13:03:20',0,NULL,41),(28,8,2000,1,2000,4,'GST1',40,2039,1,'2025-01-17','2025-01-17 13:05:12',0,NULL,42),(29,9,14999,-2,29998,4,'GST1',600,30600,2,'2025-01-17','2025-01-17 13:16:05',0,NULL,43),(30,8,2000,0,4000,4,'GST1',80,4080,2,'2025-01-17','2025-01-17 13:21:15',0,NULL,44),(31,8,2000,0,4000,4,'GST1',80,4080,2,'2025-01-17','2025-01-17 13:28:17',0,NULL,45),(32,9,14999,199,14999,5,'GSTN',1200,16000,1,'2025-01-20','2025-01-20 09:53:11',0,NULL,46),(33,8,2000,500,2000,4,'GST1',40,1540,1,'2025-01-23','2025-01-23 12:32:33',0,NULL,47),(34,9,14999,998,29998,5,'GSTN',2400,31400,2,'2025-01-23','2025-01-23 12:32:33',0,NULL,47),(35,9,14999,1000,14999,5,'GSTN',1200,15199,1,'2025-01-25','2025-01-25 06:16:06',0,NULL,49),(36,9,14999,0,14999,5,'GSTN',1200,16199,1,'2025-01-27','2025-01-27 09:11:17',0,NULL,28),(37,8,2000,1,2000,4,'GST1',0,1999,1,'2025-01-31','2025-01-31 07:37:40',0,NULL,51),(38,9,14999,1,14999,4,'GST1',300,15298,1,'2025-01-31','2025-01-31 08:54:21',0,NULL,52),(39,9,14999,1,14999,5,'GSTN',1,14999,1,'2025-02-05','2025-02-05 10:04:51',0,NULL,53),(40,9,14999,1,14999,4,'GST1',1,14999,1,'2025-02-06','2025-02-06 06:26:49',0,NULL,54),(41,8,2000,1,2000,4,'GST1',40,2039,1,'2025-02-06','2025-02-06 06:26:49',0,NULL,54),(42,9,14999,1,14999,3,'GST',300,15298,1,'2025-02-07','2025-02-07 09:23:48',0,NULL,57),(43,9,14999,1,14999,3,'GST',300,15298,1,'2025-02-08','2025-02-08 10:21:56',0,NULL,58),(44,11,200,1,200,5,'GSTN',16,215,1,'2025-02-10','2025-02-10 09:54:53',0,NULL,59),(45,11,200,1,200,4,'GST1',4,203,1,'2025-02-10','2025-02-10 10:01:07',0,NULL,60),(46,11,200,1,200,3,'GST',4,203,1,'2025-02-10','2025-02-10 10:06:11',0,NULL,61),(47,9,14999,1,14999,4,'GST1',300,15298,1,'2025-02-10','2025-02-10 10:21:15',0,NULL,62),(48,9,14999,1,14999,3,'GST',300,15298,1,'2025-02-10','2025-02-10 10:28:21',0,NULL,63),(49,8,2000,1,2000,3,'GST',40,2039,1,'2025-02-10','2025-02-10 10:35:32',0,NULL,64),(50,9,14999,1,14999,3,'GST',300,15298,1,'2025-02-10','2025-02-10 10:42:55',0,NULL,65),(51,9,14999,1,14999,3,'GST',300,15298,1,'2025-02-10','2025-02-10 10:46:26',0,NULL,66),(52,9,14999,1,14999,3,'GST',300,15298,1,'2025-02-10','2025-02-10 10:48:57',0,NULL,67);
/*!40000 ALTER TABLE `quotation_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote`
--

DROP TABLE IF EXISTS `quote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quote` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lead_id` int DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `in_status` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `expire_date` date DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `subtotal` varchar(10) DEFAULT NULL,
  `total` varchar(20) DEFAULT NULL,
  `tax_id` int DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quote`
--

LOCK TABLES `quote` WRITE;
/*!40000 ALTER TABLE `quote` DISABLE KEYS */;
INSERT INTO `quote` VALUES (7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `quote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote_customer`
--

DROP TABLE IF EXISTS `quote_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quote_customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `currency` varchar(50) DEFAULT NULL,
  `in_status` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `expire_date` date DEFAULT NULL,
  `note` varchar(50) DEFAULT NULL,
  `subtotal` varchar(50) DEFAULT NULL,
  `total` varchar(50) DEFAULT NULL,
  `tax_id` int DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quote_customer`
--

LOCK TABLES `quote_customer` WRITE;
/*!40000 ALTER TABLE `quote_customer` DISABLE KEYS */;
INSERT INTO `quote_customer` VALUES (32,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `quote_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote_customer_item`
--

DROP TABLE IF EXISTS `quote_customer_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quote_customer_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quote_id` int DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `total` varchar(25) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quote_customer_item`
--

LOCK TABLES `quote_customer_item` WRITE;
/*!40000 ALTER TABLE `quote_customer_item` DISABLE KEYS */;
INSERT INTO `quote_customer_item` VALUES (14,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `quote_customer_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote_field`
--

DROP TABLE IF EXISTS `quote_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quote_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quote_id` int DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `total` varchar(25) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quote_field`
--

LOCK TABLES `quote_field` WRITE;
/*!40000 ALTER TABLE `quote_field` DISABLE KEYS */;
INSERT INTO `quote_field` VALUES (32,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `quote_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salaries`
--

DROP TABLE IF EXISTS `salaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salaries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `base_salary` decimal(10,2) NOT NULL,
  `hra` decimal(10,2) DEFAULT '0.00',
  `other_allowances` decimal(10,2) DEFAULT '0.00',
  `tax_id` int DEFAULT NULL,
  `tax_deductions` decimal(10,2) DEFAULT '0.00',
  `provident_fund` decimal(10,2) DEFAULT '0.00',
  `net_salary` decimal(10,2) GENERATED ALWAYS AS (((((`base_salary` + `hra`) + `other_allowances`) - `tax_deductions`) - `provident_fund`)) STORED,
  `pay_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `tax_id` (`tax_id`),
  CONSTRAINT `salaries_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE SET NULL,
  CONSTRAINT `salaries_ibfk_2` FOREIGN KEY (`tax_id`) REFERENCES `tax` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salaries`
--

LOCK TABLES `salaries` WRITE;
/*!40000 ALTER TABLE `salaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `salaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(255) DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,'JAVA',1,0,'2024-12-10 09:40:53','2024-12-10 09:40:53'),(2,'React.js',3,1,'2024-12-10 09:41:37','2024-12-10 09:44:39'),(3,'. Net',2,0,'2024-12-10 09:41:48','2024-12-10 09:41:48');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status_stage` varchar(50) DEFAULT NULL,
  `main_status` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Darft','darft','#d9d9d9','2024-10-11','2024-10-11 07:31:53',1),(2,'Pending','pending','#ffadd2','2024-10-11',NULL,0),(3,'Sent1','sent1','#ffe58f','2024-10-11','2024-10-11 07:28:27',0);
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `employee_id` int DEFAULT NULL,
  `due_date` timestamp NULL DEFAULT NULL,
  `priority` varchar(20) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `completed_on` timestamp NULL DEFAULT NULL,
  `task_status` varchar(50) DEFAULT 'Open',
  `project_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `created_by` (`created_by`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `employee` (`id`),
  CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Complete the Admin panel of Datacare Labs','Complete the Admin panel of Datacare Labs',16,'2025-01-30 18:30:00','Medium',0,'2025-01-10 07:36:36',NULL,16,NULL,'Closed',19),(2,'Complete the customer panel of Datacare\'s Lab','Complete the customer panel of Datacare\'s Lab',16,'2025-01-23 02:00:00','High',0,'2025-01-10 07:37:01','2025-01-10 09:40:54',16,'2025-01-10 04:10:54','Completed',19),(3,'dawdaw','dwadadawd',17,'2025-01-22 18:30:00','Low',1,'2025-01-10 08:54:07','2025-01-10 08:54:14',16,NULL,'Completed',19),(4,'TASK 3','dawdawdawdawd',17,'2025-01-24 18:30:00','Low',0,'2025-01-10 12:47:47',NULL,16,NULL,'Completed',18),(5,'Create a Landing page','Create a Landing page',17,'2025-01-10 13:00:00','High',0,'2025-01-10 13:38:07','2025-04-23 07:33:24',17,NULL,'Open',18),(6,'Create a Landing Page','Create a Landing page',19,'2025-01-23 07:30:00','Medium',0,'2025-01-10 13:38:26','2025-01-15 07:56:15',16,NULL,'Open',19),(7,'Create a wireframe','Design of wireframe',24,'2025-01-17 18:30:00','Medium',0,'2025-01-29 07:27:22',NULL,16,NULL,'Open',20),(8,'Design the figma ','Deisgn accordingly',18,'2025-01-16 18:30:00','Medium',0,'2025-01-30 05:47:56',NULL,16,NULL,'Open',22),(9,'Create Notification functionalityy','Create Notification functionality',17,'2025-02-05 15:00:00','Medium',0,'2025-01-30 09:11:30','2025-02-05 09:14:30',16,'2025-02-05 03:44:30','Completed',23),(10,'dawaw','dawdadawdawd',26,'2025-01-22 13:00:00','Medium',0,'2025-01-30 09:22:01','2025-02-12 09:18:32',16,NULL,'Open',22),(11,'rtx website','create rtx website ',18,'2025-02-27 07:30:00','Low',0,'2025-02-06 06:46:02','2025-02-06 07:10:42',16,'2025-02-06 01:40:42','Completed',26),(12,'create website','dumy',28,'2025-02-21 13:00:00','Low',0,'2025-02-08 10:00:02','2025-02-12 09:17:17',16,NULL,'Open',23),(13,'add new website','dumy',26,'2025-02-27 02:00:00','Medium',0,'2025-02-10 11:23:32','2025-02-12 11:29:12',17,NULL,'Open',24),(14,'new title with','dependency',16,'2025-04-19 18:30:00','High',0,'2025-04-14 07:09:23',NULL,16,NULL,'Open',28),(15,'new title with dep','dependency',16,'2025-01-09 15:06:36','High',0,'2025-04-14 07:17:51','2025-04-23 07:36:53',17,NULL,'open',28),(16,'sc','scsc',28,'2025-05-29 18:30:00','Medium',0,'2025-04-14 10:57:39',NULL,16,NULL,'open',28),(17,'assa','dssd',28,'2025-04-23 18:30:00','Medium',0,'2025-04-14 10:59:13',NULL,16,NULL,'open',27),(18,'zxczc','scsacsa',28,'2025-04-08 22:30:00','High',0,'2025-04-14 11:03:15','2025-04-21 07:42:45',16,NULL,'Pause',26),(19,'new game build  ','a new game develop',30,'2025-04-23 02:00:00','Medium',0,'2025-04-22 05:21:34','2025-04-22 06:31:24',18,NULL,'open',26),(20,'new task check status','dumy',29,'2025-04-24 18:30:00','Medium',0,'2025-04-23 05:49:43',NULL,16,NULL,'Open',27),(21,'add new task status','dumy data',29,'2025-04-21 06:00:00','Low',0,'2025-04-23 05:58:44','2025-04-23 06:58:09',29,NULL,'Open',26),(22,'cxxzczx','zxczx',29,'2025-04-25 18:30:00','Medium',0,'2025-04-23 07:38:50',NULL,17,NULL,'Open',26),(23,'zxcxzxzcxz','czxcxz',17,'2025-04-23 18:30:00','Medium',0,'2025-04-23 07:39:48',NULL,17,NULL,'Open',27),(24,'check task apis ','dumy',30,'2025-04-25 18:30:00','Low',0,'2025-04-23 09:19:14',NULL,16,NULL,'Open',25),(25,'add next task for check ','dumy task',30,'2025-04-25 02:00:00','Low',0,'2025-04-23 09:27:19','2025-04-23 11:19:04',16,NULL,'Open',26);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tax`
--

DROP TABLE IF EXISTS `tax`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tax` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tax_name` varchar(255) DEFAULT NULL,
  `tax_value` varchar(255) DEFAULT NULL,
  `is_enable` int DEFAULT '0',
  `created_on` date DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tax`
--

LOCK TABLES `tax` WRITE;
/*!40000 ALTER TABLE `tax` DISABLE KEYS */;
INSERT INTO `tax` VALUES (1,'GST a','10',0,'2024-10-11','2024-10-11 09:25:47',1),(2,'GST w','7',0,'2024-10-11','2024-10-22 06:55:06',1),(3,'GST','2',1,'2024-10-22','2024-10-22 06:51:45',0),(4,'GST1','2',0,'2024-11-08','2024-11-08 14:14:39',0),(5,'GSTN','8',0,'2024-11-20','2024-11-20 12:35:36',0);
/*!40000 ALTER TABLE `tax` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor_name` varchar(50) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `contact_person_name` varchar(20) DEFAULT NULL,
  `contact_mail` varchar(100) DEFAULT NULL,
  `contact_phone_num` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `business_type` varchar(50) DEFAULT NULL,
  `tax_number` varchar(20) DEFAULT NULL,
  `tax_resi_number` varchar(50) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `bank_branch` varchar(255) DEFAULT NULL,
  `ifsc_code` varchar(11) DEFAULT NULL,
  `product_category` int DEFAULT NULL,
  `list_of_product` text,
  `vender_agreement` text,
  `certifiation` text,
  `license` text,
  `payment_freq` varchar(10) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `discount` varchar(20) DEFAULT NULL,
  `last_date` date DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `notes` text,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `quotation` int DEFAULT '0' COMMENT '0 is not uploaded, 1 is uploaded',
  `employee_id` int DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
  `is_register` varchar(225) DEFAULT NULL,
  `subscription` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (1,'shrvari','IT Services','shree','shree@mailinator.com','87678787876','pune, katraj','katraj','maharashtra','india',411037,'Sole Proprietorship','#234566','#23456612345','State bank','12345678987876','pune','IFCE1029',13,'8','new_inv.pdf','Quotation (5).pdf','CRM Rquirement.docx','Net 15','Bank Transfer','1%','2025-03-01','2025-02-01','dumy text',1,'2025-01-01 12:47:15','2025-01-29 10:49:01',NULL,NULL,'$2a$10$DUecPxubo7FQwvbnEgcDZeHWIJIwPYcWactg9fpZjDOECqXOGY.gK','Approved',NULL),(2,'mansi','Glass Suppliers','abhijit pawar','abhijit@mailinator.com','5676767656','pune','Chandigarh','Chandigarh','India',123456,'markeing','@3456765456','#2345678765','union','12345678987654',NULL,'ifsc1234567',13,'8','newone.pdf','1733132121292.pdf','Priyanka_08_2024.pdf','Net 30','paytm','good','2025-01-23','2025-01-23','good',0,'2025-01-03 05:18:22','2025-01-03 05:18:22',NULL,NULL,NULL,NULL,NULL),(3,'Vendor 1','IT Services',NULL,'nazma@mailinator.com','45785989655',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2025-01-11 11:21:29','2025-02-03 13:04:07',NULL,16,NULL,NULL,NULL),(4,'siddhi','Metal Suppliers','Tejas Chavan','siddhi@mailinator.com','8409578590','Street 242, Block A',NULL,NULL,NULL,NULL,'Sole Proprietorship',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2025-01-16 07:40:34','2025-01-27 07:39:11',1,16,'$2a$10$8w80TQLuTHNIPLJs1nNquupNluN.V15e7GjiDMgkjrwxLc4T7M8Ry',NULL,NULL),(5,'vendor ','Plastic & Polymer Suppliers','Harshal Joshi','vendorsecond@mailinator.com','8767856542','pune','Pas de la Casa','Encamp','Andorra',678567,'Partnership','#12345345345','#1234512345','union','234561234512aa',NULL,'UNIONIFSC38',NULL,'charger ',NULL,'new_inv.pdf','newone.pdf','Net 45','upi','1','2025-01-24','2025-01-25',NULL,0,'2025-01-16 07:56:37','2025-02-14 12:51:49',1,16,'$2a$10$fX6e0YMY3J8Taq5aEG1vuuPkp7Iei6k4ZaqfPGVI2KSqbOZZuH7Vy','Approved','{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/f8vB6lBu8II:APA91bHbX33KSykPPgWGKfWwloI_Urbtnl4_ipIt2TN9xL0CB949Q2NJWIsVzYQe9vXqe6H-0bmgL0ICHkAy4_3wDuGDAa13Po29OylEqkhezGv46xQVsmVMJZi1tyKDOe12cY4ktMFK\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BMX5v18BJJuoy0Rhyt0LewZktPyS8wW3M-1N-ySwa2t5dOvkyMmKGFban21MWCuAKo7L8kcm4gvS11RN9kDc11w\",\"auth\":\"j1JwXHcFQNeD3dMn-c0WHA\"}}'),(6,'animesh','Chemical Suppliers','harshal','animesh@mailinator.com','1234567878','pune','Adoni','Andhra Pradesh','India',123455,'Partnership','234234234','2342342345','union','45678787674',NULL,'IFSC6787',NULL,'keyboard',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2025-01-31 09:50:53','2025-01-31 10:37:19',0,16,'$2a$10$PpHuK7TCKaGt79wabuuLk.UkBRGF1d7RIa1IQYOJjKhUCIreXUvx6','Approved',NULL),(7,'joy jonns','Metal Suppliers','joy','joy@mailinator.com','4565465456','pune','Hadapsar, Pune','Maharashtra','India',434323,'Corporation','6545456','4565#45',NULL,NULL,NULL,NULL,NULL,'metal',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2025-02-06 07:25:42','2025-02-06 10:10:23',0,17,'$2a$10$k1oOlGKFPEZxOwlggxTxW.YVbKPJRY.ESwmhnuBCOwJjvS4bL9mRW','Approved',NULL),(8,'nikhil kharche','Chemical Suppliers','ssss','nikhilkharche@mailinator.com','6787687678','ss',NULL,NULL,NULL,NULL,'Partnership',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'rom',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2025-02-10 12:33:15','2025-02-10 13:00:49',0,17,NULL,'Approved',NULL),(9,'srisha','Plastic & Polymer Suppliers','sss','srisha@mailinator.com','2345678787','sss',NULL,NULL,NULL,NULL,'Partnership',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'rom',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2025-02-10 13:13:30','2025-02-10 13:21:35',1,17,'$2a$10$8nxRbu.rENoXVkzefQTnTu1j2fENc81cpZps1/OTR1hpwAGjb3Lvy','Approved',NULL);
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_invoice`
--

DROP TABLE IF EXISTS `vendor_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int DEFAULT NULL,
  `procurment_id` int DEFAULT NULL,
  `quotation_id` int DEFAULT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `is_approve` varchar(255) DEFAULT NULL,
  `is_payment` varchar(30) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `procurment_id` (`procurment_id`),
  KEY `quotation_id` (`quotation_id`),
  CONSTRAINT `vendor_invoice_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`),
  CONSTRAINT `vendor_invoice_ibfk_2` FOREIGN KEY (`procurment_id`) REFERENCES `procurement` (`id`),
  CONSTRAINT `vendor_invoice_ibfk_3` FOREIGN KEY (`quotation_id`) REFERENCES `vendor_quotation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_invoice`
--

LOCK TABLES `vendor_invoice` WRITE;
/*!40000 ALTER TABLE `vendor_invoice` DISABLE KEYS */;
INSERT INTO `vendor_invoice` VALUES (1,5,1,9,'Cipla Phlebotomist Web App (1).pdf',0,'2025-01-17 06:19:29',NULL,NULL,NULL),(2,5,7,14,'document (18).pdf',0,'2025-02-05 11:34:55',NULL,'Paid',NULL),(3,9,7,18,'document (18).pdf',0,'2025-02-10 13:22:36',NULL,'paid',NULL),(4,5,7,15,'Quotation (4).pdf',0,'2025-02-13 07:33:40',NULL,'Paid',NULL),(5,5,7,14,'Quotation (3).pdf',0,'2025-02-13 07:34:08',NULL,'Paid',NULL),(6,5,7,14,'Quotation (4).pdf',0,'2025-02-13 07:37:58',NULL,'Paid',NULL),(7,5,7,14,'download (3).pdf',0,'2025-02-13 09:03:06',NULL,'Unpaid',NULL),(8,5,7,14,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-13 09:07:40',NULL,'Paid',NULL),(9,5,6,16,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-13 12:34:12',NULL,NULL,2004),(10,5,7,14,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-14 05:09:40',NULL,'Paid',2003),(11,5,7,15,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-14 05:09:55',NULL,NULL,NULL);
/*!40000 ALTER TABLE `vendor_invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_notification`
--

DROP TABLE IF EXISTS `vendor_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topic` text NOT NULL,
  `content` text NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  `seen` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `link` text,
  `to_vendor` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_notification`
--

LOCK TABLES `vendor_notification` WRITE;
/*!40000 ALTER TABLE `vendor_notification` DISABLE KEYS */;
INSERT INTO `vendor_notification` VALUES (1,'QUOTATION APPROVED','Quotation approved by  priyanka. ',0,0,'2025-02-05 11:29:49','/vendor/profile/5',5),(2,'QUOTATION APPROVED','Quotation approved by  priyanka. ',0,0,'2025-02-05 12:34:10','/vendor/profile/5',5),(3,'QUOTATION REJECTED','Quotation rejected by  priyanka. ',0,0,'2025-02-07 11:01:41','/vendor/profile/5',5),(4,'QUOTATION APPROVED','Quotation approved by  Animesh Pradhan. ',0,0,'2025-02-10 13:22:05','/vendor/profile/9',9);
/*!40000 ALTER TABLE `vendor_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_quotation`
--

DROP TABLE IF EXISTS `vendor_quotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_quotation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int DEFAULT NULL,
  `procurment_id` int DEFAULT NULL,
  `quotation` varchar(255) DEFAULT NULL,
  `status` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `is_approve` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `procurment_id` (`procurment_id`),
  CONSTRAINT `vendor_quotation_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`),
  CONSTRAINT `vendor_quotation_ibfk_2` FOREIGN KEY (`procurment_id`) REFERENCES `procurement` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_quotation`
--

LOCK TABLES `vendor_quotation` WRITE;
/*!40000 ALTER TABLE `vendor_quotation` DISABLE KEYS */;
INSERT INTO `vendor_quotation` VALUES (1,3,2,'Quotation (3).pdf',0,'2025-01-16 06:26:58',NULL),(2,3,2,'Quotation (3).pdf',0,'2025-01-16 06:31:33',NULL),(3,3,2,'Quotation (3).pdf',0,'2025-01-16 06:33:05',NULL),(4,5,3,'CRM Rquirement.docx',0,'2025-01-16 09:32:50','Approved'),(5,5,2,'1733132121292.pdf',0,'2025-01-16 09:40:56',NULL),(6,5,2,'1733132121292.pdf',0,'2025-01-16 09:41:26',NULL),(7,5,2,'1733132121292.pdf',0,'2025-01-16 09:42:16',NULL),(8,5,2,'1733132121292.pdf',0,'2025-01-16 09:45:02',NULL),(9,5,1,'newone.pdf',0,'2025-01-16 09:45:32','Approved'),(10,5,1,'Cipla Phlebotomist Web App (1).pdf',0,'2025-01-16 09:50:55','Approved'),(11,5,1,'Cipla Phlebotomist Web App (1).pdf',0,'2025-01-16 09:51:52','Rejected'),(12,5,3,'Cipla Phlebotomist Web App (1).pdf',0,'2025-01-16 09:53:17','Rejected'),(13,4,1,'payment-1-undefined.pdf',0,'2025-01-17 07:12:07','Approved'),(14,5,7,'document (18).pdf',0,'2025-02-05 10:51:35','Approved'),(15,5,7,'document (18).pdf',0,'2025-02-05 11:06:17','Approved'),(16,5,6,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-05 11:29:30','Approved'),(17,5,5,'document (18).pdf',0,'2025-02-05 12:33:34','Approved'),(18,9,7,'document (18).pdf',0,'2025-02-10 13:21:35','Approved'),(19,5,8,'document (18).pdf',0,'2025-02-17 05:21:46',NULL),(20,5,8,'document (18).pdf',0,'2025-02-17 05:26:55',NULL),(21,5,7,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-17 05:30:10',NULL),(22,5,8,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-17 05:35:47',NULL),(23,5,8,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-17 05:41:42',NULL),(24,5,8,'document (18).pdf',0,'2025-02-17 05:44:30',NULL),(25,5,7,'document (18).pdf',0,'2025-02-17 05:45:21',NULL),(26,5,7,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-17 05:52:06',NULL),(27,5,7,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-17 05:53:00',NULL),(28,5,7,'Cipla Phlebotomist Web App (1).pdf',0,'2025-02-17 05:59:29',NULL),(29,5,7,'Quotation.pdf',0,'2025-02-17 06:08:59',NULL);
/*!40000 ALTER TABLE `vendor_quotation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-26 10:32:06
