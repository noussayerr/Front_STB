import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, Dimensions } from "react-native"
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import Animated from "react-native-reanimated"
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons"

type Reason = {
  text: string;
  icon: string; // Ensure this is defined as a string
};

type Card = {
  id: string;
  image: any;
  name: string;
  description: string;
  tag: string;
  why: string;
  reasons: Reason[];
  features: string[];
  fees: {
    annual: string;
    withdrawal: string;
    replacement: string;
  };
};
const CartDetailsScreen = () => {
  const { id } = useLocalSearchParams(); // Get ID from URL

  // Mock data (normally, you fetch this from an API or pass it via global state)
  const Cards: Card[] =[
    {
      id: "1",
      image: require("@/assets/carts/CARTESTBTRAVEL.png"),
      name: "Carte STB Travel",
      description: "Voyagez serein….",
      tag: "International",
      why: "The STB Travel card is an international Mastercard for payments and cash withdrawals abroad. It allows you to manage your travel allowance and offers you assistance and insurance abroad. The STB Travel card is a prepaid card, reloadable, secure and easy to use, equipped with the 'contactless' technology.",
      reasons: [
        {
          text: "Pay for your expenses abroad at merchants, department stores, hotels, restaurants, affiliated to the MASTERCARD International network",
          icon: "credit-card",
        },
        {
          text: "Withdraw money from ATMs abroad displaying the MASTERCARD logo",
          icon: "atm",
        },
        {
          text: "Book a hotel abroad on the Internet from Tunisia",
          icon: "hotel",
        },
        {
          text: "Receive the amount of the tax refund directly on the card",
          icon: "payments",
        },
      ],
      features: [
        "Contactless payments",
        "24/7 customer support",
        "Travel insurance included",
        "Emergency card replacement",
        "Fraud protection",
      ],
      fees: {
        annual: "60 DT",
        withdrawal: "3 DT + 2.5%",
        replacement: "20 DT",
      },
    },
    {
      id: "2",
      image: require("@/assets/carts/CarteSTBEpargne.png"),
      name: "Carte STB Epargne",
      description:
        "La carte Epargne vous évite le déplacement à l'agence et vous permet de faire face à des dépenses urgentes.",
      tag: "Savings",
      why: "The STB Epargne card gives you access to your savings account without having to visit the branch. It allows you to face urgent expenses and manage your savings efficiently.",
      reasons: [
        {
          text: "Availability: Your savings are available at any time, you can, when you want, consult the balance of your account and make withdrawals at all DAB/GAB STB.",
          icon: "access-time",
        },
        {
          text: "Practical management of your card: You can access a range of practical services free of charge via the DigiEpargne application (balance consultation, consultation of the latest transactions, etc.);",
          icon: "phone-android",
        },
        {
          text: "High usage limits adapted to your needs.",
          icon: "trending-up",
        },
      ],
      features: [
        "Access to savings account",
        "Mobile app management",
        "High withdrawal limits",
        "No annual fee",
        "Instant balance check",
      ],
      fees: {
        annual: "Free",
        withdrawal: "1 DT",
        replacement: "15 DT",
      },
    },
    {
      id: "3",
      image: require("@/assets/carts/CARTEVISAELECTRONNATIONALE.png"),
      name: "Carte Visa Electron Nationale",
      description:
        "Vous êtes résidents en Tunisie et vous cherchez un moyen de paiement et de retrait qui vous convient ?….",
      tag: "National",
      why: "The STB-VISA Electron National Card is perfect for residents in Tunisia looking for a convenient payment and withdrawal method. It offers security and ease of use for your daily transactions.",
      reasons: [
        {
          text: "The STB-VISA Electron National Card is granted for a period of five years",
          icon: "event-available",
        },
        {
          text: "It is renewed by tacit agreement for the same period unless you express your wish to the contrary 30 days before the expiration of the said period",
          icon: "autorenew",
        },
      ],
      features: [
        "National payments",
        "ATM withdrawals",
        "Secure transactions",
        "Accepted nationwide",
        "5-year validity",
      ],
      fees: {
        annual: "30 DT",
        withdrawal: "0.5 DT",
        replacement: "20 DT",
      },
    },
    {
      id: "4",
      image: require("@/assets/carts/CARTECIB3.png"),
      name: "Carte CIB3",
      description: "Vous souhaitez une solution de paiement et de retrait pratique et moderne ?",
      tag: "Premium",
      why: "The STB CIB MasterCard offers a practical and modern payment and withdrawal solution. It's designed for those who want convenience and security in their daily financial transactions.",
      reasons: [
        {
          text: "STB CIB MasterCard is granted for a period of five years",
          icon: "event-available",
        },
        {
          text: "It shall be tacitly renewed for the same period unless otherwise specified 30 days before the expiry of the aforementioned period.",
          icon: "autorenew",
        },
      ],
      features: [
        "Premium services",
        "Higher transaction limits",
        "Priority customer support",
        "Purchase protection",
        "Extended warranty",
      ],
      fees: {
        annual: "80 DT",
        withdrawal: "Free",
        replacement: "25 DT",
      },
    },
    {
      id: "5",
      image: require("@/assets/carts/CarteCCash.png"),
      name: "Carte C Cash",
      description: "Plus besoin d'un compte bancaire pour avoir une carte",
      tag: "Prepaid",
      why: "The C Cash card allows you to have a payment card without needing a bank account. It's perfect for managing a specific budget or for giving to family members.",
      reasons: [
        {
          text: "Control your budget: A dedicated envelope for a project to spend only the budget planned",
          icon: "account-balance-wallet",
        },
        {
          text: "Manage the budget of your loved ones: To allow you to manage the budget you want to grant to your loved ones",
          icon: "people",
        },
        {
          text: "Additional security for your bank account: To make your purchases remotely, especially on the Internet, without using your main bankcard",
          icon: "security",
        },
        {
          text: "An alternative in case of need: For a large expense beyond the limit of your main bankcard",
          icon: "add-shopping-cart",
        },
      ],
      features: ["No bank account needed", "Reloadable", "Online payments", "Budget control", "Gift option"],
      fees: {
        annual: "20 DT",
        withdrawal: "2 DT",
        replacement: "15 DT",
      },
    },
    {
      id: "6",
      image: require("@/assets/carts/CarteCPay.png"),
      name: "Carte C Pay",
      description: "A convenient payment card for online transactions.",
      tag: "Business",
      why: "The C Pay card is designed for businesses to simplify payroll management and provide a secure payment solution for employees.",
      reasons: [
        {
          text: "A mass transfer, in real time",
          icon: "swap-horiz",
        },
        {
          text: "Optimal security for the payments made on the cards",
          icon: "security",
        },
        {
          text: "Simplification of the payment system for your employees.",
          icon: "people",
        },
        {
          text: "Time saving for your company's payroll management.",
          icon: "access-time",
        },
      ],
      features: [
        "Business management",
        "Employee payroll",
        "Expense tracking",
        "Multiple card issuance",
        "Administrative controls",
      ],
      fees: {
        annual: "40 DT per card",
        withdrawal: "1 DT",
        replacement: "15 DT",
      },
    },
  ]
  const { width } = Dimensions.get('window');
  const numColumns = width > 600 ? 4 : 2;
  // Find the selected card
  const selectedCard = Cards.find((card) => card.id.toString() === id);
  const router = useRouter();
  if (!selectedCard) {
    return <Text className="text-center text-red-500 mt-10">Card not found!</Text>;
  }

  return (
    <View className="flex-1 bg-white" >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />


      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-5 items-center">
          <Text className="text-2xl font-bold text-blue-600 mb-2">{selectedCard.name}</Text>
          <View className="px-3 py-1 bg-blue-100 rounded-full mb-4">
            <Text className="text-sm font-medium text-blue-700">{selectedCard.tag}</Text>
          </View>

          <View className="w-full bg-blue-50 rounded-2xl p-6 items-center mb-6">
            <Image source={selectedCard.image} style={{ width: 280, height: 180 }} resizeMode="contain" />
          </View>

          <View className="w-full mb-6">
            <Text className="text-lg font-bold text-slate-900 mb-2">About This Card</Text>
            <Text className="text-base text-slate-700 leading-6">{selectedCard.why}</Text>
          </View>

          <View className="w-full mb-6">
            <Text className="text-lg font-bold text-slate-900 mb-4">Key Benefits</Text>

            {selectedCard.reasons.map((reason, index) => (
              <Animated.View
                key={index}
                className="flex-row bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 5,
                  elevation: 2,
                }}
              >
                <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                  <MaterialIcons name={reason.icon} size={20} color="#2563eb" />
                </View>
                <View className="flex-1">
                  <Text className="text-base text-slate-700">{reason.text}</Text>
                </View>
              </Animated.View>
            ))}
          </View>

          <View className="w-full mb-6">
            <Text className="text-lg font-bold text-slate-900 mb-4">Features</Text>

            <View
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              {selectedCard.features.map((feature, index) => (
                <View
                  key={index}
                  className={`flex-row items-center px-4 py-3 ${
                    index < selectedCard.features.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <View className="w-6 h-6 rounded-full bg-green-100 items-center justify-center mr-3">
                    <AntDesign name="check" size={14} color="#16a34a" />
                  </View>
                  <Text className="text-base text-slate-700">{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="w-full mb-6">
            <Text className="text-lg font-bold text-slate-900 mb-4">Fees & Charges</Text>

            <View
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
              }}
            >
              <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
                <Text className="text-base text-slate-700">Annual Fee</Text>
                <Text className="text-base font-semibold text-slate-900">{selectedCard.fees.annual}</Text>
              </View>
              <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
                <Text className="text-base text-slate-700">ATM Withdrawal</Text>
                <Text className="text-base font-semibold text-slate-900">{selectedCard.fees.withdrawal}</Text>
              </View>
              <View className="flex-row justify-between items-center px-4 py-3">
                <Text className="text-base text-slate-700">Card Replacement</Text>
                <Text className="text-base font-semibold text-slate-900">{selectedCard.fees.replacement}</Text>
              </View>
            </View>
          </View>

          <View className="w-full mb-6 p-4 bg-blue-50 rounded-xl">
            <View className="flex-row items-center mb-3">
              <MaterialIcons name="info" size={20} color="#2563eb" />
              <Text className="ml-2 text-lg font-bold text-blue-700">In Case of Loss or Theft</Text>
            </View>
            <Text className="text-base text-blue-700 mb-2">Block your card instantly using:</Text>
            <View className="ml-4 mb-2">
              <Text className="text-base text-blue-700 mb-1">• The STB Direct mobile application</Text>
              <Text className="text-base text-blue-700 mb-1">• Call the opposition center: +216 71 140 400 (24/7)</Text>
              <Text className="text-base text-blue-700">• Visit your nearest STB branch</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-5 py-4 border-t border-gray-200 bg-white">
        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-xl items-center"
          onPress={() => router.push({
            pathname: "/View/(Carts)/getmycard",
            params: { cardId: selectedCard.id } 
          })}
        >
          <Text className="text-white font-bold text-lg">Apply for This Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartDetailsScreen;
