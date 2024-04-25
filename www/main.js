(() => {
  var yr = Object.defineProperty,
    a = (n, t) => yr(n, "name", { value: t, configurable: !0 }),
    Vr = (() => {
      for (var n = new Uint8Array(128), t = 0; t < 64; t++)
        n[t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t * 4 - 205] = t;
      return (c) => {
        for (
          var m = c.length,
            y = new Uint8Array(
              (((m - (c[m - 1] == "=") - (c[m - 2] == "=")) * 3) / 4) | 0
            ),
            N = 0,
            X = 0;
          N < m;

        ) {
          var k = n[c.charCodeAt(N++)],
            q = n[c.charCodeAt(N++)],
            J = n[c.charCodeAt(N++)],
            ee = n[c.charCodeAt(N++)];
          (y[X++] = (k << 2) | (q >> 4)),
            (y[X++] = (q << 4) | (J >> 2)),
            (y[X++] = (J << 6) | ee);
        }
        return y;
      };
    })();
  function Be(n) {
    return (n * Math.PI) / 180;
  }
  a(Be, "deg2rad");
  function yt(n) {
    return (n * 180) / Math.PI;
  }
  a(yt, "rad2deg");
  function ke(n, t, c) {
    return t > c ? ke(n, c, t) : Math.min(Math.max(n, t), c);
  }
  a(ke, "clamp");
  function Te(n, t, c) {
    if (typeof n == "number" && typeof t == "number") return n + (t - n) * c;
    if (
      (n instanceof x && t instanceof x) ||
      (n instanceof _ && t instanceof _)
    )
      return n.lerp(t, c);
    throw new Error(
      `Bad value for lerp(): ${n}, ${t}. Only number, Vec2 and Color is supported.`
    );
  }
  a(Te, "lerp");
  function gi(n, t, c, m, y) {
    return m + ((n - t) / (c - t)) * (y - m);
  }
  a(gi, "map");
  function Gs(n, t, c, m, y) {
    return ke(gi(n, t, c, m, y), m, y);
  }
  a(Gs, "mapc");
  var x = class we {
    static {
      a(this, "Vec2");
    }
    x = 0;
    y = 0;
    constructor(t = 0, c = t) {
      (this.x = t), (this.y = c);
    }
    static fromAngle(t) {
      let c = Be(t);
      return new we(Math.cos(c), Math.sin(c));
    }
    static LEFT = new we(-1, 0);
    static RIGHT = new we(1, 0);
    static UP = new we(0, -1);
    static DOWN = new we(0, 1);
    clone() {
      return new we(this.x, this.y);
    }
    add(...t) {
      let c = R(...t);
      return new we(this.x + c.x, this.y + c.y);
    }
    sub(...t) {
      let c = R(...t);
      return new we(this.x - c.x, this.y - c.y);
    }
    scale(...t) {
      let c = R(...t);
      return new we(this.x * c.x, this.y * c.y);
    }
    dist(...t) {
      let c = R(...t);
      return this.sub(c).len();
    }
    sdist(...t) {
      let c = R(...t);
      return this.sub(c).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let t = this.len();
      return t === 0 ? new we(0) : this.scale(1 / t);
    }
    normal() {
      return new we(this.y, -this.x);
    }
    reflect(t) {
      return this.sub(t.scale(2 * this.dot(t)));
    }
    project(t) {
      return t.scale(t.dot(this) / t.len());
    }
    reject(t) {
      return this.sub(this.project(t));
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    angle(...t) {
      let c = R(...t);
      return yt(Math.atan2(this.y - c.y, this.x - c.x));
    }
    angleBetween(...t) {
      let c = R(...t);
      return yt(Math.atan2(this.cross(c), this.dot(c)));
    }
    lerp(t, c) {
      return new we(Te(this.x, t.x, c), Te(this.y, t.y, c));
    }
    slerp(t, c) {
      let m = this.dot(t),
        y = this.cross(t),
        N = Math.atan2(y, m);
      return this.scale(Math.sin((1 - c) * N))
        .add(t.scale(Math.sin(c * N)))
        .scale(1 / y);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(t) {
      return new we(Number(this.x.toFixed(t)), Number(this.y.toFixed(t)));
    }
    transform(t) {
      return t.multVec2(this);
    }
    eq(t) {
      return this.x === t.x && this.y === t.y;
    }
    bbox() {
      return new me(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
  };
  function R(...n) {
    if (n.length === 1) {
      if (n[0] instanceof x) return new x(n[0].x, n[0].y);
      if (Array.isArray(n[0]) && n[0].length === 2) return new x(...n[0]);
    }
    return new x(...n);
  }
  a(R, "vec2");
  var _ = class le {
    static {
      a(this, "Color");
    }
    r = 255;
    g = 255;
    b = 255;
    constructor(t, c, m) {
      (this.r = ke(t, 0, 255)),
        (this.g = ke(c, 0, 255)),
        (this.b = ke(m, 0, 255));
    }
    static fromArray(t) {
      return new le(t[0], t[1], t[2]);
    }
    static fromHex(t) {
      if (typeof t == "number")
        return new le((t >> 16) & 255, (t >> 8) & 255, (t >> 0) & 255);
      if (typeof t == "string") {
        let c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return new le(
          parseInt(c[1], 16),
          parseInt(c[2], 16),
          parseInt(c[3], 16)
        );
      } else throw new Error("Invalid hex color format");
    }
    static fromHSL(t, c, m) {
      if (c == 0) return new le(255 * m, 255 * m, 255 * m);
      let y = a(
          (ee, E, W) => (
            W < 0 && (W += 1),
            W > 1 && (W -= 1),
            W < 1 / 6
              ? ee + (E - ee) * 6 * W
              : W < 1 / 2
              ? E
              : W < 2 / 3
              ? ee + (E - ee) * (2 / 3 - W) * 6
              : ee
          ),
          "hue2rgb"
        ),
        N = m < 0.5 ? m * (1 + c) : m + c - m * c,
        X = 2 * m - N,
        k = y(X, N, t + 1 / 3),
        q = y(X, N, t),
        J = y(X, N, t - 1 / 3);
      return new le(
        Math.round(k * 255),
        Math.round(q * 255),
        Math.round(J * 255)
      );
    }
    static RED = new le(255, 0, 0);
    static GREEN = new le(0, 255, 0);
    static BLUE = new le(0, 0, 255);
    static YELLOW = new le(255, 255, 0);
    static MAGENTA = new le(255, 0, 255);
    static CYAN = new le(0, 255, 255);
    static WHITE = new le(255, 255, 255);
    static BLACK = new le(0, 0, 0);
    clone() {
      return new le(this.r, this.g, this.b);
    }
    lighten(t) {
      return new le(this.r + t, this.g + t, this.b + t);
    }
    darken(t) {
      return this.lighten(-t);
    }
    invert() {
      return new le(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(t) {
      return new le(
        (this.r * t.r) / 255,
        (this.g * t.g) / 255,
        (this.b * t.b) / 255
      );
    }
    lerp(t, c) {
      return new le(Te(this.r, t.r, c), Te(this.g, t.g, c), Te(this.b, t.b, c));
    }
    eq(t) {
      return this.r === t.r && this.g === t.g && this.b === t.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return (
        "#" +
        ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
          .toString(16)
          .slice(1)
      );
    }
  };
  function $(...n) {
    if (n.length === 0) return new _(255, 255, 255);
    if (n.length === 1) {
      if (n[0] instanceof _) return n[0].clone();
      if (typeof n[0] == "string") return _.fromHex(n[0]);
      if (Array.isArray(n[0]) && n[0].length === 3) return _.fromArray(n[0]);
    }
    return new _(...n);
  }
  a($, "rgb");
  var vr = a((n, t, c) => _.fromHSL(n, t, c), "hsl2rgb"),
    ce = class Wi {
      static {
        a(this, "Quad");
      }
      x = 0;
      y = 0;
      w = 1;
      h = 1;
      constructor(t, c, m, y) {
        (this.x = t), (this.y = c), (this.w = m), (this.h = y);
      }
      scale(t) {
        return new Wi(
          this.x + this.w * t.x,
          this.y + this.h * t.y,
          this.w * t.w,
          this.h * t.h
        );
      }
      pos() {
        return new x(this.x, this.y);
      }
      clone() {
        return new Wi(this.x, this.y, this.w, this.h);
      }
      eq(t) {
        return (
          this.x === t.x && this.y === t.y && this.w === t.w && this.h === t.h
        );
      }
      toString() {
        return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
      }
    };
  function oe(n, t, c, m) {
    return new ce(n, t, c, m);
  }
  a(oe, "quad");
  var Me = class Ie {
    static {
      a(this, "Mat4");
    }
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(t) {
      t && (this.m = t);
    }
    static translate(t) {
      return new Ie([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, 0, 1]);
    }
    static scale(t) {
      return new Ie([t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(t) {
      t = Be(-t);
      let c = Math.cos(t),
        m = Math.sin(t);
      return new Ie([1, 0, 0, 0, 0, c, -m, 0, 0, m, c, 0, 0, 0, 0, 1]);
    }
    static rotateY(t) {
      t = Be(-t);
      let c = Math.cos(t),
        m = Math.sin(t);
      return new Ie([c, 0, m, 0, 0, 1, 0, 0, -m, 0, c, 0, 0, 0, 0, 1]);
    }
    static rotateZ(t) {
      t = Be(-t);
      let c = Math.cos(t),
        m = Math.sin(t);
      return new Ie([c, -m, 0, 0, m, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(t) {
      return (
        (this.m[12] += this.m[0] * t.x + this.m[4] * t.y),
        (this.m[13] += this.m[1] * t.x + this.m[5] * t.y),
        (this.m[14] += this.m[2] * t.x + this.m[6] * t.y),
        (this.m[15] += this.m[3] * t.x + this.m[7] * t.y),
        this
      );
    }
    scale(t) {
      return (
        (this.m[0] *= t.x),
        (this.m[4] *= t.y),
        (this.m[1] *= t.x),
        (this.m[5] *= t.y),
        (this.m[2] *= t.x),
        (this.m[6] *= t.y),
        (this.m[3] *= t.x),
        (this.m[7] *= t.y),
        this
      );
    }
    rotate(t) {
      t = Be(-t);
      let c = Math.cos(t),
        m = Math.sin(t),
        y = this.m[0],
        N = this.m[1],
        X = this.m[4],
        k = this.m[5];
      return (
        (this.m[0] = y * c + N * m),
        (this.m[1] = -y * m + N * c),
        (this.m[4] = X * c + k * m),
        (this.m[5] = -X * m + k * c),
        this
      );
    }
    mult(t) {
      let c = [];
      for (let m = 0; m < 4; m++)
        for (let y = 0; y < 4; y++)
          c[m * 4 + y] =
            this.m[0 * 4 + y] * t.m[m * 4 + 0] +
            this.m[1 * 4 + y] * t.m[m * 4 + 1] +
            this.m[2 * 4 + y] * t.m[m * 4 + 2] +
            this.m[3 * 4 + y] * t.m[m * 4 + 3];
      return new Ie(c);
    }
    multVec2(t) {
      return new x(
        t.x * this.m[0] + t.y * this.m[4] + this.m[12],
        t.x * this.m[1] + t.y * this.m[5] + this.m[13]
      );
    }
    getTranslation() {
      return new x(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = this.m[0] * this.m[5] - this.m[1] * this.m[4],
          c = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new x(c, t / c);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = this.m[0] * this.m[5] - this.m[1] * this.m[4],
          c = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new x(t / c, c);
      } else return new x(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return yt(
          this.m[1] > 0 ? Math.acos(this.m[0] / t) : -Math.acos(this.m[0] / t)
        );
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return yt(
          Math.PI / 2 -
            (this.m[5] > 0
              ? Math.acos(-this.m[4] / t)
              : -Math.acos(this.m[4] / t))
        );
      } else return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new x(
          Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t),
          0
        );
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new x(
          0,
          Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t)
        );
      } else return new x(0, 0);
    }
    invert() {
      let t = [],
        c = this.m[10] * this.m[15] - this.m[14] * this.m[11],
        m = this.m[9] * this.m[15] - this.m[13] * this.m[11],
        y = this.m[9] * this.m[14] - this.m[13] * this.m[10],
        N = this.m[8] * this.m[15] - this.m[12] * this.m[11],
        X = this.m[8] * this.m[14] - this.m[12] * this.m[10],
        k = this.m[8] * this.m[13] - this.m[12] * this.m[9],
        q = this.m[6] * this.m[15] - this.m[14] * this.m[7],
        J = this.m[5] * this.m[15] - this.m[13] * this.m[7],
        ee = this.m[5] * this.m[14] - this.m[13] * this.m[6],
        E = this.m[4] * this.m[15] - this.m[12] * this.m[7],
        W = this.m[4] * this.m[14] - this.m[12] * this.m[6],
        h = this.m[5] * this.m[15] - this.m[13] * this.m[7],
        H = this.m[4] * this.m[13] - this.m[12] * this.m[5],
        T = this.m[6] * this.m[11] - this.m[10] * this.m[7],
        Ke = this.m[5] * this.m[11] - this.m[9] * this.m[7],
        Fe = this.m[5] * this.m[10] - this.m[9] * this.m[6],
        A = this.m[4] * this.m[11] - this.m[8] * this.m[7],
        ae = this.m[4] * this.m[10] - this.m[8] * this.m[6],
        pe = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      (t[0] = this.m[5] * c - this.m[6] * m + this.m[7] * y),
        (t[4] = -(this.m[4] * c - this.m[6] * N + this.m[7] * X)),
        (t[8] = this.m[4] * m - this.m[5] * N + this.m[7] * k),
        (t[12] = -(this.m[4] * y - this.m[5] * X + this.m[6] * k)),
        (t[1] = -(this.m[1] * c - this.m[2] * m + this.m[3] * y)),
        (t[5] = this.m[0] * c - this.m[2] * N + this.m[3] * X),
        (t[9] = -(this.m[0] * m - this.m[1] * N + this.m[3] * k)),
        (t[13] = this.m[0] * y - this.m[1] * X + this.m[2] * k),
        (t[2] = this.m[1] * q - this.m[2] * J + this.m[3] * ee),
        (t[6] = -(this.m[0] * q - this.m[2] * E + this.m[3] * W)),
        (t[10] = this.m[0] * h - this.m[1] * E + this.m[3] * H),
        (t[14] = -(this.m[0] * ee - this.m[1] * W + this.m[2] * H)),
        (t[3] = -(this.m[1] * T - this.m[2] * Ke + this.m[3] * Fe)),
        (t[7] = this.m[0] * T - this.m[2] * A + this.m[3] * ae),
        (t[11] = -(this.m[0] * Ke - this.m[1] * A + this.m[3] * pe)),
        (t[15] = this.m[0] * Fe - this.m[1] * ae + this.m[2] * pe);
      let te =
        this.m[0] * t[0] +
        this.m[1] * t[4] +
        this.m[2] * t[8] +
        this.m[3] * t[12];
      for (let ne = 0; ne < 4; ne++)
        for (let Ae = 0; Ae < 4; Ae++) t[ne * 4 + Ae] *= 1 / te;
      return new Ie(t);
    }
    clone() {
      return new Ie([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
  function Zi(n, t, c, m = (y) => -Math.cos(y)) {
    return n + ((m(c) + 1) / 2) * (t - n);
  }
  a(Zi, "wave");
  var xr = 1103515245,
    Er = 12345,
    vs = 2147483648,
    Os = class {
      static {
        a(this, "RNG");
      }
      seed;
      constructor(n) {
        this.seed = n;
      }
      gen() {
        return (this.seed = (xr * this.seed + Er) % vs), this.seed / vs;
      }
      genNumber(n, t) {
        return n + this.gen() * (t - n);
      }
      genVec2(n, t) {
        return new x(this.genNumber(n.x, t.x), this.genNumber(n.y, t.y));
      }
      genColor(n, t) {
        return new _(
          this.genNumber(n.r, t.r),
          this.genNumber(n.g, t.g),
          this.genNumber(n.b, t.b)
        );
      }
      genAny(...n) {
        if (n.length === 0) return this.gen();
        if (n.length === 1) {
          if (typeof n[0] == "number") return this.genNumber(0, n[0]);
          if (n[0] instanceof x) return this.genVec2(R(0, 0), n[0]);
          if (n[0] instanceof _) return this.genColor($(0, 0, 0), n[0]);
        } else if (n.length === 2) {
          if (typeof n[0] == "number" && typeof n[1] == "number")
            return this.genNumber(n[0], n[1]);
          if (n[0] instanceof x && n[1] instanceof x)
            return this.genVec2(n[0], n[1]);
          if (n[0] instanceof _ && n[1] instanceof _)
            return this.genColor(n[0], n[1]);
        }
      }
    },
    $i = new Os(Date.now());
  function qs(n) {
    return n != null && ($i.seed = n), $i.seed;
  }
  a(qs, "randSeed");
  function Jt(...n) {
    return $i.genAny(...n);
  }
  a(Jt, "rand");
  function rn(...n) {
    return Math.floor(Jt(...n));
  }
  a(rn, "randi");
  function Ks(n) {
    return Jt() <= n;
  }
  a(Ks, "chance");
  function Hs(n) {
    return n[rn(n.length)];
  }
  a(Hs, "choose");
  function Ys(n, t) {
    return (
      n.pos.x + n.width > t.pos.x &&
      n.pos.x < t.pos.x + t.width &&
      n.pos.y + n.height > t.pos.y &&
      n.pos.y < t.pos.y + t.height
    );
  }
  a(Ys, "testRectRect");
  function js(n, t) {
    if (
      (n.p1.x === n.p2.x && n.p1.y === n.p2.y) ||
      (t.p1.x === t.p2.x && t.p1.y === t.p2.y)
    )
      return null;
    let c =
      (t.p2.y - t.p1.y) * (n.p2.x - n.p1.x) -
      (t.p2.x - t.p1.x) * (n.p2.y - n.p1.y);
    if (c === 0) return null;
    let m =
        ((t.p2.x - t.p1.x) * (n.p1.y - t.p1.y) -
          (t.p2.y - t.p1.y) * (n.p1.x - t.p1.x)) /
        c,
      y =
        ((n.p2.x - n.p1.x) * (n.p1.y - t.p1.y) -
          (n.p2.y - n.p1.y) * (n.p1.x - t.p1.x)) /
        c;
    return m < 0 || m > 1 || y < 0 || y > 1 ? null : m;
  }
  a(js, "testLineLineT");
  function wt(n, t) {
    let c = js(n, t);
    return c
      ? R(n.p1.x + c * (n.p2.x - n.p1.x), n.p1.y + c * (n.p2.y - n.p1.y))
      : null;
  }
  a(wt, "testLineLine");
  function Qs(n, t) {
    if (Wt(n, t.p1) || Wt(n, t.p2)) return !0;
    let c = n.points();
    return (
      !!wt(t, new At(c[0], c[1])) ||
      !!wt(t, new At(c[1], c[2])) ||
      !!wt(t, new At(c[2], c[3])) ||
      !!wt(t, new At(c[3], c[0]))
    );
  }
  a(Qs, "testRectLine");
  function Wt(n, t) {
    return (
      t.x > n.pos.x &&
      t.x < n.pos.x + n.width &&
      t.y > n.pos.y &&
      t.y < n.pos.y + n.height
    );
  }
  a(Wt, "testRectPoint");
  function zs(n, t) {
    let c = t.sub(n.p1),
      m = n.p2.sub(n.p1);
    if (Math.abs(c.cross(m)) > Number.EPSILON) return !1;
    let y = c.dot(m) / m.dot(m);
    return y >= 0 && y <= 1;
  }
  a(zs, "testLinePoint");
  function on(n, t) {
    let c = n.p2.sub(n.p1),
      m = c.dot(c),
      y = n.p1.sub(t.center),
      N = 2 * c.dot(y),
      X = y.dot(y) - t.radius * t.radius,
      k = N * N - 4 * m * X;
    if (m <= Number.EPSILON || k < 0) return !1;
    if (k == 0) {
      let q = -N / (2 * m);
      if (q >= 0 && q <= 1) return !0;
    } else {
      let q = (-N + Math.sqrt(k)) / (2 * m),
        J = (-N - Math.sqrt(k)) / (2 * m);
      if ((q >= 0 && q <= 1) || (J >= 0 && J <= 1)) return !0;
    }
    return an(t, n.p1);
  }
  a(on, "testLineCircle");
  function an(n, t) {
    return n.center.sdist(t) < n.radius * n.radius;
  }
  a(an, "testCirclePoint");
  function Xs(n, t) {
    let c = t.pts[t.pts.length - 1];
    for (let m of t.pts) {
      if (on(new At(c, m), n)) return !0;
      c = m;
    }
    return an(n, t.pts[0]) ? !0 : ln(t, n.center);
  }
  a(Xs, "testCirclePolygon");
  function ln(n, t) {
    let c = !1,
      m = n.pts;
    for (let y = 0, N = m.length - 1; y < m.length; N = y++)
      m[y].y > t.y != m[N].y > t.y &&
        t.x <
          ((m[N].x - m[y].x) * (t.y - m[y].y)) / (m[N].y - m[y].y) + m[y].x &&
        (c = !c);
    return c;
  }
  a(ln, "testPolygonPoint");
  var At = class _i {
      static {
        a(this, "Line");
      }
      p1;
      p2;
      constructor(t, c) {
        (this.p1 = t.clone()), (this.p2 = c.clone());
      }
      transform(t) {
        return new _i(t.multVec2(this.p1), t.multVec2(this.p2));
      }
      bbox() {
        return me.fromPoints(this.p1, this.p2);
      }
      area() {
        return this.p1.dist(this.p2);
      }
      clone() {
        return new _i(this.p1, this.p2);
      }
    },
    me = class en {
      static {
        a(this, "Rect");
      }
      pos;
      width;
      height;
      constructor(t, c, m) {
        (this.pos = t.clone()), (this.width = c), (this.height = m);
      }
      static fromPoints(t, c) {
        return new en(t.clone(), c.x - t.x, c.y - t.y);
      }
      center() {
        return new x(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
      }
      points() {
        return [
          this.pos,
          this.pos.add(this.width, 0),
          this.pos.add(this.width, this.height),
          this.pos.add(0, this.height),
        ];
      }
      transform(t) {
        return new di(this.points().map((c) => t.multVec2(c)));
      }
      bbox() {
        return this.clone();
      }
      area() {
        return this.width * this.height;
      }
      clone() {
        return new en(this.pos.clone(), this.width, this.height);
      }
      distToPoint(t) {
        return Math.sqrt(this.sdistToPoint(t));
      }
      sdistToPoint(t) {
        let c = this.pos,
          m = this.pos.add(this.width, this.height),
          y = Math.max(c.x - t.x, 0, t.x - m.x),
          N = Math.max(c.y - t.y, 0, t.y - m.y);
        return y * y + N * N;
      }
    },
    xs = class Js {
      static {
        a(this, "Circle");
      }
      center;
      radius;
      constructor(t, c) {
        (this.center = t.clone()), (this.radius = c);
      }
      transform(t) {
        return new Sr(this.center, this.radius, this.radius).transform(t);
      }
      bbox() {
        return me.fromPoints(
          this.center.sub(R(this.radius)),
          this.center.add(R(this.radius))
        );
      }
      area() {
        return this.radius * this.radius * Math.PI;
      }
      clone() {
        return new Js(this.center, this.radius);
      }
    },
    Sr = class tn {
      static {
        a(this, "Ellipse");
      }
      center;
      radiusX;
      radiusY;
      constructor(t, c, m) {
        (this.center = t.clone()), (this.radiusX = c), (this.radiusY = m);
      }
      transform(t) {
        return new tn(
          t.multVec2(this.center),
          t.m[0] * this.radiusX,
          t.m[5] * this.radiusY
        );
      }
      bbox() {
        return me.fromPoints(
          this.center.sub(R(this.radiusX, this.radiusY)),
          this.center.add(R(this.radiusX, this.radiusY))
        );
      }
      area() {
        return this.radiusX * this.radiusY * Math.PI;
      }
      clone() {
        return new tn(this.center, this.radiusX, this.radiusY);
      }
    },
    di = class nn {
      static {
        a(this, "Polygon");
      }
      pts;
      constructor(t) {
        if (t.length < 3)
          throw new Error("Polygons should have at least 3 vertices");
        this.pts = t;
      }
      transform(t) {
        return new nn(this.pts.map((c) => t.multVec2(c)));
      }
      bbox() {
        let t = R(Number.MAX_VALUE),
          c = R(-Number.MAX_VALUE);
        for (let m of this.pts)
          (t.x = Math.min(t.x, m.x)),
            (c.x = Math.max(c.x, m.x)),
            (t.y = Math.min(t.y, m.y)),
            (c.y = Math.max(c.y, m.y));
        return me.fromPoints(t, c);
      }
      area() {
        let t = 0,
          c = this.pts.length;
        for (let m = 0; m < c; m++) {
          let y = this.pts[m],
            N = this.pts[(m + 1) % c];
          (t += y.x * N.y * 0.5), (t -= N.x * y.y * 0.5);
        }
        return Math.abs(t);
      }
      clone() {
        return new nn(this.pts.map((t) => t.clone()));
      }
    };
  function Ws(n, t) {
    let c = Number.MAX_VALUE,
      m = R(0);
    for (let y of [n, t])
      for (let N = 0; N < y.pts.length; N++) {
        let X = y.pts[N],
          k = y.pts[(N + 1) % y.pts.length].sub(X).normal().unit(),
          q = Number.MAX_VALUE,
          J = -Number.MAX_VALUE;
        for (let h = 0; h < n.pts.length; h++) {
          let H = n.pts[h].dot(k);
          (q = Math.min(q, H)), (J = Math.max(J, H));
        }
        let ee = Number.MAX_VALUE,
          E = -Number.MAX_VALUE;
        for (let h = 0; h < t.pts.length; h++) {
          let H = t.pts[h].dot(k);
          (ee = Math.min(ee, H)), (E = Math.max(E, H));
        }
        let W = Math.min(J, E) - Math.max(q, ee);
        if (W < 0) return null;
        if (W < Math.abs(c)) {
          let h = E - q,
            H = ee - J;
          (c = Math.abs(h) < Math.abs(H) ? h : H), (m = k.scale(c));
        }
      }
    return m;
  }
  a(Ws, "sat");
  var Zs = class extends Map {
      static {
        a(this, "IDList");
      }
      lastID;
      constructor(...n) {
        super(...n), (this.lastID = 0);
      }
      push(n) {
        let t = this.lastID;
        return this.set(t, n), this.lastID++, t;
      }
      pushd(n) {
        let t = this.push(n);
        return () => this.delete(t);
      }
    },
    mt = class $s {
      static {
        a(this, "EventController");
      }
      paused = !1;
      cancel;
      constructor(t) {
        this.cancel = t;
      }
      static join(t) {
        let c = new $s(() => t.forEach((m) => m.cancel()));
        return (
          Object.defineProperty(c, "paused", {
            get: () => t[0].paused,
            set: (m) => t.forEach((y) => (y.paused = m)),
          }),
          (c.paused = !1),
          c
        );
      }
    },
    be = class {
      static {
        a(this, "Event");
      }
      handlers = new Zs();
      add(n) {
        let t = this.handlers.pushd((...m) => {
            c.paused || n(...m);
          }),
          c = new mt(t);
        return c;
      }
      addOnce(n) {
        let t = this.add((...c) => {
          t.cancel(), n(...c);
        });
        return t;
      }
      next() {
        return new Promise((n) => this.addOnce(n));
      }
      trigger(...n) {
        this.handlers.forEach((t) => t(...n));
      }
      numListeners() {
        return this.handlers.size;
      }
      clear() {
        this.handlers.clear();
      }
    },
    Xt = class {
      static {
        a(this, "EventHandler");
      }
      handlers = {};
      on(n, t) {
        return (
          this.handlers[n] || (this.handlers[n] = new be()),
          this.handlers[n].add(t)
        );
      }
      onOnce(n, t) {
        let c = this.on(n, (...m) => {
          c.cancel(), t(...m);
        });
        return c;
      }
      next(n) {
        return new Promise((t) => {
          this.onOnce(n, (...c) => t(c[0]));
        });
      }
      trigger(n, ...t) {
        this.handlers[n] && this.handlers[n].trigger(...t);
      }
      remove(n) {
        delete this.handlers[n];
      }
      clear() {
        this.handlers = {};
      }
      numListeners(n) {
        return this.handlers[n]?.numListeners() ?? 0;
      }
    };
  function hn(n, t) {
    let c = typeof n,
      m = typeof t;
    if (c !== m) return !1;
    if (c === "object" && m === "object" && n !== null && t !== null) {
      let y = Object.keys(n),
        N = Object.keys(t);
      if (y.length !== N.length) return !1;
      for (let X of y) {
        let k = n[X],
          q = t[X];
        if (!(typeof k == "function" && typeof q == "function") && !hn(k, q))
          return !1;
      }
      return !0;
    }
    return n === t;
  }
  a(hn, "deepEq");
  function _s(n) {
    let t = window.atob(n),
      c = t.length,
      m = new Uint8Array(c);
    for (let y = 0; y < c; y++) m[y] = t.charCodeAt(y);
    return m.buffer;
  }
  a(_s, "base64ToArrayBuffer");
  function er(n) {
    return _s(n.split(",")[1]);
  }
  a(er, "dataURLToArrayBuffer");
  function mi(n, t) {
    let c = document.createElement("a");
    (c.href = t), (c.download = n), c.click();
  }
  a(mi, "download");
  function un(n, t) {
    mi(n, "data:text/plain;charset=utf-8," + t);
  }
  a(un, "downloadText");
  function tr(n, t) {
    un(n, JSON.stringify(t));
  }
  a(tr, "downloadJSON");
  function sn(n, t) {
    let c = URL.createObjectURL(t);
    mi(n, c), URL.revokeObjectURL(c);
  }
  a(sn, "downloadBlob");
  var Es = a((n) => n.match(/^data:\w+\/\w+;base64,.+/), "isDataURL"),
    br = a((n) => n.split(".").pop(), "getExt"),
    Rr = (() => {
      let n = 0;
      return () => n++;
    })(),
    Mr = class {
      static {
        a(this, "BinaryHeap");
      }
      _items;
      _compareFn;
      constructor(n = (t, c) => t < c) {
        (this._compareFn = n), (this._items = []);
      }
      insert(n) {
        this._items.push(n), this.moveUp(this._items.length - 1);
      }
      remove() {
        if (this._items.length === 0) return null;
        let n = this._items[0],
          t = this._items.pop();
        return (
          this._items.length !== 0 && ((this._items[0] = t), this.moveDown(0)),
          n
        );
      }
      clear() {
        this._items.splice(0, this._items.length);
      }
      moveUp(n) {
        for (; n > 0; ) {
          let t = Math.floor((n - 1) / 2);
          if (
            !this._compareFn(this._items[n], this._items[t]) &&
            this._items[n] >= this._items[t]
          )
            break;
          this.swap(n, t), (n = t);
        }
      }
      moveDown(n) {
        for (; n < Math.floor(this._items.length / 2); ) {
          let t = 2 * n + 1;
          if (
            (t < this._items.length - 1 &&
              !this._compareFn(this._items[t], this._items[t + 1]) &&
              ++t,
            this._compareFn(this._items[n], this._items[t]))
          )
            break;
          this.swap(n, t), (n = t);
        }
      }
      swap(n, t) {
        [this._items[n], this._items[t]] = [this._items[t], this._items[n]];
      }
      get length() {
        return this._items.length;
      }
    },
    Ss = {
      "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          6: "ltrigger",
          7: "rtrigger",
          8: "select",
          9: "start",
          10: "lstick",
          11: "rstick",
          12: "dpad-up",
          13: "dpad-down",
          14: "dpad-left",
          15: "dpad-right",
          16: "home",
          17: "capture",
        },
        sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
      },
      "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          9: "select",
          10: "lstick",
          16: "start",
        },
        sticks: { left: { x: 0, y: 1 } },
      },
      "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          9: "start",
          10: "lstick",
          16: "select",
        },
        sticks: { left: { x: 0, y: 1 } },
      },
      "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          6: "ltrigger",
          7: "rtrigger",
          8: "select",
          9: "start",
          10: "lstick",
          11: "rstick",
          12: "dpad-up",
          13: "dpad-down",
          14: "dpad-left",
          15: "dpad-right",
          16: "home",
          17: "capture",
        },
        sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
      },
      default: {
        buttons: {
          0: "south",
          1: "east",
          2: "west",
          3: "north",
          4: "lshoulder",
          5: "rshoulder",
          6: "ltrigger",
          7: "rtrigger",
          8: "select",
          9: "start",
          10: "lstick",
          11: "rstick",
          12: "dpad-up",
          13: "dpad-down",
          14: "dpad-left",
          15: "dpad-right",
          16: "home",
        },
        sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
      },
    },
    ci = class {
      static {
        a(this, "ButtonState");
      }
      pressed = new Set([]);
      pressedRepeat = new Set([]);
      released = new Set([]);
      down = new Set([]);
      update() {
        this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
      }
      press(n) {
        this.pressed.add(n), this.pressedRepeat.add(n), this.down.add(n);
      }
      pressRepeat(n) {
        this.pressedRepeat.add(n);
      }
      release(n) {
        this.down.delete(n), this.pressed.delete(n), this.released.add(n);
      }
    },
    Br = class {
      static {
        a(this, "GamepadState");
      }
      buttonState = new ci();
      stickState = new Map();
    },
    Tr = class {
      static {
        a(this, "FPSCounter");
      }
      dts = [];
      timer = 0;
      fps = 0;
      tick(n) {
        this.dts.push(n),
          (this.timer += n),
          this.timer >= 1 &&
            ((this.timer = 0),
            (this.fps = Math.round(
              1 / (this.dts.reduce((t, c) => t + c) / this.dts.length)
            )),
            (this.dts = []));
      }
    },
    Fr = a((n) => {
      if (!n.canvas) throw new Error("Please provide a canvas");
      let t = {
        canvas: n.canvas,
        loopID: null,
        stopped: !1,
        dt: 0,
        time: 0,
        realTime: 0,
        fpsCounter: new Tr(),
        timeScale: 1,
        skipTime: !1,
        numFrames: 0,
        mousePos: new x(0),
        mouseDeltaPos: new x(0),
        keyState: new ci(),
        mouseState: new ci(),
        mergedGamepadState: new Br(),
        gamepadStates: new Map(),
        gamepads: [],
        charInputted: [],
        isMouseMoved: !1,
        lastWidth: n.canvas.offsetWidth,
        lastHeight: n.canvas.offsetHeight,
        events: new Xt(),
      };
      function c() {
        return t.canvas;
      }
      a(c, "canvas");
      function m() {
        return t.dt * t.timeScale;
      }
      a(m, "dt");
      function y() {
        return t.time;
      }
      a(y, "time");
      function N() {
        return t.fpsCounter.fps;
      }
      a(N, "fps");
      function X() {
        return t.numFrames;
      }
      a(X, "numFrames");
      function k() {
        return t.canvas.toDataURL();
      }
      a(k, "screenshot");
      function q(d) {
        t.canvas.style.cursor = d;
      }
      a(q, "setCursor");
      function J() {
        return t.canvas.style.cursor;
      }
      a(J, "getCursor");
      function ee(d) {
        if (d)
          try {
            let V = t.canvas.requestPointerLock();
            V.catch && V.catch((S) => console.error(S));
          } catch (V) {
            console.error(V);
          }
        else document.exitPointerLock();
      }
      a(ee, "setCursorLocked");
      function E() {
        return !!document.pointerLockElement;
      }
      a(E, "isCursorLocked");
      function W(d) {
        d.requestFullscreen
          ? d.requestFullscreen()
          : d.webkitRequestFullscreen && d.webkitRequestFullscreen();
      }
      a(W, "enterFullscreen");
      function h() {
        document.exitFullscreen
          ? document.exitFullscreen()
          : document.webkitExitFullScreen && document.webkitExitFullScreen();
      }
      a(h, "exitFullscreen");
      function H() {
        return document.fullscreenElement || document.webkitFullscreenElement;
      }
      a(H, "getFullscreenElement");
      function T(d = !0) {
        d ? W(t.canvas) : h();
      }
      a(T, "setFullscreen");
      function Ke() {
        return !!H();
      }
      a(Ke, "isFullscreen");
      function Fe() {
        t.stopped = !0;
        for (let d in se) t.canvas.removeEventListener(d, se[d]);
        for (let d in he) document.removeEventListener(d, he[d]);
        for (let d in Re) window.removeEventListener(d, Re[d]);
        Ut.disconnect();
      }
      a(Fe, "quit");
      function A(d) {
        t.loopID !== null && cancelAnimationFrame(t.loopID);
        let V = 0,
          S = a((G) => {
            if (t.stopped) return;
            if (document.visibilityState !== "visible") {
              t.loopID = requestAnimationFrame(S);
              return;
            }
            let K = G / 1e3,
              xe = K - t.realTime,
              Se = n.maxFPS ? 1 / n.maxFPS : 0;
            (t.realTime = K),
              (V += xe),
              V > Se &&
                (t.skipTime ||
                  ((t.dt = V), (t.time += m()), t.fpsCounter.tick(t.dt)),
                (V = 0),
                (t.skipTime = !1),
                t.numFrames++,
                Ct(),
                d(),
                ht()),
              (t.loopID = requestAnimationFrame(S));
          }, "frame");
        S(0);
      }
      a(A, "run");
      function ae() {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
      }
      a(ae, "isTouchscreen");
      function pe() {
        return t.mousePos.clone();
      }
      a(pe, "mousePos");
      function te() {
        return t.mouseDeltaPos.clone();
      }
      a(te, "mouseDeltaPos");
      function ne(d = "left") {
        return t.mouseState.pressed.has(d);
      }
      a(ne, "isMousePressed");
      function Ae(d = "left") {
        return t.mouseState.down.has(d);
      }
      a(Ae, "isMouseDown");
      function O(d = "left") {
        return t.mouseState.released.has(d);
      }
      a(O, "isMouseReleased");
      function M() {
        return t.isMouseMoved;
      }
      a(M, "isMouseMoved");
      function _e(d) {
        return d === void 0
          ? t.keyState.pressed.size > 0
          : t.keyState.pressed.has(d);
      }
      a(_e, "isKeyPressed");
      function Ee(d) {
        return d === void 0
          ? t.keyState.pressedRepeat.size > 0
          : t.keyState.pressedRepeat.has(d);
      }
      a(Ee, "isKeyPressedRepeat");
      function Vt(d) {
        return d === void 0 ? t.keyState.down.size > 0 : t.keyState.down.has(d);
      }
      a(Vt, "isKeyDown");
      function He(d) {
        return d === void 0
          ? t.keyState.released.size > 0
          : t.keyState.released.has(d);
      }
      a(He, "isKeyReleased");
      function Ue(d) {
        return d === void 0
          ? t.mergedGamepadState.buttonState.pressed.size > 0
          : t.mergedGamepadState.buttonState.pressed.has(d);
      }
      a(Ue, "isGamepadButtonPressed");
      function vt(d) {
        return d === void 0
          ? t.mergedGamepadState.buttonState.down.size > 0
          : t.mergedGamepadState.buttonState.down.has(d);
      }
      a(vt, "isGamepadButtonDown");
      function xt(d) {
        return d === void 0
          ? t.mergedGamepadState.buttonState.released.size > 0
          : t.mergedGamepadState.buttonState.released.has(d);
      }
      a(xt, "isGamepadButtonReleased");
      function Le(d) {
        return t.events.on("resize", d);
      }
      a(Le, "onResize");
      let Zt = a((d, V) => {
          if (typeof d == "function") return t.events.on("keyDown", d);
          if (typeof d == "string" && typeof V == "function")
            return t.events.on("keyDown", (S) => S === d && V(d));
        }, "onKeyDown"),
        et = a((d, V) => {
          if (typeof d == "function") return t.events.on("keyPress", d);
          if (typeof d == "string" && typeof V == "function")
            return t.events.on("keyPress", (S) => S === d && V(d));
        }, "onKeyPress"),
        $t = a((d, V) => {
          if (typeof d == "function") return t.events.on("keyPressRepeat", d);
          if (typeof d == "string" && typeof V == "function")
            return t.events.on("keyPressRepeat", (S) => S === d && V(d));
        }, "onKeyPressRepeat"),
        _t = a((d, V) => {
          if (typeof d == "function") return t.events.on("keyRelease", d);
          if (typeof d == "string" && typeof V == "function")
            return t.events.on("keyRelease", (S) => S === d && V(d));
        }, "onKeyRelease");
      function tt(d, V) {
        return typeof d == "function"
          ? t.events.on("mouseDown", (S) => d(S))
          : t.events.on("mouseDown", (S) => S === d && V(S));
      }
      a(tt, "onMouseDown");
      function it(d, V) {
        return typeof d == "function"
          ? t.events.on("mousePress", (S) => d(S))
          : t.events.on("mousePress", (S) => S === d && V(S));
      }
      a(it, "onMousePress");
      function nt(d, V) {
        return typeof d == "function"
          ? t.events.on("mouseRelease", (S) => d(S))
          : t.events.on("mouseRelease", (S) => S === d && V(S));
      }
      a(nt, "onMouseRelease");
      function Pe(d) {
        return t.events.on("mouseMove", () => d(pe(), te()));
      }
      a(Pe, "onMouseMove");
      function Et(d) {
        return t.events.on("charInput", d);
      }
      a(Et, "onCharInput");
      function St(d) {
        return t.events.on("touchStart", d);
      }
      a(St, "onTouchStart");
      function bt(d) {
        return t.events.on("touchMove", d);
      }
      a(bt, "onTouchMove");
      function Rt(d) {
        return t.events.on("touchEnd", d);
      }
      a(Rt, "onTouchEnd");
      function Mt(d) {
        return t.events.on("scroll", d);
      }
      a(Mt, "onScroll");
      function Bt(d) {
        return t.events.on("hide", d);
      }
      a(Bt, "onHide");
      function st(d) {
        return t.events.on("show", d);
      }
      a(st, "onShow");
      function rt(d, V) {
        if (typeof d == "function") return t.events.on("gamepadButtonDown", d);
        if (typeof d == "string" && typeof V == "function")
          return t.events.on("gamepadButtonDown", (S) => S === d && V(d));
      }
      a(rt, "onGamepadButtonDown");
      function ot(d, V) {
        if (typeof d == "function") return t.events.on("gamepadButtonPress", d);
        if (typeof d == "string" && typeof V == "function")
          return t.events.on("gamepadButtonPress", (S) => S === d && V(d));
      }
      a(ot, "onGamepadButtonPress");
      function at(d, V) {
        if (typeof d == "function")
          return t.events.on("gamepadButtonRelease", d);
        if (typeof d == "string" && typeof V == "function")
          return t.events.on("gamepadButtonRelease", (S) => S === d && V(d));
      }
      a(at, "onGamepadButtonRelease");
      function lt(d, V) {
        return t.events.on("gamepadStick", (S, G) => S === d && V(G));
      }
      a(lt, "onGamepadStick");
      function Tt(d) {
        t.events.on("gamepadConnect", d);
      }
      a(Tt, "onGamepadConnect");
      function Ye(d) {
        t.events.on("gamepadDisconnect", d);
      }
      a(Ye, "onGamepadDisconnect");
      function Ft(d) {
        return t.mergedGamepadState.stickState.get(d) || new x(0);
      }
      a(Ft, "getGamepadStick");
      function Pt() {
        return [...t.charInputted];
      }
      a(Pt, "charInputted");
      function je() {
        return [...t.gamepads];
      }
      a(je, "getGamepads");
      function Ct() {
        t.events.trigger("input"),
          t.keyState.down.forEach((d) => t.events.trigger("keyDown", d)),
          t.mouseState.down.forEach((d) => t.events.trigger("mouseDown", d)),
          Nt();
      }
      a(Ct, "processInput");
      function ht() {
        t.keyState.update(),
          t.mouseState.update(),
          t.mergedGamepadState.buttonState.update(),
          t.mergedGamepadState.stickState.forEach((d, V) => {
            t.mergedGamepadState.stickState.set(V, new x(0));
          }),
          (t.charInputted = []),
          (t.isMouseMoved = !1),
          t.gamepadStates.forEach((d) => {
            d.buttonState.update(),
              d.stickState.forEach((V, S) => {
                d.stickState.set(S, new x(0));
              });
          });
      }
      a(ht, "resetInput");
      function Qe(d) {
        let V = {
          index: d.index,
          isPressed: (S) =>
            t.gamepadStates.get(d.index).buttonState.pressed.has(S),
          isDown: (S) => t.gamepadStates.get(d.index).buttonState.down.has(S),
          isReleased: (S) =>
            t.gamepadStates.get(d.index).buttonState.released.has(S),
          getStick: (S) => t.gamepadStates.get(d.index).stickState.get(S),
        };
        return (
          t.gamepads.push(V),
          t.gamepadStates.set(d.index, {
            buttonState: new ci(),
            stickState: new Map([
              ["left", new x(0)],
              ["right", new x(0)],
            ]),
          }),
          V
        );
      }
      a(Qe, "registerGamepad");
      function ze(d) {
        (t.gamepads = t.gamepads.filter((V) => V.index !== d.index)),
          t.gamepadStates.delete(d.index);
      }
      a(ze, "removeGamepad");
      function Nt() {
        for (let d of navigator.getGamepads())
          d && !t.gamepadStates.has(d.index) && Qe(d);
        for (let d of t.gamepads) {
          let V = navigator.getGamepads()[d.index],
            S = (n.gamepads ?? {})[V.id] ?? Ss[V.id] ?? Ss.default,
            G = t.gamepadStates.get(d.index);
          for (let K = 0; K < V.buttons.length; K++)
            V.buttons[K].pressed
              ? (G.buttonState.down.has(S.buttons[K]) ||
                  (t.mergedGamepadState.buttonState.press(S.buttons[K]),
                  G.buttonState.press(S.buttons[K]),
                  t.events.trigger("gamepadButtonPress", S.buttons[K])),
                t.events.trigger("gamepadButtonDown", S.buttons[K]))
              : G.buttonState.down.has(S.buttons[K]) &&
                (t.mergedGamepadState.buttonState.release(S.buttons[K]),
                G.buttonState.release(S.buttons[K]),
                t.events.trigger("gamepadButtonRelease", S.buttons[K]));
          for (let K in S.sticks) {
            let xe = S.sticks[K],
              Se = new x(V.axes[xe.x], V.axes[xe.y]);
            G.stickState.set(K, Se),
              t.mergedGamepadState.stickState.set(K, Se),
              t.events.trigger("gamepadStick", K, Se);
          }
        }
      }
      a(Nt, "processGamepad");
      let se = {},
        he = {},
        Re = {};
      se.mousemove = (d) => {
        let V = new x(d.offsetX, d.offsetY),
          S = new x(d.movementX, d.movementY);
        t.events.onOnce("input", () => {
          (t.isMouseMoved = !0),
            (t.mousePos = V),
            (t.mouseDeltaPos = S),
            t.events.trigger("mouseMove");
        });
      };
      let Dt = ["left", "middle", "right", "back", "forward"];
      (se.mousedown = (d) => {
        t.events.onOnce("input", () => {
          let V = Dt[d.button];
          V && (t.mouseState.press(V), t.events.trigger("mousePress", V));
        });
      }),
        (se.mouseup = (d) => {
          t.events.onOnce("input", () => {
            let V = Dt[d.button];
            V && (t.mouseState.release(V), t.events.trigger("mouseRelease", V));
          });
        });
      let It = new Set([
          " ",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Tab",
        ]),
        kt = {
          ArrowLeft: "left",
          ArrowRight: "right",
          ArrowUp: "up",
          ArrowDown: "down",
          " ": "space",
        };
      (se.keydown = (d) => {
        It.has(d.key) && d.preventDefault(),
          t.events.onOnce("input", () => {
            let V = kt[d.key] || d.key.toLowerCase();
            V.length === 1
              ? (t.events.trigger("charInput", V), t.charInputted.push(V))
              : V === "space" &&
                (t.events.trigger("charInput", " "), t.charInputted.push(" ")),
              d.repeat
                ? (t.keyState.pressRepeat(V),
                  t.events.trigger("keyPressRepeat", V))
                : (t.keyState.press(V),
                  t.events.trigger("keyPressRepeat", V),
                  t.events.trigger("keyPress", V));
          });
      }),
        (se.keyup = (d) => {
          t.events.onOnce("input", () => {
            let V = kt[d.key] || d.key.toLowerCase();
            t.keyState.release(V), t.events.trigger("keyRelease", V);
          });
        }),
        (se.touchstart = (d) => {
          d.preventDefault(),
            t.events.onOnce("input", () => {
              let V = [...d.changedTouches],
                S = t.canvas.getBoundingClientRect();
              n.touchToMouse !== !1 &&
                ((t.mousePos = new x(V[0].clientX - S.x, V[0].clientY - S.y)),
                t.mouseState.press("left"),
                t.events.trigger("mousePress", "left")),
                V.forEach((G) => {
                  t.events.trigger(
                    "touchStart",
                    new x(G.clientX - S.x, G.clientY - S.y),
                    G
                  );
                });
            });
        }),
        (se.touchmove = (d) => {
          d.preventDefault(),
            t.events.onOnce("input", () => {
              let V = [...d.changedTouches],
                S = t.canvas.getBoundingClientRect();
              n.touchToMouse !== !1 &&
                ((t.mousePos = new x(V[0].clientX - S.x, V[0].clientY - S.y)),
                t.events.trigger("mouseMove")),
                V.forEach((G) => {
                  t.events.trigger(
                    "touchMove",
                    new x(G.clientX - S.x, G.clientY - S.y),
                    G
                  );
                });
            });
        }),
        (se.touchend = (d) => {
          t.events.onOnce("input", () => {
            let V = [...d.changedTouches],
              S = t.canvas.getBoundingClientRect();
            n.touchToMouse !== !1 &&
              ((t.mousePos = new x(V[0].clientX - S.x, V[0].clientY - S.y)),
              t.mouseState.release("left"),
              t.events.trigger("mouseRelease", "left")),
              V.forEach((G) => {
                t.events.trigger(
                  "touchEnd",
                  new x(G.clientX - S.x, G.clientY - S.y),
                  G
                );
              });
          });
        }),
        (se.touchcancel = (d) => {
          t.events.onOnce("input", () => {
            let V = [...d.changedTouches],
              S = t.canvas.getBoundingClientRect();
            n.touchToMouse !== !1 &&
              ((t.mousePos = new x(V[0].clientX - S.x, V[0].clientY - S.y)),
              t.mouseState.release("left"),
              t.events.trigger("mouseRelease", "left")),
              V.forEach((G) => {
                t.events.trigger(
                  "touchEnd",
                  new x(G.clientX - S.x, G.clientY - S.y),
                  G
                );
              });
          });
        }),
        (se.wheel = (d) => {
          d.preventDefault(),
            t.events.onOnce("input", () => {
              t.events.trigger("scroll", new x(d.deltaX, d.deltaY));
            });
        }),
        (se.contextmenu = (d) => d.preventDefault()),
        (he.visibilitychange = () => {
          document.visibilityState === "visible"
            ? ((t.skipTime = !0), t.events.trigger("show"))
            : t.events.trigger("hide");
        }),
        (Re.gamepadconnected = (d) => {
          let V = Qe(d.gamepad);
          t.events.onOnce("input", () => {
            t.events.trigger("gamepadConnect", V);
          });
        }),
        (Re.gamepaddisconnected = (d) => {
          let V = je().filter((S) => S.index === d.gamepad.index)[0];
          ze(d.gamepad),
            t.events.onOnce("input", () => {
              t.events.trigger("gamepadDisconnect", V);
            });
        });
      for (let d in se) t.canvas.addEventListener(d, se[d]);
      for (let d in he) document.addEventListener(d, he[d]);
      for (let d in Re) window.addEventListener(d, Re[d]);
      let Ut = new ResizeObserver((d) => {
        for (let V of d)
          if (V.target === t.canvas) {
            if (
              t.lastWidth === t.canvas.offsetWidth &&
              t.lastHeight === t.canvas.offsetHeight
            )
              return;
            (t.lastWidth = t.canvas.offsetWidth),
              (t.lastHeight = t.canvas.offsetHeight),
              t.events.onOnce("input", () => {
                t.events.trigger("resize");
              });
          }
      });
      return (
        Ut.observe(t.canvas),
        {
          dt: m,
          time: y,
          run: A,
          canvas: c,
          fps: N,
          numFrames: X,
          quit: Fe,
          setFullscreen: T,
          isFullscreen: Ke,
          setCursor: q,
          screenshot: k,
          getGamepads: je,
          getCursor: J,
          setCursorLocked: ee,
          isCursorLocked: E,
          isTouchscreen: ae,
          mousePos: pe,
          mouseDeltaPos: te,
          isKeyDown: Vt,
          isKeyPressed: _e,
          isKeyPressedRepeat: Ee,
          isKeyReleased: He,
          isMouseDown: Ae,
          isMousePressed: ne,
          isMouseReleased: O,
          isMouseMoved: M,
          isGamepadButtonPressed: Ue,
          isGamepadButtonDown: vt,
          isGamepadButtonReleased: xt,
          getGamepadStick: Ft,
          charInputted: Pt,
          onResize: Le,
          onKeyDown: Zt,
          onKeyPress: et,
          onKeyPressRepeat: $t,
          onKeyRelease: _t,
          onMouseDown: tt,
          onMousePress: it,
          onMouseRelease: nt,
          onMouseMove: Pe,
          onCharInput: Et,
          onTouchStart: St,
          onTouchMove: bt,
          onTouchEnd: Rt,
          onScroll: Mt,
          onHide: Bt,
          onShow: st,
          onGamepadButtonDown: rt,
          onGamepadButtonPress: ot,
          onGamepadButtonRelease: at,
          onGamepadStick: lt,
          onGamepadConnect: Tt,
          onGamepadDisconnect: Ye,
          events: t.events,
        }
      );
    }, "default"),
    li = 2.5949095,
    bs = 1.70158 + 1,
    Rs = (2 * Math.PI) / 3,
    Ms = (2 * Math.PI) / 4.5,
    pi = {
      linear: (n) => n,
      easeInSine: (n) => 1 - Math.cos((n * Math.PI) / 2),
      easeOutSine: (n) => Math.sin((n * Math.PI) / 2),
      easeInOutSine: (n) => -(Math.cos(Math.PI * n) - 1) / 2,
      easeInQuad: (n) => n * n,
      easeOutQuad: (n) => 1 - (1 - n) * (1 - n),
      easeInOutQuad: (n) =>
        n < 0.5 ? 2 * n * n : 1 - Math.pow(-2 * n + 2, 2) / 2,
      easeInCubic: (n) => n * n * n,
      easeOutCubic: (n) => 1 - Math.pow(1 - n, 3),
      easeInOutCubic: (n) =>
        n < 0.5 ? 4 * n * n * n : 1 - Math.pow(-2 * n + 2, 3) / 2,
      easeInQuart: (n) => n * n * n * n,
      easeOutQuart: (n) => 1 - Math.pow(1 - n, 4),
      easeInOutQuart: (n) =>
        n < 0.5 ? 8 * n * n * n * n : 1 - Math.pow(-2 * n + 2, 4) / 2,
      easeInQuint: (n) => n * n * n * n * n,
      easeOutQuint: (n) => 1 - Math.pow(1 - n, 5),
      easeInOutQuint: (n) =>
        n < 0.5 ? 16 * n * n * n * n * n : 1 - Math.pow(-2 * n + 2, 5) / 2,
      easeInExpo: (n) => (n === 0 ? 0 : Math.pow(2, 10 * n - 10)),
      easeOutExpo: (n) => (n === 1 ? 1 : 1 - Math.pow(2, -10 * n)),
      easeInOutExpo: (n) =>
        n === 0
          ? 0
          : n === 1
          ? 1
          : n < 0.5
          ? Math.pow(2, 20 * n - 10) / 2
          : (2 - Math.pow(2, -20 * n + 10)) / 2,
      easeInCirc: (n) => 1 - Math.sqrt(1 - Math.pow(n, 2)),
      easeOutCirc: (n) => Math.sqrt(1 - Math.pow(n - 1, 2)),
      easeInOutCirc: (n) =>
        n < 0.5
          ? (1 - Math.sqrt(1 - Math.pow(2 * n, 2))) / 2
          : (Math.sqrt(1 - Math.pow(-2 * n + 2, 2)) + 1) / 2,
      easeInBack: (n) => bs * n * n * n - 1.70158 * n * n,
      easeOutBack: (n) =>
        1 + bs * Math.pow(n - 1, 3) + 1.70158 * Math.pow(n - 1, 2),
      easeInOutBack: (n) =>
        n < 0.5
          ? (Math.pow(2 * n, 2) * ((li + 1) * 2 * n - li)) / 2
          : (Math.pow(2 * n - 2, 2) * ((li + 1) * (n * 2 - 2) + li) + 2) / 2,
      easeInElastic: (n) =>
        n === 0
          ? 0
          : n === 1
          ? 1
          : -Math.pow(2, 10 * n - 10) * Math.sin((n * 10 - 10.75) * Rs),
      easeOutElastic: (n) =>
        n === 0
          ? 0
          : n === 1
          ? 1
          : Math.pow(2, -10 * n) * Math.sin((n * 10 - 0.75) * Rs) + 1,
      easeInOutElastic: (n) =>
        n === 0
          ? 0
          : n === 1
          ? 1
          : n < 0.5
          ? -(Math.pow(2, 20 * n - 10) * Math.sin((20 * n - 11.125) * Ms)) / 2
          : (Math.pow(2, -20 * n + 10) * Math.sin((20 * n - 11.125) * Ms)) / 2 +
            1,
      easeInBounce: (n) => 1 - pi.easeOutBounce(1 - n),
      easeOutBounce: (n) =>
        n < 1 / 2.75
          ? 7.5625 * n * n
          : n < 2 / 2.75
          ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75
          : n < 2.5 / 2.75
          ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375
          : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375,
      easeInOutBounce: (n) =>
        n < 0.5
          ? (1 - pi.easeOutBounce(1 - 2 * n)) / 2
          : (1 + pi.easeOutBounce(2 * n - 1)) / 2,
    },
    zt = pi,
    Pr = class {
      static {
        a(this, "Timer");
      }
      time;
      action;
      finished = !1;
      paused = !1;
      constructor(n, t) {
        (this.time = n), (this.action = t);
      }
      tick(n) {
        return this.finished || this.paused
          ? !1
          : ((this.time -= n),
            this.time <= 0
              ? (this.action(), (this.finished = !0), (this.time = 0), !0)
              : !1);
      }
      reset(n) {
        (this.time = n), (this.finished = !1);
      }
    },
    Cr =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==",
    Nr = Vr(
      "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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
    ),
    Dr =
      "data:image/png;base64,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",
    Ir =
      "data:image/png;base64,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",
    kr = "3000.1.8",
    Bs =
      " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
    hi = "topleft",
    Ts = 64,
    Ur = "monospace",
    ui = "monospace",
    Lr = 36,
    Fs = 64,
    Ps = 256,
    Cs = 2048,
    Ns = 2048,
    Ds = 2048,
    Is = 2048,
    ks = 0.1,
    Gr = 64,
    zi = "nearest",
    Or = 8,
    qr = 4,
    ir = [
      { name: "a_pos", size: 2 },
      { name: "a_uv", size: 2 },
      { name: "a_color", size: 4 },
    ],
    fi = ir.reduce((n, t) => n + t.size, 0),
    nr = 2048,
    Us = nr * 4 * fi,
    Ls = nr * 6,
    Kr = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`,
    Hr = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`,
    Xi = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`,
    Ji = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`,
    Yr = new Set(["id", "require"]),
    jr = new Set([
      "add",
      "update",
      "draw",
      "destroy",
      "inspect",
      "drawInspect",
    ]);
  function $e(n) {
    switch (n) {
      case "topleft":
        return new x(-1, -1);
      case "top":
        return new x(0, -1);
      case "topright":
        return new x(1, -1);
      case "left":
        return new x(-1, 0);
      case "center":
        return new x(0, 0);
      case "right":
        return new x(1, 0);
      case "botleft":
        return new x(-1, 1);
      case "bot":
        return new x(0, 1);
      case "botright":
        return new x(1, 1);
      default:
        return n;
    }
  }
  a($e, "anchorPt");
  function sr(n) {
    switch (n) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  a(sr, "alignPt");
  function rr(n) {
    return n.createBuffer(1, 1, 44100);
  }
  a(rr, "createEmptyAudioBuffer");
  var or = a((n = {}) => {
    let t = n.root ?? document.body;
    t === document.body &&
      ((document.body.style.width = "100%"),
      (document.body.style.height = "100%"),
      (document.body.style.margin = "0px"),
      (document.documentElement.style.width = "100%"),
      (document.documentElement.style.height = "100%"));
    let c =
        n.canvas ??
        (() => {
          let e = document.createElement("canvas");
          return t.appendChild(e), e;
        })(),
      m = n.scale ?? 1,
      y = n.width && n.height && !n.stretch && !n.letterbox;
    y
      ? ((c.width = n.width * m), (c.height = n.height * m))
      : ((c.width = c.parentElement.offsetWidth),
        (c.height = c.parentElement.offsetHeight));
    let N = c.width,
      X = c.height,
      k = n.pixelDensity || window.devicePixelRatio;
    (c.width *= k), (c.height *= k);
    let q = ["outline: none", "cursor: default"];
    y
      ? (q.push(`width: ${N}px`), q.push(`height: ${X}px`))
      : (q.push("width: 100%"), q.push("height: 100%")),
      n.crisp &&
        (q.push("image-rendering: pixelated"),
        q.push("image-rendering: crisp-edges")),
      (c.style.cssText = q.join(";")),
      (c.tabIndex = 0);
    let J = document.createElement("canvas");
    (J.width = Ps), (J.height = Ps);
    let ee = J.getContext("2d", { willReadFrequently: !0 }),
      E = Fr({
        canvas: c,
        touchToMouse: n.touchToMouse,
        gamepads: n.gamepads,
        pixelDensity: n.pixelDensity,
        maxFPS: n.maxFPS,
      }),
      W = [],
      h = E.canvas().getContext("webgl", {
        antialias: !0,
        depth: !0,
        stencil: !0,
        alpha: !0,
        preserveDrawingBuffer: !0,
      });
    class H {
      static {
        a(this, "Texture");
      }
      src = null;
      glTex;
      width;
      height;
      constructor(i, s, r = {}) {
        (this.glTex = h.createTexture()),
          W.push(() => this.free()),
          this.bind(),
          i &&
            s &&
            h.texImage2D(
              h.TEXTURE_2D,
              0,
              h.RGBA,
              i,
              s,
              0,
              h.RGBA,
              h.UNSIGNED_BYTE,
              null
            ),
          (this.width = i),
          (this.height = s);
        let o = (() => {
            switch (r.filter ?? n.texFilter) {
              case "linear":
                return h.LINEAR;
              case "nearest":
                return h.NEAREST;
              default:
                return h.NEAREST;
            }
          })(),
          l = (() => {
            switch (r.wrap) {
              case "repeat":
                return h.REPEAT;
              case "clampToEdge":
                return h.CLAMP_TO_EDGE;
              default:
                return h.CLAMP_TO_EDGE;
            }
          })();
        h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, o),
          h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, o),
          h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_S, l),
          h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_T, l),
          this.unbind();
      }
      static fromImage(i, s = {}) {
        let r = new H(0, 0, s);
        return (
          r.bind(),
          h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, h.RGBA, h.UNSIGNED_BYTE, i),
          (r.width = i.width),
          (r.height = i.height),
          r.unbind(),
          (r.src = i),
          r
        );
      }
      update(i, s = 0, r = 0) {
        this.bind(),
          h.texSubImage2D(h.TEXTURE_2D, 0, s, r, h.RGBA, h.UNSIGNED_BYTE, i),
          this.unbind();
      }
      bind() {
        h.bindTexture(h.TEXTURE_2D, this.glTex);
      }
      unbind() {
        h.bindTexture(h.TEXTURE_2D, null);
      }
      free() {
        h.deleteTexture(this.glTex);
      }
    }
    class T extends Error {
      static {
        a(this, "KaboomError");
      }
      constructor(i) {
        super(i), (this.name = "KaboomError");
      }
    }
    class Ke {
      static {
        a(this, "TexPacker");
      }
      tex;
      canvas;
      ctx;
      x = 0;
      y = 0;
      curHeight = 0;
      constructor(i, s) {
        (this.canvas = document.createElement("canvas")),
          (this.canvas.width = i),
          (this.canvas.height = s),
          (this.tex = H.fromImage(this.canvas)),
          (this.ctx = this.canvas.getContext("2d"));
      }
      add(i) {
        if (i.width > this.canvas.width || i.height > this.canvas.height)
          throw new T(
            `Texture size (${i.width} x ${i.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`
          );
        this.x + i.width > this.canvas.width &&
          ((this.x = 0), (this.y += this.curHeight), (this.curHeight = 0)),
          this.y + i.height > this.canvas.height &&
            (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
            (this.tex = H.fromImage(this.canvas)),
            (this.x = 0),
            (this.y = 0),
            (this.curHeight = 0));
        let s = new x(this.x, this.y);
        return (
          (this.x += i.width),
          i.height > this.curHeight && (this.curHeight = i.height),
          i instanceof ImageData
            ? this.ctx.putImageData(i, s.x, s.y)
            : this.ctx.drawImage(i, s.x, s.y),
          this.tex.update(this.canvas),
          [
            this.tex,
            new ce(
              s.x / this.canvas.width,
              s.y / this.canvas.height,
              i.width / this.canvas.width,
              i.height / this.canvas.height
            ),
          ]
        );
      }
    }
    class Fe {
      static {
        a(this, "FrameBuffer");
      }
      tex;
      glFrameBuffer;
      glRenderBuffer;
      constructor(i, s, r = {}) {
        (this.tex = new H(i, s, r)),
          (this.glFrameBuffer = h.createFramebuffer()),
          (this.glRenderBuffer = h.createRenderbuffer()),
          W.push(() => this.free()),
          this.bind(),
          h.renderbufferStorage(h.RENDERBUFFER, h.DEPTH_STENCIL, i, s),
          h.framebufferTexture2D(
            h.FRAMEBUFFER,
            h.COLOR_ATTACHMENT0,
            h.TEXTURE_2D,
            this.tex.glTex,
            0
          ),
          h.framebufferRenderbuffer(
            h.FRAMEBUFFER,
            h.DEPTH_STENCIL_ATTACHMENT,
            h.RENDERBUFFER,
            this.glRenderBuffer
          ),
          this.unbind();
      }
      get width() {
        return this.tex.width;
      }
      get height() {
        return this.tex.height;
      }
      bind() {
        h.bindFramebuffer(h.FRAMEBUFFER, this.glFrameBuffer),
          h.bindRenderbuffer(h.RENDERBUFFER, this.glRenderBuffer);
      }
      unbind() {
        h.bindFramebuffer(h.FRAMEBUFFER, null),
          h.bindRenderbuffer(h.RENDERBUFFER, null);
      }
      free() {
        h.deleteFramebuffer(this.glFrameBuffer),
          h.deleteRenderbuffer(this.glRenderBuffer),
          this.tex.free();
      }
    }
    let A = (() => {
      let e = ze(Xi, Ji),
        i = H.fromImage(
          new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)
        ),
        s =
          n.width && n.height
            ? new Fe(n.width * k * m, n.height * k * m)
            : new Fe(h.drawingBufferWidth, h.drawingBufferHeight),
        r = null,
        o = 1;
      n.background &&
        ((r = _.fromArray(n.background)),
        (o = n.background[3] ?? 1),
        h.clearColor(r.r / 255, r.g / 255, r.b / 255, o)),
        h.enable(h.BLEND),
        h.enable(h.SCISSOR_TEST),
        h.blendFuncSeparate(
          h.SRC_ALPHA,
          h.ONE_MINUS_SRC_ALPHA,
          h.ONE,
          h.ONE_MINUS_SRC_ALPHA
        );
      let l = h.createBuffer();
      h.bindBuffer(h.ARRAY_BUFFER, l),
        h.bufferData(h.ARRAY_BUFFER, Us * 4, h.DYNAMIC_DRAW),
        ir.reduce(
          (p, u, w) => (
            h.vertexAttribPointer(w, u.size, h.FLOAT, !1, fi * 4, p),
            h.enableVertexAttribArray(w),
            p + u.size * 4
          ),
          0
        ),
        h.bindBuffer(h.ARRAY_BUFFER, null);
      let f = h.createBuffer();
      h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, f),
        h.bufferData(h.ELEMENT_ARRAY_BUFFER, Ls * 4, h.DYNAMIC_DRAW),
        h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, null);
      let g = H.fromImage(
        new ImageData(
          new Uint8ClampedArray([
            128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128,
            128, 128, 255,
          ]),
          2,
          2
        ),
        { wrap: "repeat", filter: "nearest" }
      );
      return {
        drawCalls: 0,
        lastDrawCalls: 0,
        defShader: e,
        curShader: e,
        frameBuffer: s,
        postShader: null,
        postShaderUniform: null,
        defTex: i,
        curTex: i,
        curUniform: {},
        vbuf: l,
        ibuf: f,
        vqueue: [],
        iqueue: [],
        transform: new Me(),
        transformStack: [],
        bgTex: g,
        bgColor: r,
        bgAlpha: o,
        width: n.width ?? h.drawingBufferWidth / k / m,
        height: n.height ?? h.drawingBufferHeight / k / m,
        viewport: {
          x: 0,
          y: 0,
          width: h.drawingBufferWidth,
          height: h.drawingBufferHeight,
        },
        fixed: !1,
      };
    })();
    class ae {
      static {
        a(this, "SpriteData");
      }
      tex;
      frames = [new ce(0, 0, 1, 1)];
      anims = {};
      slice9 = null;
      constructor(i, s, r = {}, o = null) {
        (this.tex = i),
          s && (this.frames = s),
          (this.anims = r),
          (this.slice9 = o);
      }
      get width() {
        return this.tex.width * this.frames[0].w;
      }
      get height() {
        return this.tex.height * this.frames[0].h;
      }
      static from(i, s = {}) {
        return typeof i == "string"
          ? ae.fromURL(i, s)
          : Promise.resolve(ae.fromImage(i, s));
      }
      static fromImage(i, s = {}) {
        let [r, o] = O.packer.add(i),
          l = s.frames
            ? s.frames.map(
                (f) =>
                  new ce(o.x + f.x * o.w, o.y + f.y * o.h, f.w * o.w, f.h * o.h)
              )
            : tt(s.sliceX || 1, s.sliceY || 1, o.x, o.y, o.w, o.h);
        return new ae(r, l, s.anims, s.slice9);
      }
      static fromURL(i, s = {}) {
        return Le(i).then((r) => ae.fromImage(r, s));
      }
    }
    class pe {
      static {
        a(this, "SoundData");
      }
      buf;
      constructor(i) {
        this.buf = i;
      }
      static fromArrayBuffer(i) {
        return new Promise((s, r) => te.ctx.decodeAudioData(i, s, r)).then(
          (s) => new pe(s)
        );
      }
      static fromURL(i) {
        return Es(i)
          ? pe.fromArrayBuffer(er(i))
          : xt(i).then((s) => pe.fromArrayBuffer(s));
      }
    }
    let te = (() => {
      let e = new (window.AudioContext || window.webkitAudioContext)(),
        i = e.createGain();
      i.connect(e.destination);
      let s = new pe(rr(e));
      return (
        e
          .decodeAudioData(Nr.buffer.slice(0))
          .then((r) => {
            s.buf = r;
          })
          .catch((r) => {
            console.error("Failed to load burp: ", r);
          }),
        { ctx: e, masterNode: i, burpSnd: s }
      );
    })();
    class ne {
      static {
        a(this, "Asset");
      }
      loaded = !1;
      data = null;
      error = null;
      onLoadEvents = new be();
      onErrorEvents = new be();
      onFinishEvents = new be();
      constructor(i) {
        i.then((s) => {
          (this.data = s), this.onLoadEvents.trigger(s);
        })
          .catch((s) => {
            if (((this.error = s), this.onErrorEvents.numListeners() > 0))
              this.onErrorEvents.trigger(s);
            else throw s;
          })
          .finally(() => {
            this.onFinishEvents.trigger(), (this.loaded = !0);
          });
      }
      static loaded(i) {
        let s = new ne(Promise.resolve(i));
        return (s.data = i), (s.loaded = !0), s;
      }
      onLoad(i) {
        return (
          this.loaded && this.data ? i(this.data) : this.onLoadEvents.add(i),
          this
        );
      }
      onError(i) {
        return (
          this.loaded && this.error ? i(this.error) : this.onErrorEvents.add(i),
          this
        );
      }
      onFinish(i) {
        return this.loaded ? i() : this.onFinishEvents.add(i), this;
      }
      then(i) {
        return this.onLoad(i);
      }
      catch(i) {
        return this.onError(i);
      }
      finally(i) {
        return this.onFinish(i);
      }
    }
    class Ae {
      static {
        a(this, "AssetBucket");
      }
      assets = new Map();
      lastUID = 0;
      add(i, s) {
        let r = i ?? this.lastUID++ + "",
          o = new ne(s);
        return this.assets.set(r, o), o;
      }
      addLoaded(i, s) {
        let r = i ?? this.lastUID++ + "",
          o = ne.loaded(s);
        return this.assets.set(r, o), o;
      }
      get(i) {
        return this.assets.get(i);
      }
      progress() {
        if (this.assets.size === 0) return 1;
        let i = 0;
        return (
          this.assets.forEach((s) => {
            s.loaded && i++;
          }),
          i / this.assets.size
        );
      }
    }
    let O = {
        urlPrefix: "",
        sprites: new Ae(),
        fonts: new Ae(),
        bitmapFonts: new Ae(),
        sounds: new Ae(),
        shaders: new Ae(),
        custom: new Ae(),
        packer: new Ke(Ds, Is),
        loaded: !1,
      },
      M = {
        events: new Xt(),
        objEvents: new Xt(),
        root: ei([]),
        gravity: 0,
        scenes: {},
        logs: [],
        cam: {
          pos: null,
          scale: new x(1),
          angle: 0,
          shake: 0,
          transform: new Me(),
        },
      };
    function _e(e) {
      return O.custom.add(null, e);
    }
    a(_e, "load");
    function Ee() {
      let e = [
        O.sprites,
        O.sounds,
        O.shaders,
        O.fonts,
        O.bitmapFonts,
        O.custom,
      ];
      return e.reduce((i, s) => i + s.progress(), 0) / e.length;
    }
    a(Ee, "loadProgress");
    function Vt(e) {
      return e !== void 0 && (O.urlPrefix = e), O.urlPrefix;
    }
    a(Vt, "loadRoot");
    function He(e) {
      let i = O.urlPrefix + e;
      return fetch(i).then((s) => {
        if (!s.ok) throw new T(`Failed to fetch "${i}"`);
        return s;
      });
    }
    a(He, "fetchURL");
    function Ue(e) {
      return He(e).then((i) => i.json());
    }
    a(Ue, "fetchJSON");
    function vt(e) {
      return He(e).then((i) => i.text());
    }
    a(vt, "fetchText");
    function xt(e) {
      return He(e).then((i) => i.arrayBuffer());
    }
    a(xt, "fetchArrayBuffer");
    function Le(e) {
      let i = new Image();
      return (
        (i.crossOrigin = "anonymous"),
        (i.src = Es(e) ? e : O.urlPrefix + e),
        new Promise((s, r) => {
          (i.onload = () => s(i)),
            (i.onerror = () => r(new T(`Failed to load image from "${e}"`)));
        })
      );
    }
    a(Le, "loadImg");
    function Zt(e, i) {
      return O.custom.add(e, Ue(i));
    }
    a(Zt, "loadJSON");
    class et {
      static {
        a(this, "FontData");
      }
      fontface;
      filter = zi;
      outline = null;
      constructor(i, s = {}) {
        (this.fontface = i),
          (this.filter = s.filter ?? zi),
          s.outline &&
            ((this.outline = { width: 1, color: $(0, 0, 0) }),
            typeof s.outline == "number"
              ? (this.outline.width = s.outline)
              : typeof s.outline == "object" &&
                (s.outline.width && (this.outline.width = s.outline.width),
                s.outline.color && (this.outline.color = s.outline.color)));
      }
    }
    function $t(e, i, s = {}) {
      let r = new FontFace(e, typeof i == "string" ? `url(${i})` : i);
      return (
        document.fonts.add(r),
        O.fonts.add(
          e,
          r
            .load()
            .catch((o) => {
              throw new T(`Failed to load font from "${i}": ${o}`);
            })
            .then((o) => new et(o, s))
        )
      );
    }
    a($t, "loadFont");
    function _t(e, i, s, r, o = {}) {
      return O.bitmapFonts.add(
        e,
        Le(i).then((l) => Nt(H.fromImage(l, o), s, r, o.chars ?? Bs))
      );
    }
    a(_t, "loadBitmapFont");
    function tt(e = 1, i = 1, s = 0, r = 0, o = 1, l = 1) {
      let f = [],
        g = o / e,
        p = l / i;
      for (let u = 0; u < i; u++)
        for (let w = 0; w < e; w++) f.push(new ce(s + w * g, r + u * p, g, p));
      return f;
    }
    a(tt, "slice");
    function it(e, i) {
      return _e(
        typeof i == "string"
          ? new Promise((s, r) => {
              Ue(i).then((o) => {
                it(e, o).then(s).catch(r);
              });
            })
          : ae.from(e).then((s) => {
              let r = {};
              for (let o in i) {
                let l = i[o],
                  f = s.frames[0],
                  g = Ds * f.w,
                  p = Is * f.h,
                  u = l.frames
                    ? l.frames.map(
                        (b) =>
                          new ce(
                            f.x + ((l.x + b.x) / g) * f.w,
                            f.y + ((l.y + b.y) / p) * f.h,
                            (b.w / g) * f.w,
                            (b.h / p) * f.h
                          )
                      )
                    : tt(
                        l.sliceX || 1,
                        l.sliceY || 1,
                        f.x + (l.x / g) * f.w,
                        f.y + (l.y / p) * f.h,
                        (l.width / g) * f.w,
                        (l.height / p) * f.h
                      ),
                  w = new ae(s.tex, u, l.anims);
                O.sprites.addLoaded(o, w), (r[o] = w);
              }
              return r;
            })
      );
    }
    a(it, "loadSpriteAtlas");
    function nt(e, i = {}) {
      let s = document.createElement("canvas"),
        r = e[0].width,
        o = e[0].height;
      (s.width = r * e.length), (s.height = o);
      let l = s.getContext("2d");
      e.forEach((g, p) => {
        g instanceof ImageData
          ? l.putImageData(g, p * r, 0)
          : l.drawImage(g, p * r, 0);
      });
      let f = l.getImageData(0, 0, e.length * r, o);
      return ae.fromImage(f, { ...i, sliceX: e.length, sliceY: 1 });
    }
    a(nt, "createSpriteSheet");
    function Pe(e, i, s = { sliceX: 1, sliceY: 1, anims: {} }) {
      return Array.isArray(i)
        ? i.some((r) => typeof r == "string")
          ? O.sprites.add(
              e,
              Promise.all(
                i.map((r) =>
                  typeof r == "string" ? Le(r) : Promise.resolve(r)
                )
              ).then((r) => nt(r, s))
            )
          : O.sprites.addLoaded(e, nt(i, s))
        : typeof i == "string"
        ? O.sprites.add(e, ae.from(i, s))
        : O.sprites.addLoaded(e, ae.fromImage(i, s));
    }
    a(Pe, "loadSprite");
    function Et(e, i) {
      return O.sprites.add(
        e,
        new Promise(async (s) => {
          let r = typeof i == "string" ? await Ue(i) : i,
            o = await Promise.all(r.frames.map(Le)),
            l = document.createElement("canvas");
          (l.width = r.width), (l.height = r.height * r.frames.length);
          let f = l.getContext("2d");
          o.forEach((p, u) => {
            f.drawImage(p, 0, u * r.height);
          });
          let g = await Pe(null, l, {
            sliceY: r.frames.length,
            anims: r.anims,
          });
          s(g);
        })
      );
    }
    a(Et, "loadPedit");
    function St(e, i, s) {
      typeof i == "string" &&
        !s &&
        (s = i.replace(new RegExp(`${br(i)}$`), "json"));
      let r = typeof s == "string" ? Ue(s) : Promise.resolve(s);
      return O.sprites.add(
        e,
        r.then((o) => {
          let l = o.meta.size,
            f = o.frames.map(
              (p) =>
                new ce(
                  p.frame.x / l.w,
                  p.frame.y / l.h,
                  p.frame.w / l.w,
                  p.frame.h / l.h
                )
            ),
            g = {};
          for (let p of o.meta.frameTags)
            p.from === p.to
              ? (g[p.name] = p.from)
              : (g[p.name] = {
                  from: p.from,
                  to: p.to,
                  speed: 10,
                  loop: !0,
                  pingpong: p.direction === "pingpong",
                });
          return ae.from(i, { frames: f, anims: g });
        })
      );
    }
    a(St, "loadAseprite");
    function bt(e, i, s) {
      return O.shaders.addLoaded(e, ze(i, s));
    }
    a(bt, "loadShader");
    function Rt(e, i, s) {
      let r = a((l) => (l ? vt(l) : Promise.resolve(null)), "resolveUrl"),
        o = Promise.all([r(i), r(s)]).then(([l, f]) => ze(l, f));
      return O.shaders.add(e, o);
    }
    a(Rt, "loadShaderURL");
    function Mt(e, i) {
      return O.sounds.add(
        e,
        typeof i == "string" ? pe.fromURL(i) : pe.fromArrayBuffer(i)
      );
    }
    a(Mt, "loadSound");
    function Bt(e = "bean") {
      return Pe(e, Cr);
    }
    a(Bt, "loadBean");
    function st(e) {
      return O.sprites.get(e);
    }
    a(st, "getSprite");
    function rt(e) {
      return O.sounds.get(e);
    }
    a(rt, "getSound");
    function ot(e) {
      return O.fonts.get(e);
    }
    a(ot, "getFont");
    function at(e) {
      return O.bitmapFonts.get(e);
    }
    a(at, "getBitmapFont");
    function lt(e) {
      return O.shaders.get(e);
    }
    a(lt, "getShader");
    function Tt(e) {
      return O.custom.get(e);
    }
    a(Tt, "getAsset");
    function Ye(e) {
      if (typeof e == "string") {
        let i = st(e);
        if (i) return i;
        if (Ee() < 1) return null;
        throw new T(`Sprite not found: ${e}`);
      } else {
        if (e instanceof ae) return ne.loaded(e);
        if (e instanceof ne) return e;
        throw new T(`Invalid sprite: ${e}`);
      }
    }
    a(Ye, "resolveSprite");
    function Ft(e) {
      if (typeof e == "string") {
        let i = rt(e);
        if (i) return i;
        if (Ee() < 1) return null;
        throw new T(`Sound not found: ${e}`);
      } else {
        if (e instanceof pe) return ne.loaded(e);
        if (e instanceof ne) return e;
        throw new T(`Invalid sound: ${e}`);
      }
    }
    a(Ft, "resolveSound");
    function Pt(e) {
      if (!e) return A.defShader;
      if (typeof e == "string") {
        let i = lt(e);
        if (i) return i.data ?? i;
        if (Ee() < 1) return null;
        throw new T(`Shader not found: ${e}`);
      } else if (e instanceof ne) return e.data ? e.data : e;
      return e;
    }
    a(Pt, "resolveShader");
    function je(e) {
      if (!e) return je(n.font ?? Ur);
      if (typeof e == "string") {
        let i = at(e),
          s = ot(e);
        if (i) return i.data ?? i;
        if (s) return s.data ?? s;
        if (document.fonts.check(`${Fs}px ${e}`)) return e;
        if (Ee() < 1) return null;
        throw new T(`Font not found: ${e}`);
      } else if (e instanceof ne) return e.data ? e.data : e;
      return e;
    }
    a(je, "resolveFont");
    function Ct(e) {
      return (
        e !== void 0 && (te.masterNode.gain.value = e), te.masterNode.gain.value
      );
    }
    a(Ct, "volume");
    function ht(e, i = {}) {
      let s = te.ctx,
        r = i.paused ?? !1,
        o = s.createBufferSource(),
        l = new be(),
        f = s.createGain(),
        g = i.seek ?? 0,
        p = 0,
        u = 0,
        w = !1;
      (o.loop = !!i.loop),
        (o.detune.value = i.detune ?? 0),
        (o.playbackRate.value = i.speed ?? 1),
        o.connect(f),
        (o.onended = () => {
          D() >= o.buffer?.duration && l.trigger();
        }),
        f.connect(te.masterNode),
        (f.gain.value = i.volume ?? 1);
      let b = a((C) => {
          (o.buffer = C.buf),
            r || ((p = s.currentTime), o.start(0, g), (w = !0));
        }, "start"),
        B = Ft(e);
      B instanceof ne && B.onLoad(b);
      let D = a(() => {
          if (!o.buffer) return 0;
          let C = r ? u - p : s.currentTime - p,
            U = o.buffer.duration;
          return o.loop ? C % U : Math.min(C, U);
        }, "getTime"),
        Y = a((C) => {
          let U = s.createBufferSource();
          return (
            (U.buffer = C.buffer),
            (U.loop = C.loop),
            (U.playbackRate.value = C.playbackRate.value),
            (U.detune.value = C.detune.value),
            (U.onended = C.onended),
            U.connect(f),
            U
          );
        }, "cloneNode");
      return {
        stop() {
          (this.paused = !0), this.seek(0);
        },
        set paused(C) {
          if (r !== C)
            if (((r = C), C)) w && (o.stop(), (w = !1)), (u = s.currentTime);
            else {
              o = Y(o);
              let U = u - p;
              o.start(0, U), (w = !0), (p = s.currentTime - U), (u = 0);
            }
        },
        get paused() {
          return r;
        },
        play(C = 0) {
          this.seek(C), (this.paused = !1);
        },
        seek(C) {
          o.buffer?.duration &&
            (C > o.buffer.duration ||
              (r
                ? ((o = Y(o)), (p = u - C))
                : (o.stop(),
                  (o = Y(o)),
                  (p = s.currentTime - C),
                  o.start(0, C),
                  (w = !0),
                  (u = 0))));
        },
        set speed(C) {
          o.playbackRate.value = C;
        },
        get speed() {
          return o.playbackRate.value;
        },
        set detune(C) {
          o.detune.value = C;
        },
        get detune() {
          return o.detune.value;
        },
        set volume(C) {
          f.gain.value = Math.max(C, 0);
        },
        get volume() {
          return f.gain.value;
        },
        set loop(C) {
          o.loop = C;
        },
        get loop() {
          return o.loop;
        },
        duration() {
          return o.buffer?.duration ?? 0;
        },
        time() {
          return D() % this.duration();
        },
        onEnd(C) {
          return l.add(C);
        },
        then(C) {
          return this.onEnd(C);
        },
      };
    }
    a(ht, "play");
    function Qe(e) {
      return ht(te.burpSnd, e);
    }
    a(Qe, "burp");
    function ze(e = Xi, i = Ji) {
      let s = Kr.replace("{{user}}", e ?? Xi),
        r = Hr.replace("{{user}}", i ?? Ji),
        o = h.createShader(h.VERTEX_SHADER),
        l = h.createShader(h.FRAGMENT_SHADER);
      h.shaderSource(o, s),
        h.shaderSource(l, r),
        h.compileShader(o),
        h.compileShader(l);
      let f = h.createProgram();
      if (
        (W.push(() => h.deleteProgram(f)),
        h.attachShader(f, o),
        h.attachShader(f, l),
        h.bindAttribLocation(f, 0, "a_pos"),
        h.bindAttribLocation(f, 1, "a_uv"),
        h.bindAttribLocation(f, 2, "a_color"),
        h.linkProgram(f),
        !h.getProgramParameter(f, h.LINK_STATUS))
      ) {
        let g = a((b) => {
            let B = /^ERROR:\s0:(?<line>\d+):\s(?<msg>.+)/,
              D = b.match(B);
            return {
              line: Number(D.groups.line),
              msg: D.groups.msg.replace(/\n\0$/, ""),
            };
          }, "formatShaderError"),
          p = h.getShaderInfoLog(o),
          u = h.getShaderInfoLog(l),
          w = "";
        if (p) {
          let b = g(p);
          w += `Vertex shader line ${b.line - 14}: ${b.msg}`;
        }
        if (u) {
          let b = g(u);
          w += `Fragment shader line ${b.line - 14}: ${b.msg}`;
        }
        throw new T(w);
      }
      return (
        h.deleteShader(o),
        h.deleteShader(l),
        {
          bind() {
            h.useProgram(f);
          },
          unbind() {
            h.useProgram(null);
          },
          free() {
            h.deleteProgram(f);
          },
          send(g) {
            for (let p in g) {
              let u = g[p],
                w = h.getUniformLocation(f, p);
              typeof u == "number"
                ? h.uniform1f(w, u)
                : u instanceof Me
                ? h.uniformMatrix4fv(w, !1, new Float32Array(u.m))
                : u instanceof _
                ? h.uniform3f(w, u.r, u.g, u.b)
                : u instanceof x && h.uniform2f(w, u.x, u.y);
            }
          },
        }
      );
    }
    a(ze, "makeShader");
    function Nt(e, i, s, r) {
      let o = e.width / i,
        l = {},
        f = r.split("").entries();
      for (let [g, p] of f)
        l[p] = new ce((g % o) * i, Math.floor(g / o) * s, i, s);
      return { tex: e, map: l, size: s };
    }
    a(Nt, "makeFont");
    function se(e, i, s, r = A.defTex, o = A.defShader, l = {}) {
      let f = Pt(o);
      if (!f || f instanceof ne) return;
      (r !== A.curTex ||
        f !== A.curShader ||
        !hn(A.curUniform, l) ||
        A.vqueue.length + e.length * fi > Us ||
        A.iqueue.length + i.length > Ls) &&
        he();
      let g = A.fixed || s ? A.transform : M.cam.transform.mult(A.transform);
      for (let p of e) {
        let u = kt(g.multVec2(p.pos));
        A.vqueue.push(
          u.x,
          u.y,
          p.uv.x,
          p.uv.y,
          p.color.r / 255,
          p.color.g / 255,
          p.color.b / 255,
          p.opacity
        );
      }
      for (let p of i) A.iqueue.push(p + A.vqueue.length / fi - e.length);
      (A.curTex = r), (A.curShader = f), (A.curUniform = l);
    }
    a(se, "drawRaw");
    function he() {
      !A.curTex ||
        !A.curShader ||
        A.vqueue.length === 0 ||
        A.iqueue.length === 0 ||
        (h.bindBuffer(h.ARRAY_BUFFER, A.vbuf),
        h.bufferSubData(h.ARRAY_BUFFER, 0, new Float32Array(A.vqueue)),
        h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, A.ibuf),
        h.bufferSubData(h.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(A.iqueue)),
        A.curShader.bind(),
        A.curShader.send(A.curUniform),
        A.curTex.bind(),
        h.drawElements(h.TRIANGLES, A.iqueue.length, h.UNSIGNED_SHORT, 0),
        A.curTex.unbind(),
        A.curShader.unbind(),
        h.bindBuffer(h.ARRAY_BUFFER, null),
        h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, null),
        (A.vqueue.length = 0),
        (A.iqueue.length = 0),
        A.drawCalls++);
    }
    a(he, "flush");
    function Re() {
      h.clear(h.COLOR_BUFFER_BIT),
        A.frameBuffer.bind(),
        h.viewport(0, 0, A.frameBuffer.width, A.frameBuffer.height),
        h.clear(h.COLOR_BUFFER_BIT),
        A.bgColor ||
          Ce(() => {
            xe({
              width: fe(),
              height: ge(),
              quad: new ce(0, 0, fe() / Ts, ge() / Ts),
              tex: A.bgTex,
              fixed: !0,
            });
          }),
        (A.drawCalls = 0),
        (A.fixed = !1),
        (A.transformStack.length = 0),
        (A.transform = new Me());
    }
    a(Re, "frameStart");
    function Dt(e, i) {
      (A.postShader = e), (A.postShaderUniform = i ?? null);
    }
    a(Dt, "usePostEffect");
    function It() {
      he(),
        A.frameBuffer.unbind(),
        h.viewport(0, 0, h.drawingBufferWidth, h.drawingBufferHeight),
        he();
      let e = A.width,
        i = A.height;
      (A.width = h.drawingBufferWidth / k),
        (A.height = h.drawingBufferHeight / k),
        Se({
          flipY: !0,
          tex: A.frameBuffer.tex,
          pos: new x(A.viewport.x, A.viewport.y),
          width: A.viewport.width,
          height: A.viewport.height,
          shader: A.postShader,
          uniform:
            typeof A.postShaderUniform == "function"
              ? A.postShaderUniform()
              : A.postShaderUniform,
          fixed: !0,
        }),
        he(),
        (A.width = e),
        (A.height = i),
        (A.lastDrawCalls = A.drawCalls);
    }
    a(It, "frameEnd");
    function kt(e) {
      return new x((e.x / fe()) * 2 - 1, (-e.y / ge()) * 2 + 1);
    }
    a(kt, "screen2ndc");
    function Ut(e) {
      A.transform = e.clone();
    }
    a(Ut, "pushMatrix");
    function d(...e) {
      if (e[0] === void 0) return;
      let i = R(...e);
      (i.x === 0 && i.y === 0) || A.transform.translate(i);
    }
    a(d, "pushTranslate");
    function V(...e) {
      if (e[0] === void 0) return;
      let i = R(...e);
      (i.x === 1 && i.y === 1) || A.transform.scale(i);
    }
    a(V, "pushScale");
    function S(e) {
      e && A.transform.rotate(e);
    }
    a(S, "pushRotate");
    function G() {
      A.transformStack.push(A.transform.clone());
    }
    a(G, "pushTransform");
    function K() {
      A.transformStack.length > 0 && (A.transform = A.transformStack.pop());
    }
    a(K, "popTransform");
    function xe(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new T('drawUVQuad() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0) return;
      let i = e.width,
        s = e.height,
        r = $e(e.anchor || hi).scale(new x(i, s).scale(-0.5)),
        o = e.quad || new ce(0, 0, 1, 1),
        l = e.color || $(255, 255, 255),
        f = e.opacity ?? 1,
        g = e.tex ? ks / e.tex.width : 0,
        p = e.tex ? ks / e.tex.height : 0,
        u = o.x + g,
        w = o.y + p,
        b = o.w - g * 2,
        B = o.h - p * 2;
      G(),
        d(e.pos),
        S(e.angle),
        V(e.scale),
        d(r),
        se(
          [
            {
              pos: new x(-i / 2, s / 2),
              uv: new x(e.flipX ? u + b : u, e.flipY ? w : w + B),
              color: l,
              opacity: f,
            },
            {
              pos: new x(-i / 2, -s / 2),
              uv: new x(e.flipX ? u + b : u, e.flipY ? w + B : w),
              color: l,
              opacity: f,
            },
            {
              pos: new x(i / 2, -s / 2),
              uv: new x(e.flipX ? u : u + b, e.flipY ? w + B : w),
              color: l,
              opacity: f,
            },
            {
              pos: new x(i / 2, s / 2),
              uv: new x(e.flipX ? u : u + b, e.flipY ? w : w + B),
              color: l,
              opacity: f,
            },
          ],
          [0, 1, 3, 1, 2, 3],
          e.fixed,
          e.tex,
          e.shader,
          e.uniform
        ),
        K();
    }
    a(xe, "drawUVQuad");
    function Se(e) {
      if (!e.tex) throw new T('drawTexture() requires property "tex".');
      let i = e.quad ?? new ce(0, 0, 1, 1),
        s = e.tex.width * i.w,
        r = e.tex.height * i.h,
        o = new x(1);
      if (e.tiled) {
        let l = Math.ceil((e.width || s) / s),
          f = Math.ceil((e.height || r) / r),
          g = $e(e.anchor || hi)
            .add(new x(1, 1))
            .scale(0.5)
            .scale(l * s, f * r);
        for (let p = 0; p < l; p++)
          for (let u = 0; u < f; u++)
            xe(
              Object.assign({}, e, {
                pos: (e.pos || new x(0)).add(new x(s * p, r * u)).sub(g),
                scale: o.scale(e.scale || new x(1)),
                tex: e.tex,
                quad: i,
                width: s,
                height: r,
                anchor: "topleft",
              })
            );
      } else
        e.width && e.height
          ? ((o.x = e.width / s), (o.y = e.height / r))
          : e.width
          ? ((o.x = e.width / s), (o.y = o.x))
          : e.height && ((o.y = e.height / r), (o.x = o.y)),
          xe(
            Object.assign({}, e, {
              scale: o.scale(e.scale || new x(1)),
              tex: e.tex,
              quad: i,
              width: s,
              height: r,
            })
          );
    }
    a(Se, "drawTexture");
    function cn(e) {
      if (!e.sprite) throw new T('drawSprite() requires property "sprite"');
      let i = Ye(e.sprite);
      if (!i || !i.data) return;
      let s = i.data.frames[e.frame ?? 0];
      if (!s) throw new T(`Frame not found: ${e.frame ?? 0}`);
      Se(
        Object.assign({}, e, {
          tex: i.data.tex,
          quad: s.scale(e.quad ?? new ce(0, 0, 1, 1)),
        })
      );
    }
    a(cn, "drawSprite");
    function ut(e, i, s, r, o, l = 1) {
      (r = Be(r % 360)), (o = Be(o % 360)), o <= r && (o += Math.PI * 2);
      let f = [],
        g = Math.ceil(((o - r) / Be(8)) * l),
        p = (o - r) / g;
      for (let u = r; u < o; u += p)
        f.push(e.add(i * Math.cos(u), s * Math.sin(u)));
      return f.push(e.add(i * Math.cos(o), s * Math.sin(o))), f;
    }
    a(ut, "getArcPts");
    function ye(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new T('drawRect() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0) return;
      let i = e.width,
        s = e.height,
        r = $e(e.anchor || hi)
          .add(1, 1)
          .scale(new x(i, s).scale(-0.5)),
        o = [new x(0, 0), new x(i, 0), new x(i, s), new x(0, s)];
      if (e.radius) {
        let l = Math.min(Math.min(i, s) / 2, e.radius);
        o = [
          new x(l, 0),
          new x(i - l, 0),
          ...ut(new x(i - l, l), l, l, 270, 360),
          new x(i, l),
          new x(i, s - l),
          ...ut(new x(i - l, s - l), l, l, 0, 90),
          new x(i - l, s),
          new x(l, s),
          ...ut(new x(l, s - l), l, l, 90, 180),
          new x(0, s - l),
          new x(0, l),
          ...ut(new x(l, l), l, l, 180, 270),
        ];
      }
      Ge(
        Object.assign({}, e, {
          offset: r,
          pts: o,
          ...(e.gradient
            ? {
                colors: e.horizontal
                  ? [e.gradient[0], e.gradient[1], e.gradient[1], e.gradient[0]]
                  : [
                      e.gradient[0],
                      e.gradient[0],
                      e.gradient[1],
                      e.gradient[1],
                    ],
              }
            : {}),
        })
      );
    }
    a(ye, "drawRect");
    function ct(e) {
      let { p1: i, p2: s } = e;
      if (!i || !s)
        throw new T('drawLine() requires properties "p1" and "p2".');
      let r = e.width || 1,
        o = s
          .sub(i)
          .unit()
          .normal()
          .scale(r * 0.5),
        l = [i.sub(o), i.add(o), s.add(o), s.sub(o)].map((f) => ({
          pos: new x(f.x, f.y),
          uv: new x(0),
          color: e.color ?? _.WHITE,
          opacity: e.opacity ?? 1,
        }));
      se(l, [0, 1, 3, 1, 2, 3], e.fixed, A.defTex, e.shader, e.uniform);
    }
    a(ct, "drawLine");
    function wi(e) {
      let i = e.pts;
      if (!i) throw new T('drawLines() requires property "pts".');
      if (!(i.length < 2))
        if (e.radius && i.length >= 3) {
          let s = i[0].sdist(i[1]);
          for (let o = 1; o < i.length - 1; o++)
            s = Math.min(i[o].sdist(i[o + 1]), s);
          let r = Math.min(e.radius, Math.sqrt(s) / 2);
          ct(Object.assign({}, e, { p1: i[0], p2: i[1] }));
          for (let o = 1; o < i.length - 2; o++) {
            let l = i[o],
              f = i[o + 1];
            ct(Object.assign({}, e, { p1: l, p2: f }));
          }
          ct(
            Object.assign({}, e, { p1: i[i.length - 2], p2: i[i.length - 1] })
          );
        } else
          for (let s = 0; s < i.length - 1; s++)
            ct(Object.assign({}, e, { p1: i[s], p2: i[s + 1] })),
              e.join !== "none" &&
                Xe(Object.assign({}, e, { pos: i[s], radius: e.width / 2 }));
    }
    a(wi, "drawLines");
    function Ai(e) {
      if (!e.p1 || !e.p2 || !e.p3)
        throw new T('drawPolygon() requires properties "p1", "p2" and "p3".');
      return Ge(Object.assign({}, e, { pts: [e.p1, e.p2, e.p3] }));
    }
    a(Ai, "drawTriangle");
    function Xe(e) {
      if (typeof e.radius != "number")
        throw new T('drawCircle() requires property "radius".');
      e.radius !== 0 &&
        yi(
          Object.assign({}, e, {
            radiusX: e.radius,
            radiusY: e.radius,
            angle: 0,
          })
        );
    }
    a(Xe, "drawCircle");
    function yi(e) {
      if (e.radiusX === void 0 || e.radiusY === void 0)
        throw new T(
          'drawEllipse() requires properties "radiusX" and "radiusY".'
        );
      if (e.radiusX === 0 || e.radiusY === 0) return;
      let i = e.start ?? 0,
        s = e.end ?? 360,
        r = $e(e.anchor ?? "center").scale(new x(-e.radiusX, -e.radiusY)),
        o = ut(r, e.radiusX, e.radiusY, i, s, e.resolution);
      o.unshift(r);
      let l = Object.assign({}, e, {
        pts: o,
        radius: 0,
        ...(e.gradient
          ? {
              colors: [
                e.gradient[0],
                ...Array(o.length - 1).fill(e.gradient[1]),
              ],
            }
          : {}),
      });
      if (s - i >= 360 && e.outline) {
        e.fill !== !1 && Ge(Object.assign(l, { outline: null })),
          Ge(Object.assign(l, { pts: o.slice(1), fill: !1 }));
        return;
      }
      Ge(l);
    }
    a(yi, "drawEllipse");
    function Ge(e) {
      if (!e.pts) throw new T('drawPolygon() requires property "pts".');
      let i = e.pts.length;
      if (!(i < 3)) {
        if (
          (G(), d(e.pos), V(e.scale), S(e.angle), d(e.offset), e.fill !== !1)
        ) {
          let s = e.color ?? _.WHITE,
            r = e.pts.map((l, f) => ({
              pos: new x(l.x, l.y),
              uv: new x(0, 0),
              color: e.colors ? e.colors[f] ?? s : s,
              opacity: e.opacity ?? 1,
            })),
            o = [...Array(i - 2).keys()].map((l) => [0, l + 1, l + 2]).flat();
          se(r, e.indices ?? o, e.fixed, A.defTex, e.shader, e.uniform);
        }
        e.outline &&
          wi({
            pts: [...e.pts, e.pts[0]],
            radius: e.radius,
            width: e.outline.width,
            color: e.outline.color,
            join: e.outline.join,
            uniform: e.uniform,
            fixed: e.fixed,
            opacity: e.opacity,
          }),
          K();
      }
    }
    a(Ge, "drawPolygon");
    function Vi(e, i, s) {
      he(),
        h.clear(h.STENCIL_BUFFER_BIT),
        h.enable(h.STENCIL_TEST),
        h.stencilFunc(h.NEVER, 1, 255),
        h.stencilOp(h.REPLACE, h.REPLACE, h.REPLACE),
        i(),
        he(),
        h.stencilFunc(s, 1, 255),
        h.stencilOp(h.KEEP, h.KEEP, h.KEEP),
        e(),
        he(),
        h.disable(h.STENCIL_TEST);
    }
    a(Vi, "drawStenciled");
    function vi(e, i) {
      Vi(e, i, h.EQUAL);
    }
    a(vi, "drawMasked");
    function xi(e, i) {
      Vi(e, i, h.NOTEQUAL);
    }
    a(xi, "drawSubtracted");
    function Ei() {
      return (A.viewport.width + A.viewport.height) / (A.width + A.height);
    }
    a(Ei, "getViewportScale");
    function Ce(e) {
      he();
      let i = A.width,
        s = A.height;
      (A.width = A.viewport.width),
        (A.height = A.viewport.height),
        e(),
        he(),
        (A.width = i),
        (A.height = s);
    }
    a(Ce, "drawUnscaled");
    function Si(e, i) {
      i.pos && (e.pos = e.pos.add(i.pos)),
        i.scale && (e.scale = e.scale.scale(R(i.scale))),
        i.angle && (e.angle += i.angle),
        i.color && (e.color = e.color.mult(i.color)),
        i.opacity && (e.opacity *= i.opacity);
    }
    a(Si, "applyCharTransform");
    let pn = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
    function fn(e) {
      let i = {},
        s = e.replace(pn, "$2"),
        r = 0;
      for (let o of e.matchAll(pn)) {
        let l = o.index - r;
        for (let f = 0; f < o.groups.text.length; f++)
          i[f + l] = [o.groups.style];
        r += o[0].length - o.groups.text.length;
      }
      return { charStyleMap: i, text: s };
    }
    a(fn, "compileStyledText");
    let bi = {};
    function Oe(e) {
      if (e.text === void 0)
        throw new T('formatText() requires property "text".');
      let i = je(e.font);
      if (e.text === "" || i instanceof ne || !i)
        return { width: 0, height: 0, chars: [], opt: e };
      let { charStyleMap: s, text: r } = fn(e.text + ""),
        o = r.split("");
      if (i instanceof et || typeof i == "string") {
        let j = i instanceof et ? i.fontface.family : i,
          Q =
            i instanceof et
              ? { outline: i.outline, filter: i.filter }
              : { outline: null, filter: zi },
          L = bi[j] ?? {
            font: {
              tex: new H(Cs, Ns, { filter: Q.filter }),
              map: {},
              size: Fs,
            },
            cursor: new x(0),
            outline: Q.outline,
          };
        bi[j] || (bi[j] = L), (i = L.font);
        for (let ue of o)
          if (!L.font.map[ue]) {
            let v = ee;
            v.clearRect(0, 0, J.width, J.height),
              (v.font = `${i.size}px ${j}`),
              (v.textBaseline = "top"),
              (v.textAlign = "left"),
              (v.fillStyle = "#ffffff");
            let F = v.measureText(ue),
              P = Math.ceil(F.width),
              I = i.size;
            L.outline &&
              ((v.lineJoin = "round"),
              (v.lineWidth = L.outline.width * 2),
              (v.strokeStyle = L.outline.color.toHex()),
              v.strokeText(ue, L.outline.width, L.outline.width),
              (P += L.outline.width * 2),
              (I += L.outline.width * 3)),
              v.fillText(ue, L.outline?.width ?? 0, L.outline?.width ?? 0);
            let z = v.getImageData(0, 0, P, I);
            if (
              L.cursor.x + P > Cs &&
              ((L.cursor.x = 0), (L.cursor.y += I), L.cursor.y > Ns)
            )
              throw new T("Font atlas exceeds character limit");
            i.tex.update(z, L.cursor.x, L.cursor.y),
              (i.map[ue] = new ce(L.cursor.x, L.cursor.y, P, I)),
              (L.cursor.x += P);
          }
      }
      let l = e.size || i.size,
        f = R(e.scale ?? 1).scale(l / i.size),
        g = e.lineSpacing ?? 0,
        p = e.letterSpacing ?? 0,
        u = 0,
        w = 0,
        b = 0,
        B = [],
        D = [],
        Y = 0,
        C = null,
        U = null;
      for (; Y < o.length; ) {
        let j = o[Y];
        if (
          j ===
          `
`
        )
          (b += l + g),
            B.push({ width: u - p, chars: D }),
            (C = null),
            (U = null),
            (u = 0),
            (D = []);
        else {
          let Q = i.map[j];
          if (Q) {
            let L = Q.w * f.x;
            e.width &&
              u + L > e.width &&
              ((b += l + g),
              C != null &&
                ((Y -= D.length - C),
                (j = o[Y]),
                (Q = i.map[j]),
                (L = Q.w * f.x),
                (D = D.slice(0, C - 1)),
                (u = U)),
              (C = null),
              (U = null),
              B.push({ width: u - p, chars: D }),
              (u = 0),
              (D = [])),
              D.push({
                tex: i.tex,
                width: Q.w,
                height: Q.h,
                quad: new ce(
                  Q.x / i.tex.width,
                  Q.y / i.tex.height,
                  Q.w / i.tex.width,
                  Q.h / i.tex.height
                ),
                ch: j,
                pos: new x(u, b),
                opacity: e.opacity ?? 1,
                color: e.color ?? _.WHITE,
                scale: R(f),
                angle: 0,
              }),
              j === " " && ((C = D.length), (U = u)),
              (u += L),
              (w = Math.max(w, u)),
              (u += p);
          }
        }
        Y++;
      }
      B.push({ width: u - p, chars: D }), (b += l), e.width && (w = e.width);
      let ve = [];
      for (let j of B) {
        let Q = (w - j.width) * sr(e.align ?? "left");
        for (let L of j.chars) {
          let ue = i.map[L.ch],
            v = ve.length;
          if (
            ((L.pos = L.pos.add(Q, 0).add(ue.w * f.x * 0.5, ue.h * f.y * 0.5)),
            e.transform)
          ) {
            let F =
              typeof e.transform == "function"
                ? e.transform(v, L.ch)
                : e.transform;
            F && Si(L, F);
          }
          if (s[v]) {
            let F = s[v];
            for (let P of F) {
              let I = e.styles[P],
                z = typeof I == "function" ? I(v, L.ch) : I;
              z && Si(L, z);
            }
          }
          ve.push(L);
        }
      }
      return { width: w, height: b, chars: ve, opt: e };
    }
    a(Oe, "formatText");
    function Ri(e) {
      qe(Oe(e));
    }
    a(Ri, "drawText");
    function qe(e) {
      G(),
        d(e.opt.pos),
        S(e.opt.angle),
        d(
          $e(e.opt.anchor ?? "topleft")
            .add(1, 1)
            .scale(e.width, e.height)
            .scale(-0.5)
        ),
        e.chars.forEach((i) => {
          xe({
            tex: i.tex,
            width: i.width,
            height: i.height,
            pos: i.pos,
            scale: i.scale,
            angle: i.angle,
            color: i.color,
            opacity: i.opacity,
            quad: i.quad,
            anchor: "center",
            uniform: e.opt.uniform,
            shader: e.opt.shader,
            fixed: e.opt.fixed,
          });
        }),
        K();
    }
    a(qe, "drawFormattedText");
    function fe() {
      return A.width;
    }
    a(fe, "width");
    function ge() {
      return A.height;
    }
    a(ge, "height");
    let pt = {};
    function gn(e) {
      return new x(
        ((e.x - A.viewport.x) * fe()) / A.viewport.width,
        ((e.y - A.viewport.y) * ge()) / A.viewport.height
      );
    }
    a(gn, "windowToContent");
    function mn(e) {
      return new x(
        (e.x * A.viewport.width) / A.width,
        (e.y * A.viewport.height) / A.height
      );
    }
    a(mn, "contentToView");
    function Lt() {
      return gn(E.mousePos());
    }
    a(Lt, "mousePos"),
      (pt.error = (e) => {
        e.error && e.error instanceof T ? ri(e.error) : e instanceof T && ri(e);
      }),
      (pt.unhandledrejection = (e) => {
        e.reason instanceof T && ri(e.reason);
      });
    for (let e in pt) window.addEventListener(e, pt[e]);
    let wn = !1,
      ie = {
        inspect: !1,
        timeScale: 1,
        showLog: !0,
        fps: () => E.fps(),
        numFrames: () => E.numFrames(),
        stepFrame: Oi,
        drawCalls: () => A.drawCalls,
        clearLog: () => (M.logs = []),
        log: (e) => {
          let i = n.logMax ?? Or;
          M.logs.unshift({ msg: e, time: E.time() }),
            M.logs.length > i && (M.logs = M.logs.slice(0, i));
        },
        error: (e) => ie.log(new T(e.toString ? e.toString() : e)),
        curRecording: null,
        numObjects: () => Li("*", { recursive: !0 }).length,
        get paused() {
          return wn;
        },
        set paused(e) {
          (wn = e), e ? te.ctx.suspend() : te.ctx.resume();
        },
      };
    function Ve() {
      return E.dt() * ie.timeScale;
    }
    a(Ve, "dt");
    function An(...e) {
      return (
        e.length > 0 && (M.cam.pos = R(...e)),
        M.cam.pos ? M.cam.pos.clone() : Yt()
      );
    }
    a(An, "camPos");
    function yn(...e) {
      return e.length > 0 && (M.cam.scale = R(...e)), M.cam.scale.clone();
    }
    a(yn, "camScale");
    function Vn(e) {
      return e !== void 0 && (M.cam.angle = e), M.cam.angle;
    }
    a(Vn, "camRot");
    function vn(e = 12) {
      M.cam.shake += e;
    }
    a(vn, "shake");
    function Mi(e) {
      return M.cam.transform.multVec2(e);
    }
    a(Mi, "toScreen");
    function Bi(e) {
      return M.cam.transform.invert().multVec2(e);
    }
    a(Bi, "toWorld");
    function Gt(e) {
      let i = new Me();
      return (
        e.pos && i.translate(e.pos),
        e.scale && i.scale(e.scale),
        e.angle && i.rotate(e.angle),
        e.parent ? i.mult(e.parent.transform) : i
      );
    }
    a(Gt, "calcTransform");
    function ei(e = []) {
      let i = new Map(),
        s = {},
        r = new Xt(),
        o = [],
        l = null,
        f = !1,
        g = {
          id: Rr(),
          hidden: !1,
          transform: new Me(),
          children: [],
          parent: null,
          set paused(u) {
            if (u !== f) {
              f = u;
              for (let w of o) w.paused = u;
            }
          },
          get paused() {
            return f;
          },
          add(u = []) {
            let w = Array.isArray(u) ? ei(u) : u;
            if (w.parent)
              throw new T("Cannot add a game obj that already has a parent.");
            return (
              (w.parent = this),
              (w.transform = Gt(w)),
              this.children.push(w),
              w.trigger("add", w),
              M.events.trigger("add", w),
              w
            );
          },
          readd(u) {
            let w = this.children.indexOf(u);
            return (
              w !== -1 && (this.children.splice(w, 1), this.children.push(u)), u
            );
          },
          remove(u) {
            let w = this.children.indexOf(u);
            if (w !== -1) {
              (u.parent = null), this.children.splice(w, 1);
              let b = a((B) => {
                B.trigger("destroy"),
                  M.events.trigger("destroy", B),
                  B.children.forEach((D) => b(D));
              }, "trigger");
              b(u);
            }
          },
          removeAll(u) {
            if (u) this.get(u).forEach((w) => this.remove(w));
            else for (let w of [...this.children]) this.remove(w);
          },
          update() {
            this.paused ||
              (this.children
                .sort((u, w) => (u.z ?? 0) - (w.z ?? 0))
                .forEach((u) => u.update()),
              this.trigger("update"));
          },
          draw() {
            if (this.hidden) return;
            let u = A.fixed;
            this.fixed && (A.fixed = !0),
              G(),
              d(this.pos),
              V(this.scale),
              S(this.angle);
            let w = this.children.sort((b, B) => (b.z ?? 0) - (B.z ?? 0));
            if (this.mask) {
              let b = { intersect: vi, subtract: xi }[this.mask];
              if (!b) throw new T(`Invalid mask func: "${this.mask}"`);
              b(
                () => {
                  w.forEach((B) => B.draw());
                },
                () => {
                  this.trigger("draw");
                }
              );
            } else this.trigger("draw"), w.forEach((b) => b.draw());
            K(), (A.fixed = u);
          },
          drawInspect() {
            this.hidden ||
              (G(),
              d(this.pos),
              V(this.scale),
              S(this.angle),
              this.children
                .sort((u, w) => (u.z ?? 0) - (w.z ?? 0))
                .forEach((u) => u.drawInspect()),
              this.trigger("drawInspect"),
              K());
          },
          use(u) {
            if (!u) return;
            if (typeof u == "string") return this.use({ id: u });
            let w = [];
            u.id &&
              (this.unuse(u.id), (s[u.id] = []), (w = s[u.id]), i.set(u.id, u));
            for (let B in u) {
              if (Yr.has(B)) continue;
              let D = Object.getOwnPropertyDescriptor(u, B);
              if (
                (typeof D.value == "function" && (u[B] = u[B].bind(this)),
                D.set && Object.defineProperty(u, B, { set: D.set.bind(this) }),
                D.get && Object.defineProperty(u, B, { get: D.get.bind(this) }),
                jr.has(B))
              ) {
                let Y =
                  B === "add"
                    ? () => {
                        (l = a((C) => w.push(C), "onCurCompCleanup")),
                          u[B](),
                          (l = null);
                      }
                    : u[B];
                w.push(this.on(B, Y).cancel);
              } else if (this[B] === void 0)
                Object.defineProperty(this, B, {
                  get: () => u[B],
                  set: (Y) => (u[B] = Y),
                  configurable: !0,
                  enumerable: !0,
                }),
                  w.push(() => delete this[B]);
              else throw new T(`Duplicate component property: "${B}"`);
            }
            let b = a(() => {
              if (u.require) {
                for (let B of u.require)
                  if (!this.c(B))
                    throw new T(
                      `Component "${u.id}" requires component "${B}"`
                    );
              }
            }, "checkDeps");
            u.destroy && w.push(u.destroy.bind(this)),
              this.exists()
                ? (b(),
                  u.add &&
                    ((l = a((B) => w.push(B), "onCurCompCleanup")),
                    u.add.call(this),
                    (l = null)))
                : u.require && w.push(this.on("add", b).cancel);
          },
          unuse(u) {
            s[u] && (s[u].forEach((w) => w()), delete s[u]),
              i.has(u) && i.delete(u);
          },
          c(u) {
            return i.get(u);
          },
          get(u, w = {}) {
            let b = w.recursive
              ? this.children.flatMap(
                  a(function B(D) {
                    return [D, ...D.children.flatMap(B)];
                  }, "recurse")
                )
              : this.children;
            if (((b = b.filter((B) => (u ? B.is(u) : !0))), w.liveUpdate)) {
              let B = a(
                (D) => (w.recursive ? this.isAncestorOf(D) : D.parent === this),
                "isChild"
              );
              ti((D) => {
                B(D) && D.is(u) && b.push(D);
              }),
                Fi((D) => {
                  if (B(D) && D.is(u)) {
                    let Y = b.findIndex((C) => C.id === D.id);
                    Y !== -1 && b.splice(Y, 1);
                  }
                });
            }
            return b;
          },
          isAncestorOf(u) {
            return u.parent
              ? u.parent === this || this.isAncestorOf(u.parent)
              : !1;
          },
          exists() {
            return M.root.isAncestorOf(this);
          },
          is(u) {
            if (u === "*") return !0;
            if (Array.isArray(u)) {
              for (let w of u) if (!this.c(w)) return !1;
              return !0;
            } else return this.c(u) != null;
          },
          on(u, w) {
            let b = r.on(u, w.bind(this));
            return l && l(() => b.cancel()), b;
          },
          trigger(u, ...w) {
            r.trigger(u, ...w), M.objEvents.trigger(u, this, ...w);
          },
          destroy() {
            this.parent && this.parent.remove(this);
          },
          inspect() {
            let u = {};
            for (let [w, b] of i) u[w] = b.inspect ? b.inspect() : null;
            return u;
          },
          onAdd(u) {
            return this.on("add", u);
          },
          onUpdate(u) {
            return this.on("update", u);
          },
          onDraw(u) {
            return this.on("draw", u);
          },
          onDestroy(u) {
            return this.on("destroy", u);
          },
          clearEvents() {
            r.clear();
          },
        },
        p = [
          "onKeyPress",
          "onKeyPressRepeat",
          "onKeyDown",
          "onKeyRelease",
          "onMousePress",
          "onMouseDown",
          "onMouseRelease",
          "onMouseMove",
          "onCharInput",
          "onMouseMove",
          "onTouchStart",
          "onTouchMove",
          "onTouchEnd",
          "onScroll",
          "onGamepadButtonPress",
          "onGamepadButtonDown",
          "onGamepadButtonRelease",
          "onGamepadStick",
        ];
      for (let u of p)
        g[u] = (...w) => {
          let b = E[u](...w);
          return o.push(b), g.onDestroy(() => b.cancel()), b;
        };
      for (let u of e) g.use(u);
      return g;
    }
    a(ei, "make");
    function Ne(e, i, s) {
      return (
        M.objEvents[e] || (M.objEvents[e] = new Zs()),
        M.objEvents.on(e, (r, ...o) => {
          r.is(i) && s(r, ...o);
        })
      );
    }
    a(Ne, "on");
    let Ti = a((e, i) => {
        if (typeof e == "function" && i === void 0) {
          let s = jt([{ update: e }]);
          return {
            get paused() {
              return s.paused;
            },
            set paused(r) {
              s.paused = r;
            },
            cancel: () => s.destroy(),
          };
        } else if (typeof e == "string") return Ne("update", e, i);
      }, "onUpdate"),
      hr = a((e, i) => {
        if (typeof e == "function" && i === void 0) {
          let s = jt([{ draw: e }]);
          return {
            get paused() {
              return s.hidden;
            },
            set paused(r) {
              s.hidden = r;
            },
            cancel: () => s.destroy(),
          };
        } else if (typeof e == "string") return Ne("draw", e, i);
      }, "onDraw");
    function ti(e, i) {
      if (typeof e == "function" && i === void 0) return M.events.on("add", e);
      if (typeof e == "string") return Ne("add", e, i);
    }
    a(ti, "onAdd");
    function Fi(e, i) {
      if (typeof e == "function" && i === void 0)
        return M.events.on("destroy", e);
      if (typeof e == "string") return Ne("destroy", e, i);
    }
    a(Fi, "onDestroy");
    function xn(e, i, s) {
      return Ne("collide", e, (r, o, l) => o.is(i) && s(r, o, l));
    }
    a(xn, "onCollide");
    function En(e, i, s) {
      return Ne("collideUpdate", e, (r, o, l) => o.is(i) && s(r, o, l));
    }
    a(En, "onCollideUpdate");
    function Sn(e, i, s) {
      return Ne("collideEnd", e, (r, o, l) => o.is(i) && s(r, o, l));
    }
    a(Sn, "onCollideEnd");
    function Ot(e, i) {
      Li(e, { recursive: !0 }).forEach(i), ti(e, i);
    }
    a(Ot, "forAllCurrentAndFuture");
    function bn(e, i) {
      if (typeof e == "function") return E.onMousePress(e);
      {
        let s = [];
        return (
          Ot(e, (r) => {
            if (!r.area)
              throw new T(
                "onClick() requires the object to have area() component"
              );
            s.push(r.onClick(() => i(r)));
          }),
          mt.join(s)
        );
      }
    }
    a(bn, "onClick");
    function Rn(e, i) {
      let s = [];
      return (
        Ot(e, (r) => {
          if (!r.area)
            throw new T(
              "onHover() requires the object to have area() component"
            );
          s.push(r.onHover(() => i(r)));
        }),
        mt.join(s)
      );
    }
    a(Rn, "onHover");
    function Mn(e, i) {
      let s = [];
      return (
        Ot(e, (r) => {
          if (!r.area)
            throw new T(
              "onHoverUpdate() requires the object to have area() component"
            );
          s.push(r.onHoverUpdate(() => i(r)));
        }),
        mt.join(s)
      );
    }
    a(Mn, "onHoverUpdate");
    function Bn(e, i) {
      let s = [];
      return (
        Ot(e, (r) => {
          if (!r.area)
            throw new T(
              "onHoverEnd() requires the object to have area() component"
            );
          s.push(r.onHoverEnd(() => i(r)));
        }),
        mt.join(s)
      );
    }
    a(Bn, "onHoverEnd");
    function qt(e, i) {
      let s = 0,
        r = [];
      i && r.push(i);
      let o = Ti(() => {
        (s += Ve()), s >= e && (o.cancel(), r.forEach((l) => l()));
      });
      return {
        paused: o.paused,
        cancel: o.cancel,
        onEnd(l) {
          r.push(l);
        },
        then(l) {
          return this.onEnd(l), this;
        },
      };
    }
    a(qt, "wait");
    function Tn(e, i) {
      let s = null,
        r = a(() => {
          (s = qt(e, r)), i();
        }, "newAction");
      return (
        (s = qt(0, r)),
        {
          get paused() {
            return s.paused;
          },
          set paused(o) {
            s.paused = o;
          },
          cancel: () => s.cancel(),
        }
      );
    }
    a(Tn, "loop");
    function Pi() {
      E.onKeyPress("f1", () => {
        ie.inspect = !ie.inspect;
      }),
        E.onKeyPress("f2", () => {
          ie.clearLog();
        }),
        E.onKeyPress("f8", () => {
          ie.paused = !ie.paused;
        }),
        E.onKeyPress("f7", () => {
          ie.timeScale = ft(ke(ie.timeScale - 0.2, 0, 2), 1);
        }),
        E.onKeyPress("f9", () => {
          ie.timeScale = ft(ke(ie.timeScale + 0.2, 0, 2), 1);
        }),
        E.onKeyPress("f10", () => {
          ie.stepFrame();
        });
    }
    a(Pi, "enterDebugMode");
    function Ci() {
      E.onKeyPress("b", () => Qe());
    }
    a(Ci, "enterBurpMode");
    function Fn(e) {
      M.gravity = e;
    }
    a(Fn, "setGravity");
    function Pn() {
      return M.gravity;
    }
    a(Pn, "getGravity");
    function Cn(...e) {
      e.length === 1 || e.length === 2
        ? ((A.bgColor = $(e[0])), e[1] && (A.bgAlpha = e[1]))
        : (e.length === 3 || e.length === 4) &&
          ((A.bgColor = $(e[0], e[1], e[2])), e[3] && (A.bgAlpha = e[3])),
        h.clearColor(
          A.bgColor.r / 255,
          A.bgColor.g / 255,
          A.bgColor.b / 255,
          A.bgAlpha
        );
    }
    a(Cn, "setBackground");
    function Nn() {
      return A.bgColor.clone();
    }
    a(Nn, "getBackground");
    function Kt(...e) {
      return {
        id: "pos",
        pos: R(...e),
        moveBy(...i) {
          this.pos = this.pos.add(R(...i));
        },
        move(...i) {
          this.moveBy(R(...i).scale(Ve()));
        },
        moveTo(...i) {
          if (typeof i[0] == "number" && typeof i[1] == "number")
            return this.moveTo(R(i[0], i[1]), i[2]);
          let s = i[0],
            r = i[1];
          if (r === void 0) {
            this.pos = R(s);
            return;
          }
          let o = s.sub(this.pos);
          if (o.len() <= r * Ve()) {
            this.pos = R(s);
            return;
          }
          this.move(o.unit().scale(r));
        },
        worldPos() {
          return this.parent
            ? this.parent.transform.multVec2(this.pos)
            : this.pos;
        },
        screenPos() {
          let i = this.worldPos();
          return gt(this) ? i : Mi(i);
        },
        inspect() {
          return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
        },
        drawInspect() {
          Xe({ color: $(255, 0, 0), radius: 4 / Ei() });
        },
      };
    }
    a(Kt, "pos");
    function Ht(...e) {
      return e.length === 0
        ? Ht(1)
        : {
            id: "scale",
            scale: R(...e),
            scaleTo(...i) {
              this.scale = R(...i);
            },
            scaleBy(...i) {
              this.scale.scale(R(...i));
            },
            inspect() {
              return `(${ft(this.scale.x, 2)}, ${ft(this.scale.y, 2)})`;
            },
          };
    }
    a(Ht, "scale");
    function Dn(e) {
      return {
        id: "rotate",
        angle: e ?? 0,
        rotateBy(i) {
          this.angle += i;
        },
        rotateTo(i) {
          this.angle = i;
        },
        inspect() {
          return `${Math.round(this.angle)}`;
        },
      };
    }
    a(Dn, "rotate");
    function In(...e) {
      return {
        id: "color",
        color: $(...e),
        inspect() {
          return this.color.toString();
        },
      };
    }
    a(In, "color");
    function ft(e, i) {
      return Number(e.toFixed(i));
    }
    a(ft, "toFixed");
    function kn(e) {
      return {
        id: "opacity",
        opacity: e ?? 1,
        inspect() {
          return `${ft(this.opacity, 1)}`;
        },
        fadeOut(i = 1, s = zt.linear) {
          return oi(this.opacity, 0, i, (r) => (this.opacity = r), s);
        },
      };
    }
    a(kn, "opacity");
    function ii(e) {
      if (!e) throw new T("Please define an anchor");
      return {
        id: "anchor",
        anchor: e,
        inspect() {
          return typeof this.anchor == "string"
            ? this.anchor
            : this.anchor.toString();
        },
      };
    }
    a(ii, "anchor");
    function Un(e) {
      return {
        id: "z",
        z: e,
        inspect() {
          return `${this.z}`;
        },
      };
    }
    a(Un, "z");
    function Ln(e, i) {
      return {
        id: "follow",
        require: ["pos"],
        follow: { obj: e, offset: i ?? R(0) },
        add() {
          e.exists() &&
            (this.pos = this.follow.obj.pos.add(this.follow.offset));
        },
        update() {
          e.exists() &&
            (this.pos = this.follow.obj.pos.add(this.follow.offset));
        },
      };
    }
    a(Ln, "follow");
    function Gn(e, i) {
      let s = typeof e == "number" ? x.fromAngle(e) : e.unit();
      return {
        id: "move",
        require: ["pos"],
        update() {
          this.move(s.scale(i));
        },
      };
    }
    a(Gn, "move");
    let ur = 200;
    function On(e = {}) {
      let i = e.distance ?? ur,
        s = !1;
      return {
        id: "offscreen",
        require: ["pos"],
        isOffScreen() {
          let r = this.screenPos(),
            o = new me(R(0), fe(), ge());
          return !Wt(o, r) && o.sdistToPoint(r) > i * i;
        },
        onExitScreen(r) {
          return this.on("exitView", r);
        },
        onEnterScreen(r) {
          return this.on("enterView", r);
        },
        update() {
          this.isOffScreen()
            ? (s || (this.trigger("exitView"), (s = !0)),
              e.hide && (this.hidden = !0),
              e.pause && (this.paused = !0),
              e.destroy && this.destroy())
            : (s && (this.trigger("enterView"), (s = !1)),
              e.hide && (this.hidden = !1),
              e.pause && (this.paused = !1));
        },
      };
    }
    a(On, "offscreen");
    function gt(e) {
      return e.fixed ? !0 : e.parent ? gt(e.parent) : !1;
    }
    a(gt, "isFixed");
    function qn(e = {}) {
      let i = {},
        s = new Set();
      return {
        id: "area",
        collisionIgnore: e.collisionIgnore ?? [],
        add() {
          this.area.cursor && this.onHover(() => E.setCursor(this.area.cursor)),
            this.onCollideUpdate((r, o) => {
              i[r.id] || this.trigger("collide", r, o),
                (i[r.id] = o),
                s.add(r.id);
            });
        },
        update() {
          for (let r in i)
            s.has(Number(r)) ||
              (this.trigger("collideEnd", i[r].target), delete i[r]);
          s.clear();
        },
        drawInspect() {
          let r = this.localArea();
          G(), V(this.area.scale), d(this.area.offset);
          let o = {
            outline: { width: 4 / Ei(), color: $(0, 0, 255) },
            anchor: this.anchor,
            fill: !1,
            fixed: gt(this),
          };
          r instanceof me
            ? ye({ ...o, pos: r.pos, width: r.width, height: r.height })
            : r instanceof di
            ? Ge({ ...o, pts: r.pts })
            : r instanceof xs && Xe({ ...o, pos: r.center, radius: r.radius }),
            K();
        },
        area: {
          shape: e.shape ?? null,
          scale: e.scale ? R(e.scale) : R(1),
          offset: e.offset ?? R(0),
          cursor: e.cursor ?? null,
        },
        isClicked() {
          return E.isMousePressed() && this.isHovering();
        },
        isHovering() {
          let r = gt(this) ? Lt() : Bi(Lt());
          return this.hasPoint(r);
        },
        checkCollision(r) {
          return i[r.id] ?? null;
        },
        getCollisions() {
          return Object.values(i);
        },
        isColliding(r) {
          return !!i[r.id];
        },
        isOverlapping(r) {
          let o = i[r.id];
          return o && o.hasOverlap();
        },
        onClick(r) {
          let o = E.onMousePress("left", () => {
            this.isHovering() && r();
          });
          return this.onDestroy(() => o.cancel()), o;
        },
        onHover(r) {
          let o = !1;
          return this.onUpdate(() => {
            o ? (o = this.isHovering()) : this.isHovering() && ((o = !0), r());
          });
        },
        onHoverUpdate(r) {
          return this.onUpdate(() => {
            this.isHovering() && r();
          });
        },
        onHoverEnd(r) {
          let o = !1;
          return this.onUpdate(() => {
            o ? this.isHovering() || ((o = !1), r()) : (o = this.isHovering());
          });
        },
        onCollide(r, o) {
          if (typeof r == "function" && o === void 0)
            return this.on("collide", r);
          if (typeof r == "string")
            return this.onCollide((l, f) => {
              l.is(r) && o(l, f);
            });
        },
        onCollideUpdate(r, o) {
          if (typeof r == "function" && o === void 0)
            return this.on("collideUpdate", r);
          if (typeof r == "string")
            return this.on("collideUpdate", (l, f) => l.is(r) && o(l, f));
        },
        onCollideEnd(r, o) {
          if (typeof r == "function" && o === void 0)
            return this.on("collideEnd", r);
          if (typeof r == "string")
            return this.on("collideEnd", (l) => l.is(r) && o(l));
        },
        hasPoint(r) {
          return ln(this.worldArea(), r);
        },
        resolveCollision(r) {
          let o = this.checkCollision(r);
          o &&
            !o.resolved &&
            ((this.pos = this.pos.add(o.displacement)), (o.resolved = !0));
        },
        localArea() {
          return this.area.shape ? this.area.shape : this.renderArea();
        },
        worldArea() {
          let r = this.localArea();
          if (!(r instanceof di || r instanceof me))
            throw new T("Only support polygon and rect shapes for now");
          let o = this.transform
            .clone()
            .scale(R(this.area.scale ?? 1))
            .translate(this.area.offset);
          if (r instanceof me) {
            let l = $e(this.anchor || hi)
              .add(1, 1)
              .scale(-0.5)
              .scale(r.width, r.height);
            o.translate(l);
          }
          return r.transform(o);
        },
        screenArea() {
          let r = this.worldArea();
          return gt(this) ? r : r.transform(M.cam.transform);
        },
      };
    }
    a(qn, "area");
    function Je(e) {
      return {
        color: e.color,
        opacity: e.opacity,
        anchor: e.anchor,
        outline: e.outline,
        shader: e.shader,
        uniform: e.uniform,
      };
    }
    a(Je, "getRenderProps");
    function ni(e, i = {}) {
      let s = null,
        r = null,
        o = null,
        l = new be();
      if (!e) throw new T("Please pass the resource name or data to sprite()");
      let f = a((g, p, u, w) => {
        let b = R(1, 1);
        return (
          u && w
            ? ((b.x = u / (g.width * p.w)), (b.y = w / (g.height * p.h)))
            : u
            ? ((b.x = u / (g.width * p.w)), (b.y = b.x))
            : w && ((b.y = w / (g.height * p.h)), (b.x = b.y)),
          b
        );
      }, "calcTexScale");
      return {
        id: "sprite",
        width: 0,
        height: 0,
        frame: i.frame || 0,
        quad: i.quad || new ce(0, 0, 1, 1),
        animSpeed: i.animSpeed ?? 1,
        flipX: i.flipX ?? !1,
        flipY: i.flipY ?? !1,
        draw() {
          if (!s) return;
          let g = s.frames[this.frame ?? 0];
          if (!g) throw new T(`Frame not found: ${this.frame ?? 0}`);
          if (s.slice9) {
            let { left: p, right: u, top: w, bottom: b } = s.slice9,
              B = s.tex.width * g.w,
              D = s.tex.height * g.h,
              Y = this.width - p - u,
              C = this.height - w - b,
              U = p / B,
              ve = u / B,
              j = 1 - U - ve,
              Q = w / D,
              L = b / D,
              ue = 1 - Q - L,
              v = [
                oe(0, 0, U, Q),
                oe(U, 0, j, Q),
                oe(U + j, 0, ve, Q),
                oe(0, Q, U, ue),
                oe(U, Q, j, ue),
                oe(U + j, Q, ve, ue),
                oe(0, Q + ue, U, L),
                oe(U, Q + ue, j, L),
                oe(U + j, Q + ue, ve, L),
                oe(0, 0, p, w),
                oe(p, 0, Y, w),
                oe(p + Y, 0, u, w),
                oe(0, w, p, C),
                oe(p, w, Y, C),
                oe(p + Y, w, u, C),
                oe(0, w + C, p, b),
                oe(p, w + C, Y, b),
                oe(p + Y, w + C, u, b),
              ];
            for (let F = 0; F < 9; F++) {
              let P = v[F],
                I = v[F + 9];
              Se(
                Object.assign(Je(this), {
                  pos: I.pos(),
                  tex: s.tex,
                  quad: g.scale(P),
                  flipX: this.flipX,
                  flipY: this.flipY,
                  tiled: i.tiled,
                  width: I.w,
                  height: I.h,
                })
              );
            }
          } else
            Se(
              Object.assign(Je(this), {
                tex: s.tex,
                quad: g.scale(this.quad ?? new ce(0, 0, 1, 1)),
                flipX: this.flipX,
                flipY: this.flipY,
                tiled: i.tiled,
                width: this.width,
                height: this.height,
              })
            );
        },
        add() {
          let g = a((u) => {
              let w = u.frames[0].clone();
              i.quad && (w = w.scale(i.quad));
              let b = f(u.tex, w, i.width, i.height);
              (this.width = u.tex.width * w.w * b.x),
                (this.height = u.tex.height * w.h * b.y),
                i.anim && this.play(i.anim),
                (s = u),
                l.trigger(s);
            }, "setSpriteData"),
            p = Ye(e);
          p ? p.onLoad(g) : si(() => g(Ye(e).data));
        },
        update() {
          if (!r) return;
          let g = s.anims[r.name];
          if (typeof g == "number") {
            this.frame = g;
            return;
          }
          if (g.speed === 0) throw new T("Sprite anim speed cannot be 0");
          (r.timer += Ve() * this.animSpeed),
            r.timer >= 1 / r.speed &&
              ((r.timer = 0),
              (this.frame += o),
              (this.frame < Math.min(g.from, g.to) ||
                this.frame > Math.max(g.from, g.to)) &&
                (r.loop
                  ? r.pingpong
                    ? ((this.frame -= o), (o *= -1), (this.frame += o))
                    : (this.frame = g.from)
                  : ((this.frame = g.to), r.onEnd(), this.stop())));
        },
        play(g, p = {}) {
          if (!s) {
            l.add(() => this.play(g, p));
            return;
          }
          let u = s.anims[g];
          if (u === void 0) throw new T(`Anim not found: ${g}`);
          r && this.stop(),
            (r =
              typeof u == "number"
                ? {
                    name: g,
                    timer: 0,
                    loop: !1,
                    pingpong: !1,
                    speed: 0,
                    onEnd: () => {},
                  }
                : {
                    name: g,
                    timer: 0,
                    loop: p.loop ?? u.loop ?? !1,
                    pingpong: p.pingpong ?? u.pingpong ?? !1,
                    speed: p.speed ?? u.speed ?? 10,
                    onEnd: p.onEnd ?? (() => {}),
                  }),
            (o = typeof u == "number" ? null : u.from < u.to ? 1 : -1),
            (this.frame = typeof u == "number" ? u : u.from),
            this.trigger("animStart", g);
        },
        stop() {
          if (!r) return;
          let g = r.name;
          (r = null), this.trigger("animEnd", g);
        },
        numFrames() {
          return s?.frames.length ?? 0;
        },
        curAnim() {
          return r?.name;
        },
        onAnimEnd(g) {
          return this.on("animEnd", g);
        },
        onAnimStart(g) {
          return this.on("animStart", g);
        },
        renderArea() {
          return new me(R(0), this.width, this.height);
        },
        inspect() {
          if (typeof e == "string") return `"${e}"`;
        },
      };
    }
    a(ni, "sprite");
    function Kn(e, i = {}) {
      function s(o) {
        let l = Oe(
          Object.assign(Je(o), {
            text: o.text + "",
            size: o.textSize,
            font: o.font,
            width: i.width && o.width,
            align: o.align,
            letterSpacing: o.letterSpacing,
            lineSpacing: o.lineSpacing,
            transform: o.textTransform,
            styles: o.textStyles,
          })
        );
        return (
          i.width || (o.width = l.width / (o.scale?.x || 1)),
          (o.height = l.height / (o.scale?.y || 1)),
          l
        );
      }
      a(s, "update");
      let r = {
        id: "text",
        set text(o) {
          (e = o), s(this);
        },
        get text() {
          return e;
        },
        textSize: i.size ?? Lr,
        font: i.font,
        width: i.width ?? 0,
        height: 0,
        align: i.align,
        lineSpacing: i.lineSpacing,
        letterSpacing: i.letterSpacing,
        textTransform: i.transform,
        textStyles: i.styles,
        add() {
          si(() => s(this));
        },
        draw() {
          qe(s(this));
        },
        renderArea() {
          return new me(R(0), this.width, this.height);
        },
      };
      return s(r), r;
    }
    a(Kn, "text");
    function Hn(e, i, s = {}) {
      return {
        id: "rect",
        width: e,
        height: i,
        radius: s.radius || 0,
        draw() {
          ye(
            Object.assign(Je(this), {
              width: this.width,
              height: this.height,
              radius: this.radius,
            })
          );
        },
        renderArea() {
          return new me(R(0), this.width, this.height);
        },
        inspect() {
          return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
        },
      };
    }
    a(Hn, "rect");
    function Yn(e, i) {
      return {
        id: "rect",
        width: e,
        height: i,
        draw() {
          xe(
            Object.assign(Je(this), { width: this.width, height: this.height })
          );
        },
        renderArea() {
          return new me(R(0), this.width, this.height);
        },
        inspect() {
          return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
        },
      };
    }
    a(Yn, "uvquad");
    function jn(e) {
      return {
        id: "circle",
        radius: e,
        draw() {
          Xe(Object.assign(Je(this), { radius: this.radius }));
        },
        renderArea() {
          return new me(
            new x(this.anchor ? 0 : -this.radius),
            this.radius * 2,
            this.radius * 2
          );
        },
        inspect() {
          return `${Math.ceil(this.radius)}`;
        },
      };
    }
    a(jn, "circle");
    function Qn(e = 1, i = $(0, 0, 0)) {
      return { id: "outline", outline: { width: e, color: i } };
    }
    a(Qn, "outline");
    function Ni() {
      return {
        id: "timer",
        wait(e, i) {
          let s = [];
          i && s.push(i);
          let r = 0,
            o = this.onUpdate(() => {
              (r += Ve()), r >= e && (s.forEach((l) => l()), o.cancel());
            });
          return {
            get paused() {
              return o.paused;
            },
            set paused(l) {
              o.paused = l;
            },
            cancel: o.cancel,
            onEnd(l) {
              s.push(l);
            },
            then(l) {
              return this.onEnd(l), this;
            },
          };
        },
        loop(e, i) {
          let s = null,
            r = a(() => {
              (s = this.wait(e, r)), i();
            }, "newAction");
          return (
            (s = this.wait(0, r)),
            {
              get paused() {
                return s.paused;
              },
              set paused(o) {
                s.paused = o;
              },
              cancel: () => s.cancel(),
            }
          );
        },
        tween(e, i, s, r, o = zt.linear) {
          let l = 0,
            f = [],
            g = this.onUpdate(() => {
              l += Ve();
              let p = Math.min(l / s, 1);
              r(Te(e, i, o(p))),
                p === 1 && (g.cancel(), r(i), f.forEach((u) => u()));
            });
          return {
            get paused() {
              return g.paused;
            },
            set paused(p) {
              g.paused = p;
            },
            onEnd(p) {
              f.push(p);
            },
            then(p) {
              return this.onEnd(p), this;
            },
            cancel() {
              g.cancel();
            },
            finish() {
              g.cancel(), r(i), f.forEach((p) => p());
            },
          };
        },
      };
    }
    a(Ni, "timer");
    let dr = 640,
      cr = 65536;
    function zn(e = {}) {
      let i = R(0),
        s = null,
        r = null,
        o = !1;
      return {
        id: "body",
        require: ["pos", "area"],
        jumpForce: e.jumpForce ?? dr,
        gravityScale: e.gravityScale ?? 1,
        isStatic: e.isStatic ?? !1,
        mass: e.mass ?? 1,
        add() {
          if (this.mass === 0) throw new T("Can't set body mass to 0");
          this.onCollideUpdate((l, f) => {
            if (
              l.is("body") &&
              !f.resolved &&
              (this.trigger("beforePhysicsResolve", f),
              l.trigger("beforePhysicsResolve", f.reverse()),
              !f.resolved && !(this.isStatic && l.isStatic))
            ) {
              if (!this.isStatic && !l.isStatic) {
                let g = this.mass + l.mass;
                (this.pos = this.pos.add(f.displacement.scale(l.mass / g))),
                  (l.pos = l.pos.add(f.displacement.scale(-this.mass / g))),
                  (this.transform = Gt(this)),
                  (l.transform = Gt(l));
              } else {
                let g = !this.isStatic && l.isStatic ? f : f.reverse();
                (g.source.pos = g.source.pos.add(g.displacement)),
                  (g.source.transform = Gt(g.source));
              }
              (f.resolved = !0),
                this.trigger("physicsResolve", f),
                l.trigger("physicsResolve", f.reverse());
            }
          }),
            this.onPhysicsResolve((l) => {
              M.gravity &&
                (l.isBottom() && this.isFalling()
                  ? ((i.y = 0),
                    (s = l.target),
                    (r = l.target.pos),
                    o ? (o = !1) : this.trigger("ground", s))
                  : l.isTop() &&
                    this.isJumping() &&
                    ((i.y = 0), this.trigger("headbutt", l.target)));
            });
        },
        update() {
          if (!M.gravity || this.isStatic) return;
          if (
            (o && ((s = null), (r = null), this.trigger("fallOff"), (o = !1)),
            s)
          )
            if (!this.isOverlapping(s) || !s.exists() || !s.is("body")) o = !0;
            else {
              !s.pos.eq(r) &&
                e.stickToPlatform !== !1 &&
                this.moveBy(s.pos.sub(r)),
                (r = s.pos);
              return;
            }
          let l = i.y;
          (i.y += M.gravity * this.gravityScale * Ve()),
            (i.y = Math.min(i.y, e.maxVelocity ?? cr)),
            l < 0 && i.y >= 0 && this.trigger("fall"),
            this.move(i);
        },
        onPhysicsResolve(l) {
          return this.on("physicsResolve", l);
        },
        onBeforePhysicsResolve(l) {
          return this.on("beforePhysicsResolve", l);
        },
        curPlatform() {
          return s;
        },
        isGrounded() {
          return s !== null;
        },
        isFalling() {
          return i.y > 0;
        },
        isJumping() {
          return i.y < 0;
        },
        jump(l) {
          (s = null), (r = null), (i.y = -l || -this.jumpForce);
        },
        onGround(l) {
          return this.on("ground", l);
        },
        onFall(l) {
          return this.on("fall", l);
        },
        onFallOff(l) {
          return this.on("fallOff", l);
        },
        onHeadbutt(l) {
          return this.on("headbutt", l);
        },
      };
    }
    a(zn, "body");
    function Xn(e = 2) {
      let i = e;
      return {
        id: "doubleJump",
        require: ["body"],
        numJumps: e,
        add() {
          this.onGround(() => {
            i = this.numJumps;
          });
        },
        doubleJump(s) {
          i <= 0 ||
            (i < this.numJumps && this.trigger("doubleJump"),
            i--,
            this.jump(s));
        },
        onDoubleJump(s) {
          return this.on("doubleJump", s);
        },
        inspect() {
          return `${i}`;
        },
      };
    }
    a(Xn, "doubleJump");
    function Jn(e, i) {
      return {
        id: "shader",
        shader: e,
        ...(typeof i == "function"
          ? {
              uniform: i(),
              update() {
                this.uniform = i();
              },
            }
          : { uniform: i }),
      };
    }
    a(Jn, "shader");
    function Wn() {
      return { id: "fixed", fixed: !0 };
    }
    a(Wn, "fixed");
    function Di(e) {
      return { id: "stay", stay: !0, scenesToStay: e };
    }
    a(Di, "stay");
    function Zn(e) {
      if (e == null) throw new T("health() requires the initial amount of hp");
      let i = e;
      return {
        id: "health",
        hurt(s = 1) {
          this.setHP(e - s), this.trigger("hurt", s);
        },
        heal(s = 1) {
          this.setHP(e + s), this.trigger("heal", s);
        },
        hp() {
          return e;
        },
        maxHP() {
          return i;
        },
        setHP(s) {
          (e = s), e <= 0 && this.trigger("death");
        },
        onHurt(s) {
          return this.on("hurt", s);
        },
        onHeal(s) {
          return this.on("heal", s);
        },
        onDeath(s) {
          return this.on("death", s);
        },
        inspect() {
          return `${e}`;
        },
      };
    }
    a(Zn, "health");
    function $n(e, i = {}) {
      if (e == null) throw new T("lifespan() requires time");
      let s = i.fade ?? 0;
      return {
        id: "lifespan",
        async add() {
          await qt(e),
            s > 0 &&
              this.opacity &&
              (await oi(
                this.opacity,
                0,
                s,
                (r) => (this.opacity = r),
                zt.linear
              )),
            this.destroy();
        },
      };
    }
    a($n, "lifespan");
    function _n(e, i, s) {
      if (!e) throw new T("state() requires an initial state");
      let r = {};
      function o(p) {
        r[p] ||
          (r[p] = {
            enter: new be(),
            end: new be(),
            update: new be(),
            draw: new be(),
          });
      }
      a(o, "initStateEvents");
      function l(p, u, w) {
        return o(u), r[u][p].add(w);
      }
      a(l, "on");
      function f(p, u, ...w) {
        o(u), r[u][p].trigger(...w);
      }
      a(f, "trigger");
      let g = !1;
      return {
        id: "state",
        state: e,
        enterState(p, ...u) {
          if (((g = !0), i && !i.includes(p)))
            throw new T(`State not found: ${p}`);
          let w = this.state;
          if (s) {
            if (!s?.[w]) return;
            let b = typeof s[w] == "string" ? [s[w]] : s[w];
            if (!b.includes(p))
              throw new T(
                `Cannot transition state from "${w}" to "${p}". Available transitions: ${b
                  .map((B) => `"${B}"`)
                  .join(", ")}`
              );
          }
          f("end", w, ...u),
            (this.state = p),
            f("enter", p, ...u),
            f("enter", `${w} -> ${p}`, ...u);
        },
        onStateTransition(p, u, w) {
          return l("enter", `${p} -> ${u}`, w);
        },
        onStateEnter(p, u) {
          return l("enter", p, u);
        },
        onStateUpdate(p, u) {
          return l("update", p, u);
        },
        onStateDraw(p, u) {
          return l("draw", p, u);
        },
        onStateEnd(p, u) {
          return l("end", p, u);
        },
        update() {
          g || (f("enter", e), (g = !0)), f("update", this.state);
        },
        draw() {
          f("draw", this.state);
        },
        inspect() {
          return this.state;
        },
      };
    }
    a(_n, "state");
    function es(e = 1) {
      let i = 0,
        s = !1;
      return {
        require: ["opacity"],
        add() {
          this.opacity = 0;
        },
        update() {
          s ||
            ((i += Ve()),
            (this.opacity = gi(i, 0, e, 0, 1)),
            i >= e && ((this.opacity = 1), (s = !0)));
        },
      };
    }
    a(es, "fadeIn");
    function ts(e = "intersect") {
      return { id: "mask", mask: e };
    }
    a(ts, "mask");
    function si(e) {
      O.loaded ? e() : M.events.on("load", e);
    }
    a(si, "onLoad");
    function is(e, i) {
      M.scenes[e] = i;
    }
    a(is, "scene");
    function ns(e, ...i) {
      if (!M.scenes[e]) throw new T(`Scene not found: ${e}`);
      M.events.onOnce("frameEnd", () => {
        M.events.trigger("sceneLeave", e),
          E.events.clear(),
          M.events.clear(),
          M.objEvents.clear(),
          [...M.root.children].forEach((s) => {
            (!s.stay || (s.scenesToStay && !s.scenesToStay.includes(e))) &&
              M.root.remove(s);
          }),
          M.root.clearEvents(),
          (M.cam = {
            pos: null,
            scale: R(1),
            angle: 0,
            shake: 0,
            transform: new Me(),
          }),
          M.scenes[e](...i),
          n.debug !== !1 && Pi(),
          n.burp && Ci();
      });
    }
    a(ns, "go");
    function ss(e) {
      return M.events.on("sceneLeave", e);
    }
    a(ss, "onSceneLeave");
    function rs(e, i) {
      try {
        return JSON.parse(window.localStorage[e]);
      } catch {
        return i ? (Ii(e, i), i) : null;
      }
    }
    a(rs, "getData");
    function Ii(e, i) {
      window.localStorage[e] = JSON.stringify(i);
    }
    a(Ii, "setData");
    function ki(e, ...i) {
      let s = e(We),
        r;
      typeof s == "function" ? (r = s(...i)(We)) : (r = s);
      for (let o in r) (We[o] = r[o]), n.global !== !1 && (window[o] = r[o]);
      return We;
    }
    a(ki, "plug");
    function Yt() {
      return R(fe() / 2, ge() / 2);
    }
    a(Yt, "center");
    let pr;
    ((e) => (
      (e[(e.None = 0)] = "None"),
      (e[(e.Left = 1)] = "Left"),
      (e[(e.Top = 2)] = "Top"),
      (e[(e.LeftTop = 3)] = "LeftTop"),
      (e[(e.Right = 4)] = "Right"),
      (e[(e.Horizontal = 5)] = "Horizontal"),
      (e[(e.RightTop = 6)] = "RightTop"),
      (e[(e.HorizontalTop = 7)] = "HorizontalTop"),
      (e[(e.Bottom = 8)] = "Bottom"),
      (e[(e.LeftBottom = 9)] = "LeftBottom"),
      (e[(e.Vertical = 10)] = "Vertical"),
      (e[(e.LeftVertical = 11)] = "LeftVertical"),
      (e[(e.RightBottom = 12)] = "RightBottom"),
      (e[(e.HorizontalBottom = 13)] = "HorizontalBottom"),
      (e[(e.RightVertical = 14)] = "RightVertical"),
      (e[(e.All = 15)] = "All")
    ))((pr ||= {}));
    function Ui(e = {}) {
      let i = R(0),
        s = e.isObstacle ?? !1,
        r = e.cost ?? 0,
        o = e.edges ?? [],
        l = a(() => {
          let g = { left: 1, top: 2, right: 4, bottom: 8 };
          return o.map((p) => g[p] || 0).reduce((p, u) => p | u, 0);
        }, "getEdgeMask"),
        f = l();
      return {
        id: "tile",
        tilePosOffset: e.offset ?? R(0),
        set tilePos(g) {
          let p = this.getLevel();
          (i = g.clone()),
            (this.pos = R(
              this.tilePos.x * p.tileWidth(),
              this.tilePos.y * p.tileHeight()
            ).add(this.tilePosOffset));
        },
        get tilePos() {
          return i;
        },
        set isObstacle(g) {
          s !== g && ((s = g), this.getLevel().invalidateNavigationMap());
        },
        get isObstacle() {
          return s;
        },
        set cost(g) {
          r !== g && ((r = g), this.getLevel().invalidateNavigationMap());
        },
        get cost() {
          return r;
        },
        set edges(g) {
          (o = g), (f = l()), this.getLevel().invalidateNavigationMap();
        },
        get edges() {
          return o;
        },
        get edgeMask() {
          return f;
        },
        getLevel() {
          return this.parent;
        },
        moveLeft() {
          this.tilePos = this.tilePos.add(R(-1, 0));
        },
        moveRight() {
          this.tilePos = this.tilePos.add(R(1, 0));
        },
        moveUp() {
          this.tilePos = this.tilePos.add(R(0, -1));
        },
        moveDown() {
          this.tilePos = this.tilePos.add(R(0, 1));
        },
      };
    }
    a(Ui, "tile");
    function os(e, i) {
      if (!i.tileWidth || !i.tileHeight)
        throw new T("Must provide tileWidth and tileHeight.");
      let s = jt([Kt(i.pos ?? R(0))]),
        r = e.length,
        o = 0,
        l = null,
        f = null,
        g = null,
        p = null,
        u = a((v) => v.x + v.y * o, "tile2Hash"),
        w = a((v) => R(Math.floor(v % o), Math.floor(v / o)), "hash2Tile"),
        b = a(() => {
          l = [];
          for (let v of s.children) B(v);
        }, "createSpatialMap"),
        B = a((v) => {
          let F = u(v.tilePos);
          l[F] ? l[F].push(v) : (l[F] = [v]);
        }, "insertIntoSpatialMap"),
        D = a((v) => {
          let F = u(v.tilePos);
          if (l[F]) {
            let P = l[F].indexOf(v);
            P >= 0 && l[F].splice(P, 1);
          }
        }, "removeFromSpatialMap"),
        Y = a(() => {
          let v = !1;
          for (let F of s.children) {
            let P = s.pos2Tile(F.pos);
            (F.tilePos.x != P.x || F.tilePos.y != P.y) &&
              ((v = !0), D(F), (F.tilePos.x = P.x), (F.tilePos.y = P.y), B(F));
          }
          v && s.trigger("spatial_map_changed");
        }, "updateSpatialMap"),
        C = a(() => {
          let v = s.getSpatialMap(),
            F = s.numRows() * s.numColumns();
          f ? (f.length = F) : (f = new Array(F)), f.fill(1, 0, F);
          for (let P = 0; P < v.length; P++) {
            let I = v[P];
            if (I) {
              let z = 0;
              for (let Z of I)
                if (Z.isObstacle) {
                  z = 1 / 0;
                  break;
                } else z += Z.cost;
              f[P] = z || 1;
            }
          }
        }, "createCostMap"),
        U = a(() => {
          let v = s.getSpatialMap(),
            F = s.numRows() * s.numColumns();
          g ? (g.length = F) : (g = new Array(F)), g.fill(15, 0, F);
          for (let P = 0; P < v.length; P++) {
            let I = v[P];
            if (I) {
              let z = I.length,
                Z = 15;
              for (let re = 0; re < z; re++) Z |= I[re].edgeMask;
              g[P] = Z;
            }
          }
        }, "createEdgeMap"),
        ve = a(() => {
          let v = s.numRows() * s.numColumns(),
            F = a((I, z) => {
              let Z = [];
              for (Z.push(I); Z.length > 0; ) {
                let re = Z.pop();
                L(re).forEach((de) => {
                  p[de] < 0 && ((p[de] = z), Z.push(de));
                });
              }
            }, "traverse");
          p ? (p.length = v) : (p = new Array(v)), p.fill(-1, 0, v);
          let P = 0;
          for (let I = 0; I < f.length; I++) {
            if (p[I] >= 0) {
              P++;
              continue;
            }
            F(I, P), P++;
          }
        }, "createConnectivityMap"),
        j = a((v, F) => f[F], "getCost"),
        Q = a((v, F) => {
          let P = w(v),
            I = w(F);
          return P.dist(I);
        }, "getHeuristic"),
        L = a((v, F) => {
          let P = [],
            I = Math.floor(v % o),
            z = I > 0 && g[v] & 1 && f[v - 1] !== 1 / 0,
            Z = v >= o && g[v] & 2 && f[v - o] !== 1 / 0,
            re = I < o - 1 && g[v] & 4 && f[v + 1] !== 1 / 0,
            de = v < o * r - o - 1 && g[v] & 8 && f[v + o] !== 1 / 0;
          return (
            F
              ? (z &&
                  (Z && P.push(v - o - 1),
                  P.push(v - 1),
                  de && P.push(v + o - 1)),
                Z && P.push(v - o),
                re &&
                  (Z && P.push(v - o + 1),
                  P.push(v + 1),
                  de && P.push(v + o + 1)),
                de && P.push(v + o))
              : (z && P.push(v - 1),
                Z && P.push(v - o),
                re && P.push(v + 1),
                de && P.push(v + o)),
            P
          );
        }, "getNeighbours"),
        ue = {
          id: "level",
          tileWidth() {
            return i.tileWidth;
          },
          tileHeight() {
            return i.tileHeight;
          },
          spawn(v, ...F) {
            let P = R(...F),
              I = (() => {
                if (typeof v == "string") {
                  if (i.tiles[v]) {
                    if (typeof i.tiles[v] != "function")
                      throw new T(
                        "Level symbol def must be a function returning a component list"
                      );
                    return i.tiles[v](P);
                  } else if (i.wildcardTile) return i.wildcardTile(v, P);
                } else {
                  if (Array.isArray(v)) return v;
                  throw new T("Expected a symbol or a component list");
                }
              })();
            if (!I) return null;
            let z = !1,
              Z = !1;
            for (let de of I)
              de.id === "tile" && (Z = !0), de.id === "pos" && (z = !0);
            z || I.push(Kt()), Z || I.push(Ui());
            let re = s.add(I);
            return (
              z && (re.tilePosOffset = re.pos.clone()),
              (re.tilePos = P),
              l &&
                (B(re),
                this.trigger("spatial_map_changed"),
                this.trigger("navigation_map_invalid")),
              re
            );
          },
          numColumns() {
            return o;
          },
          numRows() {
            return r;
          },
          levelWidth() {
            return o * this.tileWidth();
          },
          levelHeight() {
            return r * this.tileHeight();
          },
          tile2Pos(...v) {
            return R(...v).scale(this.tileWidth(), this.tileHeight());
          },
          pos2Tile(...v) {
            let F = R(...v);
            return R(
              Math.floor(F.x / this.tileWidth()),
              Math.floor(F.y / this.tileHeight())
            );
          },
          getSpatialMap() {
            return l || b(), l;
          },
          onSpatialMapChanged(v) {
            return this.on("spatial_map_changed", v);
          },
          onNavigationMapInvalid(v) {
            return this.on("navigation_map_invalid", v);
          },
          getAt(v) {
            l || b();
            let F = u(v);
            return l[F] || [];
          },
          update() {
            l && Y();
          },
          invalidateNavigationMap() {
            (f = null), (g = null), (p = null);
          },
          onNavigationMapChanged(v) {
            return this.on("navigation_map_changed", v);
          },
          getTilePath(v, F, P = {}) {
            if (
              (f || C(),
              g || U(),
              p || ve(),
              v.x < 0 ||
                v.x >= o ||
                v.y < 0 ||
                v.y >= r ||
                F.x < 0 ||
                F.x >= o ||
                F.y < 0 ||
                F.y >= r)
            )
              return null;
            let I = u(v),
              z = u(F);
            if (f[z] === 1 / 0) return null;
            if (I === z) return [];
            if (p[I] != -1 && p[I] !== p[z]) return null;
            let Z = new Mr((De, ji) => De.cost < ji.cost);
            Z.insert({ cost: 0, node: I });
            let re = new Map();
            re.set(I, I);
            let de = new Map();
            for (de.set(I, 0); Z.length !== 0; ) {
              let De = Z.remove()?.node;
              if (De === z) break;
              let ji = L(De, P.allowDiagonals);
              for (let Ze of ji) {
                let Qi = (de.get(De) || 0) + j(De, Ze) + Q(Ze, z);
                (!de.has(Ze) || Qi < de.get(Ze)) &&
                  (de.set(Ze, Qi),
                  Z.insert({ cost: Qi, node: Ze }),
                  re.set(Ze, De));
              }
            }
            let Yi = [],
              Qt = z,
              Ar = w(Qt);
            for (Yi.push(Ar); Qt !== I; ) {
              Qt = re.get(Qt);
              let De = w(Qt);
              Yi.push(De);
            }
            return Yi.reverse();
          },
          getPath(v, F, P = {}) {
            let I = this.tileWidth(),
              z = this.tileHeight(),
              Z = this.getTilePath(this.pos2Tile(v), this.pos2Tile(F), P);
            return Z
              ? [
                  v,
                  ...Z.slice(1, -1).map((re) =>
                    re.scale(I, z).add(I / 2, z / 2)
                  ),
                  F,
                ]
              : null;
          },
        };
      return (
        s.use(ue),
        s.onNavigationMapInvalid(() => {
          s.invalidateNavigationMap(), s.trigger("navigation_map_changed");
        }),
        e.forEach((v, F) => {
          let P = v.split("");
          (o = Math.max(P.length, o)),
            P.forEach((I, z) => {
              s.spawn(I, R(z, F));
            });
        }),
        s
      );
    }
    a(os, "addLevel");
    function as(e = {}) {
      let i = null,
        s = null,
        r = null,
        o = null;
      return {
        id: "agent",
        require: ["pos", "tile"],
        agentSpeed: e.speed ?? 100,
        allowDiagonals: e.allowDiagonals ?? !0,
        getDistanceToTarget() {
          return i ? this.pos.dist(i) : 0;
        },
        getNextLocation() {
          return s && r ? s[r] : null;
        },
        getPath() {
          return s ? s.slice() : null;
        },
        getTarget() {
          return i;
        },
        isNavigationFinished() {
          return s ? r === null : !0;
        },
        isTargetReachable() {
          return s !== null;
        },
        isTargetReached() {
          return i ? this.pos.eq(i) : !0;
        },
        setTarget(l) {
          (i = l),
            (s = this.getLevel().getPath(this.pos, i, {
              allowDiagonals: this.allowDiagonals,
            })),
            (r = s ? 0 : null),
            s
              ? (o ||
                  ((o = this.getLevel().onNavigationMapChanged(() => {
                    s &&
                      r !== null &&
                      ((s = this.getLevel().getPath(this.pos, i, {
                        allowDiagonals: this.allowDiagonals,
                      })),
                      (r = s ? 0 : null),
                      s
                        ? this.trigger("navigation-next", this, s[r])
                        : this.trigger("navigation-ended", this));
                  })),
                  this.onDestroy(() => o.cancel())),
                this.trigger("navigation-started", this),
                this.trigger("navigation-next", this, s[r]))
              : this.trigger("navigation-ended", this);
        },
        update() {
          if (s && r !== null) {
            if (this.pos.sdist(s[r]) < 2)
              if (r === s.length - 1) {
                (this.pos = i.clone()),
                  (r = null),
                  this.trigger("navigation-ended", this),
                  this.trigger("target-reached", this);
                return;
              } else r++, this.trigger("navigation-next", this, s[r]);
            this.moveTo(s[r], this.agentSpeed);
          }
        },
        onNavigationStarted(l) {
          return this.on("navigation-started", l);
        },
        onNavigationNext(l) {
          return this.on("navigation-next", l);
        },
        onNavigationEnded(l) {
          return this.on("navigation-ended", l);
        },
        onTargetReached(l) {
          return this.on("target-reached", l);
        },
        inspect() {
          return JSON.stringify({
            target: JSON.stringify(i),
            path: JSON.stringify(s),
          });
        },
      };
    }
    a(as, "agent");
    function ls(e) {
      let i = E.canvas().captureStream(e),
        s = te.ctx.createMediaStreamDestination();
      te.masterNode.connect(s);
      let r = new MediaRecorder(i),
        o = [];
      return (
        (r.ondataavailable = (l) => {
          l.data.size > 0 && o.push(l.data);
        }),
        (r.onerror = () => {
          te.masterNode.disconnect(s), i.getTracks().forEach((l) => l.stop());
        }),
        r.start(),
        {
          resume() {
            r.resume();
          },
          pause() {
            r.pause();
          },
          stop() {
            return (
              r.stop(),
              te.masterNode.disconnect(s),
              i.getTracks().forEach((l) => l.stop()),
              new Promise((l) => {
                r.onstop = () => {
                  l(new Blob(o, { type: "video/mp4" }));
                };
              })
            );
          },
          download(l = "kaboom.mp4") {
            this.stop().then((f) => sn(l, f));
          },
        }
      );
    }
    a(ls, "record");
    function hs() {
      return document.activeElement === E.canvas();
    }
    a(hs, "isFocused");
    function us(e) {
      e.destroy();
    }
    a(us, "destroy");
    let jt = M.root.add.bind(M.root),
      fr = M.root.readd.bind(M.root),
      gr = M.root.removeAll.bind(M.root),
      Li = M.root.get.bind(M.root);
    function Gi(e = 2, i = 1) {
      let s = 0;
      return {
        id: "boom",
        require: ["scale"],
        update() {
          let r = Math.sin(s * e) * i;
          r < 0 && this.destroy(), (this.scale = R(r)), (s += Ve());
        },
      };
    }
    a(Gi, "boom");
    let mr = Pe(null, Dr),
      wr = Pe(null, Ir);
    function ds(e, i = {}) {
      let s = jt([Kt(e), Di()]),
        r = (i.speed || 1) * 5,
        o = i.scale || 1;
      s.add([ni(wr), Ht(0), ii("center"), Gi(r, o), ...(i.comps ?? [])]);
      let l = s.add([ni(mr), Ht(0), ii("center"), Ni(), ...(i.comps ?? [])]);
      return (
        l.wait(0.4 / r, () => l.use(Gi(r, o))),
        l.onDestroy(() => s.destroy()),
        s
      );
    }
    a(ds, "addKaboom");
    function Oi() {
      M.root.update();
    }
    a(Oi, "updateFrame");
    class qi {
      static {
        a(this, "Collision");
      }
      source;
      target;
      displacement;
      resolved = !1;
      constructor(i, s, r, o = !1) {
        (this.source = i),
          (this.target = s),
          (this.displacement = r),
          (this.resolved = o);
      }
      reverse() {
        return new qi(
          this.target,
          this.source,
          this.displacement.scale(-1),
          this.resolved
        );
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.x > 0;
      }
      isRight() {
        return this.displacement.x < 0;
      }
      isTop() {
        return this.displacement.y > 0;
      }
      isBottom() {
        return this.displacement.y < 0;
      }
      preventResolution() {
        this.resolved = !0;
      }
    }
    function cs() {
      let e = {},
        i = n.hashGridSize || Gr,
        s = new Me(),
        r = [];
      function o(l) {
        if (
          (r.push(s.clone()),
          l.pos && s.translate(l.pos),
          l.scale && s.scale(l.scale),
          l.angle && s.rotate(l.angle),
          (l.transform = s.clone()),
          l.c("area") && !l.paused)
        ) {
          let f = l,
            g = f.worldArea().bbox(),
            p = Math.floor(g.pos.x / i),
            u = Math.floor(g.pos.y / i),
            w = Math.ceil((g.pos.x + g.width) / i),
            b = Math.ceil((g.pos.y + g.height) / i),
            B = new Set();
          for (let D = p; D <= w; D++)
            for (let Y = u; Y <= b; Y++)
              if (!e[D]) (e[D] = {}), (e[D][Y] = [f]);
              else if (!e[D][Y]) e[D][Y] = [f];
              else {
                let C = e[D][Y];
                e: for (let U of C) {
                  if (U.paused || !U.exists() || B.has(U.id)) continue;
                  for (let j of f.collisionIgnore) if (U.is(j)) continue e;
                  for (let j of U.collisionIgnore) if (f.is(j)) continue e;
                  let ve = Ws(f.worldArea(), U.worldArea());
                  if (ve) {
                    let j = new qi(f, U, ve);
                    f.trigger("collideUpdate", U, j);
                    let Q = j.reverse();
                    (Q.resolved = j.resolved), U.trigger("collideUpdate", f, Q);
                  }
                  B.add(U.id);
                }
                C.push(f);
              }
        }
        l.children.forEach(o), (s = r.pop());
      }
      a(o, "checkObj"), o(M.root);
    }
    a(cs, "checkFrame");
    function ps() {
      let e = M.cam,
        i = x.fromAngle(Jt(0, 360)).scale(e.shake);
      (e.shake = Te(e.shake, 0, 5 * Ve())),
        (e.transform = new Me()
          .translate(Yt())
          .scale(e.scale)
          .rotate(e.angle)
          .translate((e.pos ?? Yt()).scale(-1).add(i))),
        M.root.draw(),
        he();
    }
    a(ps, "drawFrame");
    function fs() {
      let e = Ee();
      M.events.numListeners("loading") > 0
        ? M.events.trigger("loading", e)
        : Ce(() => {
            let i = fe() / 2,
              s = 24,
              r = R(fe() / 2, ge() / 2).sub(R(i / 2, s / 2));
            ye({ pos: R(0), width: fe(), height: ge(), color: $(0, 0, 0) }),
              ye({
                pos: r,
                width: i,
                height: s,
                fill: !1,
                outline: { width: 4 },
              }),
              ye({ pos: r, width: i * e, height: s });
          });
    }
    a(fs, "drawLoadScreen");
    function Ki(e, i) {
      Ce(() => {
        let s = R(8);
        G(), d(e);
        let r = Oe({
            text: i,
            font: ui,
            size: 16,
            pos: s,
            color: $(255, 255, 255),
            fixed: !0,
          }),
          o = r.width + s.x * 2,
          l = r.height + s.x * 2;
        e.x + o >= fe() && d(R(-o, 0)),
          e.y + l >= ge() && d(R(0, -l)),
          ye({
            width: o,
            height: l,
            color: $(0, 0, 0),
            radius: 4,
            opacity: 0.8,
            fixed: !0,
          }),
          qe(r),
          K();
      });
    }
    a(Ki, "drawInspectText");
    function gs() {
      if (ie.inspect) {
        let e = null;
        for (let i of M.root.get("*", { recursive: !0 }))
          if (i.c("area") && i.isHovering()) {
            e = i;
            break;
          }
        if ((M.root.drawInspect(), e)) {
          let i = [],
            s = e.inspect();
          for (let r in s) s[r] ? i.push(`${r}: ${s[r]}`) : i.push(`${r}`);
          Ki(
            mn(Lt()),
            i.join(`
`)
          );
        }
        Ki(R(8), `FPS: ${ie.fps()}`);
      }
      ie.paused &&
        Ce(() => {
          G(), d(fe(), 0), d(-8, 8);
          let e = 32;
          ye({
            width: e,
            height: e,
            anchor: "topright",
            color: $(0, 0, 0),
            opacity: 0.8,
            radius: 4,
            fixed: !0,
          });
          for (let i = 1; i <= 2; i++)
            ye({
              width: 4,
              height: e * 0.6,
              anchor: "center",
              pos: R((-e / 3) * i, e * 0.5),
              color: $(255, 255, 255),
              radius: 2,
              fixed: !0,
            });
          K();
        }),
        ie.timeScale !== 1 &&
          Ce(() => {
            G(), d(fe(), ge()), d(-8, -8);
            let e = 8,
              i = Oe({
                text: ie.timeScale.toFixed(1),
                font: ui,
                size: 16,
                color: $(255, 255, 255),
                pos: R(-e),
                anchor: "botright",
                fixed: !0,
              });
            ye({
              width: i.width + e * 2 + e * 4,
              height: i.height + e * 2,
              anchor: "botright",
              color: $(0, 0, 0),
              opacity: 0.8,
              radius: 4,
              fixed: !0,
            });
            for (let s = 0; s < 2; s++) {
              let r = ie.timeScale < 1;
              Ai({
                p1: R(-i.width - e * (r ? 2 : 3.5), -e),
                p2: R(-i.width - e * (r ? 2 : 3.5), -e - i.height),
                p3: R(-i.width - e * (r ? 3.5 : 2), -e - i.height / 2),
                pos: R(-s * e * 1 + (r ? -e * 0.5 : 0), 0),
                color: $(255, 255, 255),
                fixed: !0,
              });
            }
            qe(i), K();
          }),
        ie.curRecording &&
          Ce(() => {
            G(),
              d(0, ge()),
              d(24, -24),
              Xe({
                radius: 12,
                color: $(255, 0, 0),
                opacity: Zi(0, 1, E.time() * 4),
                fixed: !0,
              }),
              K();
          }),
        ie.showLog &&
          M.logs.length > 0 &&
          Ce(() => {
            G(), d(0, ge()), d(8, -8);
            let e = 8,
              i = [];
            for (let r of M.logs) {
              let o = "",
                l = r.msg instanceof Error ? "error" : "info";
              (o += `[time]${r.time.toFixed(2)}[/time]`),
                (o += " "),
                (o += `[${l}]${
                  r.msg?.toString ? r.msg.toString() : r.msg
                }[/${l}]`),
                i.push(o);
            }
            M.logs = M.logs.filter(
              (r) => E.time() - r.time < (n.logTime || qr)
            );
            let s = Oe({
              text: i.join(`
`),
              font: ui,
              pos: R(e, -e),
              anchor: "botleft",
              size: 16,
              width: fe() * 0.6,
              lineSpacing: e / 2,
              fixed: !0,
              styles: {
                time: { color: $(127, 127, 127) },
                info: { color: $(255, 255, 255) },
                error: { color: $(255, 0, 127) },
              },
            });
            ye({
              width: s.width + e * 2,
              height: s.height + e * 2,
              anchor: "botleft",
              color: $(0, 0, 0),
              radius: 4,
              opacity: 0.8,
              fixed: !0,
            }),
              qe(s),
              K();
          });
    }
    a(gs, "drawDebug"), n.debug !== !1 && Pi(), n.burp && Ci();
    function ms(e) {
      M.events.on("loading", e);
    }
    a(ms, "onLoading");
    function ws(e) {
      E.onResize(e);
    }
    a(ws, "onResize");
    function As(e) {
      M.events.on("error", e);
    }
    a(As, "onError");
    function ri(e) {
      te.ctx.suspend(),
        E.run(() => {
          Ce(() => {
            let i = fe(),
              s = ge(),
              r = {
                size: 36,
                width: i - 32 * 2,
                letterSpacing: 4,
                lineSpacing: 4,
                font: ui,
                fixed: !0,
              };
            ye({ width: i, height: s, color: $(0, 0, 255), fixed: !0 });
            let o = Oe({
              ...r,
              text: "Error",
              pos: R(32),
              color: $(255, 128, 0),
              fixed: !0,
            });
            qe(o),
              Ri({
                ...r,
                text: e.message,
                pos: R(32, 32 + o.height + 16),
                fixed: !0,
              }),
              K(),
              M.events.trigger("error", e);
          });
        });
    }
    a(ri, "handleErr");
    function ys(e) {
      W.push(e);
    }
    a(ys, "onCleanup");
    function Vs() {
      M.events.onOnce("frameEnd", () => {
        E.quit();
        for (let i in pt) window.removeEventListener(i, pt[i]);
        h.clear(h.COLOR_BUFFER_BIT | h.DEPTH_BUFFER_BIT | h.STENCIL_BUFFER_BIT);
        let e = h.getParameter(h.MAX_TEXTURE_IMAGE_UNITS);
        for (let i = 0; i < e; i++)
          h.activeTexture(h.TEXTURE0 + i),
            h.bindTexture(h.TEXTURE_2D, null),
            h.bindTexture(h.TEXTURE_CUBE_MAP, null);
        h.bindBuffer(h.ARRAY_BUFFER, null),
          h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, null),
          h.bindRenderbuffer(h.RENDERBUFFER, null),
          h.bindFramebuffer(h.FRAMEBUFFER, null),
          W.forEach((i) => i()),
          h.deleteBuffer(A.vbuf),
          h.deleteBuffer(A.ibuf);
      });
    }
    a(Vs, "quit");
    function oi(e, i, s, r, o = zt.linear) {
      let l = 0,
        f = [],
        g = Ti(() => {
          l += Ve();
          let p = Math.min(l / s, 1);
          r(Te(e, i, o(p))),
            p === 1 && (g.cancel(), r(i), f.forEach((u) => u()));
        });
      return {
        get paused() {
          return g.paused;
        },
        set paused(p) {
          g.paused = p;
        },
        onEnd(p) {
          f.push(p);
        },
        then(p) {
          return this.onEnd(p), this;
        },
        cancel() {
          g.cancel();
        },
        finish() {
          g.cancel(), r(i), f.forEach((p) => p());
        },
      };
    }
    a(oi, "tween");
    let ai = !0;
    E.run(() => {
      O.loaded ||
        (Ee() === 1 && !ai && ((O.loaded = !0), M.events.trigger("load"))),
        (!O.loaded && n.loadingScreen !== !1) || ai
          ? (Re(), fs(), It())
          : (ie.paused || Oi(), cs(), Re(), ps(), n.debug !== !1 && gs(), It()),
        ai && (ai = !1),
        M.events.trigger("frameEnd");
    });
    function Hi() {
      let e = k,
        i = h.drawingBufferWidth / e,
        s = h.drawingBufferHeight / e;
      if (E.isFullscreen()) {
        let r = window.innerWidth,
          o = window.innerHeight,
          l = r / o,
          f = i / s;
        if (l > f) {
          let g = window.innerHeight * f;
          A.viewport = { x: (r - g) / 2, y: 0, width: g, height: o };
        } else {
          let g = window.innerWidth / f;
          A.viewport = { x: 0, y: (o - g) / 2, width: r, height: g };
        }
        return;
      }
      if (n.letterbox) {
        if (!n.width || !n.height)
          throw new T("Letterboxing requires width and height defined.");
        let r = i / s,
          o = n.width / n.height;
        if (r > o) {
          let l = s * o,
            f = (i - l) / 2;
          A.viewport = { x: f, y: 0, width: l, height: s };
        } else {
          let l = i / o,
            f = (s - l) / 2;
          A.viewport = { x: 0, y: f, width: i, height: l };
        }
        return;
      }
      if (n.stretch && (!n.width || !n.height))
        throw new T("Stretching requires width and height defined.");
      A.viewport = { x: 0, y: 0, width: i, height: s };
    }
    a(Hi, "updateViewport"),
      E.onHide(() => {
        n.backgroundAudio || te.ctx.suspend();
      }),
      E.onShow(() => {
        n.backgroundAudio || te.ctx.resume();
      }),
      E.onResize(() => {
        if (E.isFullscreen()) return;
        let e = n.width && n.height;
        (e && !n.stretch && !n.letterbox) ||
          ((c.width = c.offsetWidth * k),
          (c.height = c.offsetHeight * k),
          Hi(),
          e ||
            (A.frameBuffer.free(),
            (A.frameBuffer = new Fe(
              h.drawingBufferWidth,
              h.drawingBufferHeight
            )),
            (A.width = h.drawingBufferWidth / k),
            (A.height = h.drawingBufferHeight / k)));
      }),
      Hi();
    let We = {
      VERSION: kr,
      loadRoot: Vt,
      loadProgress: Ee,
      loadSprite: Pe,
      loadSpriteAtlas: it,
      loadSound: Mt,
      loadBitmapFont: _t,
      loadFont: $t,
      loadShader: bt,
      loadShaderURL: Rt,
      loadAseprite: St,
      loadPedit: Et,
      loadBean: Bt,
      loadJSON: Zt,
      load: _e,
      getSprite: st,
      getSound: rt,
      getFont: ot,
      getBitmapFont: at,
      getShader: lt,
      getAsset: Tt,
      Asset: ne,
      SpriteData: ae,
      SoundData: pe,
      width: fe,
      height: ge,
      center: Yt,
      dt: Ve,
      time: E.time,
      screenshot: E.screenshot,
      record: ls,
      isFocused: hs,
      setCursor: E.setCursor,
      getCursor: E.getCursor,
      setCursorLocked: E.setCursorLocked,
      isCursorLocked: E.isCursorLocked,
      setFullscreen: E.setFullscreen,
      isFullscreen: E.isFullscreen,
      isTouchscreen: E.isTouchscreen,
      onLoad: si,
      onLoading: ms,
      onResize: ws,
      onGamepadConnect: E.onGamepadConnect,
      onGamepadDisconnect: E.onGamepadDisconnect,
      onError: As,
      onCleanup: ys,
      camPos: An,
      camScale: yn,
      camRot: Vn,
      shake: vn,
      toScreen: Mi,
      toWorld: Bi,
      setGravity: Fn,
      getGravity: Pn,
      setBackground: Cn,
      getBackground: Nn,
      getGamepads: E.getGamepads,
      add: jt,
      make: ei,
      destroy: us,
      destroyAll: gr,
      get: Li,
      readd: fr,
      pos: Kt,
      scale: Ht,
      rotate: Dn,
      color: In,
      opacity: kn,
      anchor: ii,
      area: qn,
      sprite: ni,
      text: Kn,
      rect: Hn,
      circle: jn,
      uvquad: Yn,
      outline: Qn,
      body: zn,
      doubleJump: Xn,
      shader: Jn,
      timer: Ni,
      fixed: Wn,
      stay: Di,
      health: Zn,
      lifespan: $n,
      z: Un,
      move: Gn,
      offscreen: On,
      follow: Ln,
      state: _n,
      fadeIn: es,
      mask: ts,
      tile: Ui,
      agent: as,
      on: Ne,
      onUpdate: Ti,
      onDraw: hr,
      onAdd: ti,
      onDestroy: Fi,
      onClick: bn,
      onCollide: xn,
      onCollideUpdate: En,
      onCollideEnd: Sn,
      onHover: Rn,
      onHoverUpdate: Mn,
      onHoverEnd: Bn,
      onKeyDown: E.onKeyDown,
      onKeyPress: E.onKeyPress,
      onKeyPressRepeat: E.onKeyPressRepeat,
      onKeyRelease: E.onKeyRelease,
      onMouseDown: E.onMouseDown,
      onMousePress: E.onMousePress,
      onMouseRelease: E.onMouseRelease,
      onMouseMove: E.onMouseMove,
      onCharInput: E.onCharInput,
      onTouchStart: E.onTouchStart,
      onTouchMove: E.onTouchMove,
      onTouchEnd: E.onTouchEnd,
      onScroll: E.onScroll,
      onHide: E.onHide,
      onShow: E.onShow,
      onGamepadButtonDown: E.onGamepadButtonDown,
      onGamepadButtonPress: E.onGamepadButtonPress,
      onGamepadButtonRelease: E.onGamepadButtonRelease,
      onGamepadStick: E.onGamepadStick,
      mousePos: Lt,
      mouseDeltaPos: E.mouseDeltaPos,
      isKeyDown: E.isKeyDown,
      isKeyPressed: E.isKeyPressed,
      isKeyPressedRepeat: E.isKeyPressedRepeat,
      isKeyReleased: E.isKeyReleased,
      isMouseDown: E.isMouseDown,
      isMousePressed: E.isMousePressed,
      isMouseReleased: E.isMouseReleased,
      isMouseMoved: E.isMouseMoved,
      isGamepadButtonPressed: E.isGamepadButtonPressed,
      isGamepadButtonDown: E.isGamepadButtonDown,
      isGamepadButtonReleased: E.isGamepadButtonReleased,
      charInputted: E.charInputted,
      loop: Tn,
      wait: qt,
      play: ht,
      volume: Ct,
      burp: Qe,
      audioCtx: te.ctx,
      Timer: Pr,
      Line: At,
      Rect: me,
      Circle: xs,
      Polygon: di,
      Vec2: x,
      Color: _,
      Mat4: Me,
      Quad: ce,
      RNG: Os,
      rand: Jt,
      randi: rn,
      randSeed: qs,
      vec2: R,
      rgb: $,
      hsl2rgb: vr,
      quad: oe,
      choose: Hs,
      chance: Ks,
      lerp: Te,
      tween: oi,
      easings: zt,
      map: gi,
      mapc: Gs,
      wave: Zi,
      deg2rad: Be,
      rad2deg: yt,
      clamp: ke,
      testLineLine: wt,
      testRectRect: Ys,
      testRectLine: Qs,
      testRectPoint: Wt,
      testCirclePolygon: Xs,
      testLinePoint: zs,
      testLineCircle: on,
      drawSprite: cn,
      drawText: Ri,
      formatText: Oe,
      drawRect: ye,
      drawLine: ct,
      drawLines: wi,
      drawTriangle: Ai,
      drawCircle: Xe,
      drawEllipse: yi,
      drawUVQuad: xe,
      drawPolygon: Ge,
      drawFormattedText: qe,
      drawMasked: vi,
      drawSubtracted: xi,
      pushTransform: G,
      popTransform: K,
      pushTranslate: d,
      pushScale: V,
      pushRotate: S,
      pushMatrix: Ut,
      usePostEffect: Dt,
      debug: ie,
      scene: is,
      go: ns,
      onSceneLeave: ss,
      addLevel: os,
      getData: rs,
      setData: Ii,
      download: mi,
      downloadJSON: tr,
      downloadText: un,
      downloadBlob: sn,
      plug: ki,
      ASCII_CHARS: Bs,
      canvas: E.canvas(),
      addKaboom: ds,
      LEFT: x.LEFT,
      RIGHT: x.RIGHT,
      UP: x.UP,
      DOWN: x.DOWN,
      RED: _.RED,
      GREEN: _.GREEN,
      BLUE: _.BLUE,
      YELLOW: _.YELLOW,
      MAGENTA: _.MAGENTA,
      CYAN: _.CYAN,
      WHITE: _.WHITE,
      BLACK: _.BLACK,
      quit: Vs,
      Event: be,
      EventHandler: Xt,
      EventController: mt,
      KaboomError: T,
    };
    if ((n.plugins && n.plugins.forEach(ki), n.global !== !1))
      for (let e in We) window[e] = We[e];
    return E.canvas().focus(), We;
  }, "default");
  or({ background: [101, 103, 255] });
  loadSprite("girl", "./sprites/girl.png");
  loadSprite("ghosty", "./sprites/ghosty.png");
  loadSprite("tree", "./sprites/tree.png");
  loadSprite("tree2", "./sprites/tree2.png");
  loadSprite("spike", "./sprites/spike.png");
  loadSprite("sand", "./sprites/sand.png");
  loadSprite("sand", "./sprites/sand.png");
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
  loadSprite("teal", "./sprites/purple.png");
  loadSprite("NC", "./sprites/NC.png");
  loadSprite("ND", "./sprites/ND.png");
  loadSprite("NE", "./sprites/NE.png");
  loadSprite("NF", "./sprites/NF.png");
  loadSprite("NG", "./sprites/NG.png");
  loadSprite("NA", "./sprites/NA.png");
  loadSprite("NB", "./sprites/NB.png");
  loadSprite("NC2", "./sprites/NC2.png");
  loadSprite("C", "./sprites/NC.png");
  loadSprite("D", "./sprites/ND.png");
  loadSprite("E", "./sprites/NE.png");
  loadSprite("F", "./sprites/NF.png");
  loadSprite("G", "./sprites/NG.png");
  loadSprite("A", "./sprites/NA.png");
  loadSprite("B", "./sprites/NB.png");
  loadSprite("C2", "./sprites/NC2.png");
  loadSprite("cactus", "./sprites/cactus.png");
  loadSprite("smallc", "./sprites/smallc.png");
  loadSprite("water", "./sprites/Water.png", {
    sliceX: 8,
    sliceY: 1,
    anims: { wave: { from: 0, to: 7, speed: 16, loop: !0 } },
  });
  loadSound("coin", "./sprites/sounds/score.mp3");
  loadSound("powerup", "./sprites/sounds/powerup.mp3");
  loadSound("blip", "./sprites/sounds/blip.mp3");
  loadSound("hit", "./sprites/sounds/hit.mp3");
  loadSound("portal", "./sprites/sounds/portal.mp3");
  loadSound("Do", "./sprites/sounds/C.mp3");
  loadSound("Re", "./sprites/sounds/D.mp3");
  loadSound("Mi", "./sprites/sounds/E.mp3");
  loadSound("Fa", "./sprites/sounds/F.mp3");
  loadSound("Sol", "./sprites/sounds/G.mp3");
  loadSound("La", "./sprites/sounds/A.mp3");
  loadSound("Si", "./sprites/sounds/B.mp3");
  loadSound("Do2", "./sprites/sounds/C2.mp3");
  setGravity(3200);
  function Qr(n = 60, t = 1) {
    return {
      id: "patrol",
      require: ["pos", "area"],
      add() {
        this.on("collide", (c, m) => {
          (m.isLeft() || m.isRight()) && (t = -t);
        });
      },
      update() {
        this.move(n * t, 0);
      },
    };
  }
  function zr() {
    let n = 0,
      t = !1,
      c = 1;
    return {
      id: "big",
      require: ["scale"],
      update() {
        t && ((n -= dt()), n <= 0 && this.smallify()),
          (this.scale = this.scale.lerp(vec2(c), dt() * 6));
      },
      isBig() {
        return t;
      },
      smallify() {
        (c = 1), (n = 0), (t = !1);
      },
      biggify(m) {
        (c = 2), (n = m), (t = !0);
      },
    };
  }
  var ar = 1320,
    dn = 480,
    Xr = 2e3,
    lr = [
      [
        "                                            ",
        "                                            ",
        "                                            ",
        "           $$$$                       $     ",
        "       $$                             $     ",
        "  $$    $$ $$$$  0 1 2 3 4 5 6 7      $     ",
        "    $$           p b r n w i g t      $     ",
        " %   $$  $$                           $     ",
        "   + =    ^>^             >      -    @   + ",
        "============================================",
        "============================================",
        "============================================",
        "============================================",
        "============================================",
      ],
      [
        "       $$$$                                                  ",
        "                  $$                                         ",
        "  $$   $$$$  $$                                C             ",
        "==      ========                               =   ",
        " $$ $$  $$      $$                         =      ",
        "                             %         =        $",
        "                                     =          $",
        "                                                ",
        "    ;         >^^    ;    >            ^^^^^^  @",
        "============================================================",
        "============================================================",
        "============================================================",
        "============================================================",
        "============================================================",
      ],
      [
        "$   $       $   $       $ ",
        "$   $       $   $       $ ",
        "$   $       $   $       $ ",
        "    %   ==    %    ==     ",
        "==      ==   D   ==     ==",
        "    ==      ==      ==    ",
        "==    ==    ==    ==    ==",
        "    ==      ==      ==    ",
        "    %    =         =      ",
        "==       =   D   ==     ==",
        "    ==      ==            ",
        "==    ==          ==    ==",
        "            ==      ==    ",
        " ^^^^^^^^^^^^^^^^^^^^^^^^@",
        "===========================",
        "===========================",
        "===========================",
        "===========================",
        "===========================",
      ],
      [
        "                          ",
        "                                            ",
        "                                            ",
        "       $       $       $      $       $     ",
        "                                            ",
        "       =       =       =      =       =     ",
        " %     =       =       =      =       =     ",
        "       =       =       =      =       =     ",
        "       =   >   =    >  =   >  =   E>  =    @",
        "============================================",
        "============================================",
        "============================================",
        "============================================",
        "============================================",
      ],
      [
        "                                           ",
        "                                           ",
        "                                           ",
        "         $          $                        ",
        "         =          =                      ",
        "         =          =                      ",
        "         =  >  F >  =                       ",
        "       ================                     ",
        "       ^^^^^^^^^^^^^^^^^      $$$$$$$$$@$$$$",
        "============================================",
        "============================================",
        "============================================",
        "============================================",
        "============================================",
      ],
      [
        "                      G                     ",
        "                      =                     ",
        "                                            ",
        "                    =  =                  $ ",
        "                    ^  ^                  $ ",
        "                  =========               $ ",
        "                    ^^^^^                 $ ",
        "             ===================          $ ",
        "   +             ^^^^^^^^^^^^             @ ",
        "============================================",
        "============================================",
        "============================================",
        "============================================",
        "============================================",
      ],
      [
        "                                           ",
        "                                           ",
        "                                   =       ",
        "                                      $    ",
        "                            =    =    $    ",
        "                         =    =       $    ",
        "                       =              $    ",
        " %                  =                 $    ",
        "    ;                ^^^^^^^^^^^^^^^^^@    ",
        "==================  ========================",
        "==================              A===========",
        "============================================",
        "============================================",
        "============================================",
      ],
      [
        "                                            ",
        "                                            ",
        "                                            ",
        "                     B                     $ ",
        "                     =                     $ ",
        "                  =    =                   $ ",
        "                =       =                   ",
        "            =            =                    ",
        "   ;       ^^^^^^^^^^^^^^^^      .      @ ",
        "============================================",
        "============================================",
        "============================================",
        "============================================",
        "============================================",
      ],
      [
        "                                            ",
        "                                            ",
        "                                            ",
        "                                           $",
        "       $   $    $      $    $    $     $   $",
        "       $   $    $      $    $    $     $   c",
        "       $   $    $      $    $    $     $ = $",
        "       $   $    $      $    $    $     $   $",
        "       >^^>^>^          >^^>^^   >^^>>^    @",
        "=================     ======================",
        "=================     ======================",
        "=================     ======================",
        "=================     ======================",
        "=================     ======================",
      ],
    ];
  function Jr() {
    console.log("Drawing waves");
    let n = -1e3;
    for (let t = 0; t < 90; t++)
      add([sprite("water", { anim: "wave" }), pos(n, 750), scale(4)]),
        (n += 64);
  }
  var Wr = {
    tileWidth: 64,
    tileHeight: 64,
    tiles: {
      "=": () => [
        sprite("sand"),
        scale(1.6),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "platform",
      ],
      $: () => [
        sprite("coin"),
        area(),
        scale(0.7),
        pos(0, -9),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "coin",
      ],
      "%": () => [
        sprite("prize"),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "prize",
      ],
      "^": () => [
        sprite("spike"),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "danger",
      ],
      "#": () => [
        sprite("apple"),
        area(),
        anchor("bot"),
        body(),
        offscreen({ hide: !0 }),
        "apple",
      ],
      ">": () => [
        sprite("ghosty"),
        scale(2),
        area(),
        anchor("bot"),
        body(),
        Qr(),
        offscreen({ hide: !0 }),
        "enemy",
      ],
      "@": () => [
        sprite("portal"),
        scale(3),
        area({ scale: 0.5 }),
        anchor("bot"),
        pos(0, -12),
        offscreen({ hide: !0 }),
        "portal",
      ],
      p: () => [
        sprite("purple"),
        scale(0.5),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "purple",
        { soundName: "Do" },
      ],
      b: () => [
        sprite("blue"),
        scale(1.5),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "purple",
        { soundName: "Re" },
      ],
      r: () => [
        sprite("brown"),
        scale(1.5),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "purple",
        { soundName: "Mi" },
      ],
      n: () => [
        sprite("navy"),
        scale(1.5),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "purple",
        { soundName: "Fa" },
      ],
      w: () => [
        sprite("white"),
        scale(1.5),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "purple",
        { soundName: "Sol" },
      ],
      i: () => [
        sprite("pink"),
        scale(1.5),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "purple",
        { soundName: "La" },
      ],
      g: () => [
        sprite("green"),
        scale(1.5),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "purple",
        { soundName: "Si" },
      ],
      t: () => [
        sprite("teal"),
        scale(0.5),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "purple",
        { soundName: "Do2" },
      ],
      C: () => [
        sprite("NC"),
        scale(1.6),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "collectable",
        { soundName: "Do" },
      ],
      D: () => [
        sprite("ND"),
        scale(1.6),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "collectable",
        { soundName: "Re" },
      ],
      E: () => [
        sprite("NE"),
        scale(1.6),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "collectable",
        { soundName: "Mi" },
      ],
      F: () => [
        sprite("NF"),
        scale(1.6),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "collectable",
        { soundName: "Fa" },
      ],
      G: () => [
        sprite("NG"),
        scale(1.6),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "collectable",
        { soundName: "Sol" },
      ],
      A: () => [
        sprite("NA"),
        scale(1.6),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "collectable",
        { soundName: "La" },
      ],
      B: () => [
        sprite("NB"),
        scale(1.6),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "collectable",
        { soundName: "Si" },
      ],
      c: () => [
        sprite("NC2"),
        scale(1.6),
        area(),
        body({ isStatic: !0 }),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "collectable",
        { soundName: "Do2" },
      ],
      "+": () => [
        sprite("tree"),
        scale(5),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "soft",
      ],
      "-": () => [
        sprite("tree2"),
        scale(5),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
        "soft",
      ],
      0: () => [
        sprite("C"),
        scale(1.6),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
      ],
      1: () => [
        sprite("D"),
        scale(1.6),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
      ],
      2: () => [
        sprite("E"),
        scale(1.6),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
      ],
      3: () => [
        sprite("F"),
        scale(1.6),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
      ],
      4: () => [
        sprite("G"),
        scale(1.6),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
      ],
      5: () => [
        sprite("A"),
        scale(1.6),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
      ],
      6: () => [
        sprite("B"),
        scale(1.6),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
      ],
      7: () => [
        sprite("C2"),
        scale(1.6),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
      ],
      ";": () => [
        sprite("cactus"),
        scale(5),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
      ],
      ".": () => [
        sprite("smallc"),
        scale(4),
        area(),
        anchor("bot"),
        offscreen({ hide: !0 }),
      ],
    },
  };
  scene(
    "game",
    (
      { levelId: n, coins: t, collectables: c } = {
        levelId: 0,
        coins: 0,
        collectables: 0,
      }
    ) => {
      let m = addLevel(lr[n ?? 1], Wr),
        y = add([
          sprite("girl"),
          pos(30, 0),
          area(),
          scale(0.5),
          body(),
          zr(),
          anchor("bot"),
        ]);
      Jr();
      let N = 900,
        X = height(),
        k = N - X / 2;
      camPos(vec2(width() / 2, k)),
        y.onUpdate(() => {
          camPos(vec2(y.pos.x, k)), y.pos.y >= Xr && go("lose");
        }),
        y.onBeforePhysicsResolve((h) => {
          h.target.is(["platform", "soft"]) &&
            y.isJumping() &&
            h.preventResolution();
        }),
        y.onPhysicsResolve(() => {}),
        y.onCollide("danger", () => {
          go("lose"), play("hit");
        }),
        y.onCollide("portal", () => {
          play("portal"),
            n == c
              ? n + 1 < lr.length
                ? go("game", { levelId: n + 1, coins: t, collectables: c })
                : go("win")
              : go("lose");
        });
      let q = !1;
      y.onHeadbutt((h) => {
        h.is("prize") &&
          !q &&
          (m.spawn("#", h.tilePos.sub(0, 1)).jump(), (q = !0), play("blip"));
      }),
        y.onCollide("purple", (h) => {
          let H = h.soundName || "defaultSound";
          play(H), console.log("Played sound:", H);
        }),
        y.onCollide("apple", (h) => {
          destroy(h), y.biggify(3), (q = !1), play("powerup");
        });
      let J = 0;
      onUpdate(() => {
        J > 0 && (J = Math.max(0, J - dt() * 100));
      }),
        y.onCollide("coin", (h) => {
          destroy(h),
            play("coin", { detune: J }),
            (J += 100),
            (t += 1),
            (ee.text = "coins: " + t);
        }),
        y.onCollide("collectable", (h) => {
          destroy(h), (c += 1), (E.text = "collectables: " + c);
          let H = h.soundName || "defaultSound";
          play(H), console.log("Played sound:", H);
        }),
        y.onGround((h) => {
          h.is("enemy") &&
            (y.jump(ar * 1.5), destroy(h), addKaboom(y.pos), play("powerup"));
        }),
        y.onCollide("enemy", (h, H) => {
          H.isBottom() || (go("lose"), play("hit"));
        });
      let ee = add([text("coins: ", +t), pos(24, 24), fixed()]),
        E = add([text("collectables: ", +c), pos(300, 24), fixed()]);
      function W() {
        y.isGrounded() && y.jump(ar);
      }
      onKeyPress("space", W),
        onKeyDown("left", () => {
          y.move(-dn, 0);
        }),
        onKeyDown("right", () => {
          y.move(dn, 0);
        }),
        onKeyPress("down", () => {
          y.weight = 3;
        }),
        onKeyRelease("down", () => {
          y.weight = 1;
        }),
        onGamepadButtonPress("south", W),
        onGamepadStick("left", (h) => {
          y.move(h.x * dn, 0);
        }),
        onKeyPress("f", () => {
          setFullscreen(!isFullscreen());
        });
    }
  );
  scene("lose", () => {
    add([text("You Lose")]), onKeyPress(() => go("game"));
  });
  scene("win", () => {
    add([text("You Win")]), onKeyPress(() => go("game"));
  });
  go("game");
})();
