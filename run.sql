CREATE TABLE IF NOT EXISTS "Users" (
    "id"   SERIAL , 
    "userId" VARCHAR(255) NOT NULL, 
    "name" VARCHAR(255) NOT NULL, 
    "email" VARCHAR(255) NOT NULL UNIQUE, 
    "photo" TEXT NOT NULL, 
    "provider" VARCHAR(255) NOT NULL, 
    "followers" INTEGER, 
    "following" INTEGER, 
    "location" VARCHAR(255), 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id")
);