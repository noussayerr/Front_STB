"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

const AnimPath = Animated.createAnimatedComponent(Path) as any;

interface QuatrefoilLoaderProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  showCircles?: boolean;
}

const QuatrefoilLoader: React.FC<QuatrefoilLoaderProps> = ({
  size = 200,
  color = "#0088cc",
  strokeWidth = 8,
  duration = 3000, // Adjusted duration for smoother continuous animation
  showCircles = false,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pathLength = 1600; // Approximate path length
  const segmentLength = 80; // Adjusted segment length for better visual flow

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue, duration]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, pathLength], // Only animate through the path length for continuous loop
  });

  // Perfect quatrefoil made of four overlapping circles
  const quatrefoilPath = `
    M 100,20
    A 40,40 0 0,1 140,60
    A 40,40 0 0,1 180,100
    A 40,40 0 0,1 140,140
    A 40,40 0 0,1 100,180
    A 40,40 0 0,1 60,140
    A 40,40 0 0,1 20,100
    A 40,40 0 0,1 60,60
    A 40,40 0 0,1 100,20
    Z
  `;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        {showCircles && (
          <>
            <Circle cx="100" cy="60" r="40" fill="none" stroke={color} strokeWidth={strokeWidth / 4} opacity={0.2} />
            <Circle cx="140" cy="100" r="40" fill="none" stroke={color} strokeWidth={strokeWidth / 4} opacity={0.2} />
            <Circle cx="100" cy="140" r="40" fill="none" stroke={color} strokeWidth={strokeWidth / 4} opacity={0.2} />
            <Circle cx="60" cy="100" r="40" fill="none" stroke={color} strokeWidth={strokeWidth / 4} opacity={0.2} />
          </>
        )}

        <Path
          d={quatrefoilPath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth / 2}
          opacity={0.2}
        />

        {/* Continuous chasing segment */}
        <AnimPath
          d={quatrefoilPath}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${segmentLength},${pathLength - segmentLength}`} // Adjusted dash array for continuous appearance
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuatrefoilLoader;