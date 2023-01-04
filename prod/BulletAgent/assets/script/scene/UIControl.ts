import { _decorator, Component, Node, Button, director, Scene, SceneAsset } from 'cc';
import { sceneControl } from './sceneControl';
const { ccclass, property } = _decorator;

@ccclass('UIControl')
export class UIControl extends Component {

    @property(Button)
    startBtn: Button | null = null;

    @property(SceneAsset)
    startScene: SceneAsset | null = null;

    onLoad () {
        if (this.startBtn) {
            this.startBtn.node.on(Button.EventType.CLICK, this.startBtnCallback, this);
        }
    }
    
    start() {

    }

    update(deltaTime: number) {
        
    }

    startBtnCallback (button: Button) {
        if (this.startScene){
            sceneControl.loadMainScene();
        }
    }
}


