import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import { Routes } from '../../routes';
import { addSocketAction } from '../../store/actions/roomActions';
import appConfig from '../../config';

const AppRouter = () => {
  const [socketState, setSocketState] = useState(false);
  const dispatch = useDispatch();

  window.addEventListener(
    'visibilitychange',
    () => setSocketState(true),
    false
  );

  const { getWebSocket } = useWebSocket(`${appConfig.SOCKET_URL}`, {
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
