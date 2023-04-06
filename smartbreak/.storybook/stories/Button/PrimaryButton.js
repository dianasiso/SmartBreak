import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const Primary_btn = ({
  onPress,
  text,
  backgroundColor = "#07407B",
  borderColor = "#07407B",
  color = "white",
}) => {
  const style = {
    width: 300,
    paddingVertical: 10,
    backgroundColor,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor,
  };

  const textColor = {
    color,
  };

  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.8}>
      <Text style={textColor}>{text}</Text>
    </TouchableOpacity>
  );
};
