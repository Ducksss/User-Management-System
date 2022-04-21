CREATE DATABASE  IF NOT EXISTS `user_management_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `user_management_system`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: user_management_system
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `customer_stripe_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id_UNIQUE` (`customer_id`),
  KEY `fk_user_id_5_idx` (`user_id`),
  CONSTRAINT `fk_user_id_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,16,'cus_LBGuT9Zb3mHJQu','2022-02-19 06:56:22'),(7,26,'cus_LPRN3qeiVoGe4I','2022-03-29 02:42:19'),(8,29,'cus_LY1idhyHhuinJw','2022-04-21 00:46:47');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `subscription_id` varchar(255) DEFAULT NULL,
  `subscription_status` varchar(45) DEFAULT NULL,
  `amount_paid` varchar(255) DEFAULT NULL,
  `amount_remaining` varchar(255) DEFAULT NULL,
  `paid_at` varchar(255) DEFAULT NULL,
  `fk_customer_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `subscription_id_idx` (`fk_customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,'in_1JqAl5FHCNlc2sRxFZ6VUNfE','paid','500','0','2021-10-30 14:09:50.000','cus_KNJSNtDx8Szceq');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logins` (
  `login_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `login_attempt` int NOT NULL DEFAULT '0',
  `password_hash` varchar(255) NOT NULL,
  `pasword_hash_history_1` varchar(255) DEFAULT NULL,
  `pasword_hash_history_2` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '2',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `login_id_UNIQUE` (`login_id`),
  KEY `user_guid_fk_1_idx` (`user_id`),
  CONSTRAINT `fk_user_id_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logins`
--

