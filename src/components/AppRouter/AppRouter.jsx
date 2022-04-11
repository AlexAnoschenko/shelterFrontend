import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import { Routes } from '../../routes';
import { addSocketAction } from '../../store/actions/roomActions';

const AppRouter = () => {
  const [socketState, setSocketState] = useState(false);
  const dispatch = useDispatch();

  window.addEventListener(
    'visibilitychange',
    () => setSocketState(true),
    false
  );

  const { getWebSocket } = useWebSocket('wss://lit-dawn-13539.herokuapp.com', {
    shouldReconnect: () => socketState || true,
    reconnectAttempts: 10,
    reconnectInterval: 1000,
  });

  const socket = getWebSocket();

  useEffect(() => {
    dispatch(addSocketAction(socket));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Switch>
      {Routes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
    </Switch>
  );
};

export default AppRouter;
