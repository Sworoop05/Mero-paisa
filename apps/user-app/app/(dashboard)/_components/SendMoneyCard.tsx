"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Inputbox } from "@repo/ui/inputbox";
import React, { useState } from "react";
import SendMoney from "../../lib/actions/sendMoney";
const SendMoneyCard = () => {
  const [amount, setAmount] = useState<number>(0);
  const [phone, setPhone] = useState<number | undefined>();
  const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(Number(e.target.value));
  };
  const amountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };
  const onClickHandler = async () => {
    const result = await SendMoney({ phone, amount });
    alert(result.message);
  };
  return (
    <Card
      title="Send Money"
      className={"rounded-sm bg-white flex flex-col items-center"}
    >
      <Inputbox
        label="Phone: "
        placeholder="Enter phone no."
        type="Number"
        onChange={phoneHandler}
      />
      <Inputbox
        label="Amount:"
        placeholder="Enter a amount"
        type="Number"
        onChange={amountHandler}
      />
      <Button onClick={onClickHandler} className={""}>
        Send Money
      </Button>
    </Card>
  );
};

export default SendMoneyCard;
