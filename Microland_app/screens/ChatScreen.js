import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { api } from "../services/api";
import { speak, mockVoiceInput } from "../services/voice";
import SectionTitle from "../components/SectionTitle";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const load = async () => {
    try {
      const rows = await api.getMessages();
      setMessages(rows.map(row => ({
        id: String(row.id),
        sender: row.sender,
        text: row.message_text
      })));
    } catch (e) {}
  };

  useEffect(() => { load(); }, []);

  const handleSend = async (textToSend) => {
    const message = (textToSend || input).trim();
    if (!message) return;
    setInput("");
    try {
      const result = await api.sendMessage(message);
      await load();
      speak(result.reply);
    } catch (error) {
      Alert.alert("Error", "Could not send message");
    }
  };

  const handleVoice = async () => {
    const heard = await mockVoiceInput();
    setInput(heard);
  };

  return (
    <View style={styles.container}>
      <SectionTitle>Healthcare Chatbot</SectionTitle>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.sender === "user" ? styles.userBubble : styles.botBubble}>
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type symptoms..."
        style={styles.input}
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => handleSend()}>
          <Text style={styles.btnText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={handleVoice}>
          <Text style={styles.btnTextDark}>Voice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: {
    borderWidth: 1, borderColor: "#c8d3e1", borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, marginTop: 12
  },
  row: { flexDirection: "row", gap: 10, marginTop: 10 },
  primaryBtn: { flex: 1, backgroundColor: "#0f62fe", padding: 12, borderRadius: 10, alignItems: "center" },
  secondaryBtn: { flex: 1, backgroundColor: "#e9eefc", padding: 12, borderRadius: 10, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
  btnTextDark: { color: "#17324d", fontWeight: "700" },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#dbe8ff", padding: 10, borderRadius: 10, marginVertical: 6, maxWidth: "80%" },
  botBubble: { alignSelf: "flex-start", backgroundColor: "#f3f5f8", padding: 10, borderRadius: 10, marginVertical: 6, maxWidth: "80%" },
  bubbleText: { fontSize: 15 }
});
