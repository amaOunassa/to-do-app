import "./App.css";
import ToDoList from "./components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ToDoContext } from "./contexts/ToDoContext";
const theme = createTheme({
  typography: {
    fontFamily: ["Quicksand"],
  },
  palette: {
    primary: {
      main: "#19183B",
    },
  },
});
const intialState = [
  {
    id: uuidv4(),
    title: "frist",
    details: "Content of the task1",
    isComplete: false,
  },
  {
    id: uuidv4(),
    title: "second",
    details: "Content of the task2",
    isComplete: false,
  },
  {
    id: uuidv4(),
    title: "the third",
    details: "Content of the task3",
    isComplete: false,
  },
];
function App() {
   const [toDo, setMyToDos] = useState(intialState);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#19183B",
        }}
      >
        <ToDoContext.Provider value={{toDo , setMyToDos}}>
        <ToDoList />
        </ToDoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
