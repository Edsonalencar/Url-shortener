import express from "express";
import errorHandler from "./middlewares/erorr-hendler.middleware";
import shortenerRoute from "./routes/shortener.route";
import statusRoute from "./routes/status.route";
import db from "./db";
const app = express()

const host = "http://localhost:";
const port = 3562;

// Configurações
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

db.Connect()

//Endpoints
app.use(statusRoute)
app.use(shortenerRoute)

//Error Hendlers
app.use(errorHandler);

app.listen(port, () => console.log(`Running in ${host}${port}`))