import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeProvider';

const HexagonIcon = () => {
  const { colorScheme } = useTheme();
    return (
      <View style={styles.hexagon}>
        <View style={[styles.hexagonInner, {backgroundColor: colorScheme.homeButton}]} />
        <View style={[styles.hexagonBefore, {borderBottomColor: colorScheme.homeButton}]} />
        <View style={[styles.hexagonAfter, {borderTopColor: colorScheme.homeButton}]} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    hexagon: {
      width: 100,
      height: 55,
      zIndex: 1
    },
    hexagonInner: {
      width: 100,
      height: 55,
    },
    hexagonAfter: {
      position: "absolute",
      bottom: -25,
      left: 0,
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderLeftWidth: 50,
      borderLeftColor: "transparent",
      borderRightWidth: 50,
      borderRightColor: "transparent",
      borderTopWidth: 25,
    },
    hexagonBefore: {
      position: "absolute",
      top: -25,
      left: 0,
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderLeftWidth: 50,
      borderLeftColor: "transparent",
      borderRightWidth: 50,
      borderRightColor: "transparent",
      borderBottomWidth: 25,
    },
  });

export default HexagonIcon;