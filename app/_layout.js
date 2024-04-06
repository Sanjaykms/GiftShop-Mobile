import UserContextProvider from "../contexts/user-context";
import { ProductsContextProvider } from "../contexts/products-context";
import { CartContextProvider } from "../contexts/cart-context";
import { MyOrdersContextProvider } from "../contexts/myorders-context";
import { ReviewContextProvider } from "../contexts/review-context";
import { ThemeContextProvider } from "../contexts/themes-context";
import AuthContextProvider from "../contexts/auth-context";
import NetworkStatusProvider from "../contexts/NetworkCheck";
import NavBar from "./NavBar/NavBar";
import RefreshContextProvider from "./HomepageComponent/refreshProvider";
export default function Layout(props) {
  return (
    <>
      <NetworkStatusProvider>
        <AuthContextProvider>
          <ThemeContextProvider>
            <ReviewContextProvider>
              <MyOrdersContextProvider>
                <CartContextProvider>
                  <ProductsContextProvider>
                    <UserContextProvider>
                      <RefreshContextProvider>
                        <NavBar />
                      </RefreshContextProvider>
                    </UserContextProvider>
                  </ProductsContextProvider>
                </CartContextProvider>
              </MyOrdersContextProvider>
            </ReviewContextProvider>
          </ThemeContextProvider>
        </AuthContextProvider>
      </NetworkStatusProvider>
    </>
  );
}
