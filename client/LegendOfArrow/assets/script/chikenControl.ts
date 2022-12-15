import { _decorator, Component, Node, v2, Vec2, v3, random } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('chikenControl')
export class chikenControl extends Component {

    
    //鸡的移动速度
    speed : number = 100;
    direction1 : number = 1;
    direction2 : number = -1;

    onLoad()
    {
        //1秒改变一次方向
        this.schedule(this.change, 1);
    }

    start() {

    }

    
    update(deltaTime: number) {
        this.node.position = this.node.position.add(v3(this.direction1*this.speed*deltaTime,this.direction2*this.speed*deltaTime));
        
        if(this.node.position.x > 960|| this.node.position.x < 0 ||this.node.position.y < 0||this.node.position.y < 640)
        {
            this.speed =- this.speed;
        } 
    }

    change(deltaTime:number){
        //改变方向
        this.direction1 = Math.random()>0.5?1:-1;
        this.direction2 = Math.random()>0.5?1:-1;

    }
}


