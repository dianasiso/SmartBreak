import React from "react";
import { View } from "react-native";
import { Back_btn } from "./BackButton";

const Back = {
  title: "Back buttons",
  component: Back_btn,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  decorators: [
    (Story) => (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default Back;

export const Basic = {};

export const Branco = {
  args: {
    color: "#FFFFFF",
  },
};
