import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import { ToDoContext } from "../contexts/ToDoContext";
// Components
import ToDo from "./ToDo";

export default function ToDoList() {
  const myToDoContext = useContext(ToDoContext);
  const mytodo = myToDoContext.toDo;
  const setMyToDos = myToDoContext.setMyToDos;
  const [inputTitle, setInputTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState("all");

  const completedToDos = mytodo.filter((t) => t.isComplete);
  const unCompletedToDos = mytodo.filter((t) => !t.isComplete);
  let filteredToDos = mytodo;
  if (selectedValue === "completed") {
    filteredToDos = completedToDos;
  } else if (selectedValue === "notCompleted") {
    filteredToDos = unCompletedToDos;
  }
  const myToDos = filteredToDos.map((t) => <ToDo key={t.id} toDoObj={t} />);

  function handlAddTask() {
    const newToDo = {
      id: uuidv4(),
      title: inputTitle,
      details: "",
      isComplete: false,
    };
    const UpdatedToDos = [...mytodo, newToDo];
    setMyToDos(UpdatedToDos);
    localStorage.setItem("myToDos", JSON.stringify(UpdatedToDos));
    setInputTitle("");
  }

  useEffect(() => {
    const savedToDos = JSON.parse(localStorage.getItem("myToDos")) ?? [];
    if (savedToDos) {
      setMyToDos(savedToDos);
    }
  }, [setMyToDos]);

  function handleDisplayChange(event) {
    setSelectedValue(event.target.value);
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275, backgroundColor: "#E7F2EF" }}
          style={{
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <CardContent>
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              Tasks
            </Typography>
            <Divider />
            {/* Toggle Button Filter */}
            <ToggleButtonGroup
              value={selectedValue}
              exclusive
              onChange={handleDisplayChange}
              aria-label="text alignment"
              style={{ marginTop: "20px" }}
              color="primary"
            >
              <ToggleButton value="all" aria-label="left aligned">
                All
              </ToggleButton>
              <ToggleButton value="completed" aria-label="centered">
                Done
              </ToggleButton>
              <ToggleButton value="notCompleted" aria-label="right aligned">
                Not Done
              </ToggleButton>
            </ToggleButtonGroup>
            {/* ====Toggle Button Filter==== */}
            {/* ToDo component */}
            {myToDos}
            {/* ====ToDo component==== */}
            {/* Input + add button */}
            <Grid spacing={2} container style={{ marginTop: "20px" }}>
              <Grid
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Task Title"
                  variant="outlined"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                />
              </Grid>
              <Grid
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  disabled={!inputTitle}
                  onClick={handlAddTask}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            {/* ====Input + add button==== */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
