import { _decorator, Component, Node, director, SceneAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('sceneControl')
export class sceneControl {
    static loadStartScene(){
        director.loadScene("start");
    }

    static loadMainScene(){
        director.loadScene("mission1");
    }

    static loadScene(sceneAsset: SceneAsset){
        if (sceneAsset) {
            director.loadScene(sceneAsset.name);
            if (director.isPaused) {
                director.resume();
            }
        }
        else {
            console.log("无法加载，场景资源不存在");
        }
    }
}


