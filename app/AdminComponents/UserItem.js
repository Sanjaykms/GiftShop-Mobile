import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import userIcon from "../../images/UserPicture.png";

const UserItem = (props) => {
  const { user } = props;

  return (
    <View style={styles.userItemContainer}>
      <View style={styles.imgDiv}>
        <Image source={userIcon} style={styles.userIcon} />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user.userName}</Text>
        </View>
        <View>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View>
          <Text style={styles.label}>Mobile number:</Text>
          <Text style={styles.value}>{user.mobileNumber}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => props.onEdit(user.userId)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => props.onDelete(user.userId)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0", // Light gray border
  },
  imgDiv: {
    marginRight: 15,
  },
  userIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: "#333", // Dark gray text color
  },
  value: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#555", // Slightly lighter gray text color
  },
  footer: {
    flexDirection: "row",
  },
  edit: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#007bff", // Blue edit button
    borderRadius: 5,
  },
  delete: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#dc3545", // Red delete button
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff", // White text color for buttons
    fontSize: 10,
  },
});

export default UserItem;
