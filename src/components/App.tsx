import React from "react";
import "scss/app.scss";
import NumberDisplay from "./NumberDisplay";

const App: React.FC = () => {
  return <div className="app">
      <div className="header">
          <NumberDisplay value={0}/>
          <div className="face"><span>😀</span></div>
          <NumberDisplay value={23}/>
      </div>
      <div className="body">Body</div>
  </div>;
};

export default App;
