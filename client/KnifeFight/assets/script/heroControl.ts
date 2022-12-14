import { _decorator, Component, Node, v2, Vec3, v3, random, input, Input, PolygonCollider2D, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('heroControl')
export class heroControl extends Component {

    startPosition: any = this

    collider: PolygonCollider2D;

    onLoad()
    {
        input.on(Input.EventType.TOUCH_MOVE, this.touch_move, this)
        input.on(Input.EventType.TOUCH_START, this.touch_start, this)

        console.log(this.node);
        console.log(this.node.getComponent(PolygonCollider2D));
        
        this.collider = this.node.getComponent(PolygonCollider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.onHitBegin,this);
    }


    start() {

    }

    update(deltaTime: number) {
        
    }

    touch_start(e) {
        // console.log(this.node)
        let location = e.getLocation()
        this.startPosition = location
        // console.log("start", location);
    }

    touch_move(e) {
        let location = e.getLocation()
        let x = (location.x - this.startPosition.x) / 100
        let y = (location.y - this.startPosition.y) / 100
        let newPosition = new Vec3(this.node.position.x + x, this.node.position.y + y, this.node.position.z)
        this.node.setPosition(newPosition);
        // console.log("move", location);
    }

    onHitBegin(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null){
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        // switch (other.node.name){
        //     case "chiken":
        //         console.log("hit begin other is:",other);
        //         break;
        // }
    }
}


