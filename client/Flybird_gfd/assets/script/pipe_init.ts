import { _decorator, Component, Node, Prefab, instantiate, Vec3 } from 'cc';
import { GameState, GameStatus } from './common';
const { ccclass, property } = _decorator;

@ccclass('pipe_init')
export class pipe_init extends Component {

    //预制体
    @property(Prefab)
    pipe_down: Prefab = null;

    @property(Prefab)
    pipe_up: Prefab = null;

    
    init_angin: boolean = false;


    start() {
        this.pipe_init();
    }

    onLoad(){
        
    }

    //初始化管道
    pipe_init() {
        //生成管道数量
        var pipe_num = 3;

        //朝下管道初始位置
        for(let i = 0; i < pipe_num; i++) {
            var pipeDown = instantiate(this.pipe_down);
            this.node.addChild(pipeDown);
            var minY = 190;
            var maxY = 300;
            pipeDown.setPosition(new Vec3(40 + 144 * i,minY + Math.random() * (maxY - minY)));

        }
 
        //朝上管道初始位置
        for(let i = 0; i < pipe_num; i++) {
            
            var pipeUp = instantiate(this.pipe_up);
            this.node.addChild(pipeUp)
            var minY = -280;
            var maxY = -200;
            pipeUp.setPosition(new Vec3(40 + 144 * i,minY + Math.random() * (maxY - minY)));

        }
        
    }



    update(deltaTime: number) {
        
        if(GameStatus.gamestate == GameState.GameReady ){
           
            if(this.init_angin){
                
                this.node.removeAllChildren(); 
                //初始化一次后不再继续初始化
                this.init_angin = false;
                this.pipe_init();

            }

        }

        

        if(GameStatus.gamestate == GameState.GameOver){
            this.init_angin = true;
        }

        

    }
}


