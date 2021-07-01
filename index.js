require("dotenv").config();
const users = require("./routes/users");
const auth = require("./routes/auth");
var path = require("path")
const morgan = require('morgan')
let nunjucks = require("nunjucks")
const homeRoute = require('./routes/home')
const aboutRoute = require('./routes/about')
const registerRoute = require('./routes/register')
const logginRoute = require('./routes/loggin')
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const app = express();

connection(); // connect with mongoose
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "http://localhost:8080"
};
// Then pass them to cors:
app.use(cors(corsOptions));

app.use(morgan('tiny')) 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.set("view engine", "html")
var env = nunjucks.configure(['views'],  { // setting default views folder
  autoescape: true,
  express: app
})

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', homeRoute)
app.use('/about', aboutRoute)
app.use('/register', registerRoute)
app.use('/loggin', logginRoute)
app.use("/api/users", users);
app.use("/api/auth", auth);


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
