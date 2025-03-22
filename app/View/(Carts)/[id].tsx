import { View, Text, Image,TouchableOpacity,FlatList, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Ri24HoursFill } from "react-icons/ri";
import { useRouter } from 'expo-router';
const CartDetailsScreen = () => {
  const { id } = useLocalSearchParams(); // Get ID from URL

  // Mock data (normally, you fetch this from an API or pass it via global state)
  const Carts = [
    { 
      id: 1,
      image: require('@/assets/carts/CARTESTBTRAVEL.png'),
      name: 'Carte STB Travel',
      description: 'Voyagez serein….' ,
      why:"The STB Travel card is an international Mastercard for payments and cash withdrawals abroad. It allows you to manage your travel allowance and offers you assistance and insurance abroad. The STB Travel card is a prepaid card, reloadable, secure and easy to use, equipped with the “contactless” technology, it allows you to :",
      reasons:[
        {
          text:"Pay for your expenses abroad at merchants, department stores, hotels, restaurants, affiliated to the MASTERCARD International network",
          icon:require('@/assets/icons/ho.png')
        },
        {
          text:"Withdraw money from ATMs abroad displaying the MASTERCARD logo",
          icon:require('@/assets/icons/ca.png')
        },
        {
          text:"Book a hotel abroad on the Internet from Tunisia",
          icon:require('@/assets/icons/pa.png')
        },
        {
          text:"Receive the amount of the tax refund directly on the card",
          icon:require('@/assets/icons/pa.png')
        }
      ]
    },
    { 
      id: 2,
      image: require('@/assets/carts/CarteSTBEpargne.png'), 
      name: 'Carte STB Epargne', 
      description: 'La carte Epargne vous évite le déplacement à l’agence et vous permet de faire face à des dépenses urgentes.',
      reasons:[
        {
          text:"Availability: Your savings are available at any time, you can, when you want, consult the balance of your account and make withdrawals at all DAB/GAB STB.",
          icon:require('@/assets/icons/ho.png')
        },
        {
          text:"Practical management of your card: You can access a range of practical services free of charge via the DigiEpargne application (balance consultation, consultation of the latest transactions, etc.);",
          icon:require('@/assets/icons/ca.png')
        },
        {
          text:"High usage limits adapted to your needs.",
          icon:require('@/assets/icons/pa.png')
        }
      ]
    },
    { 
      id: 3, 
      image: require('@/assets/carts/CARTEVISAELECTRONNATIONALE.png'), 
      name: 'Carte Visa Electron Nationale', 
      description: 'Vous êtes résidents en Tunisie et vous cherchez un moyen  de paiement et de retrait qui vous convient ?….',
      reasons:[
        {
          text:"The STB-VISA Electron National Card is granted for a period of five years",
          icon:require('@/assets/icons/ho.png')
        },
        {
          text:"It is renewed by tacit agreement for the same period unless you express your wish to the contrary 30 days before the expiration of the said period",
          icon:require('@/assets/icons/ca.png')
        },
      ]
    },
    { id: 4, 
      image: require('@/assets/carts/CARTECIB3.png'),
      name: 'Carte CIB3', 
      description: 'Vous souhaitez une solution de paiement et de retrait pratique et moderne ?' ,
      reasons:[
        {
          text:"STB CIB MasterCard is granted for a period of five years",
          icon:require('@/assets/icons/ho.png')
        },
        {
          text:"It shall be tacitly renewed for the same period unless otherwise specified 30 days before the expiry of the aforementioned period.",
          icon:require('@/assets/icons/ca.png')
        },
      ]
    },
    { 
      id: 5,
      image: require('@/assets/carts/CarteCCash.png'), 
      name: 'Carte C Cash', 
      description: 'Plus besoin d’un compte bancaire pour avoir une carte',
      reasons:[
        {
          text:"Control your budget: A dedicated envelope for a project to spend only the budget planned",
          icon:require('@/assets/icons/ho.png')
        },
        {
          text:"Manage the budget of your loved ones: To allow you to manage the budget you want to grant to your loved ones",
          icon:require('@/assets/icons/ca.png')
        },
        {
          text:"Additional security for your bank account: To make your purchases remotely, especially on the Internet, without using your main bankcard",
          icon:require('@/assets/icons/pa.png')
        },
        {
          text:"An alternative in case of need: For a large expense beyond the limit of your main bankcard",
          icon:require('@/assets/icons/ca.png')
        },
      ]
     },
    { 
      id: 6, 
      image: require('@/assets/carts/CarteCPay.png'), 
      name: 'Carte C Pay', 
      description: 'A convenient payment card for online transactions.',
      reasons:[
        {
          text:"A mass transfer, in real time",
          icon:require('@/assets/icons/ho.png')
        },
        {
          text:"Optimal security for the payments made on the cards",
          icon:require('@/assets/icons/ca.png')
        },
        {
          text:"Simplification of the payment system for your employees.",
          icon:require('@/assets/icons/pa.png')
        },
        {
          text:"Time saving for your company’s payroll management.",
          icon:require('@/assets/icons/pa.png')
        },
      ]
     },
  ];
  const { width } = Dimensions.get('window');
  const numColumns = width > 600 ? 4 : 2;
  // Find the selected card
  const selectedCard = Carts.find((card) => card.id.toString() === id);
  const router = useRouter();
  if (!selectedCard) {
    return <Text className="text-center text-red-500 mt-10">Card not found!</Text>;
  }

  return (
    <View className="flex bg-white h-full">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
        <View className="items-center justify-start">
          <Text className="text-2xl font-bold mt-4 text-[#2563eb]">{selectedCard.name}</Text>
          <Image source={selectedCard.image} style={{ width: 280, height: 180 }} resizeMode="contain" />
          <Text className="text-lg mt-4">Why choosing <Text style={{ color: '#2563eb' }}>{selectedCard.name}</Text></Text>
        </View>
        
        {/* Reasons List */}
        <View className="flex flex-col items-center justify-center mt-8">

          <FlatList
            data={selectedCard.reasons}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
            scrollEnabled={false} // Disable scrolling inside FlatList since ScrollView is used
            renderItem={({ item }) => (
              <View className="flex m-2 p-3 bg-white rounded-lg shadow items-center w-48">
                <Image source={item.icon} style={{ width: 70, height: 70, marginBottom: 5 }} resizeMode="contain" />
                <Text className="text-gray-700 text-center mt-10">{item.text}</Text>
              </View>
            )}
            />
        </View>
        <Text className='text-xl font-bold text-[#2563eb] text-center mt-4 border-b border-blue-600'>In case of loss or theft of your card</Text>
        <Text className='text-center text-gray-600 mt-2 text-sm'>Block your card instantly using the STB Direct application Call the opposition center available 24 hours a day at the number: +216 71 140 400 Contact directly one of our nearest STB branches.</Text>
        
      </ScrollView>
      
      <View className="absolute bottom-4 left-0 right-0 p-4 ">
        <TouchableOpacity className='bg-[#2563eb] p-4 rounded-lg' onPress={() => router.push(`/View/(Carts)/getmycard`)}>
          <Text className="text-white text-xl text-center">Get my card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartDetailsScreen;
