import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "routes/Home";
import Play from "routes/Play";

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/play">
        <Play />
      </Route>
    </Router>
  );
};

export default App;
