import {
  _decorator,
  Component,
  CCInteger,
  RigidBody2D,
  PhysicsSystem2D,
  EventTouch,
  SystemEventType,
  misc,
  Vec3,
  Vec2,
  Node,
} from "cc";
const { ccclass, property } = _decorator;

import { instance, SpeedType } from "./Joystick";
import type { JoystickDataType } from "./Joystick";
import { heroControl } from "../hero/heroControl";

PhysicsSystem2D.instance.enable = true;

@ccclass("Player")
export default class Player extends Component {
  // from joystick
  @property({
    displayName: "Move Dir",
    tooltip: "移动方向",
  })
  moveDir = new Vec3(0, 1, 0);

  @property({
    tooltip: "速度级别",
  })
  _speedType: SpeedType = SpeedType.STOP;

  // from self
  @property({
    type: CCInteger,
    tooltip: "移动速度",
  })
  _moveSpeed = 0;

  @property({
    type: CCInteger,
    tooltip: "停止时速度",
  })
  stopSpeed = 0;

  @property({
    type: CCInteger,
    tooltip: "正常速度",
  })
  normalSpeed = 100;

  @property({
    type: CCInteger,
    tooltip: "最快速度",
  })
  fastSpeed = 200;

  @property(Node)
  playerNode: Node;

  onLoad() {
    instance.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
    instance.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
    instance.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
    // console.log("Player onLoad");
  }

  onTouchStart() {}

  onTouchMove(event: EventTouch, data: JoystickDataType) {
    this._speedType = data.speedType;
    this.moveDir = data.moveVec;

    this.onSetMoveSpeed(this._speedType);
    // console.log("Player onTouchMove");
  }

  onTouchEnd(event: EventTouch, data: JoystickDataType) {
    this._speedType = data.speedType;

    this.onSetMoveSpeed(this._speedType);
    // console.log("Player onTouchEnd");
  }

  /**
   * set moveSpeed by SpeedType
   * @param speedType
   */
  onSetMoveSpeed(speedType: SpeedType) {
    switch (speedType) {
      case SpeedType.STOP:
        this._moveSpeed = this.stopSpeed;
        this.playerNode.getComponent(heroControl).setDir(this.moveDir.clone().multiplyScalar(this._moveSpeed))
        break;
      case SpeedType.NORMAL:
        this._moveSpeed = this.normalSpeed;
        break;
      case SpeedType.FAST:
        this._moveSpeed = this.fastSpeed;
        break;
      default:
        break;
    }
  }

  /**
   * 移动
   */
  move() {
      this.playerNode.getComponent(heroControl).setDir(this.moveDir.clone());
  }

  update(deltaTime: number) {
    if (this._speedType !== SpeedType.STOP) {
      this.move();
    }
  }
}
