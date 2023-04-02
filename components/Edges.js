import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Edges = (props) => {

	const width = props.body.bounds.max.x - props.body.bounds.min.x;
	const height = props.body.bounds.max.y - props.body.bounds.min.y;

	const xPos = props.body.position.x - width / 2;
	const yPos = props.body.position.y - height / 2;

	return (
		<View
			style={{
				position: "absolute",
				left: xPos,
				top: yPos,
				width: width,
				height: height,
				backgroundColor: props.color,
			}}
		/>
	);
};

export default (world, color, pos, size, extraOptions) => {
	const edges = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
		label: extraOptions.label,
		isStatic: true,
	});
	Matter.World.add(world, edges);
	return { body: edges, color, pos, extraOptions, renderer: <Edges /> };
};
