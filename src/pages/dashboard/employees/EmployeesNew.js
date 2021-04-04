//@flow
import axios from "axios";
import * as React from "react";
import type { User } from "./../../models/user";
import { useState } from "react";

// message: { newBtn: () => void; hola: string }
const EmployeeNew = (): React.Node => {
  const newBtn: any = {
    action: "newEmployee",
    description: "Create new Employee",
    name: "New",
  };
  const token = localStorage.getItem("token");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateBirth, setDateBirth] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [altPhone, setAltPhone] = useState<string>("");
  const [businessTitle, setbusinessTitle] = useState<string>("");
  const [timeType, setTimeType] = useState<string>("1");
  const [street, setStreet] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [hireDate, setHireDate] = useState<string>("");
  const onChangeFName = (e: SyntheticEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  };
  const onChangeLName = (e: SyntheticEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  };

  const onChangeDateBirth = (e: string) => {
    setDateBirth(e[0]);
  };

  const onChangeEmail = (e: SyntheticEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onChangePNumber = (e: SyntheticEvent<HTMLInputElement>) => {
    setPhoneNumber(e.currentTarget.value);
  };

  const onChangeAltNumber = (e: SyntheticEvent<HTMLInputElement>) => {
    setAltPhone(e.currentTarget.value);
  };

  const onChangeBTitle = (e: SyntheticEvent<HTMLInputElement>) => {
    setbusinessTitle(e.currentTarget.value);
  };

  const onChangeTimeType = (e: SyntheticEvent<HTMLInputElement>) => {
    setTimeType(e.currentTarget.value);
  };

  const onChangeStreet = (e: SyntheticEvent<HTMLInputElement>) => {
    setStreet(e.currentTarget.value);
  };

  const onChangeApart = (e: SyntheticEvent<HTMLInputElement>) => {
    setApartment(e.currentTarget.value);
  };

  const onChangeCity = (e: SyntheticEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const onChangeZip = (e: SyntheticEvent<HTMLInputElement>) => {
    setZip(e.currentTarget.value);
  };

  const onChangeState = (e: SyntheticEvent<HTMLInputElement>) => {
    setState(e.currentTarget.value);
  };

  const onChangeHireDate = (e) => {
    setHireDate(e[0]);
  };

  const sendNewEmployee = async (
    e: SyntheticEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const user: User = {
      firstName: firstName,
      lastName: lastName,
      dateBirth: dateBirth,
      email: email,
      phone: phoneNumber,
      secondPhone: altPhone,
      businessTitle: businessTitle,
      timeType: Number(timeType),
      street: street,
      apartment: apartment,
      city: city,
      state: state,
      zipCode: Number(zip),
      hireDate: new Date(hireDate),
    };
    console.log(user);
    const data = await axios.post(
      "http://192.168.0.72:3001/employees/create",
      user,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJOS09ERVgiLCJzdWJqZWN0IjoibmVmaS5sb3BleiIsImlkIjoiM2RiZDQ2MjctYjQzNy00ODExLThlZDQtZThiZDNkNjg5ZmZlIiwiZmlyc3ROYW1lIjpudWxsLCJsYXN0TmFtZSI6bnVsbCwicm9sZSI6MywiaWF0IjoxNjE2MTY4NDQ1fQ.zcy7Jjy_Ech719w2WqwkRRAdasMNb10g_wJR1vNHBxw",
        },
      }
    );
  };
  return (
    <>
      <form>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="First Name"
            placeholder="First Name"
            onChange={($e) => onChangeFName($e)}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="Last Name"
            placeholder="Last Name"
            onChange={($e) => onChangeLName($e)}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="date"
            dateFormat="m/d/Y"
            datePickerType="single"
            onChange={onChangeDateBirth}
            value={dateBirth}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="Email"
            placeholder="Email"
            onChange={onChangeEmail}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="Phone Number"
            placeholder="Phone Number"
            onChange={onChangePNumber}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            onChange={onChangeAltNumber}
            labelText="Alternative Number"
            placeholder="Alternative Number"
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            onChange={onChangeBTitle}
            labelText="Business Title"
            placeholder="Business Title"
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <select defaultValue="0" helperText="Time Type">
            <option text="Choose an option">Choose an option</option>
            <option text="Part-Time" value="0">
              Part-time
            </option>
            <option text="Full-Time" value="1">
              Full-Time
            </option>
          </select>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="Street"
            placeholder="Street"
            onChange={onChangeStreet}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            onChange={onChangeApart}
            labelText="Apartment"
            placeholder="Apartment"
          ></input>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="City"
            placeholder="City"
            onChange={onChangeCity}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="Zip"
            placeholder="Zip"
            onChange={onChangeZip}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="State"
            placeholder="State"
            onChange={onChangeState}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="date"
            onChange={onChangeHireDate}
            value={hireDate}
          ></input>
        </div>
        <button onClick={sendNewEmployee}>SAVE</button>
      </form>
    </>
  );
};

export default EmployeeNew;
