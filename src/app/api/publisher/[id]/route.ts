import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { getSession } from "@/app/lib/session";

interface Params {
    id: string;
}

// delete publisher
export async function DELETE(request: Request, { params }: { params: Params }) {
    const publisher_id = parseInt(params.id);

    try {
        if (isNaN(publisher_id)) {
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


        const books = await prisma.book.findMany({
            where: {
                publisher_id: publisher_id
            }
        })

        if (books.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Cannot delete author because there are books associated with this author",
                    data: null,
                },
                {
                    status: 400, // Bad Request
                }
            );
        }

        const publisher = await prisma.publisher.delete({
            where: {
                publisher_id: publisher_id,
            }
        })


        return NextResponse.json(
            {
                success: true,
                message: "Success delete publisher",
                data: publisher,
            },
            {
                status: 200, // OK
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Cannot delete publisher",
                error: error,
            },
            {
                status: 500, // Internal Server Error
            }
        );
    }


}