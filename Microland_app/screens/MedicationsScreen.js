import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";
import { COLORS } from "../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { api } from "../services/api";
import SectionTitle from "../components/SectionTitle";

export default function MedicationsScreen() {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [frequency, setFrequency] = useState("");
  const [items, setItems] = useState([]);

  const insets = useSafeAreaInsets();

  const load = async () => {
    try {
      setItems(await api.getMedications());
    } catch (e) {}
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    try {
      await api.addMedication({ medicineName, dosage, reminderTime, frequency });
      setMedicineName("");
      setDosage("");
      setReminderTime("");
      setFrequency("");
      await load();
      Alert.alert("Success", "Medication reminder added");
    } catch (e) {
      Alert.alert("Error", "Could not add medication");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}

          /* 🔥 FORM AT TOP */
          ListHeaderComponent={
            <View style={styles.container}>
              <SectionTitle>Medications</SectionTitle>

              <View style={styles.formCard}>
                <TextInput
                  placeholder="Medicine name"
                  value={medicineName}
                  onChangeText={setMedicineName}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Dosage"
                  value={dosage}
                  onChangeText={setDosage}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Reminder time (e.g. 09:00 AM)"
                  value={reminderTime}
                  onChangeText={setReminderTime}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Frequency (e.g. daily)"
                  value={frequency}
                  onChangeText={setFrequency}
                  style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={add}>
                  <Text style={styles.buttonText}>Add Reminder</Text>
                </TouchableOpacity>
              </View>
            </View>
          }

          /* 🔥 LIST ITEMS */
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.medicine_name}</Text>
              <Text style={styles.subtitle}>Dosage: {item.dosage}</Text>
              <Text style={styles.time}>⏰ {item.reminder_time}</Text>
              <Text style={styles.frequency}>{item.frequency}</Text>
            </View>
          )}

          contentContainerStyle={{
            padding: 16,
            paddingBottom: insets.bottom + 20 // ✅ FIX bottom overlap
          }}
        />

      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },

  formCard: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 15
  },

  input: {
    backgroundColor: COLORS.input,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    color: COLORS.text
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5
  },

  buttonText: {
    color: COLORS.card,
    fontWeight: "700",
    fontSize: 15
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2
  },

  title: {
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.text
  },

  subtitle: {
    marginTop: 4,
    color: COLORS.subText
  },

  time: {
    marginTop: 4,
    color: COLORS.primary,
    fontWeight: "600"
  },

  frequency: {
    marginTop: 4,
    color: COLORS.subText
  }
});