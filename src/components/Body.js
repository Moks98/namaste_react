import { useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body = () => {
  const [listofRestaurants, SetListofRestaurants] = useState([]);
  const [searchText, SetSearchText] = useState("");
  const [searchedList, SetSearchList] = useState([]);
  const onlineStatus = useOnlineStatus();
  const PromotedRestuarant = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    console.log("use effect excecuted....");
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
    console.log(listofRestaurants);
  };

  if (!onlineStatus) {
    return <div>Looks like you are offline !!</div>;
  }
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
            console.log(searchText);
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
      <button
        className="bg-purple-400 m-1 p-1 rounded-sm"
        onClick={() => {
          const filteredRestuarantList = listofRestaurants.filter(
            (res) => res.info.avgRating > 4
          );
          SetListofRestaurants(filteredRestuarantList);
          console.log("filtered response----", filteredRestuarantList);
        }}
      >
        Top Rated Restuarants
      </button>
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
