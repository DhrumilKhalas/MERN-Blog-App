import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 6500;
import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import path from "path"
import { fileURLToPath } from 'url';


const app = express();

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const connection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connected to MongoDB!"))
    .catch((err) => {
      console.log(err);
    });
};

// serving the frontend
const __filename = fileURLToPath(import.meta.url);
app.use(express.static(path.join(__filename, "../frontend/blog/build")))

app.get("*", function(_,res) {
    res.sendFile(
        path.join(__filename, "../frontend/blog/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

connection();

app.listen(PORT, () => {
 
  console.log(`Server is running on port: ${PORT}`);
});
