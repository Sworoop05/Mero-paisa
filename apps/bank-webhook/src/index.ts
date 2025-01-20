import express, { Request, Response } from 'express';
import db from '@repo/db/client'; // assuming this is a database client

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a type for the expected request body structure
interface PaymentRequestBody {
    token: string;
    user_identifier: string;
    amount: string | number; // amount could come as a string or number
}

// Payment route
app.post('/nabil', async (req, res) => {
    const { token, user_identifier, amount } = req.body;

    // Validate the incoming request body
    if (!token || !user_identifier || !amount) {
        return res.status(400).json({
            message: "Missing required fields: token, user_identifier, or amount."
        });
    }

    // Ensure amount is a valid number
    const amountParsed = Number(amount) / 100;
    if (isNaN(amountParsed) || amountParsed <= 0) {
        return res.status(400).json({
            message: "Amount must be a valid positive number."
        });
    }

    const paymentInformation = {
        token,
        userId: user_identifier,
        amount: amountParsed
    };
    const isProcessing = await db.onRampTransaction.findFirst({
        where: { token: paymentInformation.token }
    })
    if (isProcessing?.status == "Processing") {
        try {
            // Transaction logic here
            await db.$transaction(async (tx) => {
                const isExist = await tx.balance.findFirst(
                    {
                        where: { userId: paymentInformation.userId },
                        orderBy: {
                            createdAt: "desc"
                        }

                    }

                )
                await tx.balance.create({
                    data: {

                    }
                })

                await tx.onRampTransaction.update({

                    where: { token: paymentInformation.token },
                    data: { status: "Success" }
                })
            });

            return res.status(200).json({ message: "Captured" });
        } catch (error) {
            console.error("Error during transaction:", error);
            return res.status(500).json({ message: "Error while processing webhook" });
        }
    } else if (isProcessing?.status == "Success") {
        return res.status(500).json({ message: "Transaction has already completed " });
    } else {
        return res.status(500).json({ message: "Error while processing webhook" });
    }
});

// Ensure the app is listening on the appropriate port
app.listen(3003, () => {
    console.log('Server is running on port 3003');
});
