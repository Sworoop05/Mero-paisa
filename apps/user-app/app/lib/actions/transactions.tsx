"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import Prisma from "@repo/db/client";
async function Transactions() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return {
        status: 401,
        message: "Unauthorized access",
      };
    const id = Number(session?.user?.id);
    const result = await Prisma.p2pTransfer.findMany({
      where: {
        OR: [
          {
            toUserId: id,
          },
          {
            fromUserId: id,
          },
        ],
      },
    });

    if (!result) {
      return {
        status: 404,
        message: "There is no transaction",
      };
    }
    return {
      status: 200,
      message: "successfully fetched transaction",
      result,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
}
export default Transactions;
