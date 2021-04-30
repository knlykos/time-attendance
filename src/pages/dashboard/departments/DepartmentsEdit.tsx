import { useEffect, useState, SyntheticEvent } from "react";

import axios, { AxiosResponse } from "axios";
import { Department } from "../../models/department";
import { useParams } from "react-router";
import { serverUrl } from "../../../config";
const DepartmentsEdit = () => {
  const { id } = useParams() as { id: string };
  const [department, setDepartment] = useState<Department>({
    code: 0,
    name: "",
    description: "",
    active: true,
  });

  const getDepartment = async (id: string) => {
    const department = await (
      await axios.get<any, AxiosResponse<Department>>(
        `http://192.168.0.72:3001/departments/find-one?id=${id}`
      )
    ).data;
    setDepartment(department);
  };

  // const setEmployeeData = (e: Employee) => {
  //   setEmployee(e);
  // };

  useEffect(() => {
    getDepartment(id);
  }, []);
  const onChangeCode = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = Number(e.currentTarget.value);

    setDepartment((prevState) => {
      const departmentRes = { ...prevState, code: val };
      return departmentRes;
    });
  };

  const onChangeName = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setDepartment((prevState) => {
      const departmentRes = { ...prevState, name: val };
      return departmentRes;
    });
  };

  const onChangeActive = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setDepartment((prevState) => {
      const departmentRes = { ...prevState, active: val };
      return departmentRes;
    });
  };

  const onChangeDescription = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setDepartment((prevState) => {
      const departmentRes = { ...prevState, description: val };
      return departmentRes;
    });
  };

  const sendNewDepartment = async (e: SyntheticEvent<HTMLButtonElement>) => {
    // e.preventDefault;
    e.preventDefault();
    const data = await axios.put(
      `${serverUrl}/departments/update`,
      department,
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
      <div>
        <input
          onChange={onChangeActive}
          id="customCheck1"
          type="checkbox"
          checked={department.active}
        ></input>
      </div>
      <div>
        <input
          value={department.code}
          onChange={onChangeCode}
          placeholder="code"
        />
      </div>
      <div>
        <input
          value={department.name}
          onChange={onChangeName}
          placeholder="name"
        />
      </div>
      <div>
        <input
          value={department.description}
          onChange={onChangeDescription}
          placeholder="description"
        />
      </div>

      <button onClick={sendNewDepartment}>SAVE</button>
    </>
  );
};

export default DepartmentsEdit;
