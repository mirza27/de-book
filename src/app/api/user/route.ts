import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { getSession } from "@/app/lib/session";


export async function GET(request: Request) {

    const session = await getSession();
    try {
        if (session) {
            const carts = await prisma.cart.findMany({
                where: {
                    user: {
                        user_id: parseInt(session?.userId as string),
                    }
                }
            });

            const user = await prisma.user.findUnique({
                where: {
                    user_id: parseInt(session?.userId as string),
                }
            });


            return NextResponse.json(
                {
                    sucess: true,
                    data: carts,
                    user: user
                },
                {
                    status: 200,
                }
            );
        } else {
            return NextResponse.json(
                {
                    sucess: true,
                    message: "Cannot find session",
                },
                {
                    status: 200, // OK
                })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Cannot find author",
            error: error,
        },
            {
                status: 404, // OK
            })
    }


}