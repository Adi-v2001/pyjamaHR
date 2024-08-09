import { useAppSelector } from "../../hooks/hooks";
import NoteCard from "./NoteCard";

const Notes = () => {
  const notes = useAppSelector((state) => state.notes.notes);
  const pinnedNotes = useAppSelector((state) => state.notes.pinnedNotes);

  return (
    <div style={{
      width: "100%"
    }}>
      <div className="notes-container">
        {pinnedNotes && pinnedNotes.map((note) => <NoteCard note={note} key={note.id}/>)}
      </div>
      <div className="notes-container">
        {notes.map((note) => (
          <NoteCard note={note} key={note.id}/>
        ))}
      </div>
    </div>
  );
};

export default Notes;
