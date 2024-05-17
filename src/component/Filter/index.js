import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import FilterSet from "./FilterSet";
import { FilterManager } from "./FilterManager";
export default function Filter({ rows, columns, setRows }) {
  const [filter, setFilter] = useState({
    filterSets: [],
    conjunction: {
      id: "and",
      label: "And",
    },
  });
  const handleAddFilter = () => {
    let filterSets = filter.filterSets;
    setFilter({
      filterSets: [
        ...filterSets,
        { column: columns[0], operator: "contain", filterValue: "" },
      ],
      conjunction: filter.conjunction,
    });
  };

  const handleDeleteFilterSet = (index) => {
    setFilter({
      filterSets: filter?.filterSets.filter((ele, idx) => index != idx),
      conjunction: filter.conjunction,
    });
  };

  useEffect(() => {
    let data = FilterManager.filter(rows, filter);
    setRows(data);
  }, [filter]);
  return (
    <Grid container spacing={2} padding={2}>
      {filter?.filterSets.length > 0 ? (
        filter.filterSets.map((filterSet, index) => (
          <FilterSet
            handleDeleteFilterSet={handleDeleteFilterSet}
            index={index}
            filterSet={filterSet}
            columns={columns}
            filter={filter}
            setFilter={setFilter}
          />
        ))
      ) : (
        <Grid item xs={12}>
          <Typography>No Filter Applied</Typography>
        </Grid>
      )}

      <Grid item xs={6}>
        <Button onClick={handleAddFilter}>Add Filter</Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          onClick={() =>
            setFilter({
              filterSets: [],
              conjunction: {
                id: "and",
                label: "And",
              },
            })
          }
        >
          Clear All Filters
        </Button>
      </Grid>
    </Grid>
  );
}
