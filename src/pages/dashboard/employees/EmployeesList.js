//@flow
import * as React from "react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
// import { Form, Table } from "react-bootstrap";
import type { User } from "./../../models/user";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { User16, Delete, Save, Download } from "@carbon/icons-react/lib";
import {
  Button,
  DataTable,
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
} from "carbon-components-react";

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

  const getEmployees = async () => {
    const emploeyees = await (
      await axios.get<any, AxiosResponse<Array<User>>>(
        "http://192.168.0.72:3001/user/employees"
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
    <DataTable rows={employees} headers={tableHeader}>
      {({
        rows,
        headers,
        getHeaderProps,
        getTableProps,
        getSelectionProps,
        getBatchActionProps,
        onInputChange,
        selectedRows,
      }) => (
        <TableContainer title="DataTable">
          <TableToolbar>
            <TableBatchActions {...getBatchActionProps()}>
              <TableBatchAction
                tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                renderIcon={Delete}
                onClick={() => console.log("clicked")}
              >
                Delete
              </TableBatchAction>
              <TableBatchAction
                tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                renderIcon={Save}
                onClick={() => console.log("clicked")}
              >
                Save
              </TableBatchAction>
              <TableBatchAction
                tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                renderIcon={Download}
                onClick={() => console.log("clicked")}
              >
                Download
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent>
              <TableToolbarSearch
                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                onChange={(e) => {
                  console.log(e);
                }}
              />
              <TableToolbarMenu
                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
              >
                <TableToolbarAction
                  primaryFocus
                  onClick={() => alert("Alert 1")}
                >
                  Action 1
                </TableToolbarAction>
                <TableToolbarAction onClick={() => alert("Alert 2")}>
                  Action 2
                </TableToolbarAction>
                <TableToolbarAction onClick={() => alert("Alert 3")}>
                  Action 3
                </TableToolbarAction>
              </TableToolbarMenu>
              <Button
                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                onClick={() => newEmployee()}
                size="small"
                kind="primary"
              >
                Add new
              </Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableSelectRow {...getSelectionProps({ row })} />
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
  return <>{table}</>;
}

export default EmployeeList;
