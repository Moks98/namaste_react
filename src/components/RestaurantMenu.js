import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const responseInfo = useRestaurantMenu(resId); // custom hook

  if (responseInfo === null) {
    return <Shimmer />;
  }
  const { itemCards } =
    responseInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card;

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
