import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials) {
                if (!credentials?.phone || !credentials?.password) {
                    return null;
                }

                // Try to find the user with the provided phone number
                const existingUser = await db.user.findFirst({
                    where: { number: credentials.phone }
                });

                if (existingUser) {
                    // If user found, compare password
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        // Return user object with expected properties
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        };
                    }
                    return null; // Invalid password
                }

                // If no user exists, create a new user and balance
                try {
                    const result = await db.$transaction(async (prisma) => {
                        const user = await prisma.user.create({
                            data: {
                                number: credentials.phone,
                                password: await bcrypt.hash(credentials.password, 10),
                            },
                        });

                        const balance = await prisma.balance.create({
                            data: {
                                userId: user.id,
                                amount: 0,
                                locked: 0,
                            },
                        });

                        return { user, balance };
                    });

                    // Return newly created user object
                    return {
                        id: result.user.id.toString(),
                        name: result.user.name,
                        email: result.user.number,
                    };
                } catch (e) {
                    console.error('Error during user creation:', e);
                    return null; // Return null if error occurs during creation
                }
            },
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }) {
            // Initialize session.user if undefined and assign token values
            if (!session.user) {
                session.user = { id: '', name: null, email: '' }; // Default values
            }

            // Set user information from token to session
            session.user.id = token.sub ?? session.user.id;
            session.user.name = token.name ?? session.user.name;
            session.user.email = token.email ?? session.user.email;

            return session;
        },
        async jwt({ token, user }) {
            // If a user is returned from the authorization function, include it in the token
            if (user) {
                token.sub = user.id;
                token.email = user.email;
                token.name = user.name;
            }

            return token;
        },
    },
};
