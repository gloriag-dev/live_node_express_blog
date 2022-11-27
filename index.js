import express from "express";
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";
import * as dotenv from 'dotenv'

const app = express()

app.use(express.json())
app.use(cookieParser)
app.use('/posts', postRoutes)
app.use('/auth', authRoutes)


//     destination: function (req, file, cb) {
//       cb(null, "../client/public/upload");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//     },
//   });
  
//   const upload = multer({ storage });
  
//   app.post("/api/upload", upload.single("file"), function (req, res) {
//     const file = req.file;
//     res.status(200).json(file.filename);
//   });
app.listen(process.env.PORT, () => {
    console.log('Running')
})