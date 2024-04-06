import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
const Card = (props) => {
  return (

    <ScrollView style={{ ...styles.cardS, ...props.style }}>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardS: {
    marginTop: 50,
    padding: 5,
    marginLeft: "auto",
    marginRight: "auto",
    // alignItems: "center",
    // alignContent: "center",
    // justifyContent: "center",
    textAlign: "center",
    borderRadius: 8,
    width: "90%",
    // height: 100,
    shadowColor: "grey",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
});

export default Card;
