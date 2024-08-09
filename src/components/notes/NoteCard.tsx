import { Note } from "../../features/notes/types";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteNote } from "../../features/notes/notesSlice";
import PinComp from "../Icons/PinComp";
import { Trash2 } from "lucide-react";
import ColorPicker from "../Icons/ColorPicker/ColorPicker";
import ImagePicker from "../Icons/ImageUpload";

const NoteCard = ({ note }: { note: Note }) => {
  const dispatch = useAppDispatch();
  
  return (
    <div
      key={note.id}
      className="single-note"
      style={{ 
        backgroundColor: note.backgroundColor,
        backgroundImage: note.image ? `url(${note.image})` : 'none',
      }}
    >
      <PinComp
        note={note}
        isPinned={note.isPinned}
        makeAbsolute={true}
      />
      <h2 style={{
        margin: 0,
        marginTop: "18px"
      }}>{note.title}</h2>
      <p>{note.content}</p>
      <div
        style={{
          display: "flex",
          columnGap: "10px"
        }}
      >
        <Trash2
          onClick={() => dispatch(deleteNote(note.id))}
          size={20}
          color="white"
          style={{
            cursor: "pointer"
          }}
        />
        <ColorPicker
          instantChange={true}
          note={note}
        />
        <ImagePicker
          instantChange={true}
          note={note}
        />
      </div>
    </div>
  );
};

export default NoteCard;
