import { Observer, Subject } from "./observer";
import { button, div, style } from 'element-mold/dist/html';
import addDragHandler from "./drag-control";

const comp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));
const isBetweenEqual = (val: number, min: number, max: number) => min <= val && val <= max;
const isInRect = (x: number, y: number, minX: number, maxX: number, minY: number, maxY: number) => minX <= x && x <= maxX && minY <= y && y <= maxY;

let nodeId = 0;

interface EditorNodeBase {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  children: EditorNodeBase[];
}

export class EditorNode implements EditorNodeBase {
  id!: number;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  rotate: number = 0;
  background: string = '';
  children: EditorNodeBase[] = [];

  minWidth: number = 10;
  maxWidth: number = Infinity;
  minHeight: number = 10;
  maxHeight: number = Infinity;

  constructor(params: {id: number} & Partial<EditorNode>) {
    Object.assign(this, params);
  }
  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  size(fixedXAxisRatio: number, fixedYAxisRatio: number, x: number, y: number, width: number, height: number, w2add: number, h2add: number) {
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
}

export type EditorMethods = {
  add: EditorNode;
  remove: EditorNode;
  move: EditorNode;
  focus: EditorNode|null;
  test: number;
  snapline: [number[], number[], [number, [number, number], number], [number, [number, number], number]]; // targetXPoints, targetYPoints, snapXPoints, snapYPoints;
  'snapline-hide': undefined;
}

type EditorMessages = {type: string; payload: any;};


export class EditorControl extends Subject<EditorMessages>{
  static RESIZE_EDGE_THRESHOLD = 30;
  static SNAP_THRESHOLD = 10;
  children: EditorNode[] = [];
  focused: EditorNode|null = null;

  getFocusedId() {
    return this.focused?.id ?? null;
  }
  getXYLinesByNode(node: EditorNode) {
    return EditorNode.prototype.getXYLines.bind(node)();
  }
  getSnapNodesExceptFocus(nodeId: number) {
    return this.children.filter(({id}) => id !== nodeId);
  }
  getSnapPoints(nodes: EditorNode[]) {
    return nodes
      .map(node => node.getXYLines())
      .map(([x1, x2, x3, y1, y2, y3]) => [
        [[x1, [y1, y3]], [x2, [y1, y3]], [x3, [y1, y3]]],
        [[y1, [x1, x3]], [y2, [x1, x3]], [y3, [x1, x3]]],
      ]).reduce((acc, [xSnapPoints, ySnapPoints]) => {
        acc[0].push(...xSnapPoints);
        acc[1].push(...ySnapPoints);
        return acc;
      }, [[], []] as [[number, [number, number]][], [number, [number, number]][]]);
  }

