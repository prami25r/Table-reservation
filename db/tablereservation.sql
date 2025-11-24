create database tablereservation;
USE tablereservation;

CREATE TABLE `Restaurant` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `location` VARCHAR(191),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE `Table` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tableNumber` INT NOT NULL,
  `seatCapacity` INT NOT NULL DEFAULT 4,
  `restaurantId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `Table_restaurantId_fkey` (`restaurantId`),
  CONSTRAINT `Table_restaurantId_fkey`
    FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE `Customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(191) NOT NULL,
  `mobileNumber` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE `Reservation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `customerId` INT NOT NULL,
  `restaurantId` INT NOT NULL,
  `reservationDate` DATETIME(3) NOT NULL,
  `guestCount` INT NOT NULL,
  `specialRequests` VARCHAR(191),
  `status` VARCHAR(191) NOT NULL DEFAULT 'Upcoming',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `Reservation_customerId_fkey` (`customerId`),
  INDEX `Reservation_restaurantId_fkey` (`restaurantId`),
  CONSTRAINT `Reservation_customerId_fkey`
    FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Reservation_restaurantId_fkey`
    FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE `ReservationTable` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `reservationId` INT NOT NULL,
  `tableId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ReservationTable_reservationId_fkey` (`reservationId`),
  INDEX `ReservationTable_tableId_fkey` (`tableId`),
  CONSTRAINT `ReservationTable_reservationId_fkey`
    FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ReservationTable_tableId_fkey`
    FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
