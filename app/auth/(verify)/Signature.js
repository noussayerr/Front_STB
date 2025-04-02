import React, { useRef } from "react";
import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import Signature from "react-native-signature-canvas";

export default function SignatureScreen({ navigation }) {
  const signatureRef = useRef(null);

  const handleOK = (signature) => {
    // Pass the signature image back to the main screen
    navigation.navigate("VerificationHome", { completedStep: "signature", signatureImage: signature });
  };

  const handleClear = () => {
    signatureRef.current.clearSignature();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-xl font-semibold text-center mt-5 text-gray-700">Draw Your Signature</Text>

      {/* Signature Canvas */}
      <View className="flex-1 border border-gray-300 mx-4 mt-4 rounded-lg overflow-hidden shadow-md">
        <Signature
          ref={signatureRef}
          onOK={handleOK}
          onEmpty={() => alert("Please provide a signature")}
          descriptionText=""
          clearText="Clear"
          confirmText="Save"
          autoClear={false}
          webStyle={`
           .m-signature-pad {
      box-shadow: none;
      border: none;
      width: 100%;
      height: 100%;
    }
    .m-signature-pad--body {
      border: none;
      width: 100%;
      height: 100%;
    }
    .m-signature-pad--footer {
      display: none;
    }
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: white;
    } 
          `}
        />
      </View>

      {/* Action Buttons */}
      <View className="px-6 pb-6 space-y-4 mt-6 flex gap-4">
        <TouchableOpacity
          className="bg-blue-600 rounded-2xl py-4 "
          onPress={() => signatureRef.current.readSignature()}
        >
          <Text className="text-white text-center font-semibold text-lg">Save Signature</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white border-blue-500 border-2 rounded-2xl py-4 "
          onPress={handleClear}
        >
          <Text className="text-black text-center font-semibold text-lg">Clear</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
