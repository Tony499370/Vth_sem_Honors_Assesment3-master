import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

export function Home({ navigation }: any) {
	const [asteroidId, setAsteroidId] = useState("");

	const handleInputChange = (text: string) => setAsteroidId(text);

	const handleSubmit = () => {
		navigation.navigate("Asteroid Details", { asteroidId });
	};

	const handleRandomAsteroid = () => {
		navigation.navigate("Asteroid Details", { asteroidId: "random" });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Asteroid Information</Text>
			<TextInput
				placeholder="Enter Asteroid ID"
				value={asteroidId}
				onChangeText={handleInputChange}
				style={styles.input}
			/>
			<Pressable
				onPress={handleSubmit}
				disabled={!asteroidId}
				style={{ ...styles.button, ...(asteroidId ? {} : styles.buttonDisabled) }}
			>
				<Text style={styles.text}>Submit</Text>
			</Pressable>
			<Pressable onPress={handleRandomAsteroid} style={styles.button}>
				<Text style={styles.text}>Random Asteroid</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20 },
	heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
	input: { padding: 10, borderWidth: 1, marginBottom: 20, borderRadius: 10 },
	button: { padding: 20, backgroundColor: "rgb(0,250,150)", marginBottom: 20, borderRadius: 10 },
	buttonDisabled: { backgroundColor: "#4c4c4caa"},
	text: { fontSize: 16, fontWeight: "bold", color: "white" },
});
