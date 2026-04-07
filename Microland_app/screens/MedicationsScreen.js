import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { api } from "../services/api";
import SectionTitle from "../components/SectionTitle";

export default function MedicationsScreen() {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [frequency, setFrequency] = useState("");
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      setItems(await api.getMedications());
    } catch (e) {}
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    try {
      await api.addMedication({ medicineName, dosage, reminderTime, frequency });
      setMedicineName(""); setDosage(""); setReminderTime(""); setFrequency("");
      await load();
      Alert.alert("Success", "Medication reminder added");
    } catch (e) {
      Alert.alert("Error", "Could not add medication");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <SectionTitle>Medications</SectionTitle>
      <TextInput placeholder="Medicine name" value={medicineName} onChangeText={setMedicineName} style={inputStyle} />
      <TextInput placeholder="Dosage" value={dosage} onChangeText={setDosage} style={inputStyle} />
      <TextInput placeholder="Reminder time (e.g. 09:00 AM)" value={reminderTime} onChangeText={setReminderTime} style={inputStyle} />
      <TextInput placeholder="Frequency (e.g. daily)" value={frequency} onChangeText={setFrequency} style={inputStyle} />
      <TouchableOpacity style={btnStyle} onPress={add}><Text style={btnTextStyle}>Add Reminder</Text></TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={cardStyle}>
            <Text style={titleStyle}>{item.medicine_name}</Text>
            <Text>Dosage: {item.dosage}</Text>
            <Text>Reminder: {item.reminder_time}</Text>
            <Text>Frequency: {item.frequency}</Text>
          </View>
        )}
      />
    </View>
  );
}

const inputStyle = { borderWidth: 1, borderColor: "#c8d3e1", borderRadius: 10, padding: 10, marginBottom: 10 };
const btnStyle = { backgroundColor: "#0f62fe", padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 12 };
const btnTextStyle = { color: "#fff", fontWeight: "700" };
const cardStyle = { backgroundColor: "#f3f5f8", padding: 12, borderRadius: 10, marginBottom: 10 };
const titleStyle = { fontWeight: "700", fontSize: 16 };
