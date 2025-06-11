import { Router } from "express";
import {
  createNote,
  getNotes,
  editNote,
  getNotesById,
} from "../controllers/note.controllers.js";

const notesRouter = Router();

notesRouter.get("/notes/:userId", getNotesById);
notesRouter.put("/notes/:id", editNote);
notesRouter.post("/notes/create/", createNote);
export default notesRouter;
