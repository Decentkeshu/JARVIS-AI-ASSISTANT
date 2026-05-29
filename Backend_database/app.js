const express  = require('express');
const app = express();
const mongoose = require('mongoose');
const db_path = "mongodb+srv://keshavkumar:Keshavkumar_123@keshav.9kshnyu.mongodb.net/Jarvis?appName=keshav";
const cors = require('cors');
const chatrouter = require('./routes/chatroute');
const userrouter = require('./routes/userroute');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/chat",chatrouter);
app.use("/api/user",userrouter);
const PORT = 3001;
mongoose.connect(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: false,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`The server is running at http://www.localhost:${PORT}`);
    });
}).catch(err => {
    console.log("DB error:", err.message);
});