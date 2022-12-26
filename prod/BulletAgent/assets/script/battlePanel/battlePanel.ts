import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('battlePanel')
export class battlePanel extends Component {

    diffX: number = 0;
    diffY: number = 0;

    timeCount: number = 0

    timeCountNode: Node = null;

    start() {
        this.timeCountNode = this.node.getChildByName("time")
        this.timeCountNode.getComponent(Label).string = "00:00";

        this.diffX = this.node.parent.getChildByName("hero").position.x - this.node.position.x
        this.diffY = this.node.parent.getChildByName("hero").position.y - this.node.position.y

        this.schedule(function() {
            this.updateTime()
        }, 1);
    }

    update(deltaTime: number) {
        if (this.diffX === 0 || this.diffY === 0){
            return 
        }
        let x = this.node.parent.getChildByName("hero").position.x - this.diffX;
        let y = this.node.parent.getChildByName("hero").position.y - this.diffY;
        
        this.node.setPosition(x, y, this.node.position.z)
    }

    updateTime() {
        let min:string = (parseInt((this.timeCount / 60).toString()).toString());
        min = +min < 10? '0' + min : min;
        let sec:string = (this.timeCount % 60).toString();
        sec = +sec < 10? '0' + sec : sec;
        this.timeCountNode.getComponent(Label).string = min + ":" + sec
        this.timeCount += 1;
    }
}


