
import { useEffect, useState } from "react";
import * as React from "react";
import { FixedShift } from "../../models/fixedShift";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
const ShiftConfigList = () => {
  // const [fixedShift, setFixedShift] = useState<FixedShift[]>([]);
  const [fixedShift, setFixedShift] = useState<FixedShift[]>([]);

  const getFixedShift = async () => {
    const responseData = await axios.get<any, AxiosResponse<FixedShift[]>>(
      "http://192.168.0.72:3001/shift-config/find-all"
    );
    setFixedShift(responseData.data);
    console.log(fixedShift);
  };

  useEffect(() => {
    getFixedShift();
  }, []);

  const tableBody = () => {
    return fixedShift.map((v) => {
      return (
        <tr>
          <td>{v.start}</td>
          <td>{v.end}</td>
          <td>
            {v.monday ? "M" : ""} {v.tuesday ? "T" : ""}
            {v.wednesday ? "W" : ""} {v.thursday ? "T" : "false"}
            {v.friday ? "F" : ""}
            {v.saturday ? "S" : ""}
            {v.sunday ? "S" : ""}
          </td>
          <td><Link to={`/dashboard/shift-config/edit/${v.id}`}>Edit</Link></td>
        </tr>
      );
    });
  };
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <td>Start</td>
              <td>End</td>
              <td>Weekdays</td>
              <td></td>
            </tr>
          </thead>
          <tbody>{tableBody()}</tbody>
        </table>
      </div>
    </>
  );
};

export default ShiftConfigList;
