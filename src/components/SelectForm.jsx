import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";

function SelectForm({ handleSelect, size, label, data, category, ...props}) {
  const [value, setValue] = useState(props.value.title)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleBlur = (e) => {
    const id = e.target.attributes.dataid.value
    if (id) {
      handleSelect({ id: id, title: value })
    }
  }

  useEffect(() => {
    setValue(props.value.title)
  }, [props.value, data])

  return (
    <FormControl fullWidth size={size || "large"}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={handleChange}
      >
      {data && data.map((element) => (<MenuItem key={element.id} value={element.title} dataid={element.id} onBlur={handleBlur} >{element.title}</MenuItem>))}
      </Select>
    </FormControl>
  );
}

export default SelectForm;
