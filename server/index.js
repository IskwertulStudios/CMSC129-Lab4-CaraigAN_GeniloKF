import express from "express";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
const port = Number(process.env.PORT || 3001);

const dataDir = path.resolve("server", "data");
const dataFile = path.join(dataDir, "tasks.json");

app.use(express.json());

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

async function readTasksFile() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeTasksFile(tasks) {
  await ensureDataFile();
  await fs.writeFile(dataFile, JSON.stringify(tasks, null, 2), "utf8");
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/tasks", async (_req, res) => {
  const tasks = await readTasksFile();
  res.status(200).json({ tasks });
});

app.post("/api/tasks", async (req, res) => {
  const { tasks } = req.body ?? {};
  if (!Array.isArray(tasks)) {
    return res.status(400).json({ error: "tasks must be an array" });
  }

  await writeTasksFile(tasks);
  return res.status(200).json({ ok: true, count: tasks.length });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Task API listening on http://localhost:${port}`);
});
