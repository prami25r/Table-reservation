import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native";
import Link from "../../components/Link";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen from @packages/app</Text>
      <Text style={styles.subtitle}>
        Shared UI rendered via React Native primitives.
      </Text>
      <Link href="/about">
        <Text style={styles.link}>Go to About</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  link: {
    color: "royalblue",
    textDecorationLine: "underline",
    marginTop: 8,
  },
});
