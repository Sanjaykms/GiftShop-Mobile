import {
  SafeAreaView,
  ScrollView,
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import React from "react";
import Displaygifts from "../AdminComponents/Displaygifts";
import { BackHandler } from "react-native";
import { useRouter } from "expo-router";
import { useAuthCxt } from "../../contexts/auth-context";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

export default function Admingifts() {
  const navigation = useNavigation();
  const route = useRoute();
  const authCxt = useAuthCxt();
  const router = useRouter();
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (route.name === "Adminstartgifts") {
          authCxt.logoutHandler();
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove(); // Remove the event listener when the component is unmounted
    }, [authCxt.logoutHandler, route.name])
  );
  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "white" }}>
        <Displaygifts />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addgiftsWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  addgiftsButt: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: "#0d6efd",
    borderWidth: 0.8,
    borderRadius: 8,
  },
  addgiftsButtText: {
    color: "#0d6efd",
  },
});
