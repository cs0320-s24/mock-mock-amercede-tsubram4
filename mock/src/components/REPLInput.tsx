import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { MockedData } from "./MockedData";

interface REPLInputProps {
  //Only using props as global variables to keep track of history
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
}
// /**
//  * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
//  * the command is done executing.
//  *
//  * The arguments passed in the input should
//  * *NOT* contain the command-name prefix.
//  */

export function REPLInput(props: REPLInputProps) {
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  //Mode true is brief, false is verbose
  const [mode, setMode] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  var result = "That is not a valid command";

  const mockedData = MockedData();
  const mapsOfCommands = new Map();

  //Here we instantiate our Mocked Data Map from our mocked data file
  mapsOfCommands.set("mode", function () {
    setMode(!mode);
    //Was brief, but going forward will be verbose
    if (mode) {
      return "We are now in verbose mode";
    } else {
      //Was verbose, going forward will be brief
      return [["Command: mode"], [" Output: We are now in brief mode"]];
    }
  });

  mapsOfCommands.set("view", function () {
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
        return viewData
      }
      else {
        return [["Command: view"], [" Output: " + viewData]];
      }
    }
  });
  mapsOfCommands.set("load_file", function (commandArray: string[]) {
    var allowedLoadedDirectories = mockedData.get("load");
    setLoaded(true);
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

  // This function is triggered when the button is clicked.
  // This will print out the possible and command, so output and input
  function handleSubmit(commandString: any) {
    const commandArray = commandString.toLowerCase().split(" ");

    console.log(result);
    console.log("At the end Mode is now " + mode);
    if (mapsOfCommands.has(commandArray[0]) === false) {
      result = "Command not found";
    } else if (commandArray.length > 2) {

      //Pass in commandArray into the function
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

    //If tableData is undefined, then we will return undefined
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
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}

      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}

      <button onClick={() => handleSubmit(commandString)}>
        Submit Command
      </button>
    </div>
  );
}
