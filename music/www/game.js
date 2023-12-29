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
loadSprite(
  "wizard",
  "./sprites/BlueWizard/2BlueWizardIdle/Chara - BlueIdle00000.png"
);
loadSprite(
  "run-0",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00000.png"
);
loadSprite(
  "run-1",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00001.png"
);
loadSprite(
  "run-2",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00002.png"
);
loadSprite(
  "run-3",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00003.png"
);
loadSprite(
  "run-4",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00004.png"
);
loadSprite(
  "run-5",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00005.png"
);
loadSprite(
  "run-6",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00006.png"
);
loadSprite(
  "run-7",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00007.png"
);
loadSprite(
  "run-8",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00008.png"
);
loadSprite(
  "run-9",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00009.png"
);
loadSprite(
  "run-10",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00010.png"
);
loadSprite(
  "run-11",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00011.png"
);
loadSprite(
  "run-12",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00012.png"
);
loadSprite(
  "run-13",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00013.png"
);
loadSprite(
  "run-14",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00014.png"
);
loadSprite(
  "run-15",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/Dash2/DashBlue_00015.png"
);

loadSprite(
  "walk-0",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00000.png"
);
loadSprite(
  "walk-1",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00001.png"
);
loadSprite(
  "walk-2",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00002.png"
);
loadSprite(
  "walk-3",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00003.png"
);
loadSprite(
  "walk-4",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00004.png"
);
loadSprite(
  "walk-5",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00005.png"
);
loadSprite(
  "walk-6",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00006.png"
);
loadSprite(
  "walk-7",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00007.png"
);
loadSprite(
  "walk-8",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00008.png"
);
loadSprite(
  "walk-9",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00009.png"
);
loadSprite(
  "walk-10",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00010.png"
);
loadSprite(
  "walk-11",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00011.png"
);
loadSprite(
  "walk-12",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00012.png"
);
loadSprite(
  "walk-13",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00013.png"
);
loadSprite(
  "walk-14",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00014.png"
);
loadSprite(
  "walk-15",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00015.png"
);
loadSprite(
  "walk-16",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00016.png"
);
loadSprite(
  "walk-17",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00017.png"
);
loadSprite(
  "walk-18",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00018.png"
);
loadSprite(
  "walk-19",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00019.png"
);
loadSprite(
  "walk-20",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardWalk/Chara_BlueWalk00020.png"
);

loadSprite(
  "jump-0",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00000.png"
);
loadSprite(
  "jump-1",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00001.png"
);
loadSprite(
  "jump-2",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00002.png"
);
loadSprite(
  "jump-3",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00003.png"
);
loadSprite(
  "jump-4",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00004.png"
);
loadSprite(
  "jump-5",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00005.png"
);
loadSprite(
  "jump-6",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00006.png"
);
loadSprite(
  "jump-7",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00007.png"
);
loadSprite(
  "jump-8",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00008.png"
);
loadSprite(
  "jump-9",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00009.png"
);
loadSprite(
  "jump-10",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00010.png"
);
loadSprite(
  "jump-11",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00011.png"
);
loadSprite(
  "jump-12",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00012.png"
);
loadSprite(
  "jump-13",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00013.png"
);
loadSprite(
  "jump-14",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00014.png"
);
loadSprite(
  "jump-15",
  "/Users/natasakaldi/Desktop/Kaboom/music/www/sprites/BlueWizard/2BlueWizardJump/DashEffect/BlueWizardDash_00015.png"
);

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

  const playerAnimations = {
    idle: animation(0.2, "wizard"),
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
    sprite(player.animations.idle),
    solid(),
    pos(30, 0),
    body(),
    big(),
    origin("bot"),
    scale(0.1),
  ]);

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

  keyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
  });

  keyDown("right", () => {
    player.move(MOVE_SPEED, 0);
  });

  keyDown("down", () => {
    // Logic for when the down key is pressed
  });

  keyPress("space", () => {
    if (player.grounded()) {
      isJumping = true;
      player.jump(CURRENT_JUMP_FORCE);
    }
  });

  player.action(() => {
    if (player.grounded()) {
      isJumping = false;
    }
  });

  // ... The rest of the game logic
});

// ... (Your existing code)

// Handle player interactions and actions
keyPress("space", () => {
  if (player.grounded()) {
    isJumping = true;
    player.jump(CURRENT_JUMP_FORCE);
    player.play(playerAnimations.jump); // Change animation to jump when player jumps
  }
});

keyDown("left", () => {
  player.move(-MOVE_SPEED, 0);
  player.play(playerAnimations.run); // Change animation to run when player moves left
});

keyDown("right", () => {
  player.move(MOVE_SPEED, 0);
  player.play(playerAnimations.run); // Change animation to run when player moves right
});

player.action(() => {
  if (player.grounded()) {
    isJumping = false;
    if (!keyIsDown("left") && !keyIsDown("right")) {
      player.play(playerAnimations.idle); // Change animation to idle when player stops moving
    }
  }
});

// ... (Rest of your game logic)

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
  keyPress("A", () => {
    go("game", { level: 0, score: 0 }); // Restart the game with initial level and score
  });
});

start("game", { level: 0, score: 0 });
