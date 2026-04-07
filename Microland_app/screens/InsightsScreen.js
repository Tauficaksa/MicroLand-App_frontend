import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import { COLORS } from "../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { api } from "../services/api";
import SectionTitle from "../components/SectionTitle";

export default function InsightsScreen() {
  const [insights, setInsights] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    api.getInsights().then(setInsights).catch(() => {});
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingBottom: insets.bottom + 20 // ✅ SAFE AREA FIX
      }}
    >
      <SectionTitle>Insights Dashboard</SectionTitle>

      {!insights ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <View>

          {/* Stats Row */}
          <View style={styles.row}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{insights.totalChats}</Text>
              <Text style={styles.statLabel}>Chats</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{insights.totalAppointments}</Text>
              <Text style={styles.statLabel}>Appointments</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{insights.totalMedications}</Text>
              <Text style={styles.statLabel}>Medications</Text>
            </View>
          </View>

          {/* Top Symptoms */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Top Symptoms</Text>

            {insights.topSymptoms.map((item, idx) => (
              <View key={idx} style={styles.symptomRow}>
                <Text style={styles.symptomText}>{item.symptom_name}</Text>
                <Text style={styles.symptomCount}>{item.total}</Text>
              </View>
            ))}
          </View>

        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 20,
    textAlign: "center",
    color: COLORS.subText
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    elevation: 2
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary
  },

  statLabel: {
    marginTop: 4,
    color: COLORS.subText
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 15,
    elevation: 2
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.text
  },

  symptomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: COLORS.border
  },

  symptomText: {
    color: COLORS.text
  },

  symptomCount: {
    color: COLORS.primary,
    fontWeight: "600"
  }
});