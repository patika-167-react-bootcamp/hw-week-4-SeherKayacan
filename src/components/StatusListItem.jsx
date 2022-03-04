import { Button, Grid, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import EditableListItem from "./EditableListItem";

function StatusListItem({ element, categoryId, handleUpdate, handleDelete }) {
  return (
    <ListItem disableGutters sx={{ py: 2 }} divider>
      <ListItemText>
        <Grid container gap={2}>
          <Grid item container xs={7}>
            <EditableListItem
              title={element.title}
              id={element.id}
              color={element.color}
              categoryId={categoryId}
              updateItem={handleUpdate}
            />
          </Grid>
          <Grid item gap={2}>
            <Button
              variant="contained"
              endIcon={<DeleteIcon />}
              statusid={element.id}
              color={"secondary"}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </ListItemText>
    </ListItem>
  );
}

export default StatusListItem;
