import React, { useContext, useState, useCallback, useEffect } from "react";
import { RefreshControl as RNRefreshControl } from "react-native";
import { useThemeCxt } from "../../contexts/themes-context";
import { useUserCxt } from "../../contexts/user-context";
import { useReviewCxt } from "../../contexts/review-context";
import { useProductsCxt } from "../../contexts/products-context";
import { useMyOrdersCxt } from "../../contexts/myorders-context";
import { useCartCxt } from "../../contexts/cart-context";

const RefreshContext = React.createContext({
  RefreshControl: <RNRefreshControl />,
  refreshing: false,
  onRefresh: () => {},
});

const RefreshContextProvider = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const { refreshUserContext, usersList } = useUserCxt();
  const { refreshThemeContext } = useThemeCxt();
  const { refreshReviewContext } = useReviewCxt();
  const { refreshProductContext } = useProductsCxt();
  const { refreshMyOrderContext } = useMyOrdersCxt();
  const { refreshCartContext } = useCartCxt();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log("k");
    await refreshUserContext();
    await refreshThemeContext();
    await refreshReviewContext();
    await refreshProductContext();
    await refreshMyOrderContext();
    await refreshCartContext();
    setRefreshing(false);
  }, [usersList.length]);

  const RefreshControl = (
    <RNRefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  return (
    <RefreshContext.Provider
      value={{
        RefreshControl: RefreshControl,
        refreshing: refreshing,
        onRefresh: onRefresh,
      }}
    >
      {props.children}
    </RefreshContext.Provider>
  );
};

export const useRefreshCxt = () => {
  return useContext(RefreshContext);
};

export default RefreshContextProvider;
