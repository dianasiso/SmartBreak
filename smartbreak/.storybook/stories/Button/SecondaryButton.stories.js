import React from "react";
import { View } from "react-native";
import { Secondary_btn } from "./SecondaryButton";

const Secondary = {
  title: "Secondary buttons",
  component: Secondary_btn,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    text: "Próximo",
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

export default Secondary;

export const Basic = {};

export const Anterior = {
  args: {
    text: "Anterior",
    backgroundColor: "#FFFFFF",
    borderColor: "#F57738",
    color: "#F57738",
  },
};

export const Cancelar = {
  args: {
    text: "Cancelar",
    backgroundColor: "#FFFFFF",
    borderColor: "#F57738",
    color: "#F57738",
  },
};

export const Adicionar = {
  args: {
    text: "Adicionar",
  },
};

export const Terminar = {
  args: {
    text: "Terminar",
  },
};
