import { View } from "react-native";
import Matter from "matter-js";

const Enemy = (props) => {
	const width = props.size.width;
	const height = props.size.height;

	const xPos = props.body.position.x - width / 2;
	const yPos = props.body.position.y - height / 2;

	let angle = props.body.angle + "deg";
	return (
		<View
			style={{
				width: props.size.width,
				height: props.size.height,
				left: xPos,
				top: yPos,
				backgroundColor: props.color,
				position: "absolute",
			}}
		></View>
	);
};

export default (world, color, pos, size, extraOptions) => {
	const enemy = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
		label: extraOptions.label,
		frictionAir: 0,
		angularVelocity: 0,
		// restitution: 1,
		friction: 0,
		frictionStatic: 0,
		isStatic: extraOptions.isStatic,
	});
	Matter.World.add(world, enemy);
	return { body: enemy, color, pos, size, extraOptions, renderer: <Enemy /> };
};
