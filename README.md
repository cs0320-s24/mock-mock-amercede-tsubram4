# Project Details
Project name: Mock

Project description: Building a front-end web application with mock data using HTML, CSS, and Typescript with React. 

Team members: Tanay Subramanian, Alexandra Mercedes-Santos

Contribution: Roughly 30 combined hours of work: tsubram4 -> Testing, Documentation, REPLInput
amercede -> REPLInput, MockedData, Documentation

Link to repo: https://github.com/cs0320-s24/mock-mock-amercede-tsubram4/tree/main

# Design Choices
High-level design: The App component is the highest-level component, which uses the REPL File to handle input and history. The REPL component imports REPLInput and REPLHistory. The REPLInput component implements the functionality for the mode, load_file, view, and search commands, also handling errors. REPLInput creates an object of MockedData from the MockedData file to be used in the commands. . The ControlledInput component manages the command textbox which receives the user's queries and is used by the REPLInput. The LoginButton component manages login and signout functionality. The user's command entries are stored in REPLHistory.

Key data structures: We used an array of strings to store REPLHistory. We used a map in REPLInput to store the commands as keys and corresponding functions as values.

Mocked Data map is outside of the handle submit function, so that it does not get created everytime the button was clicked. This is the same reason we created mockedData outside of the handleSubmit function.

# Errors/Bugs
We couldn't figure out how to get the 2D array to print out in a way that isn't just a line of string. So for view and search it will just print out a messy of line of string. We found some code on stack overflow to try to make HTML table with these arrays, but we could not figure out how to implement this properly into our code. It's still in REPLInput and we got it from user bmavity through this link: https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array. We also had problems with our mockedData to properly check in load_file if what a user input is actually in the allowed loaded directories. We could not get search or load_file to check whether the proper amount of parameters were being used. From our rigorous testing, we don't think our final code contains any significant errors.

# Tests
We have two testing files, one for end-to-end testing and one for unit testing. The end-to-end testing files involve comprehensive testing of possible user inputs and commands using Playwright. The unit tests check that the main function is working correctly.

# How to...
Run tests with the following commands in the terminal: cd mock, npm install, npm start, npx playwright install, npx playwright test --ui

Build program by inputting data files into the mock folder.

Run program with the following commands in the terminal: cd mock, npm install, npm start and click the link (http://localhost:8000) to access the web browser. Once the web browser is accessed press the login button and enter commands (ex: mode, view, load_file FILEPATH, search COLUMN VALUE) into the command window. The load_file command will need a valid file path, so that it can load file. A file needs to be loaded, so that the view and search command can return a result. The Search command needs a valid column name or number and a value to be searched for.

# Collaboration
Only collaboration was between us two project partners.
