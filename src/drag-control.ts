type DragControlDownEvent = PointerEvent & { layerX: number, layerY: number; originX: number; originY: number };
type DragControlMoveEvent = PointerEvent & { layerX: number, layerY: number; dx: number; dy: number; tx: number; ty: number };
type DragControlUpEvent = PointerEvent & { layerX: number, layerY: number; dx: number; dy: number; tx: number; ty: number }
type DragControlKeyEvent = KeyboardEvent & { layerX: number, layerY: number; tx: number; ty: number }

export class DragControl {
  ox: number = 0;
  oy: number = 0;
  tx: number = 0;
  ty: number = 0;
  prevX: number = 0;
  prevY: number = 0;
  payload: any;
  isPressed: boolean = false;

  private down?(ev: DragControlDownEvent): void;
  private move?(ev: DragControlMoveEvent, payload: any): void;
  private up?(ev: DragControlUpEvent, payload: any): void;
  private keydown?(ev: DragControlKeyEvent, payload: any): void;
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
  downHandler(ev: PointerEvent) {
    const { clientX, clientY } = ev;
    this.ox = this.prevX = clientX;
    this.oy = this.prevY = clientY;

    this.down?.({...ev, originX: this.prevX, originY: this.prevY } as any);
  }
  moveHandler(ev: PointerEvent) {
    const { clientX, clientY } = ev;
    const dx = clientX - this.prevX;
    const dy = clientY - this.prevY;
    this.prevX = clientX;
    this.prevY = clientY;

    this.tx = clientX - this.ox;
    this.ty = clientY - this.oy;
    this.move?.(Object.assign(ev, {dx, dy, tx: this.tx, ty: this.ty } as any), this.payload);
  }
  upHandler(ev: PointerEvent) {
    const { clientX, clientY } = ev;
    const dx = clientX - this.prevX;
    const dy = clientY - this.prevY;
    this.prevX = clientX;
    this.prevY = clientY;

    this.up?.(Object.assign(ev, {dx, dy, tx: clientX - this.ox, ty: clientY - this.oy } as any), this.payload);
    this.setDown();
    this.setMove();
    this.setUp();
    this.setKeydown();
    this.payload = undefined;
  }
  keydownHandler(ev: KeyboardEvent) {
    if (this.isPressed) return;
    this.isPressed = true;
    this.keydown?.(Object.assign(ev, {tx: this.tx, ty: this.ty } as any), this.payload);
    const keyupHandler = (ev: KeyboardEvent) => {
      this.isPressed = false;
      this.keydown?.(Object.assign(ev, {tx: this.tx, ty: this.ty } as any), this.payload);
      document.removeEventListener('keyup', keyupHandler);
    };
    document.addEventListener('keyup', keyupHandler);
  }
  setKeydown(f?: (ev: DragControlKeyEvent, payload: any) => void) {
    this.keydown = f;
  }

  setDown(f?: (ev: DragControlDownEvent) => void) {
    this.down = f;
  }
  setMove(f?: (ev: DragControlMoveEvent, payload: any) => void){
    this.move = f;
  }
  setUp(f?: (ev: DragControlUpEvent, payload: any) => void) {
    this.up = f;
  }
}



const dragControl = new DragControl();

const addDragHandler: <T>(target: HTMLElement, handlers: {
  down(ev: DragControlDownEvent & {relX: number; relY: number;}): T|null;
  move?(ev: DragControlMoveEvent, payload: NonNullable<T>): void;
  up?(ev: DragControlUpEvent, payload: NonNullable<T>): void;
  key?(ev: DragControlKeyEvent, payload: NonNullable<T>): void;
  cancel?(ev: DragControlDownEvent|DragControlMoveEvent|DragControlUpEvent): void;
}) => () => void = (target, {down, move, up, cancel, key}) => {
  const handler = (ev: PointerEvent) => {
    const {left, top} = target.getBoundingClientRect();
    const payload = down(Object.assign(ev, {relX: ev.clientX - left, relY: ev.clientY - top}) as DragControlDownEvent & {relX: number; relY: number;});
    if (payload === null) {
      dragControl.setMove();
      dragControl.setUp();
      dragControl.setKeydown();
      cancel?.(ev as DragControlDownEvent);
    } else {
      dragControl.payload = payload;
      dragControl.setMove((ev, payload) => {
        if (move?.(ev, payload) === null) {
          dragControl.setMove();
          dragControl.setUp();
          cancel?.(ev);
        }
      });
      dragControl.setUp(up);
      dragControl.setKeydown(key);
    }
  };
  target.addEventListener('pointerdown', handler);

  return () => {
    dragControl.clear();
    target.removeEventListener('pointerdown', handler);
  }
};

export default addDragHandler;