import "../styles/main.css";

// This interface defines the props for the REPLHistory component
interface REPLHistoryProps {
  history: string[];
}

// This function displays the history of commands entered into the REPL
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" aria-label="repl-history">
      {props.history.map((command, index) => (
        <p>{command}</p>
      ))}
    </div>
  );
}
