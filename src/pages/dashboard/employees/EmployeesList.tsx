import * as React from "react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
// import { Form, Table } from "react-bootstrap";
import type { User } from "../../models/user";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Employee } from "../../models/employee";
import { serverUrl } from "../../../config";

// import { DashboardTopBtn } from "../Dashboard";
// message: { newBtn: () => void; hola }

const header = [
  {
    key: "username",
    header: "Username",
  },
  {
    key: "firstname",
    header: "First Name",
  },
  {
    key: "lastname",
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

function EmployeeList(props: any) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tableHeader, setTableHeader] = useState(header);
  const history = useHistory();
  let { path, url } = useRouteMatch();
  //   const newBtn: DashboardTopBtn = {
  //     action: "newEmployee",
  //     description: "Create new Employee",
  //     name: "New",
  //   };
  function editEmployee(id: number) {
    console.log(id);
    // <Link to={`/dashboard/employees/edit/${v.id}`}>Edit</Link>
    history.push(`/dashboard/employees/edit/${id}`);
  }
  const totalSelected = async (n: number) => {
    console.log(n);
  };
  const getEmployees = async () => {
    const emploeyees = await (
      await axios.get<any, AxiosResponse<Employee[]>>(
        `${serverUrl}/employees/find-all`
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
        <td>{v.firstname}</td>
        <td>{v.lastname}</td>
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
