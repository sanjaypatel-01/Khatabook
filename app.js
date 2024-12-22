
const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>  {
    fs.readdir(`./hisaab`, function (err, files) {
       // console.log(err, files)
       if (err) return res.status(500).send(err);
       res.render("index", {files: files})
    });
});

app.get("/create", function (req, res) {
    res.render("create");
});

app.get("/edit/:filename", function (req, res) {
    fs.readFile(`./hisaab/${req.params.filename}`, "utf-8", function(err, filedata) {
        if(err) return res.status(500).send(err);
        res.render("edit", {filedata, filename: req.params.filename});
    })
});

app.post("/update/:filename", function (req, res) {
    fs.writeFile(`./hisaab/${req.params.filename}`, req.body.content, function(err){
        if(err) return res.status(500).send(err);
        res.redirect("/");
    })
});

app.post("/createhisaab", function (req, res) {
    // res.send(req.body);

    var currentDate = new Date(); 
    var date = `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`;  //month pe +1 ishliye kia, kyunki ye month ko 0 se count krte hein

    fs.writeFile(`./hisaab/${date}.txt`, req.body.content, function(err){ //./hisaab/${req.body.title} ab hame title ish se nahi cahiye
        if(err) return res.status(500).send(err);
        res.redirect("/");   
    });
});

app.listen(3000); 


// const express = require('express');
// const app = express();
// const path = require('path');
// const fs = require('fs');
// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.get("/", (req, res) =>  {
//     res.send("hey")
// });
// app.get("/create", (req, res) => {
//     const today = new Date();
//     const day = String(today.getDate()).padStart(2, '0'); // Ensures 2 digits for the day
//     const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//     const year = today.getFullYear();
//     const fn = `${day}-${month}-${year}.txt`;
//     fs.writeFile(`./files/${fn}`, "daal cheeni", function(err){
//         if(err) return res.send("something went wrong");
//         else res.send("done");
//     })
// });
// app.listen(3000); 

// This is just to start the server 
// This starts the server and listens for incoming requests on port 3000