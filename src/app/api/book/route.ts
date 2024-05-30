import { NextResponse } from "next/server";
import prisma from '../../../../prisma';
import { Book } from '@prisma/client';
import { getSession } from "@/app/lib/session";


// ambil semua buku
export async function GET() {
    try {
        const books: Book[] = await prisma.book.findMany({
            include: {
                category: true,
                author: true,
                publisher: true,
            }
        });

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
                error: error,

            },
            {
                status: 200,
            }
        );

    }
}

// memasukkan data buuku
export async function POST(request: Request) {
    const {
        title,
        desc,
        year_release,
        stock,
        img_url,
        author_id,
        publisher_id,
        book_category_id,
        price,
    } = await request.json();

    const session = await getSession();
    if (session === null) {
        return NextResponse.json(
            {
                sucess: false,
                message: "Session not found",
            },
            {
                status: 401, // Unauthorized
            }
        );
    }

    try {
        const book: Book = await prisma.book.create({
            data: {
                title: title,
                desc: desc,
                year_release: parseInt(year_release),
                stock: parseInt(stock),
                img_url: img_url,
                publisher_id: parseInt(publisher_id),
                book_category_id: parseInt(book_category_id),
                admin_id: parseInt(session?.userId as string),
                author_id: parseInt(author_id),
                price: parseInt(price),
            },
        });

        return NextResponse.json(
            {
                sucess: true,
                message: "Success create data book",
                data: book,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Book Registration error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
                error: error,
            },
            {
                status: 500, // Internal Server Error
            }
        );
    }
}
