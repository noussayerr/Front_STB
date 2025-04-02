import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { useTheme } from "../providers/ThemeProvider";
import useThemeStore  from '../zustand/themeStore';
import { useTranslation } from 'react-i18next';

import { useLanguageStore } from '../zustand/store';
const { width } = Dimensions.get('window');

// Define the Slide interface
interface Slide {
  id: string;
  image: any; // Use `any` for require() images, or specify a more precise type if possible
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
    {
      id: '1',
      image: require('@/assets/Creditcard.png'),
      title: 'bestDigitalSolution',
      subtitle: 'slide1Subtitle',
    },
    {
      id: '2',
      image: require('@/assets/Investing.png'),
      title: 'achieveYourGoals',
      subtitle: 'slide2Subtitle',
    },
    {
      id: '3',
      image: require('@/assets/Mobilelogin.png'),
      title: 'increaseYourValue',
      subtitle: 'slide3Subtitle',
    },
    {
      id: '4',
      image: require('@/assets/Wallet.png'),
      title: 'increaseYourValue',
      subtitle: 'slide4Subtitle',
    },
  ];

// Define the Slide component props
interface SlideProps {
  item: Slide;
}

// Slide component to render each slide
const Slide: React.FC<SlideProps> = ({ item }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={styles.slide}>
      <Image source={item.image} style={{ width: 250, height: 250 }} />
      <Text className={`text-xl font-bold text-center ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`}>{t(item.title)}</Text>
      <Text className={`text-lg font-light text-center ${theme === "dark" ? "text-[#e5e5e5]" : "text-black"}`}>{t(item.subtitle)}</Text>
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
// Styles
const styles = StyleSheet.create({
    slide: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
    }
    
});
export default Slider;