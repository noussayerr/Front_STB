import { useState } from "react"
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
} from "react-native"
import { Dropdown } from 'react-native-element-dropdown';
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import Animated from "react-native-reanimated"
import { Picker } from "@react-native-picker/picker"
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCardStore } from '@/app/zustand/useCardStore';
import { useTheme } from "@/app/providers/ThemeProvider"

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  cardType: string
  cardHolderName: string
  deliveryAddress: string
  deliveryCity: string
  deliveryPostalCode: string
  employmentStatus: string
  employerName: string
  monthlyIncome: string
  termsAgreed: boolean
  bankingAccount: string;
}
interface DropdownOption {
  value: string;
  label: string;
}

export default function GetCardScreen() {
  const { selectedCardType } = useCardStore();
  const router = useRouter()
  const { cardId } = useLocalSearchParams<{ cardId: string }>()
  const insets = useSafeAreaInsets()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const { theme } = useTheme()
  const { submitApplication} = useCardStore();
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
    bankingAccount: "",
  })

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await submitApplication(formData)
    router.push("/(tabs)")
    setTimeout(() => {
      setIsSubmitting(false)
      
    }, 2000)
  }

  const validateStep = (): boolean => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        Alert.alert("Missing Information", "Please fill in all required fields.")
        return false
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address.")
        return false
      }
    } else if (currentStep === 2) {
      if (!formData.cardHolderName || !formData.deliveryAddress || !formData.deliveryCity) {
        Alert.alert("Missing Information", "Please fill in all required fields.")
        return false
      }
    } else if (currentStep === 3) {
      if (!formData.employmentStatus || !formData.monthlyIncome) {
        Alert.alert("Missing Information", "Please fill in all required fields.")
        return false
      }
    }
    return true
  }

  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.back()
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={`flex h-full ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}
      
    >
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} backgroundColor={theme === "dark" ? "#121212" : "#ffffff"} />
      <View className={`px-5 py-3 ${theme === "dark" ? "bg-gray-800" : "bg-blue-50"}`}>
        <View className="flex-row justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <View key={step} className="items-center">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  step < currentStep ? "bg-green-500" : step === currentStep ? "bg-blue-600" : theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                }`}
              >
                {step < currentStep ? (
                  <AntDesign name="check" size={16} color="white" />
                ) : (
                  <Text className="text-white font-bold">{step}</Text>
                )}
              </View>
              <Text className={`text-xs mt-1 ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>
                {step === 1 ? "Personal" : step === 2 ? "Card" : step === 3 ? "Employment" : "Review"}
              </Text>
            </View>
          ))}

          <View className={`absolute top-4 left-9 right-9 h-[2px] ${theme === "dark" ? "bg-gray-600" : "bg-gray-300"} -z-10`} />
          <View
            className="absolute top-4 left-9 h-[2px] bg-blue-600 -z-10"
            style={{
              width: `${(currentStep - 1) * 33.3}%`,
            }}
          />
        </View>
      </View>

      <ScrollView className="flex px-5 mb-4" showsVerticalScrollIndicator={false}>
        {currentStep === 1 && (
          <Animated.View className="py-4">
            <Text className={`text-xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"} mb-4`}>Personal Information</Text>
            <View className="space-y-2">
                <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                  Banking Account ID <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                    className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                    placeholder="Enter your banking account ID"
                    placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                    value={formData.bankingAccount}
                    onChangeText={(text) => updateFormData("bankingAccount", text)}
                  />
            </View>
            <View className="space-y-4">
              <View className="space-y-2">
                <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                  First Name <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                  placeholder="Enter your first name"
                  placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                  value={formData.firstName}
                  onChangeText={(text) => updateFormData("firstName", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                  Last Name <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                  placeholder="Enter your last name"
                  placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                  value={formData.lastName}
                  onChangeText={(text) => updateFormData("lastName", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                  Email Address <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                  placeholder="Enter your email address"
                  placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => updateFormData("email", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                  Phone Number <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                  placeholder="Enter your phone number"
                  placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => updateFormData("phone", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Address</Text>
                <TextInput
                  className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                  placeholder="Enter your address"
                  placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                  value={formData.address}
                  onChangeText={(text) => updateFormData("address", text)}
                />
              </View>

              <View className="flex-row space-x-3">
                <View className="flex-1 space-y-2">
                  <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>City</Text>
                  <TextInput
                    className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                    placeholder="City"
                    placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                    value={formData.city}
                    onChangeText={(text) => updateFormData("city", text)}
                  />
                </View>

                <View className="w-1/3 space-y-2">
                  <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Postal Code</Text>
                  <TextInput
                    className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                    placeholder="Code"
                    placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
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
            <Text className={`text-xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"} mb-4`}>Card Information</Text>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Selected Card</Text>
                <View className={`${theme === "dark" ? "bg-blue-900 border-blue-800" : "bg-blue-50 border-blue-200"} rounded-lg px-4 py-3 border`}>
                  <Text className={`text-base font-medium ${theme === "dark" ? "text-blue-300" : "text-blue-700"}`}>
                    {selectedCardType ? selectedCardType.name : "Select a card"}
                  </Text>
                </View>
              </View>

              <View className="space-y-2">
                <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                  Card Holder Name <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                  placeholder="Name as it will appear on card"
                  placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                  value={formData.cardHolderName}
                  onChangeText={(text) => updateFormData("cardHolderName", text)}
                />
              </View>

              <View className="space-y-2">
                <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                  Delivery Address <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                  placeholder="Enter delivery address"
                  placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                  value={formData.deliveryAddress}
                  onChangeText={(text) => updateFormData("deliveryAddress", text)}
                />
              </View>

              <View className="flex-row space-x-3">
                <View className="flex-1 space-y-2">
                  <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                    City <Text className="text-red-500">*</Text>
                  </Text>
                  <TextInput
                    className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                    placeholder="City"
                    placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                    value={formData.deliveryCity}
                    onChangeText={(text) => updateFormData("deliveryCity", text)}
                  />
                </View>

                <View className="w-1/3 space-y-2">
                  <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Postal Code</Text>
                  <TextInput
                    className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                    placeholder="Code"
                    placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                    keyboardType="numeric"
                    value={formData.deliveryPostalCode}
                    onChangeText={(text) => updateFormData("deliveryPostalCode", text)}
                  />
                </View>
              </View>

              <View className={`p-4 ${theme === "dark" ? "bg-yellow-900 border-yellow-800" : "bg-yellow-50 border-yellow-200"} rounded-lg border`}>
                <View className="flex-row">
                  <MaterialIcons name="info" size={20} color={theme === "dark" ? "#f59e0b" : "#d97706"} />
                  <Text className={`ml-2 text-sm ${theme === "dark" ? "text-yellow-200" : "text-amber-700"}`}>
                    Your card will be delivered to this address within 5-7 days after approval.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {currentStep === 3 && (
          <Animated.View className="py-4">
          <Text className={`text-xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"} mb-4`}>Employment Information</Text>
      
          <View className="space-y-4">
            <View className="space-y-2">
              <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                Employment Status <Text className="text-red-500">*</Text>
              </Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  theme === "dark" 
                    ? { backgroundColor: '#374151', borderColor: '#4b5563' }
                    : { backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }
                ]}
                placeholderStyle={[
                  styles.placeholderStyle,
                  { color: theme === "dark" ? '#9ca3af' : '#64748b' }
                ]}
                selectedTextStyle={[
                  styles.selectedTextStyle,
                  { color: theme === "dark" ? '#ffffff' : '#000000' }
                ]}
                inputSearchStyle={[
                  styles.inputSearchStyle,
                  { 
                    color: theme === "dark" ? '#ffffff' : '#000000',
                    backgroundColor: theme === "dark" ? '#374151' : '#f9fafb'
                  }
                ]}
                iconStyle={styles.iconStyle}
                data={[
                  { label: 'Select employment status', value: '' },
                  { label: 'Employed', value: 'employed' },
                  { label: 'Self-employed', value: 'self-employed' },
                  { label: 'Student', value: 'student' },
                  { label: 'Retired', value: 'retired' },
                  { label: 'Unemployed', value: 'unemployed' },
                ]}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select employment status"
                searchPlaceholder="Search..."
                value={formData.employmentStatus}
                onChange={(item) => updateFormData("employmentStatus", item.value)}
                renderLeftIcon={() => (
                  <MaterialIcons 
                    name="work" 
                    size={20} 
                    color={theme === "dark" ? "#9ca3af" : "#64748b"} 
                    style={{ marginRight: 10 }}
                  />
                )}
              />
            </View>
      
            {(formData.employmentStatus === "employed" || formData.employmentStatus === "self-employed") && (
              <View className="space-y-2">
                <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>Employer Name</Text>
                <TextInput
                  className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                  placeholder="Enter employer name"
                  placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                  value={formData.employerName}
                  onChangeText={(text) => updateFormData("employerName", text)}
                />
              </View>
            )}
      
            <View className="space-y-2">
              <Text className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                Monthly Income <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className={`${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 text-slate-900 border-gray-200"} rounded-lg px-4 py-3 border`}
                placeholder="Enter monthly income"
                placeholderTextColor={theme === "dark" ? "#9ca3af" : "#64748b"}
                keyboardType="numeric"
                value={formData.monthlyIncome}
                onChangeText={(text) => updateFormData("monthlyIncome", text)}
              />
            </View>
      
            <View className={`p-4 ${theme === "dark" ? "bg-blue-900 border-blue-800" : "bg-blue-50 border-blue-200"} rounded-lg border`}>
              <View className="flex-row">
                <MaterialIcons name="security" size={20} color={theme === "dark" ? "#93c5fd" : "#2563eb"} />
                <Text className={`ml-2 text-sm ${theme === "dark" ? "text-blue-200" : "text-blue-700"}`}>
                  Your financial information is secure and will only be used for card eligibility assessment.
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
        )}

        {currentStep === 4 && (
          <Animated.View className="py-4">
            <Text className={`text-xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"} mb-4`}>Review & Submit</Text>

            <View
              className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} rounded-xl border overflow-hidden shadow-sm mb-4`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0.1 : 0.05,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <View className={`p-4 ${theme === "dark" ? "bg-blue-900 border-blue-800" : "bg-blue-50 border-blue-100"} border-b`}>
                <Text className={`text-lg font-bold ${theme === "dark" ? "text-blue-200" : "text-blue-700"}`}>Personal Information</Text>
              </View>

              <View className="p-4">
                <View className="flex-row justify-between py-2">
                  <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Full Name</Text>
                  <Text className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>
                    {formData.firstName} {formData.lastName}
                  </Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Email</Text>
                  <Text className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{formData.email}</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Phone</Text>
                  <Text className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{formData.phone}</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Address</Text>
                  <Text className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium text-right`}>
                    {formData.address}, {formData.city}
                  </Text>
                </View>
              </View>
            </View>

            <View
              className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} rounded-xl border overflow-hidden shadow-sm mb-4`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: theme === "dark" ? 0.1 : 0.05,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <View className={`p-4 ${theme === "dark" ? "bg-blue-900 border-blue-800" : "bg-blue-50 border-blue-100"} border-b`}>
                <Text className={`text-lg font-bold ${theme === "dark" ? "text-blue-200" : "text-blue-700"}`}>Card Information</Text>
              </View>

              <View className="p-4">
                <View className="flex-row justify-between py-2">
                  <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Card Type</Text>
                  <Text className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{selectedCardType ? selectedCardType.name : ""}</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Card Holder</Text>
                  <Text className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium`}>{formData.cardHolderName}</Text>
                </View>

                <View className="flex-row justify-between py-2">
                  <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>Delivery Address</Text>
                  <Text className={`${theme === "dark" ? "text-white" : "text-slate-900"} font-medium text-right`}>
                    {formData.deliveryAddress}, {formData.deliveryCity}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center mb-6">
              <TouchableOpacity onPress={() => updateFormData("termsAgreed", !formData.termsAgreed)}>
                <View
                  className={`w-6 h-6 rounded border ${formData.termsAgreed ? "bg-blue-600 border-blue-600" : theme === "dark" ? "border-gray-500" : "border-gray-300"} items-center justify-center`}
                >
                  {formData.termsAgreed && <AntDesign name="check" size={14} color="white" />}
                </View>
              </TouchableOpacity>
              <Text className={`ml-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                I agree to the <Text className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"} font-medium`}>Terms & Conditions</Text> and{" "}
                <Text className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"} font-medium`}>Privacy Policy</Text>
              </Text>
            </View>

            <View className={`p-4 ${theme === "dark" ? "bg-yellow-900 border-yellow-800" : "bg-yellow-50 border-yellow-200"} rounded-lg border mb-4`}>
              <View className="flex-row">
                <MaterialIcons name="info" size={20} color={theme === "dark" ? "#f59e0b" : "#d97706"} />
                <Text className={`ml-2 text-sm ${theme === "dark" ? "text-yellow-200" : "text-amber-700"}`}>
                  By submitting this application, you authorize us to perform a credit check and verify the information
                  provided.
                </Text>
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      <View className={`px-5 py-4 border-t mb-20 ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
        <View className="flex-row space-x-3">
          <TouchableOpacity
            className={`flex-1 py-3 border ${theme === "dark" ? "border-gray-600" : "border-gray-300"} rounded-xl items-center`}
            onPress={handlePrevStep}
          >
            <Text className={`${theme === "dark" ? "text-gray-300" : "text-slate-700"} font-medium`}>
              {currentStep === 1 ? "Cancel" : "Previous"}
            </Text>
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

const styles = {
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 12,
  },
};