-- CreateTable
CREATE TABLE "carts" (
    "cart_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("cart_id")
);

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
