import React from "react";
import { Text } from "react-native";

export default function SectionTitle({ children }) {
  return (
    <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12, color: "#17324d" }}>
      {children}
    </Text>
  );
}
