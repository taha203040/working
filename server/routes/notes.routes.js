import { Router } from "express";
import {
  createNote,
  getNotes,
  editNote,
} from "../controllers/note.controllers.js";

const notesRouter = Router();

notesRouter.get("/notes", getNotes);
notesRouter.put("/notes/:id", editNote);
notesRouter.post("/notes/create/", createNote);
export default notesRouter;
