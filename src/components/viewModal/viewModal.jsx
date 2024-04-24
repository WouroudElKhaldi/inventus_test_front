import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../tableModal/modal.module.css";
import { Typography } from "@mui/material";

const ViewModal = ({ openView, handleClose, selectedRowData }) => {
  const excludeKeys = ["__v", "createdAt", "updatedAt", "_id", "password"];
  return (
    <>
      <Modal
        open={openView}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={`${styles.container} ${styles.view}`}>
          <div className={styles.divStyle}>
            <Typography
              variant="p"
              component="p"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Details
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
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {Object.keys(selectedRowData).map(
              (key) =>
                !excludeKeys.includes(key) && (
                  <div
                    key={key}
                    style={{
                      width: "100%",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        paddingRight: "10px",
                      }}
                    >
                      {key}:
                    </span>
                    {key === "locked"
                      ? selectedRowData[key]
                        ? "Yes"
                        : "No"
                      : selectedRowData[key]}
                  </div>
                )
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ViewModal;
