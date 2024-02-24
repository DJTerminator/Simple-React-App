import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbUrl } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware
app.use(express.json());

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-type"],
//   })
// );

app.get("/", (req, res) => {
  return res.status(201).send("MERN stack");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongodbUrl)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Listening to port, ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });
