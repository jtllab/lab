import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('timingDestroy')
export class timingDestroy extends Component {
    start() {
        // 1秒后销毁节点
        setTimeout(function () {
            this.node.destroy();
        }.bind(this), 1000);
    }

    update(deltaTime: number) {
        
    }
}


