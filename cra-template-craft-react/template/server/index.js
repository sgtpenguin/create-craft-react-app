import express from "express";

// we'll talk about this in a minute:
import serverRenderer from "./middleware/renderer";

const PORT = 3001;
const path = require("path");

// initialize the application and create the routes
const app = express();
const router = express.Router();

router.get("/index.html", serverRenderer);

//static resources should just be served as they are
router.use(
  express.static(path.resolve(__dirname, "..", "build"), {
    maxAge: "365d",
    index: false,
  })
);

// everything else should always serve our server rendered page
router.get("*", serverRenderer);

app.use(router);

app.listen(PORT, (error) => {
  if (error) {
    return console.log("something bad happened", error);
  }

  console.log("listening on " + PORT + "...");
});
