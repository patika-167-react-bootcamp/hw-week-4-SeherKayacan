import { Button, Grid } from "@mui/material";
import FilterIcon from "@mui/icons-material/FilterList"
import FilterOffIcon from "@mui/icons-material/FilterListOff"
import React, { useEffect, useState } from "react";
import SelectFormGroup from "./SelectFormGroup";

function TodoFilter({ categories, getStatus, filter, cleanFilter }) {
  const [category, setCategory] = useState({ id: null, title: "" });
  const [status, setStatus] = useState({ id: null, title: ""  });

  const handleCategoryChange = (value) => {
    setCategory(value);
    setStatus({ id: null, title: "" })
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleCleanFilter = () => {
    cleanFilter();
    setCategory({ id: null, title: "" });
    setStatus({ id: null, title: "" });
  };

  const handleFilter = () => {
    filter(category.id, status.id);
  };

  useEffect(() => {
    setCategory({ id: null, title: "" });
    setStatus({ id: null, title: "" });
  }, [categories])

  return (
    <Grid sx={{ border: 1, borderRadius: 4, my: 4, p: 2 }} container>
      <SelectFormGroup
        xs={6}
        gap={2}
        categories={categories}
        category={category}
        status={status}
        categorySelect={handleCategoryChange}
        statusSelect={handleStatusChange}
        getStatus={getStatus}
      />
      <Grid item gap={2}>
        <Button variant="contained" endIcon={<FilterIcon/>} onClick={handleFilter}>
          Filter
        </Button>
        <Button variant="contained" endIcon={<FilterOffIcon/>} onClick={handleCleanFilter}>
          Clean Filter
        </Button>
      </Grid>
    </Grid>
  );
}

export default TodoFilter;
