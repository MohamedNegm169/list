const filter = (rows, filter) => {
  let filteredData = rows;
  let orOperator = filter.conjunction.id == "or";
  if (filteredData) {
    for (const filterSet of filter.filterSets) {
      filteredData = filteredData.filter((item) => {
        let matches = true; // Initialize for AND logic
        console.log(">>>> filterSet ", filterSet);

        const { column, operator, filterValue } = filterSet;
        const fieldValue = item[column];
        if (filterValue)
          switch (operator) {
            case "isEqual":
              matches = fieldValue === filterValue;
              break;
            case "contain":
              console.log(">>> inside");
              matches = fieldValue.includes(filterValue);
              break;

            default:
              console.warn("Invalid operator:", operator);
          }

        // Short circuit for OR logic: stop if a condition matches
        if (orOperator && matches) {
          return true;
        }

        // Return item if all conditions in the set match (AND)
        return matches;
      });
    }
    console.log(">>>>> filteredData ", filteredData);
    return filteredData;
  }
};

export const FilterManager = {
  filter,
};
