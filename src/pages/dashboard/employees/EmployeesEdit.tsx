//@flow
import axios, { AxiosResponse } from "axios";
import * as React from "react";
import {
  useEffect,
  useState,
  SyntheticEvent,
  SelectHTMLAttributes,
} from "react";

// import type { User } from "./../../models/user";

import { useHistory, useParams } from "react-router";
import { serverUrl } from "../../../config";
import { Employee } from "../../models/employee";

// message: { newBtn: () => void; hola: string }

const EmployeeEdit = () => {
  const history = useHistory();
  const { id } = useParams() as { id: string };
  console.log(id);

  const getEmployee = async (id: string) => {
    const emploeyee = await (
      await axios.get<any, AxiosResponse<Employee>>(
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
      const employeeRes: Employee = { ...prevState, firstname: val };
      return employeeRes;
    });
  };
  useEffect(() => {
    getEmployee(id);
  }, []);
  const token = localStorage.getItem("token");
  const [employee, setEmployee] = useState<Employee>({
    email: "",
    password: "",
    username: "",
    active: true,
  });

  const onChangeLName = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, lastname: val };
      return employeeRes;
    });
  };

  const onChangeDateBirth = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
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

  const onChangeBTitle = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setEmployee((prevState: Employee) => {
      const employeeRes: Employee = { ...prevState, businessTitle: val };
      return employeeRes;
    });
  };

  const onChangeTimeType = (e: SyntheticEvent<HTMLSelectElement>) => {
    const val = e.currentTarget.value;
    console.log(val);
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

  const onChangeHireDate = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
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
        `${serverUrl}/employees/edit`,
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
            placeholder="First Name"
            onChange={($e) => onChangeFirstName($e)}
            value={employee.firstname as string}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            placeholder="Last Name"
            onChange={($e) => onChangeLName($e)}
            value={employee.lastname as string}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="date"
            onChange={onChangeDateBirth}
            value={employee.dateBirth?.toString()}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            placeholder="Email"
            onChange={onChangeEmail}
            value={employee.email}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            placeholder="Phone Number"
            onChange={onChangePNumber}
            value={employee.phone as string}
          ></input>
        </div>
        {/* <div style={{ marginBottom: "2rem" }}>
          <input
            onChange={onChangeAltNumber }
            placeholder="Alternative Number"
            value={employee.secondPhone}
          ></input>
        </div> */}
        <div style={{ marginBottom: "2rem" }}>
          <input
            onChange={onChangeBTitle}
            placeholder="Business Title"
            value={employee.businessTitle as string}
          ></input>
        </div>
        {employee.timeType}
        <div style={{ marginBottom: "2rem" }}>
          <select
            defaultValue="0"
            value={employee.timeType as number}
            onChange={onChangeTimeType}
          >
            {/* <SelectItem text="Choose an option"></SelectItem> */}
            <option value="1">Full-Time</option>
            <option value="0">Part-Time</option>
          </select>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            placeholder="Street"
            onChange={onChangeStreet}
            value={employee.street as string}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            onChange={onChangeApart}
            placeholder="Apartment"
            value={employee.apartment as string}
          ></input>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <input
            placeholder="City"
            onChange={onChangeCity}
            value={employee.city as string}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            placeholder="Zip"
            onChange={onChangeZip}
            value={employee.zipCode as string}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            placeholder="State"
            onChange={onChangeState}
            value={employee.state as string}
          ></input>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <input
            type="date"
            onChange={onChangeHireDate}
            value={employee.hireDate?.toString()}
          ></input>
        </div>
        <button onClick={sendEditedEmployee}>SAVE</button>
      </form>
    </>
  );
};

export default EmployeeEdit;
