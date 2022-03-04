import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Fade, Grid, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import SelectFormGroup from "./SelectFormGroup";

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

function TodoEdit(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(props.element.title);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    props.updateTodo(value);
  };

  return (
    <Grid sx={{ justifyContent: "flex-start" }}>
      <Button
        variant="contained"
        size="medium"
        endIcon={<EditIcon />}
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="todo-edit">
        <Fade in={open}>
          <Box sx={style}>
            <Grid container>
              <Grid container gap={2}>
                <Grid item xs={12}>
                  <TextField
                  fullWidth
                    id="outlined-basic"
                    label="Todo"
                    variant="outlined"
                    onChange={handleChange}
                    value={value}
                  />
                </Grid>
                <Grid container item xs={12} gap={2}>
                  <SelectFormGroup
                    gap={2}
                    xs={8}
                    size="small"
                    categories={props.categories}
                    category={props.category}
                    status={props.status}
                    categorySelect={props.categorySelect}
                    statusSelect={props.statusSelect}
                    getStatus={props.getStatus}
                  />
                  <Button
                    variant="contained"
                    endIcon={<CheckIcon />}
                    onClick={handleSubmit}
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
}

export default TodoEdit;
