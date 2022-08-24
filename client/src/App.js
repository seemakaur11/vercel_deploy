import './App.css';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { useEffect } from 'react';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
