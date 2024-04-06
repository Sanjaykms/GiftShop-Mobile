import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Review = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.contain}>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
          {props.userName}
        </Text>
        <Text style={{ fontSize: 12 }}>{props.comment}</Text>
      </View>

      <View style={styles.buttonsContain}>
        {props.isNeed && (
          <TouchableOpacity
            onPress={() => props.onEdit(props.reviewItem)}
            style={styles.buttons}
          >
            <MaterialCommunityIcons name="pencil" size={14} color="#0D6EFD" />
          </TouchableOpacity>
        )}
        {props.isNeed && (
          <TouchableOpacity
            onPress={() => props.onDelete(props.reviewId)}
            style={styles.buttons}
          >
            <MaterialCommunityIcons name="delete" size={14} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttons: {
    marginHorizontal: 5,
  },
  contain: {
    width: "75%",
  },
  buttonsContain: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
