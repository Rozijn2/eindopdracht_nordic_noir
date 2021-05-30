import React, { useContext } from 'react';
import './App.css';
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Series from './pages/Serie';
import Films from './pages/Films';
import Search from './pages/Search';
import Login from './pages/Login';
import MyList from './pages/MyList';
import TopMenu from './components/TopMenu';
import OurChoice from './pages/OurChoice';
import {AuthContext} from './context/AuthContext';

function PrivateRoute ({children, user}) {
    console.log(user);
  return (
   <Route>
      {user !== null ? children : <Redirect to ="/login"/>}
   </Route>
  );
}

function App() {
    const { user } = useContext(AuthContext);
  return (
      <>
          <TopMenu />
      <Switch>
          <Route exact path="/home">
              <Home />
                 </Route>
          <Route exact path="/series">
              <Series />
          </Route>
          <Route path="/films">
              <Films />
          </Route>
          <Route path="/ourchoice">
              <OurChoice />
          </Route>
          <Route path="/search">
              <Search />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <PrivateRoute path="/mylist" user={user}>
              <MyList />
          </PrivateRoute>
      </Switch>
      </>
  );
}

export default App;
