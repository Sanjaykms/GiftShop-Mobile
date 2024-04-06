import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useUserCxt } from "../../contexts/user-context";
import useGenerateId from "../Hooks/generate-id";
import { useNetworkCxt } from "../../contexts/NetworkCheck";
export default function signup() {
  const router = useRouter();
  const { usersList, userDispatchFn } = useUserCxt();
  const generateId = useGenerateId();
  const netContext = useNetworkCxt();
  const [signupVal, setSignupVal] = useState({
    email: "",
    userName: "",
    mobileNumber: "",
    password: "",
    confirmpassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    userName: "",
    mobileNumber: "",
    password: "",
    confirmpassword: "",
  });
  const createUserObj = (value) => {
    const tempUser = {};
    tempUser.userId = generateId("USER");
    tempUser.email = value.email;
    tempUser.userName = value.userName;
    tempUser.mobileNumber = value.mobileNumber;
    tempUser.password = value.password;
    tempUser.active = true;
    tempUser.role = "customer";
    return tempUser;
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.userName) {
      errors.userName = "userName is required!";
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = "Mobilenumber is required!";
    } else if (values.mobileNumber.length < 10) {
      errors.mobileNumber = "Mobilenumber is not Valid !";
    } else if (values.mobileNumber.length > 10) {
      errors.mobileNumber = "Mobilenumber is not Valid !";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Confirm Password is required!";
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "Password missmatch!";
    }
    return errors;
  };
  const handleSignUp = () => {
    const errs = validate(signupVal);
    const errsKey = Object.keys(errs);
    if (errsKey.length === 0) {
      userDispatchFn({
        type: "ADD_USER",
        value: createUserObj(signupVal),
      });
      setSignupVal({
        email: "",
        userName: "",
        mobileNumber: "",
        password: "",
        confirmpassword: "",
      });
      router.push("../login");
    } else {
      setFormErrors(errs);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {netContext.isConnected ? (
        <ScrollView contentContainerStyle={styles.main}>
          <Text style={styles.register}>Register</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={signupVal.email}
              onChangeText={(text) =>
                setSignupVal({ ...signupVal, email: text })
              }
            />
          </View>
          {formErrors.email != "" && formErrors.email != null && (
            <Text style={styles.errorText}>{formErrors.email}</Text>
          )}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter userName"
              value={signupVal.userName}
              onChangeText={(text) =>
                setSignupVal({ ...signupVal, userName: text })
              }
            />
          </View>
          {formErrors.userName != "" && formErrors.userName != null && (
            <Text style={styles.errorText}>{formErrors.userName}</Text>
          )}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobilenumber"
              keyboardType="numeric"
              value={signupVal.mobileNumber}
              onChangeText={(text) =>
                setSignupVal({ ...signupVal, mobileNumber: text })
              }
            />
          </View>
          {formErrors.mobileNumber != "" && formErrors.mobileNumber != null && (
            <Text style={styles.errorText}>{formErrors.mobileNumber}</Text>
          )}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              secureTextEntry
              value={signupVal.password}
              onChangeText={(text) =>
                setSignupVal({ ...signupVal, password: text })
              }
            />
          </View>
          {formErrors.password != "" && formErrors.password != null && (
            <Text style={styles.errorText}>{formErrors.password}</Text>
          )}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={signupVal.confirmpassword}
              onChangeText={(text) =>
                setSignupVal({ ...signupVal, confirmpassword: text })
              }
            />
          </View>
          {formErrors.confirmpassword != "" &&
            formErrors.confirmpassword != null && (
              <Text style={styles.errorText}>{formErrors.confirmpassword}</Text>
            )}
          <TouchableOpacity style={styles.searchBtn} onPress={handleSignUp}>
            <Text style={styles.searchText}>Signup</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.newuser}>Already a user?</Text>
            <TouchableOpacity
              style={styles.signupBtn}
              onPress={() => router.back()}
            >
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noInternetContainer}>
          <Text style={styles.noInternetText}>
            Oops! No Internet Connection
          </Text>
          <Text style={styles.noInternetSubText}>
            It seems you're not connected to the internet. Check your network
            and try again.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => alert("Retry functionality")}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  main: {
    borderColor: "#0d6efd",
    padding: 20,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  register: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#0D6EFD",
    marginBottom: 10,
  },
  inputWrapper: {
    backgroundColor: "white",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  input: {
    height: 40,
    minWidth: 250,
    maxWidth: 500,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#0d6efd",
  },
  searchBtn: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#0d6efd",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  searchText: {
    color: "white",
  },
  signupBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#0d6efd",
  },
  newuser: {
    marginVertical: 5,
    textAlign: "center",
  },
  errorBold: {
    fontWeight: "900",
  },
  errorText: {
    color: "red",
  },
  noInternetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noInternetText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6347", // Tomato color
    marginBottom: 10,
  },
  noInternetSubText: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4CAF50", // Green color
    padding: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
