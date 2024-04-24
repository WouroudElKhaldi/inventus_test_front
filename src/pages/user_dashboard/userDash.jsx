/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import styles from "./dash.module.css";
import TableComp from "../../components/table/table";
import { useEffect, useState } from "react";
import DeleteModal from "../../components/deleteModal/deleteModal";
import UserModal from "../../components/userModal/userModal";
import ViewModal from "../../components/viewModal/viewModal";
import axiosInstance from "../../utils/axiosInstance";

export function UserDash() {
  const [open, setOpen] = useState({
    add: false,
    edit: false,
    delete: false,
    view: false,
  });
  const [userData, setUserData] = useState([]);
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
        const res = await axiosInstance.get(`/user`);
        setUserData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [success]);
  return (
    <>
      <Box>
        <div className={styles.h1_container}>
          <h1 className={styles.h1}>Manage Users</h1>
          <button className={styles.button} onClick={() => handleOpenAdd()}>
            Add User
          </button>
        </div>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <TableComp
            ForWhat={"users"}
            isEdit={true}
            data={userData && userData}
            handleEditOpen={() => handleOpenEdit()}
            handleOpenDelete={() => handleOpenDelete()}
            setSelectedRowData={setSelectedRowData}
            handleOpenView={() => handleOpenView()}
          />
        )}
        <UserModal
          open={open.add}
          type={"add"}
          handleClose={() => handleClose()}
          setSuccess={setSuccess}
        />
        <UserModal
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
          url={"/user"}
        />
      </Box>
    </>
  );
}
