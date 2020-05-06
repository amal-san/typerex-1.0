import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Header from './Components/Header';
import Start from './Pages/Start';
import Home from './Pages/Home';
 
function Main() {
  return (
      <BrowserRouter>
        <div>
          <Header/>
          <ul className="header">
            <li><NavLink to="/start">Start</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/start/" component={Start}/>
          </div>
        </div>
        </BrowserRouter>

  )
}

 
export default Main;