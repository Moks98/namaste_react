import { useState, useEffect } from "react";
import { RESTAURANT_MENU_URL } from "../utils/constants";
const useRestaurantMenu = (resId) => {
  const [responseInfo, setResponseInfo] = useState(null);
  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    const data = await fetch(RESTAURANT_MENU_URL + resId);
    const json = await data.json();
    setResponseInfo(json.data);
  };
  return responseInfo;
};
export default useRestaurantMenu;
