import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/encrypt";
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
        book_category_id,
        price,
        admin_id,
    } = await request.json();

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
                year_release: year_release,
                stock: stock,
                img_url: img_url,
                book_category_id: book_category_id,
                admin_id: admin_id,
                author_id: author_id,
                price: price,
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
