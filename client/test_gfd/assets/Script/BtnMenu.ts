import { _decorator, Component, Node, Sprite, Vec3, director, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BtnMenu')
export class BtnMenu extends Component {
    


    //橙色按钮背景
    @property(Sprite)
    btn_bg_orange :Sprite = null;

    shangdian: Node = null;     //商店
    zhuangbei: Node = null;     //装备
    zhandou: Node = null;       //战斗
    tiaozhan: Node = null;      //挑战
    jinhua: Node = null;        //进化

    click_bg: Node = null;      //点击效果背景图

    zhandou_UI:Node = null;     //战斗界面UI

    mission: Node = null;      //选择关卡

    mission_label: Node = null;

    
    start() {

    }
    onLoad(){
        this.click_bg = this.node.getChildByName("click_bg");
        this.shangdian = this.node.getChildByName("shangdian_btn");
        this.zhuangbei = this.node.getChildByName("zhuangbei_btn");
        this.zhandou = this.node.getChildByName("zhandou_btn");
        this.tiaozhan = this.node.getChildByName("tiaozhan_btn");
        this.jinhua = this.node.getChildByName("jinhua_btn");
        //


        this.zhandou_UI = this.zhandou.getChildByName("zhandou_UI");
        this.mission = this.zhandou_UI.getChildByName("Mission");
        this.mission_label = this.mission.getChildByName("mission1");
        console.info(this.mission_label.name);


    }


    click_shangdian(){
        this.click_bg.setPosition(new Vec3(-288,0,0));
        this.zhandou_UI.active = false;
    }

    click_zhuangbei(){
        this.click_bg.setPosition(new Vec3(-144,0,0));
        this.zhandou_UI.active = false;
    }

    click_zhandou(){
        this.click_bg.setPosition(new Vec3(0,0,0));
        this.zhandou_UI.active = true;
    }
    click_tiaozhan(){
        this.click_bg.setPosition(new Vec3(144,0,0));
        this.zhandou_UI.active = false;
    }
    click_jinhua(){
        this.click_bg.setPosition(new Vec3(288,0,0));
        this.zhandou_UI.active = false;
    }


    LoadMission(){
        director.loadScene(this.mission_label.name);
    }


    update(deltaTime: number) {
        
    }
}


