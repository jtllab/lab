import { _decorator, Component, Vec3, input, Input, EventMouse, Animation, BoxCollider2D, RigidBody2D, math, EventKeyboard, KeyCode } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  /* class member could be defined like this */
  // dummy = '';

  /* use `property` decorator if your want the member to be serializable */
  // @property
  // serializableDummy = 0;

  // for fake tween
  // 是否接收到跳跃指令
  private _startJump: boolean = false;
  // 跳跃步长
  private _jumpStep: number = 0;
  // 当前跳跃时间
  private _curJumpTime: number = 0;
  // 每次跳跃时长
  private _jumpTime: number = 1;
  // 当前跳跃速度
  private _curJumpSpeed: number = 0;
  // 当前角色位置
  private _curPos: Vec3 = new Vec3();
  // 每次跳跃过程中，当前帧移动位置差
  private _deltaPos: Vec3 = new Vec3(0, 0, 0);
  // 角色目标位置
  private _targetPos: Vec3 = new Vec3();

  start() {
    // Your initialization goes here.
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onMouseUp(event: EventMouse) {
    if (event.getButton() === 0) {
      this.jumpByStep(10);
    } else if (event.getButton() === 2) {
      this.jumpByStep(20);
    }
  }

  onKeyDown(event: EventKeyboard) {
    if (event.keyCode === KeyCode.KEY_A) {
      this.moveLine(-10);
    } else if (event.keyCode === KeyCode.KEY_D) {
      this.moveLine(10);
    } else if (event.keyCode === KeyCode.KEY_W) {
      this.jumpByStep(10);
    }
  }

  jumpByStep(step: number) {
    var body = this.node.getComponent(RigidBody2D);
    var v = body.linearVelocity;
    v.y = step;
    body.linearVelocity = v;
    body.linearDamping = 1;
  }

  moveLine(step: number) {
    var body = this.node.getComponent(RigidBody2D);
    var v = body.linearVelocity;
    v.x = step;
    body.linearVelocity = v;
  }

  private a: number = 1;
  update(deltaTime: number) {
    this.node.setRotationFromEuler(new Vec3(0, 0, this.a));
    this.a = this.a + 1;
  }
}
