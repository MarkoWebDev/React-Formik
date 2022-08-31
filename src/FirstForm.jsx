import React, { useState } from "react";
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

const FirstForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    office: "1",
    send: "",
    gender: "3",
    text: "",
  };

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    send: "",
  });

  const handleSumbit = (e) => {
    e.preventDefault();
    if (error) {
      return;
    } else {
      console.log(formik);
    }
  };

  const validate = (values) => {
    const emailValidate = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      values.email
    );
    if (!values.firstName) {
      setError({ ...error, firstName: "Required" });
    } else if (values.firstName.length > 6) {
      setError({
        ...error,
        firstName: "FirstName must be at least 6 characters long",
      });
    } else if (!values.lastName) {
      setError({ ...error, lastName: "Required" });
    } else if (values.lastName.length <= 2) {
      setError({
        ...error,
        firstName: "LastName must be longer than 2 characters ",
      });
    } else if (!values.email) {
      setError({ ...error, email: "Required" });
    } else if (!emailValidate) {
      setError({ ...error, email: "Invalid email address" });
    } else if (!values.send) {
      setError({ ...error, send: "You must check this field" });
    } else {
      setError(null);
    }
    return error;
  };

  const formik = useFormik({ initialValues, handleSumbit, validate });

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
        <h1>Formik Form</h1>
        <div className="formik-field">
          <TextField
            id="firstName"
            label="FirstName"
            variant="outlined"
            type="text"
            name="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
          ></TextField>
        </div>
        {formik.errors.firstName && (
          <p className="error">{formik.errors.firstName}</p>
        )}
        <div className="formik-field">
          <TextField
            id="lastName"
            label="LastName"
            variant="outlined"
            type="text"
            name="lastName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastName}
          ></TextField>
        </div>
        {formik.errors.lastName && (
          <p className="error">{formik.errors.lastName}</p>
        )}
        <div className="formik-field">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          ></TextField>
        </div>
        {formik.errors.email && <p className="error">{formik.errors.email}</p>}
        <div className="formik-field">
          <TextField
            id="text"
            label="Send some text"
            variant="outlined"
            name="text"
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.text}
          ></TextField>
        </div>
        <div className="formik-flex">
          <Select
            id="office"
            name="office"
            onChange={formik.handleChange}
            value={formik.values.office}
          >
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
                onChange={formik.handleChange}
                value={formik.values.gender}
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
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.send}
                />
              }
              label="Send"
            />
          </FormGroup>
        </div>
        {formik.errors.send && <p className="error">{formik.errors.send}</p>}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FirstForm;
