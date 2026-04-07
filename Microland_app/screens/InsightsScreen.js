import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { api } from "../services/api";
import SectionTitle from "../components/SectionTitle";

export default function InsightsScreen() {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    api.getInsights().then(setInsights).catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SectionTitle>Insights Dashboard</SectionTitle>
      {!insights ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{ gap: 10 }}>
          <View style={card}><Text>Total Chats: {insights.totalChats}</Text></View>
          <View style={card}><Text>Total Appointments: {insights.totalAppointments}</Text></View>
          <View style={card}><Text>Total Medications: {insights.totalMedications}</Text></View>
          <View style={card}>
            <Text style={{ fontWeight: "700", marginBottom: 6 }}>Top Symptoms</Text>
            {insights.topSymptoms.map((item, idx) => (
              <Text key={idx}>{item.symptom_name}: {item.total}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
const card = { backgroundColor: "#f3f5f8", padding: 14, borderRadius: 10 };
