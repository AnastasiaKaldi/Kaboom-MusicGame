kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

// Speed identifiers
const MOVE_SPEED = 120;
const JUMP_FORCE = 360;
const BIG_JUMP_FORCE = 550;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const FALL_DEATH = 400;
const ENEMY_SPEED = 20;

// Game logic
let isJumping = false;

loadSprite("coin", "./sprites/coin.png");
loadSprite("evil-shroom", "./sprites/evilmushroom.png");
loadSprite("block", "./sprites/block.png");
loadSprite("mushroom", "./sprites/mushroom.png");
loadSprite("surprise", "./sprites/surprise.png");
loadSprite("unboxed", "./sprites/unboxed.png");
loadSprite("pipe-top-left", "./sprites/pipe-top-left.png");
loadSprite("pipe-top-right", "./sprites/pipe-top-right.png");
loadSprite("pipe-bottom-left", "./sprites/pipe-bottom-left.png");
loadSprite("pipe-bottom-right", "./sprites/pipe-bottom-right.png");

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
loadSprite("blue-evil-shroom", "./sprites/bluemushroom.png");
loadSprite("blue-surprise", "./sprites/bluesurprise.png");

scene("game", ({ level, score }) => {
  layers(["bg", "obj", "ui"], "obj");

  const maps = [
    [
      "                                      ",
      "                                      ",
      "                                      ",
      "                                      ",
      "                                      ",
      "     %%   %=*=%=                     % ",
      "                                      ",
      "                            -+        ",
      "                    ^   ^   ()        ",
      "==============================   =====",
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
      "     %   =*=%=       ^                ",
      "                    ^^                ",
      "                   ^^^       -+   %%  ",
      "                  ^^^^      ()        ",
      "==============================   =====",
    ],
  ];

  const levelCfg = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid()],
    "&": [sprite("coin"), "coin"], // Changed from '%' to '$' for coins
    "%": [sprite("surprise"), solid(), "coin-surprise"],
    "*": [sprite("surprise"), solid(), "mushroom-surprise"],
    "}": [sprite("unboxed"), solid()],
    "(": [sprite("pipe-bottom-left"), solid(), scale(0.5)],
    ")": [sprite("pipe-bottom-right"), solid(), scale(0.5)],
    "-": [sprite("pipe-top-left"), solid(), scale(0.5), "pipe"],
    "+": [sprite("pipe-top-right"), solid(), scale(0.5), "pipe"],
    "^": [sprite("evil-shroom"), solid(), "dangerous"],
    "#": [sprite("mushroom"), solid(), "mushroom", body()],
    "!": [sprite("blue-block"), solid(), scale(0.5)],
    "£": [sprite("blue-brick"), solid(), scale(0.5)],
    "<": [sprite("blue-evil-shroom"), solid(), scale(0.5), "dangerous"],
    "@": [sprite("blue-surprise"), solid(), scale(0.5), "coin-surprise"],
    ">": [sprite("blue-steel"), solid(), scale(0.5)],
  };

  const gameLevel = addLevel(maps[level], levelCfg);

  const scoreLabel = add([
    text("Score: " + score),
    pos(120, 6),
    layer("ui"),
    {
      value: score,
    },
  ]);

  add([text("level " + parseInt(level + 1)), pos(40, 6)]);

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

  player.on("headbump", (obj) => {
    if (obj.is("coin-surprise")) {
      gameLevel.spawn("&", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("}", obj.gridPos.sub(0, 0));
    }
    if (obj.is("mushroom-surprise")) {
      gameLevel.spawn("#", obj.gridPos.sub(0, 1));
      destroy(obj);
      gameLevel.spawn("}", obj.gridPos.sub(0, 0));
    }
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

  action("dangerous", (d) => {
    d.move(-ENEMY_SPEED, 0);
  });

  player.collides("dangerous", (d) => {
    if (isJumping) {
      destroy(d);
    } else {
      go("lose", { score: scoreLabel.value });
    }
  });

  player.action(() => {
    camPos(player.pos);
    if (player.pos.y >= FALL_DEATH) {
      go("lose", { score: scoreLabel.value });
    }
  });

  player.collides("pipe", () => {
    keyPress("down", () => {
      go("game", {
        level: (level + 1) % maps.length,
        score: scoreLabel.value,
      });
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
    text("Press Enter to Restart", 32),
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