  snap(targetXSnapPoints: number[], targetYSnapPoints: number[], xSnapPoints: [number, [number, number]][], ySnapPoints: [number, [number, number]][]) {
    const distanceOfXPoints = xSnapPoints
      .map<[number, [number, number], number][]>(([value, data]) => targetXSnapPoints.map(val => [value - val, data, val])) // [거리, [스냅 대상 y1, 스냅 대상 y2], 드래그 타겟 x 원본];
      .flat();
    const distanceOfXPointsSorted = [...distanceOfXPoints].sort(([a], [b])=> Math.abs(a) - Math.abs(b));
    const xSnapOffsetPoint = distanceOfXPointsSorted.find(([val]) => val !== 0 && Math.abs(val) < EditorControl.SNAP_THRESHOLD) ?? [0, [null, null], null];
    const xSnapOffset = xSnapOffsetPoint[0];
    const resultXSnapPoints = distanceOfXPointsSorted.filter(([dist], i, arr) => dist === 0 || dist === xSnapOffset);

    const distanceOfYPoints = ySnapPoints
      .map<[number, [number, number], number][]>(([value, data]) => targetYSnapPoints.map(val => [value - val, data, val])) // [거리, [스냅 대상 x1, 스냅 대상 x2], 드래그 타겟 y 원본];
      .flat();
    const distanceOfYPointsSorted = [...distanceOfYPoints].sort(([a], [b])=> Math.abs(a) - Math.abs(b));
    const ySnapOffsetPoint = distanceOfYPointsSorted.find(([val]) => val !== 0 && Math.abs(val) < EditorControl.SNAP_THRESHOLD) ?? [0, [null, null], null];
    const ySnapOffset = ySnapOffsetPoint[0];
    const resultYSnapPoints = distanceOfYPointsSorted.filter(([dist], i, arr) => dist === 0 || dist === ySnapOffset);

    this.send('snapline', [
      targetXSnapPoints,
      targetYSnapPoints,
      xSnapOffsetPoint as [number, [number, number], number],
      ySnapOffsetPoint as [number, [number, number], number]
    ]);
    
    return [xSnapOffsetPoint, ySnapOffsetPoint];
  }
  snapOff() {
    this.send('snapline-hide');
  }
  getDirectionByCursor(clientX: number, clientY: number) { // 포커스 중일때 방향확인
    if (!this.focused) return null;
    const {x, y, width, height} = this.focused;
    const halfResizeEdge = EditorControl.RESIZE_EDGE_THRESHOLD / 2;

    if (isInRect(clientX, clientY, x - halfResizeEdge, x + halfResizeEdge, y - halfResizeEdge, y + halfResizeEdge)) {
      return 'nw-resize';
    } else if (isInRect(clientX, clientY, x + halfResizeEdge, x + width - halfResizeEdge, y - halfResizeEdge, y + halfResizeEdge)) {
      return 'n-resize';
    } else if (isInRect(clientX, clientY, x + width - halfResizeEdge, x + width + halfResizeEdge, y - halfResizeEdge, y + halfResizeEdge)) {
      return 'ne-resize';
    } else if (isInRect(clientX, clientY, x - halfResizeEdge, x + halfResizeEdge, y + halfResizeEdge, y + height - halfResizeEdge)) {
      return 'w-resize';
    } else if (isInRect(clientX, clientY, x + width - halfResizeEdge, x + width + halfResizeEdge, y + halfResizeEdge, y + height - halfResizeEdge)) {
      return 'e-resize';
    } else if (isInRect(clientX, clientY, x - halfResizeEdge, x + halfResizeEdge, y + height - halfResizeEdge, y + height + halfResizeEdge)) {
      return 'sw-resize';
    } else if (isInRect(clientX, clientY, x + halfResizeEdge, x + width - halfResizeEdge, y + height - halfResizeEdge, y + height + halfResizeEdge)) {
      return 's-resize';
    } else if (isInRect(clientX, clientY, x + width - halfResizeEdge, x + width + halfResizeEdge, y + height - halfResizeEdge, y + height + halfResizeEdge)) {
      return 'se-resize';
    } else {
      return null;
    }
  }

  setFocusByCursor(clientX: number, clientY: number) { // 포커스 우선 탐색
    return this.focused = ([...this.focused ? [this.focused] : [], ...[...this.children].reverse()]).find(node => {
      const {x, y, width, height} = node;
      if (x <= clientX && clientX <= x + width && y <= clientY && clientY <= y + height) return node;
    }) ?? null;
  }
  focusUpdate(node: EditorNode|null = this.focused) {
    // this.focused = node;
    this.send('focus', node);
  }

