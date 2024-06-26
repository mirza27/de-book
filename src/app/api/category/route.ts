import { NextResponse } from "next/server";
import prisma from '../../../../prisma';
import { BookCategory } from '@prisma/client';

// ambil semua category
export async function GET() {
    try {
        const categories: BookCategory[] = await prisma.bookCategory.findMany({
            include: {
                books: true,
            }
        }
        );

        return NextResponse.json(
            {
                sucess: true,
                message: "Success get data categories",
                data: categories,
            },
            {
                status: 200
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                sucess: false,
                message: "Fail get data categories",
                error: error,

            },
            {
                status: 200,
            }
        );

    }
}

