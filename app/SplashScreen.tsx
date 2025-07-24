import { useFonts } from "expo-font";
import React from "react";
import { Image, Text, View } from "react-native";

const SplashScreen: React.FC = () => {
  const [fontsLoaded] = useFonts({
    JockeyOne: require("../assets/fonts/JockeyOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex-1 bg-gray-50 items-center justify-center">
      <View className="items-center mb-8">
        <Image
          source={require("../assets/logo.png")}
          className="w-36 h-36 mb-5"
          resizeMode="contain"
        />
        <Text
          className="text-5xl font-bold text-yellow-500"
          style={{ fontFamily: "JockeyOne" }}
        >
          PustakHub
        </Text>
      </View>

      <View className="flex-row items-center mt-3">
        <Text
          className="text-2xl font-semibold text-gray-800"
          style={{ fontFamily: "JockeyOne" }}
        >
          Affordable Learning Starts Here
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
