import React, { useContext, useReducer, useEffect } from "react";

// const productDetails = [
//   {
//     giftId: "product-1",
//     url: "https://5.imimg.com/data5/QX/OQ/MY-35834836/acrylic-name-plate-500x500.jpg",
//     productName: "Acrylic Light",
//     price: "300",
//     quantity: "10",
//     giftDetails: "",
//   },
//   {
//     giftId: "product-2",
//     url: "https://5.imimg.com/data5/SELLER/Default/2021/9/TH/HJ/JH/27990694/door-name-plate-250x250.jpg",
//     productName: "Wooden Board",
//     price: "200",
//     quantity: "8",
//     giftDetails: "",
//   },
//   {
//     giftId: "product-3",
//     url: "https://hitchki.in/wp-content/uploads/Stainless-steal-name-plate.jpg",
//     productName: "Steel Printed",
//     price: "200",
//     quantity: "50",
//     giftDetails: "",
//   },
//   {
//     giftId: "product-4",
//     url: "https://ii1.pepperfry.com/media/catalog/product/c/u/1100x1210/customizable-brown-wood-name-plate-by-karigaari-india-customizable-brown-wood-name-plate-by-karigaar-tafok7.jpg",
//     productName: "Wooden Row",
//     price: "150",
//     quantity: "20",
//     giftDetails: "",
//   },
//   {
//     giftId: "product-5",
//     url: "https://cdn.shopify.com/s/files/1/0430/3899/8682/products/vk-np.jpg?v=1594469179",
//     productName: "Acrylic Hard",
//     price: "200",
//     quantity: "5",
//     giftDetails: "",
//   },
//   {
//     giftId: "product-6",
//     url: "https://static.connect2india.com/c2icd/product_resources/images/steel-name-board.jpg",
//     productName: "Stainless Steel",
//     price: "300",
//     quantity: "1",
//     giftDetails: "",
//   },
//   {
//     giftId: "product-7",
//     url: "https://5.imimg.com/data5/BA/WI/MY-25071105/modern-nameplate-500x500.jpg",
//     productName: "Modern Nameboard",
//     price: "150",
//     quantity: "15",
//     giftDetails: "",
//   },
//   {
//     giftId: "product-8",
//     url: "http://www.lowerroadsigns.co.uk/uploaded_images/Dusek-Main-sign-770758.jpg",
//     productName: "3D Nameboard",
//     price: "120",
//     quantity: "12",
//     giftDetails: "",
//   },
// ];

const ProductsContext = React.createContext({
  isLoading: false,
  productsList: [],
  productsDispatchFn: () => {},
  refreshProductContext: () => {},
});

const productsReducer = (prevState, action) => {
  let updatedArray;
  if (action.type === "GET_PRODUCTS") {
    updatedArray = [...action.value];
    return updatedArray;
  } else if (action.type === "ADD_PRODUCT") {
    const newProduct = { ...action.value };
    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    };
    fetch("https://giftshopbackend.onrender.com/productsadd", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-------------------
    updatedArray = [...prevState, newProduct];
    return updatedArray;
  } else if (action.type === "EDIT_PRODUCT") {
    const exsistedProduct = prevState.find((item) => {
      return item.giftId === action.value.giftId;
    });

    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(action.value),
    };
    fetch("https://giftshopbackend.onrender.com/productsupdate", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    const index = prevState.indexOf(exsistedProduct);
    updatedArray = [...prevState];
    updatedArray[index] = { ...action.value };
    return updatedArray;
  } else if (action.type === "DELETE_PRODUCT") {
    const newPro = { giftId: action.value };

    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPro),
    };
    fetch("https://giftshopbackend.onrender.com/productsdelete", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    updatedArray = [
      ...prevState.filter((item) => {
        return item.giftId !== action.value;
      }),
    ];
    return updatedArray;
  }
  return prevState;
};

export const ProductsContextProvider = (props) => {
  const fetchData = () => {
    fetch("https://giftshopbackend.onrender.com/products") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        productsDispatchFn({ type: "GET_PRODUCTS", value: data });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refreshProductContext = () => fetchData();
  const [productsList, productsDispatchFn] = useReducer(productsReducer, []);
  return (
    <ProductsContext.Provider
      value={{
        productsList: productsList,
        productsDispatchFn: productsDispatchFn,
        refreshProductContext: refreshProductContext,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export const useProductsCxt = () => {
  return useContext(ProductsContext);
};
export const useProductsRefresh = () => {
  ProductsContextProvider();
  return Promise.resolve("OK");
};
export default ProductsContext;
