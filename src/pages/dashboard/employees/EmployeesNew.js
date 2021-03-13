//@flow
import axios from "axios";
import * as React from "react";
import type { User } from "./../../models/user";
import { useState } from "react";
import { Form, TextInput } from "carbon-components-react";

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

  const onChangeHireDate = (e: SyntheticEvent<HTMLInputElement>) => {
    setHireDate(e.currentTarget.value);
  };

  const sendNewEmployee = async (
    e: SyntheticEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const user: User = {
      username: "",
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
    const data = await axios.post(
      "http://localhost:3001/user/new-employee",
      user
    );
  };
  return <>
  <Form>
  <div style={{marginBottom: '2rem'}}>
      <TextInput labelText="First Name" placeholder="First Name"></TextInput>
  </div>
  </Form>
  </>;
};

export default EmployeeNew;
