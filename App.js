import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import React, { useState, useEffect } from "react";
import Physics from "./Physics";
import Score from "./components/Score";

export default function App() {
	const [startGame, setStartGame] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [gameEngine, setGameEngine] = useState(null);
	const [score, setScore] = useState(0);
	const [scored, setScored] = useState(false);

	const WelcomeScreen = ({ onStart }) => (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<TouchableOpacity
				style={{
					backgroundColor: "green",
					border: "black",
					borderWidth: 2,
					paddingHorizontal: 50,
					paddingVertical: 20,
				}}
				onPress={() => {
					setStartGame(true);
					gameEngine.swap(entities());
				}}
			>
				<Text
					style={{
						fontWeight: "bold",
						color: "white",
						fontSize: 30,
						textAlign: "center",
					}}
				>
					WELCOME{"\n"}
					Do not touch the red block. {"\n"}Do not let the green block hit the
					ground.{"\n"}CLICK TO START
				</Text>
			</TouchableOpacity>
		</View>
	);

	const GameOverScreen = ({ onRestart }) => (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<TouchableOpacity
				style={{
					backgroundColor: "red",
					border: "black",
					borderWidth: 2,
					paddingHorizontal: 50,
					paddingVertical: 20,
				}}
				onPress={() => {
					setGameOver(false);
					onRestart();
				}}
			>
				<Text
					style={{
						fontWeight: "bold",
						color: "white",
						fontSize: 30,
						textAlign: "center",
					}}
				>
					Game Over! Press here to play again!
				</Text>
			</TouchableOpacity>
		</View>
	);

	let timer;
	useEffect(() => {
		if (scored) {
			timer = setTimeout(() => {
				setScored(false);
			}, 200);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [scored]);

	const handleRestart = () => {
		setStartGame(false);
		setGameOver(false);
		setScore(0);
		gameEngine.swap(entities());
	};

	return (
		<View style={styles.container}>
			<GameEngine
				ref={(ref) => {
					setGameEngine(ref);
				}}
				systems={[Physics]}
				entities={entities()}
				running={startGame}
				onEvent={(e) => {
					switch (e.type) {
						case "game_over":
							setGameOver(true);
							gameEngine.stop();
							break;
						case "gainPoints":
							if (!scored) {
								setScore(score + 10);
								setScored(true);
							} else {
								clearTimeout(timer);
								timer = setTimeout(() => {
									setScored(false);
								}, 200);
							}
							break;
					}
				}}
				style={styles.gameContainer}
			>
				<StatusBar
					style='auto'
					hidden={true}
				/>
			</GameEngine>

			{!startGame ? (
				<WelcomeScreen
					onStart={() => {
						setStartGame(true);
						gameEngine.swap(entities());
					}}
				/>
			) : null}
			{gameOver ? (
				<GameOverScreen
					onRestart={() => {
						setGameOver(false);
						setStartGame(true);
						setScore(0);
						gameEngine.swap(entities());
						gameEngine.start();
					}}
				/>
			) : null}

			<View style={styles.controls}>
				<View style={styles.controlRow}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							gameEngine.dispatch({ type: "move-left" });
						}}
					>
						<View style={styles.control}>
							<Text style={styles.centerText}>Left</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							gameEngine.dispatch({ type: "move-right" });
						}}
					>
						<View style={styles.control}>
							<Text style={styles.centerText}>Right</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.scoreContainer}>
				<Score
					score={score}
					setScore={setScore}
				/>
				<TouchableOpacity
					style={styles.restartButton}
					onPress={handleRestart}
				>
					<Text style={styles.centerText}>Restart</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.watermark}>Final Game</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	gameContainer: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
	},
	watermark: {
		fontSize: 20,
		color: "white",
		marginBottom: 10,
		marginTop: 120,
		opacity: 50,
	},
	controlRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
		marginRight: 5,
	},
	centerText: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "red",
		padding: 34,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: "white",
		margin: 5,
	},
	controls: {
		backgroundColor: "black",
		height: "50%",
		width: "100%",
		position: "absolute",
		bottom: 0,
	},
	restartButton: {
		backgroundColor: "red",
		padding: 34,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: "white",
		margin: 5,
		bottom: -10,
	},
	scoreContainer: {
		bottom: -70,
	},
});
