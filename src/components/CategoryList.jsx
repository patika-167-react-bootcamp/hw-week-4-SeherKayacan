import {
  TextField,
  Button,
  Modal,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit";
import { Fade } from "@mui/material";
import React, { useState } from "react";
import StatusList from "./StatusList";
import EditableListItem from "./EditableListItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 4,
  boxShadow: 15,
  p: 4,
};

function CategoryList(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (category) {
      props.addCategory(category)
      setCategory("")
    }
  }

  const handleDelete = (e) => {
    props.deleteCategory(e.target.attributes.categoryid.value)
  }

  return (
    <Grid sx={{ justifyContent: "flex-start" }}>
      <Button
        variant="contained"
        size="large"
        endIcon={<EditIcon />}
        onClick={handleOpen}
      >
        Category Edit
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="category-edit">
        <Fade in={open}>
          <Box sx={style}>
            <Grid container>
              <Grid container gap={3}>
                <TextField
                  id="outlined-basic"
                  label="Category"
                  variant="outlined"
                  onChange={handleChange}
                  value={category}
                />
                <Button variant="contained" endIcon={<AddIcon />} onClick={handleSubmit}>
                  Add Category
                </Button>
              </Grid>
              <Grid container>
                <List sx={{ width: "100%" }}>
                  {props.categories.map((element) => {
                    return (
                      <ListItem disableGutters sx={{ py: 2 }} divider key={element.id}>
                        <ListItemText>
                          <Grid container spacing={2}>
                            <Grid item container xs={6}>
                              <EditableListItem title={element.title} id={element.id} updateItem={props.updateCategory} />
                            </Grid>
                            <Grid item gap={2}>
                              <StatusList category={element} getStatus={props.getStatus} deleteStatus={props.deleteStatus} addStatus={props.addStatus} updateStatus={props.updateStatus} />
                              <Button variant="contained" color={"secondary"} categoryid={element.id} endIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button>
                            </Grid>
                          </Grid>
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
}

export default CategoryList;
