// @flow
import * as React from "react";
import { useHistory, useRouteMatch, Switch, Route } from "react-router-dom";
import EmployeeEdit from "./EmployeesEdit";
import EmployeeList from "./EmployeesList";
import EmployeeNew from "./EmployeesNew";
// import { DashboardTopBtn } from "../Dashboard";
// import EmployeeList from "./EmployeeList";
// import EmployeeNew from "./EmployeeNew";
// import EmployeeEdit from "./EmployeeEdit";
// message: { newBtn: () => void; hola }
const Employees = () => {
  
  let { path, url } = useRouteMatch();
  const history = useHistory();
  //   const newBtn: DashboardTopBtn = {
  //     action: "newEmployee",
  //     description: "Create new Employee",
  //     name: "New",
  //   };

  const newEmployee = () => {
    history.push(`${url}/new`);
    // to={`${url}/employees`}
  };

  return (
    <>
      {/* CREAR UN COMPONENTE */}

            <Switch>
              <Route exact path={`${url}`}>
                <EmployeeList />
              </Route>
              <Route path={`${url}/new`}>
                <EmployeeNew />
                {/* HOLA */}
              </Route>
              <Route path={`${url}/edit/:id`}>{ <EmployeeEdit /> }</Route>
            </Switch>

    </>
  );
};

export default Employees;
