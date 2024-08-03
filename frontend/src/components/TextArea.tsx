import { useRef } from "react";
import { Textarea } from "./ui/textarea";

// Props interface for the TextArea component
interface TextAreaProps {
  val: string; 
  setVal: (value: string) => void;
  isLearning: boolean;
  placeholder?: string;
}

// Functional component for rendering a styled textarea
const TextArea: React.FC<TextAreaProps> = ({
  val,
  setVal,
  isLearning,
  placeholder,
}) => {
  // Ref to access the textarea element directly
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Event handler for textarea value change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(e.target.value); // Update the value in the parent component
  };

  return (
    <div className="h-full overflow-y-scroll rounded-lg border-border-hust border-2 hide-scrollbar">
      {/* Rendering the Textarea component with provided props */}
      <Textarea
        className="bg-foreground-hust h-full text-justify text-copy-light leading-7 tracking-wider resize-none cursor-auto"
        placeholder={
          placeholder ||
          "Nhập đoạn văn mà bạn muốn học thuộc! (Chỉ nên nhập từng đoạn một đừng nhập cả câu éo học nổi đâu)"
        }
        value={val}
        onChange={handleChange}
        disabled={isLearning} 
        ref={textAreaRef} 
      />
    </div>
  );
};

export default TextArea;