  find(node: EditorNode) {
    const target = this.children.find(child => child === node);
    if (!target) throw `Not found node: ${JSON.stringify(node)}`;
    return target;
  }
  add(node: EditorNode, index: number = this.children.length) {
    this.children.splice(index, 0, node);
    this.send('add', node);
  }
  remove(node: EditorNode) {
    this.children.splice(this.children.indexOf(node), 1);
    this.send('remove', node);
  }
  move(
    x: number, 
    y: number,
    width: number,
    height: number,
    tx: number,
    ty: number,
    enableLinear: boolean,
    enableSnap: boolean,
    xSnapPoints: [number, [number, number]][],
    ySnapPoints: [number, [number, number]][]
  ) {
    if (!this.focused) return;
    if (enableLinear) {
      const degree = (Math.atan2(tx, ty) * 180 / Math.PI + 180) % 180;
      const targetDegree = [0, 45, 90, 135, 180].map(val => [val, Math.abs(val - degree)]).sort((a, b) => a[1] - b[1])[0][0];
      if (!targetDegree || targetDegree === 180) tx = 0;
      else if (targetDegree === 45) tx = ty;
      else if (targetDegree === 90) ty = 0;
      else if (targetDegree === 135) tx = -ty;
    }
    const computedX = x + tx;
    const computedY = y + ty;
    const [x1, x2, x3, y1, y2, y3] = this.getXYLinesByNode({x: computedX, y: computedY, width, height} as EditorNode);
    const [[xSnapOffset], [ySnapOffset]] = enableSnap ? this.snap([x1, x2, x3], [y1, y2, y3], xSnapPoints, ySnapPoints) : [[0], [0]];
    
    tx += xSnapOffset;
    ty += ySnapOffset;
    // if (shiftKey) { // 스냅후 재조정 필요
    this.focused.move(x + tx, y + ty);
    this.send('move', this.focused);
  }
  size(
    direction: string, 
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    tx: number, 
    ty: number, 
    enableFixedRatio: boolean, 
    enableCenterOrigin: boolean, 
    enableSnap: boolean,
    xSnapPoints: [number, [number, number]][],
    ySnapPoints: [number, [number, number]][]
  ) {
    if (!this.focused) return;
    const injectAlt = (val: number) => enableCenterOrigin ? 0.5 : val;

    let rx = 0;
    let ry = 0;
    switch (direction) {
    case 'nw-resize': rx = injectAlt(1); ry = injectAlt(1); tx *= -1; ty *= -1; break;
    case 'n-resize': rx = injectAlt(0.5); ry = injectAlt(1); tx *= 0; ty *= -1; break;
    case 'ne-resize': rx = injectAlt(0); ry = injectAlt(1); tx *= 1; ty *= -1; break;
    case 'w-resize': rx = injectAlt(1); ry = injectAlt(0.5); tx *= -1; ty *= 0; break;
    case 'e-resize': rx = injectAlt(0); ry = injectAlt(0.5); tx *= 1; ty *= 0; break;
    case 'sw-resize': rx = injectAlt(1); ry = injectAlt(0); tx *= -1; ty *= 1; break;
    case 's-resize': rx = injectAlt(0.5); ry = injectAlt(0); tx *= 0; ty *= 1; break;
    case 'se-resize': rx = injectAlt(0); ry = injectAlt(0); tx *= 1; ty *= 1; break;
    }
    if (enableCenterOrigin) {
      tx *= 2;
      ty *= 2;
    }
    if (enableFixedRatio) { // tx : ty = width : height 
      if (tx === 0) tx = ty * width / height;
      else if (ty === 0) ty = tx * height / width;

      if (width / height > Math.abs(tx + width) / Math.abs(ty + height)) tx = ty * width / height;
      else ty = tx * height / width;
    }

    const {x: computedX, y: computedY, width: computedWidth, height: computedHeight} = this.focused.size.bind({
      x, 
      y, 
      width, 
      height, 
      minWidth: this.focused.minWidth,
      maxWidth: this.focused.maxWidth,
      minHeight: this.focused.minHeight,
      maxHeight: this.focused.maxHeight,
    })(rx, ry, x, y, width, height, tx, ty);

    const [x1,, x3, y1,, y3] = this.getXYLinesByNode({x: computedX, y: computedY, width: computedWidth, height: computedHeight} as EditorNode);
    let [[xSnapOffset,,targetSnapX], [ySnapOffset,,targetSnapY]] = enableSnap ? this.snap([x1, x3], [y1, y3], xSnapPoints, ySnapPoints) : [[0], [0]];

    switch (direction) { // 반대쪽 스냅 발생 확인로직 추가
      case 'nw-resize': 
        xSnapOffset *= -1;
        ySnapOffset *= -1;
        if (targetSnapX === x3) xSnapOffset *= -1;
        if (targetSnapY === y3) ySnapOffset *= -1;
        break;
      case 'n-resize': 
        ySnapOffset *= -1;
        if (targetSnapY === y3) ySnapOffset *= -1;
        break;
      case 'ne-resize': 
        ySnapOffset *= -1;
        if (targetSnapX === x1) xSnapOffset *= -1;
        if (targetSnapY === y3) ySnapOffset *= -1;
        break;
      case 'w-resize':
        xSnapOffset *= -1;
        if (targetSnapX === x3) xSnapOffset *= -1;
        break;
      case 'e-resize':
        if (targetSnapX === x1) xSnapOffset *= -1;
        break;
      case 'sw-resize':
        xSnapOffset *= -1;
        if (targetSnapX === x3) xSnapOffset *= -1;
        if (targetSnapY === y1) ySnapOffset *= -1;
        break;
      case 's-resize':
        // if (targetSnapY === y1) ySnapOffset *= -1; ???
      case 'se-resize':
        if (targetSnapX === x1) xSnapOffset *= -1;
        if (targetSnapY === y1) ySnapOffset *= -1;
        break;
    }
    if (enableCenterOrigin) { xSnapOffset *= 2; ySnapOffset *= 2; }
    tx += xSnapOffset;
    ty += ySnapOffset;
    // console.log(xSnapOffset, x1, x3, targetSnapX)
    if (enableFixedRatio) { // 다시 계산
      if (tx === 0) tx = ty * width / height;
      else if (ty === 0) ty = tx * height / width;

      if (width / height > Math.abs(tx + width) / Math.abs(ty + height)) tx = ty * width / height;
      else ty = tx * height / width;
    }

    this.focused.size(rx, ry, x, y, width, height, tx, ty); // min, max를 private로 하기 위한 분리
    this.send('move', this.focused);

    return [computedX, computedY, computedWidth, computedHeight];

  }
  subscirbe(subscriber: Observer<EditorMessages>) {
    super.subscribe(subscriber);
    (subscriber as any).init(this);
  }
  private send<T extends keyof EditorMethods>(type: T, payload?: EditorMethods[T]) {
    this.notify({type, payload});
  }
}

export class EditorView extends Observer<EditorMessages> {
  container = div({className: 'editor-container'});
  removeListener: Function|undefined;

