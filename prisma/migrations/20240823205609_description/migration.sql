/*
  Warnings:

  - Made the column `description` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "description" SET NOT NULL;
