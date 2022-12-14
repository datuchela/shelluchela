import express from "express";
import cors from "cors";
import { exec, spawn } from "node:child_process";
import { z } from "zod";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.text());

const PORT = 5050;

const commandValidator = z.string().min(1);

app.post("/run", (req, res) => {
  try {
    const cmd = commandValidator.parse(req.body);
    exec(cmd, (err, stdout) => {
      if (err) {
        console.error(err);
        return res.send(err);
      }
      return res.send(stdout);
    });
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
