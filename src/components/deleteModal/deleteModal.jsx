/* eslint-disable react/prop-types */

import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../tableModal/modal.module.css";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axiosInstance from "../../utils/axiosInstance";

const DeleteModal = ({
  openDelete,
  handleClose,
  selectedRowData,
  url,
  setSuccessDelete,
}) => {
  const [loading, setLoading] = useState(false);
  console.log(selectedRowData);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`${url}`, {
        data: {
          id: selectedRowData._id,
        },
      });
      setLoading(false);
      console.log(`${url} deleted`);
      setSuccessDelete(res);
      handleClose();
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.container}>
          <div className={styles.divStyle}>
            <Typography
              variant="p"
              component="p"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Alert
            </Typography>
            <IconButton
              className={styles.spanStyle}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="p" component="p" mb="1rem">
            Are you sure you want to delete ?
          </Typography>
          {loading ? (
            <LoadingButton>Loading ...</LoadingButton>
          ) : (
            <button
              className="font-medium border-l-0 border-r-0 hover:brightness-110 bg-[#3ECCA6] border-[2px] border-[#3ECCA6] py-2 px-5 transition-all duration-200 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;
