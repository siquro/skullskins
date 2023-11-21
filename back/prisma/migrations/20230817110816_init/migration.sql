-- CreateTable
CREATE TABLE `users` (
    `steamId` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `avatarURL` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `tradeOfferLink` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_steamId_key`(`steamId`),
    PRIMARY KEY (`steamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `assetId` VARCHAR(191) NOT NULL,
    `classId` VARCHAR(191) NOT NULL,
    `marketHashName` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,
    `appId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `steamLink` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `orderId` INTEGER NULL,

    UNIQUE INDEX `items_assetId_key`(`assetId`),
    PRIMARY KEY (`assetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalPrice` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `userSteamId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `transactionId` VARCHAR(191) NULL,

    UNIQUE INDEX `orders_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,

    UNIQUE INDEX `transactions_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `adress1` VARCHAR(191) NOT NULL,
    `adress2` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `userSteamId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trade_bot_offers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `botSteamId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `offerId` VARCHAR(191) NULL,
    `orderId` INTEGER NOT NULL,

    UNIQUE INDEX `trade_bot_offers_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userSteamId_fkey` FOREIGN KEY (`userSteamId`) REFERENCES `users`(`steamId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_userSteamId_fkey` FOREIGN KEY (`userSteamId`) REFERENCES `users`(`steamId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trade_bot_offers` ADD CONSTRAINT `trade_bot_offers_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
