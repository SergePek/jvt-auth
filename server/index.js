require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
const https = require('https')
const fs = require('fs')
const path = require('path')
const errorMiddleware = require('./middlewares/error-middleware')
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        // https
        //     .createServer(
        //         // Provide the private and public key to the server by reading each
        //         // file's content with the readFileSync() method.
        //         {
        //             key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        //             cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
        //         },
        //         app
        //     )
        //     .listen(PORT, () => {
        //         console.log(`Server started on PORT = ${PORT}`);
        //     });
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();