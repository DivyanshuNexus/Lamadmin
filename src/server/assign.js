const express = require('express');
const { Suprsend } = require('@suprsend/node-sdk');

const app = express();
const PORT = 3000;

// Initialize Suprsend client with your credentials
const supr_client = new Suprsend("PjIUGTYtYfZLxibT6DTQ", "SS.WSS.cedDqtt0xqLdI2q_Rlf5nHDGuOLPqCEI9D6BDLPa");

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to trigger a notification
app.post('/send-notification', async (req, res) => {
  const { message, userData } = req.body;

  try {
    const response = await supr_client.track(
      "nexus", // notification type or channel
      "MY FIRST NOTIFICATION",
    {
        firstName: "Divyanshu",
    }
    );

    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});