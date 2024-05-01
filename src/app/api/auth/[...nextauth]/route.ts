
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma";
import bcrypt from "bcrypt";

export const authOptions = {
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


export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };