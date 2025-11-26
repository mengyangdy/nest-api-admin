CREATE TABLE `menus` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`type` int NOT NULL,
	`name` varchar(50) NOT NULL,
	`route_name` varchar(50),
	`route_path` varchar(255),
	`path_param` varchar(255),
	`order` int DEFAULT 0,
	`parent_id` int DEFAULT 0,
	`icon_type` int DEFAULT 1,
	`icon` varchar(100),
	`status` int DEFAULT 1,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `menus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `role_menus` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`role_id` int NOT NULL,
	`menu_id` int NOT NULL,
	CONSTRAINT `role_menus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`code` varchar(50) NOT NULL,
	`description` text,
	`status` int DEFAULT 1,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` datetime,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_unique` UNIQUE(`name`),
	CONSTRAINT `roles_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`role_id` int NOT NULL,
	CONSTRAINT `user_roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` varchar(100),
	`phone` varchar(20),
	`avatar` varchar(255),
	`nickname` varchar(50),
	`gender` int DEFAULT 1,
	`status` int DEFAULT 1,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` datetime,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
