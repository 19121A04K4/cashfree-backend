const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
// Middleware
app.use(cors());
app.use(express.json());

// Environment Variables
const APP_ID = process.env.CASHFREE_APP_ID;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Cashfree backend is live!");
});

// Payment link route
app.post("/create-payment-link", async (req, res) => {
  const { customerPhone, product, size, quantity } = req.body;

  try {
    const response = await axios.post(
      "https://api.cashfree.com/pg/links",
      {
        customer_details: {
          customer_phone: customerPhone,
        },
        link_notify: {
          send_sms: true,
          send_email: false,
        },
        link_notes: {
          product,
          size,
          quantity,
        },
        link_amount: 100,
        link_currency: "INR",
        link_purpose: `Order for ${product} (${size}) x${quantity}`,
      },
      {
        headers: {
          "x-api-version": "2022-09-01",
          "Content-Type": "application/json",
          "X-Client-Id": APP_ID,
          "X-Client-Secret": SECRET_KEY,
        },
      }
    );

    res.json({ link: response.data.link_url });
  } catch (error) {
    console.error("Cashfree Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create payment link" });
  }
});

// Start server
 
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

