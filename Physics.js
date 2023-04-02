import Matter from "matter-js";
import Constants from "./Constants";

const randomBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const Physics = (entities, { events, time, dispatch }) => {
	let engine = entities.physics.engine;

	/*************TOUCH CONTROLS WITH ARROW KEY ****************/
	if (events.length) {
		for (let i = 0; i < events.length; i++) {
			if (events[i].type === "move-left") {
				Matter.Body.setVelocity(entities.Player.body, { x: -4, y: 0 });
			}
			if (events[i].type === "move-right") {
				Matter.Body.setVelocity(entities.Player.body, { x: 4, y: 0 });
			}
		}
	}

	Matter.Events.on(engine, "collisionStart", (event) => {
		var pairs = event.pairs;

		for (let i = 0; i < pairs.length; i++) {
			let pair = pairs[i];
			let A = pair.bodyA.label;
			let B = pair.bodyB.label;
			if (A === "Player" && B === "GoodEntity") {
				// Award points to the player
				dispatch({ type: "gainPoints" });

				// Respawn Enemy2 at the top of the screen
				Matter.Body.setPosition(entities.GoodEntity.body, {
					x: randomBetween(25, Constants.WINDOW_WIDTH - 25),
					y: 35,
				});
			}
			if (pair.bodyB.label === "Player" && pair.bodyA.label === "GoodEntity") {
				// Award points to the player
				dispatch({ type: "gainPoints" });

				// Respawn Enemy2 at the top of the screen
				Matter.Body.setPosition(entities.GoodEntity.body, {
					x: randomBetween(25, Constants.WINDOW_WIDTH - 25),
					y: 35,
				});
			}
			if (pair.bodyA.label === "GoodEntity" && pair.bodyB.label === "Middle") {
				// End the game if GoodEntity collides with the middle boundary
				dispatch({ type: "game_over" });
			}
			if (pair.bodyB.label === "GoodEntity" && pair.bodyA.label === "Middle") {
				// End the game if GoodEntity collides with the middle boundary
				dispatch({ type: "game_over" });
			}
			if (pair.bodyA.label === "Enemy" && pair.bodyB.label === "Middle") {
				Matter.Body.setPosition(entities.Enemy.body, {
					x: randomBetween(25, Constants.WINDOW_WIDTH - 25),
					y: randomBetween(
						Constants.WINDOW_HEIGHT / 3,
						Constants.WINDOW_HEIGHT / 8
					),
				});
			}
			if (pair.bodyB.label === "Enemy" && pair.bodyA.label === "Middle") {
				Matter.Body.setPosition(entities.Enemy.body, {
					x: randomBetween(25, Constants.WINDOW_WIDTH - 25),
					y: randomBetween(
						Constants.WINDOW_HEIGHT / 3,
						Constants.WINDOW_HEIGHT / 8
					),
				});
			}
			if (pair.bodyA.label === "Player" && pair.bodyB.label === "Enemy") {
				// End the game if player collides with Enemy1
				dispatch({ type: "game_over" });
			}
			if (pair.bodyB.label === "Player" && pair.bodyA.label === "Enemy") {
				// End the game if player collides with Enemy1
				dispatch({ type: "game_over" });
			}
		}
	});
	// if (time.current % 100 === 0) {
	// 	entities.Enemy1.body.velocity.x = Math.random() * 4 - 2;
	// 	entities.Enemy2.body.velocity.x = Math.random() * 4 - 2;
	// }

	Matter.Engine.update(engine, time.delta);

	return entities;
};

export default Physics;
