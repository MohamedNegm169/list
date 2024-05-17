import React, { useState, useEffect } from "react";
import { Autocomplete, Grid, Icon, TextField, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { TextOptions, Conjunction } from "./options.constant";

export default function FilterSet({
  columns,
  index,
  handleDeleteFilterSet,
  setFilter,
  filter,
}) {
  const [selectedConjunction, setSelectedConjunction] = useState(
    filter?.conjunction
  );

  const handleChangeConjunction = (selectedConjunction) => {
    setFilter({
      filterSets: filter.filterSets,
      conjunction: selectedConjunction,
    });
  };

  const handleChangeColumn = (value) => {
    setFilter({
      filterSets: filter.filterSets.map((set, idx) => {
        if (index == idx) {
          return { ...set, column: value.id };
        }
        return set;
      }),
      conjunction: selectedConjunction,
    });
  };
  const handleChangeOperator = (value) => {
    setFilter({
      filterSets: filter.filterSets.map((set, idx) => {
        if (index == idx) {
          return { ...set, operator: value.id };
        }
        return set;
      }),
      conjunction: selectedConjunction,
    });
  };

  const handleChangeFilterValue = (event) => {
    setFilter({
      filterSets: filter.filterSets.map((set, idx) => {
        if (index == idx) {
          return { ...set, filterValue: event.target.value };
        }
        return set;
      }),
      conjunction: selectedConjunction,
    });
  };

  return (
    <>
      <Grid item xs={0.5} alignContent={"end"} key={index}>
        <IconButton onClick={() => handleDeleteFilterSet(index)}>
          <Clear fontSize="14" />
        </IconButton>
      </Grid>
      {index > 0 ? (
        <Grid item xs={1.5}>
          <Autocomplete
            id="combo-box-demo"
            options={Conjunction}
            clearOnEscape
            onChange={(event, value) => handleChangeConjunction(value)}
            value={filter?.conjunction}
            disabled={index > 1}
            renderInput={(params) => (
              <TextField
                {...params}
                value={filter?.conjunction}
                label="and/or"
                variant="standard"
              />
            )}
          />
        </Grid>
      ) : (
        <Grid item xs={1.5}></Grid>
      )}
      <Grid item xs={3}>
        <Autocomplete
          options={columns}
          clearOnEscape
          onChange={(event, value) => handleChangeColumn(value)}
          renderInput={(params) => (
            <TextField {...params} label="Column" variant="standard" />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Autocomplete
          options={TextOptions}
          clearOnEscape
          onChange={(event, value) => handleChangeOperator(value)}
          renderInput={(params) => (
            <TextField {...params} label="Operator" variant="standard" />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="standard-basic"
          label="Filter Value"
          variant="standard"
          onChange={handleChangeFilterValue}
        />
      </Grid>
    </>
  );
}
