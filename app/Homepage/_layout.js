import React from "react";
import { Tabs } from "expo-router";
import { Image } from "react-native";
import HomeIcon from "../../images/HomeIcon.png";
import CartsIcon from "../../images/CartsIcon.png";
import OrderIcon from "../../images/OrderIcon.png";
import { useAuthCxt } from "../../contexts/auth-context";
import { useCartCxt } from "../../contexts/cart-context";
import { useMyOrdersCxt } from "../../contexts/myorders-context";
import { useNetworkCxt } from "../../contexts/NetworkCheck";
import { useRouter } from "expo-router";
export default function Layout() {
  const netContext = useNetworkCxt();
  const route = useRouter();
  const authCxt = useAuthCxt();
  const cartCxt = useCartCxt();
  const myordersCxt = useMyOrdersCxt();
  var count = 0;
  var orderCount = 0;
  if (!netContext.isConnected) {
    authCxt.logoutHandler();
    route.back();
  }
  cartCxt.cartItems.map((cartItem, index) => {
    if (authCxt.userInfo.userId === cartItem.userId) {
      count++;
    }
  });
  myordersCxt.orderItems.map((orderItem, index) => {
    if (authCxt.userInfo.userId === orderItem.userId) {
      orderCount++;
    }
  });

  return (
    <Tabs>
      <Tabs.Screen
        name="ProductList"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={HomeIcon}
              style={{ width: 25, height: 25, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Carts"
        options={{
          headerShown: false,
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={CartsIcon}


              style={{ width: 25, height: 25, tintColor: color }}
            />
          ),
          tabBarBadge: count == 0 ? null : count,
          tabBarBadgeStyle: { backgroundColor: "#0D6EFD", color: "white" },
        }}
      />
      <Tabs.Screen
        name="Myorders"
        options={{
          headerShown: false,
          title: "My Orders",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={OrderIcon}
              style={{ width: 25, height: 25, tintColor: color }}
            />
          ),
          tabBarBadge: orderCount == 0 ? null : orderCount,
          tabBarBadgeStyle: { backgroundColor: "#0D6EFD", color: "white" },
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          headerTitle: "",
          headerShown: false,
          tabBarButton: () => {
            return null;
          },
        }}
      />
    </Tabs>
  );
}
