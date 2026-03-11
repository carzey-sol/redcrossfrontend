import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router"; // For Expo Router navigation

const LoginPrompt = ({ visible, onClose, navigateToLogin }) => {
  const router = useRouter();

  return (
    <View
    className="flex-1 items-center justify-center bg-transparent"

    >
      <TouchableWithoutFeedback onPress={onClose}>
       
          <View style={styles.popup}>
            <Entypo
              name="login"
              size={50}
              color="#EF4444"
              style={styles.icon}
            />
            <Text style={styles.title}>Please Login To View Full Details</Text>

            <TouchableOpacity
              onPress={() => {
                onClose()
                navigateToLogin() 
                
                
              }}
              style={styles.loginButton}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
       
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5, // subtle shadow for popup
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    lineHeight: 24, // better line spacing for readability
  },
  loginButton: {
    backgroundColor: "#EF4444", // Tailwind's red-500
    width: "100%",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#E5E7EB", // Tailwind's gray-200
    width: "100%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default LoginPrompt;
