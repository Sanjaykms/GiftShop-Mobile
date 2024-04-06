import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

export const Backdrop = (props) => {
  return (
    <View style={styles.backdrop}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onClose}
        style={styles.backdrop}
      ></TouchableOpacity>
    </View>
  );
};
const Overlay = (props) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const { product } = props;
  const handlePressIn = () => {
    setIsPressed(true);
  };
  const handlePressOut = () => {
    setIsPressed(false);
  };
  const handlePressIn2 = () => {
    setIsPressed2(true);
  };
  const handlePressOut2 = () => {
    setIsPressed2(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Gift</Text>
      <View style={styles.start}>
        <View style={styles.imageDiv}>
          <Image source={{ uri: product.url }} style={styles.img} />
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsText}>
            Gift name: {product.productName}
          </Text>
          <Text style={styles.detailsText}>Quantiy: {product.quantity}ps</Text>
          <Text style={styles.detailsText}>
            Total price: ${product.totalAmount}
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={props.onDecrement}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.Butt, isPressed && styles.ButtClick]}
        >
          <Text style={[styles.ButtText, isPressed && styles.ButtTextClick]}>
            -
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onIncrement}
          onPressIn={handlePressIn2}
          onPressOut={handlePressOut2}
          style={[styles.Butt, isPressed2 && styles.ButtClick]}
        >
          <Text style={[styles.ButtText, isPressed2 && styles.ButtTextClick]}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.end}>
        <TouchableOpacity onPress={props.onClose} style={styles.close}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onSave} style={styles.save}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ModalOverlay = (props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Backdrop onClose={props.onClose} />
      <Overlay
        product={props.productToBeShown}
        onIncrement={props.onIncrement}
        onClose={props.onClose}
        onSave={props.onSave}
        onDecrement={props.onDecrement}
        imageUrl={props.imageUrl}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    zIndex: 99,
    borderRadius: 8,
    // marginTop: 200,
    marginTop: "auto",
    marginLeft: "auto",
    marginBottom: "auto",
    marginRight: "auto",
  },
  header: {
    backgroundColor: "#0d6efd",
    color: "white",
    fontWeight: "bold",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    fontSize: 14,
    padding: 10,
  },
  start: {
    alignItems: "center",
    justifyContent: "space-evenly",
    columnGap: 10,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  end: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 20,
    paddingBottom: 10,
  },
  imageDiv: {},
  img: {
    width: 100,
    height: 100,
  },
  details: { flexWrap: "wrap", rowGap: 5 },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 10,
    padding: 10,
  },
  Butt: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: "#0d6efd",
    borderWidth: 0.7,
    borderRadius: 8,
  },
  ButtText: { color: "#0d6efd" },
  ButtClick: {
    backgroundColor: "#0d6efd",
  },
  ButtTextClick: { color: "white" },
  detailsText: {
    fontSize: 10,
  },
  close: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  save: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderColor: "#0d6efd",
    borderRadius: 8,
    backgroundColor: "#0d6efd",
  },
  closeText: {
    fontSize: 10,
  },
  saveText: {
    fontSize: 10,
    color: "white",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.21)",
    zIndex: 2,
  },
});

export default ModalOverlay;
