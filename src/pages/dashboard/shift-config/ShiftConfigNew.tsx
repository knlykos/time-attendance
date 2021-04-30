// @flow

import { useEffect, useState, SyntheticEvent } from "react";
import * as React from "react";
import ShiftPlanner from "../shift-planner/ShiftPlanner";
import { FixedShift } from "../../models/fixedShift";
import { Department } from "../../models/department";
import axios, { AxiosResponse } from "axios";
const ShiftConfigNew = () => {
  const token = localStorage.getItem("token");
  const [fixedShift, setFixedShift] = useState<FixedShift>({
    active: true,
    start: undefined,
    end: undefined,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentId, setDepartmentId] = useState<number>(0);

  const getDepartments = async () => {
    const responseData = await axios.get<any, AxiosResponse<Department[]>>(
      "http://192.168.0.72:3001/departments/find-all"
    );
    setDepartments(responseData.data);
    setDepartmentId(responseData.data[0].id as number);
  };

  useEffect(() => {
    getDepartments();
  }, []);
  const onChangeActive = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const fixedShiftRes = { ...prevState, active: val };
      return fixedShiftRes;
    });
  };

  const onChangeStart = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = Number(e.currentTarget.value);
    setFixedShift((prevState: FixedShift) => {
      const fixedShiftRes = { ...prevState, start: val };
      return fixedShiftRes;
    });
  };
  const onChangeEnd = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = Number(e.currentTarget.value);
    setFixedShift((prevState: FixedShift) => {
      const fixedShiftRes = { ...prevState, end: val };
      return fixedShiftRes;
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
      const fixedShiftRes = { ...prevState, tuesday: val };
      return fixedShiftRes;
    });
  };
  const onChangeWednesday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const fixedShiftRes = { ...prevState, wednesday: val };
      return fixedShiftRes;
    });
  };
  const onChangeThursday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const fixedShiftRes = { ...prevState, thursday: val };
      return fixedShiftRes;
    });
  };

  const onChangeFriday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const fixedShiftRes = { ...prevState, friday: val };
      return fixedShiftRes;
    });
  };
  const onChangeSaturday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const fixedShiftRes = { ...prevState, saturday: val };
      return fixedShiftRes;
    });
  };
  const onChangeSunday = (e: SyntheticEvent<HTMLInputElement>) => {
    const val = e.currentTarget.checked;
    setFixedShift((prevState: FixedShift) => {
      const fixedShiftRes = { ...prevState, sunday: val };
      return fixedShiftRes;
    });
  };

  const showDepartments = () => {
    return departments.map((v) => {
      return <option value={v.id}>{v.name}</option>;
    });
  };

  const sendNewConfig = () => {
    console.log(fixedShift);
  };

  const onChangeDepartmentId = (e: SyntheticEvent<HTMLSelectElement>) => {
    const value = Number(e.currentTarget.value);

    setDepartmentId(value);
  };

  const sendNewShiftFixed = async (e: SyntheticEvent<HTMLButtonElement>) => {
    // e.preventDefault;
    e.preventDefault();
    fixedShift.departments = departmentId;
    const data = await axios.post(
      "http://192.168.0.72:3001/shift-config/create",
      { data: fixedShift, departmentId: departmentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
      <button onClick={sendNewShiftFixed}>New</button>
    </>
  );
};

export default ShiftConfigNew;
