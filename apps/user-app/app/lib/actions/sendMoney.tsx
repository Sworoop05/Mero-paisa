"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

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

  const receiver = await prisma.user.findFirst({
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
    const result = await prisma.$transaction(async (tx) => {
      // Lock sender's balance row and check sufficient funds
      const senderBalance = await tx.balance.findFirst({
        where: {
          userId: senderId,
        },
      });

      if (!senderBalance || senderBalance.amount < userInputAmount) {
        throw new Error("Insufficient balance");
      }

      // Decrement sender's balance
      await tx.balance.update({
        where: { id: senderBalance.id },
        data: {
          amount: { decrement: userInputAmount },
        },
      });

      // Find receiver's balance and increment it
      const receiverBalance = await tx.balance.findFirst({
        where: { userId: receiverId },
      });

      if (!receiverBalance) {
        throw new Error("Receiver balance not found");
      }

      await tx.balance.update({
        where: { id: receiverBalance.id },
        data: {
          amount: { increment: userInputAmount },
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
