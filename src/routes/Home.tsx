import { useHistory } from "react-router";
// import { getLevel, LEVEL_NUM, MAX_COLS } from "../constants";

const Home: React.FC = () => {
  const history = useHistory();
  //   const handleLevel = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
  //     const targetLevel = e.currentTarget.innerText;

  //     localStorage.setItem(LEVEL_NUM, getLevel(targetLevel).toString());
  //     history.push({
  //         pathname:"/play",
  //         // state:getLevel(targetLevel)
  //     })
  //   };

  const onClick = () => history.push("/play");

  return (
    <>
      <h1>Start game</h1>
      <button onClick={onClick}>Start</button>
      {/* <ul>
        <li onClick={handleLevel}>Beginner</li>
        <li onClick={handleLevel}>Intermediate</li>
        <li onClick={handleLevel}>Expert</li>
      </ul> */}
    </>
  );
};

export default Home;
