import { StyleSheet, View, Text } from "react-native";
export default function TodoDetailsScreen({ route }) {
    
  const { title, description } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.todo}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  todo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    padding: 20,
  },
});
