const ItemsList = ({ items }) => {
  console.log(items, "items list");
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-500 border-b-2 text-left"
        >
          <div>
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
      ))}
    </div>
  );
};
export default ItemsList;
