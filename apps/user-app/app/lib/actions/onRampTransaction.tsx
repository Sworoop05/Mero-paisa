"use server";
import React from "react";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import Prisma from "@repo/db/client";
const CreateonRampTransaction = async (amount: number, provider: string) => {
  //ideally token should come here from the banks
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!session?.user || !session?.user?.id) {
    return {
      message: "unauthenticated user",
    };
  }
  const token = Math.floor(Math.random() * 99999999 + 100000000).toString();
  const result = await Prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount,
      status: "Processing",
      provider,
      startTime: new Date(),
      token,
    },
  });
  return {
    message: "onRampTransaction Added",
  };
};

export default CreateonRampTransaction;
