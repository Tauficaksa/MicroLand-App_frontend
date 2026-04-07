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
  StyleSheet,
  ScrollView
} from "react-native";
import { COLORS } from "../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { api } from "../services/api";
import SectionTitle from "../components/SectionTitle";

export default function AppointmentsScreen() {
  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [notes, setNotes] = useState("");
  const [appointments, setAppointments] = useState([]);

  const insets = useSafeAreaInsets();

  const load = async () => {
    try {
      setAppointments(await api.getAppointments());
    } catch (e) {}
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    try {
      await api.addAppointment({ doctorName, specialty, appointmentDate, notes });
      setDoctorName(""); setSpecialty(""); setAppointmentDate(""); setNotes("");
      await load();
      Alert.alert("Success", "Appointment booked");
    } catch (e) {
      Alert.alert("Error", "Could not book appointment");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        
        <FlatList
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={
            <View style={styles.container}>
              <SectionTitle>Appointments</SectionTitle>

              {/* Form Card */}
              <View style={styles.formCard}>
                <TextInput
                  placeholder="Doctor name"
                  value={doctorName}
                  onChangeText={setDoctorName}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Specialty"
                  value={specialty}
                  onChangeText={setSpecialty}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Date (YYYY-MM-DD HH:MM)"
                  value={appointmentDate}
                  onChangeText={setAppointmentDate}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Notes"
                  value={notes}
                  onChangeText={setNotes}
                  style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={add}>
                  <Text style={styles.buttonText}>Book Appointment</Text>
                </TouchableOpacity>
              </View>
            </View>
          }

          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.doctor_name}</Text>
              <Text style={styles.subtitle}>{item.specialty}</Text>
              <Text style={styles.date}>{String(item.appointment_date)}</Text>
              {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
            </View>
          )}

          contentContainerStyle={{
            padding: 16,
            paddingBottom: insets.bottom + 20 // ✅ FIX for bottom overlap
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
    color: COLORS.subText,
    marginTop: 2
  },

  date: {
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: "600"
  },

  notes: {
    marginTop: 6,
    color: COLORS.subText
  }
});