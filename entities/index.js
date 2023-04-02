import Edges from "../components/Edges";
import Matter from "matter-js";
import Constants from "../Constants";
import Enemy from "../components/Enemy";
import Player from "../components/Player";
import GoodEgg from "../components/GoodEgg";

export default (gameWorld) => {
	let engine = Matter.Engine.create({ enableSleeping: false });
	let world = engine.world;
	engine.gravity.y = 0.06;

	return {
		physics: { engine, world },

		TopBoundary: Edges(
			world,
			"black",
			{ x: Constants.WINDOW_WIDTH / 2, y: 0 },
			{ height: 30, width: Constants.WINDOW_WIDTH },
			{ label: "Top" }
		),
		Bottom: Edges(
			world,
			"black",
			{ x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
			{ height: 30, width: Constants.WINDOW_WIDTH },
			{ label: "Bottom" }
		),
		Left: Edges(
			world,
			"black",
			{ x: 0, y: Constants.WINDOW_HEIGHT / 2 },
			{ height: Constants.WINDOW_HEIGHT, width: 20 },
			{ label: "Left" }
		),
		Right: Edges(
			world,
			"black",
			{ x: Constants.WINDOW_WIDTH, y: Constants.WINDOW_HEIGHT / 2 },
			{ height: Constants.WINDOW_HEIGHT, width: 30 },
			{ label: "Right" }
		),
		Middle: Edges(
			world,
			"red",
			{ x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 },
			{ height: 20, width: Constants.WINDOW_WIDTH },
			{ label: "Middle" }
		),
		Enemy: Enemy(
			world,
			"red",
			{
				x: Math.random() * Constants.WINDOW_WIDTH,
				y: 0,
			},
			{ width: 50, height: 50 },
			{ isStatic: false, label: "Enemy" }
		),
		GoodEntity: GoodEgg(
			world,
			"green",
			{
				x: Math.random() * Constants.WINDOW_WIDTH - 50,
				y: 0,
			},
			{ width: 30, height: 30 },
			{
				friction: 0.5,
				isStatic: false,
				label: "GoodEntity",
			}
		),
		Player: Player(
			world,
			"blue",
			{
				x: Constants.WINDOW_WIDTH / 2 - 40,
				y: Constants.WINDOW_HEIGHT / 2 - 20,
			},
			15,
			{
				label: "Player",
			}
		),
	};
};
