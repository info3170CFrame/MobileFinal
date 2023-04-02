import React from "react";
import { Text, View } from "react-native";

const Score = ({ score }) => {
	return (
		<View>
			<Text style={{ fontSize: 50, color: "white" }}>Score: {score}</Text>
		</View>
	);
};

export default Score;
