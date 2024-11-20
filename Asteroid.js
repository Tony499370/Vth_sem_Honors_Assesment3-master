import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Linking } from "react-native";

export function Asteroid({ route }) {
	const { asteroidId } = route.params;
	const [asteroidInfo, setAsteroidInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const API_KEY = "DUS8Lv63svnZNlbza7pTyP0pptbMwEdf3sDDTvCN";

	useEffect(() => {
		const fetchAsteroidData = async () => {
			setLoading(true);
			setError("");
			try {
				let url;
				if (asteroidId === "random") {
					const browseResponse = await (
						await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`)
					).json();
                    const randomAsteroidIndex = Math.floor(Math.random() * browseResponse.near_earth_objects.length);
					const randomAsteroid = browseResponse.near_earth_objects[randomAsteroidIndex];

					url = `https://api.nasa.gov/neo/rest/v1/neo/${randomAsteroid.id}?api_key=${API_KEY}`;
				} else {
					url = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${API_KEY}`;
				}

				const response = await (await fetch(url)).json();
				setAsteroidInfo(response);
			} catch (err) {
				setError("Failed to fetch asteroid data. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchAsteroidData();
	}, [asteroidId]);

	if (loading)
		return (
			<View style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);

	if (error) return <Text style={styles.error}>{error}</Text>;

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Asteroid Details</Text>
			{asteroidInfo ? (
				<>
					<Text>Name: {asteroidInfo.name}</Text>
					<Text>Potentially Hazardous: {asteroidInfo.is_potentially_hazardous_asteroid ? "Yes" : "No"}</Text>
					<Text>NASA JPL URL: </Text>
					<Text style={styles.link} onPress={() => Linking.openURL(asteroidInfo.nasa_jpl_url)}>
						{asteroidInfo.nasa_jpl_url}
					</Text>
				</>
			) : (
				<Text>No details found.</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20 },
	heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
	error: { color: "red", fontSize: 16, marginTop: 20 },
	link: { color: "blue", textDecorationLine: "underline" },
});
