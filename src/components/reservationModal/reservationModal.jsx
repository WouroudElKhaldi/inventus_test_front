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
import styles from "../tableModal/modal.module.css";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import axiosInstance from "../../utils/axiosInstance";

const ReservationModal = ({
  type,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    tableId: "",
    userId: "",
    duration: "",
    // other fields
  });
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [tableData, setTableData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        tableId: selectedRowData && selectedRowData.tableId,
        userId: selectedRowData && selectedRowData.userId,
        duration: selectedRowData && selectedRowData.duration,
      });
    }
  }, [selectedRowData, type]);

  useEffect(() => {
    const fetchTables = async () => {
      const res = await axiosInstance.get("/table");
      setTableData(res.data);
    };

    const fetchUsers = async () => {
      const res = await axiosInstance.get("/user");
      setUserData(res.data);
    };

    fetchTables();
    fetchUsers();
  }, []);
  const { userId, tableId, duration } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // error validsation
  const validateFormData = () => {
    if (!tableId || !date || !userId || !duration || !time) {
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
        const res = await axiosInstance.post("/reservation", {
          userId: userId,
          time: time,
          tableId: tableId,
          date: date,
          duration: duration,
        });
        setLoading(false);
        handleClose();
        setSuccess(res);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      try {
        const res = await axiosInstance.patch("/reservation", {
          userId: userId,
          time: time,
          tableId: tableId,
          date: date,
          duration: duration,
        });
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
        <Box className={styles.container}>
          <Box className={styles.divStyle}>
            <Typography
              variant="p"
              component="p"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {type === "add" ? "Add Reservation" : "Edit Reservation"}
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Table</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.tableId}
                label="Table"
                name="tableId"
                onChange={handleChange}
              >
                {tableData &&
                  tableData.map((table) => {
                    return (
                      <MenuItem key={table._id} value={table._id}>
                        {table.number}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.userId}
                label="User"
                name="userId"
                onChange={handleChange}
              >
                {userData &&
                  userData.map((user) => {
                    return (
                      <MenuItem key={user._id} value={user._id}>
                        {user.fullName}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date "
                    value={date}
                    name="date"
                    onChange={(value) => setDate(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Time"
                    value={time}
                    name="time"
                    onChange={(value) => setTime(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
            <TextField
              fullWidth
              id="filled-basic2"
              label="Duration"
              variant="outlined"
              name="duration"
              value={formData.duration}
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

export default ReservationModal;
