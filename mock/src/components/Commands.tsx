import {Dispatch, SetStateAction, useState } from 'react';
import {MockedData} from './MockedData';
/* A command-processor function for our REPL. The function returns a string, which is the value to print to history when 
 * the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {    
  //args takes in an input, then the output will be either a string or a list of list of strings
  (args: Array<string>,
    mode: boolean,
    setMode: Dispatch<SetStateAction<boolean>>): String|String[][]
}
export function Commands(args: Array<String>){
    const mapsOfCommands = new Map();
    const commandArray = args
    //Mode true is brief, false is verbose
    const [mode, setMode] = useState<boolean>(true)
    const mockedData = MockedData

    mapsOfCommands.set("mode", function() {
        setMode(!mode)
        console.log("Mode is now " + mode)
        //Was brief, but going forward will be verbose
        if(mode){
            return "We are now in verbose mode"
        }
        //Was verbose, going forward will be brief
        else{
            return [["Command: mode"],["Output: We are now in brief mode"]]
        }
    });
    mapsOfCommands.set("view", function() {
        console.log("We're in view");

        //brief
        if(mode){
            return "Need to look into how to check filepaths"
        }
        //verbose
        else{
            return [["Command: view"],["Output: We are now in brief mode"]]
        }
    });
    mapsOfCommands.set("load_csv", function(commandArray: string[]) {
        console.log("Loaded csv");
        //brief
        if(mode){
            return "Hopefully a loaded csv"
        }
        //verbose
        else{
            return [["Command: load_csv"],["Output: " + "Hopefully Mocked Loaded Soon"]]
        }
    });
    mapsOfCommands.set("search", function(commandArray: string []) {
        console.log("Searched csv");
        //brief
        if(mode){
            return "Hopefully mocked search data soon!"
        }
        //verbose
        else{
            return [["Command: search"],["Output: " + "Hopefully mocked search data soon!"]]
        }
    });
}

  
// export function getCommandResult(command: string, args: Array<string>, mode: boolean, setMode: Dispatch<SetStateAction<boolean>>): String|String[][] {
//     const commandFunction = Commands(args)
//     return commandFunction(args, mode, setMode)
// }