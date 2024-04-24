import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./modal.module.css";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axiosInstance from "../../utils/axiosInstance";

const TableModal = ({
  type,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    number: "",
    minCapacity: "",
    maxCapacity: "",
    status: "",
    typeee: "",
    xPosition: "",
    yPosition: "",
    locked: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        number: selectedRowData && selectedRowData.number,
        minCapacity: selectedRowData && selectedRowData.minCapacity,
        status: selectedRowData && selectedRowData.status,
        maxCapacity: selectedRowData && selectedRowData.maxCapacity,
        typeee: selectedRowData && selectedRowData.typeee,
        xPosition: selectedRowData && selectedRowData.xPosition,
        yPosition: selectedRowData && selectedRowData.yPosition,
        locked: selectedRowData && selectedRowData.locked,
      });
    }
  }, [selectedRowData, type]);

  const {
    minCapacity,
    status,
    maxCapacity,
    number,
    typeee,
    xPosition,
    yPosition,
    locked,
  } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // error validsation
  const validateFormData = () => {
    if (!number || !maxCapacity || !minCapacity || !status || !typeee) {
      return false;
    } else {
      return true;
    }
  };

  const formValidation = validateFormData();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (type === "add") {
      try {
        const res = await axiosInstance.post("/table", {
          minCapacity: minCapacity,
          status: status,
          number: number,
          maxCapacity: maxCapacity,
          typeee: typeee,
          locked: locked,
        });
        console.log(res);
        setLoading(false);
        handleClose();
        setSuccess(res);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      try {
        console.log(typeee);
        const res = await axiosInstance.patch("/table", {
          id: selectedRowData._id,
          minCapacity: minCapacity,
          status: status,
          number: number,
          maxCapacity: maxCapacity,
          typeee: typeee,
          xPosition: xPosition,
          yPosition: yPosition,
          locked: locked,
        });
        console.log(res);
        setLoading(false);
        handleClose();
        setSuccess(res);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
            border: "2px solid #3ECCA6 !important",
            borderRadius: "4px",
            bgcolor: "transparent !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid gray ",
            color: "black",
          },
          "& .MuiInputLabel-root.Mui-focused ": {
            color: "#3ECCA6",
            fontSize: "1.1rem",
            fontWeight: "500",
          },
          "& .MuiSvgIcon-root": {
            color: "gray",
          },
          "& .MuiFormControl-root > label": {
            color: "gray",
          },
          ".MuiFormHelperText-root.Mui-error": {
            color: "#8B0000",
          },
          "& .Mui-error > fieldset ": {
            border: "2px solid #8B0000 !important",
          },
        }}
      >
        <Box className={`${styles.container} ${styles.view}`}>
          <Box className={styles.divStyle}>
            <Typography
              variant="p"
              component="p"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {type === "add" ? "Add Table" : "Edit Table"}
            </Typography>
            <IconButton
              className={styles.spanStyle}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <form
            onSubmit={(e) => handleSubmit(e)}
            action=""
            className={styles.form}
            encType="multipart/form-data"
          >
            <TextField
              fullWidth
              id="filled-basic1"
              label="Number"
              variant="outlined"
              name="number"
              value={formData.number}
              onChange={handleChange}
              type="number"
            />
            <TextField
              fullWidth
              id="filled-basic2"
              label="Minimum Capacity"
              variant="outlined"
              name="minCapacity"
              value={formData.minCapacity}
              onChange={handleChange}
              type="number"
            />
            <TextField
              fullWidth
              id="filled-basic3"
              label="Maximum Capacity"
              variant="outlined"
              name="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleChange}
              type="number"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label1">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                value={formData.status}
                label="Status"
                name="status"
                onChange={handleChange}
              >
                <MenuItem value={"Availble"}>Availble</MenuItem>
                <MenuItem value={"Reserved"}>Reserved</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                value={formData.typeee}
                label="Type"
                name="typeee"
                onChange={handleChange}
              >
                <MenuItem value={"Rectangle"}>Rectangle</MenuItem>
                <MenuItem value={"Round"}>Round</MenuItem>
                <MenuItem value={"Square"}>Square</MenuItem>
                <MenuItem value={"Triangle"}>Triangle</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label1">Locked ?</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                value={formData.locked}
                label="Locked?"
                name="locked"
                onChange={handleChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="filled-basic4"
              label="X Position"
              variant="outlined"
              name="xPosition"
              value={formData.xPosition}
              onChange={handleChange}
              type="number"
            />
            <TextField
              fullWidth
              id="filled-basic5"
              label="Y Position"
              variant="outlined"
              name="yPosition"
              value={formData.yPosition}
              onChange={handleChange}
              type="number"
            />
            {loading ? (
              <LoadingButton>Loading ...</LoadingButton>
            ) : (
              <input
                type="submit"
                value={"Submit"}
                className={`${styles.submit__button} ${
                  formValidation === false ? styles.disabled : ""
                }`}
                disabled={formValidation === false}
              />
            )}
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default TableModal;
