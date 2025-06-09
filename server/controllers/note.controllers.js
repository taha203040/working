import Note from "../models/notes.model.js";

export const createNote = async () => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.log(error);
  }
};
export const getNotes = async () => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.log(error);
  }
};
export const editNote = async () => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params, req.body, {
      new: true,
    });
    if(!updatedNote) return res.status(404).json({error:"Note not found "})
    res.status(200).json({ msg: "the not edited succsesful" });
  } catch (error) {
    console.log(error);
  }
};
