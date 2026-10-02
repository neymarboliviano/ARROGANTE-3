import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";

export default function CurrencyButton({
  currency,
  selected,
  variant = "primary",
  onPress,
}) {
  const selectedColor =
    variant === "secondary" ? colors.greenSelected : colors.blueSelected;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: selected ? selectedColor : colors.input,
          borderColor: selected ? selectedColor : colors.border,
        },
      ]}
    >
      <Text style={styles.text}>{currency}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 55,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});
