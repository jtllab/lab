import { _decorator, Component, Node, Vec3, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('camera')
export class camera extends Component {
    @property({type: Node})
    public player: Node | null = null;
    
    start() {

    }

    update(deltaTime: number) {
        if (!this.player) return;

        
        let w_pos = new Vec3();
        this.player.getComponent(UITransform).convertToWorldSpaceAR(this.player.getPosition(), w_pos);
        let n_pos = new Vec3();
        this.player.parent.getComponent(UITransform).convertToNodeSpaceAR(w_pos, n_pos);

        this.node.setPosition(n_pos);
    }
}


