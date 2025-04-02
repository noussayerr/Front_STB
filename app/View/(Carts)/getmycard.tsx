import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from 'expo-router';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  cardType: string;
  cardHolderName: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryPostalCode: string;
  employmentStatus: string;
  employerName: string;
  monthlyIncome: string;
  termsAgreed: boolean;
};

type Card = {
  id: string;
  name: string;
};

export default function GetCardScreen() {
  const router = useRouter();
  const { cardId } = useLocalSearchParams<{ cardId: string }>();
  const insets = useSafeAreaInsets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardType: cardId || "1",
    cardHolderName: "",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryPostalCode: "",
    employmentStatus: "",
    employerName: "",
    monthlyIncome: "",
    termsAgreed: false,
  });

  const cards: Card[] = [
    { id: "1", name: "Carte STB Travel" },
    { id: "2", name: "Carte STB Epargne" },
    { id: "3", name: "Carte Visa Electron Nationale" },
    { id: "4", name: "Carte CIB3" },
    { id: "5", name: "Carte C Cash" },
    { id: "6", name: "Carte C Pay" },
  ];

  const selectedCard = cards.find((card) => card.id === cardId);

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Application Submitted",
        "Your card application has been successfully submitted. We will review your application and contact you soon.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    }, 2000);
  };

  const validateStep = (): boolean => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        Alert.alert("Missing Information", "Please fill in all required fields.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.cardHolderName || !formData.deliveryAddress || !formData.deliveryCity) {
        Alert.alert("Missing Information", "Please fill in all required fields.");
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.employmentStatus || !formData.monthlyIncome) {
        Alert.alert("Missing Information", "Please fill in all required fields.");
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
  
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex h-full bg-white"
      style={{ paddingTop: insets.top }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="px-5 py-3 bg-blue-50">
        <View className="flex-row justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <View key={step} className="items-center">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  step < currentStep ? "bg-green-500" : step === currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                {step < currentStep ? (
                  <AntDesign name="check" size={16} color="white" />
                ) : (
                  <Text className="text-white font-bold">{step}</Text>
                )}
              </View>
              <Text className="text-xs text-slate-600 mt-1">
                {step === 1 ? "Personal" : step === 2 ? "Card" : step === 3 ? "Employment" : "Review"}
              </Text>
            </View>
          ))}

          <View className="absolute top-4 left-9 right-9 h-[2px] bg-gray-300 -z-10" />
          <View
            className="absolute top-4 left-9 h-[2px] bg-blue-600 -z-10"
            style={{
              width: `${(currentStep - 1) * 33.3}%`,
            }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {currentStep === 1 && (
          <Animated.View className="py-4">
            <Text className="text-xl font-bold text-blue-600 mb-4">Personal Information</Text>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  First Name <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChangeText={(text) => updateFormData("firstName", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  Last Name <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChangeText={(text) => updateFormData("lastName", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  Email Address <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="Enter your email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => updateFormData("email", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  Phone Number <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => updateFormData("phone", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">Address</Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChangeText={(text) => updateFormData("address", text)}
                />
              </View>

              <View className="flex-row space-x-3">
                <View className="flex-1 space-y-2">
                  <Text className="text-sm font-medium text-slate-700">City</Text>
                  <TextInput
                    className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                    placeholder="City"
                    value={formData.city}
                    onChangeText={(text) => updateFormData("city", text)}
                  />
                </View>

                <View className="w-1/3 space-y-2">
                  <Text className="text-sm font-medium text-slate-700">Postal Code</Text>
                  <TextInput
                    className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                    placeholder="Code"
                    keyboardType="numeric"
                    value={formData.postalCode}
                    onChangeText={(text) => updateFormData("postalCode", text)}
                  />
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {currentStep === 2 && (
          <Animated.View className="py-4">
            <Text className="text-xl font-bold text-blue-600 mb-4">Card Information</Text>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">Selected Card</Text>
                <View className="bg-blue-50 rounded-lg px-4 py-3 border border-blue-200">
                  <Text className="text-base font-medium text-blue-700">
                    {selectedCard ? selectedCard.name : "Select a card"}
                  </Text>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  Card Holder Name <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="Name as it will appear on card"
                  value={formData.cardHolderName}
                  onChangeText={(text) => updateFormData("cardHolderName", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  Delivery Address <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="Enter delivery address"
                  value={formData.deliveryAddress}
                  onChangeText={(text) => updateFormData("deliveryAddress", text)}
                />
              </View>

              <View className="flex-row space-x-3">
                <View className="flex-1 space-y-2">
                  <Text className="text-sm font-medium text-slate-700">
                    City <Text className="text-red-500">*</Text>
                  </Text>
                  <TextInput
                    className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                    placeholder="City"
                    value={formData.deliveryCity}
                    onChangeText={(text) => updateFormData("deliveryCity", text)}
                  />
                </View>

                <View className="w-1/3 space-y-2">
                  <Text className="text-sm font-medium text-slate-700">Postal Code</Text>
                  <TextInput
                    className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                    placeholder="Code"
                    keyboardType="numeric"
                    value={formData.deliveryPostalCode}
                    onChangeText={(text) => updateFormData("deliveryPostalCode", text)}
                  />
                </View>
              </View>

              <View className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <View className="flex-row">
                  <MaterialIcons name="info" size={20} color="#d97706" />
                  <Text className="ml-2 text-sm text-amber-700">
                    Your card will be delivered to this address within 5-7 business days after approval.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {currentStep === 3 && (
          <Animated.View className="py-4">
            <Text className="text-xl font-bold text-blue-600 mb-4">Employment Information</Text>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  Employment Status <Text className="text-red-500">*</Text>
                </Text>
                <View className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <Picker
                    selectedValue={formData.employmentStatus}
                    onValueChange={(value) => updateFormData("employmentStatus", value)}
                    style={{ height: 50 }}
                  >
                    <Picker.Item label="Select employment status" value="" />
                    <Picker.Item label="Employed" value="employed" />
                    <Picker.Item label="Self-employed" value="self-employed" />
                    <Picker.Item label="Student" value="student" />
                    <Picker.Item label="Retired" value="retired" />
                    <Picker.Item label="Unemployed" value="unemployed" />
                  </Picker>
                </View>
              </View>

              {(formData.employmentStatus === "employed" || formData.employmentStatus === "self-employed") && (
                <View className="space-y-2">
                  <Text className="text-sm font-medium text-slate-700">Employer Name</Text>
                  <TextInput
                    className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                    placeholder="Enter employer name"
                    value={formData.employerName}
                    onChangeText={(text) => updateFormData("employerName", text)}
                  />
                </View>
              )}

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  Monthly Income <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="Enter monthly income"
                  keyboardType="numeric"
                  value={formData.monthlyIncome}
                  onChangeText={(text) => updateFormData("monthlyIncome", text)}
                />
              </View>

              <View className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <View className="flex-row">
                  <MaterialIcons name="security" size={20} color="#2563eb" />
                  <Text className="ml-2 text-sm text-blue-700">
                    Your financial information is secure and will only be used for card eligibility assessment.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {currentStep === 4 && (
          <Animated.View className="py-4">
            <Text className="text-xl font-bold text-blue-600 mb-4">Review & Submit</Text>

            <View
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <View className="p-4 bg-blue-50 border-b border-blue-100">
                <Text className="text-lg font-bold text-blue-700">Personal Information</Text>
              </View>

              <View className="p-4">
                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Full Name</Text>
                  <Text className="text-slate-900 font-medium">
                    {formData.firstName} {formData.lastName}
                  </Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Email</Text>
                  <Text className="text-slate-900 font-medium">{formData.email}</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Phone</Text>
                  <Text className="text-slate-900 font-medium">{formData.phone}</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Address</Text>
                  <Text className="text-slate-900 font-medium text-right">
                    {formData.address}, {formData.city}
                  </Text>
                </View>
              </View>
            </View>

            <View
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <View className="p-4 bg-blue-50 border-b border-blue-100">
                <Text className="text-lg font-bold text-blue-700">Card Information</Text>
              </View>

              <View className="p-4">
                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Card Type</Text>
                  <Text className="text-slate-900 font-medium">{selectedCard ? selectedCard.name : ""}</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Card Holder</Text>
                  <Text className="text-slate-900 font-medium">{formData.cardHolderName}</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Delivery Address</Text>
                  <Text className="text-slate-900 font-medium text-right">
                    {formData.deliveryAddress}, {formData.deliveryCity}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center mb-6">
              <TouchableOpacity onPress={() => updateFormData("termsAgreed", !formData.termsAgreed)}>
                <View
                  className={`w-6 h-6 rounded border ${formData.termsAgreed ? "bg-blue-600 border-blue-600" : "border-gray-300"} items-center justify-center`}
                >
                  {formData.termsAgreed && <AntDesign name="check" size={14} color="white" />}
                </View>
              </TouchableOpacity>
              <Text className="ml-2 text-slate-700">
                I agree to the <Text className="text-blue-600 font-medium">Terms & Conditions</Text> and{" "}
                <Text className="text-blue-600 font-medium">Privacy Policy</Text>
              </Text>
            </View>

            <View className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
              <View className="flex-row">
                <MaterialIcons name="info" size={20} color="#d97706" />
                <Text className="ml-2 text-sm text-amber-700">
                  By submitting this application, you authorize us to perform a credit check and verify the information
                  provided.
                </Text>
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      <View className="px-5 py-4 border-t border-gray-200 bg-white">
        <View className="flex-row space-x-3">
          <TouchableOpacity
            className="flex-1 py-3 border border-gray-300 rounded-xl items-center"
            onPress={handlePrevStep}
          >
            <Text className="text-slate-700 font-medium">{currentStep === 1 ? "Cancel" : "Previous"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 rounded-xl items-center ${
              currentStep === 4 && !formData.termsAgreed ? "bg-blue-300" : "bg-blue-600"
            }`}
            onPress={handleNextStep}
            disabled={(currentStep === 4 && !formData.termsAgreed) || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-medium">{currentStep < 4 ? "Next" : "Submit Application"}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

