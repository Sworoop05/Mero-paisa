"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import Prisma from "@repo/db/client"; // Assuming Prisma is the correct import for your client

async function SendMoney({
  phone,
  amount,
}: {
  phone: number | undefined;
  amount: number;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return {
      status: 401,
      message: "Unauthorized access",
    };
  }
  const userInputAmount = Number(amount);
  const senderId = Number(session?.user?.id);
  const receiverNumber = phone?.toString();
  if (!receiverNumber || !senderId) {
    return {
      status: 400,
      message: "Phone number and sender ID are required",
    };
  }

  console.log(receiverNumber);

  const receiver = await Prisma.user.findFirst({
    where: {
      number: receiverNumber,
    },
    select: {
      id: true,
    },
  });

  if (!receiver) {
    console.log("User with this phone not found");
    return {
      status: 404,
      message: "User with this phone number not found",
    };
  }

  const receiverId = receiver.id;
  if (receiverId === senderId) {
    console.error("You cannot send money to your own account");
    return {
      status: 400,
      message: "You cannot send money to your own account",
    };
  }

  try {
    // Start the transaction
    const result = await Prisma.$transaction(async (tx) => {
      // Fetch the sender's balance for update
      const balanceCheck = await tx.balance.findFirst({
        where: {
          userId: senderId,
        },
      });

      if (!balanceCheck || balanceCheck.amount < amount) {
        throw new Error("Insufficient balance");
      }

      // Update sender's balance by decrementing the amount
      await tx.balance.create({
        data: {
          userId: senderId,
          amount: amount - userInputAmount,
        },
      });
      // Update receiver's balance by incrementing the amount
      await tx.balance.create({
        data: {
          userId: receiverId,
          amount: amount + userInputAmount,
        },
      });

      // Create the transfer record
      await tx.p2pTransfer.create({
        data: {
          amount: userInputAmount,
          timeStamp: new Date(),
          fromUserId: senderId,
          toUserId: receiverId,
        },
      });

      return { message: "Transaction was successful" };
    });

    return result;
  } catch (error: any) {
    console.error(error);
    return {
      message: "Transaction failed between p2p",
      error: error.message || error,
    };
  }
}

export default SendMoney;
