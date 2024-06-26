CREATE TABLE `tasks` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`title` varchar(256),
	`description` varchar(256),
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`full_name` varchar(256),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `users` (`full_name`);