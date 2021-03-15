//@flow
import axios from "axios";
import * as React from "react";
import type { User } from "./../../models/user";
import { useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerInput,
  Form,
  Select,
  SelectItem,
  TextInput,
} from "carbon-components-react";
import { Row } from "carbon-components-react/lib/components/Grid";
import Grid from "carbon-components-react/lib/components/Grid/Grid";
import Column from "carbon-components-react/lib/components/Grid/Column";

// message: { newBtn: () => void; hola: string }
const EmployeeNew = (): React.Node => {
  const newBtn: any = {
    action: "newEmployee",
    description: "Create new Employee",
    name: "New",
  };
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
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
      "http://localhost:3001/user/new-employee",
      user
    );
  };
  return (
    <>
      <Column>
        <Form>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              labelText="First Name"
              placeholder="First Name"
              onChange={($e) => onChangeFName($e)}
            ></TextInput>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              labelText="Last Name"
              placeholder="Last Name"
              onChange={($e) => onChangeLName($e)}
            ></TextInput>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              labelText="Email"
              placeholder="Email"
              onChange={onChangeEmail}
            ></TextInput>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              labelText="Phone Number"
              placeholder="Phone Number"
              onChange={onChangePNumber}
            ></TextInput>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              onChange={onChangeAltNumber}
              labelText="Alternative Number"
              placeholder="Alternative Number"
            ></TextInput>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              onChange={onChangeBTitle}
              labelText="Business Title"
              placeholder="Business Title"
            ></TextInput>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <Select defaultValue="0" helperText="Time Type">
              <SelectItem text="Choose an option"></SelectItem>
              <SelectItem text="Part-Time" value="0"></SelectItem>
              <SelectItem text="Full-Time" value="1"></SelectItem>
            </Select>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              labelText="Street"
              placeholder="Street"
              onChange={onChangeStreet}
            ></TextInput>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              onChange={onChangeApart}
              labelText="Apartment"
              placeholder="Apartment"
            ></TextInput>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              labelText="City"
              placeholder="City"
              onChange={onChangeCity}
            ></TextInput>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              labelText="Zip"
              placeholder="Zip"
              onChange={onChangeZip}
            ></TextInput>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              labelText="State"
              placeholder="State"
              onChange={onChangeState}
            ></TextInput>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <DatePicker
              dateFormat="m/d/Y"
              datePickerType="single"
              onChange={onChangeHireDate}
            >
              <DatePickerInput
                id="date-picker-calendar-id"
                placeholder="mm/dd/yyyy"
                labelText="Date picker label"
                type="text"
              />
            </DatePicker>
          </div>
          <Button onClick={sendNewEmployee}>SAVE</Button>
        </Form>
      </Column>
    </>
  );
};

export default EmployeeNew;
