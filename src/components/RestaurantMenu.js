import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { RESTAURANT_MENU_URL } from "../utils/constants";
const RestaurantMenu = () => {
  //API CALL FOR MENU DATA
  const [responseInfo, setResponseInfo] = useState(null);
  const { resId } = useParams();
  useEffect(() => {
    fetchRestaurantMenu();
  }, []);
  const fetchRestaurantMenu = async () => {
    const data = await fetch(RESTAURANT_MENU_URL + resId);
    const json = await data.json();
    console.log(json);
    console.log(
      json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
        .itemCards,
      "menu data----"
    );
    const response =
      json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card;
    setResponseInfo(response);
  };

  if (responseInfo === null) {
    return <Shimmer />;
  }
  const { itemCards } = responseInfo;

  return (
    <div>
      <h1>Menu Items</h1>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} - Rs{" "}
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RestaurantMenu;
