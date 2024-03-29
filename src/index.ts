import fs from "fs";
import readline from "readline";

import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import TrieSearch from "trie-search";

import dummyMock from "./mocks/dummy.json";
import businessData from "./mocks/businessData.json";
import { Restaurant } from "./types";

const inputFilePath = "./src/mocks/business.json";
const outputFilePath = "./src/mocks/businessData.json";

if (!fs.existsSync(outputFilePath)) {
  const readStream = fs.createReadStream(inputFilePath, { encoding: "utf-8" });
  const writeStream = fs.createWriteStream(outputFilePath);

  const rl = readline.createInterface({
    input: readStream,
    output: writeStream,
    terminal: false,
  });

  const dataArray: Restaurant[] = [];

  rl.on("line", (line) => {
    try {
      const jsonObject = JSON.parse(line);
      dataArray.push(jsonObject);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });

  rl.on("close", () => {
    const outputData = JSON.stringify(dataArray);
    fs.writeFileSync(outputFilePath, outputData);
    console.log("Conversion completed.");
  });
}

dotenv.config();

const app = express();
const port = process.env.PORT;

const trie = new TrieSearch<Restaurant>("name");
(businessData as Restaurant[]).forEach((restaurant: Restaurant) => {
  trie.add(restaurant as unknown as Restaurant);
});

app.use(bodyParser.json());

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello, world");
});

app.get("/dummy", (req, res) => {
  res.json(dummyMock);
});

app.post("/search", (req, res) => {
  const { body } = req;

  if (typeof body?.name !== "string") {
    res.status(400);
    res.send("Bad Request");
  }

  const searchQuery: string = body.name;

  // const results = sampleBusinessData.filter((business) =>
  //   business.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  // );

  const results = trie.search(searchQuery.toLowerCase());

  res.json(results);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
