import React from "react";
import { TextInput, Button, StyleSheet } from "react-native-web";

const TodoForm = ({
  title,
  setTitle,
  description,
  setDescription,
  addTodo,
}) => {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Todo title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Todo description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Todo" onPress={addTodo} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    width: "80%",
    marginBottom: 20,
  },
});
export default TodoForm;
