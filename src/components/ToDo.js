import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useContext } from "react";
import { ToDoContext } from "../contexts/ToDoContext";

export default function ToDo({ toDoObj, showDelete, showUpdate }) {
  const myToDoContext = useContext(ToDoContext);
  const setMyToDos = myToDoContext.setMyToDos;
  const toDo = myToDoContext.toDo;
  // handlers
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
  // dialog handlers for delete
  function handleClickDelete() {
    showDelete(toDoObj);
  }
  // ===== dialog handlers for delete =====
  // dialog handlers for update
  function handleClickUpdate() {
    showUpdate(toDoObj);
  }
  // ====== dialog handlers for update ======

  return (
    <>
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
