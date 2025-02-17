//setup express app
import express from "express";
import path from "node:path";
import { Eta } from "@eta-dev/eta";

const app = express();

app.use(express.static("public"));

const eta = new Eta({ views: path.join(import.meta.dirname, "templates") });

app.get("/", async (req, res) => {
  //fetch jsonplaceholder

  try {
    // Fetch posts from JSONPlaceholder API
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    // Render the template with posts using Eta
    res.send(eta.render("./index.eta", { posts }));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/posts/:queryId", async (req, res) => {
  const { queryId } = req.params;

  try {
    // Fetch post from JSONPlaceholder API
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + queryId
    );
    const post = await response.json();

    res.send(eta.render("./query/index.eta", { queryId, post }));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3008, () => {
  console.log("listening on port 3000");
});
