import { useAppSelector } from "../../hooks/hooks";
import NoteCard from "./NoteCard";

const Notes = () => {
  const notes = useAppSelector((state) => state.notes.notes);
  const pinnedNotes = useAppSelector((state) => state.notes.pinnedNotes);

  return (
    <div style={{
      width: "100%"
    }}>
      {pinnedNotes.length > 0 && <h3 style={{padding: "5px"}}>Pinned Notes</h3>}
      <div className="notes-container">
        {pinnedNotes && pinnedNotes.map((note) => <NoteCard note={note} key={note.id}/>)}
      </div>
      {notes.length > 0 && <h3 style={{padding: "5px"}}>Notes</h3>}
      <div className="notes-container">
        {notes.map((note) => (
          <NoteCard note={note} key={note.id}/>
        ))}
      </div>
    </div>
  );
};

export default Notes;
