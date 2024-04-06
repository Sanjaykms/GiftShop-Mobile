import React, { useReducer, useContext, useEffect } from "react";

// const orderItems = [
//   {
//     giftId: "product-4",
//     orderId: "ORDER-1704727755910",
//     price: "150",
//     productName: "Wooden Row",
//     quantity: 1,
//     status: "Order placed",
//     themeName: "Text printing",
//     themePrice: "1000",
//     totalAmount: 1150,
//     url: "https://ii1.pepperfry.com/media/catalog/product/c/u/1100x1210/customizable-brown-wood-name-plate-by-karigaari-india-customizable-brown-wood-name-plate-by-karigaar-tafok7.jpg",
//     userId: "user-1",
//   },
//   {
//     giftId: "product-5",
//     orderId: "ORDER-1754727755910",
//     price: "150",
//     productName: "Wooden Row",
//     quantity: 1,
//     status: "Order placed",
//     themeName: "Text printing",
//     themePrice: "1000",
//     totalAmount: 1150,
//     url: "https://ii1.pepperfry.com/media/catalog/product/c/u/1100x1210/customizable-brown-wood-name-plate-by-karigaari-india-customizable-brown-wood-name-plate-by-karigaar-tafok7.jpg",
//     userId: "user-1",
//   },
// ];

// MyOrders context
const MyOrdersContext = React.createContext({
  orderItems: [],
  myordersDispatchFn: () => {},
  refreshMyOrderContext: () => {},
});

// Reducer fn
const myordersReducer = (prevState, action) => {
  let updatedArray;
  if (action.type === "GET_ORDERS") {
    updatedArray = [...action.value];
    return updatedArray;
  } else if (action.type === "PLACE_ORDER") {
    const newOrder = action.value;
    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newOrder),
    };
    fetch("https://giftshopbackend.onrender.com/ordersadd", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //------------------

    updatedArray = [{ ...action.value }, ...prevState];
    console.log(updatedArray);
    return updatedArray;
  } else if (action.type === "UPDATE_ORDER") {
    const exsistedItem = prevState.find((item) => {
      return item.orderId === action.value.orderId;
    });

    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(action.value),
    };
    fetch("https://giftshopbackend.onrender.com/ordersupdate", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    const index = prevState.indexOf(exsistedItem);
    updatedArray = [...prevState];
    updatedArray[index] = { ...action.value };
    return updatedArray;
  } else if (action.type === "CANCEL_ORDER") {
    const newVal = { orderId: action.value };
    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newVal),
    };
    fetch("https://giftshopbackend.onrender.com/ordersdelete", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    updatedArray = [
      ...prevState.filter((item) => {
        return item.orderId !== action.value;
      }),
    ];
    return updatedArray;
  }
  return prevState;
};

// MyOrdersContext Provider
export const MyOrdersContextProvider = (props) => {
  const fetchData = () => {
    fetch("https://giftshopbackend.onrender.com/orders") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        myordersDispatchFn({ type: "GET_ORDERS", value: data });
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refreshMyOrderContext = () => {
    fetchData();
  };
  const [myordersState, myordersDispatchFn] = useReducer(myordersReducer, []);

  return (
    <MyOrdersContext.Provider
      value={{
        orderItems: myordersState,
        myordersDispatchFn: myordersDispatchFn,
        refreshMyOrderContext: refreshMyOrderContext,
      }}
    >
      {props.children}
    </MyOrdersContext.Provider>
  );
};

export const useMyOrdersCxt = () => {
  return useContext(MyOrdersContext);
};
export const useMyOrdersRefresh = () => {
  MyOrdersContextProvider();
  return Promise.resolve("OK");
};
export default MyOrdersContext;
