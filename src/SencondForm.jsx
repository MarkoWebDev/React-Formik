import React from "react";
import "./Form.css";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import { useFormik } from "formik";
import * as Yup from "yup";

const SencondForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    office: "1",
    send: "",
    gender: "3",
    text: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password can onyl contain letters"),
    confirmPassword: Yup.string()
      .required("Required")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password can contain only letters")
      .oneOf([Yup.ref("password"), null], "Password must match"),
    send: Yup.boolean().oneOf([true], "This field must be checked"),
  });

  const handleSumbit = (e) => {
    e.preventDefault();
    if (formik.isValid === true) {
      console.log(formik);
    } else {
      alert("Check your inputs");
      return;
    }
  };

  const formik = useFormik({ initialValues, handleSumbit, validationSchema });

  const office = [
    {
      id: "1",
      name: "Madrid",
    },
    {
      id: "2",
      name: "Rome",
    },
    {
      id: "3",
      name: "Moscow",
    },
  ];

  const gender = [
    { id: "1", name: "Male" },
    { id: "2", name: "Female" },
    { id: "3", name: "Other" },
  ];
  return (
    <div className="formik-section">
      <form onSubmit={handleSumbit}>
        <h1>Second Form</h1>
        <div className="formik-field">
          <TextField
            id="firstName"
            label="FirstName"
            variant="outlined"
            type="text"
            name="firstName"
            {...formik.getFieldProps("firstName")}
          ></TextField>
        </div>
        {formik.touched.firstName && formik.errors.firstName && (
          <p className="error">{formik.errors.firstName}</p>
        )}
        <div className="formik-field">
          <TextField
            id="lastName"
            label="LastName"
            variant="outlined"
            type="text"
            name="lastName"
            {...formik.getFieldProps("lastName")}
          ></TextField>
        </div>
        {formik.touched.lastName && formik.errors.lastName && (
          <p className="error">{formik.errors.lastName}</p>
        )}
        <div className="formik-field">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            {...formik.getFieldProps("email")}
          ></TextField>
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="error">{formik.errors.email}</p>
        )}
        <div className="formik-field">
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
          ></TextField>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}
        <div className="formik-field">
          <TextField
            id="confirmPassword"
            label="ConfirmPassword"
            variant="outlined"
            type="password"
            name="confirmPassword"
            {...formik.getFieldProps("confirmPassword")}
          ></TextField>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="error">{formik.errors.confirmPassword}</p>
        )}
        <div className="formik-field">
          <TextField
            id="text"
            label="Send some text"
            variant="outlined"
            name="text"
            rows={4}
            {...formik.getFieldProps("text")}
          ></TextField>
        </div>
        <div className="formik-flex">
          <Select id="office" name="office" {...formik.getFieldProps("office")}>
            {office.map((office) => {
              return (
                <MenuItem key={office.id} value={office.id}>
                  {office.name}
                </MenuItem>
              );
            })}
          </Select>
          <div>
            <FormControl>
              <RadioGroup
                id="gender"
                name="gender"
                {...formik.getFieldProps("gender")}
              >
                {gender.map((gender) => {
                  return (
                    <FormControlLabel
                      key={gender.id}
                      label={gender.name}
                      control={<Radio name="gender" value={gender.id}></Radio>}
                    ></FormControlLabel>
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  id="send"
                  name="send"
                  {...formik.getFieldProps("send")}
                />
              }
              label="Send"
            />
          </FormGroup>
        </div>
        {formik.touched.send && formik.errors.send && (
          <p className="error">{formik.errors.send}</p>
        )}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SencondForm;
