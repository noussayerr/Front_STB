import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { router } from 'expo-router'; // Assuming you're using Expo Router

const { width } = Dimensions.get('window');

// Define the Slide interface
interface Slide {
  id: string;
  image: any; // Use `any` for require() images, or specify a more precise type if possible
  title: string;
  subtitle: string;
}

// Define the slides array
const slides: Slide[] = [
  {
    id: '1',
    image: require('@/assets/Creditcard.png'),
    title: 'Best Digital Solution',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    image: require('@/assets/Investing.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    image: require('@/assets/Mobilelogin.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '4',
    image: require('@/assets/Wallet.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

// Define the Slide component props
interface SlideProps {
  item: Slide;
}

// Slide component to render each slide
const Slide: React.FC<SlideProps> = ({ item }) => {
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
};

// Slider component
const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<Slide>>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem: ListRenderItem<Slide> = ({ item }) => <Slide item={item} />;

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

// Main component
const HomeScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View className="items-center mt-12">
        <Image source={require('@/assets/LogoSTB.png')} style={{ width: 360, height: 170 }} />
      </View>
      <View className="flex justify-center">
        <Slider />
      </View>

      <View className="absolute bottom-10 left-0 right-0 px-4">
        <TouchableOpacity
          onPress={() => router.push('/auth/login/Login')}
          className="bg-blue-600 rounded-2xl w-full py-5"
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-medium text-xl">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/auth/register/register')}
          className="rounded-2xl border-2 border-black w-full py-5 mt-4"
          activeOpacity={0.8}
        >
          <Text className="text-black text-center font-medium text-xl">Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
    textAlign:'center'
  },
});

export default HomeScreen;