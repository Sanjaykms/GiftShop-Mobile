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
import { useThemeCxt } from "../../contexts/themes-context";
import useGenerateId from "../Hooks/generate-id";
import { Backdrop } from "../ModelOverlay/ModelOverlay";
function AddItem(props) {
  const themeCxt = useThemeCxt();
  const [themeName, setThemeName] = useState("");
  const [cost, setCost] = useState("");
  const [themeDesc, setThemeDesc] = useState("");
  const generateId = useGenerateId();
  const submit = () => {
    if (themeName !== "" && cost !== "" && themeDesc !== "") {
      const newProduct = {
        id: generateId("theme"),
        themeName: themeName,
        price: cost,
        themeDesc: themeDesc,
      };

      themeCxt.themeDispatchFn({ type: "ADD_PRODUCT", value: newProduct });

      setThemeName("");
      setCost("");
      setThemeDesc("");
      props.onClose();
    } else {
      Alert.alert("Enter", "All details");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Theme</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the Theme name"
        value={themeName}
        onChangeText={(text) => setThemeName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter the Theme price"
        value={cost}
        onChangeText={(text) => setCost(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter the theme description"
        value={themeDesc}
        onChangeText={(text) => setThemeDesc(text)}
      />
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

export const AddThemes = (props) => {
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
