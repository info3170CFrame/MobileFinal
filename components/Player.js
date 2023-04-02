import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Player = (props) => {
	const width = props.radius * 2;

	const x = props.body.position.x - width / 2;
	const y = props.body.position.y - width / 2;

	return (
		<View
			style={{
				borderWidth: 2,
				position: "absolute",
				left: x,
				top: y,
				width: width,
				height: width,
				borderRadius: props.radius,
				backgroundColor: props.color,
			}}
		/>
	);
};
export default (world, color, pos, radius) => {
	const player = Matter.Bodies.circle(pos.x, pos.y, radius, {
		label: "Player",
	});

	Matter.World.add(world, player);
	return { body: player, color, radius, renderer: <Player /> };
};
