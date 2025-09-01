/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArticlesOnTags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tags` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUuid` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ArticlesOnTags` DROP FOREIGN KEY `_ArticlesOnTags_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ArticlesOnTags` DROP FOREIGN KEY `_ArticlesOnTags_B_fkey`;

-- AlterTable
ALTER TABLE `Article` ADD COLUMN `status` ENUM('DRAFT', 'PUBLISH') NOT NULL DEFAULT 'DRAFT',
    ADD COLUMN `tags` JSON NOT NULL,
    ADD COLUMN `userUuid` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `_ArticlesOnTags`;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
