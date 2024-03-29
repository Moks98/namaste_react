import { useEffect, useState, useContext } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
const Body = () => {
  const [listofRestaurants, SetListofRestaurants] = useState([]);
  const [searchText, SetSearchText] = useState("");
  const [searchedList, SetSearchList] = useState([]);
  const onlineStatus = useOnlineStatus();

  const PromotedRestuarant = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    fetchRestuarantData();
  }, []);
  const fetchRestuarantData = async () => {
    let data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9753386&lng=77.5877318&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    let apiResponse = await data.json();

    SetListofRestaurants(
      apiResponse?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );

    SetSearchList(
      apiResponse?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  if (!onlineStatus) {
    return <div>Looks like you are offline !!</div>;
  }

  const { loggedInUser, setUserName } = useContext(UserContext);
  console.log(useContext(UserContext));
  return listofRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      {/* <div className="search">Search</div> */}
      <div className="search-container">
        <input
          className="border border-gray-300 hover:border-gray-500 m-2"
          type="text"
          placeholder="Search...."
          value={searchText}
          onChange={(e) => {
            SetSearchText(e.target.value);
          }}
        ></input>
        <button
          className="bg-green-500 m-1 p-1"
          onClick={() => {
            const searchedRestuarants = listofRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            SetSearchList(searchedRestuarants);
          }}
        >
          Search
        </button>
      </div>
      <div className="flex p-2">
        <button
          className="bg-purple-400 m-1 p-1 rounded-sm"
          onClick={() => {
            const filteredRestuarantList = listofRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            SetListofRestaurants(filteredRestuarantList);
          }}
        >
          Top Rated Restuarants
        </button>
      </div>
      <div className="flex p-2">
        <label className="p-2">User Name : </label>
        <input
          className="border border-solid border-black p-2"
          value={loggedInUser}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
      </div>
      <div className="flex flex-wrap">
        {searchedList.map((restuarant) => (
          <Link
            key={restuarant.info.id}
            to={"/restuarantmenu/" + restuarant.info.id}
          >
            {restuarant.info.isOpen ? (
              <PromotedRestuarant responseData={restuarant} />
            ) : (
              <RestaurantCard responseData={restuarant} />
            )}
          </Link>
        ))}
        {/* pass js object in component */}
      </div>
    </div>
  );
};
export default Body;
