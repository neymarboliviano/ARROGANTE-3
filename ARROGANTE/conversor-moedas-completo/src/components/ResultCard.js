import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";

function money(value, currency) {
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "JPY" ? 0 : 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

export default function ResultCard({
  amount,
  fromCurrency,
  toCurrency,
  exchangeRate,
  result,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.resultLabel}>Resultado</Text>

      <Text style={styles.resultValue}>
        {money(result, toCurrency)}
      </Text>

      <Text style={styles.rate}>
        Taxa de câmbio: 1 {fromCurrency} ={" "}
        {Number(exchangeRate).toLocaleString("pt-BR", {
          maximumFractionDigits: 6,
        })}{" "}
        {toCurrency}
      </Text>

      <Text style={styles.original}>
        {money(amount, fromCurrency)} → {money(result, toCurrency)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.result,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 14,
    padding: 13,
  },

  resultLabel: {
    color: colors.muted,
    fontSize: 11,
    marginBottom: 3,
  },

  resultValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 5,
  },

  rate: {
    color: "#bac4d3",
    fontSize: 10,
    marginBottom: 7,
  },

  original: {
    color: "#8996aa",
    fontSize: 10,
  },
});
