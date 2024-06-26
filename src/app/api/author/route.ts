import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { getSession } from "@/app/lib/session";

// ADD NEW AUTHOR
export async function POST(request: Request) {
    const { author_name, date_birth, bio, } = await request.json();
    const session = await getSession();

    try {
        const newAuthor = await prisma.author.create({
            data: {
                author_name: author_name,
                date_birth: date_birth,
                admin_id: parseInt(session?.userId as string),
                bio: bio,
            },
        });

        return NextResponse.json(
            {
                sucess: true,
                message: "Success add new author",
                data: newAuthor,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Author Registration error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed internal server error",
                error: error,
            }, {
            status: 500, // Internal Server Error
        }
        )
    }
}


export async function GET(request: Request) {
    try {
        const authors = await prisma.author.findMany({
            include: {
                books: true,
            }
        })

        return NextResponse.json(
            {
                sucess: true,
                message: "Success get data authors",
                data: authors,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {

                success: false,
                message: "Failed internal server error",
                error: error,
            }, {
            status: 500, // Internal Server Error
        })
    }
}
