import { Dispatch, SetStateAction, useState } from 'react';
import '../styles/main.css';
import { ControlledInput } from './ControlledInput';
import { Commands } from './Commands';

interface REPLInputProps{
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  //Only using props as global variables to keep track of history
  history: string[],
  setHistory: Dispatch<SetStateAction<string[]>>,
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
export function REPLInput(props : REPLInputProps) {
    // Remember: let React manage state in your webapp. 
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');
    // TODO WITH TA : add a count state
    const [count, setCount] = useState<number>(0)
    //Mode true is brief, false is verbose
    const [mode, setMode] = useState<boolean>(true)
    //Set result to be a string or a list of list of strings
    const [result, setResult] = useState<string|String[][]>("")
    
    
    // This function is triggered when the button is clicked.
    // This will print out the possible and command, so output and input
    function handleSubmit(commandString:string) {
      setCount(count+1)
      // CHANGED
      //args: Array<string>
      //const mapsOfCommands = new Map();

      //Supposed to change the mode instantly, but does it delayed, which still works for this project
      // if (commandString.toLowerCase() === "mode"){
      //   setMode(!mode)
      //   console.log("Mode is now " + mode)
      // }
      // if (commandString.toLowerCase() === "view"){

      // }
      const commandArray = commandString.toLowerCase().split(" ");

      //I want to pass in this commandArray into my Commands so that the code that is in commands
      //can use it and return string
      const mapsOfCommands = new Map();

      mapsOfCommands.set("mode", function() {
        setMode(!mode)
        console.log("At the start Mode is now " + mode)
        //Was brief, but going forward will be verbose
        if(mode){
            setResult("We are now in verbose mode")
        }
        else{
            //Was verbose, going forward will be brief
            setResult([["Command: mode"],["Output: We are now in brief mode"]])
        }
      });
      mapsOfCommands.set("view", function() {
        console.log("We're in view");

        //brief
        if(mode){
            setResult("Need to look into how to check filepaths")
        }
        //verbose
        else{
            setResult([["Command: view"],["Output: We are now in verbose mode"]])
        }
      });
      mapsOfCommands.set("load_file", function(commandArray: string[]) {
        console.log("Loaded csv");
        //brief
        if(mode){
            setResult("Hopefully a loaded csv")
        }
        //verbose
        else{
            setResult([["Command: load_csv"],["Output: " + "Hopefully Mocked Loaded Soon"]])
        }
      });
      mapsOfCommands.set("search", function(commandArray: string []) {
        console.log("Searched csv");
        //brief
        if(mode){
            setResult("Hopefully mocked search data soon!")
        }
        //verbose
        else{
            setResult([["Command: search"],["Output: " + "Hopefully mocked search data soon!"]])
        }
      });
      
      //mapsOfCommands.get(commandArray[0])
      if(mapsOfCommands.has(commandArray[0]) === false){
        setResult("Command not found")
      }
      else{
        mapsOfCommands.get(commandArray[0])()
      }
      console.log(result)
      console.log("At the end Mode is now " + mode)
      props.setHistory([...props.history, commandString, result.toString()])
      setCommandString('')
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
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
            <button onClick={() => handleSubmit(commandString)}>Submitted {count} times</button>
        </div>
    );
  }