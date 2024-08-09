import "./notes.css";
import { addNote } from "../../features/notes/notesSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, useState } from "react";
import PinComp from "../Icons/PinComp";
import ColorPicker from "../Icons/ColorPicker/ColorPicker";
import ImagePicker from "../Icons/ImageUpload";

const initialState = {
  title: '',
  content: '',
  color: '',
  imageUrl: ''
};

const AddNotes = () => {
  const dispatch = useAppDispatch();
  const [isPinned, setIsPinned] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const addNoteHandler = (e: any) => {
    e.preventDefault();
    dispatch(addNote({
      id: uuidv4(),
      title: formData.title,
      content: formData.content,
      isPinned: isPinned,
      backgroundColor: formData.color,
      image: formData.imageUrl
    }));
    setFormData(initialState);
    setIsPinned(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleColorChange = (color: string) => {
    setFormData(prevData => ({
      ...prevData,
      color,
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData(prevData => ({
      ...prevData,
      imageUrl,
    }));
  };

  return (
    <form className="form-container" onSubmit={addNoteHandler}>
      <div className="input-container">
        <input
          value={formData.title}
          name="title"
          placeholder="Title.."
          type="text"
          onChange={handleInputChange}
        />
        <input
          value={formData.content}
          name="content"
          placeholder="Content.."
          type="text"
          onChange={handleInputChange}
        />
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', columnGap: '10px'}}>
            <PinComp
              isPinned={isPinned}
              setIsPinned={setIsPinned}
              makeAbsolute={false}
            />
            <ColorPicker
              handleColorChange={handleColorChange}
              color={formData.color}
            />
            <ImagePicker
              handleImageChange={handleImageChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="button"
              disabled={!formData.content}
              style={!formData.content ? {cursor: "not-allowed"}:{}}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddNotes;
