import { _decorator, Component, BoxCollider2D, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('log')
export class log extends Component {
    start() {
        let collider = this.node.getComponent(BoxCollider2D);
        console.info('collider layer group', collider.group);
    }

    update(deltaTime: number) {
        
    }
}


