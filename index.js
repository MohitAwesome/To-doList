import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the 'path' module
import path from "path";

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let newItemsIn = [];

app.get("/", (req, res) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();
  let day = today.toLocaleDateString("en-US", options);

  res.render("index", { kindOfDay: day, newListItems: newItemsIn });
});

app.post("/", (req, res) => {
  let newItems = req.body.newItems;
  newItemsIn.push(newItems);
  res.redirect("/");
});

app.get("/delete/:index", (req, res) => {
  const index = req.params.index;

  if (index >= 0 && index < newItemsIn.length) {
    newItemsIn.splice(index, 1);
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
