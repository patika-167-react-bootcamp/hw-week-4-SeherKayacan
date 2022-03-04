import {
  Button,
  Grid,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import TodoEdit from "./TodoEdit";

function TodoListItem(props) {
  const [category, setCategory] = useState({ id: null, title: "" });
  const [status, setStatus] = useState({ id: null, title: "" });

  const handleCategoryChange = (value) => {
    setCategory(value);
    setStatus({ id: null, title: "" });
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleTodoUpdate = (value) => {
    if (category.id && status.id) {
      const data = {
        title: value,
        id: props.element.id,
        categoryId: Number(category.id),
        statusId: Number(status.id),
      };
      props.updateTodo(data);
    } else {
      const data = {
        title: value,
        id: props.element.id,
        categoryId: Number(props.element.categoryId),
        statusId: Number(props.element.statusId),
      };
      props.updateTodo(data);
    }
    setCategory({ id: null, title: "" });
    setStatus({ id: null, title: "" });
  };

  const handleTodoDelete = (e) => {
    const todoId = e.target.attributes.todoid.value;
    props.deleteTodo(todoId);
  };

  return (
    <ListItem sx={{ py: 2 }} divider>
      <ListItemText>
        <Grid container gap={2}>
          <Grid item container xs={4}>
            <Typography variant="body1">{props.element.title}</Typography>
          </Grid>
          <Grid item gap={2}>
            <TodoEdit
              element={props.element}
              updateTodo={handleTodoUpdate}
              categories={props.categories}
              category={category}
              status={status}
              categorySelect={handleCategoryChange}
              statusSelect={handleStatusChange}
              getStatus={props.getStatus}
            />
            <Button
              variant="contained"
              color={"secondary"}
              todoid={props.element.id}
              onClick={handleTodoDelete}
              endIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </ListItemText>
    </ListItem>
  );
}

export default TodoListItem;
