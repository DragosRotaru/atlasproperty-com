import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("client/build"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(8000, error => {
  if (error) {
    console.log("error", error);
  } else {
    console.log("info", `Server Initialized on 8000`);
  }
});
