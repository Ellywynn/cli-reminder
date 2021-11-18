const express = require("express");
const notifier = require("node-notifier");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/ping", (req, res) => {
  res.status(200).send();
});

app.post("/notify", (req, res) => {
  notify(req.body, (reply) => res.send(reply));
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

function notify({ title, message }, cb) {
  notifier.notify(
    {
      title: title || "Unknown title",
      message: message || "Unknown message",
      icon: path.join(__dirname, "logo.png"),
      sound: true,
      wait: true,
      reply: true,
      closeLabel: "Completed",
      timeout: 15,
    },
    (err, res, reply) => {
      cb(reply);
    }
  );
}
