import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { Commands } from "./Commands";
import { MockedData } from "./MockedData";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  //Only using props as global variables to keep track of history
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
}
// /**
//  * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
//  * the command is done executing.
//  *
//  * The arguments passed in the input (which need not be named "args") should
//  * *NOT* contain the command-name prefix.
//  */
// export interface REPLFunction {
//   //args takes in an input, then the output will be either a string or a list of list of strings
//   (args: Array<string>): String|String[][]
// }

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);
  //Mode true is brief, false is verbose
  const [mode, setMode] = useState<boolean>(true);
  var mode1 = true;
  const [loaded, setLoaded] = useState<boolean>(false);
  var loaded1 = false;
  const [hasRun, setHasRun] = useState<boolean>(false);
  //Set result to be a string or a list of list of strings
  const [result1, setResult] = useState<
    string | HTMLTableElement | String[][] | undefined
  >("");
  var result = "That is not a valid command";

  const mockedData = MockedData();
  const mapsOfCommands = new Map();

  //Here we instantiate our Mocked Data Map from our mocked data file

  mapsOfCommands.set("mode", function () {
    setMode(!mode);
    //mode = !mode;
    console.log("At the start Mode is now " + mode);
    //Was brief, but going forward will be verbose
    if (mode) {
      return "We are now in verbose mode";
    } else {
      //Was verbose, going forward will be brief
      return [["Command: mode"], [" Output: We are now in brief mode"]];
    }
  });

  mapsOfCommands.set("view", function () {
    console.log("We're in view");
    var viewData = mockedData.get("view");
    var createdTable = createTable(viewData);
    if (
      mockedData.has("view") === undefined ||
      mockedData.has("view") === false
    ) {
      return "View data is not found in the mocked data file";
    } else if (loaded === false) {
      return "File is not loaded";
    } else {
      if (mode) {
        return createdTable.toString();
      }
      //verbose
      else {
        return [["Command: view"], [" Output: " + createdTable]];
      }
    }
    //brief
  });
  mapsOfCommands.set("load_file", function (commandArray: string[]) {
    console.log("Loaded csv");
    var allowedLoadedDirectories = mockedData.get("load");
    console.log(commandArray);
    // if (
    //   allowedLoadedDirectories === ||
    //   !allowedLoadedDirectories[0].includes(commandArray[1])
    // ) {
    //   console.log("File is not found in the allowed loaded directories");
    //   return "File is not found in the allowed loaded directories";
    // } else {
      console.log("File is found in the allowed loaded directories");
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
    // }
  });
  mapsOfCommands.set("search", function (commandArray: string[]) {
    console.log("Searched csv");
    var searchResults = mockedData.get("search");
    //brief
    // if (
    //   commandArray.length === 1 ||
    //   commandArray[1] === undefined ||
    //   searchResults === undefined ||
    //   commandArray.length > 3
    // ) {
    //   console.log("Sorry, you must input a term to search for");
    //   return "Sorry, you must input a term to search for appropriately";
    // }
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
    setCount(count + 1);
    // CHANGED

    const commandArray = commandString.toLowerCase().split(" ");

    //I want to pass in this commandArray into my Commands so that the code that is in commands
    //can use it and return string
    var loadedOnce = false;
    // //mapsOfCommands.get(commandArray[0])
    // if (mapsOfCommands.has(commandArray[0]) === false) {
    //   setResult("Command not found");
    // }
    // else {

    //   while(!loadedOnce){
    //     console.log("Is this running?");
    //     mapsOfCommands.get(commandArray[0])();
    //     loadedOnce = true;
    //   }
    // }

    console.log(result);
    console.log("At the end Mode is now " + mode);
    if (mapsOfCommands.has(commandArray[0]) === false) {
      setResult("Command not found");
    } else if (commandArray.length > 2) {
      //Pass in commandArray into the function
      var commandFunction = mapsOfCommands.get(commandArray[0])();
      commandFunction(commandArray);
    } else {
      result = mapsOfCommands.get(commandArray[0])();
    }
    const updatedResult = result ? result.toString() : ""; // Add type check to ensure 'result' is defined
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
        Submitted {count} times
      </button>
    </div>
  );
}
