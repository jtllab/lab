import { _decorator, Component, Node, PolygonCollider2D, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('targetControl')
export class targetControl extends Component {

    collider: PolygonCollider2D;

    onLoad() {
        this.collider = this.node.getComponent(PolygonCollider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.onHitBegin,this);
    }

    start() {

    }

    update(deltaTime: number) {
        
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


