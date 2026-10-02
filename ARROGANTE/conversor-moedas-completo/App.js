import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import CurrencyButton from "./src/components/CurrencyButton";
import ResultCard from "./src/components/ResultCard";
import { currencies } from "./src/constants/currencies";
import { fetchExchangeRate } from "./src/services/api";
import { colors } from "./src/styles/colors";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleConvert() {
    const numericAmount = Number(amount.replace(",", "."));

    if (!amount.trim() || Number.isNaN(numericAmount)) {
      return;
    }

    try {
      setLoading(true);

      const rate = await fetchExchangeRate(fromCurrency, toCurrency);
      const converted = numericAmount * rate;

      setExchangeRate(rate);
      setResult(converted);
    } catch (error) {
      setExchangeRate(null);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  function swapCurrencies() {
    const oldFrom = fromCurrency;

    setFromCurrency(toCurrency);
    setToCurrency(oldFrom);
    setResult(null);
    setExchangeRate(null);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Conversor de Moedas</Text>

          <Text style={styles.subtitle}>
            Converta valores entre diferentes moedas
          </Text>

          <View style={styles.currencyGroup}>
            {currencies.map((currency) => (
              <CurrencyButton
                key={currency}
                currency={currency}
                selected={fromCurrency === currency}
                variant="primary"
                onPress={() => {
                  setFromCurrency(currency);
                  setResult(null);
                }}
              />
            ))}
          </View>

          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="0,00"
            placeholderTextColor={colors.placeholder}
            keyboardType="decimal-pad"
          />

          <TouchableOpacity
            style={styles.swapButton}
            activeOpacity={0.8}
            onPress={swapCurrencies}
          >
            <Text style={styles.swapText}>↕</Text>
          </TouchableOpacity>

          <View style={styles.currencyGroup}>
            {currencies.map((currency) => (
              <CurrencyButton
                key={currency}
                currency={currency}
                selected={toCurrency === currency}
                variant="secondary"
                onPress={() => {
                  setToCurrency(currency);
                  setResult(null);
                }}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.convertButton}
            activeOpacity={0.8}
            onPress={handleConvert}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.convertButtonText}>Converter</Text>
            )}
          </TouchableOpacity>

          {result !== null && (
            <ResultCard
              amount={Number(amount.replace(",", "."))}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              exchangeRate={exchangeRate}
              result={result}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboard: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 3,
  },

  subtitle: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 20,
  },

  currencyGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 7,
    marginBottom: 10,
  },

  input: {
    height: 47,
    borderRadius: 8,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 14,
    marginTop: 3,
    marginBottom: 10,
  },

  swapButton: {
    height: 36,
    borderRadius: 7,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  swapText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
  },

  convertButton: {
    height: 44,
    backgroundColor: colors.blue,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  convertButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },
});
