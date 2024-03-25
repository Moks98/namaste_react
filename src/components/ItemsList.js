import { CLOUD_IMAGE_URL } from "../utils/constants";
const ItemsList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-500 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-4">
              <span className="font-bold text-sm">{item.card.info.name} -</span>
              <span className="p-2 text-sm">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
                /-
              </span>
            </div>
            <p className="text-sm">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-3">
            <div className="absolute">
              <button className="bg-black shadow-lg mx-16 text-white p-1 rounded-sm">
                Add +
              </button>
            </div>
            <img src={CLOUD_IMAGE_URL + item.card.info.imageId}></img>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemsList;
