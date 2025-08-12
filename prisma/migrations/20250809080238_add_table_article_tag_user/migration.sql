-- CreateTable
CREATE TABLE `User` (
    `uuid` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `passowrd` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `uuid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArticlesOnTags` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ArticlesOnTags_AB_unique`(`A`, `B`),
    INDEX `_ArticlesOnTags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ArticlesOnTags` ADD CONSTRAINT `_ArticlesOnTags_A_fkey` FOREIGN KEY (`A`) REFERENCES `Article`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticlesOnTags` ADD CONSTRAINT `_ArticlesOnTags_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
