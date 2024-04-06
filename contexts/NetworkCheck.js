// NetworkStatusProvider.js
import React, { useContext, useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const NewtworkContext = React.createContext({
  isConnected: false,
});

const NetworkStatusProvider = (props) => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NewtworkContext.Provider value={{ isConnected }}>
      {props.children}
    </NewtworkContext.Provider>
  );
};

export const useNetworkCxt = () => {
  return useContext(NewtworkContext);
};

export const useNetworkCheckRefresh = () => {
  NetworkStatusProvider();
  return Promise.resolve("OK");
};

export default NetworkStatusProvider;
