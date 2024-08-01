-- CreateEnum
CREATE TYPE "CodeStatus" AS ENUM ('Pendding', 'Arraived');

-- AlterTable
ALTER TABLE "VerificationCode" ADD COLUMN     "sendStatus" "CodeStatus" NOT NULL DEFAULT 'Pendding';
