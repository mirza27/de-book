import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { getSession } from "@/app/lib/session";

// ADD NEW PUBLISHER
export async function POST(request: Request) {
    const { publisher_name } = await request.json();
    const session = await getSession();

    try {
        const newPublisher = await prisma.publisher.create({
            data: {
                publisher_name: publisher_name,
                admin_id: parseInt(session?.userId as string),
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Success add new publisher",
                data: newPublisher,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Publisher Registration error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed internal server error",
                error: error,
            }, {
            status: 500, // Internal Server Error
        });
    }
}

// GET PUBLISHERS
export async function GET(request: Request) {
    try {
        const publishers = await prisma.publisher.findMany({
            include: {
                books: true,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Success get data publishers",
                data: publishers,
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
        });
    }
}
