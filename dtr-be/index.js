
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (name === "admin" && password === "admin") {
    res.render("success", {
        user :{
            username: name,
    
        }
    });
  } else {
    res.render("failure");
  }
});

app.listen(3001, () => {
  console.log("server started on port 3001");
});