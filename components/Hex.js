import React from "react";
import { Svg, Path, Text, Rect } from "react-native-svg";
import { useTheme } from "./ThemeProvider";

const Hexagon = ({
  color = "#303030", // Default color for the shape, you can change it as needed
  width = 48,
  height = 48,
  style = {},
  title = "",
  colors = "",
  textColor = "",
}) => {
  const { colorScheme } = useTheme();

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 47 47"
      width="150px"
      height="150px"
      style={style}
    >
      {/* New paths for the hexagonal shape */}
      <Path
        d="M16 42H32C32.7014 41.9993 33.3903 41.8141 33.9976 41.4631C34.6049 41.112 35.1092 40.6075 35.46 40L43.46 26C43.811 25.3919 43.9958 24.7021 43.9958 24C43.9958 23.2979 43.811 22.6081 43.46 22L35.46 8C35.1092 7.39253 34.6049 6.88796 33.9976 6.53692C33.3903 6.18589 32.7014 6.00072 32 6H16C15.2985 6.00072 14.6096 6.18589 14.0023 6.53692C13.395 6.88796 12.8907 7.39253 12.54 8L4.53995 22C4.18888 22.6081 4.00405 23.2979 4.00405 24C4.00405 24.7021 4.18888 25.3919 4.53995 26L12.54 40C12.8907 40.6075 13.395 41.112 14.0023 41.4631C14.6096 41.8141 15.2985 41.9993 16 42Z"
        stroke={colors}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect x="15" y="7" width="19" height="34" fill={colors} />
      <Path d="M45 24L33.75 41.3205V6.67949L45 24Z" fill={colors} />
      <Path d="M4 24L15.25 6.67949V41.3205L4 24Z" fill={colors} />

      {/* Title Text placed inside the SVG */}
      <Text
        x="50%" // Center horizontally
        y="55%" // Center vertically
        textAnchor="middle"
        fill={textColor}
        fontSize="6" // Adjust font size to fit
      >
        {title}
      </Text>
    </Svg>
  );
};

export default Hexagon;
