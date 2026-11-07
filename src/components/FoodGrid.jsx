
import FoodCard from "./FoodCard";

function FoodGrid({
  items,
  cart,
  onAdd,
  onChangeQty,
}) {
  return (
    <section className="px-4 mt-6 pb-28">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-lg font-extrabold text-gray-900">
          Today's Menu
        </h2>

        <span className="text-xs text-gray-500">
          {items.length} items
        </span>

      </div>

      {items.length === 0 ? (

        <div className="bg-white rounded-2xl p-8 text-center">

          <p className="text-4xl">🔍</p>

          <p className="font-bold mt-3">
            No food found
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Try another search or category.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-3">

          {items.map((item) => (

            <FoodCard
              key={item.id}
              item={item}
              cart={cart}
              onAdd={onAdd}
              onChangeQty={onChangeQty}
            />

          ))}

        </div>

      )}

    </section>
  );
}

export default FoodGrid;
