// @flow
import * as React from "react";
import { useHistory, useRouteMatch, Switch, Route } from "react-router-dom";


const Employees = (): React.Node => {
  let { path, url } = useRouteMatch();
  const history = useHistory();

  const newEmployee = () => {
    history.push(`${url}/new`);

  };

  return (
    <>
      {/* <Switch>
        <Route exact path={`${url}`}>
          <EmployeeList />
        </Route>
        <Route path={`${url}/new`}>
          <EmployeeNew />

        </Route>
        <Route path={`${url}/edit/:id`}>{<EmployeeEdit />}</Route>
      </Switch> */}
    </>
  );
};

export default Employees;
