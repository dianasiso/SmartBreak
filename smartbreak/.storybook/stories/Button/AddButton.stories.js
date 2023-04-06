import React from "react";
import { View } from "react-native";
import { Add_btn } from "./AddButton";

const Add = {
  title: "Add buttons",
  component: Add_btn,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    text: "Adicionar equipamento",
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

export default Add;

export const Basic = {};

export const Rotina = {
  args: {
    text: "Adicionar rotina",
  },
};
