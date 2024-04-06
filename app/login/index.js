import { Link, router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import { useNetworkCxt } from "../../contexts/NetworkCheck";
import { useRouter } from "expo-router";
import { useUserCxt } from "../../contexts/user-context";
import { useAuthCxt } from "../../contexts/auth-context";
import { useRoute } from "@react-navigation/native";
// import { useRefreshCxt } from "../Homepage/refreshProvider";
export default function Login() {
  // const refreshCxt = useRefreshCxt();
  const netContext = useNetworkCxt();
  const route = useRoute();
  const [loginVal, setLoginVal] = useState({ username: "", password: "" });
  const router = useRouter();
  const [isError, setisError] = useState(false);
  const { usersList, userDispatchFn } = useUserCxt();
  const authCxt = useAuthCxt();

  const handleLogin = () => {
    setisError(false);
    if (loginVal.username == "" || loginVal.password == "") {
      setisError(true);
      return;
    } else {
      const tempUser = {
        ...usersList.find((user) => {
          return loginVal.username === user.email;
        }),
      };
      if (loginVal.password === tempUser.password) {
        authCxt.loginHandler(tempUser.userId, tempUser.role);
        if (tempUser.role === "admin") {
          router.push("../Admingifts/Adminstartgifts");
        } else {
          router.push("../Homepage/ProductList");
        }
        setLoginVal({ username: "", password: "" });
      } else {
        Alert.alert("Error", "Username or password is wrong", [{ text: "OK" }]);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {netContext.isConnected ? (
        <ScrollView
          contentContainerStyle={styles.main}
          // refreshControl={refreshCxt.RefreshControl}
        >
          <Text style={styles.login}>Login</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={loginVal.username}
              onChangeText={(text) =>
                setLoginVal({ ...loginVal, username: text })
              }
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              value={loginVal.password}
              onChangeText={(text) =>
                setLoginVal({ ...loginVal, password: text })
              }
              secureTextEntry
            />
          </View>
          {isError && (
            <View style={styles.error}>
              <Text style={styles.errorText}>
                <Text style={styles.errorBold}>Error!</Text> Please fill all the
                input feilds
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.searchBtn} onPress={handleLogin}>
            <Text style={styles.searchText}>Login</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.newuser}>New User?</Text>
            <TouchableOpacity style={styles.signupBtn}>
              <Link href={{ pathname: "signup" }} style={styles.signupText}>
                Signup
              </Link>
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
  login: {
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
  error: {
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
