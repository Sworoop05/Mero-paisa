"use server";
import React from "react";
import Transactions from "../../lib/actions/transactions";
import { AuthOptions } from "next-auth";
import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Span } from "next/dist/trace";
const getTransaction = async () => {
  const transactions = await Transactions();
  return transactions.result;
};
const TransactionsCard = async () => {
  const session = await getServerSession(authOptions);
  const allTransactions = await getTransaction();
  return (
    <div className="min-w-[700px] ">
      <Card
        className=" min-w-full sm:min-w-full flex  flex-col  "
        title="Recent transaction"
      >
        <div className="mb-10 flex flex-col gap-3">
          {allTransactions?.map((field) => {
            return (
              <div
                className="flex justify-between border-b-2 w-full "
                key={field.id}
              >
                <div className="flex flex-col">
                  <span className="text-lg">
                    {field.fromUserId == Number(session?.user?.id)
                      ? `Sent Money`
                      : `Received Money`}
                  </span>
                  <span className="text-sm opacity-70">
                    {" "}
                    {new Date(field.timeStamp).toLocaleString()}
                  </span>
                </div>

                {field.fromUserId == Number(session?.user?.id) ? (
                  <span className="text-red-600"> - Rs {field.amount}</span>
                ) : (
                  <span className="text-green-400">+ Rs {field.amount}</span>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default TransactionsCard;
