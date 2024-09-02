const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Route/index");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("dotenv").config();

const Port = 5500;
const Hostname = "localhost";
const authRoute = require("./Controller/auth");
const paypalRoute = require("./Controller/Paypal/payments");
const passportSetup = require("./Controller/passport");
const mpesaRoute = require("./Controller/mpesa");


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,POST,PUT,DELETE, PATCH",
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: "X-Requested-With,content-type, x-token, Access-Control-Allow-Credentials"
}

// Request Management
const app = express();

app.use(cookieSession({ name: "session", keys: ["zomato"], maxAge: 24 * 60 * 60 * 1000 }));

app.use(express.json()); // A body Parser Required to post a data
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use('/', route);
app.use('/api/paypal/', paypalRoute); // Paypal Payment Gateway
app.use('/auth', authRoute);
app.use('/mpesa', mpesaRoute); //Mpesa payement gateway




//mongodb atlas connection
const Matlas = process.env.MONGO_MATLAS



mongoose.connect(Matlas, { //created a mongoDB server connection
    //useNewUrlParser: true,
    //useUnifiedTopology: true
})

.then(res => {
        app.listen(Port, Hostname, () => {
            console.log(`Server is running at ${Hostname}: ${Port}`)
        });
    })
    .catch(err => console.log(err));