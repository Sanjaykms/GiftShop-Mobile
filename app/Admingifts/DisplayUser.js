import React, { Fragment, useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import EmptyPage from "../ModelOverlay/EmptyPage";
import UserItem from "../AdminComponents/UserItem";
import EditUser from "../AdminComponents/EditUser";
import { useUserCxt } from "../../contexts/user-context";

const DisplayUser = () => {
  const userCxt = useUserCxt();
  const [enteredValue, setEnteredValue] = useState("");
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  let element;

  const editHandler = (userId) => {
    const tempUser = userCxt.usersList.find((item) => {
      return userId === item.userId;
    });
    setUser(tempUser);
    setModalVisible(true);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  const deleteHandler = (userId) => {
    Alert.alert("Delete!", "Do you want to delete this User?", [
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
        userCxt.userDispatchFn({ type: "DELETE_USER", value: userId });
        Alert.alert("Deleted", "User deleted successfully");
      }
    };
  };

  const usersList = userCxt.usersList
    .filter((item) => {
      return item.userName.includes(enteredValue) && item.role !== "admin";
    })
    .map((item, index) => {
      return (
        <View key={index + 1} style={styles.userItemContainer}>
          <UserItem user={item} onDelete={deleteHandler} onEdit={editHandler} />
        </View>
      );
    });

  if (usersList.length > 0) {
    element = usersList;
  } else {
    element = <EmptyPage message="No users found" add="NIL" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {element}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <EditUser onClose={closeHandler} user={user} />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Light gray background
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  userItemContainer: {
    marginBottom: 20,
  },
});

export default DisplayUser;
