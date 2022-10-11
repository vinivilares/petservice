-- CreateTable
CREATE TABLE `tutores` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,
    `enderecoId` INTEGER NULL,

    UNIQUE INDEX `tutores_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pets` (
    `id` VARCHAR(191) NOT NULL,
    `especie` VARCHAR(191) NULL,
    `idade` DATETIME(3) NULL,
    `nome` VARCHAR(191) NULL,
    `raca` VARCHAR(191) NULL,
    `tutorId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vacinas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `data` DATETIME(3) NULL,
    `doses` INTEGER NOT NULL,
    `petId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `petshops` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,
    `enderecoId` INTEGER NULL,

    UNIQUE INDEX `petshops_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `veterinarios` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,
    `enderecoId` INTEGER NULL,
    `petshopId` VARCHAR(191) NULL,

    UNIQUE INDEX `veterinarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderecos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `localidade` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nmServId` INTEGER NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `preco` DECIMAL(65, 30) NOT NULL,
    `veterinarioId` VARCHAR(191) NULL,
    `petshopId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nomeServicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `NomeServico` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tutores` ADD CONSTRAINT `tutores_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `enderecos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `tutores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vacinas` ADD CONSTRAINT `vacinas_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `pets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `petshops` ADD CONSTRAINT `petshops_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `enderecos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veterinarios` ADD CONSTRAINT `veterinarios_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `enderecos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `veterinarios` ADD CONSTRAINT `veterinarios_petshopId_fkey` FOREIGN KEY (`petshopId`) REFERENCES `petshops`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servicos` ADD CONSTRAINT `servicos_nmServId_fkey` FOREIGN KEY (`nmServId`) REFERENCES `nomeServicos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servicos` ADD CONSTRAINT `servicos_veterinarioId_fkey` FOREIGN KEY (`veterinarioId`) REFERENCES `veterinarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servicos` ADD CONSTRAINT `servicos_petshopId_fkey` FOREIGN KEY (`petshopId`) REFERENCES `petshops`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
