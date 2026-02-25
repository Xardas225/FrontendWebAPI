import express from "express";
import { pipeline } from "@huggingface/transformers";

const app = express();
app.use(express.json());

let extractor;

(async () => {
  extractor = await pipeline(
    "feature-extraction",
    "Xenova/multilingual-e5-small",
  );
  console.log("Model loaded");
})().catch((err) => {
  console.error("Failed to load model", err);
  process.exit(1);
});

app.post("/embed", async (req, res) => {
  try {
    const { text, type = "query" } = req.body;
    if (!text) return res.status(400).json({ error: "text required" });

    const prefixed = type === "query" ? `query: ${text}` : `passage: ${text}`;

    const result = await extractor(prefixed, {
      pooling: "mean",
      normalize: true,
    });
    const embedding = Array.from(result.data);

    res.json({ embedding });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
