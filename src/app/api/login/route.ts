import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import bcrypt from "bcrypt";
import { createSession } from "@/app/lib/session";

// login
export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        // Cari pengguna berdasarkan alamat email
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        // Jika pengguna tidak ditemukan
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email not found",
                },
                {
                    status: 404, // Not Found
                }
            );
        }

        // Bandingkan password yang diberikan dengan password yang tersimpan dalam database
        const passwordMatch = await bcrypt.compare(password, user.password);
        

        // Jika password tidak cocok
        if (!passwordMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Incorrect password",
                },
                {
                    status: 401, // Unauthorized
                }
            );
        }
        await createSession(user.user_id.toString());
        // Jika email dan password cocok, kirim respons berhasil
        return NextResponse.json(
            {
                success: true,
                message: "Login successful",
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                },
            },
            {
                status: 200, // OK
            }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            {
                status: 500, // Internal Server Error
            }
        );
    }
}
