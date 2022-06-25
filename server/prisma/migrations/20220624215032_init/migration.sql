-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "mediaName" VARCHAR(64) NOT NULL,
    "mediaPath" VARCHAR(128) NOT NULL,
    "mediaSize" INTEGER NOT NULL,
    "mediaType" VARCHAR(32) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "tagGroup" VARCHAR(32) NOT NULL,
    "tagName" VARCHAR(32) NOT NULL,
    "tagCode" INTEGER,
    "tagDes" VARCHAR(256) NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MediaToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MediaToTags_AB_unique" ON "_MediaToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_MediaToTags_B_index" ON "_MediaToTags"("B");

-- AddForeignKey
ALTER TABLE "_MediaToTags" ADD CONSTRAINT "_MediaToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaToTags" ADD CONSTRAINT "_MediaToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
