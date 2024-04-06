import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Backdrop } from "../ModelOverlay/ModelOverlay";
import { useUserCxt } from "../../contexts/user-context";
import Card from "../ModelOverlay/Card";
import userIcon from "../../images/UserPicture.png";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Overlay = (props) => {
  const [user, setUser] = useState(props.user);
  const userCxt = useUserCxt();

  const changeHandler = (name, value) => {
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateUsername = () => {
    if (user.userName.length < 3) {
      Alert.alert(
        "Validation Error",
        "Username must be at least 3 characters long."
      );
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const saveHandler = () => {
    if (validateUsername() && validateEmail()) {
      userCxt.userDispatchFn({ type: "EDIT_USER", value: user });
      props.onClose();
    }
  };

  return (
    <Card style={styles.container}>
      <View style={styles.imgDiv}>
        <Image source={userIcon} style={styles.userIcon} />
      </View>
      <View style={styles.label}>
        <Text style={styles.labelText}>Username :</Text>
        <TextInput
          name="userName"
          value={user.userName}
          onChangeText={(text) => changeHandler("userName", text)}
          style={styles.inputElement}
        />
      </View>
      <View style={styles.label}>
        <Text style={styles.labelText}>Email-Id :</Text>
        <TextInput
          value={user.email}
          onChangeText={(text) => changeHandler("email", text)}
          style={styles.inputElement}
        />
      </View>
      <View style={styles.label}>
        <Text style={styles.labelText}>Mobile number :</Text>
        <TextInput
          value={user.mobileNumber}
          onChangeText={(text) => changeHandler("mobileNumber", text)}
          style={styles.inputElement}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.close} onPress={props.onClose}>
          <Text style={styles.ButtText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.save} onPress={saveHandler}>
          <Text style={styles.ButtText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

// Rest of the component remains unchanged

function EditUser(props) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Backdrop onClose={props.onClose} />
        <Overlay onClose={props.onClose} user={props.user} />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

// Update your styles in the StyleSheet.create block
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // Light gray background
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    zIndex: 99, // Add a subtle shadow for depth
    width: "80%",
    maxHeight: 450,
    marginTop: "auto",
    marginBottom: "auto",
    overflow: "scroll",
  },
  imgDiv: {
    alignItems: "center",
    marginBottom: 20,
  },
  userIcon: {
    width: 100,
    height: 100,
    borderRadius: 60, // Make the image circular
    borderWidth: 3,
    borderColor: "#0d6efd",
  },
  label: {
    marginVertical: 10,
  },
  inputElement: {
    backgroundColor: "#f0f0f0", // Light background for text input
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 10,
  },
  labelText: {
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  close: {
    backgroundColor: "#e74c3c", // Red color for Cancel button
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  save: {
    backgroundColor: "#2ecc71", // Green color for Save button
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  ButtText: {
    fontSize: 10,
    color: "#fff", // White text for button labels
  },
});
export default EditUser;
