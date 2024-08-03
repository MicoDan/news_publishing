import { useEffect, useRef } from "react";

/**
 * TextArea component that adjusts its height automatically based on the content.
 */
const TextArea = ({
  val,
  placeholder,
}: {
  val: string;
  placeholder?: string;
}) => {
  // Creating a reference to the textarea element
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // useEffect hook to adjust the height of the textarea whenever the value changes
  useEffect(() => {
    if (textAreaRef.current) {
      // Resetting the height to auto to get the correct scrollHeight
      textAreaRef.current.style.height = "auto";
      // Setting the height to the scrollHeight to adjust to the content
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [val]);

  return (
    <div className="bg-transparent rounded flex flex-col space-y-2">
      {/* TextArea component */}
      <textarea
        className="bg-transparent hide-scrollbar text-justify text-copy-light indent-4 leading-8 text-lg outline-none resize-none cursor-auto"
        placeholder={placeholder ? placeholder : "Insert text here"}
        value={val} 
        rows={2}
        disabled={true}
        ref={textAreaRef}
      ></textarea>
    </div>
  );
};

export default TextArea;
