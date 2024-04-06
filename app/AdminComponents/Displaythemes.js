import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { useThemeCxt } from "../../contexts/themes-context";
import EmptyPage from "../ModelOverlay/EmptyPage";
import { MaterialIcons } from "@expo/vector-icons";
import { AddThemes } from "./Addthemes";
import EditPage from "./Editthemes";

const DisplayThemes = ({ navigation }) => {
  const themeCxt = useThemeCxt();
  const [enteredValue, setEnteredValue] = useState("");
  const themeList = themeCxt.themeList.filter((item) => {
    return item.themeName.toLowerCase().includes(enteredValue.toLowerCase());
  });

  const deleteThemeHandler = (productId) => {
    Alert.alert("Delete!", "Do you want to delete this theme?", [
      {
        text: "Cancel",
        onPress: () => {
          handleChoice("No");
        },
      },
      {
        text: "Ok",
        onPress: () => {
          handleChoice("YES");
        },
      },
    ]);

    const handleChoice = (choice) => {
      if (choice === "YES") {
        themeCxt.themeDispatchFn({
          type: "DELETE_PRODUCT",
          value: productId,
        });
        Alert.alert("Deleted", "Theme deleted successfully");
      }
    };
  };
  const TableData = (props) => {
    return props.data.map((item) => (
      <View key={item.id} style={styles.rowContainer}>
        <Text style={styles.tableData}>{item.themeName}</Text>
        <Text style={styles.tableData}>${item.price}</Text>
        <Text style={styles.tableData}>{item.themeDesc}</Text>
        <TouchableOpacity>
          <EditPage item={item} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.onDelete(item.id)}>
          <MaterialIcons name="delete" style={styles.deleteIcon} color="red" />
        </TouchableOpacity>
      </View>
    ));
  };
  let element;
  if (themeCxt.themeList.length > 0) {
    const [modalVisible, setModalVisible] = useState(false);
    element = (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Type here to seach theme"
            onChangeText={(text) => setEnteredValue(text)}
            style={{
              fontSize: 12,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderBottomWidth: 0.8,
            }}
          />
        </View>
        <View style={styles.headerTable}>
          <Text style={styles.tableHead}>Theme Name</Text>
          <Text style={styles.tableHead}>Cost</Text>
          <Text style={styles.tableHead}>Theme Des</Text>
          <Text style={styles.tableHead}>Edit</Text>
          <Text style={styles.tableHead}>Delete</Text>
        </View>
        <TableData data={themeList} onDelete={deleteThemeHandler} />
        <View style={styles.addgiftsWrapper}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.addgiftsButt}
          >
            <Text style={styles.addgiftsButtText}>+</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <AddThemes onClose={() => setModalVisible(false)} />
        </Modal>
      </View>
    );
  } else {
    element = <EmptyPage message="No Products Found" add="NIL" />;
  }

  return <View>{element}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    marginBottom: "100%",
    marginTop: 50,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "#0D6EFD",
    borderRadius: 8,
  },
  headerTable: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#0D6EFD",
    paddingHorizontal: 10,
    // borderTopLeftRadius: 6,
    // borderTopRightRadius: 6,
    flexShrink: 1,
    height: 40,
  },
  rowContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "cover",
    borderRadius: 5,
  },
  tableHead: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "white",
  },
  tableData: {
    fontSize: 10,
    paddingVertical: 10,
    flexWrap: "wrap",
    maxWidth: 80,
  },
  editText: {
    fontSize: 10,
    color: "blue",
    paddingVertical: 10,
  },
  deleteIcon: {
    fontSize: 16,
  },
  addgiftsWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 15,
  },
  addgiftsButt: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: "#0d6efd",
    borderWidth: 0.8,
    borderRadius: 8,
  },
  addgiftsButtText: {
    color: "#0d6efd",
    fontSize: 12,
  },
});

export default DisplayThemes;
