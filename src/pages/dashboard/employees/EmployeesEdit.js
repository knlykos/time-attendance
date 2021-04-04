//@flow
import axios, { AxiosResponse } from "axios";
import * as React from "react";
import { useEffect, useState } from "react";

// import type { User } from "./../../models/user";
import type { Employee } from "./../../models/employee";

import { useHistory, useParams } from "react-router";

// message: { newBtn: () => void; hola: string }

const EmployeeEdit = (): React.Node => {
  const history = useHistory();
  const { id } = useParams();
  console.log(id);

  const getEmployee = async (id: string) => {
    const emploeyee = await (
      await axios.get<any, AxiosResponse<Array<Employee>>>(
        `http://192.168.0.72:3001/employees/find-one?id=${id}`
      )
    ).data;
    setEmployeeData(emploeyee);
  };
  const setEmployeeData = (e: Employee) => {
    setEmployee(e);
  };
  const onChangeFirstName = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, firstName: val };
      return employeeRes;
    });
  };
  useEffect(() => {
    getEmployee(id);
  }, []);
  const token = localStorage.getItem("token");
  const [employee, setEmployee] = useState<Employee>({});

  const onChangeLName = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, lastName: val };
      return employeeRes;
    });
  };

  const onChangeDateBirth = (e: string) => {
    const val = e[0];
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, dateBirth: new Date(val) };
      return employeeRes;
    });
  };

  const onChangeEmail = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, email: val };
      return employeeRes;
    });
  };
  const onChangePNumber = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, phone: val };
      return employeeRes;
    });
  };

  const onChangeAltNumber = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, secondPhone: val };
      return employeeRes;
    });
  };

  const onChangeBTitle = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, businessTitle: val };
      return employeeRes;
    });
  };

  const onChangeTimeType = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, timeType: Number(val) };
      return employeeRes;
    });
  };

  const onChangeStreet = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, street: val };
      return employeeRes;
    });
  };

  const onChangeApart = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, apartment: val };
      return employeeRes;
    });
  };

  const onChangeCity = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, city: val };
      return employeeRes;
    });
  };

  const onChangeZip = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, zipCode: val };
      return employeeRes;
    });
  };

  const onChangeState = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, state: val };
      return employeeRes;
    });
  };

  const onChangeHireDate = (e) => {
    const val = e[0];
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, hireDate: new Date(val) };
      return employeeRes;
    });
  };

  const sendEditedEmployee = async (
    e: SyntheticEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const data = await axios.put(
        "http://192.168.0.72:3001/employees/edit",
        employee,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJOS09ERVgiLCJzdWJqZWN0IjoibmVmaS5sb3BleiIsImlkIjoiM2RiZDQ2MjctYjQzNy00ODExLThlZDQtZThiZDNkNjg5ZmZlIiwiZmlyc3ROYW1lIjpudWxsLCJsYXN0TmFtZSI6bnVsbCwicm9sZSI6MywiaWF0IjoxNjE2MTY4NDQ1fQ.zcy7Jjy_Ech719w2WqwkRRAdasMNb10g_wJR1vNHBxw",
          },
        }
      );
      history.push("/dashboard/employees");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="First Name"
            placeholder="First Name"
            onChange={($e) => onChangeFirstName($e)}
            value={employee.firstName}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="Last Name"
            placeholder="Last Name"
            onChange={($e) => onChangeLName($e)}
            value={employee.lastName}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="date"
            dateFormat="m/d/Y"
            datePickerType="single"
            onChange={onChangeDateBirth}
            value={employee.dateBirth}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="Email"
            placeholder="Email"
            onChange={onChangeEmail}
            value={employee.email}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="Phone Number"
            placeholder="Phone Number"
            onChange={onChangePNumber}
            value={employee.phone}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            onChange={onChangeAltNumber}
            labelText="Alternative Number"
            placeholder="Alternative Number"
            value={employee.secondPhone}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            onChange={onChangeBTitle}
            labelText="Business Title"
            placeholder="Business Title"
            value={employee.businessTitle}
          ></input>
        </div>
        {employee.timeType}
        <div style={{ marginBottom: "2rem" }}>
          <select
            defaultValue="0"
            helperText="Time Type"
            value={employee.timeType}
            onChange={onChangeTimeType}
          >
            {/* <SelectItem text="Choose an option"></SelectItem> */}
            <option text="Full-Time" value="1">
              Full-Time
            </option>
            <option text="Part-Time" value="0">
              Part-Time
            </option>
          </select>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="Street"
            placeholder="Street"
            onChange={onChangeStreet}
            value={employee.street}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            onChange={onChangeApart}
            labelText="Apartment"
            placeholder="Apartment"
            value={employee.apartment}
          ></input>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="City"
            placeholder="City"
            onChange={onChangeCity}
            value={employee.city}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="Zip"
            placeholder="Zip"
            onChange={onChangeZip}
            value={employee.zipCode}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            labelText="State"
            placeholder="State"
            onChange={onChangeState}
            value={employee.state}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            dateFormat="m/d/Y"
            datePickerType="single"
            onChange={onChangeHireDate}
            value={employee.hireDate}
          ></input>
        </div>
        <button onClick={sendEditedEmployee}>SAVE</button>
      </form>
    </>
  );
};

export default EmployeeEdit;
