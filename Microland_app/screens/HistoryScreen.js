import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { api } from "../services/api";
import SectionTitle from "../components/SectionTitle";

export default function HistoryScreen() {
  const [data, setData] = useState({ symptoms: [], recentMessages: [] });

  useEffect(() => {
    api.getHistory().then(setData).catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SectionTitle>Patient History</SectionTitle>

      <Text style={subTitle}>Top Symptoms</Text>
      <FlatList
        data={data.symptoms}
        keyExtractor={(item, index) => `${item.symptom_name}-${index}`}
        renderItem={({ item }) => (
          <View style={cardStyle}>
            <Text>{item.symptom_name} - {item.count}</Text>
          </View>
        )}
      />

      <Text style={subTitle}>Recent Messages</Text>
      <FlatList
        data={data.recentMessages}
        keyExtractor={(item, index) => `${item.created_at}-${index}`}
        renderItem={({ item }) => (
          <View style={cardStyle}>
            <Text style={{ fontWeight: "700" }}>{item.sender}</Text>
            <Text>{item.message_text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const subTitle = { fontSize: 18, fontWeight: "700", marginTop: 12, marginBottom: 8 };
const cardStyle = { backgroundColor: "#f3f5f8", padding: 12, borderRadius: 10, marginBottom: 10 };
