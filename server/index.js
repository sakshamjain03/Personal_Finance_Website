import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import helmets from "helmet";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmets());
app.use(helmets.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// ROUTES
app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/management",managementRoutes);
app.use("/sales",salesRoutes);

// Mongose Setup
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
})
.then(()=>{
    app.listen(PORT,()=>console.log(`Server Port:${PORT}`))
}).catch((error)=>console.log(`${error}did not connect`))
