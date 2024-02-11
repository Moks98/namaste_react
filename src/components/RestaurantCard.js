const RestaurantCard = (props) => {
  const { responseData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    responseData?.info;
  console.log(responseData, "response=====");

  //const cloudId = "b2edbc28b7b8219d6e0a9c049ce06658"
  return (
    <div className="res-card" style={{ background: "#F0F0F0" }}>
      <img
        alt="food-card"
        className="res-logo"
        src={"" + cloudinaryImageId}
      ></img>
      <h3>{name}</h3>
      <h4>{cuisines}</h4>
      <h4>{avgRating}</h4>
      <h4>{costForTwo}</h4>
      <h4>{responseData.info.sla.slaString}</h4>
    </div>
  );
};

export default RestaurantCard;
