import { Router } from "express";
import {
  createNote,
  getNotes,
  editNote,
  getNotesById,
} from "../controllers/note.controllers.js";

const notesRouter = Router();

notesRouter.get("/notes/:id", getNotesById);
notesRouter.put("/notes/:userId", editNote);
notesRouter.post("/notes/create/", createNote);
export default notesRouter;
