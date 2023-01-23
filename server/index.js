import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {dirname, join} from 'path';
import { fileURLToPath } from "url";

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async(req, res) => {
  res.send('Hello from dali');
});

// if (process.env.NODE_ENV === "production") {
//     //Set static folder
//     app.use(express.static("../client/dist"));
// }

// app.get('/*', function(req, res) {
//     res.sendFile(join(__dirname, "../client/dist/index.html"));
//   });

const startServer = async () => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server is running on port http://localhost:8080'));
    
    }catch(err){
        console.log(err);
    }
   
}

startServer();