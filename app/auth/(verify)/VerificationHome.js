import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, SafeAreaView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VerificationHome({ navigation, route }) {
  const [completedSteps, setCompletedSteps] = useState({
    idScan: false,
    videoSelfie: false,
    signature: false,
  });

  const [signatureImage, setSignatureImage] = useState(null);

  useEffect(() => {
    if (route.params?.completedStep === "signature") {
      setCompletedSteps((prev) => ({ ...prev, signature: true }));
      setSignatureImage(route.params.signatureImage);
    }
  }, [route.params]);

  const handleSubmit = () => {
    if (!completedSteps.idScan || !completedSteps.videoSelfie || !completedSteps.signature) {
      Alert.alert("Error", "Please complete all steps before submitting.");
      return;
    }

    // Here, you would send `signatureImage` and other data to your backend
    console.log("Submitting data to backend:", { signatureImage, completedSteps });

    Alert.alert("Success", "Verification submitted successfully!");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Regulatory notice */}
      <View className="flex-row px-4 py-3 items-center mt-10">
        <Image source={require("@/assets/STBlogo.png")} className="w-12 h-12 mr-3 rounded-md" />
        <Text className="text-gray-500 flex-1 text-sm">
          This process has been approved for experimentation by the regulatory sandbox of the Central Bank.
        </Text>
      </View>

      {/* User info */}
      <View className="flex-row items-center bg-blue-200 mx-4 my-3 p-3 rounded-3xl self-start">
        <View className="w-8 h-8 rounded-full bg-pink-600 justify-center items-center mr-2">
          <Text className="text-white font-bold">RN</Text>
        </View>
        <Text className="text-black font-medium">Rahal Noussayer</Text>
      </View>

      {/* Verification steps */}
      <View className="px-4 pt-2 space-y-4">
        {[
          {
            key: "idScan",
            label: "Scan your national ID",
            route: "ScanIDFront",
            image: require("@/assets/icons/idcard.png"),
          },
          {
            key: "videoSelfie",
            label: "Take a video selfie",
            route: "VideoSelfie",
            image: require("@/assets/icons/camrecorder.png"),
          },
          {
            key: "signature",
            label: "Upload a signature specimen by signing with your finger",
            route: "Signature",
            image: require("@/assets/icons/signature.png"),
          },
        ].map((step) => (
          <TouchableOpacity
            key={step.key}
            className="bg-blue-200 rounded-xl p-4 flex-row justify-between mt-10"
            onPress={() => navigation.navigate(step.route)}
          >
            <Image source={step.image} style={{ width: 35, height: 35 }} />
            <View className="flex-1">
              <Text className="text-black text-right mb-1 font-medium">{step.label}</Text>
            </View>
            <View className="ml-2">
              <Ionicons
                name={completedSteps[step.key] ? "checkmark-circle" : "add-circle"}
                size={24}
                color={completedSteps[step.key] ? "#4CAF50" : "black"}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      /

      {/* Submit Buttons */}
      <View className="absolute bottom-10 left-0 right-0 px-4">
        <TouchableOpacity className="bg-blue-600 rounded-2xl py-5" onPress={handleSubmit}>
          <Text className="text-white text-center font-semibold">Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white border-blue-500 border-2 rounded-2xl py-5 mt-2" onPress={() => navigation.navigate("(tabs)")}>
          <Text className="text-black text-center font-semibold">Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
