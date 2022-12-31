import { _decorator, Component, Node, Button, director, Scene, SceneAsset } from 'cc';
import { sceneControl } from './sceneControl';
const { ccclass, property } = _decorator;

@ccclass('btnSwitchSceneControl')
export class btnSwitchSceneControl extends Component {

    @property(Button)
    switchSceneBtn: Button | null = null;

    @property(SceneAsset)
    toSceneAsset: SceneAsset | null = null;

    onLoad () {
        if (this.switchSceneBtn) {
            this.switchSceneBtn.node.on(Button.EventType.CLICK, this.sceneBtnCallback, this);
        }
    }
    
    start() {

    }

    update(deltaTime: number) {
        
    }

    sceneBtnCallback (button: Button) {
        if (this.toSceneAsset){
            sceneControl.loadScene(this.toSceneAsset);
        }
    }
}


