/*
  Warnings:

  - The values [Pendding] on the enum `CodeStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CodeStatus_new" AS ENUM ('Pending', 'Arraived');
ALTER TABLE "VerificationCode" ALTER COLUMN "sendStatus" DROP DEFAULT;
ALTER TABLE "VerificationCode" ALTER COLUMN "sendStatus" TYPE "CodeStatus_new" USING ("sendStatus"::text::"CodeStatus_new");
ALTER TYPE "CodeStatus" RENAME TO "CodeStatus_old";
ALTER TYPE "CodeStatus_new" RENAME TO "CodeStatus";
DROP TYPE "CodeStatus_old";
ALTER TABLE "VerificationCode" ALTER COLUMN "sendStatus" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "VerificationCode" ALTER COLUMN "sendStatus" SET DEFAULT 'Pending';
