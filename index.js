const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 8000;
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post(
  "/upload",
  upload.fields([
    {
      name: "profileImage",
    },
    {
      name: "coverImage",
    },
    {
      name: "resume",
    },
  ]),
  (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
  }
);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
