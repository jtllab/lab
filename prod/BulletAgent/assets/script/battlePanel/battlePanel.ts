import { _decorator, Component, Label, Node, ProgressBar, Button, director } from 'cc';
import { heroControl } from '../hero/heroControl';
const { ccclass, property } = _decorator;

@ccclass('battlePanel')
export class battlePanel extends Component {

    diffX: number = 0;
    diffY: number = 0;

    timeCount: number = 0;

    stop: boolean = false;

    timeCountNode: Node = null;
    killedNode: Node = null;
    levelNode: Node = null;
    pauseNode: Node = null;
    expBar: ProgressBar = null;

    heroComponent: heroControl = null;

    killed: number = 0;

    start() {
        this.heroComponent = this.node.parent.getChildByName("hero").getComponent(heroControl)
        this.timeCountNode = this.node.getChildByName("time")
        this.killedNode = this.node.getChildByName("killNum")
        this.levelNode = this.node.getChildByName("expLevel")
        this.pauseNode = this.node.getChildByName("pause")
        this.expBar = this.levelNode.getComponent(ProgressBar)
        this.diffX = this.node.parent.getChildByName("hero").position.x - this.node.position.x
        this.diffY = this.node.parent.getChildByName("hero").position.y - this.node.position.y

        this.pauseNode.on(Button.EventType.CLICK, this.pauseCallback, this);

        this.schedule(function() {
            this.updateTime()
        }, 1);
    }

    update(deltaTime: number) {
        let currentLevel: number = this.heroComponent.level
        let currentExp: number = this.heroComponent.exp
        let needUpgradeExp: number = this.heroComponent.levelInfo[currentLevel]
        this.expBar.progress = 1 - currentExp/needUpgradeExp;
        this.killedNode.getChildByName("killed").getComponent(Label).string = this.killed.toString();
        this.levelNode.getChildByName("level").getComponent(Label).string = currentLevel.toString();
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

    pauseCallback() {
        if (this.stop) {
            director.resume()
            this.stop = false
        } else {
            director.pause()
            this.stop = true
        }
    }
}


