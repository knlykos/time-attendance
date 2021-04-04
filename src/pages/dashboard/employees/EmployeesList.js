//@flow
import * as React from "react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
// import { Form, Table } from "react-bootstrap";
import type { User } from "./../../models/user";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

// import { DashboardTopBtn } from "../Dashboard";
// message: { newBtn: () => void; hola: string }

const header = [
  {
    key: "username",
    header: "Username",
  },
  {
    key: "firstName",
    header: "First Name",
  },
  {
    key: "lastName",
    header: "Last Name",
  },
  {
    key: "businessTitle",
    header: "Business Title",
  },
  {
    key: "email",
    header: "Email",
  },

  {
    key: "hireDate",
    header: "Hire Date",
  },
  {
    key: "timeType",
    header: "Time Type",
  },
  {
    key: "phone",
    header: "Phone",
  },
];

function EmployeeList(props: any): React.Node {
  const [employees, setEmployees] = useState([]);
  const [tableHeader, setTableHeader] = useState(header);
  const history = useHistory();
  let { path, url } = useRouteMatch();
  //   const newBtn: DashboardTopBtn = {
  //     action: "newEmployee",
  //     description: "Create new Employee",
  //     name: "New",
  //   };
  function editEmployee(id: string) {
    console.log(id);
    // <Link to={`/dashboard/employees/edit/${v.id}`}>Edit</Link>
    history.push(`/dashboard/employees/edit/${id}`);
  }
  const totalSelected = async (n: number) => {
    console.log(n);
  };
  const getEmployees = async () => {
    const emploeyees = await (
      await axios.get<any, AxiosResponse<Array<User>>>(
        "http://192.168.0.72:3001/employees/find-all"
      )
    ).data;
    setEmployees(emploeyees);
  };

  const newEmployee = () => {
    history.push(`/dashboard/employees/new`);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const tableElements = employees.map((v, i) => {
    return (
      <tr>
        <td>{v.firstName}</td>
        <td>{v.lastName}</td>
        <td>
          <div style={{ display: "flex" }}>
            <div>{v.username}</div>
            {/* <div>Edit</div> */}
          </div>
        </td>
        <td>
          <Link to={`/dashboard/employees/edit/${v.id}`}>Edit</Link>
        </td>
      </tr>
    );
  });
  const table = (
    <>
      <button onClick={newEmployee}>New</button>
      <table>
        <tr>
          {tableHeader.map((v) => (
            <th>{v.header}</th>
          ))}
        </tr>
        {tableElements}
      </table>
    </>
  );
  return <>{table}</>;
}

export default EmployeeList;
