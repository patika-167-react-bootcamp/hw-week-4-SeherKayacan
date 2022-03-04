import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SelectForm from './SelectForm'

function SelectFormGroup({ getStatus, xs, gap, size, categories, categorySelect, statusSelect, category, ...props }) {
  const [status, setStatus] = useState([])

  useEffect(() => {
    if (category.id) {
      getStatus(category.id).then(result=> setStatus(result))
    } else {
      setStatus([])
    }
  }, [category, getStatus])

  return (
    <Grid item xs={xs} gap={gap}>
          <SelectForm label="Category" value={category} size={size} handleSelect={categorySelect} data={categories} />
          <SelectForm label="Status" category={category} value={props.status} size={size} handleSelect={statusSelect} data={status} />
    </Grid>
  )
}

export default SelectFormGroup