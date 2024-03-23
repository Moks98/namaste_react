import { useParams } from "react-router-dom";
import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestuarantCategory";
import Shimmer from "./Shimmer";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(null); // manages index of accordion
  const responseInfo = useRestaurantMenu(resId); // custom hook

  console.log(
    responseInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card
  );

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
      {categories.map((category, index) => (
        <div>
          <RestaurantCategory
            key={category?.card?.card.title}
            data={category?.card?.card}
            showItems={index === showIndex ? true : false} // based on this prop values are shown and hidden
            showIndex={() => setShowIndex(index)} //when clicked here it gets current index and value gets set in showIndex
          />
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
