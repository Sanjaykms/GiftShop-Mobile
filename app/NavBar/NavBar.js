import { Stack } from "expo-router";
import { Button, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuthCxt } from "../../contexts/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { useRefreshCxt } from "../HomepageComponent/refreshProvider";
export default function NavBar() {
  const router = useRouter();
  const authCxt = useAuthCxt();
  const { OnRefresh } = useRefreshCxt();
  const refr = useRefreshCxt();

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0D6EFD",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
          headerTitle: "Giftshop",
          headerTitleAlign: "center",
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: "white",
                  borderRadius: 20,
                }}
                onPress={refr.onRefresh}
              >
                <Ionicons name="refresh" size={16} color="#0D6EFD" />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            if (authCxt.isLogged) {
              return (
                <TouchableOpacity
                  title="Logout"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 7,
                    paddingHorizontal: 7,
                    borderRadius: 4,
                    elevation: 8,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 8,
                    backgroundColor: "#0D6EFD",
                    borderRadius: 25,
                  }}
                  onPress={() => {
                    authCxt.logoutHandler();
                    router.replace("login");
                  }}
                >
                  <Ionicons
                    name="log-out"
                    color="black"
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  />
                </TouchableOpacity>
              );
            }
            return null;
          },
        }}
      />
    </>
  );
}
