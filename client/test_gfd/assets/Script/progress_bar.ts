import { _decorator, Component, Node, ProgressBar, Sprite, director} from 'cc';
import { GameState, GameStatus } from './GameStatus';
const { ccclass, property } = _decorator;

@ccclass('progress_bar')
export class progress_bar extends Component {
    
    progress_Sprite: Sprite = null;
    pro_bar: ProgressBar = null;
    step : number = 0.1;
    
    start() {
        //获取节点的组件属性
        this.progress_Sprite = this.node.getComponent(Sprite);
        //console.info(this.progress_Sprite);
        //从属性祖中提取progress
        this.pro_bar = this.progress_Sprite.getComponent(ProgressBar);
        //console.info(this.pro_bar.totalLength);

    }


    update(dt: number) {
        
        //进度条的progress值为 0-1之间
        if(this.pro_bar.progress < 1){
            this.pro_bar.progress += this.step * dt;
           
        }
        else {
            GameStatus.setGameStateRedey();
        }
    }
}


