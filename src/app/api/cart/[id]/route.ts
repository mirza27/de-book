import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

interface Params {
    id: string;
}

// update cart
export async function PATCH(request: Request, { params }: { params: Params }) {
    const cart_id = parseInt(params.id);
    const {
        quantity,
    } = await request.json();

    try {
        if (isNaN(cart_id)) {
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

        const carts = await prisma.cart.update({
            where: {
                cart_id: cart_id,
            },
            data: {
                quantity: quantity,
            }
        })

        if (!carts) {
            return NextResponse.json(
                {
                    success: false,
                    message: "cart data update unsuccessful",
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
                    message: "cart data update successful",
                    data: null,
                },
                {
                    status: 200, // OK
                }
            );
        }
    } catch (error) {
        console.error("cart error:", error);
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


export async function DELETE(request: Request, { params }: { params: Params }) {
    const cart_id = parseInt(params.id);

    try {
        if (isNaN(cart_id)) {
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

        const cart = await prisma.cart.delete({
            where: {
                cart_id: cart_id,
            }
        })

        return NextResponse.json(
            {
                success: false,
                message: "cart data deleted successfully",
                data: null,
            },
            {
                status: 200,
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
                status: 404, // OK
            }
        );
    }
}
