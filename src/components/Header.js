import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
const Header = () => {
  const [LoginBtn, setLoginBtn] = useState("Login");
  const { loggedInUser } = useContext(UserContext);

  console.log(useContext(UserContext));
  const onlineStatus = useOnlineStatus();
  return (
    <div className="flex justify-between bg-pink-100">
      <div className="w-12">
        <img className="w-56" src={require("/FoodAppLogo.jpeg")} alt="logo" />
      </div>
      <div className="flex justify-between items-center">
        <ul className="flex ">
          <li className="p-2">
            {" "}
            Online Status :{onlineStatus ? "online" : "offline"}
          </li>
          <li className="p-2">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2">
            <Link to="/about">About us</Link>
          </li>
          <li className="p-2">
            <Link to="/contact">Contact us</Link>
          </li>
          <li className="p-2">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="p-2">Cart</li>
          <button
            onClick={() => {
              LoginBtn === "Login"
                ? setLoginBtn("Logout")
                : setLoginBtn("Login");
            }}
            className="p-1 m-1 bg-pink-500 rounded-md"
          >
            {LoginBtn}
          </button>
          <li className="p-2 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
