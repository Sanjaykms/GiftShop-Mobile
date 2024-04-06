import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";

const Display = (props) => {
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerDiv}>
          <Text style={styles.Intext}>Gift Name</Text>
        </View>
        <View style={styles.headerDiv}>
          <Text style={styles.Intext}>Quantity</Text>
        </View>
        {props.themeInd !== undefined && (
          <View style={styles.headerDiv}>
            <Text style={styles.Intext}>Theme</Text>
          </View>
        )}
        <View style={styles.headerDiv}>
          <Text style={styles.Intext}>Price</Text>
        </View>
        <View style={styles.headerDiv}>
          <Text style={styles.Intext}>Options</Text>
        </View>
      </View>
      <View>{props.items}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add your card styles here
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#dedede",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#0D6EFD",
    borderRadius: 8,
    // borderTopRightRadius: 8,
  },
  Intext: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  headerDiv: {
    flex: 1,
    alignItems: "center",
  },
});

export default Display;
