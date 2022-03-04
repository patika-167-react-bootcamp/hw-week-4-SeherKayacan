import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

function EditableListItem(props) {
  const [value,setValue] = useState(props.title);

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleBlur = () => {
    if (value) {
      if (props.categoryId) {
        props.updateItem({ title: value, id: props.id, categoryId: props.categoryId, color:props.color })
      } else {
        props.updateItem({ title: value, id: props.id })
      }
    }
  }

  useEffect(() => {
    setValue(props.title)
  }, [props.title])

  return (
    <TextField fullWidth size='small' value={value} onChange={handleChange} onBlur={handleBlur} />
  )
}

export default EditableListItem