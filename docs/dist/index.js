(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/element-mold/dist/create-element.js
  var require_create_element = __commonJS({
    "node_modules/element-mold/dist/create-element.js"(exports) {
      "use strict";
      var __rest = exports && exports.__rest || function(s, e) {
        var t = {};
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
          }
        return t;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var createElement = (tagName, ...properties) => {
        const last = properties[properties.length - 1];
        let sliceIndex = properties.length;
        let children = [];
        if (Array.isArray(last)) {
          children = last;
          sliceIndex = -1;
        } else if (typeof last === "string" || last instanceof Element) {
          children = [last];
          sliceIndex = -1;
        }
        const styles = {};
        const el = Object.assign(document.createElement(tagName), ...properties.slice(0, sliceIndex).map((_a) => {
          var { style: style2 } = _a, properties2 = __rest(_a, ["style"]);
          Object.assign(styles, style2);
          return properties2;
        }));
        Object.assign(el.style, styles);
        el.append(...children);
        return el;
      };
      exports.default = createElement;
    }
  });

  // node_modules/element-mold/dist/html.js
  var require_html = __commonJS({
    "node_modules/element-mold/dist/html.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.frameset = exports.frame = exports.form = exports.footer = exports.font = exports.figure = exports.figcaption = exports.fieldset = exports.embed = exports.em = exports.dt = exports.dl = exports.div = exports.dir = exports.dialog = exports.dfn = exports.details = exports.del = exports.dd = exports.datalist = exports.data = exports.colgroup = exports.col = exports.code = exports.cite = exports.caption = exports.canvas = exports.button = exports.br = exports.body = exports.blockquote = exports.bdo = exports.bdi = exports.base = exports.bTag = exports.b = exports.audio = exports.aside = exports.article = exports.area = exports.applet = exports.address = exports.abbr = exports.aTag = exports.a = void 0;
      exports.slot = exports.select = exports.section = exports.script = exports.samp = exports.sTag = exports.s = exports.ruby = exports.rt = exports.rp = exports.qTag = exports.q = exports.progress = exports.pre = exports.picture = exports.param = exports.pTag = exports.p = exports.output = exports.option = exports.optgroup = exports.ol = exports.objectTag = exports.object = exports.noscript = exports.nav = exports.meter = exports.meta = exports.menu = exports.marquee = exports.mark = exports.map = exports.main = exports.link = exports.li = exports.legend = exports.label = exports.kbd = exports.ins = exports.input = exports.img = exports.iframe = exports.iTag = exports.i = exports.html = exports.hr = exports.hgroup = exports.header = exports.head = exports.h6 = void 0;
      exports.wbr = exports.video = exports.varTag = exports.ul = exports.uTag = exports.u = exports.track = exports.tr = exports.title = exports.time = exports.thead = exports.th = exports.tfoot = exports.textarea = exports.template = exports.td = exports.tbody = exports.table = exports.sup = exports.summary = exports.sub = exports.style = exports.strong = exports.span = exports.source = exports.small = void 0;
      var create_element_1 = __importDefault(require_create_element());
      var createHTMLElement = create_element_1.default;
      var createHTMLElementFactory = (tagName) => (...properties) => createHTMLElement(tagName, ...properties);
      exports.a = createHTMLElementFactory("a");
      exports.aTag = exports.a;
      exports.abbr = createHTMLElementFactory("abbr");
      exports.address = createHTMLElementFactory("address");
      exports.applet = createHTMLElementFactory("applet");
      exports.area = createHTMLElementFactory("area");
      exports.article = createHTMLElementFactory("article");
      exports.aside = createHTMLElementFactory("aside");
      exports.audio = createHTMLElementFactory("audio");
      exports.b = createHTMLElementFactory("b");
      exports.bTag = exports.b;
      exports.base = createHTMLElementFactory("base");
      exports.bdi = createHTMLElementFactory("bdi");
      exports.bdo = createHTMLElementFactory("bdo");
      exports.blockquote = createHTMLElementFactory("blockquote");
      exports.body = createHTMLElementFactory("body");
      exports.br = createHTMLElementFactory("br");
      exports.button = createHTMLElementFactory("button");
      exports.canvas = createHTMLElementFactory("canvas");
      exports.caption = createHTMLElementFactory("caption");
      exports.cite = createHTMLElementFactory("cite");
      exports.code = createHTMLElementFactory("code");
      exports.col = createHTMLElementFactory("col");
      exports.colgroup = createHTMLElementFactory("colgroup");
      exports.data = createHTMLElementFactory("data");
      exports.datalist = createHTMLElementFactory("datalist");
      exports.dd = createHTMLElementFactory("dd");
      exports.del = createHTMLElementFactory("del");
      exports.details = createHTMLElementFactory("details");
      exports.dfn = createHTMLElementFactory("dfn");
      exports.dialog = createHTMLElementFactory("dialog");
      exports.dir = createHTMLElementFactory("dir");
      exports.div = createHTMLElementFactory("div");
      exports.dl = createHTMLElementFactory("dl");
      exports.dt = createHTMLElementFactory("dt");
      exports.em = createHTMLElementFactory("em");
      exports.embed = createHTMLElementFactory("embed");
      exports.fieldset = createHTMLElementFactory("fieldset");
      exports.figcaption = createHTMLElementFactory("figcaption");
      exports.figure = createHTMLElementFactory("figure");
      exports.font = createHTMLElementFactory("font");
      exports.footer = createHTMLElementFactory("footer");
      exports.form = createHTMLElementFactory("form");
      exports.frame = createHTMLElementFactory("frame");
      exports.frameset = createHTMLElementFactory("frameset");
      exports.h1 = createHTMLElementFactory("h1");
      exports.h2 = createHTMLElementFactory("h2");
      exports.h3 = createHTMLElementFactory("h3");
      exports.h4 = createHTMLElementFactory("h4");
      exports.h5 = createHTMLElementFactory("h5");
      exports.h6 = createHTMLElementFactory("h6");
      exports.head = createHTMLElementFactory("head");
      exports.header = createHTMLElementFactory("header");
      exports.hgroup = createHTMLElementFactory("hgroup");
      exports.hr = createHTMLElementFactory("hr");
      exports.html = createHTMLElementFactory("html");
      exports.i = createHTMLElementFactory("i");
      exports.iTag = exports.i;
      exports.iframe = createHTMLElementFactory("iframe");
      exports.img = createHTMLElementFactory("img");
      exports.input = createHTMLElementFactory("input");
      exports.ins = createHTMLElementFactory("ins");
      exports.kbd = createHTMLElementFactory("kbd");
      exports.label = createHTMLElementFactory("label");
      exports.legend = createHTMLElementFactory("legend");
      exports.li = createHTMLElementFactory("li");
      exports.link = createHTMLElementFactory("link");
      exports.main = createHTMLElementFactory("main");
      exports.map = createHTMLElementFactory("map");
      exports.mark = createHTMLElementFactory("mark");
      exports.marquee = createHTMLElementFactory("marquee");
      exports.menu = createHTMLElementFactory("menu");
      exports.meta = createHTMLElementFactory("meta");
      exports.meter = createHTMLElementFactory("meter");
      exports.nav = createHTMLElementFactory("nav");
      exports.noscript = createHTMLElementFactory("noscript");
      exports.object = createHTMLElementFactory("object");
      exports.objectTag = exports.object;
      exports.ol = createHTMLElementFactory("ol");
      exports.optgroup = createHTMLElementFactory("optgroup");
      exports.option = createHTMLElementFactory("option");
      exports.output = createHTMLElementFactory("output");
      exports.p = createHTMLElementFactory("p");
      exports.pTag = exports.p;
      exports.param = createHTMLElementFactory("param");
      exports.picture = createHTMLElementFactory("picture");
      exports.pre = createHTMLElementFactory("pre");
      exports.progress = createHTMLElementFactory("progress");
      exports.q = createHTMLElementFactory("q");
      exports.qTag = exports.q;
      exports.rp = createHTMLElementFactory("rp");
      exports.rt = createHTMLElementFactory("rt");
      exports.ruby = createHTMLElementFactory("ruby");
      exports.s = createHTMLElementFactory("s");
      exports.sTag = exports.s;
      exports.samp = createHTMLElementFactory("samp");
      exports.script = createHTMLElementFactory("script");
      exports.section = createHTMLElementFactory("section");
      exports.select = createHTMLElementFactory("select");
      exports.slot = createHTMLElementFactory("slot");
      exports.small = createHTMLElementFactory("small");
      exports.source = createHTMLElementFactory("source");
      exports.span = createHTMLElementFactory("span");
      exports.strong = createHTMLElementFactory("strong");
      exports.style = createHTMLElementFactory("style");
      exports.sub = createHTMLElementFactory("sub");
      exports.summary = createHTMLElementFactory("summary");
      exports.sup = createHTMLElementFactory("sup");
      exports.table = createHTMLElementFactory("table");
      exports.tbody = createHTMLElementFactory("tbody");
      exports.td = createHTMLElementFactory("td");
      exports.template = createHTMLElementFactory("template");
      exports.textarea = createHTMLElementFactory("textarea");
      exports.tfoot = createHTMLElementFactory("tfoot");
      exports.th = createHTMLElementFactory("th");
      exports.thead = createHTMLElementFactory("thead");
      exports.time = createHTMLElementFactory("time");
      exports.title = createHTMLElementFactory("title");
      exports.tr = createHTMLElementFactory("tr");
      exports.track = createHTMLElementFactory("track");
      exports.u = createHTMLElementFactory("u");
      exports.uTag = exports.u;
      exports.ul = createHTMLElementFactory("ul");
      exports.varTag = createHTMLElementFactory("var");
      exports.video = createHTMLElementFactory("video");
      exports.wbr = createHTMLElementFactory("wbr");
      exports.default = createHTMLElement;
    }
  });

  // src/index.ts
  var import_html2 = __toModule(require_html());

  // src/observer.ts
  var Observer = class {
    update(messages) {
      throw "!";
    }
  };
  var Subject = class {
    subscribers = new Set();
    subscribe(subscriber) {
      this.subscribers.add(subscriber);
    }
    unsubscribe(subscriber) {
      this.subscribers.delete(subscriber);
    }
    notify(messages) {
      this.subscribers.forEach((subscriber) => subscriber.update(messages));
    }
  };

  // src/editor.ts
  var import_html = __toModule(require_html());

  // src/drag-control.ts
  var DragControl = class {
    ox = 0;
    oy = 0;
    tx = 0;
    ty = 0;
    prevX = 0;
    prevY = 0;
    payload;
    isPressed = false;
    constructor() {
      document.addEventListener("pointerdown", this.downHandler.bind(this));
      document.addEventListener("pointermove", this.moveHandler.bind(this));
      document.addEventListener("pointerup", this.upHandler.bind(this));
      document.addEventListener("keydown", this.keydownHandler.bind(this));
    }
    clear() {
      this.setDown();
      this.setMove();
      this.setUp();
    }
    downHandler(ev) {
      const { clientX, clientY } = ev;
      this.ox = this.prevX = clientX;
      this.oy = this.prevY = clientY;
      this.down?.({ ...ev, originX: this.prevX, originY: this.prevY });
    }
    moveHandler(ev) {
      const { clientX, clientY } = ev;
      const dx = clientX - this.prevX;
      const dy = clientY - this.prevY;
      this.prevX = clientX;
      this.prevY = clientY;
      this.tx = clientX - this.ox;
      this.ty = clientY - this.oy;
      this.move?.(Object.assign(ev, { dx, dy, tx: this.tx, ty: this.ty }), this.payload);
    }
    upHandler(ev) {
      const { clientX, clientY } = ev;
      const dx = clientX - this.prevX;
      const dy = clientY - this.prevY;
      this.prevX = clientX;
      this.prevY = clientY;
      this.up?.(Object.assign(ev, { dx, dy, tx: clientX - this.ox, ty: clientY - this.oy }), this.payload);
      this.setDown();
      this.setMove();
      this.setUp();
      this.setKeydown();
      this.payload = void 0;
    }
    keydownHandler(ev) {
      if (this.isPressed)
        return;
      this.isPressed = true;
      this.keydown?.(Object.assign(ev, { tx: this.tx, ty: this.ty }), this.payload);
      const keyupHandler = (ev2) => {
        this.isPressed = false;
        this.keydown?.(Object.assign(ev2, { tx: this.tx, ty: this.ty }), this.payload);
        document.removeEventListener("keyup", keyupHandler);
      };
      document.addEventListener("keyup", keyupHandler);
    }
    setKeydown(f) {
      this.keydown = f;
    }
    setDown(f) {
      this.down = f;
    }
    setMove(f) {
      this.move = f;
    }
    setUp(f) {
      this.up = f;
    }
  };
  var dragControl = new DragControl();
  var addDragHandler = (target, { down, move, up, cancel, key }) => {
    const handler = (ev) => {
      const { left, top } = target.getBoundingClientRect();
      const payload = down(Object.assign(ev, { relX: ev.clientX - left, relY: ev.clientY - top }));
      if (payload === null) {
        dragControl.setMove();
        dragControl.setUp();
        dragControl.setKeydown();
        cancel?.(ev);
      } else {
        dragControl.payload = payload;
        dragControl.setMove((ev2, payload2) => {
          if (move?.(ev2, payload2) === null) {
            dragControl.setMove();
            dragControl.setUp();
            cancel?.(ev2);
          }
        });
        dragControl.setUp(up);
        dragControl.setKeydown(key);
      }
    };
    target.addEventListener("pointerdown", handler);
    return () => {
      dragControl.clear();
      target.removeEventListener("pointerdown", handler);
    };
  };
  var drag_control_default = addDragHandler;

  // src/editor.ts
  var comp = (val, min, max) => Math.min(max, Math.max(min, val));
  var isInRect = (x, y, minX, maxX, minY, maxY) => minX <= x && x <= maxX && minY <= y && y <= maxY;
  var EditorNode = class {
    id;
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    rotate = 0;
    background = "";
    children = [];
    minWidth = 10;
    maxWidth = Infinity;
    minHeight = 10;
    maxHeight = Infinity;
    constructor(params) {
      Object.assign(this, params);
    }
    move(x, y) {
      this.x = x;
      this.y = y;
    }
    size(fixedXAxisRatio, fixedYAxisRatio, x, y, width, height, w2add, h2add) {
      const prevWidth = width;
      const prevHeight = height;
      this.width = comp(width + w2add, this.minWidth, this.maxWidth);
      this.height = comp(height + h2add, this.minHeight, this.maxHeight);
      const dx = this.width - prevWidth;
      const dy = this.height - prevHeight;
      this.x = x - dx * fixedXAxisRatio;
      this.y = y - dy * fixedYAxisRatio;
      return this;
    }
    getXYLines() {
      return [this.x, this.x + this.width / 2, this.x + this.width, this.y, this.y + this.height / 2, this.y + this.height];
    }
  };
  var _EditorControl = class extends Subject {
    children = [];
    focused = null;
    getFocusedId() {
      return this.focused?.id ?? null;
    }
    getXYLinesByNode(node) {
      return EditorNode.prototype.getXYLines.bind(node)();
    }
    getSnapNodesExceptFocus(nodeId2) {
      return this.children.filter(({ id }) => id !== nodeId2);
    }
    getSnapPoints(nodes) {
      return nodes.map((node) => node.getXYLines()).map(([x1, x2, x3, y1, y2, y3]) => [
        [[x1, [y1, y3]], [x2, [y1, y3]], [x3, [y1, y3]]],
        [[y1, [x1, x3]], [y2, [x1, x3]], [y3, [x1, x3]]]
      ]).reduce((acc, [xSnapPoints, ySnapPoints]) => {
        acc[0].push(...xSnapPoints);
        acc[1].push(...ySnapPoints);
        return acc;
      }, [[], []]);
    }
    snap(targetXSnapPoints, targetYSnapPoints, xSnapPoints, ySnapPoints) {
      const distanceOfXPoints = xSnapPoints.map(([value, data]) => targetXSnapPoints.map((val) => [value - val, data, val])).flat();
      const distanceOfXPointsSorted = [...distanceOfXPoints].sort(([a], [b]) => Math.abs(a) - Math.abs(b));
      const xSnapOffsetPoint = distanceOfXPointsSorted.find(([val]) => val !== 0 && Math.abs(val) < _EditorControl.SNAP_THRESHOLD) ?? [0, [null, null], null];
      const xSnapOffset = xSnapOffsetPoint[0];
      const resultXSnapPoints = distanceOfXPointsSorted.filter(([dist], i, arr) => dist === 0 || dist === xSnapOffset);
      const distanceOfYPoints = ySnapPoints.map(([value, data]) => targetYSnapPoints.map((val) => [value - val, data, val])).flat();
      const distanceOfYPointsSorted = [...distanceOfYPoints].sort(([a], [b]) => Math.abs(a) - Math.abs(b));
      const ySnapOffsetPoint = distanceOfYPointsSorted.find(([val]) => val !== 0 && Math.abs(val) < _EditorControl.SNAP_THRESHOLD) ?? [0, [null, null], null];
      const ySnapOffset = ySnapOffsetPoint[0];
      const resultYSnapPoints = distanceOfYPointsSorted.filter(([dist], i, arr) => dist === 0 || dist === ySnapOffset);
      this.send("snapline", [
        targetXSnapPoints,
        targetYSnapPoints,
        xSnapOffsetPoint,
        ySnapOffsetPoint
      ]);
      return [xSnapOffsetPoint, ySnapOffsetPoint];
    }
    snapOff() {
      this.send("snapline-hide");
    }
    getDirectionByCursor(clientX, clientY) {
      if (!this.focused)
        return null;
      const { x, y, width, height } = this.focused;
      const halfResizeEdge = _EditorControl.RESIZE_EDGE_THRESHOLD / 2;
      if (isInRect(clientX, clientY, x - halfResizeEdge, x + halfResizeEdge, y - halfResizeEdge, y + halfResizeEdge)) {
        return "nw-resize";
      } else if (isInRect(clientX, clientY, x + halfResizeEdge, x + width - halfResizeEdge, y - halfResizeEdge, y + halfResizeEdge)) {
        return "n-resize";
      } else if (isInRect(clientX, clientY, x + width - halfResizeEdge, x + width + halfResizeEdge, y - halfResizeEdge, y + halfResizeEdge)) {
        return "ne-resize";
      } else if (isInRect(clientX, clientY, x - halfResizeEdge, x + halfResizeEdge, y + halfResizeEdge, y + height - halfResizeEdge)) {
        return "w-resize";
      } else if (isInRect(clientX, clientY, x + width - halfResizeEdge, x + width + halfResizeEdge, y + halfResizeEdge, y + height - halfResizeEdge)) {
        return "e-resize";
      } else if (isInRect(clientX, clientY, x - halfResizeEdge, x + halfResizeEdge, y + height - halfResizeEdge, y + height + halfResizeEdge)) {
        return "sw-resize";
      } else if (isInRect(clientX, clientY, x + halfResizeEdge, x + width - halfResizeEdge, y + height - halfResizeEdge, y + height + halfResizeEdge)) {
        return "s-resize";
      } else if (isInRect(clientX, clientY, x + width - halfResizeEdge, x + width + halfResizeEdge, y + height - halfResizeEdge, y + height + halfResizeEdge)) {
        return "se-resize";
      } else {
        return null;
      }
    }
    setFocusByCursor(clientX, clientY) {
      return this.focused = [...this.focused ? [this.focused] : [], ...[...this.children].reverse()].find((node) => {
        const { x, y, width, height } = node;
        if (x <= clientX && clientX <= x + width && y <= clientY && clientY <= y + height)
          return node;
      }) ?? null;
    }
    focusUpdate(node = this.focused) {
      this.send("focus", node);
    }
    find(node) {
      const target = this.children.find((child) => child === node);
      if (!target)
        throw `Not found node: ${JSON.stringify(node)}`;
      return target;
    }
    add(node, index = this.children.length) {
      this.children.splice(index, 0, node);
      this.send("add", node);
    }
    remove(node) {
      this.children.splice(this.children.indexOf(node), 1);
      this.send("remove", node);
    }
    move(x, y, width, height, tx, ty, enableLinear, enableSnap, xSnapPoints, ySnapPoints) {
      if (!this.focused)
        return;
      if (enableLinear) {
        const degree = (Math.atan2(tx, ty) * 180 / Math.PI + 180) % 180;
        const targetDegree = [0, 45, 90, 135, 180].map((val) => [val, Math.abs(val - degree)]).sort((a, b) => a[1] - b[1])[0][0];
        if (!targetDegree || targetDegree === 180)
          tx = 0;
        else if (targetDegree === 45)
          tx = ty;
        else if (targetDegree === 90)
          ty = 0;
        else if (targetDegree === 135)
          tx = -ty;
      }
      const computedX = x + tx;
      const computedY = y + ty;
      const [x1, x2, x3, y1, y2, y3] = this.getXYLinesByNode({ x: computedX, y: computedY, width, height });
      const [[xSnapOffset], [ySnapOffset]] = enableSnap ? this.snap([x1, x2, x3], [y1, y2, y3], xSnapPoints, ySnapPoints) : [[0], [0]];
      tx += xSnapOffset;
      ty += ySnapOffset;
      this.focused.move(x + tx, y + ty);
      this.send("move", this.focused);
    }
    size(direction, x, y, width, height, tx, ty, enableFixedRatio, enableCenterOrigin, enableSnap, xSnapPoints, ySnapPoints) {
      if (!this.focused)
        return;
      const injectAlt = (val) => enableCenterOrigin ? 0.5 : val;
      let rx = 0;
      let ry = 0;
      switch (direction) {
        case "nw-resize":
          rx = injectAlt(1);
          ry = injectAlt(1);
          tx *= -1;
          ty *= -1;
          break;
        case "n-resize":
          rx = injectAlt(0.5);
          ry = injectAlt(1);
          tx *= 0;
          ty *= -1;
          break;
        case "ne-resize":
          rx = injectAlt(0);
          ry = injectAlt(1);
          tx *= 1;
          ty *= -1;
          break;
        case "w-resize":
          rx = injectAlt(1);
          ry = injectAlt(0.5);
          tx *= -1;
          ty *= 0;
          break;
        case "e-resize":
          rx = injectAlt(0);
          ry = injectAlt(0.5);
          tx *= 1;
          ty *= 0;
          break;
        case "sw-resize":
          rx = injectAlt(1);
          ry = injectAlt(0);
          tx *= -1;
          ty *= 1;
          break;
        case "s-resize":
          rx = injectAlt(0.5);
          ry = injectAlt(0);
          tx *= 0;
          ty *= 1;
          break;
        case "se-resize":
          rx = injectAlt(0);
          ry = injectAlt(0);
          tx *= 1;
          ty *= 1;
          break;
      }
      if (enableCenterOrigin) {
        tx *= 2;
        ty *= 2;
      }
      if (enableFixedRatio) {
        if (tx === 0)
          tx = ty * width / height;
        else if (ty === 0)
          ty = tx * height / width;
        if (width / height > Math.abs(tx + width) / Math.abs(ty + height))
          tx = ty * width / height;
        else
          ty = tx * height / width;
      }
      const { x: computedX, y: computedY, width: computedWidth, height: computedHeight } = this.focused.size.bind({
        x,
        y,
        width,
        height,
        minWidth: this.focused.minWidth,
        maxWidth: this.focused.maxWidth,
        minHeight: this.focused.minHeight,
        maxHeight: this.focused.maxHeight
      })(rx, ry, x, y, width, height, tx, ty);
      const [x1, , x3, y1, , y3] = this.getXYLinesByNode({ x: computedX, y: computedY, width: computedWidth, height: computedHeight });
      let [[xSnapOffset, , targetSnapX], [ySnapOffset, , targetSnapY]] = enableSnap ? this.snap([x1, x3], [y1, y3], xSnapPoints, ySnapPoints) : [[0], [0]];
      switch (direction) {
        case "nw-resize":
          xSnapOffset *= -1;
          ySnapOffset *= -1;
          if (targetSnapX === x3)
            xSnapOffset *= -1;
          if (targetSnapY === y3)
            ySnapOffset *= -1;
          break;
        case "n-resize":
          ySnapOffset *= -1;
          if (targetSnapY === y3)
            ySnapOffset *= -1;
          break;
        case "ne-resize":
          ySnapOffset *= -1;
          if (targetSnapX === x1)
            xSnapOffset *= -1;
          if (targetSnapY === y3)
            ySnapOffset *= -1;
          break;
        case "w-resize":
          xSnapOffset *= -1;
          if (targetSnapX === x3)
            xSnapOffset *= -1;
          break;
        case "e-resize":
          if (targetSnapX === x1)
            xSnapOffset *= -1;
          break;
        case "sw-resize":
          xSnapOffset *= -1;
          if (targetSnapX === x3)
            xSnapOffset *= -1;
          if (targetSnapY === y1)
            ySnapOffset *= -1;
          break;
        case "s-resize":
        case "se-resize":
          if (targetSnapX === x1)
            xSnapOffset *= -1;
          if (targetSnapY === y1)
            ySnapOffset *= -1;
          break;
      }
      if (enableCenterOrigin) {
        xSnapOffset *= 2;
        ySnapOffset *= 2;
      }
      tx += xSnapOffset;
      ty += ySnapOffset;
      if (enableFixedRatio) {
        if (tx === 0)
          tx = ty * width / height;
        else if (ty === 0)
          ty = tx * height / width;
        if (width / height > Math.abs(tx + width) / Math.abs(ty + height))
          tx = ty * width / height;
        else
          ty = tx * height / width;
      }
      this.focused.size(rx, ry, x, y, width, height, tx, ty);
      this.send("move", this.focused);
      return [computedX, computedY, computedWidth, computedHeight];
    }
    subscirbe(subscriber) {
      super.subscribe(subscriber);
      subscriber.init(this);
    }
    send(type, payload) {
      this.notify({ type, payload });
    }
  };
  var EditorControl = _EditorControl;
  __publicField(EditorControl, "RESIZE_EDGE_THRESHOLD", 30);
  __publicField(EditorControl, "SNAP_THRESHOLD", 10);
  var EditorView = class extends Observer {
    container = (0, import_html.div)({ className: "editor-container" });
    removeListener;
    mapIdToElement = new Map();
    updateListeners = {
      add: (node) => {
        const item = (0, import_html.div)({
          className: `editor-node-${node.id}`,
          style: {
            position: "absolute",
            width: node.width + "px",
            height: node.height + "px",
            left: node.x + "px",
            top: node.y + "px",
            background: node.background
          }
        });
        this.mapIdToElement.set(node.id, item);
        this.container.appendChild(item);
      },
      move: (node) => {
        const target = this.mapIdToElement.get(node.id);
        Object.assign(target.style, {
          left: node.x + "px",
          top: node.y + "px",
          width: node.width + "px",
          height: node.height + "px"
        });
      },
      remove: (node) => {
        const target = this.mapIdToElement.get(node.id);
        target.parentNode?.removeChild(target);
        this.mapIdToElement.delete(node.id);
      }
    };
    update(message) {
      requestAnimationFrame(() => {
        this.updateListeners[message.type]?.(message.payload);
      });
    }
    init(editorControl2) {
      this.removeListener?.();
      while (this.container.firstChild)
        this.container.removeChild(this.container.firstChild);
      this.removeListener = drag_control_default(this.container, {
        down: (ev) => {
          const { relX, relY } = ev;
          ev.preventDefault();
          const direction = editorControl2.getDirectionByCursor(relX, relY);
          if (direction) {
            const [xSnapPoints2, ySnapPoints2] = editorControl2.getSnapPoints(editorControl2.getSnapNodesExceptFocus(editorControl2.getFocusedId()));
            return { type: "size", direction, node: { ...editorControl2.focused }, xSnapPoints: xSnapPoints2, ySnapPoints: ySnapPoints2 };
          }
          const focused = editorControl2.setFocusByCursor(relX, relY);
          editorControl2.focusUpdate();
          const [xSnapPoints, ySnapPoints] = focused ? editorControl2.getSnapPoints(editorControl2.getSnapNodesExceptFocus(focused.id)) : [];
          return focused && { type: "move", direction: null, node: { ...focused }, xSnapPoints, ySnapPoints };
        },
        move({ tx, ty, shiftKey, altKey, ctrlKey }, { type, direction, node: { x, y, width, height }, xSnapPoints, ySnapPoints }) {
          if (type === "move") {
            editorControl2.focusUpdate(null);
            editorControl2.move(x, y, width, height, tx, ty, shiftKey, !ctrlKey, xSnapPoints, ySnapPoints);
          } else if (type === "size") {
            editorControl2.size(direction, x, y, width, height, tx, ty, shiftKey, altKey, !ctrlKey, xSnapPoints, ySnapPoints);
          }
        },
        up() {
          editorControl2.snapOff();
          editorControl2.focusUpdate();
        },
        key(ev, { type, direction, node: { x, y, width, height }, xSnapPoints, ySnapPoints }) {
          ev.preventDefault();
          const { tx, ty, shiftKey, altKey, ctrlKey } = ev;
          if (type === "move")
            editorControl2.move(x, y, width, height, tx, ty, shiftKey, !ctrlKey, xSnapPoints, ySnapPoints);
          else if (type === "size")
            editorControl2.size(direction, x, y, width, height, tx, ty, shiftKey, altKey, !ctrlKey, xSnapPoints, ySnapPoints);
        }
      });
    }
  };
  var TransformView = class extends Observer {
    control = (0, import_html.div)();
    container = (0, import_html.div)({ className: "transform-container" }, [
      this.control = (0, import_html.div)({ className: "transform-control", style: {
        position: "absolute",
        display: "none",
        boxShadow: "0 0 0 2px skyblue"
      } })
    ]);
    updateListeners = {
      focus: (node) => {
        if (node) {
          Object.assign(this.control.style, {
            display: "block",
            left: node.x + "px",
            top: node.y + "px",
            width: node.width + "px",
            height: node.height + "px"
          });
        } else {
          Object.assign(this.control.style, {
            display: "none"
          });
        }
      },
      move: (node) => {
        Object.assign(this.control.style, {
          left: node.x + "px",
          top: node.y + "px",
          width: node.width + "px",
          height: node.height + "px"
        });
      }
    };
    init() {
    }
    update(message) {
      requestAnimationFrame(() => {
        this.updateListeners[message.type]?.(message.payload);
      });
    }
  };
  var SnaplineView = class extends Observer {
    xSnapLine;
    ySnapLine;
    container = (0, import_html.div)({ className: "snap-lines" }, [
      this.xSnapLine = (0, import_html.div)({ style: {
        position: "absolute",
        width: "1px",
        borderLeft: "1px solid red"
      } }),
      this.ySnapLine = (0, import_html.div)({ style: {
        position: "absolute",
        height: "1px",
        borderTop: "1px solid red"
      } })
    ]);
    clear() {
      while (this.container.firstChild)
        this.container.removeChild(this.container.firstChild);
    }
    updateListeners = {
      snapline: ([targetXPoints, targetYPoints, xSnapOffsetPoints, ySnapOffsetPoints]) => {
        this.container.style.visibility = "visible";
        if (xSnapOffsetPoints[0]) {
          const minTargetY = Math.min(...targetYPoints);
          const maxTargetY = Math.max(...targetYPoints);
          const [dist, [y1, y3], targetX] = xSnapOffsetPoints;
          const top = Math.min(minTargetY, y1);
          const height = Math.max(maxTargetY, y3) - top;
          this.xSnapLine.style.left = targetX + dist + "px";
          this.xSnapLine.style.top = top + dist + "px";
          this.xSnapLine.style.height = height + "px";
        }
        if (ySnapOffsetPoints[0]) {
          const minTargetX = Math.min(...targetXPoints);
          const maxTargetX = Math.max(...targetXPoints);
          const [dist, [x1, x3], targetY] = ySnapOffsetPoints;
          const left = Math.min(minTargetX, x1);
          const width = Math.max(maxTargetX, x3) - left;
          this.ySnapLine.style.left = left + "px";
          this.ySnapLine.style.top = targetY + dist + "px";
          this.ySnapLine.style.width = width + "px";
        }
      },
      "snapline-hide": () => {
        this.container.style.visibility = "hidden";
      }
    };
    init() {
    }
    update(message) {
      requestAnimationFrame(() => {
        this.updateListeners[message.type]?.(message.payload);
      });
    }
  };

  // src/index.ts
  var nodeId = 0;
  var addButton = (0, import_html2.button)({ innerText: "Add", onclick: () => {
    const node = new EditorNode({
      id: nodeId++,
      width: 120,
      height: 120,
      background: "#" + Array.from({ length: 3 }, () => Math.floor(Math.random() * 255).toString(16).padStart(2, "0")).join("")
    });
    editorControl.add(node);
  } });
  document.body.appendChild(addButton);
  var editorControl = new EditorControl();
  var transformView = new TransformView();
  document.body.appendChild(transformView.container);
  var editorView = new EditorView();
  document.body.appendChild(editorView.container);
  var snaplineView = new SnaplineView();
  document.body.appendChild(snaplineView.container);
  editorView.container.style.width = "100%";
  editorView.container.style.height = "100%";
  editorControl.subscirbe(editorView);
  editorControl.subscirbe(transformView);
  editorControl.subscirbe(snaplineView);
  for (const i of Array(10)) {
    editorControl.add(new EditorNode({
      id: nodeId++,
      x: Math.floor(Math.random() * 600),
      y: Math.floor(Math.random() * 600),
      width: Math.floor(Math.random() * 300) + 50,
      height: Math.floor(Math.random() * 300) + 50,
      background: "#" + Array.from({ length: 3 }, () => Math.floor(Math.random() * 255).toString(16).padStart(2, "0")).join("")
    }));
  }
})();
