import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useProductsCxt } from "../../contexts/products-context";
import useGenerateId from "../Hooks/generate-id";
import { Backdrop } from "../ModelOverlay/ModelOverlay";

function AddItem(props) {
  const productsCxt = useProductsCxt();
  const generateId = useGenerateId();
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [giftDetails, setGiftDetails] = useState("");

  const submit = () => {
    if (
      image !== "" &&
      productName !== "" &&
      cost !== "" &&
      quantity !== "" &&
      giftDetails !== ""
    ) {
      const newProduct = {
        giftId: generateId("P"),
        url: image,
        productName: productName,
        price: cost,
        giftDetails: giftDetails,
        quantity: quantity,
      };

      productsCxt.productsDispatchFn({
        type: "ADD_PRODUCT",
        value: newProduct,
      });

      setImage("");
      setProductName("");
      setCost("");
      setQuantity("");
      setGiftDetails("");
      props.onClose();
    } else {
      Alert.alert("Enter", "All details");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Gifts</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the gift name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter the gift price"
        value={cost}
        onChangeText={(text) => setCost(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter the gift image url"
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter the gift quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter the gift gift details"
        value={giftDetails}
        onChangeText={(text) => setGiftDetails(text)}
      />
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

export const Addgifts = (props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Backdrop onClose={props.onClose} />
      <AddItem onClose={props.onClose} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    zIndex: 99,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: "auto",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 30,
    fontSize: 10,
    borderColor: "gray",
    borderWidth: 0.8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#0D6EFD",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
