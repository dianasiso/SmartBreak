import React from "react";
import { View } from "react-native";
import { Tips_btn } from "./TipsButton";

const Tips = {
  title: "Tips buttons",
  component: Tips_btn,
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

export default Tips;

export const Basic = {};

export const Laranja = {
  args: {
    color: "#F57738",
  },
};

export const Vermelho = {
  args: {
    color: "#AA0000",
  },
};
