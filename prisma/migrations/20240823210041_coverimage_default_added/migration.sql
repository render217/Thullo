/*
  Warnings:

  - Made the column `coverImage` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "coverImage" SET NOT NULL,
ALTER COLUMN "coverImage" SET DEFAULT 'https://utfs.io/f/fa43c9f2-58d1-417c-8f68-198519a63c65-2u69jh.jpg';
