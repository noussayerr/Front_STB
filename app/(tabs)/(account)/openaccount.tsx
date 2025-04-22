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
import { useTheme } from "@/app/providers/ThemeProvider";

export default function OpenAccountScreen() {
  const { accoutid } = useLocalSearchParams<{ accoutid: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { theme } = useTheme();
  
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
      style={{ flex: 1, backgroundColor: theme === "dark" ? "#121212" : "white" }}
    >
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} backgroundColor={theme === "dark" ? "#121212" : "#ffffff"} />


      <View style={{ 
        paddingHorizontal: 20, 
        paddingVertical: 12, 
        backgroundColor: theme === "dark" ? "#1F2937" : "#eff6ff" 
      }}>
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
                      : theme === "dark" ? "#374151" : "#d1d5db",
                }}
              >
                {step < currentStep ? (
                  <AntDesign name="check" size={16} color="white" />
                ) : (
                  <Text style={{ color: "white", fontWeight: "bold" }}>{step}</Text>
                )}
              </View>
              <Text style={{ 
                fontSize: 12, 
                color: theme === "dark" ? "#9CA3AF" : "#475569", 
                marginTop: 4 
              }}>
                {step === 1 ? "Personal" : step === 2 ? "Account" : step === 3 ? "Financial" : "Review"}
              </Text>
            </View>
          ))}

          <View style={{ 
            position: "absolute", 
            top: 16, 
            left: 36, 
            right: 36, 
            height: 2, 
            backgroundColor: theme === "dark" ? "#374151" : "#d1d5db", 
            zIndex: -10 
          }} />
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

      <ScrollView 
        className="flex mb-20 px-4" 
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: theme === "dark" ? "#121212" : "white" }}
      >
        {currentStep === 1 && (
          <Animated.View style={{ paddingVertical: 16 }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: "bold", 
              color: theme === "dark" ? "#E5E7EB" : "#2563eb", 
              marginBottom: 16 
            }}>
              Personal Information
            </Text>

            <View style={{ gap: 16 }}>
              <View style={{ gap: 8 }}>
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: "500", 
                  color: theme === "dark" ? "#E5E7EB" : "#334155" 
                }}>
                  First Name <Text style={{ color: "#ef4444" }}>*</Text>
                </Text>
                <TextInput
                  style={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    borderWidth: 1,
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                  placeholder="Enter your first name"
                  placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  value={formData.firstName}
                  onChangeText={(text) => updateFormData("firstName", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Last Name <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  style={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    borderWidth: 1,
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                  placeholder="Enter your last name"
                  placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  value={formData.lastName}
                  onChangeText={(text) => updateFormData("lastName", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Email Address <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  style={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    borderWidth: 1,
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                  placeholder="Enter your email address"
                  placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => updateFormData("email", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Phone Number <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  style={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    borderWidth: 1,
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                  placeholder="Enter your phone number"
                  placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => updateFormData("phone", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Date of Birth <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  style={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    borderWidth: 1,
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  value={formData.dateOfBirth}
                  onChangeText={(text) => updateFormData("dateOfBirth", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  ID Number <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  style={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    borderWidth: 1,
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                  placeholder="National ID or Passport Number"
                  placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  value={formData.idNumber}
                  onChangeText={(text) => updateFormData("idNumber", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Address <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  style={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    borderWidth: 1,
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  }}
                  placeholder="Enter your address"
                  placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  value={formData.address}
                  onChangeText={(text) => updateFormData("address", text)}
                />
              </View>

              <View className="flex-row space-x-3">
                <View className="flex-1 space-y-2">
                  <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                    City <Text className="text-red-500">*</Text>
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                      borderRadius: 8,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                      borderWidth: 1,
                      borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                    }}
                    placeholder="City"
                    placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    value={formData.city}
                    onChangeText={(text) => updateFormData("city", text)}
                  />
                </View>

                <View className="w-1/3 space-y-2">
                  <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Postal Code</Text>
                  <TextInput
                    style={{
                      backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                      borderRadius: 8,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                      borderWidth: 1,
                      borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                    }}
                    placeholder="Code"
                    placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
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
            <Text style={{ 
              fontSize: 20, 
              fontWeight: "bold", 
              color: theme === "dark" ? "#E5E7EB" : "#2563eb", 
              marginBottom: 16 
            }}>
              Account Information
            </Text>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Account Type</Text>
                <View style={{
                  backgroundColor: theme === "dark" ? "#1F2937" : "#EFF6FF",
                  borderRadius: 8,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#374151" : "#BFDBFE",
                }}>
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: "500", 
                    color: theme === "dark" ? "#E5E7EB" : "#2563eb" 
                  }}>
                    {selectedAccount ? selectedAccount.name : "Select an account type"}
                  </Text>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Initial Deposit Amount <Text className="text-red-500">*</Text>
                </Text>
                <View style={{ 
                  flexDirection: "row", 
                  alignItems: "center", 
                  backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  overflow: "hidden"
                }}>
                  <Text style={{ 
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme === "dark" ? "#9CA3AF" : "#64748B",
                    borderRightWidth: 1,
                    borderRightColor: theme === "dark" ? "#374151" : "#E5E7EB"
                  }}>DT</Text>
                  <TextInput
                    style={{
                      flex: 1,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    }}
                    placeholder="Enter amount"
                    placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    keyboardType="numeric"
                    value={formData.initialDeposit}
                    onChangeText={(text) => updateFormData("initialDeposit", text)}
                  />
                </View>
              </View>

              <View style={{ 
                padding: 16, 
                backgroundColor: theme === "dark" ? "#1E1E1E" : "#FEF3C7",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme === "dark" ? "#374151" : "#FDE68A",
              }}>
                <View className="flex-row">
                  <MaterialIcons name="info" size={20} color={theme === "dark" ? "#D1D5DB" : "#92400E"} />
                  <Text style={{ 
                    marginLeft: 8,
                    fontSize: 14,
                    color: theme === "dark" ? "#D1D5DB" : "#92400E",
                  }}>
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
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Would you like a debit card with this account?
                </Text>
                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                      backgroundColor: theme === "dark" ? "#1F2937" : "#F9FAFB",
                    }}
                    onPress={() => updateFormData("wantsDebitCard", true)}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: formData.wantsDebitCard 
                          ? "#2563eb" 
                          : theme === "dark" ? "#4B5563" : "#9CA3AF",
                        backgroundColor: formData.wantsDebitCard ? "#2563eb" : "transparent",
                        marginRight: 8,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {formData.wantsDebitCard && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "white" }} />}
                    </View>
                    <Text style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Yes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                      backgroundColor: theme === "dark" ? "#1F2937" : "#F9FAFB",
                    }}
                    onPress={() => updateFormData("wantsDebitCard", false)}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: formData.wantsDebitCard === false 
                          ? "#2563eb" 
                          : theme === "dark" ? "#4B5563" : "#9CA3AF",
                        backgroundColor: formData.wantsDebitCard === false ? "#2563eb" : "transparent",
                        marginRight: 8,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {formData.wantsDebitCard === false && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "white" }} />}
                    </View>
                    <Text style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Would you like to enable online banking?</Text>
                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                      backgroundColor: theme === "dark" ? "#1F2937" : "#F9FAFB",
                    }}
                    onPress={() => updateFormData("wantsOnlineBanking", true)}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: formData.wantsOnlineBanking 
                          ? "#2563eb" 
                          : theme === "dark" ? "#4B5563" : "#9CA3AF",
                        backgroundColor: formData.wantsOnlineBanking ? "#2563eb" : "transparent",
                        marginRight: 8,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {formData.wantsOnlineBanking && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "white" }} />}
                    </View>
                    <Text style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Yes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                      backgroundColor: theme === "dark" ? "#1F2937" : "#F9FAFB",
                    }}
                    onPress={() => updateFormData("wantsOnlineBanking", false)}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: formData.wantsOnlineBanking === false 
                          ? "#2563eb" 
                          : theme === "dark" ? "#4B5563" : "#9CA3AF",
                        backgroundColor: formData.wantsOnlineBanking === false ? "#2563eb" : "transparent",
                        marginRight: 8,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {formData.wantsOnlineBanking === false && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "white" }} />}
                    </View>
                    <Text style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {currentStep === 3 && (
          <Animated.View className="py-4">
            <Text style={{ 
              fontSize: 20, 
              fontWeight: "bold", 
              color: theme === "dark" ? "#E5E7EB" : "#2563eb", 
              marginBottom: 16 
            }}>
              Financial Information
            </Text>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Employment Status <Text className="text-red-500">*</Text>
                </Text>
                <View style={{ 
                  backgroundColor: theme === "dark" ? "#1F2937" : "#F9FAFB",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                  overflow: "hidden"
                }}>
                  <Picker
                    selectedValue={formData.employmentStatus}
                    onValueChange={(value) => updateFormData("employmentStatus", value)}
                    style={{ 
                      height: 50,
                      color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    }}
                    dropdownIconColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  >
                    <Picker.Item label="Select employment status" value="" color={theme === "dark" ? "#9CA3AF" : "#6B7280"} />
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
                  <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Employer Name</Text>
                  <TextInput
                    style={{
                      backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                      borderRadius: 8,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                      borderWidth: 1,
                      borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                    }}
                    placeholder="Enter employer name"
                    placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    value={formData.employerName}
                    onChangeText={(text) => updateFormData("employerName", text)}
                  />
                </View>
              )}

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Monthly Income</Text>
                <View style={{ 
                  flexDirection: "row", 
                  alignItems: "center", 
                  backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  overflow: "hidden"
                }}>
                  <Text style={{ 
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme === "dark" ? "#9CA3AF" : "#64748B",
                    borderRightWidth: 1,
                    borderRightColor: theme === "dark" ? "#374151" : "#E5E7EB"
                  }}>DT</Text>
                  <TextInput
                    style={{
                      flex: 1,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    }}
                    placeholder="Enter monthly income"
                    placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    keyboardType="numeric"
                    value={formData.monthlyIncome}
                    onChangeText={(text) => updateFormData("monthlyIncome", text)}
                  />
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Source of Funds</Text>
                <View style={{ 
                  backgroundColor: theme === "dark" ? "#1F2937" : "#F9FAFB",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                  overflow: "hidden"
                }}>
                  <Picker
                    selectedValue={formData.sourceOfFunds}
                    onValueChange={(value) => updateFormData("sourceOfFunds", value)}
                    style={{ 
                      height: 50,
                      color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    }}
                    dropdownIconColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  >
                    <Picker.Item label="Select source of funds" value="" color={theme === "dark" ? "#9CA3AF" : "#6B7280"} />
                    <Picker.Item label="Salary" value="salary" />
                    <Picker.Item label="Business Income" value="business" />
                    <Picker.Item label="Investments" value="investments" />
                    <Picker.Item label="Inheritance" value="inheritance" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
              </View>

              <View style={{ 
                padding: 16, 
                backgroundColor: theme === "dark" ? "#1E1E1E" : "#EFF6FF",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme === "dark" ? "#374151" : "#BFDBFE",
              }}>
                <View className="flex-row">
                  <MaterialIcons name="security" size={20} color={theme === "dark" ? "#D1D5DB" : "#2563EB"} />
                  <Text style={{ 
                    marginLeft: 8,
                    fontSize: 14,
                    color: theme === "dark" ? "#D1D5DB" : "#2563EB",
                  }}>
                    Your financial information is secure and will only be used for account eligibility assessment.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {currentStep === 4 && (
          <Animated.View className="py-4">
            <Text style={{ 
              fontSize: 20, 
              fontWeight: "bold", 
              color: theme === "dark" ? "#E5E7EB" : "#2563eb", 
              marginBottom: 16 
            }}>
              Review & Submit
            </Text>

            <View
              style={{
                backgroundColor: theme === "dark" ? "#1F2937" : "white",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                overflow: "hidden",
                marginBottom: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0 : 0.05,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <View style={{ 
                padding: 16, 
                backgroundColor: theme === "dark" ? "#111827" : "#EFF6FF",
                borderBottomWidth: 1,
                borderBottomColor: theme === "dark" ? "#374151" : "#BFDBFE",
              }}>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: "bold", 
                  color: theme === "dark" ? "#E5E7EB" : "#2563eb" 
                }}>
                  Personal Information
                </Text>
              </View>

              <View style={{ padding: 16 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Full Name</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>
                    {formData.firstName} {formData.lastName}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Email</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.email}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Phone</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.phone}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>ID Number</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.idNumber}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: theme === "dark" ? "#1F2937" : "white",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                overflow: "hidden",
                marginBottom: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0 : 0.05,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <View style={{ 
                padding: 16, 
                backgroundColor: theme === "dark" ? "#111827" : "#EFF6FF",
                borderBottomWidth: 1,
                borderBottomColor: theme === "dark" ? "#374151" : "#BFDBFE",
              }}>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: "bold", 
                  color: theme === "dark" ? "#E5E7EB" : "#2563eb" 
                }}>
                  Account Information
                </Text>
              </View>

              <View style={{ padding: 16 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Account Type</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{selectedAccount ? selectedAccount.name : ""}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Initial Deposit</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.initialDeposit} DT</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Debit Card</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.wantsDebitCard ? "Yes" : "No"}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Online Banking</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.wantsOnlineBanking ? "Yes" : "No"}</Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center mb-6">
              <TouchableOpacity onPress={() => updateFormData("termsAgreed", !formData.termsAgreed)}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: formData.termsAgreed 
                      ? "#2563eb" 
                      : theme === "dark" ? "#4B5563" : "#9CA3AF",
                    backgroundColor: formData.termsAgreed ? "#2563eb" : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {formData.termsAgreed && <AntDesign name="check" size={14} color="white" />}
                </View>
              </TouchableOpacity>
              <Text style={{ 
                marginLeft: 8,
                color: theme === "dark" ? "#E5E7EB" : "#374151",
              }}>
                I agree to the <Text style={{ color: "#2563eb", fontWeight: "500" }}>Terms & Conditions</Text> and{" "}
                <Text style={{ color: "#2563eb", fontWeight: "500" }}>Privacy Policy</Text>
              </Text>
            </View>

            <View style={{ 
              padding: 16, 
              backgroundColor: theme === "dark" ? "#1E1E1E" : "#FEF3C7",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme === "dark" ? "#374151" : "#FDE68A",
              marginBottom: 16,
            }}>
              <View className="flex-row">
                <MaterialIcons name="info" size={20} color={theme === "dark" ? "#D1D5DB" : "#92400E"} />
                <Text style={{ 
                  marginLeft: 8,
                  fontSize: 14,
                  color: theme === "dark" ? "#D1D5DB" : "#92400E",
                }}>
                  By submitting this application, you authorize us to perform a credit check and verify the information
                  provided.
                </Text>
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      <View style={{ 
        borderTopWidth: 1, 
        borderTopColor: theme === "dark" ? "#374151" : "#E5E7EB", 
        backgroundColor: theme === "dark" ? "#1F2937" : "white",
        padding: 16,
      }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={{ 
              flex: 1, 
              paddingVertical: 12, 
              borderWidth: 1, 
              borderColor: theme === "dark" ? "#374151" : "#D1D5DB", 
              borderRadius: 12, 
              alignItems: "center",
              backgroundColor: theme === "dark" ? "#1F2937" : "white",
            }}
            onPress={handlePrevStep}
          >
            <Text style={{ 
              color: theme === "dark" ? "#E5E7EB" : "#334155", 
              fontWeight: "500" 
            }}>
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
                currentStep === 4 && !formData.termsAgreed 
                  ? theme === "dark" ? "#374151" : "#BFDBFE"
                  : "#2563eb",
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
    </KeyboardAvoidingView>
  );
}