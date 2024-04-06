import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import DisplayThemes from "../AdminComponents/Displaythemes";
export default function Adminthemes() {
  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "white" }}>
        <DisplayThemes />
      </ScrollView>
    </SafeAreaView>
  );
}
