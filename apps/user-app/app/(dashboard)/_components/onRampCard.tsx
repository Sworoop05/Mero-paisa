import { Card } from "@repo/ui/card";
import React from "react";
import { Transaction } from "@repo/types/transactiontype";

const OnRampCard = ({ transaction }: { transaction: Transaction[] }) => {
  return (
    <div>
      <Card
        className="min-w-[400px] sm:min-w-full flex  flex-col  "
        title="Recent transaction"
      >
        <div className="mb-10 flex flex-col gap-3">
          {transaction && transaction.length > 0 ? (
            transaction.map((field) => (
              <div
                className="flex justify-between border-b-2 w-full"
                key={field.id}
              >
                <div className="flex flex-col">
                  <span className="text-lg">Received Npr</span>
                  <span className="text-sm opacity-70">
                    {new Date(field.startTime).toLocaleString()}
                  </span>
                </div>
                <span>+ Rs{field.amount / 100}</span>
              </div>
            ))
          ) : (
            <p>No transactions</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OnRampCard;
