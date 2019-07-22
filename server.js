var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var mongoose = require("mongoose")
var port = process.env.PORT || 8000
// mongoose.set('useCreateIndex', true);

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/project1-backend',{ useNewUrlParser: true })
// .then(
//     () => {
//       console.log('Connected to mongoDB');
//     },
//     (err) => console.log('Error connecting to mongoDB', err)
//   );

const mongoURI = 'mongodb://localhost:27017/project1-backend'

mongoose
.connect(mongoURI, {useNewUrlParser: true})
.then(() => console.log("mongoDB connected"))
.catch(err => console.log(err))

const Users = require('./routes/Users')
const StudentProfile = require('./routes/StudentPro')


app.use('/users', Users)
app.use('/users', StudentProfile)

app.get('/', function(req, res) {
  res.send('hello');
});


app.listen(port,() => {
    console.log("server is running on port :" + port)
})