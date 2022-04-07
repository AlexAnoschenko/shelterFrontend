import { Switch, Route } from 'react-router-dom';

import { Routes } from '../../routes';

const AppRouter = () => {
  return (
    <Switch>
      {Routes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
    </Switch>
  );
};

export default AppRouter;
