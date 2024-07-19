-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2023 at 02:02 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sudisa`
--

-- --------------------------------------------------------

--
-- Table structure for table `alarm`
--

CREATE TABLE `alarm` (
  `alarm_id` int(11) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `camera` varchar(12) NOT NULL,
  `alarm_type` varchar(15) NOT NULL,
  `image` varchar(255) NOT NULL,
  `datetime` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alarm`
--

INSERT INTO `alarm` (`alarm_id`, `dept_id`, `camera`, `alarm_type`, `image`, `datetime`) VALUES
(1, 34, 'Camera11', 'Warning', '1696932759165-frameb7dcefc4-7047-4bc9-980f-b52b8a165265.jpg', '2023-10-10T15:42:39.234Z'),
(3, 34, 'Camera11', 'Warning', '1696933643933-frameae612c6f-24f8-45a3-8b9f-c644691c50d8.jpg', '2023-10-10T15:57:24.025Z'),
(4, 34, 'Camera11', 'Warning', '1696933645685-framecf8fbae0-6a97-4a78-9738-345eb1e183d9.jpg', '2023-10-10T15:57:25.923Z'),
(5, 34, 'Camera10', 'Warning', '1696933645700-frame32905c90-3c6a-4d7f-8530-e78d475635ca.jpg', '2023-10-10T15:57:25.930Z'),
(6, 34, 'Camera10', 'Warning', '1696933647938-frameb00d478b-75c6-4c9a-ba80-76c9988bbe94.jpg', '2023-10-10T15:57:28.011Z'),
(7, 34, 'Camera10', 'Warning', '1696933648521-frame0278f828-4eab-40d6-9291-dfc31ad5e60c.jpg', '2023-10-10T15:57:28.610Z'),
(8, 34, 'Camera10', 'Warning', '1696933649460-frame9acd0620-32e1-4ea0-adc3-53fec7486b40.jpg', '2023-10-10T15:57:29.541Z'),
(9, 34, 'Camera10', 'Warning', '1696933649799-framef39776a6-755a-4cad-84ca-f4455da1c550.jpg', '2023-10-10T15:57:29.875Z'),
(10, 34, 'Camera10', 'Warning', '1696933694686-framebdfacea4-9ce3-4330-b916-16d739540861.jpg', '2023-10-10T15:58:14.765Z'),
(11, 34, 'Camera10', 'Warning', '1696933695033-framec4e76144-a5dc-4be7-91ee-ac8af825f4f0.jpg', '2023-10-10T15:58:15.099Z'),
(12, 34, 'Camera10', 'Warning', '1696933696655-frameb7bc6670-3cd9-449d-bf63-6f8441937c8d.jpg', '2023-10-10T15:58:16.770Z'),
(13, 34, 'Camera10', 'Warning', '1696933698710-framec067fc06-0e02-45c0-98d9-659aa63e9963.jpg', '2023-10-10T15:58:18.817Z'),
(14, 34, 'Camera10', 'Warning', '1696933699907-frameb9bb8874-7afb-487a-abe1-5a3e67a65718.jpg', '2023-10-10T15:58:20.011Z'),
(15, 34, 'Camera10', 'Warning', '1696933700235-frameefbde087-696a-4705-8102-6d063cdee98b.jpg', '2023-10-10T15:58:20.321Z'),
(16, 34, 'Camera10', 'Warning', '1696933700563-frame3b12ba5c-cbb0-4fd4-938f-12d87248abd3.jpg', '2023-10-10T15:58:20.644Z'),
(17, 34, 'Camera10', 'Warning', '1696933701909-frame796502eb-5561-4233-adfb-f5823ce23398.jpg', '2023-10-10T15:58:22.020Z'),
(18, 34, 'Camera10', 'Warning', '1696933703160-frame7d646025-2412-40ed-9f35-c5072648d06c.jpg', '2023-10-10T15:58:23.231Z'),
(19, 34, 'Camera10', 'Warning', '1696933703474-frame1b3c6608-6c63-4827-a114-492254af7f58.jpg', '2023-10-10T15:58:23.544Z'),
(20, 34, 'Camera10', 'Warning', '1696933704785-frame067cc3e9-9467-41e7-a167-357408a5e04d.jpg', '2023-10-10T15:58:24.853Z'),
(21, 34, 'Camera10', 'Warning', '1696933706381-frame3776ab7c-4589-45ce-954c-ff3eaf86fda2.jpg', '2023-10-10T15:58:26.453Z'),
(22, 34, 'Camera10', 'Warning', '1696933757126-frame5d63420a-6900-446d-92d1-fcb10c0bc858.jpg', '2023-10-10T15:59:17.202Z'),
(23, 34, 'Camera10', 'Warning', '1696933757426-framef0470cdf-12ab-486b-a0ee-71754250c09b.jpg', '2023-10-10T15:59:17.491Z'),
(24, 34, 'Camera10', 'Warning', '1696933757785-framea3e84139-2777-4771-a228-82d9386e4b6f.jpg', '2023-10-10T15:59:17.861Z'),
(25, 34, 'Camera10', 'Warning', '1696933759998-framedb5f4a99-e883-46cb-9742-dc9f8dc3a256.jpg', '2023-10-10T15:59:20.056Z'),
(26, 34, 'Camera10', 'Warning', '1696933760685-framec0a65d22-695a-4c5f-9222-2698c7e2174d.jpg', '2023-10-10T15:59:20.782Z'),
(27, 34, 'Camera10', 'Warning', '1696933764347-frame8f75748d-4d2e-4f54-91b0-057e657e357a.jpg', '2023-10-10T15:59:24.433Z'),
(28, 34, 'Camera10', 'Warning', '1696933768014-framef9cf2ab2-f8d1-47ab-9e75-b2de25c171e0.jpg', '2023-10-10T15:59:28.112Z'),
(29, 34, 'Camera10', 'Warning', '1696933769261-frame72752b4f-5b70-477b-896a-eea08dd55723.jpg', '2023-10-10T15:59:29.809Z'),
(30, 34, 'Camera10', 'Warning', '1696933770133-framed5701a0d-123a-4649-a481-edfbe2d35a72.jpg', '2023-10-10T15:59:30.230Z'),
(31, 34, 'Camera10', 'Warning', '1696933822167-frame38a5838d-69f2-4750-b5e8-2135fc8c047c.jpg', '2023-10-10T16:00:22.243Z'),
(32, 34, 'Camera10', 'Warning', '1696933822819-framef9fc936b-f906-4ed1-9543-2400240d718e.jpg', '2023-10-10T16:00:22.895Z'),
(33, 34, 'Camera10', 'Warning', '1696933823820-framec3eff0e6-25e6-4eae-b2c2-947c1241dc23.jpg', '2023-10-10T16:00:23.901Z'),
(34, 34, 'Camera10', 'Warning', '1696933824380-frame43da7e4e-5d59-4685-ac66-238a702b2de4.jpg', '2023-10-10T16:00:24.468Z'),
(35, 34, 'Camera10', 'Warning', '1696933826401-framed38ee10b-bf2d-4415-9dfa-61fe568a9b2f.jpg', '2023-10-10T16:00:26.478Z'),
(36, 34, 'Camera10', 'Warning', '1696933826455-frame62117386-dfb6-4e65-b16f-46574a2f6b1a.jpg', '2023-10-10T16:00:26.526Z'),
(37, 34, 'Camera10', 'Warning', '1696933829790-frame694d1cae-82d1-40ee-b8bd-f10ba09d176f.jpg', '2023-10-10T16:00:29.869Z'),
(38, 34, 'Camera10', 'Warning', '1696933829841-frame0d736f3f-436b-48a6-9294-83ee113239bf.jpg', '2023-10-10T16:00:29.921Z'),
(39, 34, 'Camera10', 'Warning', '1696933832376-frame7480321b-40c0-41f8-844e-d8a075ad6b19.jpg', '2023-10-10T16:00:32.435Z'),
(40, 34, 'Camera10', 'Warning', '1696933832717-frame2ff9ada6-ece3-4a9e-8ecd-493ac4e9e719.jpg', '2023-10-10T16:00:32.784Z'),
(41, 34, 'Camera10', 'Warning', '1696933834197-frame236430af-3c24-448e-bcce-597dfa3acd11.jpg', '2023-10-10T16:00:34.267Z'),
(42, 34, 'Camera10', 'Warning', '1696933834667-frameef115f47-3e60-4e31-b76e-5b272ddcf4e4.jpg', '2023-10-10T16:00:34.738Z'),
(43, 34, 'Camera10', 'Warning', '1696933838240-frame951bd449-90e2-4129-823c-4ec2cbeeddff.jpg', '2023-10-10T16:00:38.302Z'),
(44, 34, 'Camera10', 'Warning', '1696933839035-frame08b6341c-39ca-4ec3-9d0c-7fbc4e0b1ae1.jpg', '2023-10-10T16:00:39.139Z'),
(45, 34, 'Camera10', 'Warning', '1696933839098-frame6ad54198-862f-49bc-9f91-07f312c49c40.jpg', '2023-10-10T16:00:39.180Z'),
(46, 34, 'Camera10', 'Warning', '1696933841431-framea90a441a-5c46-42cf-89c6-ef3a7739fe87.jpg', '2023-10-10T16:00:41.503Z'),
(47, 34, 'Camera10', 'Warning', '1696933842070-frame48139c6e-d549-4627-8f13-5fc43565ceaa.jpg', '2023-10-10T16:00:42.147Z'),
(48, 34, 'Camera10', 'Warning', '1696933842504-framec95f8172-5e81-41a2-ba58-8d49c5066bc1.jpg', '2023-10-10T16:00:42.576Z'),
(49, 34, 'Camera10', 'Warning', '1696933845226-frame039d7b92-462c-4726-b409-3116f26d5038.jpg', '2023-10-10T16:00:45.313Z'),
(50, 34, 'Camera10', 'Warning', '1696933845359-framedef12bae-b444-4924-a3b3-bc0d9cb71b43.jpg', '2023-10-10T16:00:45.425Z'),
(51, 34, 'Camera10', 'Warning', '1696933846055-frame2e6dcea9-f686-4b41-833d-c80e277852e1.jpg', '2023-10-10T16:00:46.571Z'),
(52, 34, 'Camera10', 'Warning', '1696933846384-frame86b13c2e-fff8-43c9-a167-a8bce5c90a62.jpg', '2023-10-10T16:00:47.047Z'),
(53, 34, 'Camera10', 'Warning', '1696933849542-framee0db1fd7-40e4-4488-a208-37e4e4ba059b.jpg', '2023-10-10T16:00:49.629Z'),
(54, 34, 'Camera10', 'Warning', '1696933849603-frame6d3f6095-f8df-4d34-adb7-3fb6362bbb93.jpg', '2023-10-10T16:00:49.665Z'),
(55, 34, 'Camera10', 'Warning', '1696933850985-frame85f7d7c5-95e3-48ea-a2f8-23481256fce0.jpg', '2023-10-10T16:00:51.067Z'),
(56, 34, 'Camera10', 'Warning', '1696933851118-frame15502080-a3f1-4fca-9444-64ef0be06a58.jpg', '2023-10-10T16:00:51.225Z'),
(57, 34, 'Camera10', 'Warning', '1696933853745-frame403fab9d-0594-4811-adca-52c72c2446d1.jpg', '2023-10-10T16:00:53.821Z'),
(58, 34, 'Camera10', 'Warning', '1696933853818-framecf7358cb-fb3b-4ade-b5df-a4b5edce6edc.jpg', '2023-10-10T16:00:53.892Z'),
(59, 34, 'Camera11', 'Warning', '1696933903032-frame51153283-820b-41b1-a026-6909c7e1cd0e.jpg', '2023-10-10T16:01:43.098Z'),
(60, 34, 'Camera10', 'Warning', '1696933905042-frame35fbe226-0570-44a3-b375-7cb7537413b5.jpg', '2023-10-10T16:01:45.110Z'),
(61, 34, 'Camera10', 'Warning', '1696933905339-frame785fb2aa-1814-464e-b2f0-7c1be4303445.jpg', '2023-10-10T16:01:45.420Z'),
(62, 34, 'Camera10', 'Warning', '1696933908359-frameeb2de786-7b49-4288-93c9-c88fb6158c31.jpg', '2023-10-10T16:01:48.429Z'),
(63, 34, 'Camera10', 'Warning', '1696933913815-frame4b8f985c-97f0-4ea1-b8c2-a048b377b4aa.jpg', '2023-10-10T16:01:53.866Z'),
(64, 34, 'Camera10', 'Warning', '1696933951840-frame570c9f33-f63d-4cf9-9ec1-cf03615c172a.jpg', '2023-10-10T16:02:31.904Z'),
(65, 34, 'Camera10', 'Warning', '1696933952133-frameb852a902-18eb-427c-abc3-74240fddb4d9.jpg', '2023-10-10T16:02:32.196Z'),
(66, 34, 'Camera10', 'Warning', '1696933955011-frame0e4616af-dc53-48f5-a58b-24ebef1f272d.jpg', '2023-10-10T16:02:35.087Z'),
(67, 34, 'Camera10', 'Warning', '1696933955333-framedd0e90d4-91e3-4b03-b653-4701c89f3a6a.jpg', '2023-10-10T16:02:35.410Z'),
(68, 34, 'Camera10', 'Warning', '1696933956607-framefd97e972-7aaa-4213-8cec-64c02ceb5536.jpg', '2023-10-10T16:02:36.714Z'),
(69, 34, 'Camera10', 'Warning', '1696933957420-frame03910772-75e8-46bb-8e45-bc6d92dd324d.jpg', '2023-10-10T16:02:37.494Z'),
(70, 34, 'Camera10', 'Warning', '1696933958470-frame047bee32-9bf3-4bd3-97dd-6308d92263c1.jpg', '2023-10-10T16:02:38.561Z'),
(71, 34, 'Camera10', 'Warning', '1696933958808-frame235d3e4d-5440-4295-9107-d0d096effb66.jpg', '2023-10-10T16:02:38.879Z'),
(72, 34, 'Camera11', 'Warning', '1696934004338-frame68a4f29a-af18-48a6-91d9-599265294564.jpg', '2023-10-10T16:03:24.412Z'),
(73, 34, 'Camera11', 'Warning', '1696934011744-framefffa8f8a-fe91-43c1-9cf2-43ef3b568c72.jpg', '2023-10-10T16:03:31.812Z'),
(74, 34, 'Camera11', 'Warning', '1696934013399-frame917e49be-061a-405f-bc8d-d736e36d6d62.jpg', '2023-10-10T16:03:33.469Z'),
(75, 34, 'Camera10', 'Warning', '1696934023168-frame6887831b-0c83-4694-b7c9-2364eadfc041.jpg', '2023-10-10T16:03:43.281Z'),
(76, 34, 'Camera10', 'Warning', '1696934023716-framee882ab07-6fbc-4cb1-94dc-341d0b4268e9.jpg', '2023-10-10T16:03:43.852Z'),
(77, 34, 'Camera11', 'Warning', '1696934029883-framed3ff5a4e-aaa1-4acc-a43c-8ed67a2ca525.jpg', '2023-10-10T16:03:49.986Z'),
(78, 34, 'Camera11', 'Warning', '1696934061459-frame5bfbe0d5-65fb-458d-a0cb-970e950ff202.jpg', '2023-10-10T16:04:21.523Z'),
(79, 34, 'Camera11', 'Warning', '1696934067243-frame02dd30e0-060c-4916-b66c-da81a1090f95.jpg', '2023-10-10T16:04:27.303Z'),
(80, 34, 'Camera11', 'Warning', '1696934076056-framef87dfc36-ead2-4c0b-a6f0-9a1eedfc9e9f.jpg', '2023-10-10T16:04:36.161Z'),
(81, 34, 'Camera10', 'Warning', '1696934077821-frame0b908023-4e25-48ac-b206-9db8854b6d5d.jpg', '2023-10-10T16:04:37.892Z'),
(82, 34, 'Camera10', 'Warning', '1696934078146-frame953e7381-15a5-44df-a07d-2fae9b012b21.jpg', '2023-10-10T16:04:38.211Z'),
(83, 34, 'Camera10', 'Warning', '1696934082530-framee7173a37-2539-41d4-a475-a7f4ca168385.jpg', '2023-10-10T16:04:42.634Z'),
(84, 34, 'Camera10', 'Warning', '1696934087671-frame7e3e2eb0-521c-449b-b77e-2f66f83b0669.jpg', '2023-10-10T16:04:47.744Z'),
(85, 34, 'Camera10', 'Warning', '1696934089098-framea14a83a7-a6b0-4869-bca5-feae91ac8740.jpg', '2023-10-10T16:04:49.200Z'),
(86, 34, 'Camera10', 'Warning', '1696934089176-frame1f482c29-12d9-4bb4-a19e-b5b0571e7017.jpg', '2023-10-10T16:04:49.280Z'),
(87, 34, 'Camera10', 'Warning', '1696934100154-frame8ecbcdd7-eac8-4ae2-a94c-bf60cb8d2388.jpg', '2023-10-10T16:05:00.484Z'),
(88, 34, 'Camera10', 'Warning', '1696934104860-frame107f81da-20a1-4130-a4d9-538d97f0e52f.jpg', '2023-10-10T16:05:04.953Z'),
(89, 34, 'Camera10', 'Warning', '1696934110125-frame3e149815-a18a-4d32-a6de-f232ccd628b0.jpg', '2023-10-10T16:05:10.190Z'),
(90, 34, 'Camera10', 'Warning', '1696934157536-frame30eac511-45ae-479e-a80b-57bc67c936df.jpg', '2023-10-10T16:05:57.618Z'),
(91, 34, 'Camera10', 'Warning', '1696934164212-frame322a8600-9384-4aad-802f-a946e51019f8.jpg', '2023-10-10T16:06:04.271Z'),
(92, 34, 'Camera10', 'Warning', '1696934207344-framea8dfdb75-209c-425b-b6b6-1e4b200f1f42.jpg', '2023-10-10T16:06:47.404Z'),
(93, 34, 'Camera10', 'Warning', '1696934209473-framedb1fb25d-3069-4b87-b244-0eb3b5defdbb.jpg', '2023-10-10T16:06:49.534Z'),
(94, 34, 'Camera10', 'Warning', '1696934211130-frame7ae6c42d-6adb-4156-a0d2-81c026144fac.jpg', '2023-10-10T16:06:51.219Z'),
(95, 34, 'Camera10', 'Warning', '1696934211444-framea70a8157-abc6-48f4-a934-165bb778e4dc.jpg', '2023-10-10T16:06:51.532Z'),
(96, 34, 'Camera10', 'Warning', '1696934212936-framefe745d8a-7f4c-40bc-ae5e-8fc2558f0824.jpg', '2023-10-10T16:06:52.997Z'),
(97, 34, 'Camera10', 'Warning', '1696934214045-framecec28ce5-ffdb-4f9f-a324-abf7dba6bc09.jpg', '2023-10-10T16:06:54.112Z'),
(98, 34, 'Camera10', 'Warning', '1696934214419-frameef784c35-debd-4b0c-86e7-160114ead504.jpg', '2023-10-10T16:06:54.490Z'),
(99, 34, 'Camera10', 'Warning', '1696934215386-frame1456afa3-8a75-4913-9363-0b825edab15b.jpg', '2023-10-10T16:06:55.471Z'),
(100, 34, 'Camera10', 'Warning', '1696934215713-frame57523ce8-c8d9-4efb-806f-aa298efc4f04.jpg', '2023-10-10T16:06:55.779Z'),
(101, 34, 'Camera10', 'Warning', '1696934216875-frame8c21bf77-63c1-482d-bac7-c7cc247b5584.jpg', '2023-10-10T16:06:56.946Z'),
(102, 34, 'Camera10', 'Warning', '1696934217352-framed9c64531-e0d8-4ee1-a3eb-347816879ac0.jpg', '2023-10-10T16:06:57.439Z'),
(103, 34, 'Camera10', 'Warning', '1696934218785-framee8d61dbb-8cef-4626-bb14-dd6373088e38.jpg', '2023-10-10T16:06:58.857Z'),
(104, 34, 'Camera10', 'Warning', '1696934220320-frame9b064526-d385-4174-96bf-fed1b4efe853.jpg', '2023-10-10T16:07:00.398Z'),
(105, 34, 'Camera11', 'Warning', '1696934241839-framead0e6348-95d7-4922-a276-14e057d8911b.jpg', '2023-10-10T16:07:21.921Z'),
(106, 34, 'Camera11', 'Warning', '1696934247232-frame8dd6bc73-5bd8-4c9b-94eb-fe653371087c.jpg', '2023-10-10T16:07:27.312Z'),
(107, 34, 'Camera11', 'Warning', '1696934261429-framec19669d0-c52e-448c-a95e-a2842de12f7a.jpg', '2023-10-10T16:07:41.488Z'),
(108, 34, 'Camera11', 'Warning', '1696934266280-frameb547fbcb-71a5-4694-8645-7f99d54a7502.jpg', '2023-10-10T16:07:46.331Z'),
(109, 34, 'Camera10', 'Warning', '1696934267557-framed9bae84d-3c04-450d-a8c2-20312e11648e.jpg', '2023-10-10T16:07:47.701Z'),
(110, 34, 'Camera10', 'Warning', '1696934269669-frame06e24dd0-e693-4fe1-b4ce-23de2c7ae6d7.jpg', '2023-10-10T16:07:49.728Z'),
(111, 34, 'Camera10', 'Warning', '1696934270596-framec4a75fc1-1312-4cef-afd5-5daa550d7b66.jpg', '2023-10-10T16:07:50.662Z'),
(112, 34, 'Camera10', 'Warning', '1696934271574-framefc614c7e-97f7-4e47-9e07-7def793d278c.jpg', '2023-10-10T16:07:51.650Z'),
(113, 34, 'Camera10', 'Warning', '1696934274268-framecaddb0b2-7fa6-4ae8-9ef4-f66a8d5db78e.jpg', '2023-10-10T16:07:54.339Z'),
(114, 34, 'Camera10', 'Warning', '1696934275397-frame67c772e8-13e1-4e1f-9d9f-f7d6261f911c.jpg', '2023-10-10T16:07:55.477Z'),
(115, 34, 'Camera10', 'Warning', '1696934277046-frameedc4c65c-4aa8-40f6-b6f1-b77a63fdf10d.jpg', '2023-10-10T16:07:57.112Z'),
(116, 34, 'Camera10', 'Warning', '1696934278554-frame6117ccda-6533-441a-8926-2a4ab3c3837e.jpg', '2023-10-10T16:07:58.617Z'),
(117, 34, 'Camera10', 'Warning', '1696934279205-frame8357ffbe-6890-4b3b-b001-8fd3587963e0.jpg', '2023-10-10T16:07:59.278Z'),
(118, 34, 'Camera10', 'Warning', '1696934279891-framecaf23c7e-c596-4c05-8818-43d03dfd5894.jpg', '2023-10-10T16:08:00.041Z'),
(119, 34, 'Camera10', 'Warning', '1696934331373-frame509de7a3-7681-4f47-bb0b-c9ad2ab886d7.jpg', '2023-10-10T16:08:51.432Z'),
(120, 34, 'Camera10', 'Warning', '1696934335506-frame9911eb95-0a20-4ed2-8a33-cfb5c53f7610.jpg', '2023-10-10T16:08:55.584Z'),
(121, 34, 'Camera10', 'Warning', '1696934335537-frame99a9199f-a72f-4d36-8289-ad255a6d11a1.jpg', '2023-10-10T16:08:55.606Z'),
(122, 34, 'Camera10', 'Warning', '1696934336530-frame4e7aa2db-3d59-48e8-91b0-1934f8f71f61.jpg', '2023-10-10T16:08:56.602Z'),
(123, 34, 'Camera10', 'Warning', '1696934336819-frame1efcd76c-09d7-46de-80b1-62c7c5bdba17.jpg', '2023-10-10T16:08:56.890Z'),
(124, 34, 'Camera10', 'Warning', '1696934340353-frame7b4fb045-ebdb-4299-95e7-5f3727e444d7.jpg', '2023-10-10T16:09:00.428Z'),
(125, 34, 'Camera10', 'Warning', '1696934340414-frame8c69d3f8-83a8-4603-9d68-be1372b2085f.jpg', '2023-10-10T16:09:00.476Z'),
(126, 34, 'Camera10', 'Warning', '1696934340983-frame63033338-b52d-4995-8921-3ea93606bd34.jpg', '2023-10-10T16:09:01.042Z'),
(127, 34, 'Camera10', 'Warning', '1696934341283-frame0798e2af-d9d1-42b1-9835-270e41b8de83.jpg', '2023-10-10T16:09:01.348Z'),
(128, 34, 'Camera10', 'Warning', '1696934342046-frameb998a463-92ca-400a-a7fa-1fa764ff20f6.jpg', '2023-10-10T16:09:02.118Z'),
(129, 34, 'Camera10', 'Warning', '1696934343362-frame9b7dc436-028a-4c44-8883-71f0afb00d96.jpg', '2023-10-10T16:09:03.431Z'),
(130, 34, 'Camera10', 'Warning', '1696934343861-frame70da7773-e98f-40ac-b42b-be485f006219.jpg', '2023-10-10T16:09:03.930Z'),
(131, 34, 'Camera10', 'Warning', '1696934345354-frame9c98b46a-36fd-4512-8bfa-75ba79a2125d.jpg', '2023-10-10T16:09:05.417Z'),
(132, 34, 'Camera10', 'Warning', '1696934346717-frame731d1bf1-6573-477c-bd68-74a96a5d5a88.jpg', '2023-10-10T16:09:06.779Z'),
(133, 34, 'Camera10', 'Warning', '1696934348633-frame2465334a-395c-4460-b642-c6c47f8450c7.jpg', '2023-10-10T16:09:08.701Z'),
(134, 34, 'Camera10', 'Warning', '1696934349158-frame4c1cbb49-a7f5-447f-a83f-541b4190550b.jpg', '2023-10-10T16:09:09.229Z'),
(135, 34, 'Camera10', 'Warning', '1696934350602-framea8070406-b362-46d7-82ba-71a14d87a58a.jpg', '2023-10-10T16:09:10.675Z'),
(136, 34, 'Camera10', 'Warning', '1696934351153-frame739f93a4-1573-4613-beee-41cfdef79841.jpg', '2023-10-10T16:09:11.227Z'),
(137, 34, 'Camera10', 'Warning', '1696934352061-frameb29652a0-e901-4758-856a-bc72adf887e8.jpg', '2023-10-10T16:09:12.121Z'),
(138, 34, 'Camera10', 'Warning', '1696934353763-framee2786725-0ac3-44ce-8b1c-858960e8fb68.jpg', '2023-10-10T16:09:13.827Z'),
(139, 34, 'Camera10', 'Warning', '1696934354185-framec1e73688-3a0a-4632-8d36-5b139382fd5e.jpg', '2023-10-10T16:09:14.246Z'),
(140, 34, 'Camera10', 'Warning', '1696934354378-frame47cde824-ad45-4617-ab02-482d45aa1df0.jpg', '2023-10-10T16:09:14.444Z'),
(141, 34, 'Camera10', 'Warning', '1696934355686-frameefde4cb1-3759-4a3d-ab1d-85904c6113ad.jpg', '2023-10-10T16:09:15.744Z'),
(142, 34, 'Camera10', 'Warning', '1696934356413-frameddee936f-5297-49b6-9002-eedaa653a033.jpg', '2023-10-10T16:09:16.485Z'),
(143, 34, 'Camera10', 'Warning', '1696934411070-frame49a379dd-0228-43d4-a5d4-d98b52e97cfc.jpg', '2023-10-10T16:10:11.123Z'),
(144, 34, 'Camera10', 'Warning', '1696934411396-frame0295a0ba-fcb0-49b2-8922-292963f5096d.jpg', '2023-10-10T16:10:11.456Z'),
(145, 34, 'Camera10', 'Warning', '1696934414499-frame9ca332df-02b6-49dc-9c09-6aee2ab438b7.jpg', '2023-10-10T16:10:14.575Z'),
(146, 34, 'Camera10', 'Warning', '1696934414804-frameb3e1e03a-ea8f-4c87-986d-3edd57fca6d0.jpg', '2023-10-10T16:10:14.888Z'),
(147, 34, 'Camera10', 'Warning', '1696934416031-frame7fff4c3a-bcb3-41fe-81d9-8310a7c40f7e.jpg', '2023-10-10T16:10:16.103Z'),
(148, 34, 'Camera10', 'Warning', '1696934417069-frame5f8099fc-5ad7-48b3-b2d9-a78b1358f7fd.jpg', '2023-10-10T16:10:17.176Z'),
(149, 34, 'Camera10', 'Warning', '1696934465655-frame53379506-be36-48a5-bb3b-17fd6584b1fe.jpg', '2023-10-10T16:11:05.737Z'),
(150, 34, 'Camera10', 'Warning', '1696934466402-frame2b9f2c6c-9971-40f3-9f92-2f4c36656098.jpg', '2023-10-10T16:11:06.460Z'),
(151, 34, 'Camera10', 'Warning', '1696934472428-frame8c87e83e-4d52-4a78-90e4-e1fd6458c812.jpg', '2023-10-10T16:11:12.493Z'),
(152, 34, 'Camera11', 'Warning', '1696934475704-frame0380555a-404d-4bcb-ae19-db1c40151d32.jpg', '2023-10-10T16:11:15.782Z'),
(153, 34, 'Camera11', 'Warning', '1696934477377-frame952f7249-7340-434e-9b59-5f32a62eb07b.jpg', '2023-10-10T16:11:17.438Z'),
(154, 34, 'Camera10', 'Warning', '1696934521628-frame98562b8a-1512-4a07-ab10-c54a194a7d99.jpg', '2023-10-10T16:12:01.690Z'),
(155, 34, 'Camera10', 'Warning', '1696934521910-framec49f8699-5854-4279-b02b-357093a30abc.jpg', '2023-10-10T16:12:01.962Z'),
(156, 34, 'Camera10', 'Warning', '1696934524970-framed96533a6-af6d-4a74-96a5-4c9abd21d7d0.jpg', '2023-10-10T16:12:05.038Z'),
(157, 34, 'Camera10', 'Warning', '1696934526636-frame3ac2cee4-9eec-4edc-bb5c-6012325c12c2.jpg', '2023-10-10T16:12:06.716Z'),
(158, 34, 'Camera10', 'Warning', '1696934533871-frame026d5122-64d3-46dd-aaf1-1f01c2860b33.jpg', '2023-10-10T16:12:13.952Z'),
(159, 34, 'Camera10', 'Warning', '1696934534936-framefe2497df-64b2-416c-97ae-13ee04f12812.jpg', '2023-10-10T16:12:14.999Z'),
(160, 34, 'Camera10', 'Warning', '1696934586620-frameb4cf9b0a-e117-4c6d-8010-85307d22caee.jpg', '2023-10-10T16:13:06.715Z'),
(161, 34, 'Camera10', 'Warning', '1696934590994-frame7b45fd5a-feae-4001-b91c-013ed199f52d.jpg', '2023-10-10T16:13:11.072Z'),
(162, 34, 'Camera10', 'Warning', '1696934591888-frame1a7132d9-0cc1-47be-8ddb-49bc770e21e3.jpg', '2023-10-10T16:13:11.962Z'),
(163, 34, 'Camera11', 'Warning', '1696934592654-frame4bed92dd-9f0b-4149-b82b-e6a795dfa946.jpg', '2023-10-10T16:13:12.732Z'),
(164, 34, 'Camera10', 'Warning', '1696934594825-frameaa94d5cc-b789-4bf9-852f-7096017424a4.jpg', '2023-10-10T16:13:14.898Z'),
(165, 34, 'Camera10', 'Warning', '1696934597186-frame77b273e9-a674-40ca-b814-0069e1ba4671.jpg', '2023-10-10T16:13:17.285Z'),
(166, 34, 'Camera10', 'Warning', '1696934598996-framed67b55ae-4559-494d-84dd-88f0b3a22d7c.jpg', '2023-10-10T16:13:19.086Z'),
(167, 34, 'Camera10', 'Warning', '1696934610544-frame27451cc7-7fc6-4c39-8936-3562beaeb2c0.jpg', '2023-10-10T16:13:30.629Z'),
(168, 34, 'Camera10', 'Warning', '1696934610606-frame6b6f6e3e-63d0-44ec-9d05-5a381cfe2a8d.jpg', '2023-10-10T16:13:30.787Z'),
(169, 34, 'Camera10', 'Warning', '1696934611600-frame249c57f3-230c-4951-97b0-6bc403f2c29c.jpg', '2023-10-10T16:13:31.685Z'),
(170, 34, 'Camera10', 'Warning', '1696934611736-frame8dfca46e-4259-4b7b-a365-db6b9e3a8b23.jpg', '2023-10-10T16:13:31.821Z'),
(171, 34, 'Camera10', 'Warning', '1696934612812-frame3675b415-c749-4ffd-b1ae-632d274be55c.jpg', '2023-10-10T16:13:32.880Z'),
(172, 34, 'Camera10', 'Warning', '1696934614480-framed9ef364a-9c83-412c-b741-c807bb0720cc.jpg', '2023-10-10T16:13:34.563Z'),
(173, 34, 'Camera10', 'Warning', '1696934615773-frameee3e58d6-67c9-43d7-8953-e99781dce0ae.jpg', '2023-10-10T16:13:35.873Z'),
(174, 34, 'Camera10', 'Warning', '1696934616834-frame9738e28e-7b89-4432-8260-2cc0f39eb5bd.jpg', '2023-10-10T16:13:36.916Z'),
(175, 34, 'Camera10', 'Warning', '1696934617665-framef39259c6-366c-4b60-83aa-9bb503bb8201.jpg', '2023-10-10T16:13:37.740Z'),
(176, 34, 'Camera10', 'Warning', '1696934618004-frame2b67a764-053c-4f6b-8d98-47b676b570df.jpg', '2023-10-10T16:13:38.103Z'),
(177, 34, 'Camera10', 'Warning', '1696934618233-frame436c83ae-15de-4df4-8cb7-837bc741d160.jpg', '2023-10-10T16:13:38.301Z'),
(178, 34, 'Camera10', 'Warning', '1696934619968-framec7c3c3e1-590d-455a-8eda-d0aa2663e68e.jpg', '2023-10-10T16:13:40.055Z'),
(179, 34, 'Camera11', 'Warning', '1696934667951-frame6c40801e-c411-4224-b316-1aa9c3cc5030.jpg', '2023-10-10T16:14:28.091Z'),
(180, 34, 'Camera10', 'Warning', '1696934667962-framea9a54056-64a2-48b2-8cd2-4712966f20d5.jpg', '2023-10-10T16:14:28.104Z'),
(181, 34, 'Camera10', 'Warning', '1696934672957-framec86c4b39-f60a-4f68-8297-1e92df3484f2.jpg', '2023-10-10T16:14:33.024Z'),
(182, 34, 'Camera10', 'Warning', '1696934673298-frame00b197a6-e34c-4a58-93fc-9bd1c54bffdb.jpg', '2023-10-10T16:14:33.356Z'),
(183, 34, 'Camera10', 'Warning', '1696934674121-framef1fe5851-45e8-4670-8348-ac9971e14a91.jpg', '2023-10-10T16:14:34.203Z'),
(184, 34, 'Camera10', 'Warning', '1696934674441-frame56683a9c-ea38-4448-8723-68f42534c991.jpg', '2023-10-10T16:14:34.502Z'),
(185, 34, 'Camera10', 'Warning', '1696934681328-frame4bf09539-d0d7-477e-986b-324bee3c976d.jpg', '2023-10-10T16:14:41.390Z'),
(186, 34, 'Camera10', 'Warning', '1696934683642-frame4d8dfed0-a5f3-49f4-a9f2-5a6f261fc9c5.jpg', '2023-10-10T16:14:43.702Z'),
(187, 34, 'Camera10', 'Warning', '1696934683914-frame0cbb393f-70f0-407f-ad48-dd242e1d1cea.jpg', '2023-10-10T16:14:43.989Z'),
(188, 34, 'Camera10', 'Warning', '1696934689060-frame85b990fd-242a-45e5-8ab2-f99c8712037b.jpg', '2023-10-10T16:14:49.132Z'),
(189, 34, 'Camera10', 'Warning', '1696934689798-frameabc3e725-4eff-4362-8add-cf5599e90e4e.jpg', '2023-10-10T16:14:49.868Z'),
(190, 34, 'Camera10', 'Warning', '1696934716385-framef8a12066-e436-4ab4-958b-02c5feffb9ae.jpg', '2023-10-10T16:15:16.448Z'),
(191, 34, 'Camera10', 'Warning', '1696934717367-frame69c890fb-c095-4cfa-9e0b-280065cffb40.jpg', '2023-10-10T16:15:17.473Z'),
(192, 34, 'Camera10', 'Warning', '1696934720849-frame9e08df69-5964-4563-b4b8-9c12a02f51fa.jpg', '2023-10-10T16:15:20.929Z'),
(193, 34, 'Camera10', 'Warning', '1696934721147-framed39df6d4-a692-4bbb-94be-c7c76e54fe75.jpg', '2023-10-10T16:15:21.219Z'),
(194, 34, 'Camera10', 'Warning', '1696934722390-framee4ecc038-fc18-44de-aeb3-9cadce05814d.jpg', '2023-10-10T16:15:22.459Z'),
(195, 34, 'Camera10', 'Warning', '1696934725508-frame89582f77-2753-4045-98d2-31a5724968a5.jpg', '2023-10-10T16:15:25.575Z'),
(196, 34, 'Camera10', 'Warning', '1696934777789-frame0caa87a3-fe56-4fd6-bb56-484d62ffe35e.jpg', '2023-10-10T16:16:17.865Z'),
(197, 34, 'Camera10', 'Warning', '1696934783865-frame442801e7-356e-4bc4-982c-3619c40de497.jpg', '2023-10-10T16:16:23.929Z'),
(198, 34, 'Camera10', 'Warning', '1696934789157-frame09aa040a-05f1-4e19-a371-1dae088ac781.jpg', '2023-10-10T16:16:29.221Z'),
(199, 34, 'Camera10', 'Warning', '1696934790073-frame01be2cae-3719-40f2-8994-84fc9d26dd42.jpg', '2023-10-10T16:16:30.167Z'),
(200, 34, 'Camera10', 'Warning', '1696934795706-frame0e0ff53c-0d87-4f72-b4f4-387261017ca2.jpg', '2023-10-10T16:16:35.767Z'),
(201, 34, 'Camera10', 'Warning', '1696934843303-frameb521876f-f813-4c6c-8edc-e1f5ef2ea5e7.jpg', '2023-10-10T16:17:23.375Z'),
(202, 34, 'Camera10', 'Warning', '1696934844250-framef82149a0-69ca-4507-b920-4cba383daad8.jpg', '2023-10-10T16:17:24.320Z'),
(203, 34, 'Camera10', 'Warning', '1696934848193-frame203a6307-982c-4cea-84dd-5db67c72b3ca.jpg', '2023-10-10T16:17:28.264Z'),
(204, 34, 'Camera10', 'Warning', '1696934848277-framedb0d0ae2-ffa0-43c8-9f34-4c2fe4c2f868.jpg', '2023-10-10T16:17:28.339Z'),
(205, 34, 'Camera10', 'Warning', '1696934867244-frameaa049932-6fd3-4389-8da8-bb35bcf33bd1.jpg', '2023-10-10T16:17:47.317Z'),
(206, 34, 'Camera10', 'Warning', '1696934867322-framebc7c3775-a8f7-40c5-b9aa-c0eed83617ff.jpg', '2023-10-10T16:17:47.397Z'),
(207, 34, 'Camera10', 'Warning', '1696934871852-frame44bed55b-048f-447f-a9db-9149687d2e52.jpg', '2023-10-10T16:17:51.935Z'),
(208, 34, 'Camera10', 'Warning', '1696934875896-frame2de480c3-7fe3-4fca-9fff-b357df30787f.jpg', '2023-10-10T16:17:55.958Z'),
(209, 34, 'Camera11', 'Warning', '1696934921909-frame44c20cda-99bd-4d39-80cb-9d2fee16e4f1.jpg', '2023-10-10T16:18:41.968Z'),
(210, 34, 'Camera10', 'Warning', '1696934924255-framec5d47ce5-9ebd-48d7-a057-e872f2916fb4.jpg', '2023-10-10T16:18:44.321Z'),
(211, 34, 'Camera10', 'Warning', '1696934927601-framecf370cc3-533f-466f-8eac-2dd9c7b70513.jpg', '2023-10-10T16:18:47.676Z'),
(212, 34, 'Camera10', 'Warning', '1696934970481-frameaacd0a0d-a12d-4c57-84df-a52e5affb129.jpg', '2023-10-10T16:19:30.547Z'),
(213, 34, 'Camera10', 'Warning', '1696934978055-frame1aab3e57-e778-4745-891a-ccf3fc82c76e.jpg', '2023-10-10T16:19:38.202Z'),
(214, 34, 'Camera10', 'Warning', '1696934978448-framed7f9ec13-cdd6-403f-b038-989ff16e5fd6.jpg', '2023-10-10T16:19:38.516Z'),
(215, 34, 'Camera10', 'Warning', '1696934980085-frame02c9713d-1355-4c69-9a88-4d28a4073a7a.jpg', '2023-10-10T16:19:40.144Z'),
(216, 34, 'Camera11', 'Warning', '1696934991227-frame3764bf95-9e8f-47bb-bafa-f6cf9e42834f.jpg', '2023-10-10T16:19:51.336Z'),
(217, 34, 'Camera11', 'Warning', '1696934997202-framebc846eb3-369c-4a03-a5a8-8a66ddcc3afd.jpg', '2023-10-10T16:19:57.271Z'),
(218, 34, 'Camera11', 'Warning', '1696935004222-frame2592131b-eceb-4b7f-83ca-088c7f2a62ed.jpg', '2023-10-10T16:20:04.299Z'),
(219, 34, 'Camera11', 'Warning', '1696935006099-frame97048875-66a3-4a9e-b855-7274676966ef.jpg', '2023-10-10T16:20:06.170Z'),
(220, 34, 'Camera10', 'Warning', '1696935032980-frame7feee7fa-266b-4de3-af73-3b67cd334d1d.jpg', '2023-10-10T16:20:33.047Z'),
(221, 34, 'Camera10', 'Warning', '1696935033694-frame7510f34d-db64-4854-b612-7ac12e0811bc.jpg', '2023-10-10T16:20:33.761Z'),
(222, 34, 'Camera10', 'Warning', '1696935040675-frame227ece9e-6a67-4fbf-9d4a-2f08500f1f3e.jpg', '2023-10-10T16:20:40.793Z'),
(223, 34, 'Camera10', 'Warning', '1696935040880-frame19c0ddd8-cfa2-46dc-ab5a-18d7c277ce08.jpg', '2023-10-10T16:20:40.974Z'),
(224, 34, 'Camera10', 'Warning', '1696935042423-framea873bd15-7398-45f3-9863-90d2be47789f.jpg', '2023-10-10T16:20:42.507Z'),
(225, 34, 'Camera10', 'Warning', '1696935046563-frame7cd78c71-4f13-4dc2-81f6-ccf39691f8c2.jpg', '2023-10-10T16:20:46.621Z'),
(226, 34, 'Camera11', 'Warning', '1696935175294-frame5d5a1528-00f5-42f1-8590-349d67d0c55e.jpg', '2023-10-10T16:22:55.391Z'),
(227, 34, 'Camera10', 'Warning', '1696935175294-frame6938daab-ca7b-4faa-b500-8398e71cf86c.jpg', '2023-10-10T16:22:55.394Z'),
(228, 34, 'Camera10', 'Warning', '1696935175656-framed3bf4ccf-cfb2-4e32-9791-cf29dee2d627.jpg', '2023-10-10T16:22:55.719Z'),
(229, 34, 'Camera10', 'Warning', '1696935179154-frame4cdf0315-f113-4b99-93e8-f741083740a4.jpg', '2023-10-10T16:22:59.215Z'),
(230, 34, 'Camera10', 'Warning', '1696935179452-frame8bd3359b-0743-4dda-97ab-719dc416b1a9.jpg', '2023-10-10T16:22:59.514Z'),
(231, 34, 'Camera10', 'Warning', '1696935183880-frame916ed923-9e77-4b2b-8178-1c29cd0fd2e0.jpg', '2023-10-10T16:23:03.960Z'),
(232, 34, 'Camera10', 'Warning', '1696935185640-framec598c227-c7f4-4815-810f-6104db0e22a7.jpg', '2023-10-10T16:23:05.701Z'),
(233, 34, 'Camera10', 'Warning', '1696935185983-frame225f9f2d-2d36-430d-a65a-d4dd87d6c0de.jpg', '2023-10-10T16:23:06.057Z'),
(234, 34, 'Camera10', 'Warning', '1696935227867-frame701d4ed1-96f7-4b66-b424-3f652706cd2a.jpg', '2023-10-10T16:23:48.010Z'),
(235, 34, 'Camera10', 'Warning', '1696935228935-frame9591f697-762d-46b3-8172-da253b0743c7.jpg', '2023-10-10T16:23:48.995Z'),
(236, 34, 'Camera10', 'Warning', '1696935231000-frame11f21582-e595-474c-8ab0-40530f6d9f25.jpg', '2023-10-10T16:23:51.056Z'),
(237, 34, 'Camera10', 'Warning', '1696935234833-framea2513bdf-d466-4715-b9aa-32da0e79fc8e.jpg', '2023-10-10T16:23:55.012Z'),
(238, 34, 'Camera10', 'Warning', '1696935236161-framea5999ad3-0267-4b4a-a2f5-69abc739f250.jpg', '2023-10-10T16:23:56.342Z'),
(239, 34, 'Camera10', 'Warning', '1696935237644-frame77532390-611f-4264-a45a-908b2bf0c468.jpg', '2023-10-10T16:23:57.744Z'),
(240, 34, 'Camera10', 'Warning', '1696935239489-frame1967a0bc-2da6-4489-b403-3d1d75f34e62.jpg', '2023-10-10T16:23:59.586Z'),
(241, 34, 'Camera10', 'Warning', '1696935240454-frame44f92539-af39-486f-9dc1-f41f788c3a9e.jpg', '2023-10-10T16:24:00.572Z'),
(242, 34, 'Camera10', 'Warning', '1696935242719-frame62dcceda-eecf-4142-ac99-c63e5ffbac55.jpg', '2023-10-10T16:24:02.819Z'),
(243, 34, 'Camera10', 'Warning', '1696935243522-frame16a85761-da61-44c8-b893-7efda38b1592.jpg', '2023-10-10T16:24:03.643Z'),
(244, 34, 'Camera10', 'Warning', '1696935243887-frame6dc9a1bd-eda9-427e-94e2-09615fdd4439.jpg', '2023-10-10T16:24:03.992Z'),
(245, 34, 'Camera10', 'Warning', '1696935247196-framee2e64a57-69c6-49fe-8f79-31c419b1c359.jpg', '2023-10-10T16:24:07.337Z'),
(246, 34, 'Camera10', 'Warning', '1696935247563-frameadbbabfe-eb7e-4021-96b1-eae76c385ec4.jpg', '2023-10-10T16:24:07.697Z'),
(247, 34, 'Camera11', 'Warning', '1696935249146-framee160a14e-28a1-448a-9dee-7312275dcec1.jpg', '2023-10-10T16:24:09.354Z'),
(248, 34, 'Camera10', 'Warning', '1696935286219-framefbbe4161-6403-41d1-bce5-56571cd529fe.jpg', '2023-10-10T16:24:46.288Z'),
(249, 34, 'Camera10', 'Warning', '1696935286563-frame3d29fe77-a2a9-42a8-ad8d-fb4fd5a5b413.jpg', '2023-10-10T16:24:46.662Z'),
(250, 34, 'Camera10', 'Warning', '1696935286814-frame2cb0a590-5834-4d4f-babe-e75526e00b2f.jpg', '2023-10-10T16:24:46.921Z'),
(251, 34, 'Camera10', 'Warning', '1696935291101-frameefb4ffc5-a316-4cfd-aaa2-897e7f830e0e.jpg', '2023-10-10T16:24:51.200Z'),
(252, 34, 'Camera10', 'Warning', '1696935295050-frame91a64c51-74bc-4f57-bd7f-e70662f9d2f0.jpg', '2023-10-10T16:24:55.124Z'),
(253, 34, 'Camera10', 'Warning', '1696935296028-frame8dd13e0e-8bf6-4694-a533-75fbac550f52.jpg', '2023-10-10T16:24:56.101Z'),
(254, 34, 'Camera10', 'Warning', '1696935300403-frame9d28f896-aa4f-46b5-9cb3-b201a0e3ccdb.jpg', '2023-10-10T16:25:00.466Z'),
(255, 34, 'Camera10', 'Warning', '1696935301017-frame2d1110ed-2840-4c90-af20-5162ed8e3182.jpg', '2023-10-10T16:25:01.076Z'),
(256, 34, 'Camera10', 'Warning', '1696935304852-frame2f697ec0-eb5b-490e-a410-16f287eadedf.jpg', '2023-10-10T16:25:04.971Z'),
(257, 34, 'Camera10', 'Warning', '1696935352974-frame902c4d90-9d3f-410d-bc6c-9e5ecccc7ec1.jpg', '2023-10-10T16:25:53.032Z'),
(258, 34, 'Camera10', 'Warning', '1696935353869-frame606a918a-6687-4c99-ac61-f23566091630.jpg', '2023-10-10T16:25:53.925Z'),
(259, 34, 'Camera10', 'Warning', '1696935358508-frame48a3a6b5-f6eb-4770-9247-06b8d0f6b62a.jpg', '2023-10-10T16:25:58.575Z'),
(260, 34, 'Camera10', 'Warning', '1696935360166-frame04d0a730-4cb1-40f9-8fc9-05edeef7b2c3.jpg', '2023-10-10T16:26:00.242Z'),
(261, 34, 'Camera10', 'Warning', '1696935362677-frame81e9f6ca-2bdb-4d1f-a2d6-3b7c810b3e6a.jpg', '2023-10-10T16:26:02.742Z'),
(262, 34, 'Camera10', 'Warning', '1696935364914-frameff88c6e9-8149-4daf-a839-389a830ce6d6.jpg', '2023-10-10T16:26:04.977Z'),
(263, 34, 'Camera10', 'Warning', '1696935369678-frame1db8663c-0e38-4a3d-8f9c-cda5806e7e05.jpg', '2023-10-10T16:26:09.770Z'),
(264, 34, 'Camera10', 'Warning', '1696935370426-frame14cab137-c571-467a-a3c9-77ef3a13fc76.jpg', '2023-10-10T16:26:10.511Z'),
(265, 34, 'Camera10', 'Warning', '1696935373245-frame3760b546-f547-476d-a2fa-3c292557e09d.jpg', '2023-10-10T16:26:13.343Z'),
(266, 34, 'Camera10', 'Warning', '1696935373409-framef4bbda56-b267-4a0b-b666-cee5f5161ed1.jpg', '2023-10-10T16:26:13.484Z'),
(267, 34, 'Camera10', 'Warning', '1696935376403-frameb3e6f93c-1409-4515-a354-49621dc44826.jpg', '2023-10-10T16:26:16.456Z'),
(268, 34, 'Camera10', 'Warning', '1696935376454-frame3ee19a7d-dc12-4820-80f8-610e010db364.jpg', '2023-10-10T16:26:16.516Z'),
(269, 34, 'Camera10', 'Warning', '1696935378133-frame96f9b8e1-277a-43ed-9067-5030d541ed8d.jpg', '2023-10-10T16:26:18.252Z'),
(270, 34, 'Camera10', 'Warning', '1696935378180-framecb76ede8-87c1-4a73-b982-c964c932d081.jpg', '2023-10-10T16:26:18.264Z'),
(271, 34, 'Camera10', 'Warning', '1696935378953-framefca7c0d5-21b6-4638-be43-427806d8cdc4.jpg', '2023-10-10T16:26:19.079Z'),
(272, 34, 'Camera10', 'Warning', '1696935379512-frame93f3b43e-6715-43eb-ad0c-551da9466e53.jpg', '2023-10-10T16:26:19.583Z'),
(273, 34, 'Camera10', 'Warning', '1696935379631-frameec482300-99f0-4d2a-b212-a4e34b50244f.jpg', '2023-10-10T16:26:19.702Z'),
(274, 34, 'Camera10', 'Warning', '1696935382635-frame88a6be7e-8fc2-4d48-b30f-035905717ce8.jpg', '2023-10-10T16:26:22.689Z'),
(275, 34, 'Camera10', 'Warning', '1696935430276-framed21e715a-e3fa-4d93-81a5-f0c43ea03ca4.jpg', '2023-10-10T16:27:10.326Z'),
(276, 34, 'Camera10', 'Warning', '1696935433827-frameb6592209-b18a-40d3-8bfe-03385d14e05d.jpg', '2023-10-10T16:27:13.893Z'),
(277, 34, 'Camera10', 'Warning', '1696935434693-frame4540debe-4248-47d9-9e6a-2dc1085a4973.jpg', '2023-10-10T16:27:14.760Z'),
(278, 34, 'Camera10', 'Warning', '1696935478319-frame2150d49c-f6d5-4dbf-b16c-835ef12fcfed.jpg', '2023-10-10T16:27:58.396Z'),
(279, 34, 'Camera10', 'Warning', '1696935482889-frame53619f64-f770-4591-978f-a8bdaf0ac3de.jpg', '2023-10-10T16:28:02.968Z'),
(280, 34, 'Camera10', 'Warning', '1696935484090-frame480a0e4b-d2f7-408b-a2eb-d9f1244f5a94.jpg', '2023-10-10T16:28:04.160Z'),
(281, 34, 'Camera10', 'Warning', '1696935486845-frame2bf5380f-f839-4d98-899c-85efb609e633.jpg', '2023-10-10T16:28:06.945Z'),
(282, 34, 'Camera10', 'Warning', '1696935487860-frame76a15c8d-191c-4686-9dcf-24254908b709.jpg', '2023-10-10T16:28:07.936Z'),
(283, 34, 'Camera10', 'Warning', '1696935489022-frame99ec76b3-134a-4689-957a-4fefd7365df3.jpg', '2023-10-10T16:28:09.084Z'),
(284, 34, 'Camera10', 'Warning', '1696935492017-frame47bbc010-52a3-49fa-98de-1c94c49d3282.jpg', '2023-10-10T16:28:12.136Z'),
(285, 34, 'Camera10', 'Warning', '1696935492619-frame3d7f4bc6-d01f-444c-830a-726000457025.jpg', '2023-10-10T16:28:12.687Z'),
(286, 34, 'Camera10', 'Warning', '1696935540981-frame0c20724e-5dea-4ae0-913f-971b454a5246.jpg', '2023-10-10T16:29:01.071Z'),
(287, 34, 'Camera10', 'Warning', '1696935541792-frame6f880367-35a5-4dc7-bd4d-dabe03a7aa6c.jpg', '2023-10-10T16:29:01.932Z'),
(288, 34, 'Camera10', 'Warning', '1696935544797-framec1ba964b-bb29-4e74-8c6a-785dd839aaa7.jpg', '2023-10-10T16:29:04.928Z'),
(289, 34, 'Camera10', 'Warning', '1696935544823-frame68cfa0b2-ec9f-43f2-b753-73dc2d0dbebe.jpg', '2023-10-10T16:29:04.944Z'),
(290, 34, 'Camera10', 'Warning', '1696935549825-frame146f5740-a6f2-4654-830f-5d085c1f68c8.jpg', '2023-10-10T16:29:09.933Z'),
(291, 34, 'Camera10', 'Warning', '1696935549837-framedbab092a-f0a7-4fe5-8501-557d9af451ff.jpg', '2023-10-10T16:29:09.942Z'),
(292, 34, 'Camera10', 'Warning', '1696935550740-framed0372575-0e89-4f69-8bd5-610e1f935be9.jpg', '2023-10-10T16:29:10.824Z'),
(293, 34, 'Camera10', 'Warning', '1696935550568-frame154be3d1-acff-4525-856b-74cd61f0eb93.jpg', '2023-10-10T16:29:11.137Z'),
(294, 34, 'Camera10', 'Warning', '1696935552247-frame264cc296-c779-4f82-8569-cdfa04720504.jpg', '2023-10-10T16:29:12.334Z'),
(295, 34, 'Camera10', 'Warning', '1696935554957-frame363f87ad-0080-4933-b10b-11e37c893977.jpg', '2023-10-10T16:29:15.100Z'),
(296, 34, 'Camera10', 'Warning', '1696935555060-frame9e8ea25f-c9c7-474a-8c7c-9ef77eade6a4.jpg', '2023-10-10T16:29:15.129Z'),
(297, 34, 'Camera10', 'Warning', '1696935557095-frame404659ed-c84d-490d-b604-e3db3202d773.jpg', '2023-10-10T16:29:17.168Z'),
(298, 34, 'Camera10', 'Warning', '1696935563161-framea64dcf74-a8da-4e6c-aea4-d8d7b8439ec2.jpg', '2023-10-10T16:29:23.220Z'),
(299, 34, 'Camera10', 'Warning', '1696935606366-frame45dfbfd3-a860-452e-8124-0971bdc314c9.jpg', '2023-10-10T16:30:06.431Z'),
(300, 34, 'Camera10', 'Warning', '1696935611085-frame1d59a6d8-3442-4ed6-91ad-4e561c5aed25.jpg', '2023-10-10T16:30:11.160Z'),
(301, 34, 'Camera10', 'Warning', '1696935611152-frame07d305f8-ae76-4830-9091-4b7b1c9cf396.jpg', '2023-10-10T16:30:11.228Z'),
(302, 34, 'Camera10', 'Warning', '1696935616462-frame615812e9-11fe-43a0-81da-48bf0a0f07d2.jpg', '2023-10-10T16:30:16.538Z'),
(303, 34, 'Camera10', 'Warning', '1696935622667-frameeacb606a-bfc0-4aab-aa5d-f53025a4cabe.jpg', '2023-10-10T16:30:22.734Z'),
(304, 34, 'Camera10', 'Warning', '1696935623529-frameb5eb4391-54d5-4fdb-9e2c-340f35d58148.jpg', '2023-10-10T16:30:23.609Z'),
(305, 34, 'Camera10', 'Warning', '1696935629633-framea7753c24-1034-4dad-b323-1f91bf51f1ae.jpg', '2023-10-10T16:30:29.709Z'),
(306, 34, 'Camera10', 'Warning', '1696935630259-frame6591c326-6a80-4778-bb84-8f956bea0a14.jpg', '2023-10-10T16:30:30.383Z'),
(307, 34, 'Camera10', 'Warning', '1696935631657-frame2d1f9d6a-7d56-4ce2-85ed-2354bc2c6747.jpg', '2023-10-10T16:30:31.736Z'),
(308, 34, 'Camera10', 'Warning', '1696935633321-framea42486a8-712a-4721-bdaf-e5f0d7899e14.jpg', '2023-10-10T16:30:33.399Z'),
(309, 34, 'Camera10', 'Warning', '1696935638336-framede8e7022-73cb-4fec-8504-3e6c6aec2e40.jpg', '2023-10-10T16:30:38.420Z'),
(310, 34, 'Camera10', 'Warning', '1696935639864-frame25bd6c58-8ba0-4947-9cc0-ff89b748a2ec.jpg', '2023-10-10T16:30:39.935Z'),
(311, 34, 'Camera10', 'Warning', '1696935689715-framef4a15e8b-8e5f-4ca4-a59c-3dc33659332c.jpg', '2023-10-10T16:31:29.796Z'),
(312, 34, 'Camera10', 'Warning', '1696935690035-frame7aec13fc-32c9-46df-b226-9b4b422ddfaf.jpg', '2023-10-10T16:31:30.109Z'),
(313, 34, 'Camera10', 'Warning', '1696935693600-frame04f52714-c8ba-4caf-a8f6-2f3c6456e140.jpg', '2023-10-10T16:31:33.793Z'),
(314, 34, 'Camera10', 'Warning', '1696935694318-framee04fef1d-b8f7-4f7d-82b3-1ed1f7964340.jpg', '2023-10-10T16:31:34.392Z'),
(315, 34, 'Camera10', 'Warning', '1696935695629-frame1c8488d6-1985-4e3f-82ea-bf95a78e8113.jpg', '2023-10-10T16:31:35.738Z'),
(316, 34, 'Camera10', 'Warning', '1697004752492-frame1c7b5a34-024f-4dd1-981f-41077d747077.jpg', '2023-10-11T11:42:32.578Z'),
(317, 34, 'Camera10', 'Warning', '1697004752901-frame67c5814c-9386-4951-b7a0-faf22e215df8.jpg', '2023-10-11T11:42:32.964Z'),
(318, 34, 'Camera10', 'Warning', '1697006773609-frame8198734a-0f02-40e2-b92f-49d43e7f65a6.jpg', '2023-10-11T12:16:13.729Z'),
(319, 34, 'Camera10', 'Warning', '1697006838165-frame21331852-150a-4295-8cc6-38ed90ee4ff7.jpg', '2023-10-11T12:17:18.318Z'),
(320, 34, 'Camera10', 'Warning', '1697006887839-frame4580e430-8943-419c-89fd-f7a05b928e73.jpg', '2023-10-11T12:18:08.026Z'),
(321, 34, 'Camera10', 'Warning', '1697006888216-frame377ae4f6-aff5-442c-b816-774028ce2050.jpg', '2023-10-11T12:18:08.369Z'),
(322, 34, 'Camera10', 'Warning', '1697006891352-frame1ae61478-6730-4ac5-ab29-8b490efd6724.jpg', '2023-10-11T12:18:11.481Z'),
(323, 34, 'Camera10', 'Warning', '1697006892266-framef9553ac8-ffc2-4ca9-9c6a-97b09c99fab3.jpg', '2023-10-11T12:18:12.440Z'),
(324, 34, 'Camera10', 'Warning', '1697010021316-frame1b6f32ed-2723-4ed5-ae29-9401b0978608.jpg', '2023-10-11T13:10:21.415Z'),
(325, 34, 'Camera10', 'Warning', '1697010078892-frame56ca6d9a-baf1-4ce6-bfaf-53f15d87898b.jpg', '2023-10-11T13:11:18.998Z'),
(326, 34, 'Camera10', 'Warning', '1697010198132-framef0196f9b-e7dc-4195-9b1e-55ecc5984cb6.jpg', '2023-10-11T13:13:18.216Z'),
(327, 34, 'Camera10', 'Warning', '1697010265959-frame12ef6ade-6877-4584-9f75-8e1d4e30d29b.jpg', '2023-10-11T13:14:26.072Z'),
(328, 34, 'Camera10', 'Warning', '1697010268422-framed34e0f25-01e2-4f44-a730-1e49c15b83ac.jpg', '2023-10-11T13:14:28.517Z'),
(329, 34, 'Camera10', 'Warning', '1697010330010-frame0ff0fdee-f31b-4cd7-a236-14d86ad5ef1e.jpg', '2023-10-11T13:15:30.083Z'),
(330, 34, 'Camera10', 'Warning', '1697010341778-frame36c4ab06-9355-4691-86db-17d1f8a5096b.jpg', '2023-10-11T13:15:41.855Z'),
(331, 34, 'Camera10', 'Warning', '1697010343906-frame411276f0-589a-439c-8de8-4f8ac59a823f.jpg', '2023-10-11T13:15:43.972Z'),
(332, 34, 'Camera10', 'Warning', '1697010347868-framecbf77a0d-7cb0-4c29-b7c6-fbc4f6a4f437.jpg', '2023-10-11T13:15:47.934Z'),
(333, 34, 'Camera10', 'Warning', '1697010351432-frame19a19395-b7c0-47fe-8c81-9bff71b2a6bb.jpg', '2023-10-11T13:15:51.524Z'),
(334, 34, 'Camera10', 'Warning', '1697010386419-frame3b1410b5-02e8-4366-b909-0b76b315d28a.jpg', '2023-10-11T13:16:26.492Z'),
(335, 34, 'Camera10', 'Warning', '1697010504627-frame410da7a5-c3d2-4d9e-b779-1b044b9c95b1.jpg', '2023-10-11T13:18:24.740Z'),
(336, 34, 'Camera10', 'Warning', '1697011016863-frame1e280cdc-d9f4-4fc8-8dad-fe12ae0605b9.jpg', '2023-10-11T13:26:56.923Z'),
(337, 34, 'Camera10', 'Warning', '1697011398757-frameab781f85-4796-4dd1-9839-73cdb60bf791.jpg', '2023-10-11T13:33:18.844Z'),
(338, 34, 'Camera10', 'Warning', '1697011489759-frame593563a5-f7fb-41e6-85bf-87bb29ea99ae.jpg', '2023-10-11T13:34:49.880Z'),
(339, 34, 'Camera10', 'Warning', '1697011768740-frame31971169-c934-4196-b12f-cb85aeaf161a.jpg', '2023-10-11T13:39:28.803Z'),
(340, 34, 'Camera10', 'Warning', '1697011780650-frame31f86c93-9905-47bc-aec8-1c6c85929459.jpg', '2023-10-11T13:39:40.781Z'),
(341, 34, 'Camera10', 'Warning', '1697011884512-framecf52b334-c8e0-44db-bda7-56709310c307.jpg', '2023-10-11T13:41:24.580Z'),
(342, 34, 'Camera10', 'Warning', '1697011933272-frame699ad3df-4125-40bd-a4b0-ba4087ab1c90.jpg', '2023-10-11T13:42:13.355Z'),
(343, 34, 'Camera10', 'Warning', '1697011935647-framea46078ce-018d-4997-8341-3357577f9dd3.jpg', '2023-10-11T13:42:15.741Z'),
(344, 34, 'Camera10', 'Warning', '1697011936007-frame93d00271-35a8-453e-abe9-bc5b5efb65fd.jpg', '2023-10-11T13:42:16.102Z'),
(345, 34, 'Camera10', 'Warning', '1697011940762-framebf601c69-a2a1-4888-b7eb-baf6463c7bd5.jpg', '2023-10-11T13:42:20.854Z'),
(346, 34, 'Camera10', 'Warning', '1697011942978-frame51fd559d-6a2e-42a7-a574-274dd4b0c7e1.jpg', '2023-10-11T13:42:23.078Z'),
(347, 34, 'Camera10', 'Warning', '1697011997084-frame660bf5cc-3122-4b3d-ac8f-2eaa80bda180.jpg', '2023-10-11T13:43:17.165Z'),
(348, 34, 'Camera10', 'Warning', '1697012067067-frame6d7a4288-e46c-4e5a-859a-b7d7cc89ea31.jpg', '2023-10-11T13:44:27.161Z'),
(349, 34, 'Camera10', 'Warning', '1697012068659-frame9de13452-1bcd-4fd1-9d61-3ea5f0136f6c.jpg', '2023-10-11T13:44:28.726Z'),
(350, 34, 'Camera10', 'Warning', '1697012192360-framea41df131-e1a7-4300-a3b5-af87e25211ad.jpg', '2023-10-11T13:46:32.936Z'),
(351, 34, 'Camera10', 'Warning', '1697012195701-frame0228db5a-9e29-4e7b-8f45-0e88a9f1363a.jpg', '2023-10-11T13:46:35.831Z'),
(352, 34, 'Camera10', 'Warning', '1697012240156-frame29d31aed-d2ec-4ea6-b05d-203b612277d0.jpg', '2023-10-11T13:47:20.282Z'),
(353, 34, 'Camera10', 'Warning', '1697012240659-frameed46968c-6055-4675-8651-e912bf244b58.jpg', '2023-10-11T13:47:20.841Z'),
(354, 34, 'Camera10', 'Warning', '1697012241739-frame27627eb6-8cbf-48e9-8294-19fe43ff9ee4.jpg', '2023-10-11T13:47:21.993Z'),
(355, 34, 'Camera10', 'Warning', '1697012250763-frame1a766bb7-c679-4c91-b72c-9f98c8d39451.jpg', '2023-10-11T13:47:30.977Z'),
(356, 34, 'Camera11', 'Warning', '1697012305312-frame9d51482a-352a-48ee-b761-f226a99bfd4b.jpg', '2023-10-11T13:48:25.930Z'),
(357, 34, 'Camera11', 'Warning', '1697012317022-frame96925e4f-73b2-4e09-9b21-d5b8718fd76a.jpg', '2023-10-11T13:48:37.165Z'),
(358, 34, 'Camera10', 'Warning', '1697015914747-frame06623142-04ec-47f8-b069-03f790a34dbb.jpg', '2023-10-11T14:48:34.893Z'),
(359, 34, 'Camera10', 'Warning', '1697015915152-frame4fb1cfc0-1a3c-45d1-8f2d-33349cd1bbb1.jpg', '2023-10-11T14:48:35.209Z'),
(360, 34, 'Camera10', 'Warning', '1697015916396-frame04f40920-6c4e-4793-be6e-bc4e2a9e3454.jpg', '2023-10-11T14:48:36.481Z'),
(361, 34, 'Camera10', 'Warning', '1697015916695-framef1ac5990-3d7c-41d0-a5ac-efa8b6397619.jpg', '2023-10-11T14:48:36.775Z'),
(362, 34, 'Camera10', 'Warning', '1697015918904-frame43f73520-7c2f-4ace-9abe-4f28371aef7b.jpg', '2023-10-11T14:48:38.979Z'),
(363, 34, 'Camera10', 'Warning', '1697015919204-framed4740d0a-4c53-4b9a-8279-21eb5762112e.jpg', '2023-10-11T14:48:39.304Z'),
(364, 34, 'Camera10', 'Warning', '1697015960949-framef7300028-7b4f-4637-9378-6794dccb2922.jpg', '2023-10-11T14:49:21.029Z'),
(365, 34, 'Camera10', 'Warning', '1697015980426-frame1187dcc1-2253-4c77-a325-53fab9a2405e.jpg', '2023-10-11T14:49:40.494Z'),
(366, 34, 'Camera10', 'Warning', '1697016091677-framef7d29710-c3aa-46d7-8dd1-8324dd31a4b9.jpg', '2023-10-11T14:51:31.772Z'),
(367, 34, 'Camera10', 'Warning', '1697016091956-framebeaa0c4d-5d8c-4edc-88ee-82de85574547.jpg', '2023-10-11T14:51:32.051Z'),
(368, 34, 'Camera10', 'Warning', '1697016106152-frame0fc689dd-c699-4cbb-9aff-fa32aa2d53c0.jpg', '2023-10-11T14:51:46.278Z'),
(369, 34, 'Camera10', 'Warning', '1697016226880-frame87e256a0-6618-493f-8fd2-7a686bbfeb49.jpg', '2023-10-11T14:53:46.944Z'),
(370, 34, 'Camera10', 'Warning', '1697016253170-framea80997d1-75b1-4e50-9e1d-ae401204ad49.jpg', '2023-10-11T14:54:13.370Z'),
(371, 34, 'Camera11', 'Warning', '1697016290851-frame31a6fc3a-0276-4d69-aa82-a2be7ec62a0f.jpg', '2023-10-11T14:54:50.922Z'),
(372, 34, 'Camera10', 'Warning', '1697016354297-frame15e0f620-6f2b-45a1-83f0-ed4476500255.jpg', '2023-10-11T14:55:54.389Z'),
(373, 34, 'Camera10', 'Warning', '1697016354555-frame70e1a597-7563-459d-9f07-0396c7429762.jpg', '2023-10-11T14:55:54.656Z'),
(374, 34, 'Camera10', 'Warning', '1697016355689-frame05d68cdb-b88e-4f6f-a61a-c2eb731f55e9.jpg', '2023-10-11T14:55:55.742Z'),
(375, 34, 'Camera10', 'Warning', '1697016379257-frame1e49dbe0-039a-4a13-9e59-37cd4f645159.jpg', '2023-10-11T14:56:19.340Z'),
(376, 34, 'Camera10', 'Warning', '1697016379390-frame8f235ccb-be31-4208-9fe0-5646a9887c28.jpg', '2023-10-11T14:56:19.468Z'),
(377, 34, 'Camera10', 'Warning', '1697016390386-frame25840533-7edf-444a-aff0-4d20c996dd6e.jpg', '2023-10-11T14:56:30.668Z'),
(378, 32, 'Cam 1', 'Warning', '1696403194026-download.jpg', '2023-11-23T10:09:34.197Z'),
(379, 32, 'Cam 1', 'Warning', '1696403194026-download.jpg', '2023-11-23T10:14:20.712Z'),
(380, 32, 'Cam 1', 'Warning', '1700714732665-unnamed.png', '2023-11-23T10:15:44.480Z');

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `auth_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(65) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(55) NOT NULL,
  `role` varchar(10) NOT NULL,
  `isActive` varchar(1) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`auth_id`, `username`, `email`, `password`, `name`, `role`, `isActive`, `datetime`) VALUES
(1, 'admin', 'mrinmoyghosh102@gmail.com', '$2a$12$Ee5GNWNDXd42lE4gGv2oWOBNomTbMYmthn.0rsCFFJKHS4PqTFUOO', 'Mrinmoy Ghosh', 'admin', 'y', '2023-12-07 12:42:55');

-- --------------------------------------------------------

--
-- Table structure for table `depts`
--

CREATE TABLE `depts` (
  `dept_id` int(11) NOT NULL,
  `dept_name` varchar(45) NOT NULL,
  `emails` varchar(255) NOT NULL,
  `head_name` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `depts`
--

INSERT INTO `depts` (`dept_id`, `dept_name`, `emails`, `head_name`) VALUES
(25, 'System', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghosh'),
(32, 'IT', 'upasanabharti145@gmail.com,upasanabharti146@gmail.com,uuupa@gmail.com,qqqq@gmail.com', 'Mrinmoy'),
(34, 'Manufacturing', 'upasanabharti145@gmail.com', 'Upasana'),
(35, 'DCGIT', 'rohit123sinha456@gmail.com', 'Saroj Kumar'),
(36, 'abc', 'xyz@gmail.com', 'xyz'),
(37, 'abc', '', 'xyz'),
(38, 'abc', 'qq', 'qwe');

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` int(11) NOT NULL,
  `email` varchar(65) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `isVarified` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alarm`
--
ALTER TABLE `alarm`
  ADD PRIMARY KEY (`alarm_id`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`auth_id`);

--
-- Indexes for table `depts`
--
ALTER TABLE `depts`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alarm`
--
ALTER TABLE `alarm`
  MODIFY `alarm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=381;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `depts`
--
ALTER TABLE `depts`
  MODIFY `dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
