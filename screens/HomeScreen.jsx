import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

const STORAGE_KEY = "@todos";

export default function HomeScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  const navigation = useNavigation();

  useEffect(() => {
    async function loadTodos() {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTodos) {
        // Converts a JavaScript Object Notation (JSON) string into an object.
        setTodos(JSON.parse(storedTodos));
      }
    }
    loadTodos();
  }, []);

  useEffect(() => {
    async function saveTodos() {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
    saveTodos();
  }, [todos]);

  const addTodo = () => {
    if (title.trim() && description.trim()) {
      setTodos([...todos, { title, description, done: false }]);
      // reseting title and description form value
      setTitle("");
      setDescription("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const filterTodos = (filter) => {
    setFilter(filter);
  };

  // filtering todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") {
      return true;
    }
    if (filter === "Active") {
      return !todo.done;
    }
    if (filter === "Done") {
      return todo.done;
    }
  });

  const renderItem = ({ item, index }) => {
    return (
      <TodoItem
        item={item}
        index={index}
        toggleDone={toggleDone}
        deleteTodo={deleteTodo}
        navigateToDetails={navigateToDetails}
      />
    );
  };

  // navigate to TodoDetails with todo item data
  const navigateToDetails = (index) => {
    navigation.navigate("TodoDetails", {
      title: todos[index].title,
      description: todos[index].description,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO APP</Text>
      <TodoForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        addTodo={addTodo}
      />

      <View style={styles.divider} />

      <View style={styles.filterButtons}>
        <Button
          title="All"
          onPress={() => filterTodos("All")}
          color={filter === "All" ? "#007aff" : undefined}
        />
        <Button
          title="Active"
          onPress={() => filterTodos("Active")}
          color={filter === "Active" ? "#007aff" : undefined}
        />
        <Button
          title="Done"
          onPress={() => filterTodos("Done")}
          color={filter === "Done" ? "#007aff" : undefined}
        />
      </View>

      <FlatList
        style={styles.todoList}
        data={filteredTodos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    width: "80%",
    marginBottom: 20,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  todo: {
    fontSize: 16,
  },
  done: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#ccc",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "80%",
    marginVertical: 20,
  },
  filterButtons: {
    flexDirection: "row",
    marginVertical: 16,
    gap: 20,
    width: "80%",
    marginBottom: 20,
  },
  todoList: {
    width: "80%",
  },
});
