var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/customDetails', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

app.post("/sign_up", (req, res) => {
    var client = req.body.name;
    var email = req.body.email;
    var compname = req.body.compname;
    var orderitem = req.body.orderitem;
    console.log(orderdate);
    var date = new Date();
    var orderdate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var future = new Date();
    var deliverdate = future.setDate(future.getDate() + 30);
    // var phno = req.body.phno;
    // var password = req.body.password;
    // var c_password = req.body.c_password;

    var data = {
        "client": client,
        "email": email,
        "compname": compname,
        "orderdate": orderdate,
        "orderitem": orderitem,
        "status": "Pending",
        "total": orderitem * 15
    }

    db.collection('details').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);
// const getDocument= async
app.get("/getdata", async (res, req) => {
    try {
        let email = req.body.email;
        const result = db.collection('users').find(email);
        await result.save();
        console.log(result);
        return res.redirect('signup_success.html');
    } catch (err) {
        console.log();
    }
})

console.log("Listening on PORT 3000");