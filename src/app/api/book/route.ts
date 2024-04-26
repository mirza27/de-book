import { NextResponse } from "next/server";
import prisma from '../../../../prisma';
import { Book } from '@prisma/client';


// ambil semua buku
export async function GET() {
    try {
        const books: Book[] = await prisma.book.findMany();

        return NextResponse.json(
            {
                sucess: true,
                message: "Success get data books",
                data: books,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                sucess: false,
                message: "Fail get data books",

            },
            {
                status: 200,
            }
        );

    }

}
