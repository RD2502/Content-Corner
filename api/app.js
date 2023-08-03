const express=require("express");
const app=express()
const mongoose=require("mongoose")
const morgan=require("morgan")
const bodyParser=require("body-parser")
require("dotenv").config()
var cors=require('cors')
var cookieParser=require('cookie-parser')
const authRoutes=require('./routes/authRoutes.js')
const postRoutes=require('./routes/postRoutes.js');
const errorHandler=require('./middleware/error.js');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "monumental-cheesecake-904437.netlify.app/");
res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());

app.use('/api',authRoutes);
app.use('/api',postRoutes);


app.use(errorHandler)
const PORT=process.env.PORT||4000
app.listen(PORT,()=>{
    console.log(`Server listening on port${PORT}`);
})
