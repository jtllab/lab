import { _decorator, Component, Node, Vec2, NodePool, SpriteFrame, Sprite, Input, input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {


    onLoad(){
      this.schedule(this.onTimer,0.01);
    }

    start() {

    }

    update(deltaTime: number) {

    }
    
  



  onTimer(){
      if(this.node.getPosition().y>300){
          this.unschedule(this.onTimer);
          this.node.destroy();
          return;
      }
      this.node.getPosition().y+=5;
  }



}


