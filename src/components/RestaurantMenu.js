import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestuarantCategory";
import Shimmer from "./Shimmer";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const responseInfo = useRestaurantMenu(resId); // custom hook

  console.log(
    responseInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card
  );
  // const { itemCards = [] } =
  //   responseInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card;

  const categories =
    responseInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (cat) =>
        cat?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  return !responseInfo ? (
    <Shimmer />
  ) : (
    <div className="text-center">
      <h1>Menu Items</h1>
      <h1>Restaurant Id : {resId}</h1>
      {categories.map((category) => (
        <div>
          <RestaurantCategory data={category?.card?.card} />
        </div>
      ))}
      <ul>
        {/* {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} - Rs{" "}
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))} */}
      </ul>
    </div>
  );
};
export default RestaurantMenu;
