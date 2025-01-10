"use server"
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
export const getOnRampTransaction = async function () {
    const session = await getServerSession(authOptions);
    console.log(session?.user)
    if (!session?.user?.id) {
        return { message: "unauthorized user" };
    }
    const data = await prisma.onRampTransaction.findMany({
        where: { userId: Number(session?.user?.id) },
    });
    return data;
};
export const getBalance = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user)
            return {
                message: "Unauthorized user"
            }
        const getbalance = await prisma.balance.findFirst({
            where: {
                userId: Number(session?.user?.id)
            }
        })
        return getbalance;
    } catch (error) {
        throw new Error("Something went wrong while retrieving the balance")
    }
}
