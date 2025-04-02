import React, { useState } from "react";
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
import { useLocalSearchParams, useRouter } from "expo-router";

export default function OpenAccountScreen  () {
  
  const { accoutid } = useLocalSearchParams<{ accoutid: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    dateOfBirth: "",
    idNumber: "",

    // Account Information
    accountType: accoutid || "1",
    initialDeposit: "",
    wantsDebitCard: false,
    wantsOnlineBanking: false,

    // Employment Information
    employmentStatus: "",
    employerName: "",
    monthlyIncome: "",
    sourceOfFunds: "",

    // Agreement
    termsAgreed: false,
  });

  // Account types data for reference
  const accountTypes = [
    { id: "1", name: "Current Account" },
    { id: "2", name: "Savings Account" },
    { id: "3", name: "Student Account" },
    { id: "4", name: "Business Account" },
    { id: "5", name: "Joint Account" },
    { id: "6", name: "Foreign Currency Account" },
  ];

  // Find selected account
  const selectedAccount = accountTypes.find((account) => account.id === accoutid);

  // Update form data
  const updateFormData = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Application Submitted",
        "Your account application has been successfully submitted. We will review your application and contact you soon.",
        [
          {
            text: "OK",
            onPress: () => router.push("/"),
          },
        ]
      );
    }, 2000);
  };

  // Validate current step
  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        Alert.alert("Missing Information", "Please fill in all required fields.");
        return false;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.initialDeposit) {
        Alert.alert("Missing Information", "Please enter an initial deposit amount.");
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.employmentStatus) {
        Alert.alert("Missing Information", "Please select your employment status.");
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

  // Handle previous step
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
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />


      <View style={{ paddingHorizontal: 20, paddingVertical: 12, backgroundColor: "#eff6ff" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          {[1, 2, 3, 4].map((step) => (
            <View key={step} style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    step < currentStep
                      ? "#10b981"
                      : step === currentStep
                      ? "#2563eb"
                      : "#d1d5db",
                }}
              >
                {step < currentStep ? (
                  <AntDesign name="check" size={16} color="white" />
                ) : (
                  <Text style={{ color: "white", fontWeight: "bold" }}>{step}</Text>
                )}
              </View>
              <Text style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>
                {step === 1 ? "Personal" : step === 2 ? "Account" : step === 3 ? "Financial" : "Review"}
              </Text>
            </View>
          ))}

          <View style={{ position: "absolute", top: 16, left: 36, right: 36, height: 2, backgroundColor: "#d1d5db", zIndex: -10 }} />
          <View
            style={{
              position: "absolute",
              top: 16,
              left: 36,
              height: 2,
              backgroundColor: "#2563eb",
              zIndex: -10,
              width: `${(currentStep - 1) * 33.3}%`,
            }}
          />
        </View>
      </View>

      <ScrollView className="flex mb-20 px-4" showsVerticalScrollIndicator={false}>
        {currentStep === 1 && (
          <Animated.View style={{ paddingVertical: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2563eb", marginBottom: 16 }}>
              Personal Information
            </Text>

            <View style={{ gap: 16 }}>
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: "500", color: "#334155" }}>
                  First Name <Text style={{ color: "#ef4444" }}>*</Text>
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: "#0f172a",
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                  }}
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
                <Text className="text-sm font-medium text-slate-700">
                  Date of Birth <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="YYYY-MM-DD"
                  value={formData.dateOfBirth}
                  onChangeText={(text) => updateFormData("dateOfBirth", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  ID Number <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="National ID or Passport Number"
                  value={formData.idNumber}
                  onChangeText={(text) => updateFormData("idNumber", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  Address <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className="bg-gray-50 rounded-lg px-4 py-3 text-slate-900 border border-gray-200"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChangeText={(text) => updateFormData("address", text)}
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
            <Text className="text-xl font-bold text-blue-600 mb-4">Account Information</Text>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">Account Type</Text>
                <View className="bg-blue-50 rounded-lg px-4 py-3 border border-blue-200">
                  <Text className="text-base font-medium text-blue-700">
                    {selectedAccount ? selectedAccount.name : "Select an account type"}
                  </Text>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  Initial Deposit Amount <Text className="text-red-500">*</Text>
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <Text className="px-4 py-3 text-slate-700 border-r border-gray-200">DT</Text>
                  <TextInput
                    className="flex-1 px-4 py-3 text-slate-900"
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={formData.initialDeposit}
                    onChangeText={(text) => updateFormData("initialDeposit", text)}
                  />
                </View>
              </View>

              <View className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <View className="flex-row">
                  <MaterialIcons name="info" size={20} color="#d97706" />
                  <Text className="ml-2 text-sm text-amber-700">
                    The minimum initial deposit for a{" "}
                    {selectedAccount ? selectedAccount.name.toLowerCase() : "selected account"} is
                    {selectedAccount && selectedAccount.id === "1"
                      ? " 50 DT"
                      : selectedAccount && selectedAccount.id === "2"
                        ? " 100 DT"
                        : selectedAccount && selectedAccount.id === "3"
                          ? " 10 DT"
                          : selectedAccount && selectedAccount.id === "4"
                            ? " 500 DT"
                            : selectedAccount && selectedAccount.id === "5"
                              ? " 100 DT"
                              : selectedAccount && selectedAccount.id === "6"
                                ? " 200 EUR/USD"
                                : ""}
                  </Text>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">
                  Would you like a debit card with this account?
                </Text>
                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center py-3 rounded-lg border border-gray-200 bg-gray-50"
                    onPress={() => updateFormData("wantsDebitCard", true)}
                  >
                    <View
                      className={`w-5 h-5 rounded-full border ${formData.wantsDebitCard ? "bg-blue-600 border-blue-600" : "border-gray-400"} mr-2 items-center justify-center`}
                    >
                      {formData.wantsDebitCard && <View className="w-2 h-2 rounded-full bg-white" />}
                    </View>
                    <Text className="text-slate-700">Yes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center py-3 rounded-lg border border-gray-200 bg-gray-50"
                    onPress={() => updateFormData("wantsDebitCard", false)}
                  >
                    <View
                      className={`w-5 h-5 rounded-full border ${formData.wantsDebitCard === false ? "bg-blue-600 border-blue-600" : "border-gray-400"} mr-2 items-center justify-center`}
                    >
                      {formData.wantsDebitCard === false && <View className="w-2 h-2 rounded-full bg-white" />}
                    </View>
                    <Text className="text-slate-700">No</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">Would you like to enable online banking?</Text>
                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center py-3 rounded-lg border border-gray-200 bg-gray-50"
                    onPress={() => updateFormData("wantsOnlineBanking", true)}
                  >
                    <View
                      className={`w-5 h-5 rounded-full border ${formData.wantsOnlineBanking ? "bg-blue-600 border-blue-600" : "border-gray-400"} mr-2 items-center justify-center`}
                    >
                      {formData.wantsOnlineBanking && <View className="w-2 h-2 rounded-full bg-white" />}
                    </View>
                    <Text className="text-slate-700">Yes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center py-3 rounded-lg border border-gray-200 bg-gray-50"
                    onPress={() => updateFormData("wantsOnlineBanking", false)}
                  >
                    <View
                      className={`w-5 h-5 rounded-full border ${formData.wantsOnlineBanking === false ? "bg-blue-600 border-blue-600" : "border-gray-400"} mr-2 items-center justify-center`}
                    >
                      {formData.wantsOnlineBanking === false && <View className="w-2 h-2 rounded-full bg-white" />}
                    </View>
                    <Text className="text-slate-700">No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {currentStep === 3 && (
          <Animated.View className="py-4">
            <Text className="text-xl font-bold text-blue-600 mb-4">Financial Information</Text>

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
                <Text className="text-sm font-medium text-slate-700">Monthly Income</Text>
                <View className="flex-row items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <Text className="px-4 py-3 text-slate-700 border-r border-gray-200">DT</Text>
                  <TextInput
                    className="flex-1 px-4 py-3 text-slate-900"
                    placeholder="Enter monthly income"
                    keyboardType="numeric"
                    value={formData.monthlyIncome}
                    onChangeText={(text) => updateFormData("monthlyIncome", text)}
                  />
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-slate-700">Source of Funds</Text>
                <View className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <Picker
                    selectedValue={formData.sourceOfFunds}
                    onValueChange={(value) => updateFormData("sourceOfFunds", value)}
                    style={{ height: 50 }}
                  >
                    <Picker.Item label="Select source of funds" value="" />
                    <Picker.Item label="Salary" value="salary" />
                    <Picker.Item label="Business Income" value="business" />
                    <Picker.Item label="Investments" value="investments" />
                    <Picker.Item label="Inheritance" value="inheritance" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
              </View>

              <View className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <View className="flex-row">
                  <MaterialIcons name="security" size={20} color="#2563eb" />
                  <Text className="ml-2 text-sm text-blue-700">
                    Your financial information is secure and will only be used for account eligibility assessment.
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
                  <Text className="text-slate-600">ID Number</Text>
                  <Text className="text-slate-900 font-medium">{formData.idNumber}</Text>
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
                <Text className="text-lg font-bold text-blue-700">Account Information</Text>
              </View>

              <View className="p-4">
                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Account Type</Text>
                  <Text className="text-slate-900 font-medium">{selectedAccount ? selectedAccount.name : ""}</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Initial Deposit</Text>
                  <Text className="text-slate-900 font-medium">{formData.initialDeposit} DT</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Debit Card</Text>
                  <Text className="text-slate-900 font-medium">{formData.wantsDebitCard ? "Yes" : "No"}</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className="text-slate-600">Online Banking</Text>
                  <Text className="text-slate-900 font-medium">{formData.wantsOnlineBanking ? "Yes" : "No"}</Text>
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
      <View style={{ borderTopWidth: 1, borderTopColor: "#e5e7eb", backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={{ flex: 1, paddingVertical: 12, borderWidth: 1, borderColor: "#d1d5db", borderRadius: 12, alignItems: "center" }}
            onPress={handlePrevStep}
          >
            <Text style={{ color: "#334155", fontWeight: "500" }}>
              {currentStep === 1 ? "Cancel" : "Previous"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
              backgroundColor:
                currentStep === 4 && !formData.termsAgreed ? "#bfdbfe" : "#2563eb",
            }}
            onPress={handleNextStep}
            disabled={(currentStep === 4 && !formData.termsAgreed) || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{ color: "white", fontWeight: "500" }}>
                {currentStep < 4 ? "Next" : "Submit Application"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>

    </KeyboardAvoidingView>
  )
}

