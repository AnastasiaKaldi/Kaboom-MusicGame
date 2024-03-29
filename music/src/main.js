import kaboom from "kaboom";

kaboom({
  background: [101, 103, 255],
});

// load assets
loadSprite("bean", "./sprites/bean.png");
loadSprite("bag", "./sprites/bag.png");
loadSprite("ghosty", "./sprites/ghosty.png");
loadSprite("e1", "./sprites/e1.png");
loadSprite("e2", "./sprites/e2.png");
loadSprite("e3", "./sprites/e3.png");
loadSprite("e4", "./sprites/e4.png");
loadSprite("e5", "./sprites/e5.png");
loadSprite("e6", "./sprites/e6.png");
loadSprite("e7", "./sprites/e7.png");
loadSprite("e8", "./sprites/e8.png");
loadSprite("spike", "./sprites/spike.png");
loadSprite("grass", "./sprites/grass.png");
loadSprite("steel", "./sprites/steel.png");
loadSprite("prize", "./sprites/jumpy.png");
loadSprite("apple", "./sprites/apple.png");
loadSprite("portal", "./sprites/portal.png");
loadSprite("coin", "./sprites/coin.png");
loadSprite("purple", "./sprites/purple.png");
loadSprite("blue", "./sprites/blue.png");
loadSprite("brown", "./sprites/brown.png");
loadSprite("navy", "./sprites/navy.png");
loadSprite("white", "./sprites/white.png");
loadSprite("pink", "./sprites/pink.png");
loadSprite("green", "./sprites/green.png");
loadSprite("teal", "./sprites/teal.png");
loadSprite("NC", "./sprites/NC.png");
loadSprite("ND", "./sprites/ND.png");
loadSprite("NE", "./sprites/NE.png");
loadSprite("NF", "./sprites/NF.png");
loadSprite("NG", "./sprites/NG.png");
loadSprite("NA", "./sprites/NA.png");
loadSprite("NB", "./sprites/NB.png");
loadSprite("water", "./sprites/Water.png", {
  sliceX: 8,
  sliceY: 1,
  anims: {
    wave: {
      from: 0,
      to: 7,
      speed: 16,
      loop: true,
    },
  },
});
loadSound("coin", "./sprites/sounds/score.mp3");
loadSound("powerup", "./sprites/sounds/powerup.mp3");
loadSound("blip", "./sprites/sounds/blip.mp3");
loadSound("hit", "./sprites/sounds/hit.mp3");
loadSound("portal", "./sprites/sounds/portal.mp3");

setGravity(3200);

// custom component controlling enemy patrol movement
function patrol(speed = 60, dir = 1) {
  return {
    id: "patrol",
    require: ["pos", "area"],
    add() {
      this.on("collide", (obj, col) => {
        if (col.isLeft() || col.isRight()) {
          dir = -dir;
        }
      });
    },
    update() {
      this.move(speed * dir, 0);
    },
  };
}

// custom component that makes stuff grow big
function big() {
  let timer = 0;
  let isBig = false;
  let destScale = 1;
  return {
    // component id / name
    id: "big",
    // it requires the scale component
    require: ["scale"],
    // this runs every frame
    update() {
      if (isBig) {
        timer -= dt();
        if (timer <= 0) {
          this.smallify();
        }
      }
      this.scale = this.scale.lerp(vec2(destScale), dt() * 6);
    },
    // custom methods
    isBig() {
      return isBig;
    },
    smallify() {
      destScale = 1;
      timer = 0;
      isBig = false;
    },
    biggify(time) {
      destScale = 2;
      timer = time;
      isBig = true;
    },
  };
}

// define some constants
const JUMP_FORCE = 1320;
const MOVE_SPEED = 480;
const FALL_DEATH = 2000;

