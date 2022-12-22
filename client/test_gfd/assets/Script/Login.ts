import { _decorator, Component, Node ,Prefab, instantiate, Vec3, EventMouse,Button, director} from 'cc';
import { GameState, GameStatus } from './GameStatus';
const { ccclass, property } = _decorator;

@ccclass('Login')
export class Login extends Component {
   

    //加载进度条预制体
    @property(Prefab)
    proBar: Prefab = null;

    //开始按钮
    btnStart : Button = null;


    start() {

    }


    onLoad(){
        this.btnStart = this.node.getChildByName("BtnStart").getComponent(Button);
        //this.btnStart.node.on(Node.EventType.MOUSE_DOWN, this.btnStartClick, this);
    }

    


    btnStartClick(){
        this.btnStart.node.active = false;
         //初始化进度条
        var progresssbar = instantiate(this.proBar);
        this.node.addChild(progresssbar);
        progresssbar.setPosition(new Vec3(0,-500,0));
    }

   
    //进入主场景
    LoadMainSence(){
        director.loadScene("MainSence");
    }

    update(dt: number) {
        if(GameStatus.gamestate==GameState.Ready){
            this.LoadMainSence();
        }
        
    }
}


