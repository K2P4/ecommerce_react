import React from "react";
import {
  Stack,
  Pagination,
} from "@mui/material";

const PaginationComponent = ({page,setPage,total}) => {
  return (
    <div>
      {" "}
      <Stack className="flex items-center  justify-center my-10" spacing={2}>
        <Pagination
          page={page}
          onChange={(event, value) => setPage(value)}
          count={total}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
};

export default PaginationComponent;
