import { _decorator, Component, Node, TiledMap, RigidBody2D, PhysicsSystem2D, ERigidBody2DType, Vec2, BoxCollider2D, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {

    @property({type: Node})
    public map: Node | null = null;

    public static physicGroupType = {
        wall : 1 << 1,
        player: 1 << 2,
        smog: 1 << 3
    };

    start() {
        let p = PhysicsSystem2D.instance;
        p.debugDrawFlags = 1;

        if (this.map){
            for (const mapNode of this.map.children) {
                mapNode.getComponent(UITransform).setAnchorPoint(new Vec2(0, 0));

                let map = mapNode.getComponent(TiledMap);
                let tiledSize = map.getTileSize();
                console.info("tiledSize", tiledSize)
                
                let wallLayer = map.getLayer('wall');
                let wallLayerSize = wallLayer.getLayerSize();


                for (let i = 0; i < wallLayerSize.width; i++) {
                    for (let j = 0; j < wallLayerSize.height; j++) {
                        let tiled = wallLayer.getTiledTileAt(i, j, true);
                        let tiledId = tiled.grid;
                        
                        if (tiledId != 0) {
                            let body = tiled.node.addComponent(RigidBody2D);
                            body.type = ERigidBody2DType.Static;
                            body.group = game.physicGroupType.wall;
                            let collider = tiled.node.addComponent(BoxCollider2D);
                            collider.offset = new Vec2(tiledSize.width/2, tiledSize.height/2);
                            collider.size = tiledSize;
                            collider.group = game.physicGroupType.wall;
                            collider.apply();
                        }
                    }
                }
            }
        }
    }

    update(deltaTime: number) {
        
    }
}


