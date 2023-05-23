import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

import register from "./controllers/auth.js";
import userRoutes from "./routes/users.js";

/* MIDDLEWARE CONFIGS */
const __filename = fileURLToPath(import.meta.url);//to grab file url
const __dirname = path.dirname(__filename);//to get the directory from file path
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());//helmet makes secure by giving https headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));//that lets websites to protect from requests from other origins
app.use(morgan("common"));//simplify log req.. to your app
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));//set the directory of assets to 

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");//all the uploaded images to to this folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/* ROUTES WITH FILES*/
app.post("auth/register", upload.single("picture"),register)//auth/register is the route upload.single... is the middleware func

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


/*MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    //to ensure latest ver of MONGODB
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port:${PORT} running`));
}).catch((error) => console.log(`${error} did not connect`))

