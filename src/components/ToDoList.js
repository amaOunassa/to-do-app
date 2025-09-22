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
// dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// Components
import ToDo from "./ToDo";

export default function ToDoList() {
  const myToDoContext = useContext(ToDoContext);
  const mytodo = myToDoContext.toDo;
  const setMyToDos = myToDoContext.setMyToDos;
  const [inputTitle, setInputTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState("all");
  const [open, setOpen] = useState(false);
  const [dialogToDo, setDialogToDo] = useState(null);
  const completedToDos = mytodo.filter((t) => t.isComplete);
  const unCompletedToDos = mytodo.filter((t) => !t.isComplete);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updatedToDo, setUpdatedToDo] = useState({
    title: mytodo.title,
    details: mytodo.details,
  });
  let filteredToDos = mytodo;
  if (selectedValue === "completed") {
    filteredToDos = completedToDos;
  } else if (selectedValue === "notCompleted") {
    filteredToDos = unCompletedToDos;
  }
  const myToDos = filteredToDos.map((t) => (
    <ToDo
      key={t.id}
      toDoObj={t}
      showDelete={openClickDelete}
      showUpdate={openUpdate}
    />
  ));

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
  // delete dialog handlers
  function openClickDelete(toDo) {
    setDialogToDo(toDo);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function handleDeleteConfirm() {
    const newToDos = mytodo.filter((t) => t.id !== dialogToDo.id);
    setMyToDos(newToDos);
    localStorage.setItem("myToDos", JSON.stringify(newToDos));
    handleClose();
  }
  // ====== delete dialog handlers =========
  // dialog handlers for update
  function openUpdate(mytodo) {
    setDialogToDo(mytodo);
    setUpdatedToDo({ title: mytodo.title, details: mytodo.details });
    setOpenUpdateDialog(true);
  }
  function handleCloseUpdateDialog() {
    setOpenUpdateDialog(false);
  }
  function handleUpdateConfirm() {
    const id = dialogToDo.id;
    const newToDos = mytodo.map((t) => {
      if (t.id === id) {
        return { ...t, title: updatedToDo.title, details: updatedToDo.details };
      }
      return t;
    });
    setMyToDos(newToDos);
    localStorage.setItem("myToDos", JSON.stringify(newToDos));
    handleCloseUpdateDialog();
  }
  // ===== dialog handlers for update =====

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task? This action cannot be
            undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus onClick={() => handleDeleteConfirm()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===== Delete Dialog ===== */}
      {/* Update Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can update the title and details of this task. Make sure to save
            your changes.
          </DialogContentText>
          <form id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={updatedToDo.title}
              onChange={(e) =>
                setUpdatedToDo({ ...updatedToDo, title: e.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Details"
              type="text"
              fullWidth
              variant="standard"
              value={updatedToDo.details}
              onChange={(e) =>
                setUpdatedToDo({ ...updatedToDo, details: e.target.value })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
          <Button
            onClick={() => handleUpdateConfirm(myToDos.id)}
            form="subscription-form"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===== Update Dialog ===== */}
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
