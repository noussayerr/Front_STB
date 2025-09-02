import { useTheme } from "@/app/providers/ThemeProvider";
import { useAuthStore } from "@/app/zustand/authStore";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { 
    user, 
    logout, 
    requests, 
    updateProfile, 
    fetchUserApplications,
    getApplicationDetails
  } = useAuthStore();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFirstName, setEditFirstName] = useState(user?.firstName || "");
  const [editLastName, setEditLastName] = useState(user?.lastName || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingRequests, setIsFetchingRequests] = useState(false);

  useEffect(() => {
    const loadRequests = async () => {
      setIsFetchingRequests(true);
      try {
        await fetchUserApplications();
      } catch (error) {
        Alert.alert("Error", "Failed to load applications");
      } finally {
        setIsFetchingRequests(false);
      }
    };
    
    loadRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return theme === "dark" ? "#10b981" : "#059669";
      case "pending":
        return theme === "dark" ? "#f59e0b" : "#d97706";
      case "rejected":
        return theme === "dark" ? "#ef4444" : "#dc2626";
      default:
        return theme === "dark" ? "#6b7280" : "#9ca3af";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "approved":
        return theme === "dark" ? "bg-green-900/20" : "bg-green-100";
      case "pending":
        return theme === "dark" ? "bg-yellow-900/20" : "bg-yellow-100";
      case "rejected":
        return theme === "dark" ? "bg-red-900/20" : "bg-red-100";
      default:
        return theme === "dark" ? "bg-gray-800" : "bg-gray-100";
    }
  };

  const getTypeIcon = (type: string) => {
    const iconColor = theme === "dark" ? "#60a5fa" : "#2563eb";
    switch (type) {
      case "account":
        return "account-balance";
      case "card":
        return "credit-card";
      case "credit":
        return "credit-score";
      case "loan":
        return "account-balance-wallet";
      default:
        return "account-balance";
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await updateProfile(editFirstName, editLastName, editEmail);
      Alert.alert("Success", "Profile updated successfully");
      setShowEditModal(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewDetails = async (item: any) => {
    setIsLoading(true);
    try {
      const details = await getApplicationDetails(item.id, item.type);
      setSelectedRequest(details);
    } catch (error) {
      Alert.alert("Error", "Failed to load application details");
    } finally {
      setIsLoading(false);
    }
  };

  const renderRequestItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleViewDetails(item)}
      activeOpacity={0.7}
    >
      <Animated.View
        className={`rounded-2xl overflow-hidden border mb-4 ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
      >
        <View className="p-5">
          <View className="flex-row items-center mb-3">
            <View
              className={`w-12 h-12 rounded-full ${
                theme === "dark" ? "bg-blue-900" : "bg-blue-100"
              } items-center justify-center`}
            >
              <MaterialIcons
                name={getTypeIcon(item.type) as any}
                size={24}
                color={theme === "dark" ? "#93c5fd" : "#2563eb"}
              />
            </View>
            <View className="ml-3 flex-1">
              <Text
                className={`text-lg font-bold ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                {item.title}
              </Text>
              <Text
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-slate-500"
                }`}
              >
                {item.requestNumber} • {formatDate(item.date)}
              </Text>
            </View>
            <View
              className={`px-3 py-1 rounded-full ${getStatusBgColor(item.status)}`}
            >
              <Text
                className="text-xs font-medium capitalize"
                style={{ color: getStatusColor(item.status) }}
              >
                {item.status}
              </Text>
            </View>
          </View>

          {item.amount && (
            <View className="mb-3">
              <Text
                className={`text-base font-semibold ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {item.amount}
              </Text>
            </View>
          )}

          <Text
            className={`text-base ${
              theme === "dark" ? "text-gray-300" : "text-slate-700"
            } mb-3`}
          >
            {item.description}
          </Text>

          <View className="flex-row justify-end">
            <TouchableOpacity 
              className="flex-row items-center"
              onPress={() => handleViewDetails(item)}
            >
              <Text
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                } mr-1`}
              >
                View Details
              </Text>
              <AntDesign
                name="right"
                size={12}
                color={theme === "dark" ? "#60a5fa" : "#2563eb"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View
      className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}
      style={{ paddingTop: insets.top }}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "#121212" : "#ffffff"}
      />

      {/* Header */}
      <View
        className={`px-5 py-4 flex-row items-center justify-between border-b ${
          theme === "dark" ? "border-gray-800" : "border-gray-100"
        }`}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign
            name="arrowleft"
            size={24}
            color={theme === "dark" ? "#f8fafc" : "#0f172a"}
          />
        </TouchableOpacity>
        <Text
          className={`text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}
        >
          Profile
        </Text>
        <TouchableOpacity onPress={() => setShowEditModal(true)}>
          <Feather
            name="edit-2"
            size={20}
            color={theme === "dark" ? "#60a5fa" : "#2563eb"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="p-5">
          <View
            className={`rounded-2xl overflow-hidden border ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
            } p-6`}
          >
            <View className="items-center">
              <View
                className={`w-20 h-20 rounded-full ${
                  theme === "dark" ? "bg-blue-900" : "bg-blue-100"
                } items-center justify-center mb-4`}
              >
                <Feather
                  name="user"
                  size={32}
                  color={theme === "dark" ? "#93c5fd" : "#2563eb"}
                />
              </View>
              <Text
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                } mb-1`}
              >
                {user?.firstName || "John"} {user?.lastName || "Doe"}
              </Text>
              <Text
                className={`text-base ${
                  theme === "dark" ? "text-gray-400" : "text-slate-500"
                } mb-4`}
              >
                {user?.email || "john.doe@example.com"}
              </Text>

              {/* Account Stats */}
              <View className="flex-row justify-around w-full">
                <View className="items-center">
                  <Text
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    3
                  </Text>
                  <Text
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-slate-500"
                    }`}
                  >
                    Accounts
                  </Text>
                </View>
                <View className="items-center">
                  <Text
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    2
                  </Text>
                  <Text
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-slate-500"
                    }`}
                  >
                    Cards
                  </Text>
                </View>
                <View className="items-center">
                  <Text
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {requests?.length || 0}
                  </Text>
                  <Text
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-slate-500"
                    }`}
                  >
                    Requests
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Requests Section */}
        <View className="px-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text
              className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Recent Requests
            </Text>
            <TouchableOpacity onPress={() => fetchUserApplications()}>
              <Text
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Refresh
              </Text>
            </TouchableOpacity>
          </View>

          {isFetchingRequests ? (
            <View className="py-8">
              <ActivityIndicator size="large" color={theme === "dark" ? "#60a5fa" : "#2563eb"} />
            </View>
          ) : (
            <FlatList
              data={requests}
              renderItem={renderRequestItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View className="py-8 items-center">
                  <Text className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    No requests found
                  </Text>
                </View>
              }
            />
          )}
        </View>

        {/* Logout Button */}
        <View className="px-5 pb-8">
          <TouchableOpacity
            onPress={logout}
            className={`rounded-2xl overflow-hidden border ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
            } p-4 flex-row items-center justify-center`}
          >
            <Feather name="log-out" size={20} color="#ef4444" />
            <Text className="ml-2 text-red-500 font-semibold text-base">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Request Details Modal */}
      <Modal
        visible={!!selectedRequest}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedRequest(null)}
      >
        <View
          className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}
          style={{ paddingTop: insets.top }}
        >
          <View
            className={`px-5 py-4 flex-row items-center justify-between border-b ${
              theme === "dark" ? "border-gray-800" : "border-gray-100"
            }`}
          >
            <Text
              className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Request Details
            </Text>
            <TouchableOpacity onPress={() => setSelectedRequest(null)}>
              <AntDesign
                name="close"
                size={24}
                color={theme === "dark" ? "#f8fafc" : "#0f172a"}
              />
            </TouchableOpacity>
          </View>

          {selectedRequest && (
            <ScrollView className="flex-1 p-5">
              <View
                className={`rounded-2xl overflow-hidden border ${
                  theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                } p-6 mb-4`}
              >
                <View className="items-center mb-6">
                  <View
                    className={`w-16 h-16 rounded-full ${
                      theme === "dark" ? "bg-blue-900" : "bg-blue-100"
                    } items-center justify-center mb-4`}
                  >
                    <MaterialIcons
                      name={getTypeIcon(selectedRequest.type) as any}
                      size={32}
                      color={theme === "dark" ? "#93c5fd" : "#2563eb"}
                    />
                  </View>
                  <Text
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    } text-center mb-2`}
                  >
                    {selectedRequest.title}
                  </Text>
                  <View
                    className={`px-4 py-2 rounded-full ${getStatusBgColor(
                      selectedRequest.status
                    )}`}
                  >
                    <Text
                      className="text-sm font-medium capitalize"
                      style={{ color: getStatusColor(selectedRequest.status) }}
                    >
                      {selectedRequest.status}
                    </Text>
                  </View>
                </View>

                <View className="space-y-4">
                  <View className="flex-row justify-between">
                    <Text
                      className={`font-medium ${
                        theme === "dark" ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      Request Number
                    </Text>
                    <Text
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {selectedRequest.requestNumber}
                    </Text>
                  </View>

                  <View className="flex-row justify-between">
                    <Text
                      className={`font-medium ${
                        theme === "dark" ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      Date Submitted
                    </Text>
                    <Text
                      className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {formatDate(selectedRequest.date)}
                    </Text>
                  </View>

                  {selectedRequest.amount && (
                    <View className="flex-row justify-between">
                      <Text
                        className={`font-medium ${
                          theme === "dark" ? "text-gray-400" : "text-slate-500"
                        }`}
                      >
                        Amount
                      </Text>
                      <Text
                        className={`font-semibold ${
                          theme === "dark" ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {selectedRequest.amount}
                      </Text>
                    </View>
                  )}

                  <View
                    className={`border-t pt-4 ${
                      theme === "dark" ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <Text
                      className={`font-medium mb-2 ${
                        theme === "dark" ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      Description
                    </Text>
                    <Text
                      className={`text-base leading-6 ${
                        theme === "dark" ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      {selectedRequest.description}
                    </Text>
                  </View>

                  {selectedRequest.personalInfo && (
                    <>
                      <View
                        className={`border-t pt-4 ${
                          theme === "dark" ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        <Text
                          className={`font-medium mb-2 ${
                            theme === "dark" ? "text-gray-400" : "text-slate-500"
                          }`}
                        >
                          Personal Information
                        </Text>
                        <View className="space-y-2">
                          <Text
                            className={`text-base ${
                              theme === "dark" ? "text-gray-300" : "text-slate-700"
                            }`}
                          >
                            {selectedRequest.personalInfo.firstName} {selectedRequest.personalInfo.lastName}
                          </Text>
                          <Text
                            className={`text-base ${
                              theme === "dark" ? "text-gray-300" : "text-slate-700"
                            }`}
                          >
                            {selectedRequest.personalInfo.email}
                          </Text>
                          <Text
                            className={`text-base ${
                              theme === "dark" ? "text-gray-300" : "text-slate-700"
                            }`}
                          >
                            {selectedRequest.personalInfo.phone}
                          </Text>
                        </View>
                      </View>
                    </>
                  )}

                  {selectedRequest.adminNotes && (
                    <View
                      className={`border-t pt-4 ${
                        theme === "dark" ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <Text
                        className={`font-medium mb-2 ${
                          theme === "dark" ? "text-gray-400" : "text-slate-500"
                        }`}
                      >
                        Admin Notes
                      </Text>
                      <Text
                        className={`text-base leading-6 ${
                          theme === "dark" ? "text-gray-300" : "text-slate-700"
                        }`}
                      >
                        {selectedRequest.adminNotes}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View
          className={`flex-1 ${theme === "dark" ? "bg-[#121212]" : "bg-white"}`}
          style={{ paddingTop: insets.top }}
        >
          <View
            className={`px-5 py-4 flex-row items-center justify-between border-b ${
              theme === "dark" ? "border-gray-800" : "border-gray-100"
            }`}
          >
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <Text
                className={`text-base ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <Text
              className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Edit Profile
            </Text>
            <TouchableOpacity onPress={handleSaveProfile} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={theme === "dark" ? "#60a5fa" : "#2563eb"}
                />
              ) : (
                <Text
                  className={`text-base font-semibold ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Save
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-5">
            <View className="space-y-6">
              <View>
                <Text
                  className={`text-base font-medium mb-2 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  First Name
                </Text>
                <TextInput
                  value={editFirstName}
                  onChangeText={setEditFirstName}
                  className={`rounded-xl px-4 py-3 text-base border ${
                    theme === "dark"
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-white text-slate-900 border-gray-200"
                  }`}
                  placeholder="Enter your first name"
                  placeholderTextColor={
                    theme === "dark" ? "#9ca3af" : "#64748b"
                  }
                />
              </View>

              <View>
                <Text
                  className={`text-base font-medium mb-2 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Last Name
                </Text>
                <TextInput
                  value={editLastName}
                  onChangeText={setEditLastName}
                  className={`rounded-xl px-4 py-3 text-base border ${
                    theme === "dark"
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-white text-slate-900 border-gray-200"
                  }`}
                  placeholder="Enter your last name"
                  placeholderTextColor={
                    theme === "dark" ? "#9ca3af" : "#64748b"
                  }
                />
              </View>

              <View>
                <Text
                  className={`text-base font-medium mb-2 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  Email Address
                </Text>
                <TextInput
                  value={editEmail}
                  onChangeText={setEditEmail}
                  className={`rounded-xl px-4 py-3 text-base border ${
                    theme === "dark"
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-white text-slate-900 border-gray-200"
                  }`}
                  placeholder="Enter your email"
                  placeholderTextColor={
                    theme === "dark" ? "#9ca3af" : "#64748b"
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}