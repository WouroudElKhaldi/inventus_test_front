/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import styles from "../user_dashboard/dash.module.css";
import TableComp from "../../components/table/table";
import { useEffect, useState } from "react";
import DeleteModal from "../../components/deleteModal/deleteModal";
import ViewModal from "../../components/viewModal/viewModal";
import axiosInstance from "../../utils/axiosInstance";
import TableModal from "../../components/tableModal/tableModal";

export function TableDash() {
  const [open, setOpen] = useState({
    add: false,
    edit: false,
    delete: false,
    view: false,
  });
  const [tableData, setTableData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});

  const handleOpenView = () => {
    setOpen({ add: false, edit: false, delete: false, view: true });
  };

  const handleOpenAdd = () => {
    setOpen({ add: true, edit: false, delete: false, view: false });
  };

  const handleOpenEdit = () => {
    setOpen({ add: false, edit: true, delete: false, view: false });
  };

  const handleOpenDelete = () => {
    setOpen({ add: false, edit: false, delete: true, view: false });
  };

  const handleClose = () => {
    setOpen({ add: false, edit: false, delete: false, view: false });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/table`);
        setTableData(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchEvents();
  }, [success]);
  return (
    <>
      <Box>
        <div className={styles.h1_container}>
          <h1 className={styles.h1}>Manage Table</h1>
          <button className={styles.button} onClick={() => handleOpenAdd()}>
            Add Table
          </button>
        </div>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <TableComp
            ForWhat={"table"}
            isEdit={true}
            data={tableData && tableData}
            handleEditOpen={() => handleOpenEdit()}
            handleOpenDelete={() => handleOpenDelete()}
            setSelectedRowData={setSelectedRowData}
            handleOpenView={() => handleOpenView()}
          />
        )}
        <TableModal
          open={open.add}
          type={"add"}
          handleClose={() => handleClose()}
          setSuccess={setSuccess}
        />
        <TableModal
          open={open.edit}
          type={"edit"}
          handleClose={() => handleClose()}
          selectedRowData={selectedRowData}
          setSuccess={setSuccess}
        />
        <ViewModal
          openView={open.view}
          selectedRowData={selectedRowData}
          handleClose={() => handleClose()}
        />
        <DeleteModal
          openDelete={open.delete}
          handleClose={handleClose}
          selectedRowData={selectedRowData && selectedRowData}
          setSuccessDelete={setSuccess}
          url={"/table"}
        />
      </Box>
    </>
  );
}
