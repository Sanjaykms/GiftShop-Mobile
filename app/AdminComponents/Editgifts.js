import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useProductsCxt } from "../../contexts/products-context";
import { Backdrop } from "../ModelOverlay/ModelOverlay";

export default function EditPage({ item, onEditProduct }) {
  const productsCxt = useProductsCxt();
  const [editImage, setEditImage] = useState(item.url);
  const [editProductName, setEditProductName] = useState(item.productName);
  const [editCost, setEditCost] = useState(item.price);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [giftDetails, setGiftDetails] = useState(item.giftDetails);
  const [modalVisible, setModalVisible] = useState(false);

  const onEdit = () => {
    const updatedProduct = {
      giftId: item.giftId,
      url: editImage,
      productName: editProductName,
      price: editCost,
      quantity: editQuantity,
      giftDetails: giftDetails,
    };
    productsCxt.productsDispatchFn({
      type: "EDIT_PRODUCT",
      value: updatedProduct,
    });
    setModalVisible(false);
    alert("Product details edited successfully!");
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <MaterialIcons name="edit" color="blue" style={styles.editIcon} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Backdrop onClose={() => setModalVisible(false)} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the product name"
              defaultValue={item.productName}
              onChangeText={(text) => setEditProductName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter the product price"
              defaultValue={item.price}
              onChangeText={(text) => setEditCost(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter the product image url"
              defaultValue={item.url}
              onChangeText={(text) => setEditImage(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter the product quantity"
              defaultValue={item.quantity}
              onChangeText={(text) => setEditQuantity(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter the Gift details"
              defaultValue={item.giftDetails}
              onChangeText={(text) => setGiftDetails(text)}
            />
            <TouchableOpacity style={styles.saveButton} onPress={onEdit}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  editIcon: {
    fontSize: 16,
    color: "#0d6efd",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    zIndex: 99,
    width: "80%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 0.8,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: "#32CD32",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
