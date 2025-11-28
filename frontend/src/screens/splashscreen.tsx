import { useEffect, useRef } from "react";
import { View, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  const nav = useNavigation<any>();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1, duration: 800, useNativeDriver: true
    }).start(() => {
      setTimeout(() => nav.replace("Reservations"), 800);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1, backgroundColor: "#ffffffff", alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Animated.View style={{ opacity }}>
          <Image
            source={require("../assets/foodhub.png")}
            style={{ width: 180, height: 80, resizeMode: "contain" }}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}