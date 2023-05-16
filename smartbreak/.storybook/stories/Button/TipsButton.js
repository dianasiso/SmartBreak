import React from "react";
import { TouchableOpacity } from "react-native";
import { ArrowCircleRight } from "iconsax-react-native";

export const Tips_btn = ({ onPress, color = "#07407B" }) => {
  const style = {
    color,
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ArrowCircleRight style={style} variant="Bold" size="30" />
    </TouchableOpacity>
  );
};
