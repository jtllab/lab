import { _decorator, Component, Node, Sprite, Vec3, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('pipe_control')
export class pipe_control extends Component {

  
    secChangeOffset = new Vec3(1, 0, 0);

    start() {


    }

    

    update(deltaTime: number) {
        this.node.setPosition(this.node.getPosition().subtract(this.secChangeOffset));
        
        
        
    }
}


