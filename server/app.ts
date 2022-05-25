import express from "express";
import { Request, Response, Application } from "express";
import * as fs from "fs";
import { uuid } from "uuidv4";
import bodyParser from "body-parser";

interface PuppyType {
  id: number;
  breed: string;
  name: string;
  birth: string;
  url: string;
}

const dataValidator = (breed: string, name: string, birth: string) => {
  if (!breed || !name || !birth) {
    return false;
  }
  return true;
};

const data = fs.readFileSync("./db.json", "utf8");
const puppiesData = JSON.parse(data);

const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/puppies", (_req: Request, res: Response) => {
  return res.status(200).set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }).json(puppiesData);
});


app.get("/api/puppies/:id", (req: Request, res: Response) => {
  const puppyId: number = +req.params.id!;
  const results = puppiesData.find((puppy: PuppyType) => puppyId === puppy.id);
  return res.status(200).set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }).json(results);
});

app.post("/api/puppies", (req: Request, res: Response) => {
  const puppyId = uuid();
  const { breed, name, birth, url } = req.body;
  console.log(url);
  if (!dataValidator(breed, name, birth)) {
    return res.status(404).json("Not found!");
  }
  puppiesData.push({ puppyId, breed, name, birth, url });
  return res.location(`/api/puppies/${puppyId}`).status(201).json("done");
});

app.put("/api/puppies/:id", (req: Request, res: Response) => {
  const puppyId: number = +req.params.id!;
  const { breed, name, birth } = req.body;
  if (!dataValidator(breed, name, birth)) {
    return res.status(404).json("Not found!");
  }
  const foundPuppy: PuppyType = puppiesData.find(
    (puppy: PuppyType) => puppyId === puppy.id
  );
  foundPuppy.breed = breed;
  foundPuppy.name = name;
  foundPuppy.birth = birth;
  return res.status(204).set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }).json(foundPuppy);
});

app.delete("/api/puppies/:id", (req: Request, res: Response) => {
  const puppyId: number = +req.params.id!;
  const puppyToDelete = puppiesData.findIndex(
    (puppy: PuppyType) => puppyId === puppy.id
  );
  puppiesData.splice(puppyToDelete, 1);
  return res.status(204).json();
});

export default app;
