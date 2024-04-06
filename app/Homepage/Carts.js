import { View, Text, ScrollView, Modal } from "react-native";
import React, { useState, Fragment } from "react";
import Display from "../ModelOverlay/Display";
import ModalOverlay from "../ModelOverlay/ModelOverlay";
import EmptyPage from "../ModelOverlay/EmptyPage";
import CartItem from "../ModelOverlay/CartItem";
import { useRouter } from "expo-router";
import { useCartCxt } from "../../contexts/cart-context";
import { useAuthCxt } from "../../contexts/auth-context";
import { useProductsCxt } from "../../contexts/products-context";
import { useMyOrdersCxt } from "../../contexts/myorders-context";
import Placeorder from "../ModelOverlay/Placeorder";
import useGenerateId from "../Hooks/generate-id";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Cart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [ordeId, setOrderId] = useState("");
  const [priceVal, setPriceVal] = useState("0");
  const [themmeName, setThemmeName] = useState("0");
  const [haveToEditProduct, setHaveToEditProduct] = useState({});
  const cartCxt = useCartCxt();
  const authCxt = useAuthCxt();
  const myordersCxt = useMyOrdersCxt();
  const productsCxt = useProductsCxt();
  const generateId = useGenerateId();
  const router = useRouter();

  let element;

  const findTotalAmount = (quantity, price) => {
    return (quantity * price).toFixed(2);
  };

  const findProduct = (cartItemId) => {
    return {
      ...cartCxt.cartItems.find((item) => {
        return cartItemId === item.cartItemId;
      }),
    };
  };

  const removeHandler = (cartItemId) => {
    cartCxt.cartDispatchFn({
      type: "REMOVE_FROM_CART",
      value: cartItemId,
    });
  };

  const openEditOverlayHandler = (cartItemId) => {
    const product = findProduct(cartItemId);
    setHaveToEditProduct(product);
    setModalVisible(true);
    // router.replace(`/Cart/${cartItemId}`);
  };

  const increceProductQuantity = () => {
    const tempProduct = { ...haveToEditProduct };
    tempProduct.quantity += 1;
    tempProduct.totalAmount = findTotalAmount(
      tempProduct.quantity,
      tempProduct.price
    );
    setHaveToEditProduct(tempProduct);
  };

  const decreceProductQuantity = () => {
    const tempProduct = { ...haveToEditProduct };
    if (tempProduct.quantity > 1) {
      tempProduct.quantity -= 1;
      tempProduct.totalAmount = findTotalAmount(
        tempProduct.quantity,
        tempProduct.price
      );
      setHaveToEditProduct(tempProduct);
    } else {
      removeHandler(haveToEditProduct.cartItemId);
      closeEditOverlayHandler();
    }
  };

  const saveHandler = () => {
    cartCxt.cartDispatchFn({
      type: "SAVE_EDITED_PRODUCT",
      value: haveToEditProduct,
    });
    closeEditOverlayHandler();
  };

  const closeEditOverlayHandler = () => {
    // router.replace("/Cart");
    setModalVisible(false);
    setModalVisible2(false);
  };
  const themePrice = (val) => {
    setPriceVal(val);
  };
  const themeNameHandler = (val) => {
    setThemmeName(val);
  };
  const placeOrderHandler = () => {
    const product = findProduct(ordeId);
    const exsistedProduct = {
      ...productsCxt.productsList.find((item) => {
        return product.giftId === item.giftId;
      }),
    };
    const orderedProduct = {
      orderId: generateId("ORDER"),
      userId: authCxt.userInfo.userId,
      giftId: product.giftId,
      productName: product.productName,
      quantity: product.quantity,
      price: product.price,
      totalAmount: product.totalAmount,
      url: product.url,
      status: "Order placed",
      themePrice: priceVal,
      themeName: themmeName,
    };
    const orderedProduct1 = orderedProduct;
    orderedProduct1.totalAmount =
      parseFloat(orderedProduct1.totalAmount) +
      parseFloat(priceVal * orderedProduct.quantity);
    // console.log(product.id);
    // console.log(exsistedProduct);
    // console.log(exsistedProduct.quantity, product.quantity);
    if (exsistedProduct.quantity >= product.quantity) {
      myordersCxt.myordersDispatchFn({
        type: "PLACE_ORDER",
        value: orderedProduct1,
      });
      exsistedProduct.quantity =
        exsistedProduct.quantity - orderedProduct.quantity + "";
      productsCxt.productsDispatchFn({
        type: "EDIT_PRODUCT",
        value: exsistedProduct,
      });
      removeHandler(ordeId);
      setThemmeName("0");
      setPriceVal("0");
      setTimeout(() => {
        alert("Your order placed successfully :)");
      }, 400);
      closeEditOverlayHandler();
    } else {
      alert("Not more sufficient stocks available :(");
    }
  };
  const gotoPlaceOrder = (oID) => {
    setOrderId(oID);
    const product1 = findProduct(oID);
    setHaveToEditProduct(product1);
    // router.push("Placeorder");
    setModalVisible2(true);
  };
  var countC = 0;
  const items = cartCxt.cartItems.map((cartItem, index) => {
    if (authCxt.userInfo.userId === cartItem.userId) {
      countC++;
      return (
        <ScrollView
          key={`product${index + 1}`}
          style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
        >
          <CartItem
            giftId={cartItem.giftId}
            productName={cartItem.productName}
            totalAmount={cartItem.totalAmount}
            quantity={cartItem.quantity}
            place="cart"
            cartItemId={cartItem.cartItemId}
            onOpen={openEditOverlayHandler}
            onDelete={removeHandler}
            onPlaceOrder={gotoPlaceOrder}
          />
          {/* <View key={index + 1} /> hr tag add style for line */}
        </ScrollView>
      );
    }
  });
  const goToProductsPageHandler = () => {
    router.back();
  };
  if (countC > 0) {
    element = <Display items={items} />;
  } else {
    element = (
      <EmptyPage
        message="Your Cart is Empty :("
        btnText="Add Gifts"
        onClick={goToProductsPageHandler}
      />
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ backgroundColor: "white" }}>{element}</View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalOverlay
            productToBeShown={haveToEditProduct}
            onClose={closeEditOverlayHandler}
            onIncrement={increceProductQuantity}
            onDecrement={decreceProductQuantity}
            onSave={saveHandler}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible2(!modalVisible2);
          }}
        >
          <Placeorder
            productToBeShown={haveToEditProduct}
            placeorder={placeOrderHandler}
            onClose={closeEditOverlayHandler}
            onThemeChange={themePrice}
            onThemeNameChange={themeNameHandler}
          />
        </Modal>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Cart;
