import { _decorator, Component, Node, v2, Vec2, v3, random } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('chikenControl')
export class chikenControl extends Component {
    //鸡的移动速度
    speed : number = 100;
    direction : number = 1;
    onLoad()
    {
        //1秒改变一次方向
        this.schedule(this.change, 1);
    }

    start() {

    }

    
    update(deltaTime: number) {
        this.node.position = this.node.position.add(v3(this.direction*this.speed*deltaTime,0));
        
        if(this.node.position.x > 960|| this.node.position.x < 0)
        {
            this.speed =- this.speed;
        } 
    }

    change(deltaTime:number){
        //改变方向
        let direction = Math.random()>0.5?1:-1;
    }
}


