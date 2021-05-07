import React from 'react';
import './App.css';
import {
    Switch,
    Route,
} from 'react-router-dom';
//import axios from 'axios';
import Home from './pages/Page1';
import Series from './pages/page2';
import Films from './pages/page3';
import Search from './pages/page4';
import Login from './pages/page5';
import MyList from "./pages/page6";
import TopMenu from "./components/TopMenu";

function App() {
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
          <Route path="/search">
              <Search />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/mylist">
              <MyList />
          </Route>
      </Switch>

          </>
  );
}

export default App;
