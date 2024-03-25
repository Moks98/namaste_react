import { CLOUD_IMAGE_URL } from "../utils/constants";
const RestaurantCard = (props) => {
  const { responseData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    responseData?.info;

  //const cloudId = "b2edbc28b7b8219d6e0a9c049ce06658"
  return (
    <div className="m-4 p-4 w-[200px] bg-gray-100 rounded-lg hover:bg-gray-300">
      <img
        alt="food-card"
        className="w-20"
        src={CLOUD_IMAGE_URL + cloudinaryImageId}
      ></img>
      <h3>{name}</h3>
      <h4>{cuisines.join(" , ")}</h4>
      <h4>{avgRating}</h4>
      <h4>{costForTwo}</h4>
      <h4>{responseData.info.sla.slaString}</h4>
    </div>
  );
};
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white rounded-md">open</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
