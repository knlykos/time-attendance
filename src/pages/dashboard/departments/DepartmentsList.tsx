// @flow

import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { Department } from "./../../models/department";
import Departments from "./Departments";
const DepartmentsList = () => {
  let { path, url } = useRouteMatch();
  const [departments, setDepartments] = useState<Department[]>([]);

  const getDepartments = async () => {
    const responseData = await axios.get<any, AxiosResponse<Department[]>>(
      "http://192.168.0.72:3001/departments/find-all"
    );
    setDepartments(responseData.data);
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const history = useHistory();
  const newDepartment = () => {
    history.push(`${url}/new`);
  };
  const tableElements = departments.map((v, i) => {
    return (
      <tr key={v.id}>
        <td>{v.active}</td>
        <td>{v.code}</td>
        <td>
          <div style={{ display: "flex" }}>
            <div>{v.name}</div>
            {/* <div>Edit</div> */}
          </div>
        </td>
        <td>
          <Link to={`/dashboard/departments/edit/${v.id}`}>Edit</Link>
        </td>
      </tr>
    );
  });
  return (
    <>
      <button onClick={newDepartment}>New</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
            </tr>
          </thead>
          <tbody>{tableElements}</tbody>
        </table>
      </div>
    </>
  );
};

export default DepartmentsList;
