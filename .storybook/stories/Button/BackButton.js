import React from "react";
import { TouchableOpacity } from "react-native";
import { ArrowLeft2 } from "iconsax-react-native";

export const Back_btn = ({ onPress, color = "#000000" }) => {
  const style = {
    color,
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ArrowLeft2 style={style} size="30" />
    </TouchableOpacity>
  );
};
