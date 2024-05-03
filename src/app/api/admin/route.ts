import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import bcrypt from "bcrypt";

// ADD NEW ADMIN
export async function POST(request: Request) {
    const { name, email, password,} = await request.json();

    try {
        const existingUser = await prisma.admin.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is already in use",
                },
                {
                    status: 400, // Bad Request
                }
            );
        }

         // Hash password sebelum menyimpannya di database
         const hashedPassword = await bcrypt.hash(password, 10);

         // Buat user baru dalam database
         const newAdmin = await prisma.admin.create({
             data: {
                 name: name,
                 email: email,
                 password: hashedPassword,
             },
         }); 

           // Jika registrasi berhasil, kirim respons berhasil
        return NextResponse.json(
            {
                success: true,
                message: "Registration admin successful",
                user: {
                    user_id: newAdmin.admin_id,
                    name: newAdmin.name,
                    email: newAdmin.email,
                  
                },
            },
            {
                status: 201, // Created
            }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to register admin",
                error: error,
            },
            {
                status: 500, // Internal Server Error
            }
        );
    }
}