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
        
        let otherBox_size = other.node.getComponent(BoxCollider2D).size;

        // player 非攻击状态的碰撞体积设为了(0,0)，所以遇到为（0，0）的碰撞体积不会减少HP
        if(otherBox_size.width == 0 && otherBox_size.height == 0) return;
        this.hp--;
        console.info(this.hp);

    }

    update(deltaTime: number) {
        
        
        if(this.hp == 0)
        {
            this.node.destroy();
        }
    }
}


