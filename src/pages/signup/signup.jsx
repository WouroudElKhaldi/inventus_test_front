import { useContext, useState } from "react";
import { AuthContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import styles from "./signup.module.css";
export function SignUp() {
  const { fetchUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { email, password, fullName } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // error validsation
  const validateFormData = () => {
    if (!fullName || !email || !password) {
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
    try {
      const res = await axiosInstance.post("/user/signup", {
        email: email,
        password: password,
        fullName: fullName,
        role: "User",
      });
      console.log(res);
      await fetchUserData();
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <section className={styles.form__Cont}>
        <div className={styles.top}>
          <h1>Create a new account</h1>
          <p>
            {"Already have an account?"} <Link to="/login">Login Up</Link>
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
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
              value={formData.password}
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
          {error && <p>An error occured, please try again</p>}
        </form>
      </section>
    </div>
  );
}
