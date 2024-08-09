import { Image } from "lucide-react";
import React, { ChangeEvent, useRef } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { changeStates } from "../../features/notes/notesSlice";
import { Note } from "../../features/notes/types";

interface ImagePickerProps {
  handleImageChange?: (imageUrl: string) => void;
  instantChange?: boolean;
  note?: Note
}

const ImagePicker: React.FC<ImagePickerProps> = ({ handleImageChange, instantChange, note }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          if(instantChange){
            dispatch(changeStates({
              noteId: note?.id,
              valueToChange: 'image',
              newValue: reader.result
            }))
          } else {
            handleImageChange && handleImageChange(reader.result as string);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        size={20}
        color="white"
        onClick={triggerFileInput}
        style={{ cursor: "pointer" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </div>
  );
};

export default ImagePicker;
