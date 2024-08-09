import { Pin, PinOff } from "lucide-react";
import { togglePin } from "../../features/notes/notesSlice";
import { Note } from "../../features/notes/types";
import { useAppDispatch } from "../../hooks/hooks";

const PinComp = ({
  note,
  isPinned,
  setIsPinned,
  makeAbsolute,
}: {
  note?: Note;
  isPinned: boolean;
  setIsPinned?: React.Dispatch<React.SetStateAction<boolean>>;
  makeAbsolute: boolean;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      style={{
        position: 'relative',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isPinned ? (
        <PinOff
          style={{
            position: `${makeAbsolute ? "absolute" : "static"}`,
            right: "3px",
            top: "4px",
            cursor: "pointer",
          }}
          onClick={() =>
            note
              ? dispatch(togglePin(note.id))
              : setIsPinned && setIsPinned(false)
          }
          fill="white"
          size={20}
          color="white"
        />
      ) : (
        <Pin
          style={{
            position: `${makeAbsolute ? "absolute" : "static"}`,
            right: "3px",
            top: "4px",
            cursor: "pointer",
          }}
          onClick={() =>
            note
              ? dispatch(togglePin(note.id))
              : setIsPinned && setIsPinned(true)
          }
          fill="white"
          size={20}
          color="white"
        />
      )}
    </div>
  );
};

export default PinComp;
