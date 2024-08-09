import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "./types";

export interface NotesState {
  notes: Note[];
  pinnedNotes: Note[];
}

const initialState: NotesState = {
  notes: [],
  pinnedNotes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      if (action.payload.isPinned) {
        state.pinnedNotes.unshift(action.payload); // Add to the beginning
      } else {
        state.notes.unshift(action.payload); // Add to the beginning
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const noteId = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteId);
      state.pinnedNotes = state.pinnedNotes.filter(
        (note) => note.id !== noteId
      );
    },
    togglePin: (state, action: PayloadAction<string>) => {
      const noteId = action.payload;

      // Finding current note in notes and pinnedNotes state
      const noteInNotes = state.notes.find((note) => note.id === noteId);
      const noteInPinned = state.pinnedNotes.find((note) => note.id === noteId);

      //If it exists in notes state
      if (noteInNotes) {
        state.notes = state.notes.filter((note) => note.id !== noteId);
        noteInNotes.isPinned = true;
        state.pinnedNotes.unshift(noteInNotes); // Add to the beginning
      }

      //If it exists in pinnedNote state
      else if (noteInPinned) {
        state.pinnedNotes = state.pinnedNotes.filter(
          (note) => note.id !== noteId
        );
        noteInPinned.isPinned = false;
        state.notes.unshift(noteInPinned); // Add to the beginning
      }
    },
    changeStates: (state, action) => {
      const { noteId, valueToChange, newValue } = action.payload;

      const noteIndexInNotes = state.notes.findIndex(
        (note) => note.id === noteId
      );
      const noteIndexInPinned = state.pinnedNotes.findIndex(
        (note) => note.id === noteId
      );

      if (noteIndexInNotes !== -1) {
        state.notes[noteIndexInNotes] = {
          ...state.notes[noteIndexInNotes],
          [valueToChange]: newValue,
        };
      } else if (noteIndexInPinned !== -1) {
        state.pinnedNotes[noteIndexInPinned] = {
          ...state.pinnedNotes[noteIndexInPinned],
          [valueToChange]: newValue,
        };
      }
    },
  },
});

export const { addNote, deleteNote, togglePin, changeStates } = notesSlice.actions;
export default notesSlice.reducer;
