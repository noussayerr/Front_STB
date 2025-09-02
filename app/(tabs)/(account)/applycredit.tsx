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
import { useCreditStore } from "@/app/zustand/useCreditStore";

export default function CreditApplicationScreen() {
  const { 
    creditId, 
    amount, 
    duration, 
    monthlyPayment, 
    interestRate ,
    title
  } = useLocalSearchParams<{
    creditId: string;
    amount: string;
    duration: string;
    monthlyPayment: string;
    interestRate: string;
    title:string
  }>();
  
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { theme } = useTheme();
  const { submitCreditApplication, creditTypes } = useCreditStore();

  // Find selected credit from the store
  const selectedCredit = creditTypes.find((credit) => credit.id === creditId);

  // Form data state with values from params
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

    // Credit Information (pre-filled from params)
    creditType: creditId || "",
    amountRequested: amount || "",
    duration: duration || "",
    purpose: "",
    rib: "",
    monthlyPayment: monthlyPayment || "",
    interestRate: interestRate || "",

    // Financial Information
    employmentStatus: "",
    employerName: "",
    monthlyIncome: "",
    otherLoans: false,
    loanDetails: "",
    title:title || "",
    // Agreement
    termsAgreed: false,
  });

  // Update form data
  const updateFormData = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    
    try {
      await submitCreditApplication({
        ...formData,
        monthlyPayment: parseFloat(formData.monthlyPayment),
        interestRate: parseFloat(formData.interestRate),
        amountRequested: parseFloat(formData.amountRequested),
        duration: parseInt(formData.duration)
      });
      
      Alert.alert(
        "Application Submitted",
        "Your credit application has been successfully submitted. We will review your application and contact you soon.",
        [
          {
            text: "OK",
            //onPress: () => router.push("/(tabs)/(account)"),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "There was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
      if (!formData.purpose || !formData.rib) {
        Alert.alert("Missing Information", "Please fill in all required fields.");
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.employmentStatus || !formData.monthlyIncome) {
        Alert.alert("Missing Information", "Please fill in all required fields.");
        return false;
      }
    } else if (currentStep === 4) {
      if (!formData.termsAgreed) {
        Alert.alert("Agreement Required", "You must agree to the terms and conditions.");
        return false;
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
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
                {step === 1 ? "Personal" : step === 2 ? "Credit" : step === 3 ? "Financial" : "Review"}
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
              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  First Name <Text className="text-red-500">*</Text>
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
                  Email <Text className="text-red-500">*</Text>
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
                  placeholder="Enter your email"
                  placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  keyboardType="email-address"
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
                  ID Number
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
                  placeholder="Enter your national ID number"
                  placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  value={formData.idNumber}
                  onChangeText={(text) => updateFormData("idNumber", text)}
                />
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
              Credit Information
            </Text>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Credit Type</Text>
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
                    {title }
                  </Text>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Amount Requested
                </Text>
                <View style={{ 
                  flexDirection: "row", 
                  alignItems: "center", 
                  backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  padding: 16
                }}>
                  <Text style={{ 
                    color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                  }}>
                    {formData.amountRequested} DT
                  </Text>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Duration
                </Text>
                <View style={{ 
                  backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  padding: 16
                }}>
                  <Text style={{ 
                    color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                  }}>
                    {formData.duration} years
                  </Text>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Monthly Payment
                </Text>
                <View style={{ 
                  backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                  padding: 16
                }}>
                  <Text style={{ 
                    color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                  }}>
                    {formData.monthlyPayment} DT/month
                  </Text>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Purpose <Text className="text-red-500">*</Text>
                </Text>
                <View style={{ 
                  backgroundColor: theme === "dark" ? "#1F2937" : "#F9FAFB",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
                  overflow: "hidden"
                }}>
                  <Picker
                    selectedValue={formData.purpose}
                    onValueChange={(value) => updateFormData("purpose", value)}
                    style={{ 
                      height: 50,
                      color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                    }}
                    dropdownIconColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  >
                    <Picker.Item label="Select purpose" value="" color={theme === "dark" ? "#9CA3AF" : "#6B7280"} />
                    <Picker.Item label="Home Purchase" value="home_purchase" />
                    <Picker.Item label="Home Renovation" value="home_renovation" />
                    <Picker.Item label="Car Purchase" value="car_purchase" />
                    <Picker.Item label="Education" value="education" />
                    <Picker.Item label="Medical Expenses" value="medical" />
                    <Picker.Item label="Debt Consolidation" value="debt_consolidation" />
                    <Picker.Item label="Business Investment" value="business" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Bank Account RIB <Text className="text-red-500">*</Text>
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
                  placeholder="Enter your RIB"
                  placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                  value={formData.rib}
                  onChangeText={(text) => updateFormData("rib", text)}
                />
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
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>
                  Monthly Income <Text className="text-red-500">*</Text>
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
                    placeholder="Enter monthly income"
                    placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    keyboardType="numeric"
                    value={formData.monthlyIncome}
                    onChangeText={(text) => updateFormData("monthlyIncome", text)}
                  />
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Do you have other loans?</Text>
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
                    onPress={() => updateFormData("otherLoans", true)}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: formData.otherLoans 
                          ? "#2563eb" 
                          : theme === "dark" ? "#4B5563" : "#9CA3AF",
                        backgroundColor: formData.otherLoans ? "#2563eb" : "transparent",
                        marginRight: 8,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {formData.otherLoans && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "white" }} />}
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
                    onPress={() => updateFormData("otherLoans", false)}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: formData.otherLoans === false 
                          ? "#2563eb" 
                          : theme === "dark" ? "#4B5563" : "#9CA3AF",
                        backgroundColor: formData.otherLoans === false ? "#2563eb" : "transparent",
                        marginRight: 8,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {formData.otherLoans === false && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "white" }} />}
                    </View>
                    <Text style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {formData.otherLoans && (
                <View className="space-y-2">
                  <Text className="text-sm font-medium" style={{ color: theme === "dark" ? "#E5E7EB" : "#334155" }}>Loan Details</Text>
                  <TextInput
                    style={{
                      backgroundColor: theme === "dark" ? "#1F2937" : "#f9fafb",
                      borderRadius: 8,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      color: theme === "dark" ? "#F3F4F6" : "#0f172a",
                      borderWidth: 1,
                      borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                      minHeight: 100,
                      textAlignVertical: 'top',
                    }}
                    placeholder="Enter details about your other loans"
                    placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    multiline
                    value={formData.loanDetails}
                    onChangeText={(text) => updateFormData("loanDetails", text)}
                  />
                </View>
              )}
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
                  Credit Information
                </Text>
              </View>

              <View style={{ padding: 16 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Credit Type</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{selectedCredit ? selectedCredit.title : ""}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Amount Requested</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.amountRequested} DT</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Duration</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.duration} years</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Monthly Payment</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.monthlyPayment} DT</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Interest Rate</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.interestRate}%</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Purpose</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>
                    {formData.purpose ? formData.purpose.replace('_', ' ') : ''}
                  </Text>
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
                  Financial Information
                </Text>
              </View>

              <View style={{ padding: 16 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Employment Status</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>
                    {formData.employmentStatus ? formData.employmentStatus.replace('-', ' ') : ''}
                  </Text>
                </View>

                {formData.employerName && (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                    <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Employer Name</Text>
                    <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.employerName}</Text>
                  </View>
                )}

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Monthly Income</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>{formData.monthlyIncome} DT</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                  <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Other Loans</Text>
                  <Text style={{ color: theme === "dark" ? "#F3F4F6" : "#1F2937", fontWeight: "500" }}>
                    {formData.otherLoans ? "Yes" : "No"}
                  </Text>
                </View>

                {formData.otherLoans && formData.loanDetails && (
                  <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                    <Text style={{ color: theme === "dark" ? "#9CA3AF" : "#64748B" }}>Loan Details</Text>
                    <Text style={{ 
                      color: theme === "dark" ? "#F3F4F6" : "#1F2937", 
                      fontWeight: "500",
                      flexShrink: 1,
                      maxWidth: '50%',
                      textAlign: 'right'
                    }}>
                      {formData.loanDetails}
                    </Text>
                  </View>
                )}
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
          </Animated.View>
        )}
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
      </ScrollView>

      
    </KeyboardAvoidingView>
  );
}