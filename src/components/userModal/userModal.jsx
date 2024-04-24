import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../tableModal/modal.module.css";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";

const UserModal = ({
  type,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
    // other fields
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        fullName: selectedRowData && selectedRowData.fullName,
        email: selectedRowData && selectedRowData.email,
        password: selectedRowData && selectedRowData.password,
        role: selectedRowData && selectedRowData.role,
        // other fields
      });
    }
  }, [selectedRowData, type]);

  const { email, password, role, fullName } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // error validsation
  const validateFormData = () => {
    if (!fullName || !role || !email || !password) {
      return false;
    } else {
      return true;
    }
  };

  const formValidation = validateFormData();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (type === "add") {
      try {
        const res = await axiosInstance.post("/user", {
          email: email,
          password: password,
          fullName: fullName,
          role: role,
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
        const res = await axiosInstance.patch("/user", {
          id: selectedRowData._id,
          email: email,
          password: password,
          fullName: fullName,
          role: role,
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
              {type === "add" ? "Add User" : "Edit User"}
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
              id="filled-basic2"
              label="Name"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="filled-basic2"
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.role}
                label="Role"
                name="role"
                onChange={handleChange}
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"User"}>User</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={handleChange}
                name="password"
              />
            </FormControl>
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

export default UserModal;
