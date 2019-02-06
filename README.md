# SimbleSense v2 Project


## Running the Project

First run ```npm install``` if it has not been run before. 

Run ```npm start``` to run front end React part of the app. 

Must also run the loopback-api project as this project connects to this on the front end. 


## Project Structure

### Components

Components should be placed in a folder with the same names as the component. All components should also contain a scss file for styling that has the same name as the component. 

Example 
|-- src/
    |-- components/
        |-- Component/
          |--Component.jsx
          |--Component.scss
          |--Component.md


### Redux

The redux directories include
actions/*
reducers/*

### Flow
Typing should be done with flow. All components must props typed using flow. 

For examples on how to use flow see: [Flow Documentation](https://flow.org/en/docs/react/components/)

### Views 
Any components that need to be rendered from information pulled in from the backend should have a definition in the src/utils/views.jsx. This will allow the component to be loaded in dynamically.

### Documentation
The project auto generates documentation based on comments in the components. To add extra detail and examples add a markdown file in the components folder see Components folder structure for example. 


