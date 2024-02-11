import RestaurantCard from "./RestaurantCard";
import responseList from "../utils/mockData";

const Body = () => {
  console.log(responseList, "responseList------");
  const resList = responseList.gridElements.infoWithStyle.restaurants;
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        {resList.map((restuarant) => (
          <RestaurantCard key={restuarant.info.id} responseData={restuarant} />
        ))}
        {/* pass js object in component */}
      </div>
    </div>
  );
};
export default Body;