  mapIdToElement: Map<number, HTMLElement> = new Map();

  private updateListeners: Partial<{[K in keyof EditorMethods]: ((payload: EditorMethods[K]) => void)|(() => void)}> = {
    add: node => {
      const item = div({className: `editor-node-${node.id}`,
        style: {
          position: 'absolute',
          width: node.width + 'px',
          height: node.height + 'px',
          left: node.x + 'px',
          top: node.y + 'px',
          background: node.background,
        },
      });
      this.mapIdToElement.set(node.id, item);
      this.container.appendChild(item);
    },
    move: node => {
      const target = this.mapIdToElement.get(node.id) as HTMLElement;
      Object.assign(target.style, {
        left: node.x + 'px',
        top: node.y + 'px',
        width: node.width + 'px',
        height: node.height + 'px',
      });
    },
    remove: node => {
      const target = this.mapIdToElement.get(node.id) as HTMLElement;
      target.parentNode?.removeChild(target);
      this.mapIdToElement.delete(node.id);
    },
  };
  update(message: EditorMessages) {
    requestAnimationFrame(() => {
      (this.updateListeners[message.type as keyof EditorMethods] as any)?.(message.payload);
    });
  }

  init(editorControl: EditorControl) {
    this.removeListener?.();

    while (this.container.firstChild) this.container.removeChild(this.container.firstChild);

    this.removeListener = addDragHandler(this.container, {
      down: ev => {
        const {relX, relY} = ev;
        ev.preventDefault();
        const direction = editorControl.getDirectionByCursor(relX, relY);
        
        if (direction) {
          const [xSnapPoints, ySnapPoints] = editorControl.getSnapPoints(editorControl.getSnapNodesExceptFocus(editorControl.getFocusedId() as number));
          return {type: 'size', direction, node: {...editorControl.focused}, xSnapPoints, ySnapPoints};
        }
        const focused = editorControl.setFocusByCursor(relX, relY) as EditorNode;
        editorControl.focusUpdate();
        const [xSnapPoints, ySnapPoints] = focused ? editorControl.getSnapPoints(editorControl.getSnapNodesExceptFocus(focused.id)) : [];
        return focused && {type: 'move', direction: null, node: {...focused}, xSnapPoints, ySnapPoints};
      },
      move({tx, ty, shiftKey, altKey, ctrlKey}, {type, direction, node: {x, y, width, height}, xSnapPoints, ySnapPoints}) {
        if (type === 'move') {
          editorControl.focusUpdate(null);
          editorControl.move(x, y, width, height, tx, ty, shiftKey, !ctrlKey, xSnapPoints, ySnapPoints);
        } else if (type === 'size') {
          editorControl.size(direction, x, y, width, height, tx, ty, shiftKey, altKey, !ctrlKey, xSnapPoints, ySnapPoints);
        }
      },
      up() {
        editorControl.snapOff();
        editorControl.focusUpdate();
      },
      key(ev, {type, direction, node: {x, y, width, height}, xSnapPoints, ySnapPoints}) {
        ev.preventDefault();
        const {tx, ty, shiftKey, altKey, ctrlKey} = ev;
        if (type === 'move') editorControl.move(x, y, width, height, tx, ty, shiftKey, !ctrlKey, xSnapPoints, ySnapPoints);
        else if (type === 'size') editorControl.size(direction, x, y, width, height, tx, ty, shiftKey, altKey, !ctrlKey, xSnapPoints, ySnapPoints);
      }
    });
  }
}

export class TransformView extends Observer<EditorMessages> {
  control = div();
  container = div({className: 'transform-container'}, [
    this.control = div({className: 'transform-control', style: {
      position: 'absolute',
      display: 'none',
      boxShadow: '0 0 0 2px skyblue',
    }}),
  ]);
  private updateListeners: Partial<{[K in keyof EditorMethods]: ((payload: EditorMethods[K]) => void)|(() => void)}> = {
    focus: node => {
      if (node) {
        Object.assign(this.control.style, {
          display: 'block',
          left: node.x + 'px',
          top: node.y + 'px',
          width: node.width + 'px',
          height: node.height + 'px',
        });
      } else {
        Object.assign(this.control.style, {
          display: 'none',
        });
      }
    },
    move: node => {
      Object.assign(this.control.style, {
        left: node.x + 'px',
        top: node.y + 'px',
        width: node.width + 'px',
        height: node.height + 'px',
      });
    },
  };

