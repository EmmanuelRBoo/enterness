-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "chatId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
