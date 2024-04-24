/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TableComp = ({
  data,
  isEdit,
  ForWhat,
  handleEditOpen,
  setSelectedRowData,
  handleOpenDelete,
  handleOpenView,
  openManageTeam,
}) => {
  const [columns, setColumns] = useState([]);
  const buton = isEdit === true ? true : false;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const manageTeam = (e, row) => {
    e.preventDefault();
    openManageTeam(row);
    setSelectedRowData(row);
  };

  const handleEdit = (e, row) => {
    e.preventDefault();
    handleEditOpen(row);
    setSelectedRowData(row);
  };

  const handleDelete = (e, row) => {
    e.preventDefault();
    handleOpenDelete(row);
    setSelectedRowData(row);
  };

  const handleView = (e, row) => {
    e.preventDefault();
    handleOpenView(row);
    setSelectedRowData(row);
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const dateObj = new Date(date);
    const localDate = new Date(
      dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
    );
    return localDate.toLocaleDateString("en-GB", options);
  };

  let visibleFields;
  useEffect(() => {
    try {
      if (ForWhat === "users") {
        visibleFields = ["fullName", "role", "email"];
      } else if (ForWhat === "table") {
        visibleFields = [
          "number",
          "minCapacity",
          "maxCapacity",
          "status",
          "typeee",
          "xPosition",
          "yPosition",
          "locked",
        ];
      } else if (ForWhat === "reservation") {
        visibleFields = [
          "table_number",
          "user_name",
          "date",
          "time",
          "duration",
        ];
      } else {
        visibleFields = Object.keys(data[0]);
      }

      const updatedColumns = visibleFields.map((field) => ({
        field,
        headerName: field,
        flex: screenWidth < 800 ? 0 : 1,
        renderCell: (params) => {
          if (field === "date" && params.row.date) {
            return <div>{formatDate(params.row.date)}</div>;
          }

          if (field === "locked" && params.row.locked) {
            return <div>{params.row.locked === true ? "Yes" : "No"}</div>;
          }

          return params.value;
        },
      }));

      if (buton === true) {
        updatedColumns.push({
          field: "view",
          headerName: "View",
          renderCell: (params) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton onClick={(e) => handleView(e, params.row)}>
                <VisibilityIcon
                  sx={{
                    ":hover": {
                      color: "#A0471D !important",
                    },
                  }}
                />
              </IconButton>
            </div>
          ),
        });
        updatedColumns.push({
          field: "edit",
          headerName: "Edit",
          renderCell: (params) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton onClick={(e) => handleEdit(e, params.row)}>
                <EditIcon
                  sx={{
                    ":hover": {
                      color: "#A0471D !important",
                    },
                  }}
                />
              </IconButton>
            </div>
          ),
        });
        updatedColumns.push({
          field: "delete",
          headerName: "Delete",
          renderCell: (params) => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton onClick={(e) => handleDelete(e, params.row)}>
                <DeleteIcon
                  sx={{
                    ":hover": {
                      color: "#A0471D !important",
                    },
                  }}
                />
              </IconButton>
            </div>
          ),
        });
      }

      setColumns(updatedColumns);
    } catch (error) {
      console.error(error);
    }
  }, [ForWhat, buton, data, screenWidth]);

  return (
    <>
      <Box
        sx={{
          height: 410,
          mt: "3rem",
          mb: "3rem",
        }}
      >
        <DataGrid
          isCellEditable={() => false}
          columns={columns}
          rows={data}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            marginBottom: "4rem",
            width: "100%",
            border: "solid 1px #BABABA",
            "& .MuiToolbar-root , .MuiInputBase-input , .MuiDataGrid-columnHeaderTitleContainer , .MuiDataGrid-cell":
              {
                color: "black",
              },
            "& .MuiButtonBase-root , & .MuiSvgIcon-root , &  .MuiSvgIcon-root":
              {
                color: "#3ECCA6",
              },
            "& .MuiDataGrid-root > *": {
              height: "100%",
            },
            "& .MuiInputBase-root , & .MuiInputBase-input": {
              color: "#000",
            },
            "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after": {
              borderBottomColor: "#3ECCA6",
            },
            " & .Mui-selected ": {
              bgcolor: "#3ECCA6 !important",
            },
            "& .Mui-hovered": {
              bgcolor: " #08829557 !important",
            },
            "& .Mui-selected": {
              bgcolor: "#08829557 !important",
            },
            "& .MuiDataGrid-columnHeaders , & .MuiDataGrid-toolbarContainer , & .MuiDataGrid-footerContainer":
              {
                fontSize: "1.2rem",
                mb: screenWidth < 500 ? "1rem" : "0",
              },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              color: "#3ECCA6 !important",
            },
            ".MuiDataGrid-cell": {
              width: "8rem",
            },
            "& .MuiSelect-select , & .MuiTablePagination-select , & .MuiSelect-standard MuiInputBase-input css-194a1fa-MuiSelect-select-MuiInputBase-input":
              {
                color: "#3ECCA6 !important",
              },
          }}
        />
      </Box>
    </>
  );
};

export default TableComp;
