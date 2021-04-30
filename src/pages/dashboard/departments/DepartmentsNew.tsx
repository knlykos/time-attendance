import { useEffect, useState, SyntheticEvent } from "react";
import axios from "axios";
import { serverUrl } from "../../../config";

const DepartmentsNew = () => {
  const token = localStorage.getItem("token");
  const [department, setDepartment] = useState({
    code: "",
    name: "",
    description: "",
    active: true,
  });
  const onChangeCode = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;

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
    const data = await axios.post(
      `${serverUrl}/departments/create`,
      department,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
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

export default DepartmentsNew;
