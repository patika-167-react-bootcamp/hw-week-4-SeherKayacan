import { Grid, List } from "@mui/material";
import TodoListItem from "./TodoListItem";

function TodoList(props) {
  return (
    <Grid
      sx={{ border: 1, borderRadius: 4, boxShadow: 4, my: 4, p: 2 }}
      container
    >
      <List sx={{ width: "100%" }}>
        {props.todos.map((element) => {
          return (
            <TodoListItem
              element={element}
              categories={props.categories}
              getStatus={props.getStatus}
              updateTodo={props.updateTodo}
              deleteTodo={props.deleteTodo}
              key={element.id}
            />
          );
        })}
      </List>
    </Grid>
  );
}

export default TodoList;
