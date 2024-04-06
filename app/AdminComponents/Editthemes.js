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
import { useThemeCxt } from "../../contexts/themes-context";
import { Backdrop } from "../ModelOverlay/ModelOverlay";

export default function EditPage({ item, onEditProduct }) {
  const themeCxt = useThemeCxt();
  const [editThemeName, setEditThemeName] = useState(item.themeName);
  const [editCost, setEditCost] = useState(item.price);
  const [editThemeDesc, setEditThemeDesc] = useState(item.themeDesc);
  const [modalVisible, setModalVisible] = useState(false);
  const onEdit = () => {
    const updatedProduct = {
      id: item.id,
      themeName: editThemeName,
      price: editCost,
      themeDesc: editThemeDesc,
    };
    themeCxt.themeDispatchFn({
      type: "EDIT_PRODUCT",
      value: updatedProduct,
    });
    setModalVisible(false);
    alert("Theme deatails edited successfully!");
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
            <Text style={styles.modalTitle}>Edit Theme</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the theme name"
              defaultValue={item.themeName}
              onChangeText={(text) => setEditThemeName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter the Theme price"
              defaultValue={item.price}
              onChangeText={(text) => setEditCost(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter the theme description"
              defaultValue={item.themeDesc}
              onChangeText={(text) => setEditThemeDesc(text)}
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
