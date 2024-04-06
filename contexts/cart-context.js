import React, { useReducer, useContext, useEffect } from "react";

// Images import

// const cartItems = [1, 2];
// Cart context
const CartContext = React.createContext({
  cartItems: [],
  cartDispatchFn: () => {},
  refreshCartContext: () => {},
});

// Cart Reducer fn
const cartReducer = (prevState, action) => {
  let updatedArray;
  if (action.type === "GET_CART_ITEMS") {
    updatedArray = [...action.value];
    return updatedArray;
  } else if (action.type === "ADD_TO_CART") {
    action.value.totalAmount = (
      action.value.quantity * action.value.price
    ).toFixed(2);

    const newCart = action.value;
    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCart),
    };
    fetch("https://giftshopbackend.onrender.com/cartsadd", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //------------------

    updatedArray = [action.value, ...prevState];
    return updatedArray;
  } else if (action.type === "SAVE_EDITED_PRODUCT") {
    const exsistedItem = prevState.find((item) => {
      return action.value.giftId === item.giftId;
    });
    const index = prevState.indexOf(exsistedItem);
    action.value.totalAmount = (
      action.value.quantity * action.value.price
    ).toFixed(2);
    const cloneProduct = { ...action.value };

    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(action.value),
    };
    fetch("https://giftshopbackend.onrender.com/cartsupdate", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    updatedArray = [...prevState];
    updatedArray[index] = cloneProduct;
    return updatedArray;
  } else if (action.type === "REMOVE_FROM_CART") {
    const newVal = { cartItemId: action.value };
    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newVal),
    };
    fetch("https://giftshopbackend.onrender.com/cartsdelete", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    updatedArray = [
      ...prevState.filter((item) => {
        return item.cartItemId !== action.value;
      }),
    ];
    return updatedArray;
  }
  return prevState;
};

// Cart Context Provider
export const CartContextProvider = (props) => {
  const fetchData = () => {
    fetch("https://giftshopbackend.onrender.com/carts") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        cartDispatchFn({ type: "GET_CART_ITEMS", value: data });
      })
      .catch((error) => {
        console.error("Error fetching Carts:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refreshCartContext = () => {
    fetchData();
  };
  const [cartState, cartDispatchFn] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState,
        cartDispatchFn: cartDispatchFn,
        refreshCartContext: refreshCartContext,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCartCxt = () => {
  return useContext(CartContext);
};
export const useCartRefresh = () => {
  const { resetCart } = useCartCxt();
  return resetCart;
};
export default CartContext;
