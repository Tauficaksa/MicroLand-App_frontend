import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from "react-native";
import { COLORS } from "../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { api } from "../services/api";
import SectionTitle from "../components/SectionTitle";

export default function HistoryScreen() {
  const [data, setData] = useState({ symptoms: [], recentMessages: [] });
  const insets = useSafeAreaInsets();

  useEffect(() => {
    api.getHistory().then(setData).catch(() => {});
  }, []);

  return (
    <FlatList
      data={[{ type: "symptoms" }, { type: "messages" }]} // 👈 single list trick
      keyExtractor={(item, index) => index.toString()}

      ListHeaderComponent={
        <View style={styles.container}>
          <SectionTitle>Patient History</SectionTitle>
        </View>
      }

      renderItem={({ item }) => {
        if (item.type === "symptoms") {
          return (
            <View>
              <Text style={styles.subTitle}>Top Symptoms</Text>

              {data.symptoms.map((symptom, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.text}>
                    {symptom.symptom_name}
                  </Text>
                  <Text style={styles.count}>
                    {symptom.count} times
                  </Text>
                </View>
              ))}
            </View>
          );
        }

        if (item.type === "messages") {
          return (
            <View>
              <Text style={styles.subTitle}>Recent Messages</Text>

              {data.recentMessages.map((msg, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.sender}>{msg.sender}</Text>
                  <Text style={styles.message}>{msg.message_text}</Text>
                </View>
              ))}
            </View>
          );
        }

        return null;
      }}

      contentContainerStyle={{
        padding: 16,
        paddingBottom: insets.bottom + 20 // ✅ SAFE AREA FIX
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },

  subTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 8,
    color: COLORS.text
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2
  },

  text: {
    fontSize: 15,
    color: COLORS.text
  },

  count: {
    marginTop: 4,
    color: COLORS.primary,
    fontWeight: "600"
  },

  sender: {
    fontWeight: "700",
    color: COLORS.primary
  },

  message: {
    marginTop: 4,
    color: COLORS.subText
  }
});