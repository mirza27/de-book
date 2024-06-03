
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";
import { createSession } from "@/app/lib/session";

const authOptions = {
    providers: [CredentialsProvider(
        {
            type: "credentials",
            credentials: {
            },
            authorize: async (credentials, req) => {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                if (!email || !password) {
                    return null;
                }
                const userFound = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                // jika user tidak ada maka lanjut ke admin
                if (!userFound) {
                    const adminFound = await prisma.admin.findUnique({
                        where: {
                            email: email,
                        },
                    });


                    if (!adminFound) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, adminFound.password);
                    if (!passwordMatch) {

                        return null;
                    }

                    return {
                        id: `${adminFound.admin_id}`,
                        name: adminFound.name,
                        email: adminFound.email,

                    }


                }

                if (!userFound) {

                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, userFound.password);
                if (!passwordMatch) {

                    return null;
                }

                return {
                    id: `${userFound.user_id}`,
                    name: userFound.name,
                    email: userFound.email,

                }

            }
        }
    )],
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as DELETE, handler as PATCH, handler as PUT };