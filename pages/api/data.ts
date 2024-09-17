import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";

// Define the path to the JSON file
const filePath = path.join(process.cwd(), "data.json");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Handle saving new data
    const newData = req.body;

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContent);
      data.push(newData); // Add new data to the existing array

      // Write the updated data back to the file
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save data" });
    }
  } else if (req.method === "GET") {
    // Handle reading data
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContent);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to read data" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
