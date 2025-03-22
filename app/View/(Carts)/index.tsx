import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Cards_details = () => {
  const router = useRouter(); // Use Expo Router

  const Carts = [
    { 
      id: 1,
      image: require('@/assets/carts/CARTESTBTRAVEL.png'),
      name: 'Carte STB Travel',
      description: 'Voyagez serein….' 
    },
    { 
      id: 2,
      image: require('@/assets/carts/CarteSTBEpargne.png'), 
      name: 'Carte STB Epargne', 
      description: 'La carte Epargne vous évite le déplacement à l’agence et vous permet de faire face à des dépenses urgentes.'
     },
    { 
      id: 3, 
      image: require('@/assets/carts/CARTEVISAELECTRONNATIONALE.png'), 
      name: 'Carte Visa Electron Nationale', 
      description: 'Vous êtes résidents en Tunisie et vous cherchez un moyen  de paiement et de retrait qui vous convient ?….'
     },
    { id: 4, 
      image: require('@/assets/carts/CARTECIB3.png'),
      name: 'Carte CIB3', 
      description: 'Vous souhaitez une solution de paiement et de retrait pratique et moderne ?' 
    },
    { 
      id: 5,
      image: require('@/assets/carts/CarteCCash.png'), 
      name: 'Carte C Cash', 
      description: 'Plus besoin d’un compte bancaire pour avoir une carte'
     },
    { 
      id: 6, 
      image: require('@/assets/carts/CarteCPay.png'), 
      name: 'Carte C Pay', 
      description: 'A convenient payment card for online transactions.'
     },
  ];

  const screenWidth = Dimensions.get('window').width;
  const numColumns = screenWidth > 1280 ? 3 : 2; // Responsive layout

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={Carts}
        key={numColumns} 
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between', gap: 10 }} // Space between columns
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-1 items-center p-3 bg-[#fff] rounded-lg shadow-sm gap-4 mt-14"
            onPress={() => router.push(`/View/(Carts)/${item.id}`)}// Navigate with ID
          >
            <Image source={item.image} style={{ width: 190, height: 140 }}  resizeMode="contain" />
            <Text className="mt-2 text-center font-semibold">{item.name}</Text>
            <Text className="text-center text-xs">{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Cards_details;
