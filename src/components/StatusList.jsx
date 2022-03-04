import {
  Button,
  TextField,
  Modal,
  Box,
  Grid,
  List,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectForm from "./SelectForm";
import StatusListItem from "./StatusListItem";

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

const colors = [
  { id: 1, title: "red" },
  { id: 2, title: "orange"},
  { id: 3, title: "purple" },
  { id: 4, title: "blue" },
];

function StatusList({ getStatus, deleteStatus, updateStatus, ...props }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState("");
  const [color, setColor] = useState({ id: null, title: "" });
  const [status, setStatus] = useState([]);

  const handleAdd = () => {
    if (value && color) {
      const data = {
        title: value,
        categoryId: props.category.id,
        color: color.title,
      };
      props
        .addStatus(data)
        .then((response) => {
          setStatus([...status, response]);
        })
        .then(() => {
          setColor({ id: null, title: "" });
          setValue("");
        });
    }
  };

  const handleUpdate = (data) => {
    updateStatus(data)
    .then(() => {
      getStatus(props.category.id).then((result) => setStatus(result));
    })
  };

  const handleDelete = (e) => {
    const statusId = e.target.attributes.statusid.value;
    deleteStatus(statusId).then(() => {
      const newStatus = status.slice();
      const statusIndex = status.findIndex((status) => status.id === statusId);
      newStatus.splice(statusIndex, 1);
      setStatus(newStatus);
    });
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleColorSelect = (value) => {
    setColor(value);
  };

  useEffect(() => {
    getStatus(props.category.id).then((result) => setStatus(result));
  }, [props.category.id, getStatus]);

  return (
    <>
      <Button variant="contained" endIcon={<EditIcon />} onClick={handleOpen}>
        Edit Status
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="status-edit">
        <Fade in={open}>
          <Box sx={style}>
            <Grid container>
              <Grid container>
                <Typography variant="h5">
                  Edited Category : {props.category.title}
                </Typography>
              </Grid>
              <Grid container sx={{ my: 4 }} gap={2}>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Status"
                    variant="outlined"
                    value={value}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <SelectForm
                    label="Color"
                    size="small"
                    value={color}
                    handleSelect={handleColorSelect}
                    data={colors}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={handleAdd}
                  >
                    Add Status
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <List sx={{ width: "100%" }}>
                  {status.map((element) => {
                    return (
                      <StatusListItem key={element.id} element={element} categoryId={props.category.id} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default StatusList;
