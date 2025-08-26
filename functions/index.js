const functions = require("firebase-functions");
const express = require("express");
const app = express();

app.get("/v1/health", (req, res) => {
  res.status(200).send("Servidor activo");
});

exports.api = functions.https.onRequest(app);
