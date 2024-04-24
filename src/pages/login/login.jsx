import { useContext, useState } from "react";
import { AuthContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import styles from "./login.module.css";

export function Login() {
  const { fetchUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { email, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // error validsation
  const validateFormData = () => {
    if (!email || !password) {
      return false;
    } else {
      return true;
    }
  };

  const formValidation = validateFormData();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/user/login", {
        email: email,
        password: password,
      });
      console.log(res);
      await fetchUserData();
      setLoading(false);
      if (res.data.userRole === "Admin") {
        navigate("/dash/tables");
      } else {
        navigate("/");
      }
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
          <h1>Login to your account</h1>
          <p>
            {"Don't have an account?"} <Link>Sign Up</Link>
          </p>
        </div>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
