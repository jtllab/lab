import { _decorator, Component, Vec3, input, Input, EventMouse, EventKeyboard,Animation, macro, KeyCode, Vec2, RigidBody } from "cc";
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
  private _curJumpSpeed: number = 200;
  // 当前角色位置
  private _curPos: Vec3 = new Vec3();
  // 每次跳跃过程中，当前帧移动位置差
  private _deltaPos: Vec3 = new Vec3(0, 0, 0);
  // 角色目标位置
  private _targetPos: Vec3 = new Vec3();

  //设置移动速度
  private _speed = 200;



  start() {
    // Your initialization goes here.
    input.on(Input.EventType.KEY_DOWN, this.onKeyboardDown, this);

    //input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);

  }

  onMouseUp(event: EventMouse) {
    if (event.getButton() === 0) {
      this.jumpByStepUP(100);
    } else if (event.getButton() === 1) {
      this.jumpByStepUP(200);
    }
  }


  //按键按下
    onKeyboardDown(event:EventKeyboard){
      //console.log(event.keyCode);
      

      if(event.keyCode === KeyCode.ARROW_UP){
        console.log("上");
        //set.setPosition();
        //Vec3();
        //this.node.setPosition(new Vec3(0,this.node.getPosition().y + 1,0));  //腿毛
        this.node.setPosition(this.node.getPosition().add3f(0, 1, 0));   //jansen  可用
      }
      if(event.keyCode === KeyCode.ARROW_LEFT){
        console.log("左");
      }

      if(event.keyCode === KeyCode.ARROW_DOWN){
        console.log("下");
      }

      if(event.keyCode === KeyCode.ARROW_RIGHT){
        console.log("右");
      }

    }

    


  jumpByStepUP(step: number) {
    if (this._startJump) {
      return;
    }
    this._startJump = true;
    this._jumpStep = step;
    this._curJumpTime = 0;
    this._curJumpSpeed = this._jumpStep / this._jumpTime;
    this.node.getPosition(this._curPos);
    Vec3.add(this._targetPos, this._curPos, new Vec3(0, this._jumpStep, 0));
  }

  jumpByStepLeft(step: number) {
    if (this._startJump) {
      return;
    }
    this._startJump = true;
    this._jumpStep = step;
    this._curJumpTime = 0;
    this._curJumpSpeed = this._jumpStep / this._jumpTime;
    this.node.getPosition(this._curPos);
    Vec3.add(this._targetPos, this._curPos, new Vec3(0,this._jumpStep,  0));
  }

  update(deltaTime: number) {

    if (this._startJump) {
      this._curJumpTime += deltaTime;
      if (this._curJumpTime > this._jumpTime) {
        // end
        // this.node.setPosition(this._targetPos);
        this._startJump = false;
      } else {
        // tween
        this.node.getPosition(this._curPos);
        this._deltaPos.y = this._curJumpSpeed * deltaTime;
        Vec3.add(this._curPos, this._curPos, this._deltaPos);
        this.node.setPosition(this._curPos);
      }
    }
  }
}
