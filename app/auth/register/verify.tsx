import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image,StatusBar } from "react-native";
//import { useAuthStore } from "../store/authStore";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import { router } from "expo-router";

type InputRef = TextInput | null;

type EmailVerificationScreenProps = {};

const EmailVerificationScreen: React.FC<EmailVerificationScreenProps> = () => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<InputRef[]>([]);
  //const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const verificationCode = code.join("");
    try {
      //await verifyEmail(verificationCode);
      Alert.alert("Success", "Email verified successfully");
      router.push("/");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Verification failed");
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);
  return (
    <View className="bg-white flex h-full items-center justify-center p-5">
      <StatusBar barStyle={'dark-content'} />
      <MotiView 
        from={{ opacity: 0, translateX: -500 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: "timing", duration: 500 }}
        className="p-6 rounded-2xl shadow-lg w-full max-w-sm flex items-center"
        >
          <Image source={require('@/assets/email.png')}  style={{width:100 ,height:100}} />
        </MotiView>
        <MotiView 
        from={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        className=" rounded-2xl shadow-lg w-full max-w-lg flex items-center"
        >

        <Text className="text-2xl font-bold text-center mb-4">Verify Your Email</Text>
        <Text className="text-center text-gray-500 mb-4">Enter the 6-digit code sent to your email.</Text>
        
        <View className="flex-row justify-between mb-4 gap-2">
          {code.map((digit, index) => (
            <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg"
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(index, value)}
            onKeyPress={(e) => handleKeyDown(index, e)}
            />
          ))}
        </View>
        </MotiView>
        
        {/*{error && <Text className="text-red-500 text-center mb-2">{error}</Text>}*/}

    </View>
  );
};

export default EmailVerificationScreen;
