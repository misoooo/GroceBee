import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.VITE_CURRENCY;

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  //fetch all products
  const fetchproducts = async () => {
    setProducts(dummyProducts);
  };

  //add products to cart
  const addToCart = (itemId) => {
    let cartdata = structuredClone(cartItems);
    if (cartdata[itemId]) {
      cartdata[itemId] += 1;
    } else {
      cartdata[itemId] = 1;
    }
    setCartItems(cartdata);
    toast.success("Added to Cart");
  };

  //update cart quantity

  const updateCartItem = (itemId, quantity) => {
    let cartdata = structuredClone(cartItems);
    cartdata[itemId] = quantity;
    setCartItems(cartdata);
    toast.success("Cart Updated");
  };

  //remove product from cart

  const removeFromCart = (itemId) => {
    let cartdata = structuredClone(cartItems);
    if (cartdata[itemId]) {
      cartdata[itemId] -= 1;
      if (cartdata[itemId] === 0) {
        delete cartdata[itemId];
      }
    }
    toast.success("Removed From Cart");
    setCartItems(cartdata);
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
