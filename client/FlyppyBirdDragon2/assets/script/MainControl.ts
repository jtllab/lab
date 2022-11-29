import { _decorator, Component, Node, Sprite, Vec3, Prefab, instantiate, Button, EventMouse, Label} from 'cc';
import { AudioSourceControl, SoundType } from './AudioSourceControl';
const { ccclass, property } = _decorator;

export enum GameStatus {
    GameReady = 0,
    GamePlaying,
    GameOver
}

@ccclass('MainControl')
export class MainControl extends Component {

    @property(Sprite)
    spBg : Sprite [] = [null, null];

    @property(Prefab)
    pipePrefab : Prefab;

    pipe : Node[] = [null, null, null]


    @property
    secChangeOffset = new Vec3();

    @property
    resetOffset = new Vec3();

    gameOver : Sprite;

    gameStart : Button;

    gameStatus : GameStatus = GameStatus.GameReady;

    @property(Label)
    lableScore : Label;

    gameScore : number = 0;

    @property(AudioSourceControl)
    audioSourceControl : AudioSourceControl;

    onLoad(){
        this.gameOver = this.node.getChildByName("GameOver").getComponent(Sprite);
        this.gameOver.node.active = false;
        this.gameStart = this.node.getChildByName("BtnStart").getComponent(Button);
        this.gameStart.node.on(Node.EventType.MOUSE_DOWN, this.onGameStartDown, this);
    }

    start() {
       //生成管道
       for (let i = 0; i < this.pipe.length; i++){
            this.pipe[i] = instantiate(this.pipePrefab);
            this.node.getChildByName("Pipe").addChild(this.pipe[i]);
            let minY = -120;
            let maxY = 120;
            this.pipe[i].setPosition(new Vec3(190 + 170 * i, minY + Math.random() * (maxY - minY)));
            console.log(this.pipe[i].getPosition());
        }
    }


    update(deltaTime: number) {
        //判断游戏结束
        if (this.gameStatus != GameStatus.GamePlaying){
            return;
        }
        for (let i = 0; i < this.spBg.length; i++){
            this.spBg[i].node.setPosition(this.spBg[i].node.getPosition().subtract(this.secChangeOffset));
            if (this.spBg[i].node.getPosition().x <= -288 ){
                this.spBg[i].node.setPosition(this.resetOffset);
            }
        }

        //移动管道
        for (let i = 0; i < this.pipe.length; i++){
            this.pipe[i].setPosition(this.pipe[i].getPosition().subtract(this.secChangeOffset));
            if (this.pipe[i].getPosition().x <= -170){
                let minY = -120;
                let maxY = 120;
                this.pipe[i].setPosition(new Vec3(340, minY + Math.random() * (maxY - minY)));
            }
        }
    }

    gameOverActive(){
        this.gameOver.node.active = true;
        this.gameStart.node.active = true;
        this.gameStatus = GameStatus.GameOver;
    }

    //开始游戏
    onGameStartDown(event : EventMouse){
        this.gameStart.node.active = false;
        this.gameStatus = GameStatus.GamePlaying;
        //重复游玩时需要重新隐藏gameover
        this.gameOver.node.active = false;
        //重置管道
        for (let i = 0; i < this.pipe.length; i++){
            this.node.getChildByName("Pipe").addChild(this.pipe[i]);
            let minY = -120;
            let maxY = 120;
            this.pipe[i].setPosition(new Vec3(190 + 170 * i, minY + Math.random() * (maxY - minY)));
            console.log(this.pipe[i].getPosition());
        }

        //重置鸟的位置
        let bird = this.node.getChildByName("Bird");
        bird.setPosition(new Vec3(0,0,0));
        //记分重置
        this.gameScore = 0;
        this.lableScore.string = this.gameScore.toString();
        this.audioSourceControl.playSound(SoundType.SoundStart);
    }

   
}


