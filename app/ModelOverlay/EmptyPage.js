import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const EmptyPage = (props) => {
  return (
    <View style={styles.card}>
      <Text>{props.message}</Text>
      {props.add !== "NIL" && (
        <TouchableOpacity onPress={props.onClick} style={styles.button}>
          <Text style={styles.btnText}>{props.btnText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // Add your card styles here
    marginVertical: 100,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    padding: 20,
    alignItems: "center",
  },
  button: {
    // Add your button styles here
    marginTop: 10,
    padding: 10,
    backgroundColor: "#0D6EFD",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  btnText: {
    color: "white",
  },
});

export default EmptyPage;
