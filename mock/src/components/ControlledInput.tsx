import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

// This interface defines the props the ControlledInput component expects.
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

// This function component creates a controlled input element.
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)} // Updates state on input change
      aria-label={ariaLabel} // Accessibility for screen readers
    ></input>
  );
}
