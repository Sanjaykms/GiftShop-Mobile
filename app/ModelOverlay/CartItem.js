import React from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you have Ionicons installed

const CartItem = (props) => {
  const qty = <Text style={styles.contentText}>{`${props.quantity} ps`}</Text>;
  const them =
    props.themeName !== undefined &&
    (props.themeName === "" || props.themeName === "0" ? (
      <Text style={styles.contentText}>No Theme</Text>
    ) : (
      <Text style={styles.contentText}>
        {props.themeName + "\n\n        $" + props.themePrice}
      </Text>
    ));

  const proPrice =
    props.price == undefined ? (
      <Text style={styles.contentText}>{props.productName}</Text>
    ) : (
      <Text style={styles.contentText}>
        {props.productName + "\n\n      $" + props.price}
      </Text>
    );

  return (
    <View style={styles.itemContainer}>
      {proPrice}
      {qty}
      {them}
      <Text style={styles.contentText}>${props.totalAmount}</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() => {
            if (props?.place === "cart") {
              props.onOpen(props.cartItemId);
            } else {
              props.onOpen(props.orderId);
            }
          }}
        >
          <Ionicons name="create" size={16} color="#0D6EFD" />
        </TouchableOpacity>
        {props?.place === "cart" ? (
          <TouchableOpacity
            onPress={() => {
              props.onDelete(props.cartItemId);
            }}
          >
            <Ionicons name="trash" size={16} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonSOrder}
            onPress={() => {
              props.onCancel(props.orderId, props.giftId, props.quantity);
            }}
          >
            <Text style={styles.buttonText}>Cancel Order</Text>
          </TouchableOpacity>
        )}
        {props?.place === "cart" && (
          <TouchableOpacity
            style={styles.buttonS}
            onPress={() => props.onPlaceOrder(props.cartItemId)}
          >
            <Text style={styles.buttonText}>Add Theme</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
  },
  iconsContainer: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
  buttonS: {
    backgroundColor: "#0D6EFD",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonSOrder: {
    backgroundColor: "#ff4d4d",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 8,
  },
  contentText: {
    fontSize: 10,
  },
});

export default CartItem;