const LEVELS = [
  [
    "                                            ",
    "                                            ",
    "                                            ",
    "           $$$$                       $     ",
    "       $$                             $     ",
    "  $$    $$ $$$$                       $     ",
    "    $$           p b r n w p g t      $     ",
    " %   $$  $$                           $     ",
    "    =  ^^ >^^^               >        @     ",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
  ],
  [
    "       $$$$                                                        ",
    "       ====       $$                                               ",
    "  $$   $$$$  $$                                    C               ",
    "%                     %                       =                    ",
    " $$ $$  $$      $$                         =                       ",
    "                                        =                         $",
    "                                     =                            $",
    "                                                                   ",
    "^          > ^^^       >    >           ^^^^^          ^^^        @",
    "===================================================================",
    "===================================================================",
    "===================================================================",
    "===================================================================",
    "===================================================================",
  ],

  [
    "$   $   %   $   $   %   $  ",
    "$   $   %   $   $   %   $  ",
    "$   $       $   $       $  ",
    "    %   ==    %    ==     %",
    "==      ==   D   ==     ==",
    "    ==      ==      ==    ",
    "==  @ ==  @ ==  @ ==  @ ==",
    "    ==      ==      ==    ",
    ">^^^>^^^>^^^>^^^>^^^>^^^>^@",
    "=================================================================",
    "=================================================================",
    "=================================================================",
    "=================================================================",
    "=================================================================",
  ],
  [
    "                          ",
    "                                            ",
    "                                            ",
    "           $$$$                       $      ",
    "       $$                             $      ",
    "  $$    $$ $$$$        E               $      ",
    "    $$           p b r n w p g t      $   ",
    " %   $$  $$                           $     ",
    "    =  ^^ >^^^               >        @     ",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
  ],
  [
    "                          ",
    "                                            ",
    "                                            ",
    "           $$$$                       $      ",
    "       $$                             $      ",
    "  $$    $$ $$$$        F               $      ",
    "    $$           p b r n w p g t      $   ",
    " %   $$  $$                           $     ",
    "    =  ^^ >^^^               >        @     ",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
  ],
  [
    "                          ",
    "                                            ",
    "                                            ",
    "           $$$$                       $      ",
    "       $$                             $      ",
    "  $$    $$ $$$$        G               $      ",
    "    $$           p b r n w p g t      $   ",
    " %   $$  $$                           $     ",
    "    =  ^^ >^^^               >        @     ",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
  ],
  [
    "                          ",
    "                                            ",
    "                                            ",
    "           $$$$                       $      ",
    "       $$                             $      ",
    "  $$    $$ $$$$        A               $      ",
    "    $$           p b r n w p g t      $   ",
    " %   $$  $$                           $     ",
    "    =  ^^ >^^^               >        @     ",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
  ],
  [
    "                          ",
    "                                            ",
    "                                            ",
    "           $$$$                       $      ",
    "       $$                             $      ",
    "  $$    $$ $$$$        B               $      ",
    "    $$           p b r n w p g t      $   ",
    " %   $$  $$                           $     ",
    "    =  ^^ >^^^               >        @     ",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
    "============================================",
  ],
];

function drawWaves() {
  console.log("Drawing waves");
  let offset = -100; // Starting X position of the first water sprite
  for (let i = 0; i < 50; i++) {
    add([sprite("water", { anim: "wave" }), pos(offset, 750), scale(4)]);
    offset += 64;
  }
}

