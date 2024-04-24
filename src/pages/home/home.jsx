import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import styles from "./home.module.css";
import { TableUI } from "../../components/tableUI/tableUI";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  LocalizationProvider,
  TimePicker,
  DatePicker,
} from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthContext } from "../../context/userContext";
import { TableUIUser } from "../../components/tableUI/tableUI_User";
import { Link } from "react-router-dom";

export function Home() {
  const [tableData, setTableData] = useState([]);
  const { user } = useContext(AuthContext);
  const [tableDetails, setTableDetails] = useState(null);
  const [formData, setFormData] = useState({
    tableId: tableDetails && tableDetails._id,
    duration: "",
  });
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [successEditTable, setSuccessEditTable] = useState(null);
  const [successReserve, setSuccessReserve] = useState(null);

  useEffect(() => {
    const fetchTable = async () => {
      const res = await axiosInstance.get("/table");
      setTableData(res.data);
    };
    fetchTable();
  }, [successEditTable]);

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (user && user) {
      try {
        setLoading(true);

        const res = await axiosInstance.post("/reservation", {
          userId: user && user._id,
          time: time,
          tableId: tableId,
          date: date,
          duration: duration,
        });
        setLoading(false);
        setSuccessReserve(res);
        setTimeout(() => {
          setSuccessReserve(null);
        }, 15000);
        setFormData({
          tableId: "",
          duration: "",
        });
        setDate(null);
        setTime(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorUser(true);
      return;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const { tableId, duration } = formData;

  // error validsation
  const validateFormData = () => {
    if (!tableId || !date || !duration || !time) {
      return false;
    } else {
      return true;
    }
  };

  const formValidation = validateFormData();

  const [tableFormData, setTableFormData] = useState({
    number: "",
    minCapacity: "",
    maxCapacity: "",
    status: "",
    typeee: "",
    locked: "",
  });
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    setTableFormData({
      number: tableDetails && tableDetails.number,
      minCapacity: tableDetails && tableDetails.minCapacity,
      status: tableDetails && tableDetails.status,
      maxCapacity: tableDetails && tableDetails.maxCapacity,
      typeee: tableDetails && tableDetails.typeee,
      locked: tableDetails && tableDetails.locked,
    });
  }, [tableDetails]);

  const { minCapacity, status, maxCapacity, number, typeee, locked } =
    tableFormData;

  const handleTableChange = (event) => {
    const { name, value } = event.target;
    setTableFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // error validsation
  const validateTableFormData = () => {
    if (!number || !maxCapacity || !minCapacity || !status || !typeee) {
      return false;
    } else {
      return true;
    }
  };

  const tableFormValidation = validateTableFormData();

  const handleSubmitTable = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await axiosInstance.patch("/table", {
        id: tableDetails._id,
        minCapacity: minCapacity,
        status: status,
        number: number,
        maxCapacity: maxCapacity,
        typeee: typeee,
        locked: locked,
      });
      setSuccessEditTable(res);
      setLoading2(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Box
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
        "& .MuiFormControl-root , .MuiStack-root": {
          width: "100%",
        },
      }}
      className={styles.container}
    >
      <aside className={styles.sidebar}>
        <section className={styles.table__section}>
          <h2 className={styles.h2}>Table Details</h2>
          {tableDetails === null || tableDetails === undefined ? (
            <p className={styles.table__details}>
              Please select a table to see its details{" "}
            </p>
          ) : user && user.role === "Admin" ? (
            <form
              onSubmit={(e) => handleSubmitTable(e)}
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
                value={tableFormData.number}
                onChange={handleTableChange}
                type="number"
              />
              <TextField
                fullWidth
                id="filled-basic2"
                label="Minimum Capacity"
                variant="outlined"
                name="minCapacity"
                value={tableFormData.minCapacity}
                onChange={handleTableChange}
                type="number"
              />
              <TextField
                fullWidth
                id="filled-basic3"
                label="Maximum Capacity"
                variant="outlined"
                name="maxCapacity"
                value={tableFormData.maxCapacity}
                onChange={handleTableChange}
                type="number"
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label1">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select1"
                  value={tableFormData.status}
                  label="Status"
                  name="status"
                  onChange={handleTableChange}
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
                  value={tableFormData.typeee}
                  label="Type"
                  name="typeee"
                  onChange={handleTableChange}
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
                  value={tableFormData.locked}
                  label="Locked?"
                  name="locked"
                  onChange={handleTableChange}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              {loading2 ? (
                <LoadingButton>Loading ...</LoadingButton>
              ) : (
                <input
                  type="submit"
                  value={"Edit"}
                  className={`${styles.submit__button} ${
                    tableFormValidation === false ? styles.disabled : ""
                  }`}
                  disabled={tableFormValidation === false}
                />
              )}
            </form>
          ) : (
            <div className={styles.table__details}>
              <p className={styles.table__p}>
                <span className={styles.table__span}>Table Number:</span>{" "}
                {tableDetails.number}
              </p>
              <p className={styles.table__p}>
                <span className={styles.table__span}>Type:</span>{" "}
                {tableDetails.typeee}
              </p>
              <p className={styles.table__p}>
                <span className={styles.table__span}>Status:</span>{" "}
                {tableDetails.status}
              </p>
              <p className={styles.table__p}>
                <span className={styles.table__span}>Min Capacity:</span>{" "}
                {tableDetails.minCapacity + " People"}
              </p>
              <p className={styles.table__p}>
                <span className={styles.table__span}>Max Capacity:</span>{" "}
                {tableDetails.maxCapacity + " People"}
              </p>
            </div>
          )}
        </section>
        {!user || (user && user.role === "User") ? (
          <section className={styles.table__section}>
            <h2 className={styles.h2}>Reservation Details</h2>
            {tableDetails === null || tableDetails === undefined ? (
              <p className={styles.table__details}>
                Please select a table to see its details{" "}
              </p>
            ) : (
              <form
                onSubmit={(e) => hanldeSubmit(e)}
                className={`${styles.reservation__form} `}
              >
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
                {loading ? (
                  <LoadingButton>Loading ...</LoadingButton>
                ) : (
                  <input
                    type="submit"
                    value={"Reserve"}
                    className={`${styles.submit__button} ${
                      formValidation === false ? styles.disabled : ""
                    }`}
                    disabled={formValidation === false}
                  />
                )}
                {errorUser ? (
                  <p>
                    You should{" "}
                    <Link
                      to={"/login"}
                      style={{
                        fontWeight: "700",
                      }}
                    >
                      Login
                    </Link>{" "}
                    first
                  </p>
                ) : successReserve && successReserve.status === 200 ? (
                  <p
                    style={{
                      alignItems: "flex-start",
                      margin: 0,
                    }}
                  >
                    {" "}
                    Reservation done Successfully
                  </p>
                ) : (
                  ""
                )}
              </form>
            )}
          </section>
        ) : (
          ""
        )}
        <p className={styles.table__details}>
          <span className={styles.table__span}>Note: </span> The lock means that
          this table's position is locked and u can't change it until u unlocke
          it
        </p>
      </aside>
      <div className={styles.table__holder}>
        {tableData.map((table) => {
          if (!user || user.role === "User" || table.locked === true) {
            return (
              <TableUIUser
                key={table._id}
                table={table}
                setTableDetails={setTableDetails}
                setFormData={setFormData}
              />
            );
          } else if (user.role === "Admin") {
            const allTablePositions = tableData.map((table) => ({
              x: table.xPosition,
              y: table.yPosition,
            }));
            return (
              <TableUI
                key={table._id}
                table={table}
                setTableDetails={setTableDetails}
                setFormData={setFormData}
                allTablePositions={allTablePositions}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </Box>
  );
}
