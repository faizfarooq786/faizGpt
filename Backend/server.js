


import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import chatRoutes from "./routes/chat.js"


const app = express();
const PORT = process.env.PORT || 8080;
app.get('/healthz', (_,res)=>res.send('ok'));


const allowed = [
  'http://localhost:5173',             // Vite dev
  'http://localhost:3000',             // CRA dev
  'https://<your-frontend>.onrender.com' 
];


mongoose.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db");
  } catch (err) {
    console.log("Failed to connect with MongoDB", err);
  }
};


mongoose.connectDB();

app.use(express.json());
app.use(cors({ origin: allowed, credentials: true }));
app.use("/api", chatRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App is listening on port ${PORT}`);
});
