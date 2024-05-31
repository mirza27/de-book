import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { getSession } from "@/app/lib/session";


// ambil semua cart saya
export async function GET(request: Request) {
    const session = await getSession();

    try {
        const carts = await prisma.cart.findMany({
            where: {
                user_id: parseInt(session?.userId as string),
            },
            include: {
                book: true,
            },
        });

        return NextResponse.json(
            {
                sucess: true,
                message: "Success get data carts",
                data: carts,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                sucess: false,
                message: "Fail get data carts",
                error: error,

            },
            {
                status: 200,
            }
        );
    }
}


export async function POST(request: Request) {
    const { book_id, quantity } = await request.json();
    const session = await getSession();

    try {
        console.log(book_id, quantity);
        if (quantity <= 0 || isNaN(book_id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Quantity must be greater than 0",
                },
                {
                    status: 400,
                }
            );
        }

        const cart = await prisma.cart.create({
            data: {
                book_id: parseInt(book_id),
                quantity: parseInt(quantity),
                user_id: parseInt(session?.userId as string),
            },
        });

        return NextResponse.json(
            {
                sucess: true,
                message: "Success create new carts",
                data: cart,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Cart error:", error);
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

