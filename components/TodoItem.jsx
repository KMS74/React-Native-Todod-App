import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TodoItem = ({
  item,
  index,
  toggleDone,
  deleteTodo,
  navigateToDetails,
}) => {
  const [showModel, setShowModel] = useState(false);
  return (
    <TouchableOpacity onPress={() => navigateToDetails(index)}>
      <View style={styles.todoContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <CheckBox value={item.done} onValueChange={() => toggleDone(index)} />
          <Text
            onPress={() => toggleDone(index)}
            style={item.done ? styles.done : styles.todo}
          >
            {item.title}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowModel(true)}>
          <MaterialIcons name="delete-outline" size={24} color="red" />
        </TouchableOpacity>
        <Modal
          visible={showModel}
          animationType="slide"
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setShowModel(!showModel);
          }}
        >
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalText}>Delete Todo!</Text>
              <View style={styles.modelCTA}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setShowModel(!setShowModel)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonDelete]}
                  onPress={() => {
                    deleteTodo(index);
                    setShowModel(!setShowModel);
                  }}
                >
                  <Text style={styles.textStyle}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  todo: {
    fontSize: 16,
  },
  done: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#8888",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin: 70,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modelCTA: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  button: {
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonDelete: {
    backgroundColor: "#ff1111",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default TodoItem;