LOCK TABLES `logins` WRITE;
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;
INSERT INTO `logins` VALUES (5,13,1,'$2a$10$uT21pEFLV1XVKKB6sNvw5utAQn2AClFZoQrSaUsuxVcaB3bEhzx3O',NULL,NULL,0,'2021-10-23 06:13:49','2021-10-23 06:13:49'),(8,16,0,'$2a$10$VsPZup3fqyCe5zlOeWT97OTVei.Q.W2R5/zfIwcKn6QFBd8SWElli',NULL,NULL,0,'2022-02-19 06:56:21','2022-02-19 06:56:21'),(14,26,0,'$2a$10$K2soV00cJAPhLqUBMXyydeqmRkpX5jRbNU780jS0m88V3Df8hbS/i',NULL,NULL,0,'2022-03-29 02:42:18','2022-03-29 02:42:18'),(15,29,0,'$2a$10$Zbm7xPnRiWQ8NeuvyKf5WeCwHzCwF9e0/I.AO5ljpXSeB9kELrMD6',NULL,NULL,0,'2022-04-21 00:46:47','2022-04-21 00:46:47');
/*!40000 ALTER TABLE `logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `refresh_token_id` int NOT NULL AUTO_INCREMENT,
  `user_guid` varchar(255) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`refresh_token_id`),
  KEY `user_id_idx` (`user_guid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `subscription_id` int NOT NULL AUTO_INCREMENT,
  `stripe_subscription_id` varchar(255) DEFAULT NULL,
  `stripe_status` varchar(45) DEFAULT NULL,
  `current_period_end` varchar(255) DEFAULT NULL,
  `customer_id` varchar(255) DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`subscription_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (1,'sub_1JpV14FHCNlc2sRxHes4SRKw','active','1638092122','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(2,'sub_1JpV1rFHCNlc2sRxzPBz2p32','active','1638092171','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(3,'sub_1JpV2FFHCNlc2sRxHNBgdVCs','active','1638092195','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(4,'sub_1JpV2bFHCNlc2sRxfdJqGU4T','active','1638092217','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(5,'sub_1JpV91FHCNlc2sRxajItbTTG','canceled','1638092615','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(6,'sub_1JpogMFHCNlc2sRxsumh2LIw','active','1638167718','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(7,'sub_1JpoiIFHCNlc2sRxhaowkhhG','active','1638167838','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(8,'sub_1Jpp6XFHCNlc2sRx3ZSzvk5C','active','1638169341','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(9,'sub_1JppkEFHCNlc2sRxnXqh1Ge1','active','1638171802','cus_KNJSNtDx8Szceq','prod_KMv4VL3QLBUqS3'),(10,'sub_1JpplMFHCNlc2sRxj1Q7ARg4','active','1638171872','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(11,'sub_1JppnRFHCNlc2sRxquYTIrDI','active','1638172001','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(12,'sub_1JpppHFHCNlc2sRx5g6Qtilw','active','1638172115','cus_KNJSNtDx8Szceq','prod_KMv4VL3QLBUqS3'),(13,'sub_1Jppq2FHCNlc2sRx6ogkzQj1','active','1638172162','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(14,'sub_1Jppr1FHCNlc2sRxcfDCAOlJ','active','1638172223','cus_KNJSNtDx8Szceq','prod_KMv4VL3QLBUqS3'),(15,'sub_1JpUcgFHCNlc2sRx8XL2yXRV','incomplete_expired','1638090610','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(16,'sub_1JqAjlFHCNlc2sRxIhFcs3gN','active','2021-11-30 14:08:17.000','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb'),(17,'sub_1JqAkbFHCNlc2sRxjkQLxjva','active','2021-11-30 14:09:09.000','cus_KNJSNtDx8Szceq','prod_KMv4VL3QLBUqS3'),(18,'sub_1JqAl5FHCNlc2sRxX9nDEr3Y','active','2021-11-30 14:09:39.000','cus_KNJSNtDx8Szceq','prod_KMv3CeyiLTzIOb');
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `two_factor_authentication`
--

DROP TABLE IF EXISTS `two_factor_authentication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `two_factor_authentication` (
  `two_factor_authentication_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `temporary_secret` varchar(255) NOT NULL,
  `permanent_secret` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`two_factor_authentication_id`),
  KEY `fk_user_id_4_idx` (`user_id`),
  CONSTRAINT `fk_user_id_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `two_factor_authentication`
--

LOCK TABLES `two_factor_authentication` WRITE;
/*!40000 ALTER TABLE `two_factor_authentication` DISABLE KEYS */;
INSERT INTO `two_factor_authentication` VALUES (1,13,'MYYUKSJ4LJJV2SZRJQXHOJBGKRWGWOJF',NULL,'2021-10-23 06:13:49'),(4,16,'MRWS43TCIIUW6T2IGFYC6JCKHFAGQUJB',NULL,'2022-02-19 06:56:21'),(10,26,'HZRDMXSHHERXQKBJHNGXCLZZFQ5WQTDN',NULL,'2022-03-29 02:42:18'),(11,29,'MF4WKYZQONAXUS25PAXUMUK2OJQTGWCM',NULL,'2022-04-21 00:46:47');
/*!40000 ALTER TABLE `two_factor_authentication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_guid` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `privilege` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `contact_number_UNIQUE` (`contact_number`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_guid_UNIQUE` (`user_guid`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'7125c764-340b-11ec-be93-005056c00001','chaipinzheng@gmail.com','96472290','Chai','Pin Zheng',4,'2021-10-23 06:13:48'),(16,'19e3b952-9194-11ec-a486-7c10c92823f9','bryangoh843@gmail.com','91234562','Omari','Aldred',4,'2022-02-19 06:56:21'),(26,'e7f1a5cc-af4c-11ec-9bcf-7c10c92823f9','alim97460@gmail.com','1234567341','qwer','qwerrerer',4,'2022-03-29 02:42:18'),(29,'940a2c4d-c14f-11ec-b209-7c10c92823f9','doctornooo78@gmail.com','812345902','chai','zin pheng',4,'2022-04-21 00:46:47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `users_BEFORE_INSERT` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
	SET NEW.user_guid = UUID();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `verifications`
--

DROP TABLE IF EXISTS `verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verifications` (
  `verification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `verification_code` int NOT NULL DEFAULT '0',
  `verification_attempt` int NOT NULL DEFAULT '0',
  `type` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`verification_id`),
  UNIQUE KEY `verification_id_UNIQUE` (`verification_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk_user_id_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verifications`
--

LOCK TABLES `verifications` WRITE;
/*!40000 ALTER TABLE `verifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'user_management_system'
--

--
-- Dumping routines for database 'user_management_system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-21 18:34:24
