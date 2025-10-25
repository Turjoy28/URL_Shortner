const express = require('express')
const cookieParser = require("cookie-parser")
const {checkforAuthentication,restrictTo}=require("./middlewares/auth")
const path = require('path')
const staticRoute = require('./routes/staticRouter')
const URL = require("./models/url");  // ✅ Correct import
const urlRoute = require('./routes/url')
const { connect } = require('mongoose');
const connectMongoDB = require('./connect');
const userRoute = require('./routes/user')
const app = express();
const PORT = 8001;
app.set("view engine", "ejs")
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkforAuthentication)

app.use('/user',userRoute);
app.use("/",staticRoute);
app.use("/url",restrictTo(["Normal",'Admin']), urlRoute);



app.get('/url/:shortId', async (req, res) => {

    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortId,
    },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            }
        }, { new: true })
    res.redirect(entry.redirectURL);

})


connectMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB connected"))

app.listen(PORT, () => console.log(`Server Started at http://localhost:${PORT}`))