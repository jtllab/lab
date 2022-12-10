import { _decorator, Component, Node, Collider2D, BoxCollider2D, IPhysics2DContact, Contact2DType ,} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('monster_dragon_Control')
export class monster_dragon_Control extends Component {
    
    hp : number = 5;

    
    start() {

    }

    onLoad() {
        //碰撞监听
        let boxCollider = this.node.getComponent(BoxCollider2D);
        boxCollider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
        console.info("dragon");
    }
    

    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null){
        
        console.info("onBeginContact");
        

    }

    update(deltaTime: number) {
        
        if(this.hp == 0)
        {
            this.node.destroy();
        }
    }
}


