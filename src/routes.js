import StartPage from './pages/StartPage/StartPage';
import CreateRoomPage from './pages/CreateRoomPage.jsx/CreateRoomPage';
import LobbyPage from './pages/LobbyPage/LobbyPage';
import GamePage from './pages/GamePage/GamePage';
import {
  START_PAGE,
  CREATE_ROOM_PAGE,
  LOBBY_PAGE,
  GAME_PAGE,
} from './utils/constants';

export const Routes = [
  { path: START_PAGE, Component: StartPage },
  { path: CREATE_ROOM_PAGE, Component: CreateRoomPage },
  { path: LOBBY_PAGE, Component: LobbyPage },
  { path: GAME_PAGE, Component: GamePage },
];
