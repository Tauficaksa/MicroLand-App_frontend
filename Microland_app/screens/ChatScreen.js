import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import { COLORS } from "../theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { api } from "../services/api";
import { speak, mockVoiceInput } from "../services/voice";
import SectionTitle from "../components/SectionTitle";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const insets = useSafeAreaInsets();

  const load = async () => {
    try {
      const rows = await api.getMessages();
      setMessages(
        rows.map((row) => ({
          id: String(row.id),
          sender: row.sender,
          text: row.message_text
        }))
      );
    } catch (e) {}
  };

  useEffect(() => {
    load();
  }, []);

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        
        <SectionTitle>Healthcare Chatbot</SectionTitle>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 10
          }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.sender === "user"
                  ? styles.userBubble
                  : styles.botBubble
              ]}
            >
              <Text style={styles.bubbleText}>{item.text}</Text>
            </View>
          )}
        />

        {/* Input Area */}
        <View
          style={[
            styles.inputContainer,
            { paddingBottom: insets.bottom } // ✅ SAFE AREA FIX
          ]}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type symptoms..."
            style={styles.input}
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => handleSend()}
            >
              <Text style={styles.btnText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={handleVoice}
            >
              <Text style={styles.btnTextDark}>Voice</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  /* CHAT BUBBLES */
  bubble: {
    padding: 12,
    borderRadius: 15,
    marginVertical: 6,
    maxWidth: "80%"
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primary
  },

  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.input
  },

  bubbleText: {
    color: COLORS.text
  },

  /* INPUT AREA */
  inputContainer: {
    borderTopWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    backgroundColor: COLORS.card
  },

  input: {
    backgroundColor: COLORS.input,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 8,
    color: COLORS.text
  },

  row: {
    flexDirection: "row",
    gap: 10
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 20,
    alignItems: "center"
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: COLORS.input,
    padding: 12,
    borderRadius: 20,
    alignItems: "center"
  },

  btnText: {
    color: "#fff",
    fontWeight: "700"
  },

  btnTextDark: {
    color: COLORS.text,
    fontWeight: "700"
  }
});