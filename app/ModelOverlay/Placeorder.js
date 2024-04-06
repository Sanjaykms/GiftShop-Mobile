import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { useThemeCxt } from "../../contexts/themes-context";
export const Backdrop = (props) => {
  return (
    <View style={styles.backdrop}>
      <TouchableOpacity
        onPress={props.onClose}
        style={styles.backdrop}
      ></TouchableOpacity>
    </View>
  );
};
const OrderOverlay = (props) => {
  const themeCxt = useThemeCxt();
  const { productVal } = props;
  const [addTheme, setAddTheme] = useState("0");
  const [orderValues, setOrderValues] = useState({
    name: "",
    dateval: "",
    datevalError: "",
    address: "",
    phoneNo: "",
    orderDes: "",
    email: "",
    emailError: "",
  });
  const handleSubmit = () => {
    // Check if the required fields are filled before submitting
    if (!orderValues.name.trim()) {
      alert("Name is required");
      return;
    }
    if (!orderValues.dateval.trim()) {
      orderValues.datevalError = "Date is required";
    } else if (!validateDate(orderValues.dateval)) {
      orderValues.datevalError = "Enter a valid Date";
    } else {
      orderValues.datevalError = ""; // Reset error if email is valid
    }

    // Check if there are any errors before submitting
    if (orderValues.datevalError) {
      alert(orderValues.datevalError);
      return;
    }
    if (!orderValues.address.trim()) {
      alert("Address is required");
      return;
    }
    if (!orderValues.phoneNo.trim()) {
      alert("Phone number is required");
      return;
    }
    if (!orderValues.email.trim()) {
      orderValues.emailError = "Email is required";
    } else if (!validateEmail(orderValues.email)) {
      orderValues.emailError = "Enter a valid email address";
    } else {
      orderValues.emailError = ""; // Reset error if email is valid
    }

    // Check if there are any errors before submitting
    if (orderValues.emailError) {
      alert(orderValues.emailError);
      return;
    }
    if (!orderValues.orderDes.trim()) {
      alert("Order Description is required");
      return;
    }
    // Perform your form submission logic here
    // ...

    // Reset the form or navigate to the next screen
    // ...
    // setOrderValues({
    //   name: "",
    //   dateval: "",
    //   datevalError: "",
    //   address: "",
    //   phoneNo: "",
    //   orderDes: "",
    //   email: "",
    //   emailError: "",
    // });
    props.orderHandler();
  };
  const validateEmail = (input) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(input);
  };
  const validateDate = (input) => {
    // Basic email validation regex
    const emailRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return emailRegex.test(input);
  };
  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <Text style={styles.heading}>ENTER DETAILS</Text>
        <View style={styles.formContainer}>
          {/* ... Other input fields ... */}
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              onChangeText={(text) =>
                setOrderValues({ ...orderValues, name: text })
              }
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Date f: dd/mm/yyyy"
              type="date"
              onChangeText={(text) =>
                setOrderValues({ ...orderValues, dateval: text })
              }
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your Address"
              onChangeText={(text) =>
                setOrderValues({ ...orderValues, address: text })
              }
              required
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="numeric"
              onChangeText={(text) =>
                setOrderValues({ ...orderValues, phoneNo: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email id"
              onChangeText={(text) =>
                setOrderValues({ ...orderValues, email: text })
              }
              required
              inputMode="email"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Order description"
              required
              onChangeText={(text) =>
                setOrderValues({ ...orderValues, orderDes: text })
              }
            />
            <TextInput
              style={styles.input}
              value={productVal.productName}
              editable={false}
              selectTextOnFocus={false}
            />
            <TextInput
              style={styles.input}
              value={
                "$" +
                (parseFloat(productVal.totalAmount) +
                  parseFloat(addTheme) * productVal.quantity)
              }
              editable={false}
              selectTextOnFocus={false}
            />
            {/* ... Other input fields ... */}
            <ModalDropdown
              options={[
                "No Theme $0",
                ...themeCxt.themeList.map(
                  (item) => `${item.themeName} $${item.price}`
                ),
              ]}
              defaultIndex={0}
              defaultValue="Select theme"
              style={styles.selectInput}
              textStyle={{
                color: "grey",
                fontSize: 10,
                padding: 6.5,
                alignItems: "center",
                justifyContent: "center",
              }}
              dropdownStyle={styles.dropdownContainer}
              onSelect={(index, value) => {
                const selectedValue = value.split(" ");
                // Extract the price

                const newVal = parseFloat(
                  selectedValue[selectedValue.length - 1].substring(1)
                );
                props.onThemeHandler("" + newVal);
                // console.log(
                //   themeCxt.themeList.find(
                //     (theme) => parseFloat(theme.price) === newVal
                //   )?.themeName
                // );
                const nameTheme = themeCxt.themeList.find(
                  (theme) => parseFloat(theme.price) === newVal
                )?.themeName;
                if (nameTheme === undefined || nameTheme === "0") {
                  props.onThemeNameHandler("0");
                } else {
                  props.onThemeNameHandler(nameTheme);
                }
                setAddTheme(newVal);
              }}
            />
            {/* ... Other input fields ... */}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.placeOrderButton}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Place order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={props.onClose}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Placeorder = (props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Backdrop onClose={props.onClose} />
      <OrderOverlay
        productVal={props.productToBeShown}
        orderHandler={props.placeorder}
        onClose={props.onClose}
        onThemeHandler={props.onThemeChange}
        onThemeNameHandler={props.onThemeNameChange}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 400,
    zIndex: 99,
    borderRadius: 8,
    flexWrap: "wrap",
    marginTop: 200,
  },
  scrollView: {
    flex: 1,
    marginTop: 50,
  },
  heading: {
    marginBottom: 30,
    color: "#0D6EFD",
    textAlign: "center",
  },
  formContainer: {
    marginHorizontal: 20,
    flexWrap: "wrap",
    gap: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 0.8,
    marginBottom: 15,
    fontSize: 10,
    paddingHorizontal: 10,
  },
  selectInput: {
    marginBottom: 15,
    fontSize: 10,
    borderColor: "gray",
    borderWidth: 0.8,
    zIndex: 99,
    width: 140,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeOrderButton: {
    backgroundColor: "#0D6EFD",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 10,
  },
  closeButton: {
    backgroundColor: "#0D6EFD",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    fontSize: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.21)",
    zIndex: 2,
  },
});
export default Placeorder;
