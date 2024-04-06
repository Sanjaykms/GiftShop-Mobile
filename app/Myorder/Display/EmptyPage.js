import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Card from "../../ModelOverlay/Card";
const EmptyPage = (props) => {
  return (
    <Card>
      <Text style={styles.message}>{props.message}</Text>
      {props.add !== "NIL" ? (
        <TouchableOpacity onPress={props.onClick}>
          <Text>{props.btnText}</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
    </Card>
  );
};
export default EmptyPage;

const styles = StyleSheet.create({
  message: {},
});
