import express from "express";
import "./index.js"; // starts the Discord bot

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot + Webserver running!");
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});
