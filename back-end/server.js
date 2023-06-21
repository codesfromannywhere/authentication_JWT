import express from "express";
import dotenv from "dotenv";
import { UserModel } from "./model/index.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";




dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

const PORT = process.env.BE_PORT || 3000;
const app = express();

const ReactAppDistPath = new URL("../front-end/dist/", import.meta.url);
const ReactAppIndex = new URL("../front-end/dist/index.html", import.meta.url);

app.use(express.json());
app.use(cookieParser())
app.use(express.static(ReactAppDistPath.pathname));


app.get("/api/status", (req, res) => {
  res.send({ status: "Ok" });
});



app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Überprüft, ob User existiert
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      // Bei bestehender E-Mail Adresse direkte Weiterleitung an "Login Components":
      return res.redirect("/login");
    }


    // Erstelle einen neuen Benutzer
    const newUser = new UserModel({ name, email });
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

    const token = user.generateAuthToken({ email });
    res.cookie("auth", token, { httpOnly: true, maxAge: 1000 * 60 * 30 }); // Cookie
    return res.status(200).json({ message: "Login erfolgreich", data: { token } });

  } catch (error) {
    res.status(500).json({ message: "Login fehlgeschlagen" });
  }
});


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1]; // Extrahiere den Token aus dem Authorization Header

  if (!token && req?.cookies?.auth) {
    token = req.cookies.auth;
  }

  if (!token) {
    return res.sendStatus(401); // Token nicht vorhanden
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token ungültig oder abgelaufen
    }

    req.user = user; // Speichere den Benutzer aus dem Token im Request-Objekt
    next(); // Rufe die nächste Middleware oder den Controller auf
  });
};


app.get("/api/secure", authenticateToken, (req, res) => {
  res.json(req.user);
});

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});