const levelConf = {
  tileWidth: 64,
  tileHeight: 64,
  tiles: {
    "=": () => [
      sprite("grass"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "platform",
    ],
    "-": () => [
      sprite("steel"),
      area(),
      body({ isStatic: true }),
      offscreen({ hide: true }),
      anchor("bot"),
    ],
    0: () => [
      sprite("bag"),
      area(),
      body({ isStatic: true }),
      offscreen({ hide: true }),
      anchor("bot"),
    ],
    $: () => [
      sprite("coin"),
      area(),
      pos(0, -9),
      anchor("bot"),
      offscreen({ hide: true }),
      "coin",
    ],
    "%": () => [
      sprite("prize"),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "prize",
    ],
    "^": () => [
      sprite("spike"),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "danger",
    ],
    "#": () => [
      sprite("apple"),
      area(),
      anchor("bot"),
      body(),
      offscreen({ hide: true }),
      "apple",
    ],
    ">": () => [
      sprite("ghosty"),
      scale(2),
      area(),
      anchor("bot"),
      body(),
      patrol(),
      offscreen({ hide: true }),
      "enemy",
    ],
    "@": () => [
      sprite("portal"),
      scale(3),
      area({ scale: 0.5 }),
      anchor("bot"),
      pos(0, -12),
      offscreen({ hide: true }),
      "portal",
    ],
    p: () => [
      sprite("purple"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "purple",
    ],
    b: () => [
      sprite("blue"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "purple",
    ],
    r: () => [
      sprite("brown"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "purple",
    ],
    n: () => [
      sprite("navy"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "purple",
    ],
    w: () => [
      sprite("white"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "purple",
    ],
    i: () => [
      sprite("pink"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "purple",
    ],
    g: () => [
      sprite("green"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "purple",
    ],
    t: () => [
      sprite("teal"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "purple",
    ],
    C: () => [
      sprite("NC"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "collectable",
    ],
    D: () => [
      sprite("ND"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "collectable",
    ],
    E: () => [
      sprite("NE"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "collectable",
    ],
    F: () => [
      sprite("NF"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "collectable",
    ],
    G: () => [
      sprite("NG"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "collectable",
    ],
    A: () => [
      sprite("NA"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "collectable",
    ],
    B: () => [
      sprite("NB"),
      scale(1.6),
      area(),
      body({ isStatic: true }),
      anchor("bot"),
      offscreen({ hide: true }),
      "collectable",
    ],
  },
};

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
  // add level to scene
  const level = addLevel(LEVELS[levelId ?? 1], levelConf);

  // define player object
  const player = add([
    sprite("bean"),
    pos(30, 0),
    area(),
    scale(0.5),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    big(),
    anchor("bot"),
  ]);

  drawWaves();

  const waterLevelY = 900; // Y position where the top of the water starts
  const screenHeight = height(); // The height of the game screen
  const cameraOffsetY = waterLevelY - screenHeight / 2;

  camPos(vec2(width() / 2, cameraOffsetY));

  // Then during the update, you might want to fix the camera on the x-axis only
  player.onUpdate(() => {
    // Fix the camera to the center of the screen on the x-axis only
    camPos(vec2(player.pos.x, cameraOffsetY));
    if (player.pos.y >= FALL_DEATH) {
      go("lose");
    }
  });

  player.onBeforePhysicsResolve((collision) => {
    if (collision.target.is(["platform", "soft"]) && player.isJumping()) {
      collision.preventResolution();
    }
  });

  player.onPhysicsResolve(() => {
    // Set the viewport center to player.pos
    // camPos(player.pos);
  });

  // if player onCollide with any obj with "danger" tag, lose
  player.onCollide("danger", () => {
    go("lose");
    play("hit");
  });

  player.onCollide("portal", () => {
    play("portal");
    if (levelId + 1 < LEVELS.length) {
      go("game", {
        levelId: levelId + 1,
        coins: coins,
      });
    } else {
      go("win");
    }
  });

  let hasApple = false;

  // grow an apple if player's head bumps into an obj with "prize" tag
  player.onHeadbutt((obj) => {
    if (obj.is("prize") && !hasApple) {
      const apple = level.spawn("#", obj.tilePos.sub(0, 1));
      apple.jump();
      hasApple = true;
      play("blip");
    }
  });

  player.onHeadbutt((obj) => {
    if (obj.is("purple")) {
      // Check if the object collided with has the "purple" tag
      play("blip"); // Play the headbutt sound specifically for the purple block
    }
  });

  // player grows big onCollide with an "apple" obj
  player.onCollide("apple", (a) => {
    destroy(a);
    // as we defined in the big() component
    player.biggify(3);
    hasApple = false;
    play("powerup");
  });

  let coinPitch = 0;

  onUpdate(() => {
    if (coinPitch > 0) {
      coinPitch = Math.max(0, coinPitch - dt() * 100);
    }
  });

  player.onCollide("coin", (c) => {
    destroy(c);
    play("coin", {
      detune: coinPitch,
    });
    coinPitch += 100;
    coins += 1;
    coinsLabel.text = "coins: " + coins;
  });

  let collectables = 0;

  player.onCollide("collectable", (c) => {
    destroy(c);
    collectables += 1;
    collectablesLabel.text = "collectables: " + collectables;
    play("blip");
  });

  player.onGround((l) => {
    if (l.is("enemy")) {
      player.jump(JUMP_FORCE * 1.5);
      destroy(l);
      addKaboom(player.pos);
      play("powerup");
    }
  });

  player.onCollide("enemy", (e, col) => {
    // if it's not from the top, die
    if (!col.isBottom()) {
      go("lose");
      play("hit");
    }
  });

  const coinsLabel = add([text("coins: ", +coins), pos(24, 24), fixed()]);
  const collectablesLabel = add([
    text("collectables: ", +collectables),
    pos(300, 24),
    fixed(),
  ]);

  function jump() {
    // these 2 functions are provided by body() component
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
    }
  }

  // jump with space
  onKeyPress("space", jump);

  onKeyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
  });

  onKeyDown("right", () => {
    player.move(MOVE_SPEED, 0);
  });

  onKeyPress("down", () => {
    player.weight = 3;
  });

  onKeyRelease("down", () => {
    player.weight = 1;
  });

  onGamepadButtonPress("south", jump);

  onGamepadStick("left", (v) => {
    player.move(v.x * MOVE_SPEED, 0);
  });

  onKeyPress("f", () => {
    setFullscreen(!isFullscreen());
  });
});

scene("lose", () => {
  add([text("You Lose")]);
  onKeyPress(() => go("game"));
});

scene("win", () => {
  add([text("You Win")]);
  onKeyPress(() => go("game"));
});

go("game");
