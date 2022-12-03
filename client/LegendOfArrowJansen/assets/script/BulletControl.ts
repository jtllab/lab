import {
    _decorator,
    Component,
    Node,
    Vec2,
    NodePool,
    SpriteFrame,
    Sprite,
    Input,
    input,
    Vec3,
    math,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("bullet")
export class BulletControl extends Component {
    public posOffset: math.Vec3 = new math.Vec3(0, 0, 0);

    onLoad() {
        //  this.node.on(Input.EventType.MOUSE_DOWN,this.onTouch,this)
        this.schedule(this.onTimer, 1 / 60);
    }

    private beginPos: Vec3;
    start() {
        this.beginPos = this.node.getPosition();
        // console.log("BulletControl start: ", this.beginPos);
    }

    update(deltaTime: number) {
        // console.log("BulletControl");
    }

    onTimer() {
        if (this.node.getPosition().subtract(this.beginPos).length() > 1000) {
            this.unschedule(this.onTimer);
            this.explode();
            return;
        }
        this.node.setPosition(this.node.getPosition().add(this.posOffset));
    }

    explode() {
        this.afterExplode();
        // console.log("BulletControl explode: ", this.node.getPosition());
    }

    afterExplode() {
        this.node.destroy();
    }
}
