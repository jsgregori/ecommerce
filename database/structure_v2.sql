CREATE DATABASE `veterinaria`;

CREATE TABLE `veterinaria`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `category` VARCHAR(15) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `veterinaria`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `id_category` INT NOT NULL,
  `stock` INT NOT NULL,
  `price` INT NOT NULL,
  `discount` INT NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `veterinaria`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));

CREATE TABLE `veterinaria`.`ordenes` (			//agregué esto
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `veterinaria`.`compras` (			//agregué esto
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_orden` INT NOT NULL,
  `id_product` INT NOT NULL,
  `total` INT NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `veterinaria`.`ordenes` 			//agregué esto
ADD INDEX `id_user_idx` (`id_user` ASC);
;
ALTER TABLE `veterinaria`.`ordenes` 
ADD CONSTRAINT `id_user`
  FOREIGN KEY (`id_user`)
  REFERENCES `veterinaria`.`usuarios` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `veterinaria`.`compras` 			// agregué esto
ADD INDEX `id_orden_idx` (`id_orden` ASC),
ADD INDEX `id_product_idx` (`id_product` ASC);
;
ALTER TABLE `veterinaria`.`compras` 
ADD CONSTRAINT `id_orden`
  FOREIGN KEY (`id_orden`)
  REFERENCES `veterinaria`.`ordenes` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `id_product`
  FOREIGN KEY (`id_product`)
  REFERENCES `veterinaria`.`productos` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `veterinaria`.`productos` 
ADD INDEX `id_idx` (`id_category` ASC);
;

ALTER TABLE `veterinaria`.`productos` 
ADD CONSTRAINT `id`
  FOREIGN KEY (`id_category`)
  REFERENCES `veterinaria`.`categorias` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  

ALTER TABLE ordenes
ADD address VARCHAR(100) NOT NULL;

ALTER TABLE usuarios
ADD favorites VARCHAR(100);
