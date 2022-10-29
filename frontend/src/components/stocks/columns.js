// import ColumnFilter from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "Id",
    // add footer descriptions just like headers
    Footer: "Id",
    // associate each columns with the rows of data
    accessor: "id",
    // Filter: ColumnFilter,
  },
  {
    Header: "Product Name",
    Footer: "Product Name",
    accessor: "product_name",
    // Filter: ColumnFilter,
  },
  {
    Header: "Category",
    Footer: "Category",
    accessor: "category",
    // Filter: ColumnFilter,
  },
  {
    Header: "Quantity",
    Footer: "Quantity",
    accessor: "quantity",
    // Filter: ColumnFilter,
  },
  // {
  //   Header: "Images",
  //   Footer: "Images",
  //     accessor: "image",
  //   // Filter: ColumnFilter,
  //   Cell: (tableProps) => (
  //     <img
  //       src={tableProps.row.original.image}
  //       width={30}
  //       alt="sample products"
  //     />
  //   ),
  // },
];

// column grouping
export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "Product Name",
        Footer: "Product Name",
        accessor: "product_name",
      },
      {
        Header: "Category",
        Footer: "Category",
        accessor: "category",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Quantity",
        Footer: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Images",
        Footer: "Images",
        accessor: "image",
        Cell: (tableProps) => (
          <img
            src={tableProps.row.original.image}
            width={30}
            alt="sample products"
          />
        ),
      },
    ],
  },
];