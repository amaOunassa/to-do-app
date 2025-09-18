import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useContext, useState } from "react";
import { ToDoContext } from "../contexts/ToDoContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
export default function ToDo({ toDoObj }) {
  const myToDoContext = useContext(ToDoContext);
  const setMyToDos = myToDoContext.setMyToDos;
  const toDo = myToDoContext.toDo;
  const [open, setOpen] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updatedToDo, setUpdatedToDo] = useState({
    title: toDoObj.title,
    details: toDoObj.details,
  });
  function handlCheckClick(id) {
    const newToDos = toDo.map((t) => {
      if (t.id === toDoObj.id) {
        // instead of using t.isComplete = !t.isComplete to avoid mutation we copy the object and change the property
        return { ...t, isComplete: !t.isComplete };
      }
      return t;
    });
    setMyToDos(newToDos);
    localStorage.setItem("myToDos", JSON.stringify(newToDos));
  }
  function handleClickDelete() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function handleClickUpdate() {
    setOpenUpdateDialog(true);
  }
  function handleCloseUpdateDialog() {
    setOpenUpdateDialog(false);
  }
  function handleDeleteConfirm(id) {
    const newToDos = toDo.filter((t) => t.id !== id);
    setMyToDos(newToDos);
    localStorage.setItem("myToDos", JSON.stringify(newToDos));
    handleClose();
  }
  function handleUpdateConfirm(id) {
    const newToDos = toDo.map((t) => {
      if (t.id === id) {
        return { ...t, title: updatedToDo.title, details: updatedToDo.details };
      }
      return t;
    });
    setMyToDos(newToDos);
    localStorage.setItem("myToDos", JSON.stringify(newToDos));
    handleCloseUpdateDialog();
  }
  return (
    <>
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
            onClick={() => handleUpdateConfirm(toDoObj.id)}
            form="subscription-form"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===== Update Dialog ===== */}
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
          <Button autoFocus onClick={() => handleDeleteConfirm(toDoObj.id)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===== Delete Dialog ===== */}
      <Card
        className="toDoCard"
        sx={{
          minWidth: 275,
          backgroundColor: "#708993",
          color: "white",
          marginTop: 3,
        }}
      >
        <CardContent>
          <Grid container spacing={1}>
            <Grid size={8}>
              <Typography
                variant="h5"
                style={{
                  textAlign: "left",
                  fontWeight: "500",
                  textDecoration: toDoObj.isComplete ? "line-through" : "none",
                }}
              >
                {toDoObj.title}
              </Typography>
              <Typography
                variant="h6"
                style={{ textAlign: "left", fontWeight: "100" }}
              >
                {toDoObj.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className={"iconBtn"}
                aria-label="done"
                style={{
                  color: toDoObj.isComplete ? "white" : "#088d08ff",
                  backgroundColor: toDoObj.isComplete ? "#088d08ff" : "white",
                  border: "2px solid green",
                }}
                onClick={handlCheckClick}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className={"iconBtn"}
                aria-label="delete"
                style={{
                  color: "#bf0606ff",
                  backgroundColor: "white",
                  border: "2px solid #bf0606ff",
                }}
                onClick={handleClickDelete}
              >
                <DeleteOutlineIcon />
              </IconButton>
              <IconButton
                className={"iconBtn"}
                aria-label="edit"
                style={{
                  color: "#684bbdff",
                  backgroundColor: "white",
                  border: "2px solid #684bbdff",
                }}
                onClick={handleClickUpdate}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
