> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details
Project name: Mock

Project description: Building a front-end web application with mock data using HTML, CSS, and Typescript with React. 

Team members: Tanay Subramanian, Alexandra Mercedes-Santos

Contribution: Roughly 20 combined hours of work

Link to repo: https://github.com/cs0320-s24/mock-mock-amercede-tsubram4/tree/main

# Design Choices
High-level design: The App component is the highest-level component. The REPLInput component implements the functionality for the mode, load_file, view, and search commands, also handling errors. The ControlledInput component manages the command textbox which receives the user's queries. The LoginButton component manages login and signout functionality. The user's command entries are stored in REPLHistory.

Key data structures: We used an array of strings to store REPLHistory. We used a map in REPLInput to store the commands as keys and corresponding functions as values.

# Errors/Bugs
From our rigorous testing, we don't think our final code contains any significant errors.

# Tests
We have two testing files, one for end-to-end testing and one for unit testing. The end-to-end testing files involve comprehensive testing of possible user inputs and commands using Playwright. The unit tests check that the main function is working correctly.

# How to...
Run tests with the following commands in the terminal: cd mock, npm install, npm start, npx playwright install, npx playwright test --ui

Build program by inputting data files into the mock folder.

Run program with the following commands in the terminal: cd mock, npm install, npm start, click the link to access the web browser, login and enter commands

# Collaboration
Only collaboration was between us two project partners.
