import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { getSession } from "@/app/lib/session";

interface Params {
    id: string;
}

// GET AUTHOR BY ID
export async function GET(request: Request, { params }: { params: Params }) {
    const author_id = parseInt(params.id);

    try {
        if (isNaN(author_id)) {
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
    
        const author = await prisma.author.findUnique({
            where: {
                author_id: author_id, // Menggunakan book_id yang sudah di-parse
            }, include: {
                books: true,
            },
        });
    
        if (!author) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Author not found",
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
                    message: "Success get author",
                    data: author,
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
                message: "cant get author data",
                error: error,
            },
            {
                status: 404, // OK
            }
        );
    }
}

// UPDATE AUTHOR
export async function PATCH(request: Request, { params }: { params: Params }) {
    const author_id = parseInt(params.id);
    const {
        author_name, bio,
    } = await request.json();

    const session = await getSession();

    try {
        if (isNaN(author_id)) {
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

        const author = await prisma.author.update({
            where: {
                author_id: author_id, 
            },
            data: {
                author_name: author_name,
                admin_id: parseInt(session?.userId as string),
                bio: bio,
            },
        });

        if (!author) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Author not found",
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
                    message: "Success update author",
                    data: author,
                },
                {
                    status: 200, // OK
                }
            );
        }
    
    } catch (error) {
        return NextResponse.json( {
            success: false,
            message: "Cannot update author",
            error: error,
        },
        {
            status: 404, // OK
        })
    }
}