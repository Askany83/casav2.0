export const sortHouses = (
  a: any,
  b: any,
  sortBy: string,
  sortOrder: string
) => {
  let valueA, valueB;
  switch (sortBy) {
    case "createdAt":
    case "updatedAt":
      valueA = new Date(a[sortBy]).getTime();
      valueB = new Date(b[sortBy]).getTime();
      break;
    case "typeOfHouse":
    case "selectedYear":
    case "locality":
      // Convert values to lowercase for case-insensitive sorting
      valueA = a[sortBy].toLowerCase();
      valueB = b[sortBy].toLowerCase();
      break;
    default:
      break;
  }

  // Handle sorting order
  if (sortOrder === "asc") {
    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  } else {
    if (valueA < valueB) return 1;
    if (valueA > valueB) return -1;
    return 0;
  }
};
