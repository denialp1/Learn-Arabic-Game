
import { astar, convert } from "./astar.js";

export async function cutscene2(map) { // NOTE* script halts  if any movements are invalid (e.g. move up against solid wall)
    await map.startCutscene([
        { who: "player", type: "walk", direction: "down" },
        { who: "kareem", type: "walk", direction: "left" },
    ]);
    setQuiz(map, "kareem", "1,3", "dragDropQuiz");
    await waitQuiz(map);
    await moveTo("kareem", map, 3, 3);
    await map.startCutscene([
        { who: "kareem", type: "stand", direction: "up" },
    ]);
    setQuiz(map, "kareem", "1,2", "multipleChoiceQuiz");
    await waitQuiz(map);
    await moveTo("kareem", map, 13, 6);
    await map.startCutscene([
        { who: "kareem", type: "stand", direction: "up" },
    ]);
}

export function cutscene1(map) {
    map.startCutscene([
        { who: "player", type: "walk", direction: "down" },
        { who: "player", type: "walk", direction: "down" },
        { who: "npc1", type: "walk", direction: "left" },
        { who: "npc1", type: "walk", direction: "left" },
        { who: "npc1", type: "walk", direction: "left" },
        { who: "npc1", type: "walk", direction: "left" },
        { who: "npc1", type: "stand", direction: "up", time: 800 },
    ]);
}

export function setQuiz(map, npc, range, quizType) {
    map.gameObjects[npc].quiz[0].active = quizType;
    map.gameObjects[npc].quiz[0].events[0].range = range;
}

async function waitQuiz(map) {
    while (!map.isQuiz) { // first loop to wait for quiz to start
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms before checking again
    }
    while (map.isQuiz) { // second loop to wait for quiz to end
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms before checking again
    }
}

async function moveTo(name, map, x, y) {
    const object = map.gameObjects[name];
    const start = { x: object.x, y: object.y }; // starting point
    const goal = { x: x*16, y: y*16}; // goal point

    // console.log(start, goal);
    const path = astar(start, goal);
    // console.log(path);
    await map.startCutscene(convert(path));
}
