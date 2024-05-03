import { NextResponse } from "next/server";
import prisma from '../../../../../prisma';
import { BookCategory } from '@prisma/client';

// ambil semua buku dan categorynya
export async function GET() {
    try {
        const categories: BookCategory[] = await prisma.bookCategory.findMany();

        return NextResponse.json(
            {
                sucess: true,
                message: "Success get data catgories",
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

            },
            {
                status: 200,
            }
        );
        
    }
}

