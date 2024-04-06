import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useProductsCxt } from "../../contexts/products-context";
import useGenerateId from "../Hooks/generate-id";
import { useReviewCxt } from "../../contexts/review-context";
import { useCartCxt } from "../../contexts/cart-context";
import { useAuthCxt } from "../../contexts/auth-context";
import { useUserCxt } from "../../contexts/user-context";
import { Ionicons } from "@expo/vector-icons";
import ReviewsList from "../HomepageComponent/Review/ReviewList";

import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

export default function ViewProduct() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [dummyReviewT, setDummyRT] = useState("");
  const [reviewItem, setReviewItem] = useState({});
  const [reviewText, setReviewText] = useState("");
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

  const productsCxt = useProductsCxt();
  const cartCxt = useCartCxt();
  const authCxt = useAuthCxt();
  const userCxt = useUserCxt();
  const reviewCxt = useReviewCxt();
  const generateId = useGenerateId();

  const productId = params.id;
  const { productsList } = productsCxt;
  const { cartItems } = cartCxt;

  const product = productsList.find((item) => {
    return productId === item.giftId;
  });

  const changeHandler = (text) => {
    setReviewText(text); // changes
  };
  const editReviewHandler = (reviewItem) => {
    setDummyRT(reviewItem.reviewText);
    setIsEditBtnClicked(true);
    setReviewText(reviewItem.reviewText);
    setReviewItem(reviewItem);
  };

  const updateReviewHandler = () => {
    if (dummyReviewT !== reviewText) {
      const newReview = { ...reviewItem };
      newReview.reviewText = reviewText;
      reviewCxt.editReview(newReview);
    }
    setReviewItem({});
    setReviewText("");
    setDummyRT("");
    setIsEditBtnClicked(false);
  };

  const addReviewHandler = () => {
    if (reviewText === "") {
      return;
    }
    const user = userCxt.usersList.find((user) => {
      return user.userId === authCxt.userInfo.userId;
    });
    const review = {
      reviewId: generateId("REVIEW"),
      userId: authCxt.userInfo.userId,
      giftId: productId,
      userName: user.userName,
      reviewText: reviewText,
    };
    reviewCxt.addReview(review);
    setReviewText("");
  };

  const closeViewProduct = () => {
    router.back();
  };

  const cartDataHandle = (cartItem, data) => {
    cartCxt.cartDispatchFn({ type: "ADD_TO_CART", value: cartItem });
    console.log("hii");
  };

  const addToCartHandler = () => {
    const NoofCartItem = cartItems.filter((item) => {
      return item.userId == authCxt.userInfo.userId;
    });
    if (NoofCartItem.length < 5) {
      const exsistedProduct = cartItems.find((item) => {
        return (
          product.giftId === item.giftId &&
          item.userId == authCxt.userInfo.userId
        );
      });
      const index = cartItems.indexOf(exsistedProduct);
      if (index >= 0) {
        alert("Product already in cart");
      } else {
        const cartItem = {
          cartItemId: generateId("CART"),
          userId: authCxt.userInfo.userId,
          giftId: product.giftId,
          url: product.url,
          productName: product.productName,
          price: product.price,
          quantity: 1,
        };
        cartDataHandle(cartItem);
      }
    } else {
      alert("Cant't add to cart. Your Cart is full :(");
    }
    closeViewProduct();
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerh1}>Gift Info: {params.id}</Text>
        </View>
        <View style={styles.content}>
          <View>
            <Image source={{ uri: product.url }} style={styles.image} />
          </View>
          <View style={styles.details}>
            <View style={styles.boxContainer}>
              <Text style={[styles.detailsH3, styles.label]}>Gift name :</Text>
              <Text style={styles.detailsH3}> {product.productName}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={[styles.detailsH3, styles.label]}>Price :</Text>
              <Text> ${product.price}</Text>
            </View>
            <View style={styles.boxContainer}>
              <Text style={[styles.detailsH3, styles.label]}>
                Available Quantity :
              </Text>
              <Text> {product.quantity}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.reviews}>
            <Text style={styles.reviewsText}>Reviews :</Text>
            <View style={styles.hr}></View>
            <ReviewsList
              productId={productId}
              editReviewHandler={editReviewHandler}
            />
            <TextInput
              multiline={true}
              numberOfLines={4}
              value={reviewText}
              style={styles.textarea}
              placeholder="Add review here..."
              onChangeText={changeHandler}
            />
            {!isEditBtnClicked && (
              <TouchableOpacity
                onPress={addReviewHandler}
                style={styles.addIcon}
              >
                <Ionicons name="add-circle" size={24} color="#0D6EFD" />
              </TouchableOpacity>
            )}
            {isEditBtnClicked && (
              <TouchableOpacity
                onPress={updateReviewHandler}
                style={styles.addIcon}
              >
                <Ionicons name="cloud-upload" size={24} color="#0D6EFD" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={closeViewProduct}
              style={[styles.footerButton, styles.backButton]}
            >
              <Text style={{ fontSize: 12, color: "#2f80fa" }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={addToCartHandler}
              style={[styles.footerButton, styles.toCartButton]}
            >
              <Text style={{ fontSize: 12, color: "white" }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hr: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  container: {
    width: "90%",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    border: "none",
    marginVertical: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    padding: 8,
    overflow: "hidden",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    columnGap: 10,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 25,
  },
  header: {
    height: 60, // 5rem in pixels (assuming 1rem = 16px)
    backgroundColor: "#0D6EFD",
    color: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 20,
    paddingLeft: 30,
  },
  boxContainer: {
    flexDirection: "row", // Change to 'column' for a vertical display
    justifyContent: "flex-start", // Adjust as needed
  },
  boxtext: {
    padding: 10,
    backgroundColor: "lightgray",
    margin: 5,
  },
  headerh1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  details: {
    paddingTop: 30,
  },
  detailsH3: {
    marginBottom: 10,
  },
  label: {
    color: "gray",
  },
  footer: {
    flexDirection: "row",
    textAlign: "left",
    height: 5 * 16, // 5rem in pixels (assuming 1rem = 16px)
    paddingLeft: 30,
  },
  footerButton: {
    height: 25,
    borderRadius: 5,
    width: 75,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#2f80fa",
    marginRight: 10,
  },
  backHover: {
    backgroundColor: "#2f80fa",
    borderWidth: 0,
    color: "white",
  },
  toCartButton: {
    backgroundColor: "#0D6EFD",
    borderWidth: 0,
    color: "white",
  },
  toCartHover: {
    backgroundColor: "#064ebb",
  },
  reviews: {
    padding: 30,
    position: "relative",
  },
  reviewsText: {
    fontSize: 14, // 2rem in pixels (assuming 1rem = 16px)
    fontWeight: "bold",
  },
  textarea: {
    width: "100%",
    height: 100,
    paddingLeft: 10,
    borderColor: "black",
    borderWidth: 0.5,
  },
  addIcon: {
    cursor: "pointer",
    height: 35,
    width: 35,
    color: "#0D6EFD",
    position: "absolute",
    right: 20,
    bottom: -10,
  },
});
