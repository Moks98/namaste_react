import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import responseList from "../utils/mockData";
import Shimmer from "./Shimmer";
const Body = () => {
  //console.log(responseList, "responseList------");
  let resList = responseList.gridElements.infoWithStyle.restaurants;

  /* let resList = [
    {
      info: {
        id: "65791",
        name: "Leon's - Burgers & Wings (Leon Grill)",
        cloudinaryImageId: "b2edbc28b7b8219d6e0a9c049ce06658",
        locality: "Koramangala",
        areaName: "Koramangala",
        costForTwo: "₹300 for two",
        cuisines: [
          "American",
          "Snacks",
          "Turkish",
          "Portuguese",
          "Continental",
        ],
        avgRating: 4.4,
        sla: {
          deliveryTime: 24,
          lastMileTravel: 2.1,
          serviceability: "SERVICEABLE",
          slaString: "20-25 mins",
          lastMileTravelString: "2.1 km",
          iconType: "ICON_TYPE_EMPTY",
        },
      },
    },
    {
      info: {
        id: "65792",
        name: "KFC",
        cloudinaryImageId: "b2edbc28b7b8219d6e0a9c049ce06658",
        locality: "Koramangala",
        areaName: "Koramangala",
        costForTwo: "₹300 for two",
        cuisines: [
          "American",
          "Snacks",
          "Turkish",
          "Portuguese",
          "Continental",
        ],
        avgRating: 3.0,
        sla: {
          deliveryTime: 24,
          lastMileTravel: 2.1,
          serviceability: "SERVICEABLE",
          slaString: "20-25 mins",
          lastMileTravelString: "2.1 km",
          iconType: "ICON_TYPE_EMPTY",
        },
      },
    },
    {
      info: {
        id: "65793",
        name: "MCD",
        cloudinaryImageId: "b2edbc28b7b8219d6e0a9c049ce06658",
        locality: "Koramangala",
        areaName: "Koramangala",
        costForTwo: "₹300 for two",
        cuisines: [
          "American",
          "Snacks",
          "Turkish",
          "Portuguese",
          "Continental",
        ],
        avgRating: 4.2,
        sla: {
          deliveryTime: 24,
          lastMileTravel: 2.1,
          serviceability: "SERVICEABLE",
          slaString: "20-25 mins",
          lastMileTravelString: "2.1 km",
          iconType: "ICON_TYPE_EMPTY",
        },
      },
    },
  ];*/
  const [listofRestaurants, SetListofRestaurants] = useState([]);
  const [searchText, SetSearchText] = useState("");
  const [searchedList, SetSearchList] = useState([]);
  useEffect(() => {
    console.log("use effect excecuted....");
    fetchRestuarantData();
  }, []);
  const fetchRestuarantData = async () => {
    let data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9753386&lng=77.5877318&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    //https://www.swiggy.com/api/seo/getListing?lat=12.960059122809971&lng=77.57337538383284

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

  return listofRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      {/* <div className="search">Search</div> */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search...."
          value={searchText}
          onChange={(e) => {
            SetSearchText(e.target.value);
            console.log(searchText);
          }}
        ></input>
        <button
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
        className="filter-btn"
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
      <div className="res-container">
        {searchedList.map((restuarant) => (
          <RestaurantCard key={restuarant.info.id} responseData={restuarant} />
        ))}
        {/* pass js object in component */}
      </div>
    </div>
  );
};
export default Body;
