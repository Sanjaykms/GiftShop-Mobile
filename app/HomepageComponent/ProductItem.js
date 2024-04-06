import { useRouter } from "expo-router";
import React, { Fragment } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
export function ProductItem(props) {
  const router = useRouter();
  const { product } = props;
  const viewProductHandler = (productId) => {
    router.push(`./${productId}`);
  };
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.img}
              source={{
                uri: product.url,
              }}
            />
          </View>
          <View style={styles.productContain}>
            <Text style={styles.productName}>{product.productName}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          <View style={styles.ButtonContain}>
            <TouchableOpacity
              onPress={() => viewProductHandler(product.giftId)}
            >
              <Text style={styles.textColor}>View Gift</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 24,
    width: 150,
    flexDirection: "row",
  },
  img: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 13,
    backgroundColor: "#0D6EFD",
  },
  imageContainer: {
    height: 150,
    width: 150,
    alignItems: "center",
  },
  productContain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
    justifyContent: "center",
    columnGap: 10,
    padding: 5,
    marginVertical: 5,
  },
  ButtonContain: {
    backgroundColor: "#3F8BFD",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  textColor: {
    color: "white",
    fontSize: 10,
  },
  productName: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    flexShrink: 1,
  },
  price: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
