import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppRouter from './components/AppRouter/AppRouter';
import { store } from './store';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
