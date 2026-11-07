import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import FoodGrid from "./components/FoodGrid";
import CartBar from "./components/CartBar";
import CartPage from "./components/CartPage";

import AdminDashboard from "./components/AdminDashboard";

import menuData from "./data/menuData";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Switch between Menu and Admin
  const [currentPage, setCurrentPage] = useState("menu");

  // Add item to cart
  const addToCart = (item, size, price) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (entry) => entry.id === item.id && entry.size === size
      );

      if (existingItem) {
        return previousCart.map((entry) =>
          entry.id === item.id && entry.size === size
            ? {
                ...entry,
                quantity: entry.quantity + 1,
              }
            : entry
        );
      }

      return [
        ...previousCart,
        {
          id: item.id,
          name: item.name,
          category: item.category,
          image: item.image,
          size,
          price,
          quantity: 1,
        },
      ];
    });
  };

  // Increase or decrease quantity
  const changeQuantity = (item, size, change) => {
    setCart((previousCart) => {
      return previousCart
        .map((entry) => {
          if (entry.id === item.id && entry.size === size) {
            return {
              ...entry,
              quantity: entry.quantity + change,
            };
          }

          return entry;
        })
        .filter((entry) => entry.quantity > 0);
    });
  };

  // Cart page quantity update
  const changeCartQuantity = (item, change) => {
    changeQuantity(item, item.size, change);
  };

  // Clear cart after successful order
  const clearCart = () => {
    setCart([]);
  };

  // Search and category filtering
  const filteredItems = menuData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Full-page checkout
  if (isCartOpen) {
    return (
      <CartPage
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onChangeQty={changeCartQuantity}
        onClearCart={clearCart}
      />
    );
  }

  // Admin Dashboard
  if (currentPage === "admin") {
    return (
      <div className="min-h-screen bg-gray-50">

        {/* Back to Menu Button */}
        <div className="flex justify-center bg-white p-4 shadow-sm">
          <button
            onClick={() => setCurrentPage("menu")}
            className="rounded-lg bg-gray-200 px-5 py-2 font-medium text-gray-800 transition hover:bg-gray-300"
          >
            Back to Menu
          </button>
        </div>

        {/* Admin Dashboard */}
        <AdminDashboard />

      </div>
    );
  }

  // Menu page
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <div className="mx-auto min-h-screen max-w-md bg-gray-50">

        {/* Header */}
        <Header
          onAdminClick={() => setCurrentPage("admin")}
        />

        {/* Search */}
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* Categories */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Food Menu */}
        <FoodGrid
          items={filteredItems}
          cart={cart}
          onAdd={addToCart}
          onChangeQty={changeQuantity}
        />

        {/* Bottom Cart */}
        <CartBar
          cart={cart}
          onOpenCart={() => setIsCartOpen(true)}
        />

      </div>

    </div>
  );
}

export default App;