  init() {

  }
  update(message: EditorMessages) {
    requestAnimationFrame(() => {
      (this.updateListeners[message.type as keyof EditorMethods] as any)?.(message.payload);
    });
  }
}

export class SnaplineView extends Observer<EditorMessages> {
  xSnapLine!: HTMLDivElement;
  ySnapLine!: HTMLDivElement;
  container = div({className: 'snap-lines'}, [
    this.xSnapLine = div({style: {
      position: 'absolute',
      width: '1px',
      borderLeft: '1px solid red',
    }}),
    this.ySnapLine = div({style: {
      position: 'absolute',
      height: '1px',
      borderTop: '1px solid red',
    }}),
  ]);

  clear() {
    while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
  }

  private updateListeners: Partial<{[K in keyof EditorMethods]: ((payload: EditorMethods[K]) => void)|(() => void)}> = {
    snapline: ([targetXPoints, targetYPoints, xSnapOffsetPoints, ySnapOffsetPoints]) => {
      this.container.style.visibility = 'visible';
      if (xSnapOffsetPoints[0]) {
        const minTargetY = Math.min(...targetYPoints);
        const maxTargetY = Math.max(...targetYPoints);

        const [dist, [y1, y3], targetX] = xSnapOffsetPoints;
        const top = Math.min(minTargetY, y1);
        const height = Math.max(maxTargetY, y3) - top;
        this.xSnapLine.style.left = targetX + dist + 'px';
        this.xSnapLine.style.top = top + dist + 'px';
        this.xSnapLine.style.height = height + 'px';
      }
      if (ySnapOffsetPoints[0]) {
        const minTargetX = Math.min(...targetXPoints);
        const maxTargetX = Math.max(...targetXPoints);

        const [dist, [x1, x3], targetY] = ySnapOffsetPoints;
        const left = Math.min(minTargetX, x1);
        const width = Math.max(maxTargetX, x3) - left;
        this.ySnapLine.style.left = left + 'px';
        this.ySnapLine.style.top = targetY + dist + 'px';
        this.ySnapLine.style.width = width + 'px';
      }
    },
    'snapline-hide': () => {
      this.container.style.visibility = 'hidden';
    }
  };

  init() {

  }
  update(message: EditorMessages) {
    requestAnimationFrame(() => {
      (this.updateListeners[message.type as keyof EditorMethods] as any)?.(message.payload);
    });
  }
}