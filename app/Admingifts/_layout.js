import React from "react";
import { Tabs } from "expo-router";
import GiftIcon from "../../images/GiftIcon.png";
import OrdersIcon from "../../images/OrdersAdminIcon.png";
import ThemeIcon from "../../images/ThemeIcon.png";
import UserIcon from "../../images/UsersIcon.png";
import { Image } from "react-native";
import { useAuthCxt } from "../../contexts/auth-context";
import { useNetworkCxt } from "../../contexts/NetworkCheck";
import { useRouter } from "expo-router";
export default function Layout() {
  const netContext = useNetworkCxt();
  const route = useRouter();
  const authCxt = useAuthCxt();
  if (!netContext.isConnected) {
    authCxt.logoutHandler();
    route.back();
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="Adminstartgifts"
        options={{
          headerShown: false,
          title: "Gifts",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={GiftIcon}
              style={{ width: 25, height: 25, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Adminthemes"
        options={{
          headerShown: false,
          title: "Themes",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={ThemeIcon}
              style={{ width: 25, height: 25, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AdminOrders"
        options={{
          headerShown: false,
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={OrdersIcon}
              style={{ width: 25, height: 25, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="DisplayUser"
        options={{
          headerShown: false,
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={UserIcon}
              style={{ width: 25, height: 25, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
