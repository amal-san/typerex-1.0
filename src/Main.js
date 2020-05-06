import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter,
  Switch
} from "react-router-dom";
import Header from './Components/Header';
import {Start} from './Pages/Start';
import {Home} from './Pages/Home';
import { ProtectedRoute } from './Components/ProtectedRoute'


 
function Main() {
  return (
      <BrowserRouter>
      <Switch>
        <>
          <Header/>
            <section>
              <Route exact path="/" component={Home}/>
              <ProtectedRoute exact path="/start" component={Start}/>
            </section>
        </>
      </Switch>
      </BrowserRouter>

  )
}

 
export default Main;