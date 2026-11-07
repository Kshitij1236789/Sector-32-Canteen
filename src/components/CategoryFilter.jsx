
const categories = [
  { name: "All", icon: "🍽️" },
  { name: "Meals", icon: "🍛" },
  { name: "Snacks", icon: "🍜" },
  { name: "Egg", icon: "🍳" },
  { name: "Tea & Coffee", icon: "☕" },
  { name: "Cold Drinks & Beverages", icon: "🥤" },
  { name: "Chips & Snacks", icon: "🍟" },
  { name: "Namkeen", icon: "🥨" },
];

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <section className="mt-6 px-4">

      <h2 className="text-base font-bold text-gray-900 mb-3">
        Categories
      </h2>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

        {categories.map((category) => {

          const active = selectedCategory === category.name;

          return (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col items-center justify-center min-w-[72px] h-[76px] rounded-2xl border transition-all duration-200 ${
                active
                  ? "bg-orange-500 text-white border-orange-500 shadow-md scale-[1.03]"
                  : "bg-white text-gray-700 border-gray-100 shadow-sm"
              }`}
            >

              <span className="text-2xl">
                {category.icon}
              </span>

              <span className="text-xs font-semibold mt-1">
                {category.name}
              </span>

            </button>
          );

        })}

      </div>

    </section>
  );
}

export default CategoryFilter;
