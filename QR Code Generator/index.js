
import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/generate", (req, res) => {
    const url = req.body["url"];
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("public/images/qr-generate.png"));
    fs.writeFile("public/text/url-text.txt", url, (err) => {
        if (err) throw err;
        console.log("File is created!");
    });
    res.render("generate.ejs");
});

app.post("/new", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});