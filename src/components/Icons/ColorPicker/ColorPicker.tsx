import { useEffect, useRef, useState } from "react";
import "./ColorPicker.css";
import { Palette } from "lucide-react";
import { Note } from "../../../features/notes/types";
import { useAppDispatch } from "../../../hooks/hooks";
import { changeStates } from "../../../features/notes/notesSlice";

const colors: string[] = [
  "#00274d",
  "#003366",
  "#003f5c",
  "#004080",
  "#003d6b",
  "#004d00",
  "#005700",
  "#006400",
  "#004b49",
  "#005c50",
  "#4d0000",
  "#660000",
  "#800000",
  "#991f1f",
  "#b33d3d",
  "#3d0c4a",
  "#4b0082",
  "#6a0d91",
  "#5a2d81",
  "#6d1f6f",
  "#1e1e1e",
  "#2c2c2c",
  "#3d3d3d",
  "#4a4a4a",
  "#5e5e5e",
];

interface ColorPickerProps {
  handleColorChange?: (color: string) => void;
  color?: string;
  instantChange?: boolean;
  note?: Note;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  handleColorChange,
  color,
  instantChange,
  note,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef: any = useRef(null);
  const dispatch = useAppDispatch();

  const handleColorClick = (color: string) => {
    if (instantChange) {
      dispatch(
        changeStates({
          noteId: note?.id,
          valueToChange: "backgroundColor",
          newValue: color,
        })
      );
    } else {
      handleColorChange && handleColorChange(color);
    }
    setIsOpen(false);
  };

  const togglePopover = () => {
    if (!isOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="color-picker">
      <Palette
        ref={buttonRef}
        onClick={togglePopover}
        style={{ cursor: "pointer" }}
        size={20}
        color="white"
      />
      <div
        style={
          color
            ? {
                height: "10px",
                width: "10px",
                borderRadius: "100%",
                backgroundColor: color,
                marginLeft: "5px",
                border: "solid 1px",
              }
            : {}
        }
      />
      {isOpen && (
        <div className="color-popup" style={{ top: position.top, left: position.left }}>
          {colors.map((color) => (
            <div
              key={color}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
