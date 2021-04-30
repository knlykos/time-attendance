// @flow

import axios, { AxiosResponse } from "axios";
import { useEffect, useState, SyntheticEvent } from "react";
import { useParams } from "react-router";
import { Department } from "../../models/department";
import { FixedShift } from "../../models/fixedShift";

const ShiftConfigEdit = () => {
  const [fixedShift, setFixedShift] = useState<FixedShift>({});
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentId, setDepartmentId] = useState<string>("");

  const { id } = useParams() as { id: string };

  const getFixedShift = async () => {
    const responseData = await axios.get<any, AxiosResponse<FixedShift>>(
      `http://192.168.0.72:3001/shift-config/find-one?id=${id}`
    );
    setFixedShift(responseData.data);
    const departmentChild = responseData.data.department as Department;
    setDepartmentId(departmentChild.id as string);

    return responseData;
  };

  const getDepartments = async () => {
    const responseData = await axios.get<any, AxiosResponse<Department[]>>(
      "http://192.168.0.72:3001/departments/find-all"
    );
    setDepartments(responseData.data);
  };

  useEffect(() => {
    getFixedShift();
    getDepartments();
  }, []);
  const onChangeActive = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const departmentRes = { ...prevState, active: val };
      return departmentRes;
    });
  };

  const onChangeStart = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = Number(e.currentTarget.value);
    setFixedShift((prevState: FixedShift) => {
      const departmentRes = { ...prevState, start: val };
      return departmentRes;
    });
  };
  const onChangeEnd = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = Number(e.currentTarget.value);
    setFixedShift((prevState: FixedShift) => {
      const departmentRes = { ...prevState, end: val };
      return departmentRes;
    });
  };

  const onChangeMonday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const fixedShiftRes = { ...prevState, monday: val };
      return fixedShiftRes;
    });
  };

  const onChangeTuesday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const departmentRes = { ...prevState, tuesday: val };
      return departmentRes;
    });
  };
  const onChangeWednesday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const departmentRes = { ...prevState, wednesday: val };
      return departmentRes;
    });
  };
  const onChangeThursday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const departmentRes = { ...prevState, thursday: val };
      return departmentRes;
    });
  };

  const onChangeFriday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const departmentRes = { ...prevState, friday: val };
      return departmentRes;
    });
  };
  const onChangeSaturday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const departmentRes = { ...prevState, saturday: val };
      return departmentRes;
    });
  };
  const onChangeSunday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const departmentRes = { ...prevState, sunday: val };
      return departmentRes;
    });
  };

  const showDepartments = () => {
    return departments.map((v) => {
      return <option value={v.id}>{v.name}</option>;
    });
  };

  const onChangeDepartmentId = (e: SyntheticEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    setDepartmentId(value);
  };

  const sendEditShiftFixed = async (e: SyntheticEvent<HTMLButtonElement>) => {
    // e.preventDefault;
    e.preventDefault();
    fixedShift.department = departmentId;
    const data = await axios.put(
      "http://192.168.0.72:3001/shift-config/update",
      fixedShift,
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
      <select value={departmentId} onChange={onChangeDepartmentId}>
        {showDepartments()}
      </select>
      {departmentId}
      <div>
        <input
          onChange={onChangeActive}
          id="customCheck1"
          type="checkbox"
          checked={fixedShift.active}
        ></input>
      </div>
      <div>
        <input
          onChange={onChangeStart}
          placeholder="start"
          type="number"
          value={fixedShift.start}
        ></input>
      </div>
      <div>
        <input
          onChange={onChangeEnd}
          placeholder="end"
          value={fixedShift.end}
        ></input>
      </div>
      <div>
        <div>
          <input
            id="monday"
            onChange={onChangeMonday}
            type="checkbox"
            checked={fixedShift.monday}
          ></input>
          <label>Monday</label>
        </div>
        <div>
          <input
            onChange={onChangeTuesday}
            id="tuesday"
            type="checkbox"
            checked={fixedShift.tuesday}
          ></input>
          <label>Tuesday</label>
        </div>
        <div>
          <input
            onChange={onChangeWednesday}
            id="wednesday"
            type="checkbox"
            checked={fixedShift.wednesday}
          ></input>
          <label>Wednesday</label>
        </div>
        <div>
          <input
            onChange={onChangeThursday}
            id="thursday"
            type="checkbox"
            checked={fixedShift.thursday}
          ></input>
          <label>Thursday</label>
        </div>
        <div>
          <input
            onChange={onChangeFriday}
            id="Friday"
            type="checkbox"
            checked={fixedShift.friday}
          ></input>
          <label>Friday</label>
        </div>
        <div>
          <input
            onChange={onChangeSaturday}
            id="saturday"
            type="checkbox"
            checked={fixedShift.saturday}
          ></input>
          <label>Saturday</label>
        </div>
        <div>
          <input
            onChange={onChangeSunday}
            id="sunday"
            type="checkbox"
            checked={fixedShift.sunday}
          ></input>
          <label>Sunday</label>
        </div>
      </div>
      <button onClick={sendEditShiftFixed}>Edit</button>
    </>
  );
};

export default ShiftConfigEdit;
