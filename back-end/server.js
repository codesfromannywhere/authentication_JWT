import express from "express";
import dotenv from "dotenv";
// const jwt = require('jsonwebtoken');

import { UserModel } from "./model/index.js"


dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

const PORT = process.env.BE_PORT || 3000;
const app = express();

const ReactAppDistPath = new URL("../front-end/dist/", import.meta.url);
const ReactAppIndex = new URL("../front-end/dist/index.html", import.meta.url);

app.use(express.json());
app.use(express.static(ReactAppDistPath.pathname));


app.get("/api/status", (req, res) => {
  res.send({ status: "Ok" });
});

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});


app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Überprüft, ob User existiert
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "E-mail wird bereits verwendet." });
    }

    // Erstelle einen neuen Benutzer
    const newUser = new UserModel({ email });
    newUser.setPassword(password);

    // Speichert User in DB
    await newUser.save();

    res.status(201).json({ message: "Benutzer erfolgreich erstellt" });
  } catch (error) {
    res.status(500).json({ message: "Benutzer konnte nicht erstellt werden" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Überprüft, ob User existiert
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Ungültige E-mail oder Passwort" });
    }

    // Überprüft PW
    const isPasswordValid = user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Ungültige E-mail oder Passwort" });
    }

    res.status(200).json({ message: "Login erfolgreich" });
  } catch (error) {
    res.status(500).json({ message: "Login fehlgeschlagen" });
  }
});


app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});
