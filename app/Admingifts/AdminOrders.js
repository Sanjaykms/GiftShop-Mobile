import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useMyOrdersCxt } from "../../contexts/myorders-context";
import { useUserCxt } from "../../contexts/user-context";
import { useProductsCxt } from "../../contexts/products-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmptyPage from "../ModelOverlay/EmptyPage";

export default function AdminOrders(props) {
  const ordersCxt = useMyOrdersCxt();
  const userCxt = useUserCxt();
  const productsCxt = useProductsCxt();

  const handleDelete = (orderId, giftId, quantity) => {
    // Implement your delete logic here
    console.log("Delete order with ID:", orderId);
    const tempProduct = productsCxt.productsList.find((item) => {
      return item.giftId == giftId;
    });
    if (!tempProduct) {
      console.error("Error: tempProduct is undefined or null");
      return;
    }
    // if (tempProduct) {
    tempProduct.quantity = parseFloat(tempProduct.quantity) + quantity + "";
    productsCxt.productsDispatchFn({
      type: "EDIT_PRODUCT",
      value: tempProduct,
    });
    // }
    ordersCxt.myordersDispatchFn({
      type: "CANCEL_ORDER",
      value: orderId,
    });
  };

  const renderRightActions = (progress, dragX, orderId, giftId, quantity) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 0.5, 1],
    });

    return (
      <View style={styles.rightAction}>
        <TouchableOpacity
          onPress={() => handleDelete(orderId, giftId, quantity)}
          style={[styles.deleteButton]}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      {ordersCxt.orderItems.length <= 0 ? (
        <EmptyPage message="No Orders Found" add="NIL" />
      ) : (
        ordersCxt.orderItems.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Gift Image</Text>
              <Text style={styles.headerText}>Order Id</Text>
              <Text style={styles.headerText}>User Id</Text>
              <Text style={styles.headerText}>Gift Name</Text>
              <Text style={styles.headerText}>Theme Name</Text>
              <Text style={styles.headerText}>Quantity</Text>
              <Text style={styles.headerText}>Total Price</Text>
            </View>
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightActions(
                  progress,
                  dragX,
                  item.orderId,
                  item.giftId,
                  item.quantity
                )
              }
              onSwipeableRightOpen={() => handleDelete(item.orderId)}
            >
              <TouchableOpacity style={styles.row}>
                <Image source={{ uri: item.url }} style={styles.image} />
                <Text style={styles.cell}>{item.orderId}</Text>
                <Text style={styles.cell}>
                  {
                    userCxt.usersList.find(
                      (item2) => item2.userId == item.userId
                    )?.userName
                  }
                </Text>
                <Text style={styles.cell}>
                  {item.productName + " - $" + item.price}
                </Text>
                <Text style={styles.cell}>
                  {item.themeName + " - $" + item.themePrice}
                </Text>
                <Text style={styles.cell}>{item.quantity}</Text>
                <Text style={styles.cell}>${item.totalAmount}</Text>
              </TouchableOpacity>
            </Swipeable>
          </View>
        ))
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 10,
    maxWidth: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 8,
    maxWidth: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  rightAction: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    flex: 1,
  },
  deleteButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontWeight: "600",
    padding: 20,
  },
});
