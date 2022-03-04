import { Button, Grid, TextField } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from 'react'
import SelectFormGroup from './SelectFormGroup'

function TodoAdd({ categories, getStatus, handleAdd }) {
  const [todo, setTodo] = useState("")
  const [category, setCategory] = useState({ id: null, title: "" });
  const [status, setStatus] = useState({ id: null, title: ""  });

  const handleCategoryChange = (value) => {
    setCategory(value)
    setStatus({ id: null, title: "" })
  }

  const handleStatusChange = (value) =>  {
    setStatus(value)
  }

  const handleTodoChange = (e) => {
    setTodo(e.target.value)
  }

  async function handleSubmit() {
    if (todo && category.id && status.id) {
      const data = { title: todo, categoryId: Number(category.id), statusId: Number(status.id) }
      await handleAdd(data)
      setCategory({ id: null, title: "" })
      setStatus({ id: null, title: "" })
      setTodo("");
    }
  }

  useEffect(() => {
    setCategory({ id: null, title: "" })
    setStatus({ id: null, title: "" })
  }, [categories])

  return (
    <Grid sx={{ border: 1, borderRadius: 4, my: 4, p: 2 }} container>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Todo"
            variant="outlined"
            value={todo}
            onChange={handleTodoChange}
          />
        </Grid>
        <SelectFormGroup
          xs={5}
          gap={2}
          categories={categories}
          category={category}
          status={status}
          categorySelect={handleCategoryChange}
          statusSelect={handleStatusChange}
          getStatus={getStatus}
        />
        <Grid item>
          <Button variant="contained" size="medium" endIcon={<AddIcon />} onClick={handleSubmit}>
            Add
          </Button>
        </Grid>
      </Grid>
  )
}

export default TodoAdd