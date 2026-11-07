
import kadhiRiceImage from "../images/kadhi rice.jpg";
import rajmaRiceImage from "../images/rajma rice.jpg";
import blackChanaRiceImage from "../images/black chana rice.jpg";
import whiteChanaRiceImage from "../images/white chana rice.jpg";
import alooParathaImage from "../images/Aloo prantha.jpg";
import omeletteImage from "../images/omlette.jpg";
import springRollImage from "../images/spring roll.jpg";
import eggFryImage from "../images/egg fry.jpg";
import eggBhurjiImage from "../images/egg bhurji.jpg";
import pohaImage from "../images/poha.jpg";
import cokeImage from "../images/coke.jpg";
import dietCokeImage from "../images/diet coke.jpg";
import cokeCanImage from "../images/coke_can.jpg";
import pepsiCanImage from "../images/pepsi can.jpeg";
import pepsi from "../images/pepsi.jpg"
import mazza from "../images/mazza.jpg"
import milkBadam from "../images/milk Badam.jpg"
import monsterCan from "../images/monster can.jpg"
import RedBull from "../images/redbull.jpg"
import TedheMedde from "../images/Tedhe medde.jpg"
import Greenchips from "../images/Green chips.jpg"
import makhane from "../images/makhane.jpg"
import PunjabiTadka from "../images/punjabi tadka.jpg"
import AlooBhujia from "../images/aloo bhujia.jpg"
import MixNamkeen from "../images/mix.webp"
import KhathaMetha from "../images/khatta metha.jpg"
import Sting from "../images/sting.jpg"

