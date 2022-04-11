import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import { Routes } from '../../routes';
import { addSocketAction } from '../../store/actions/roomActions';

// --------------------------------------------------------

const AppRouter = () => {
  const didUnmount = useRef(false);
  const { getWebSocket, readyState } = useWebSocket(
    'wss://lit-dawn-13539.herokuapp.com',
    {
      shouldReconnect: () => {
        return didUnmount.current === false;
      },
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    }
  );
  const dispatch = useDispatch();
  const s = getWebSocket();

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    dispatch(addSocketAction(s));
  }, [s]);

  console.log(s);

  return (
    <Switch>
      {Routes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
    </Switch>
  );
};

export default AppRouter;
