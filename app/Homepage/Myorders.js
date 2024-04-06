import { Alert, ScrollView, Text, View, Modal } from "react-native";
import React, { useState, Fragment, useEffect } from "react";
import Display from "../ModelOverlay/Display";
import CartItem from "../ModelOverlay/CartItem";
import ModalOverlay from "../ModelOverlay/ModelOverlay";
import { useMyOrdersCxt } from "../../contexts/myorders-context";
import EmptyPage from "../ModelOverlay/EmptyPage";
import { useProductsCxt } from "../../contexts/products-context";
import { useAuthCxt } from "../../contexts/auth-context";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function Myorders() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const myordersCxt = useMyOrdersCxt();
  const productsCxt = useProductsCxt();
  const { productsList } = productsCxt;
  const authCxt = useAuthCxt();
  const [haveToEditProduct, setHaveToEditProduct] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const { orderItems } = myordersCxt;
  const [orderID, setOrderID] = useState(0);
  let element;
  const findTotalAmount = (quantity, price, themePrice) => {
    return (quantity * price + themePrice * quantity).toFixed(2);
  };

  const findProduct = (productId) => {
    return {
      ...productsList.find((item) => {
        return productId === item.giftId;
      }),
    };
  };
  const openEditOverlayHandler = (orderId) => {
    const tempProduct = {
      ...orderItems.find((item) => {
        return orderId === item.orderId;
      }),
    };
    const product = {
      ...productsList.find((item) => {
        return item.giftId === tempProduct.giftId;
      }),
    };
    setOrderID(tempProduct.quantity);
    setHaveToEditProduct(tempProduct);
    setImageUrl(product.url);
    // navigate(`/MyOrders/${orderId}`);
    setModalVisible(true);
  };

  const closeEditOverlayHandler = () => {
    // navigate("/MyOrders");
    setModalVisible(false);
  };

  const removeHandler = (orderId, giftId, quantity) => {
    Alert.alert("Cancel the order?", "If yes then Click 'Ok'", [
      {
        text: "Cancel",
        onPress: () => {
          handleChoice("cancel");
        },
      },
      {
        text: "Ok",
        onPress: () => {
          handleChoice("ok");
        },
      },
    ]);
    const handleChoice = (choice) => {
      if (choice !== "ok") {
        return;
      }
      myordersCxt.myordersDispatchFn({
        type: "CANCEL_ORDER",
        value: orderId,
      });
      const product = findProduct(giftId);
      product.quantity = String(Number(product.quantity) + quantity);
      productsCxt.productsDispatchFn({
        type: "EDIT_PRODUCT",
        value: product,
      });
      setTimeout(() => {
        alert("Your order canceled successfully :) ");
      }, 400);
    };
  };

  const increceProductQuantity = () => {
    const tempProduct = { ...haveToEditProduct };
    const exsistedProduct = {
      ...productsCxt.productsList.find((item) => {
        return tempProduct.giftId === item.giftId;
      }),
    };
    tempProduct.quantity += 1;
    tempProduct.totalAmount = findTotalAmount(
      tempProduct.quantity,
      tempProduct.price,
      parseFloat(tempProduct.themePrice)
    );
    setHaveToEditProduct(tempProduct);
  };

  const decreceProductQuantity = () => {
    const tempProduct = { ...haveToEditProduct };
    if (tempProduct.quantity > 1) {
      tempProduct.quantity -= 1;
      tempProduct.totalAmount = findTotalAmount(
        tempProduct.quantity,
        tempProduct.price,
        parseFloat(tempProduct.themePrice)
      );
      setHaveToEditProduct(tempProduct);
    } else {
      removeHandler(tempProduct.orderId, tempProduct.giftId, orderID);
      closeEditOverlayHandler();
    }
  };

  const saveHandler = () => {
    const product = {
      ...productsList.find((item) => {
        return item.giftId === haveToEditProduct.giftId;
      }),
    };
    product.quantity =
      parseInt(product.quantity) + (orderID - haveToEditProduct.quantity);
    if (product.quantity < 0) {
      alert("Not more sufficient stocks are available :<");
      return;
    }
    myordersCxt.myordersDispatchFn({
      type: "UPDATE_ORDER",
      value: haveToEditProduct,
    });
    productsCxt.productsDispatchFn({
      type: "EDIT_PRODUCT",
      value: product,
    });
    //alert(orderID+" "+haveToEditProduct.quantity+" "+product.quantity+"  last+>"+parseInt(product.quantity)+(orderID-haveToEditProduct.quantity));
    closeEditOverlayHandler();
  };

  const items = orderItems
    .filter((item) => {
      return item.userId === authCxt.userInfo.userId;
    })
    .map((item, index) => {
      return (
        <ScrollView
          key={`product${index + 1}`}
          style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
        >
          <CartItem
            orderId={item.orderId}
            giftId={item.giftId}
            productName={item.productName}
            totalAmount={item.totalAmount}
            price={item.price}
            quantity={item.quantity}
            themeName={item.themeName}
            themePrice={item.themePrice}
            onOpen={openEditOverlayHandler}
            onCancel={removeHandler}
          />
        </ScrollView>
      );
    });

  const gotoCartHandler = () => {
    router.replace("./Carts");
  };

  if (items.length > 0) {
    element = <Display items={items} themeInd={1} />;
  } else {
    element = (
      <EmptyPage
        message="No Orders Found :("
        btnText="Go to Cart"
        onClick={gotoCartHandler}
        hasNeed={true}
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
            onIncrement={increceProductQuantity}
            onClose={closeEditOverlayHandler}
            onSave={saveHandler}
            imageUrl={imageUrl}
            onDecrement={decreceProductQuantity}
          />
        </Modal>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