const menuData = [
  {
    id: 1,
    name: "Rajma Rice",
    category: "Meals",
    price: 90,
    halfPrice: 50,
    image: rajmaRiceImage,
    description: "Fresh rajma with steamed rice",
    sizes: ["Full", "Half"],
  },
  {
    id: 2,
    name: "Kadhi Rice",
    category: "Meals",
    price: 90,
    halfPrice: 50,
    image: kadhiRiceImage,
    description: "Homemade kadhi with rice",
    sizes: ["Full", "Half"],
  },
  {
    id: 3,
    name: "Black Chana Rice",
    category: "Meals",
    price: 90,
    halfPrice: 50,
    image: blackChanaRiceImage,
    description: "Black chana served with rice",
    sizes: ["Full", "Half"],
  },
  {
    id: 4,
    name: "White Chana Rice",
    category: "Meals",
    price: 90,
    halfPrice: 50,
    image: whiteChanaRiceImage,
    description: "White chana served with rice",
    sizes: ["Full", "Half"],
  },
  {
    id: 5,
    name: "Aloo Paratha",
    category: "Meals",
    price: 35,
    image: alooParathaImage,
    description: "Fresh homemade aloo paratha",
  },
  {
    id: 6,
    name: "Poha",
    category: "Meals",
    price: 60,
    image: pohaImage,
    description: "Fresh and delicious poha",
  },
  {
    id: 7,
    name: "Maggi",
    category: "Snacks",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600",
    description: "Hot and tasty Maggi",
    options: [
      { label: "Plain", price: 30 },
      { label: "Veg", price: 50 },
      { label: "Egg", price: 60 },
    ],
  },
  {
    id: 8,
    name: "Spring Roll",
    category: "Snacks",
    price: 70,
    halfPrice: 35,
    image: springRollImage,
    description: "Crispy vegetable spring rolls",
    sizes: ["Full", "Half"],
  },
  {
    id: 9,
    name: "Omelette",
    category: "Egg",
    price: 50,
    image: omeletteImage,
    description: "Freshly prepared omelette",
    options: [
      { label: "With Bread", price: 60 },
      { label: "Without Bread", price: 50 },
    ],
  },
  {
    id: 10,
    name: "Egg Bhurji",
    category: "Egg",
    price: 30,
    image: eggBhurjiImage,
    description: "Indian style egg bhurji",
  },
  {
    id: 11,
    name: "Egg Fry with Slices",
    category: "Egg",
    price: 50,
    image: eggFryImage,
    description: "Egg fry served with bread slices",
  },
  {
    id: 12,
    name: "Tea",
    category: "Tea & Coffee",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600",
    description: "Hot freshly brewed tea",
  },
  {
    id: 13,
    name: "Coffee",
    category: "Tea & Coffee",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
    description: "Hot aromatic coffee",
  },
  {
    id: 14,
    name: "Cold Coffee",
    category: "Tea & Coffee",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
    description: "Chilled creamy cold coffee",
  },
  {
    id: 15,
    name: "Coke",
    category: "Cold Drinks & Beverages",
    price: 40,
    image: cokeImage,
    description: "Chilled Coca-Cola",
  },
  {
    id: 16,
    name: "Diet Coke",
    category: "Cold Drinks & Beverages",
    price: 50,
    image: dietCokeImage,
    description: "Chilled Diet Coke",
  },
  {
    id: 17,
    name: "Coke Can",
    category: "Cold Drinks & Beverages",
    price: 70,
    image:cokeCanImage,
    description: "Coca-Cola can",
  },
  {
    id: 18,
    name: "Pepsi",
    category: "Cold Drinks & Beverages",
    price: 40,
  image: pepsi,
    description: "Chilled Pepsi",
  },
  {
    id: 19,
    name: "Pepsi Can",
    category: "Cold Drinks & Beverages",
    price: 70,
  image: pepsiCanImage,
    description: "Pepsi can",
  },
  {
    id: 20,
    name: "Mazza",
    category: "Cold Drinks & Beverages",
    price: 40,
    image:mazza,
    description: "Refreshing mango drink",
  },
  {
    id: 21,
    name: "Lahori Zeera",
    category: "Cold Drinks & Beverages",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600",
    description: "Refreshing cumin-flavoured drink",
  },
  {
    id: 22,
    name: "Sting",
    category: "Cold Drinks & Beverages",
    price: 20,
    image:Sting,
    description: "Energy drink",
  },
  {
    id: 23,
    name: "Milk Badam",
    category: "Cold Drinks & Beverages",
    price: 50,
    image:milkBadam,
    description: "Chilled almond milk",
  },
  {
    id: 24,
    name: "Monster Can",
    category: "Cold Drinks & Beverages",
    price: 125,
    image:monsterCan,
    description: "Monster energy drink can",
  },
  {
    id: 25,
    name: "Red Bull Can",
    category: "Cold Drinks & Beverages",
    price: 125,
    image:RedBull,
    description: "Red Bull energy drink can",
  },
  {
    id: 26,
    name: "Teda Meda",
    category: "Chips & Snacks",
    price: 30,
    image:TedheMedde,
    description: "Crunchy masala snack",
  },
  {
    id: 27,
    name: "Green Chips",
    category: "Chips & Snacks",
    price: 30,
    image:Greenchips,
    description: "Crispy potato chips",
  },
  {
    id: 28,
    name: "Makhana",
    category: "Chips & Snacks",
    price: 30,
    image:makhane,
    description: "Roasted crunchy makhana",
  },
  {
    id: 29,
    name: "Aloo Bhujia",
    category: "Namkeen",
    price: 25,
    image:AlooBhujia,
    description: "Crunchy traditional namkeen",
  },
  {
    id: 30,
    name: "Punjabi Tadka",
    category: "Namkeen",
    price: 25,
    image:PunjabiTadka,
    description: "Spicy Punjabi-style namkeen",
  },
  {
    id: 31,
    name: "Mix Namkeen",
    category: "Namkeen",
    price: 25,
    image:MixNamkeen,
    description: "Classic mixed namkeen",
  },
  {
    id: 32,
    name: "Khatta Metha",
    category: "Namkeen",
    price: 25,
    image:KhathaMetha,
    description: "Assorted namkeen snacks",
  },
];

export default menuData;
