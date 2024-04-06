import { ProductItem } from "../HomepageComponent/ProductItem";
import { useCartCxt } from "../../contexts/cart-context";
import { useProductsCxt } from "../../contexts/products-context";
import EmptyPage from "../Myorder/Display/EmptyPage";
import { ScrollView, StyleSheet, View } from "react-native";
import { BackHandler } from "react-native";
import { useRouter } from "expo-router";
import { useAuthCxt } from "../../contexts/auth-context";
import React from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
function ProductList() {
  const route = useRoute();
  const authCxt = useAuthCxt();
  const router = useRouter();
  const cartCxt = useCartCxt();
  const productsCxt = useProductsCxt();
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (route.name === "ProductList") {
          authCxt.logoutHandler();
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove(); // Remove the event listener when the component is unmounted
    }, [authCxt.logoutHandler, route.name])
  );

  let element;
  let clname;
  const productsList = productsCxt.productsList.map((product, index) => {
    return (
      <ProductItem
        key={`grid${index * new Date().getTime()}`}
        id={`grid${index}`}
        product={product}
        onClick={cartCxt.cartDispatchFn}
      />
    );
  });
  if (productsList.length > 0) {
    element = productsList;
    // clname = classes.container;
  } else {
    clname = "";
    element = <EmptyPage message="No Products Found" />;
  }
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={styles.container}>{element}</View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
}
export default ProductList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
