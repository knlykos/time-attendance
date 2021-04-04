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
// message: { newBtn: () => void; hola: string }
const Employees = (): React.Node => {
  
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
      <div className="bx--grid">
        <div className="bx--row">
          <section className="bx--offset-lg-3 bx--col-lg-13">
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
          </section>
        </div>
      </div>
    </>
  );
};

export default Employees;
