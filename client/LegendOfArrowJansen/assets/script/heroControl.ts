import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Animation, Sprite, SpriteFrame, Prefab, instantiate, math } from "cc";
import { BulletControl } from "./BulletControl";
const { ccclass, property } = _decorator;

@ccclass("HeroControl")
export class HeroControl extends Component {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    private _state: string = "";
    private _playerAni: Animation = null;

    // hero移动速度
    speed: number = 2;

    // hero移动单位偏移量，每次update时，英雄移动的偏移量等于 posOffset * posOffsetMul，posOffsetMul为0时，不移动。
    posOffsetMul: number = 0;
    // 保留 posOffset 的原因是这相当于是子弹射出方向，子弹的移动方向也是根据这个来的
    posOffset: math.Vec3 = new math.Vec3(0, -this.speed, 0);

    // 用于初始化英雄射出的子弹， @property 的作用是告诉引擎：这个参数可以在编辑器中设置，这样就可以在编辑器中设置子弹的预制体了。在编辑器中把子弹的预置体拖到这个变量上即设置完成。
    @property(Prefab)
    bulletPrefab: Prefab = null;

    start() {}

    onLoad() {
        // 注册键盘和鼠标的控制事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.MOUSE_DOWN, this.onTouch, this);

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this._playerAni = this.node.getComponent(Animation);
    }

    // 每帧引擎都会自动执行一次这个函数，deltaTime 参数表示本次调用距离上次调用过去了多久
    update(deltaTime: number) {
        // 注意，因为 Vec3 的计算方法都会修改自己的值，所以要先 clone 一个值再操作，避免修改到原始值
        var off = this.posOffset.clone();
        // 乘上 posOffsetMul，在不移动时，这个值为 0，乘以0后这个向量就是 0 了，就不会移动了
        off = off.multiplyScalar(this.posOffsetMul);
        // 用位置偏移量更新节点位置
        this.node.setPosition(this.node.getPosition().add(off));
    }

    // 用于更新方向及速度，如果涉及到操作英雄的动作，都应该执行一下这个函数
    updatePosOffset() {
        this.posOffsetMul = 0;
        if (this.left || this.right || this.up || this.down) {
            // 如果有按键按下，就把速度设置乘数设置为1，这样就会移动了
            this.posOffsetMul = 1;

            // 根据按键情况更新方向
            // 这里有一个 BUG，如果同时按下横竖两个方向键，会导致英雄实际跑动方向更快，就留给你们自己修复了(提示，斜向走时，减小 posOffsetMul 的值)
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

    // 按下按键时
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            // 键盘A按下
            case KeyCode.KEY_A:
                console.log("AAAA");
                this.left = true;
                break;
            // 键盘D按下
            case KeyCode.KEY_D:
                console.log("DDDD");
                this.right = true;
                break;
            // 键盘W按下
            case KeyCode.KEY_W:
                console.log("WWW");
                this.up = true;
                break;
            // 键盘S按下
            case KeyCode.KEY_S:
                console.log("SSS");
                this.down = true;
                break;
        }
        this.updatePosOffset();
    }

    // 按键起升时触发
    onKeyUp(enevt: EventKeyboard) {
        switch (enevt.keyCode) {
            case KeyCode.KEY_A:
                // 键盘A抬起
                this.left = false;
                break;
            case KeyCode.KEY_D:
                // 键盘D抬起
                this.right = false;
                break;
            case KeyCode.KEY_W:
                // 键盘W抬起
                this.up = false;
                break;
            case KeyCode.KEY_S:
                // 键盘S抬起
                this.down = false;
                break;
        }
        this.updatePosOffset();
    }

    // 当鼠标点击时触发
    onTouch() {
        this.fire();
        console.log("fire");
    }

    // 修改英雄的动画状态，包括正面背面和侧面
    setState(state) {
        if (this._state == state) return;
        this._state = state;
        if (this._playerAni) {
            this._playerAni.play(this._state);
        }
    }

    //开火射击
    fire() {
        // 实例化子弹预置体
        let bullet: Node = instantiate(this.bulletPrefab);

        //设置子弹相对父节点位置
        bullet.setPosition(this.node.position);

        // 注意，因为 Vec3 的计算方法都会修改自己的值，所以要先 clone 一个值再操作，避免修改到原始值
        var posOffset = this.posOffset.clone();

        // 初始化子弹的移动速度，这包括的是子弹的方向和速度
        bullet.getComponent(BulletControl).posOffset = posOffset.multiplyScalar(5);

        //挂载到炮台节点下
        this.node.parent.addChild(bullet);
    }
}
