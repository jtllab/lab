import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('sceneControl')
export class sceneControl {
    static loadStartScene(){
        director.loadScene("start");
    }

    static loadMainScene(){
        director.loadScene("main");
    }
}


