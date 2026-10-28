
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Enquiry from "./models/Enquiry.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Garg Tours backend is running");
});

app.post("/api/enquiries", async (req, res) => {
  try {
    const { name, email, travelDates, message } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
    }

    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim(),
      travelDates:
        typeof travelDates === "string" ? travelDates.trim() : "",
      message:
        typeof message === "string" ? message.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry saved successfully!",
      enquiryId: enquiry._id,
    });
  } catch (error) {
    console.error("Error saving enquiry:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save enquiry. Please try again.",
    });
  }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
