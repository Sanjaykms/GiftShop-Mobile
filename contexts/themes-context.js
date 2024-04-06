import React, { useContext, useReducer, useEffect } from "react";

// const themeDetails = [
//   {
//     id: "theme-1",
//     themeName: "Text printing",
//     price: "1000",
//     themeDesc: "Various colors with 3D",
//   },
//   {
//     id: "theme-2",
//     themeName: "Hand made printing",
//     price: "12.99",
//     themeDesc: "Frame printing",
//   },
//   {
//     id: "theme-3",
//     themeName: "Water printing",
//     price: "48.54",
//     themeDesc: "Emersive color",
//   },
//   {
//     id: "theme-4",
//     themeName: "Fire printing",
//     price: "60.21",
//     themeDesc: "Impressive colors",
//   },
//   {
//     id: "theme-5",
//     themeName: "Handmade gifts",
//     price: "35.12",
//     themeDesc: "Antique",
//   },
// ];

const ThemeContext = React.createContext({
  themeList: [],
  themeDispatchFn: () => {},
  refreshThemeContext: () => {},
});

const themeReducer = (prevState, action) => {
  let updatedArray;
  if (action.type === "GET_PRODUCT") {
    updatedArray = [...action.value];
    return updatedArray;
  } else if (action.type === "ADD_PRODUCT") {
    const newtheme = { ...action.value };

    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newtheme),
    };
    fetch("https://giftshopbackend.onrender.com/themesadd", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //------------------

    updatedArray = [...prevState, newtheme];
    return updatedArray;
  } else if (action.type === "EDIT_PRODUCT") {
    const exsistedProduct = prevState.find((item) => {
      return item.id === action.value.id;
    });

    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(action.value),
    };
    fetch("https://giftshopbackend.onrender.com/themesupdate", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    const index = prevState.indexOf(exsistedProduct);
    updatedArray = [...prevState];
    updatedArray[index] = action.value;
    return updatedArray;
  } else if (action.type === "DELETE_PRODUCT") {
    const newVal = { id: action.value };
    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newVal),
    };
    fetch("https://giftshopbackend.onrender.com/themesdelete", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    updatedArray = [
      ...prevState.filter((item) => {
        return item.id !== action.value;
      }),
    ];
    return updatedArray;
  } else if (action.type === "PLACE_ORDER") {
    const exsistedProduct = prevState.find((item) => {
      return item.id === action.value.id;
    });
    const index = prevState.indexOf(exsistedProduct);
    const tempProduct = { ...exsistedProduct };
    tempProduct.quantity = tempProduct.quantity - action.value.quantity;
    updatedArray = [...prevState];

    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tempProduct),
    };
    fetch("https://giftshopbackend.onrender.com/themesupdate", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    updatedArray[index] = tempProduct;
    return updatedArray;
  } else if (action.type === "CANCEL_ORDER") {
    const exsistedProduct = prevState.find((item) => {
      return item.id === action.value.id;
    });
    const index = prevState.indexOf(exsistedProduct);
    const tempProduct = { ...exsistedProduct };
    tempProduct.quantity = tempProduct.quantity + action.value.quantity;
    updatedArray = [...prevState];
    updatedArray[index] = tempProduct;

    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(action.value),
    };
    fetch("https://giftshopbackend.onrender.com/themesupdate", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    return updatedArray;
  }
  return prevState;
};

export const ThemeContextProvider = (props) => {
  const fetchData = () => {
    fetch("https://giftshopbackend.onrender.com/themes") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        themeDispatchFn({ type: "GET_PRODUCT", value: data });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  useEffect(() => fetchData(), []);
  const refreshThemeContext = () => {
    fetchData(); // Fetch data when called
  };
  const [themeList, themeDispatchFn] = useReducer(themeReducer, []);
  return (
    <ThemeContext.Provider
      value={{
        themeList: themeList,
        themeDispatchFn: themeDispatchFn,
        refreshThemeContext: refreshThemeContext,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useThemeCxt = () => {
  return useContext(ThemeContext);
};
export default ThemeContext;
