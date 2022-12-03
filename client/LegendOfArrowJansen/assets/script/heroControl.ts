import {
    _decorator,
    Component,
    Node,
    input,
    Input,
    EventKeyboard,
    KeyCode,
    Animation,
    Sprite,
    SpriteFrame,
    Prefab,
    instantiate,
    math,
} from "cc";
import { BulletControl } from "./BulletControl";
const { ccclass, property } = _decorator;

@ccclass("heroControl")
export class heroControl extends Component {
    heroLoc: number = 0;
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    private _state: string = "";
    private _playerAni: Animation = null;

    //hero移动速度
    speed: number = 2;
    //hero移动单位偏移量
    posOffsetMul: number = 0;
    posOffset: math.Vec3 = new math.Vec3(0, -this.speed, 0);

    @property(SpriteFrame)
    bulleteicon: SpriteFrame = null;

    @property(Prefab)
    bulletPrefab: Prefab = null;

    start() {}

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        this.heroLoc = this.node.getPosition().x;
        console.log(this.heroLoc);
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this._playerAni = this.node.getComponent(Animation);

        input.on(Input.EventType.MOUSE_DOWN, this.onTouch, this);
    }

    update(deltaTime: number) {
        var off = this.posOffset.clone();
        off = off.multiplyScalar(this.posOffsetMul);
        this.node.setPosition(this.node.getPosition().add(off));
    }

    updatePosOffset() {
        this.posOffsetMul = 0;
        if (this.left || this.right || this.up || this.down) {
            this.posOffsetMul = 1;
            if (this.left) {
                //节点X坐标正方向移动
                this.posOffset.x = -this.speed;
                this.setState("hero_left");
            } else if (this.right) {
                //节点X坐标负方向移动
                this.posOffset.x = this.speed;
                this.setState("hero_right");
            } else {
                this.posOffset.x = 0;
            }
            if (this.up) {
                //节点y坐标正方向移动
                this.posOffset.y = this.speed;
                this.setState("hero_up");
            } else if (this.down) {
                //节点y坐标负方向移动
                this.posOffset.y = -this.speed;
                this.setState("hero_down");
            } else {
                this.posOffset.y = 0;
            }
        } else {
            this.posOffsetMul = 0;
        }
    }

    //按下按键时
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            //键盘A触发
            case KeyCode.KEY_A:
                console.log("AAAA");
                this.left = true;
                break;

            //键盘D触发
            case KeyCode.KEY_D:
                console.log("DDDD");
                this.right = true;
                break;
            //键盘W触发
            case KeyCode.KEY_W:
                console.log("WWW");
                this.up = true;
                break;
            //键盘S触发
            case KeyCode.KEY_S:
                console.log("SSS");
                this.down = true;
                break;
        }
        this.updatePosOffset();
    }
    //按键起升时触发
    onKeyUp(enevt: EventKeyboard) {
        switch (enevt.keyCode) {
            case KeyCode.KEY_A:
                this.left = false;
                break;
            case KeyCode.KEY_D:
                this.right = false;
                break;
            case KeyCode.KEY_W:
                this.up = false;
                break;
            case KeyCode.KEY_S:
                this.down = false;
                break;
        }
        this.updatePosOffset();
    }

    setState(state) {
        if (this._state == state) return;

        this._state = state;
        if (this._playerAni) {
            this._playerAni.play(this._state);
        }
    }

    onTouch() {
        this.fire();
        console.log("fire");
    }
    //开火射击
    fire() {
        let bullet: Node = instantiate(this.bulletPrefab);

        //挂载到炮台节点下
        // bullet.parent=this.node;
        //设置相对父节点位置
        bullet.setPosition(this.node.position);
        var posOffset = this.posOffset.clone();
        bullet.getComponent(BulletControl).posOffset =
            posOffset.multiplyScalar(5);
        this.node.parent.addChild(bullet);
        // bullet.layer = this.node.layer;
    }
}
