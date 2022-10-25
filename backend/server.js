var http = require("http");
const express = require("express");
const cors = require("cors");


const bodyParser = require("body-parser");
var fsExtra = require("fs-extra");
var ls = require("local-storage");

const path = require("path");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = 1010;

const data = require("./db.json");
ls.set("data", data);

app.get("/employees", async (req, res) => {
    res.send(ls.get("data"));
});


function removeObjectWithId(arr, id) {
    const objectWithIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objectWithIndex, 1);

    return arr;
}


//Add new employees
app.post("/employee", async (req, res) => {
    let newData = ls.get("data");
    newData.push({
        designation: req.body.designation,
        name: req.body.name,
        id: req.body.id,
        experience: req.body.experience,
        doj: req.body.doj,
        email: req.body.email,
    });
    console.log(newData, "newData")
    ls.set("data", newData);
    res.send("succes");
});


//edit
app.put("/employee/:id", async (req, res) => {
    let id = req.params.id;
    let newData = ls.get("data")
    newData.forEach(function (element) {
        if (element.id === id) {
            element.name = req.body.name;
            element.email = req.body.email;
            element.designation = req.body.designation;
            element.experience = req.body.experience;
            element.id = req.body.id;
            element.doj = req.body.doj;
        }
    });
    ls.set("data", newData);
    res.send("Succes")
})



//Delete
app.delete("/employee/:id", async (req, res) => {
    let newData = ls.get("data");
    let id = req.params.id;
    let filterData = removeObjectWithId(ls.get("data"), id);
    ls.set("data", filterData);
    res.send("Success")
});



app.listen(PORT, () => {
    console.log("server started", PORT)
})