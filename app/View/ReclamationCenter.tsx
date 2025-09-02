// components/ReclamationForm.tsx
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from 'react';
import { 
  Alert,
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { useTheme } from '../providers/ThemeProvider';
import { useAuthStore } from '../zustand/authStore';
import { useReclamationStore } from '../zustand/reclamation.store';
import { useRouter } from "expo-router"

const ReclamationForm = () => {
  const { theme } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const { submitReclamation, isLoading } = useReclamationStore();
  const { isAuthenticated, user } = useAuthStore();
const router = useRouter()
  const subjects = [
    'Card Transaction Issue',
    'ATM Problem',
    'Mobile App Issue',
    'Account Problem',
    'Customer Service',
    'Technical Support',
    'Other'
  ];

  const handleSubmit = async () => {
    if (!selectedSubject) {
      Alert.alert("Error", "Please select a subject");
      return;
    }
    
    if (!description.trim()) {
      Alert.alert("Error", "Please describe your problem");
      return;
    }

    try {
      const submissionData = {
        subject: selectedSubject,
        description,
        category: selectedSubject,
        ...(!isAuthenticated && { email }) // Only include email if not authenticated
      };

      await submitReclamation(submissionData);
      
      Alert.alert("Success", "Your reclamation has been submitted successfully!");
      router.push("/(tabs)");
      // Reset form
      setSelectedSubject('');
      setDescription('');
      if (!isAuthenticated) setEmail('');
    } catch (error) {
      // Error handling is done in the store
    }
  };

  return (
    <ScrollView 
      className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}
      contentContainerStyle={{ padding: 20 }}
    >
      <View className="px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign 
            name="left" 
            size={24} 
            color={theme === "dark" ? "#ffffff" : "#000000"} 
          />
        </TouchableOpacity>
      </View>
      <View className="mb-8">
        <Text className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Submit a Reclamation
        </Text>
        <Text className={`text-base ${theme === "dark" ? "text-gray-400" : "text-slate-600"}`}>
          Tell us about your problem and we'll help you resolve it
        </Text>
      </View>

      {/* Email Input - only show if not authenticated */}
      {!isAuthenticated && (
        <View className="mb-6">
          <Text className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Your Email
          </Text>
          <TextInput
            className={`border-2 rounded-xl p-4 text-base ${
              theme === "dark" 
                ? "border-gray-600 bg-gray-800 text-white" 
                : "border-gray-200 bg-white text-slate-900"
            }`}
            placeholder="Enter your email address"
            placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      )}

      {/* Subject Selection */}
      <View className="mb-6">
        <Text className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Select Subject
        </Text>
        <View className="gap-3">
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject}
              onPress={() => setSelectedSubject(subject)}
              className={`p-4 rounded-xl border-2 flex-row justify-between items-center ${
                selectedSubject === subject
                  ? "border-blue-600 bg-blue-50"
                  : theme === "dark" 
                    ? "border-gray-600 bg-gray-800" 
                    : "border-gray-200 bg-white"
              }`}
            >
              <Text className={`text-base font-medium ${
                selectedSubject === subject
                  ? "text-blue-600"
                  : theme === "dark" ? "text-white" : "text-slate-900"
              }`}>
                {subject}
              </Text>
              {selectedSubject === subject && (
                <AntDesign name="checkcircle" size={20} color="#2563eb" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Description */}
      <View className="mb-8">
        <Text className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Describe Your Problem
        </Text>
        <TextInput
          className={`border-2 rounded-xl p-4 text-base min-h-[120px] ${
            theme === "dark" 
              ? "border-gray-600 bg-gray-800 text-white" 
              : "border-gray-200 bg-white text-slate-900"
          }`}
          placeholder="Please provide details about your problem..."
          placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
          multiline
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className={`py-4 rounded-xl ${isLoading ? "bg-blue-400" : "bg-blue-600"}`}
        onPress={handleSubmit}
        activeOpacity={0.8}
        disabled={isLoading}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {isLoading ? "Submitting..." : "Submit Reclamation"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReclamationForm;