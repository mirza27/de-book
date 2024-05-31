import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { getSession } from "@/app/lib/session";
// import { Request } from "@vercel/node";

interface Params {
    id: string;
}

// GET BUKU BY ID ====================================
export async function GET(request: Request, { params }: { params: Params }) {
    const book_id = parseInt(params.id);

    // ambil user id
    const session = await getSession();

    try {
        // Pengecekan jika id param kosong
        if (isNaN(book_id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "ID cannot be empty or must be a valid number",
                    data: null,
                },
                {
                    status: 400, // Bad Request
                }
            );
        }

        const book = await prisma.book.findUnique({
            where: {
                book_id: book_id, // Menggunakan book_id yang sudah di-parse
            }, include: {
                category: true,
                author: true,
                publisher: true,
            },
        });

        if (!book) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book data not found",
                    data: null,
                },
                {
                    status: 404, // Not Found
                }
            );
        } else {
            return NextResponse.json(
                {
                    success: true,
                    message: "Book data found",
                    data: book,
                    dataUser: session?.userId,
                },
                {
                    status: 200, // OK
                }
            );
        }
    } catch (error) {
        console.error("Book error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
                error: error,
            },
            {
                status: 404, // OK
            }
        );
    }
}

// UPDATE BUKU ====================================
export async function PATCH(request: Request, { params }: { params: Params }) {
    const book_id = parseInt(params.id);
    const {
        title,
        description,
        year_release,
        stock,
        img_url,
        author_id,
        publisher_id,
        book_category_id,
        price,
    } = await request.json();

    const session = await getSession();

    try {
        // Pengecekan jika id param kosong
        if (isNaN(book_id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "ID cannot be empty or must be a valid number",
                    data: null,
                },
                {
                    status: 400, // Bad Request
                }
            );
        }

        const book = await prisma.book.update({
            where: {
                book_id: book_id, // Menggunakan book_id yang sudah di-parse
            },
            data: {
                title: title,
                desc: description,
                year_release: parseInt(year_release),
                stock: parseInt(stock),
                img_url: img_url,
                book_category_id: parseInt(book_category_id),
                admin_id: parseInt(session?.userId as string),
                publisher_id: parseInt(publisher_id),
                author_id: parseInt(author_id),
                price: parseInt(price),
            },
        });

        if (!book) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Book data update unsuccessful",
                    data: null,
                },
                {
                    status: 404, // Not Found
                }
            );
        } else {
            return NextResponse.json(
                {
                    success: true,
                    message: "Book data update successful",
                    data: null,
                },
                {
                    status: 200, // OK
                }
            );
        }
    } catch (error) {
        console.error("Book error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
                error: error,
            },
            {
                status: 404, // OK
            }
        );
    }
}

// DELETE BUKU ====================================
export async function DELETE(request: Request, { params }: { params: Params }) {
    const book_id = parseInt(params.id);

    try {
        // Pengecekan jika id param kosong
        if (isNaN(book_id)) {

            return NextResponse.json(
                {
                    success: false,
                    message: "ID cannot be empty or must be a valid number",
                    data: null,
                },
                {
                    status: 400, // Bad Request
                }
            );
        }

        await prisma.book.delete({
            where: {
                book_id: book_id, // Menggunakan book_id yang sudah di-parse
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Success delete book",
                data: null,
            },
            {
                status: 200, // OK
            }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
                error: error,
            },
            {
                status: 404,
            }
        );
    }
}
