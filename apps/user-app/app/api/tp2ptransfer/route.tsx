import { NextRequest, NextResponse } from "next/server";
interface bodyTransferProps {
  senderId: number;
  receiverId: number;
  amount: number;
}
function POST(req: NextRequest, res: NextResponse) {
  const { senderId, receiverId, amount }: bodyTransferProps = req.body;
  if (!senderId || !receiverId || !amount) {
    res.json({ message: senderId });
  }
}
