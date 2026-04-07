import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { api } from "../services/api";
import SectionTitle from "../components/SectionTitle";

export default function AppointmentsScreen() {
  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [notes, setNotes] = useState("");
  const [appointments, setAppointments] = useState([]);

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
    <View style={{ flex: 1, padding: 16 }}>
      <SectionTitle>Appointments</SectionTitle>
      <TextInput placeholder="Doctor name" value={doctorName} onChangeText={setDoctorName} style={inputStyle} />
      <TextInput placeholder="Specialty" value={specialty} onChangeText={setSpecialty} style={inputStyle} />
      <TextInput placeholder="Date time (YYYY-MM-DD HH:MM:SS)" value={appointmentDate} onChangeText={setAppointmentDate} style={inputStyle} />
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} style={inputStyle} />
      <TouchableOpacity style={btnStyle} onPress={add}><Text style={btnTextStyle}>Book Appointment</Text></TouchableOpacity>

      <FlatList
        data={appointments}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={cardStyle}>
            <Text style={titleStyle}>{item.doctor_name}</Text>
            <Text>{item.specialty}</Text>
            <Text>{String(item.appointment_date)}</Text>
            <Text>{item.notes}</Text>
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
