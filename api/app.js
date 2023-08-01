const express=require("express");
const app=express()
const mongoose=require("mongoose")
const morgan=require("morgan")
const bodyParser=require("body-parser")
require("dotenv").config()
var cors=require('cors')
const whitelist = ['http://localhost:3000', 'https://64c8e2a8733b396515cc7d0b--dashing-rabanadas-023890.netlify.app/'];
app.options('*', cors());
const corsOptions = {
credentials: true,
origin: (origin, callback) => {
   if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
     } else {
       callback(new Error('Not allowed by CORS'));
    }
  },
 };
var cookieParser=require('cookie-parser')
const authRoutes=require('./routes/authRoutes.js')
const postRoutes=require('./routes/postRoutes.js')

const errorHandler=require('./middleware/error.js')
// app.use((req, res, next) => {
//  res.setHeader('Access-Control-Allow-Origin', 'https://64c8e0efdbec666bba5e8155--hilarious-chebakia-8b8a6f.netlify.app/')
// res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
// res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
// res.setHeader('Access-Control-Allow-Credentials', 'true')
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

//app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());
app.use(cors());

app.use('/api',authRoutes);
app.use('/api',postRoutes);


app.use(errorHandler)
const port=process.env.PORT||4000
app.listen(port,()=>{
    console.log(`Server listening on port${port}`);
})
