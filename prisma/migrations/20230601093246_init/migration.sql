-- CreateTable
CREATE TABLE `bondeentrees` (
    `numBondeEntree` INTEGER NOT NULL AUTO_INCREMENT,
    `numProduit` INTEGER NOT NULL,
    `qteEntree` INTEGER NOT NULL,
    `dateEntree` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `numProduit`(`numProduit`),
    PRIMARY KEY (`numBondeEntree`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bondesorties` (
    `numBondeSortie` INTEGER NOT NULL AUTO_INCREMENT,
    `numProduit` INTEGER NOT NULL,
    `qteSortie` INTEGER NOT NULL,
    `dateSortie` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `numProduit`(`numProduit`),
    PRIMARY KEY (`numBondeSortie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produits` (
    `numProduit` INTEGER NOT NULL AUTO_INCREMENT,
    `design` VARCHAR(50) NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`numProduit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bondeentrees` ADD CONSTRAINT `bondeentree_ibfk_1` FOREIGN KEY (`numProduit`) REFERENCES `produits`(`numProduit`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bondesorties` ADD CONSTRAINT `bondesortie_ibfk_1` FOREIGN KEY (`numProduit`) REFERENCES `produits`(`numProduit`) ON DELETE CASCADE ON UPDATE CASCADE;
