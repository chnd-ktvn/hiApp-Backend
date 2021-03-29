-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Mar 2021 pada 15.27
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hi_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `chat`
--

CREATE TABLE `chat` (
  `id_chat` int(11) NOT NULL,
  `id_room_gen` varchar(20) NOT NULL,
  `msg` varchar(500) NOT NULL,
  `id_sender` int(11) NOT NULL,
  `id_receiver` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `chat`
--

INSERT INTO `chat` (`id_chat`, `id_room_gen`, `msg`, `id_sender`, `id_receiver`, `status`, `created_at`) VALUES
(1, '3aa2760de6a50a79', 'hallo', 5, 3, 1, '2021-02-28 19:15:47'),
(2, '3aa2760de6a50a79', 'hi', 5, 3, 1, '2021-02-28 19:24:01'),
(3, '3aa2760de6a50a79', 'halo selamat', 5, 3, 1, '2021-02-28 19:24:15'),
(4, '3aa2760de6a50a79', 'no matter', 3, 5, 0, '2021-02-28 20:32:41'),
(5, '3aa2760de6a50a79', 'hallo ros how are you?', 5, 3, 1, '2021-02-28 21:46:51'),
(6, '3aa2760de6a50a79', 'i think i am fine', 3, 5, 0, '2021-02-28 21:48:00'),
(7, '3aa2760de6a50a79', 'ngirim apaaa', 5, 3, 1, '2021-02-28 22:33:48'),
(8, '88535063377c0707', 'Hello there', 5, 4, 1, '2021-03-01 07:08:18'),
(9, '88535063377c0707', 'i just wanna tell you that A dream does not become reality through magic; it takes sweat, determination, and hard work', 5, 4, 1, '2021-03-01 07:11:40'),
(10, '88535063377c0707', 'hai shan, thank you for your advice, i keep that in mind and heart :)', 4, 5, 1, '2021-03-01 07:14:13'),
(11, '88535063377c0707', 'btw how you been?', 4, 5, 1, '2021-03-01 07:15:19'),
(12, '3aa2760de6a50a79', 'what', 5, 3, 1, '2021-03-01 12:40:13'),
(13, '3aa2760de6a50a79', 'cuba', 5, 3, 1, '2021-03-01 20:04:07'),
(14, '3aa2760de6a50a79', 'fur', 5, 3, 1, '2021-03-01 20:07:32'),
(15, '3aa2760de6a50a79', 'gugu', 5, 3, 1, '2021-03-01 20:21:54'),
(16, '3aa2760de6a50a79', 'cuba', 5, 3, 1, '2021-03-01 20:24:43'),
(17, '3aa2760de6a50a79', 'n', 5, 3, 1, '2021-03-01 20:29:11'),
(18, '3aa2760de6a50a79', 'ready for work', 5, 3, 1, '2021-03-01 21:10:05'),
(19, '3aa2760de6a50a79', 'coba lagi', 5, 3, 1, '2021-03-01 21:22:48'),
(20, '3aa2760de6a50a79', 'lagi nyoba socket', 5, 3, 1, '2021-03-01 21:25:50'),
(21, '3aa2760de6a50a79', 'NYOOBA SOCKET KE BERAPA NIH', 5, 3, 1, '2021-03-01 21:29:55'),
(22, '3aa2760de6a50a79', ' coba saya', 3, 5, 0, '2021-03-01 21:33:08'),
(23, '3aa2760de6a50a79', 'lagi', 3, 5, 0, '2021-03-01 21:37:07'),
(24, '3aa2760de6a50a79', 'lagi lagi', 3, 5, 0, '2021-03-01 21:39:19'),
(25, '3aa2760de6a50a79', 'l', 3, 5, 0, '2021-03-01 21:41:19'),
(26, '3aa2760de6a50a79', 'lagi socket', 3, 5, 0, '2021-03-01 21:51:44'),
(27, '3aa2760de6a50a79', 'lagi', 3, 5, 0, '2021-03-01 21:52:16'),
(28, '3aa2760de6a50a79', 'socketoh socket', 3, 5, 0, '2021-03-01 21:55:00'),
(29, '3aa2760de6a50a79', 'fav', 3, 5, 0, '2021-03-01 21:57:21'),
(30, '3aa2760de6a50a79', 'lk', 3, 5, 0, '2021-03-01 21:59:00'),
(31, '3aa2760de6a50a79', 'saya', 5, 3, 1, '2021-03-01 22:18:03'),
(32, '3aa2760de6a50a79', 'iya?', 3, 5, 0, '2021-03-01 22:18:59'),
(33, '3aa2760de6a50a79', 'n', 5, 3, 1, '2021-03-02 08:55:20'),
(34, '3aa2760de6a50a79', 'j', 5, 3, 1, '2021-03-02 08:56:27'),
(35, '3aa2760de6a50a79', 'matter fact', 5, 3, 0, '2021-03-02 10:37:55'),
(36, '53a73dd97706d33e', 'hai', 7, 5, 0, '2021-03-02 11:19:26'),
(37, '53a73dd97706d33e', 'halo', 5, 7, 0, '2021-03-02 11:20:22'),
(38, '53a73dd97706d33e', 'lagi', 7, 5, 0, '2021-03-02 11:26:01'),
(39, '53a73dd97706d33e', 'ok', 5, 7, 0, '2021-03-02 11:26:28'),
(40, '53a73dd97706d33e', 'lagi?', 7, 5, 0, '2021-03-02 11:40:02'),
(41, '53a73dd97706d33e', ',', 5, 7, 0, '2021-03-02 11:42:25'),
(42, '53a73dd97706d33e', 'k', 7, 5, 0, '2021-03-02 11:45:31'),
(43, '53a73dd97706d33e', 'n', 5, 7, 0, '2021-03-02 11:46:20'),
(44, '53a73dd97706d33e', '', 7, 5, 0, '2021-03-02 11:51:36'),
(45, '53a73dd97706d33e', 'm', 7, 5, 0, '2021-03-02 11:51:47'),
(46, '53a73dd97706d33e', 'm', 5, 7, 0, '2021-03-02 11:54:48'),
(47, '53a73dd97706d33e', 'lk', 5, 7, 0, '2021-03-02 11:59:15'),
(48, '53a73dd97706d33e', 's', 5, 7, 0, '2021-03-02 12:00:14'),
(49, '53a73dd97706d33e', ',', 5, 7, 0, '2021-03-02 12:01:34'),
(50, '53a73dd97706d33e', 'm', 7, 5, 0, '2021-03-02 12:02:41'),
(51, '53a73dd97706d33e', 'm', 5, 7, 0, '2021-03-02 12:07:11'),
(52, '53a73dd97706d33e', ',', 5, 7, 0, '2021-03-02 12:27:27'),
(53, '53a73dd97706d33e', 'percobaan kesekian', 5, 7, 0, '2021-03-02 12:29:19'),
(54, '53a73dd97706d33e', '.', 5, 7, 0, '2021-03-02 12:34:38'),
(55, 'c400e9d97b9032bc', 'hi', 2, 1, 0, '2021-03-03 08:49:48'),
(56, '820ea9b421b8ed5a', 'ha', 8, 5, 0, '2021-03-03 09:50:40'),
(57, '820ea9b421b8ed5a', 'ok', 5, 8, 0, '2021-03-03 09:51:13'),
(58, '3aa2760de6a50a79', 'hallo', 5, 3, 0, '2021-03-21 09:28:12'),
(59, '01c05f0fb59a4610', 'halo', 4, 3, 0, '2021-03-21 11:07:54'),
(60, '820ea9b421b8ed5a', 'ko', 5, 8, 0, '2021-03-29 13:37:22'),
(61, '820ea9b421b8ed5a', 'oksip', 8, 5, 0, '2021-03-29 13:40:38'),
(62, '820ea9b421b8ed5a', 'lagi', 5, 8, 0, '2021-03-29 14:07:30'),
(63, '820ea9b421b8ed5a', 'llll', 5, 8, 0, '2021-03-29 14:08:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `friends`
--

CREATE TABLE `friends` (
  `user_id` int(11) NOT NULL,
  `friends_with` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_bio` varchar(200) NOT NULL,
  `user_photo` varchar(255) NOT NULL,
  `user_phone` varchar(14) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `friends`
--

INSERT INTO `friends` (`user_id`, `friends_with`, `user_name`, `user_bio`, `user_photo`, `user_phone`, `user_email`, `created_at`) VALUES
(5, 3, 'ros', 'Best friends are the people you can do anything and nothing with and still have the best time.', '2021-02-28T02-42-58.828ZScreenshot_2019-03-31-01-07-02-75 (2).png', '087952625617', 'candraoktaviani2017@gmail.com', '2021-02-27 15:08:15'),
(5, 4, '@shania', 'Love yourself first and everything else falls into line', '2021-02-28T03-50-20.600Z1543756047265.jpg', '', 'anicaoca@gmail.com', '2021-02-28 09:37:44'),
(5, 2, 'caca', '-', '2021-02-28T03-44-51.520Z1543388709086.jpg', '', 'candraoktavianii2017@gmail.com', '2021-02-28 10:22:29'),
(5, 1, 'Kesh', 'Add my ig: @chand_ktvn', '2021-02-28T03-39-01.555Z1542253447927.jpg', '', 'candraoktaviani2017@gmail.comm', '2021-02-28 10:27:53'),
(4, 5, 'McKenzie', 'May every sunrise hold more promise and every sunset hold more peace.', '2021-03-01T05-01-55.254Znitish-meena-RbbdzZBKRDY-unsplash.jpg', '', 'chandra@gmail.com', '2021-03-01 12:05:43'),
(4, 3, 'ros', 'Best friends are the people you can do anything and nothing with and still have the best time.', '2021-02-28T02-42-58.828ZScreenshot_2019-03-31-01-07-02-75 (2).png', '', 'candraoktaviani2017@gmail.com', '2021-03-01 12:13:25'),
(4, 1, 'Kesh', 'Add my ig: @chand_ktvn', '2021-02-28T03-39-01.555Z1542253447927.jpg', '', 'candraoktaviani2017@gmail.comm', '2021-03-01 12:17:21'),
(4, 6, 'v', '', '', '', 'v@gmail.com', '2021-03-01 12:18:09'),
(4, 2, 'caca', '-', '2021-02-28T03-44-51.520Z1543388709086.jpg', '', 'candraoktavianii2017@gmail.com', '2021-03-01 12:18:59'),
(6, 3, 'ros', 'Best friends are the people you can do anything and nothing with and still have the best time.', '2021-02-28T02-42-58.828ZScreenshot_2019-03-31-01-07-02-75 (2).png', '', 'candraoktaviani2017@gmail.com', '2021-03-01 12:32:04'),
(7, 5, 'McKenzie', 'May every sunrise hold more promise and every sunset hold more peace.', '2021-03-01T05-01-55.254Znitish-meena-RbbdzZBKRDY-unsplash.jpg', '', 'chandra@gmail.com', '2021-03-02 11:10:13'),
(7, 4, '@shania', 'Love yourself first and everything else falls into line', '2021-02-28T03-50-20.600Z1543756047265.jpg', '', 'anicaoca@gmail.com', '2021-03-02 11:18:57'),
(2, 1, 'Kesh', 'Add my ig: @chand_ktvn', '2021-02-28T03-39-01.555Z1542253447927.jpg', '', 'candraoktaviani2017@gmail.comm', '2021-03-03 08:48:01'),
(6, 1, 'Kesh', 'Add my ig: @chand_ktvn', '2021-02-28T03-39-01.555Z1542253447927.jpg', '', 'candraoktaviani2017@gmail.comm', '2021-03-03 09:33:39'),
(6, 2, 'caca', '-', '2021-02-28T03-44-51.520Z1543388709086.jpg', '', 'candraoktavianii2017@gmail.com', '2021-03-03 09:36:19'),
(8, 5, 'McKenzie', 'May every sunrise hold more promise and every sunset hold more peace.', '2021-03-01T05-01-55.254Znitish-meena-RbbdzZBKRDY-unsplash.jpg', '', 'chandra@gmail.com', '2021-03-03 09:46:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `room_chat`
--

CREATE TABLE `room_chat` (
  `id_room` int(11) NOT NULL,
  `id_room_gen` varchar(20) NOT NULL,
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `room_chat`
--

INSERT INTO `room_chat` (`id_room`, `id_room_gen`, `sender`, `receiver`, `created_at`) VALUES
(1, '3aa2760de6a50a79', 5, 3, '2021-02-28 02:57:14'),
(2, '3aa2760de6a50a79', 3, 5, '2021-02-28 02:57:14'),
(3, '88535063377c0707', 5, 4, '2021-02-28 03:06:09'),
(4, '88535063377c0707', 4, 5, '2021-02-28 03:06:09'),
(5, 'cdc2a13d65dc4096', 5, 2, '2021-02-28 10:28:48'),
(6, 'cdc2a13d65dc4096', 2, 5, '2021-02-28 10:28:48'),
(15, '326b7db26a418fbb', 4, 1, '2021-03-01 12:17:28'),
(16, '326b7db26a418fbb', 1, 4, '2021-03-01 12:17:28'),
(17, '49cf58e8f5810b9e', 4, 6, '2021-03-01 12:18:17'),
(18, '49cf58e8f5810b9e', 6, 4, '2021-03-01 12:18:17'),
(19, '3ce4ddaffe18c404', 4, 2, '2021-03-01 12:19:11'),
(20, '3ce4ddaffe18c404', 2, 4, '2021-03-01 12:19:11'),
(27, '0c312de25a720205', 6, 3, '2021-03-01 12:38:40'),
(28, '0c312de25a720205', 3, 6, '2021-03-01 12:38:40'),
(29, '01c05f0fb59a4610', 4, 3, '2021-03-01 12:45:33'),
(30, '01c05f0fb59a4610', 3, 4, '2021-03-01 12:45:33'),
(35, '53a73dd97706d33e', 7, 5, '2021-03-02 11:18:02'),
(36, '53a73dd97706d33e', 5, 7, '2021-03-02 11:18:03'),
(37, '537a579391317f2b', 7, 4, '2021-03-02 11:19:05'),
(38, '537a579391317f2b', 4, 7, '2021-03-02 11:19:05'),
(39, 'c400e9d97b9032bc', 2, 1, '2021-03-03 08:48:09'),
(40, 'c400e9d97b9032bc', 1, 2, '2021-03-03 08:48:09'),
(41, 'cb6fc61402917eff', 6, 2, '2021-03-03 09:36:34'),
(42, 'cb6fc61402917eff', 2, 6, '2021-03-03 09:36:34'),
(43, '820ea9b421b8ed5a', 8, 5, '2021-03-03 09:46:34'),
(44, '820ea9b421b8ed5a', 5, 8, '2021-03-03 09:46:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_fullname` varchar(150) NOT NULL,
  `user_phone` varchar(14) NOT NULL,
  `user_bio` varchar(100) NOT NULL,
  `user_photo` varchar(255) NOT NULL,
  `user_activation` varchar(3) NOT NULL,
  `lat` varchar(20) NOT NULL,
  `lng` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_name`, `user_fullname`, `user_phone`, `user_bio`, `user_photo`, `user_activation`, `lat`, `lng`, `created_at`, `updated_at`) VALUES
(1, 'candraoktaviani2017@gmail.comm', '$2b$10$0FMuC1K1slYFo5DS630WQOtkBtf7rggROqmtyrTahKp7o6BWijP5G', 'Kesh', 'Kesha Cantika', '', 'Add my ig: @chand_ktvn', '2021-02-28T03-39-01.555Z1542253447927.jpg', 'on', '-6.2087634', '106.84559899999999', '2021-02-26 19:13:55', '2021-02-28 10:39:01'),
(2, 'candraoktavianii2017@gmail.com', '$2b$10$ByK8F8ZF3z3KZjzfUVlsT.9qdVomvBtmwmoRhwh4jJdzuNwOn85S2', 'caca', '', '', '-', '2021-02-28T03-44-51.520Z1543388709086.jpg', 'on', '-6.2087634', '106.84559899999999', '0000-00-00 00:00:00', '2021-02-28 10:44:51'),
(3, 'candraoktaviani2017@gmail.com', '$2b$10$2ZiUWnd/X3XrPY6AvTw8IORJnvN38UeUVPYTeNDez0350JoKCUOF2', 'ros', 'Faith Rose', '087952625617', 'Best friends are the people you can do anything and nothing with and still have the best time.', '2021-02-28T02-42-58.828ZScreenshot_2019-03-31-01-07-02-75 (2).png', 'on', '-6.2087634', '106.84559899999999', '2021-02-27 09:03:12', '2021-02-28 09:42:58'),
(4, 'anicaoca@gmail.com', '$2b$10$vQcOjOoC4WqKSs8.c0urZO5MdI95qJgr6EShwU0x049uRMPVFTn5i', '@shania', '', '', 'Love yourself first and everything else falls into line', '2021-02-28T03-50-20.600Z1543756047265.jpg', 'on', '-6.2087634', '106.84559899999999', '2021-02-27 09:12:39', '2021-02-28 10:50:20'),
(5, 'chandra@gmail.com', '$2b$10$vicntXFSmEmS/7d3//n6B.7TZf5PcuT/ebaS/GwDZ9dt7Al6vNLK2', 'McKenzie', 'Mr. McKenzie', '087871234', 'May every sunrise hold more promise and every sunset hold more peace.', '2021-03-01T05-01-55.254Znitish-meena-RbbdzZBKRDY-unsplash.jpg', 'on', '-6.2087634', '106.84559899999999', '0000-00-00 00:00:00', '2021-03-01 12:04:02'),
(6, 'v@gmail.com', '$2b$10$7h0htuA/3ooX8ErtKUebWeUonoILj14aUYiz2ytlK7kLQTOu1hKAm', 'v', '', '', '', '', 'on', '-6.2087634', '106.84559899999999', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'faithrose010@gmail.comm', '$2b$10$53dCSxid1EkE/xuPVERjSOC.xNYn9Y5y/kDk/btJ5YZhlrHXqWDr2', 'fa', '', '', '', '2021-03-02T08-01-12.548ZIMG_20180922_183631-1.jpg', 'on', '-6.2087634', '106.84559899999999', '2021-03-02 11:08:57', '2021-03-02 15:01:12'),
(8, 'faithrose010@gmail.com', '$2b$10$tTAlunhM7FNeaPWySJ1ssul9NaDNckhsJzORhPusnyjPw6kpjDSNy', 'faith rose', '', '', 'hello world', '', 'on', '-6.2087634', '106.84559899999999', '2021-03-03 09:45:23', '2021-03-03 09:49:50');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`);

--
-- Indeks untuk tabel `room_chat`
--
ALTER TABLE `room_chat`
  ADD PRIMARY KEY (`id_room`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT untuk tabel `room_chat`
--
ALTER TABLE `room_chat`
  MODIFY `id_room` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
