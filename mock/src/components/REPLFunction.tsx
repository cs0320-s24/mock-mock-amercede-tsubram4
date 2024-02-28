// import { Dispatch, SetStateAction } from "react";
// /**
//  * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
//  * the command is done executing.
//  *
//  * The arguments passed in the input (which need not be named "args") should
//  * *NOT* contain the command-name prefix.
//  */
// export interface REPLFunction {
//   (args: Array<string>): String | String[][];

//   mode: string[],
//   setMode: Dispatch<SetStateAction<string[]>>

// }

// export function switchMode(args: Array<string>, mode: string, setMode: Dispatch<SetStateAction<string[]>>): String {
//   if (args.length != 1) {
//     return "Invalid number of arguments for mode command. Usage: mode <mode>"
//   }
//   if (args[0] != "brief" && args[0] != "verbose") {
//     return "Invalid mode. Usage: mode <mode>"
//   }
//   if (args[0] == "brief") {
//     setMode(["verbose"])
//     //Might have to change bottom line to
//     //Return "Mode is set to " + verbose
//     return "Mode is set to " + mode
//   }
//   if (args[0] == "verbose") {
//     setMode(["brief"])
//     //Might have to change bottom line to
//     // return "Mode is set to " + brief
//     return "Mode is set to " + mode
//   }
// }
