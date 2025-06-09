import { Router } from "express";
import { createNote, getNotes } from "../controllers/note.controllers";
import { updateUser } from "../controllers/user.controllers";

const notesRouter = Router();

notesRouter.get("/notes", getNotes);
notesRouter.put("/notes/:id", updateUser);
notesRouter.post("/notes/create/", createNote);
export default notesRouter;
