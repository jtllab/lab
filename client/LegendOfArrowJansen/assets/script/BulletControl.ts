import { _decorator, Component, Node, Vec2, NodePool, SpriteFrame, Sprite, Input, input, Vec3, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("bullet")
export class BulletControl extends Component {
    // 子弹的移动方向
    public posOffset: math.Vec3 = new math.Vec3(0, 0, 0);

    // 记录子弹的初始位置，用于检查子弹是否飞出太远，如果太远则销毁子弹，防止子弹一直存在浪费计算机资源
    private beginPos: Vec3;
    start() {
        this.beginPos = this.node.getPosition();
    }

    onLoad() {
        // 每 1/60 秒调用一次 onTimer 函数
        this.schedule(this.onTimer, 1 / 60);
    }

    // 由于我们这里使用定时器来更新子弹飞行位置，所以不需要在 update 函数中更新子弹位置
    update(deltaTime: number) {}

    // 定时器回调函数，更新子弹位置
    onTimer() {
        {
            // 检查子弹是否飞出太远，如果是则销毁子弹，防止一直存在浪费计算机资源
            if (this.node.getPosition().subtract(this.beginPos).length() > 1000) {
                // 取消这个定时器，防止一直存在浪费计算机资源
                this.unschedule(this.onTimer);
                // 销毁这个node就是销毁这个子弹
                this.node.destroy();
                return;
            }
        }
        // 更新子弹位置
        this.node.setPosition(this.node.getPosition().add(this.posOffset));
    }
}
