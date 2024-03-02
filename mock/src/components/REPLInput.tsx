import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { MockedData } from "./MockedData";

// This interface defines the props for the REPLInput component
interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
}

// This function allows users to input commands and handles each command
export function REPLInput(props: REPLInputProps) {
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  // Mode true is brief, false is verbose
  const [mode, setMode] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  var result = "That is not a valid command";

  const mockedData = MockedData();
  const mapsOfCommands = new Map();

  // Here we instantiate our Mocked Data Map from our mocked data file
  mapsOfCommands.set("mode", function () {
    setMode(!mode);
    console.log("At the start Mode is now " + mode);
    // Was brief, but going forward will be verbose
    if (mode) {
      return "We are now in verbose mode";
    } else {
      // Was verbose, going forward will be brief
      return [["Command: mode"], [" Output: We are now in brief mode"]];
    }
  });

  mapsOfCommands.set("view", function () {
    console.log("We're in view");
    var viewData = mockedData.get("view");
    if (
      mockedData.has("view") === undefined ||
      mockedData.has("view") === false
    ) {
      return "View data is not found in the mocked data file";
    } else if (loaded === false) {
      return "File is not loaded";
    } else {
      if (mode) {
        return viewData;
      } else {
        return [["Command: view"], [" Output: " + viewData]];
      }
    }
  });
  mapsOfCommands.set("load_file", function (commandArray: string[]) {
    console.log("Loaded csv");
    var allowedLoadedDirectories = mockedData.get("load");
    console.log(commandArray);
    console.log("File is found in the allowed loaded directories");
    setLoaded(true); // loading file
    //brief
    if (mode) {
      return "Loaded csv successfully";
    }
    //verbose
    else {
      return [
        ["Command: load_file"],
        [" Output: " + "Loaded csv successfully"],
      ];
    }
  });
  mapsOfCommands.set("search", function (commandArray: string[]) {
    console.log("Searched csv");
    var searchResults = mockedData.get("search");
    if (loaded === false) {
      return "File is not loaded";
    }
    //brief
    if (mode) {
      return searchResults;
    }
    //verbose
    else {
      return [["Command: search"], [" Output: " + searchResults]];
    }
  });

  // This function executes when the Submit button is clicked and outputs based on the command and mode.
  function handleSubmit(commandString: any) {
    const commandArray = commandString.toLowerCase().split(" ");

    console.log(result);
    console.log("At the end Mode is now " + mode);
    if (mapsOfCommands.has(commandArray[0]) === false) {
      result = "Command not found";
    } else if (commandArray.length > 2) {
      // Pass in commandArray into the function
      var commandFunction = mapsOfCommands.get(commandArray[0])();
      commandFunction(commandArray);
    } else {
      result = mapsOfCommands.get(commandArray[0])();
    }
    props.setHistory([...props.history, result]);
    setCommandString("");
  }
  function createTable(tableData: string[][] | undefined) {
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");

    // If tableData is undefined, then we will return undefined
    if (tableData) {
      tableData.forEach(function (rowData) {
        var row = document.createElement("tr");

        rowData.forEach(function (cellData) {
          var cell = document.createElement("td");
          cell.appendChild(document.createTextNode(cellData));
          row.appendChild(cell);
        });

        tableBody.appendChild(row);
      });
    }

    table.appendChild(tableBody);
    document.body.appendChild(table);
    return table;
  }

  // Render the REPLInput component
  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>
        Submit Command
      </button>
    </div>
  );
}
