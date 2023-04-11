import React from "react";
import { View } from "react-native";
import { Primary_btn } from "./PrimaryButton";

const Primary = {
  title: "Primary buttons",
  component: Primary_btn,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    text: "Entrar",
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

export default Primary;

export const Basic = {};

export const Registar1 = {
  args: {
    text: "Registar",
    backgroundColor: "#FFFFFF",
    borderColor: "#F57738",
    color: "#F57738",
  },
};

export const Registar2 = {
  args: {
    text: "Registar",
  },
};

export const Concluido = {
  args: {
    text: "Concluído",
  },
};

export const ConfirmarPalavraPasse = {
  args: {
    text: "Confirmar palavra-passe",
    backgroundColor: "#FFFFFF",
    color: "#07407B",
  },
};

export const SmallProximo = {
  args: {
    text: "Proximo",
    width: 100,
    paddingVertical: 5,
    borderRadius: 8,
  },
};

export const SmallAdicionar = {
  args: {
    text: "Adicionar",
    width: 100,
    paddingVertical: 5,
    borderRadius: 8,
  },
};

export const SmallTerminar = {
  args: {
    text: "Terminar",
    width: 100,
    paddingVertical: 5,
    borderRadius: 8,
  },
};

export const SmallAnterior = {
  args: {
    text: "Anterior",
    width: 100,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderColor: "#F57738",
    color: "#F57738",
  },
};

export const SmallCancelar = {
  args: {
    text: "Cancelar",
    width: 100,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderColor: "#F57738",
    color: "#F57738",
  },
};
