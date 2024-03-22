import ItemsList from "./ItemsList";
import { useState } from "react";
const RestaurantCategory = ({ data }) => {
  const [statedata, setStateData] = useState();
  const handleClick = () => {
    console.log("clicked menu div");
    setStateData(!statedata);
  };
  return (
    <div onClick={handleClick}>
      <div className="p-2 my-4 w-6/12 shadow-lg bg-gray-200 mx-auto  rounded-md">
        <div className="flex justify-between">
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>^</span>
        </div>
        {statedata && <ItemsList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
