import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { AddCircle } from "iconsax-react-native";

export const Add_btn = ({
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
    paddingLeft: 25,
    paddingRight: 25,
    borderWidth: 1,
    borderColor,
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const textColor = {
    color,
  };

  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.8}>
      <Text style={textColor}>{text}</Text>
      <AddCircle color="#ffffff" variant="Bold" size="20" />
    </TouchableOpacity>
  );
};
