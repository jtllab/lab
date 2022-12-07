import { _decorator, Component, Node, v2, Vec2, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('chikenControl')
export class chikenControl extends Component {
    //鸡的移动速度
    speed : number = 100;

    start() {

    }

    
    update(deltaTime: number) {
        this.node.position = this.node.position.add(v3(this.speed*deltaTime,0));
        
        if(this.node.position.x > 960|| this.node.position.x < 0)
        {
            this.speed =- this.speed;
        } 
    }

    movement(){

    }
}


