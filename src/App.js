import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Menu } from "./components/menu/menu";
import UserSignup from "./components/signup/signup";
import Questionaire from "./components/questionaire/questionaire";
import "./App.css";
import { getQuestions } from "./initialize";

function App() {

  return (
    <div className="App">
      <Router>
        <div className="Dashboard-container">
          <header className="App-header">
            <div className="Main-menu">
              {/* <Menu /> */}
            </div>
          </header>
          <div>
            <Route path="/" exact={true} render={props => <UserSignup />} />

            <Route
              path="/ProviderApplication"
              exact={true}
              render={props => <Questionaire questions={getQuestions} />}
            />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
