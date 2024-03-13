const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDB");

// Config dot env file
dotenv.config();
connectDb();

// Create express app
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
// User routes
app.use('/api/v1/users', require('./routes/userRoute'));

// Transaction routes
app.use("/api/v1/transactions", require("./routes/transectionRoutes"));

// Define the port
const port = process.env.PORT || 8081; // Use port 8082 if PORT environment variable is not set

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
