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
loadSprite("Knight", "./sprites/Idle.png", {
  sliceX: 4,
  sliceY: 1,
  anims: { "idle-anim": { from: 0, to: 3, loop: true } },
});
loadSprite("Attack", "./sprites/Attack1.png", {
  sliceX: 6,
  sliceY: 1,
  anims: { "idle-anim": { from: 0, to: 5, loop: true } },
});
loadSprite("Fall", "./sprites/Fall.png", {
  sliceX: 3,
  sliceY: 1,
  anims: { "idle-anim": { from: 0, to: 2, loop: true } },
});
loadSprite("Jump", "./sprites/Jump.gif", {
  sliceX: 6,
  sliceY: 1,
  anims: { "idle-anim": { from: 0, to: 5, loop: true } },
});
loadSprite("Run", "./sprites/Dashing.png", {
  sliceX: 4,
  sliceY: 1,
  anims: { "idle-anim": { from: 0, to: 3, loop: true } },
});
loadSprite("Walk", "./sprites/Walking.png", {
  sliceX: 7,
  sliceY: 1,
  anims: { "idle-anim": { from: 0, to: 6, loop: true } },
});
loadSprite("Landing", "./sprites/Landing.png", {
  sliceX: 4,
  sliceY: 1,
  anims: { "idle-anim": { from: 0, to: 3, loop: true } },
});

loadSprite("blue-block", "./sprites/blueblock.png");
loadSprite("blue-brick", "./sprites/bluebrick.png");
loadSprite("blue-steel", "./sprites/bluesteel.png");
loadSprite("blue-evil-shroom", "./sprites/bluemushroom.png");
loadSprite("blue-surprise", "./sprites/bluesurprise.png");

gravity(1000);

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

  const playerAnimations = {
    idle: animation(0.2, ""),
    jump: animation(
      0.2,
      "jump-0",
      "jump-1",
      "jump-2",
      "jump-3",
      "jump-4",
      "jump-5",
      "jump-6",
      "jump-7",
      "jump-8",
      "jump-9",
      "jump-10",
      "jump-11",
      "jump-12",
      "jump-13",
      "jump-14",
      "jump-15"
    ),
    run: animation(
      0.1,
      "run-0",
      "run-1",
      "run-2",
      "run-3",
      "run-4",
      "run-5",
      "run-6",
      "run-7",
      "run-8",
      "run-9",
      "run-10",
      "run-11",
      "run-12",
      "run-13",
      "run-14",
      "run-15"
    ),
    walk: animation(
      0.1,
      "walk-0",
      "walk-1",
      "walk-2",
      "walk-3",
      "walk-4",
      "walk-5",
      "walk-6",
      "walk-7",
      "walk-8",
      "walk-9",
      "walk-10",
      "walk-11",
      "walk-12",
      "walk-13",
      "walk-14",
      "walk-15",
      "walk-16",
      "walk-17",
      "walk-18",
      "walk-19",
      "walk-20"
    ),
  };

  const player = add([
    sprite("Knight"),
    solid(),
    pos(30, 0),
    body(),
    big(),
    origin("bot"),
    scale(0.1),
    area({ shape: new Rect(vec2(0), 32, 32), offset: vec2(0, 32) }),
  ]);

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

  onKeyDown("right", () => {
    if (player.curAnim() !== "Dashing" && player.isGrounded()) {
      player.use(sprite("Dashing"));
      player.play("run-anim");
    }

    if (player.direction !== "right") player.direction = "right";

    player.move(player.speed, 0);
  });

  onKeyRelease("right", () => {
    player.use(sprite("Knight"));
    player.play("idle-anim");
  });
  onKeyDown("left", () => {
    if (player.curAnim() !== "Dashing" && player.isGrounded()) {
      player.use(sprite("Dashing"));
      player.play("run-anim");
    }

    if (player.direction !== "left") player.direction = "left";

    player.move(-player.speed, 0);
  });

  onKeyRelease("left", () => {
    player.use(sprite("Knight"));
    player.play("idle-anim");
  });

  onKeyPress("up", () => {
    if (player.isGrounded()) {
      player.jump();
    }
  });

  onUpdate(() => {
    if (player.previousHeight) {
      player.heightDelta = player.previousHeight - player.pos.y;
    }

    player.previousHeight = player.pos.y;

    const cameraLeftBound = 550;
    const cameraRightBound = 3000;
    const cameraVerticalOffset = player.pos.y - 100;

    if (cameraLeftBound > player.pos.x) {
      camPos(cameraLeftBound, cameraVerticalOffset);
    } else if (cameraRightBound < player.pos.x) {
      camPos(cameraRightBound, cameraVerticalOffset);
    } else {
      camPos(player.pos.x, cameraVerticalOffset);
    }

    if (player.curAnim() !== "run-anim" && player.isGrounded()) {
      player.use(sprite("Knight"));
      player.play("idle-anim");
    }

    if (
      player.curAnim() !== "Jump" &&
      !player.isGrounded() &&
      player.heightDelta > 0
    ) {
      player.use(sprite("Jump"));
      player.play("jump-anim");
    }

    if (
      player.curAnim() !== "Fall" &&
      !player.isGrounded() &&
      player.heightDelta < 0
    ) {
      player.use(sprite("Fall"));
      player.play("fall-anim");
    }

    if (player.direction === "left") {
      player.flipX = true;
    } else {
      player.flipX = false;
    }
  });

  player.action(() => {
    if (player.grounded()) {
      isJumping = false;
      if (!keyIsDown("left") && !keyIsDown("right")) {
        player.play(playerAnimations.idle); // Change animation to idle when player stops moving
      }
    }
  });

  // ... The rest of the game logic
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
  keyPress("enter", () => {
    go("game", { level: 0, score: 0 }); // Restart the game with initial level and score
  });
});

start("game", { level: 0, score: 0 });
