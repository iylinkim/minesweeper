import { useHistory } from "react-router";
import "scss/home.scss";

const Home: React.FC = () => {
  const history = useHistory();

  const onClick = () => history.push("/play");

  return (
    <div className="home">
      <h1>Start game</h1>
      <button onClick={onClick} className="startBtn">
        Start
      </button>
    </div>
  );
};

export default Home;
