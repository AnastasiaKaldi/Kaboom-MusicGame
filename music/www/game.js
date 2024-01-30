kaboom({
  global: true,
  scale: 2,
  fullscreen: true,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

// Speed identifiers
const MOVE_SPEED = 120;
const JUMP_FORCE = 360;
const BIG_JUMP_FORCE = 550;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const FALL_DEATH = 800;
const ENEMY_SPEED = 20;
const scoreLabel = 0;
const score = 0;

// Game logic
let isJumping = false;

loadSprite("coin", "./sprites/key.png");
loadSprite("evil-shroom", "./sprites/slime.png");
loadSprite("block", "./sprites/Tile-Set.png");
loadSprite("mushroom", "./sprites/mushroom.png");
loadSprite("surprise", "./sprites/Treasure.png");
loadSprite("unboxed", "./sprites/unboxed.png");
loadSprite("Door", "./sprites/Door.png");

loadSprite("Knight", "./sprites/knight/Idle.png", {
  sliceX: 4,
  sliceY: 1,
  anims: { "idle-anim": { from: 0, to: 3, loop: true, speed: 0.1 } },
});
loadSprite("Fall", "./sprites/knight/Idle.png", {
  sliceX: 4,
  sliceY: 1,
  anims: { "fall-anim": { from: 0, to: 3, loop: true, speed: 0.1 } },
});
loadSprite("Jump", "./sprites/knight/Idle.png", {
  sliceX: 4,
  sliceY: 1,
  anims: { "jump-anim": { from: 0, to: 3, loop: true, speed: 0.1 } },
});
loadSprite("Dashing", "./sprites/knight/Idle.png", {
  sliceX: 4,
  sliceY: 1,
  anims: { "run-anim": { from: 0, to: 3, loop: false, speed: 0.5 } },
});

loadSprite("blue-block", "./sprites/blueblock.png");
loadSprite("blue-brick", "./sprites/bluebrick.png");
loadSprite("blue-steel", "./sprites/bluesteel.png");
loadSprite("blue-evil-shroom", "./sprites/SlimeOrange.png");
loadSprite("blue-surprise", "./sprites/bluesurprise.png");

scene("game", ({ level, score }) => {
  layers(["bg", "obj", "ui"], "obj");

  const maps = [
    [
      "                                         ",
      "                                         ",
      "                                         ",
      "                                         ",
      "                                         ",
      "                                         ",
      "                                         ",
      "                                         ",
      "                                         ",
      "                                         ",
      "                                         ",
      "                                         ",
      "          =                              ",
      "                                         ",
      "                                         ",
      "                   =====        =========",
      "          ====           =====  =        ",
      "                  =             =        ",
      "                     ===        =        ",
      "                = =             =   %    ",
      "            =                       ==== ",
      "      =====               +              ",
      "                                         ",
      "=================================   =====",
    ],
    [
      "£                                       £",
      "£                                       £",
      "£                                       £",
      "£           ££££               >        £",
      "£                             >>        £",
      "£        @@@£@@@£@           >>>        £",
      "£                          >>>>>        £",
      "£                        >>>>>>>      -+£",
      "£              <     <  >>>>>>>>      ()£",
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    ],
    [
      "                                      ",
      "                                      ",
      "                                      ",
      "                                      ",
      "                                      ",
      "     %   =*=%=                        ",
      "                                      ",
      "                                  %%  ",
      "                            +         ",
      "==============================   =====",
    ],
  ];

  const levelCfg = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), pos(width() / 2, height()), scale(0.5)],
    "&": [sprite("coin"), scale(1.0), "coin"], // Changed from '%' to '$' for coins
    "%": [sprite("surprise"), scale(1.5), "coin-surprise"],
    "*": [sprite("surprise"), solid(), "mushroom-surprise"],
    "}": [sprite("unboxed"), scale(1.3)],
    "+": [sprite("Door"), scale(1.5), "door"],
    "#": [sprite("mushroom"), solid(), "mushroom", body()],
    "!": [sprite("blue-block"), solid(), scale(0.5)],
    "£": [sprite("blue-brick"), solid(), scale(0.5)],
    "@": [sprite("blue-surprise"), solid(), scale(0.5), "coin-surprise"],
    ">": [sprite("blue-steel"), solid(), scale(0.5)],
  };

  const gameLevel = addLevel(maps[level], levelCfg);

  const question = {
    text: "What is the capital of France?",
    correctAnswer: "Paris",
  };

  let isDoorOpen = false; // Variable to track if the door is open

  const askQuestion = () => {
    const userAnswer = prompt(question.text);

    if (userAnswer === question.correctAnswer) {
      // Correct answer, open the door
      isDoorOpen = true;
      console.log("You answered correctly! The door is now open.");
      showNextInstruction(); // Move to the next instruction after answering the question
    } else {
      // Incorrect answer, provide feedback and ask the question again
      console.log("Incorrect answer. Try again!");
      askQuestion();
    }
  };

  const instructions = [
    "Welcome to the Game!",
    "The door is locked",
    "To open it, answer the question",
    "What is the capital of France?",
    "Good Luck!",
  ];

  const instructionText = add([
    text(""),
    layer("ui"),
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(2),
    color(1, 1, 1), // Initial color (white)
  ]);

  let currentInstructionIndex = 0;

  function typeText(text, index = 0) {
    if (index < text.length) {
      instructionText.text = text.slice(0, index + 1);
      wait(0.09, () => typeText(text, index + 1));
    } else {
      // If this is the last instruction, wait for a few seconds before stopping
      if (currentInstructionIndex === instructions.length - 1) {
        wait(5, () => stopTyping());
      } else {
        showNextInstruction();
      }
    }
  }

  function showNextInstruction() {
    wait(1, () => {
      currentInstructionIndex++;
      if (currentInstructionIndex < instructions.length) {
        typeText(instructions[currentInstructionIndex]);
      }
    });
  }

  function stopTyping() {
    // Additional logic if needed
    // Start asking the question after the instructions finish typing
    askQuestion();
  }

  typeText(instructions[currentInstructionIndex]);

  // ... The 'big' function and other functions

  function big() {
    let timer = 0;
    let isBig = false;
    return {
      update() {
        if (isBig) {
          CURRENT_JUMP_FORCE = BIG_JUMP_FORCE;
          timer -= dt();
          if (timer <= 0) {
            this.smallify();
          }
        }
      },
      isBig() {
        return isBig;
      },
      smallify() {
        this.scale = vec2(1);
        CURRENT_JUMP_FORCE = JUMP_FORCE;
        timer = 0;
        isBig = false;
      },
      biggify(time) {
        this.scale = vec2(2);
        timer = time;
        isBig = true;
      },
    };
  }

  const player = add([
    sprite("Knight"),
    solid(),
    pos(30, 0),
    body(),
    big(),
    origin("bot"),
    scale(0.5),
  ]);

  console.log("Player after creation:", player);

  player.play("idle-anim");

  // ... The rest of the player logic
  action("mushroom", (m) => {
    m.move(20, 0);
  });

  // player.on("headbump", (obj) => {
  //   keyPress("down", () => {
  //     if (obj.is("coin-surprise")) {
  //       gameLevel.spawn("&", obj.gridPos.sub(0, 1));
  //       destroy(obj);
  //       gameLevel.spawn("}", obj.gridPos.sub(0, 0));
  //     }
  //   });
  // });

  player.collides("coin-surprise", (obj) => {
    player.action(() => {
      if (keyIsPressed("down")) {
        gameLevel.spawn("&", obj.gridPos.sub(0, 1));
        destroy(obj);
        gameLevel.spawn("}", obj.gridPos.sub(0, 0));
      }
    });
  });

  player.collides("mushroom", (m) => {
    destroy(m);
    player.biggify(6);
  });

  player.collides("coin", (c) => {
    destroy(c);
    scoreLabel.value++;
    scoreLabel.text = scoreLabel.value;
  });

  player.collides("dangerous", (d) => {
    if (isJumping) {
      destroy(d);
    } else {
      go("lose", { score: scoreLabel.value });
    }
  });

  player.collides("door", () => {
    keyPress("down", () => {
      // Only allow progression if the door is open
      if (isDoorOpen) {
        go("game", {
          level: (level + 1) % maps.length,
          score: scoreLabel.value,
        });
      } else {
        console.log("The door is locked. Answer the question to open it.");
        askQuestion();
      }
    });
  });

  player.action(() => {
    if (player.pos.y >= FALL_DEATH) {
      go("lose", { score: scoreLabel.value });
    }

    if (player.grounded()) {
      if (isJumping) {
        // Player just landed
        isJumping = false;
        player.use(sprite("Knight"));
        player.play("idle-anim");
      } else {
        // Player is on the ground, not jumping
        if (!keyIsDown("left") && !keyIsDown("right")) {
          if (player.curAnim() !== "idle-anim") {
            player.use(sprite("Knight"));
            player.play("idle-anim");
          }
        } else if (player.curAnim() !== "run-anim") {
          player.use(sprite("Dashing"));
          player.play("run-anim");
        }
      }
    } else {
      // Player is in the air
      if (isJumping) {
        // Player is jumping
        if (player.curAnim() !== "jump-anim") {
          player.use(sprite("Jump"));
          player.play("jump-anim");
        }
      } else {
        // Player is falling
        if (player.curAnim() !== "fall-anim") {
          player.use(sprite("Fall"));
          player.play("fall-anim");
        }
      }
    }

    if (keyIsDown("left")) {
      player.move(-MOVE_SPEED, 0);
      player.flipX = true;
    }

    if (keyIsDown("right")) {
      player.move(MOVE_SPEED, 0);
      player.flipX = false;
    }

    if (keyIsPressed("up") && player.grounded() && !isJumping) {
      player.jump(CURRENT_JUMP_FORCE);
      isJumping = true;
    }
  });
});

scene("lose", ({ score }) => {
  add([
    text("Press Space to Restart", 32),
    origin("center"),
    pos(width() / 2, height() / 2 - 20),
  ]);

  add([
    text("Score: " + score, 24),
    origin("center"),
    pos(width() / 2, height() / 2 + 20),
  ]);

  // Key event listener for spacebar to restart the game
  keyPress("space", () => {
    go("game", { level: 0, score: 0 }); // Restart the game with initial level and score
  });
});

start("game", { level: 0, score: 0 });
