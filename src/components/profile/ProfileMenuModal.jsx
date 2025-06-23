import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileMenuModal = ({ isVisible, onClose, onLogout }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
            <Icon name="log-out-outline" size={24} color="red" />
            <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    width: "100%",
  },
  menuText: {
    marginLeft: 15,
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileMenuModal;
