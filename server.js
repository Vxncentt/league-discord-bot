import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Fix ES module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import bot
import(path.join(__dirname, "index.js"));

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot + Webserver running!");
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});
