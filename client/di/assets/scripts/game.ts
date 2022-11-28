import { _decorator, Component, Node, TiledMap, RigidBody2D, PhysicsSystem2D, ERigidBody2DType, Vec2, BoxCollider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {

    @property({type: TiledMap})
    public map: TiledMap | null = null;

    start() {
        let p = PhysicsSystem2D.instance;
        //p.debugDrawFlags = 1;

        if (this.map){
            let layer = this.map.getLayer('wall');
            let layerSize = layer.getLayerSize();
            let tiledSize = this.map.getTileSize();

            // console.info('layersize')
            // console.info(layerSize)
            // console.info(tiledSize)

            for (let i = 0; i < layerSize.width; i++) {
                for (let j = 0; j < layerSize.height; j++) {
                    let tiled = layer.getTiledTileAt(i, j, true);
                    let tiledId = layer.getTileGIDAt(i, j);
                    
                    if (tiledId != 0) {
                        //console.info(tiledId)
                        let body = tiled.node.addComponent(RigidBody2D);
                        body.type = ERigidBody2DType.Static;
                        let collider = tiled.node.addComponent(BoxCollider2D);
                        // console.info(tiledSize.width, tiledSize.height);
                        // console.info('----', tiledSize.x, tiledSize.y);
                        // console.info('----', collider.offset);
                        collider.offset = new Vec2(tiledSize.width/2, tiledSize.height/2);
                        //console.info('----', collider.offset);
                        //collider.offset = new Vec2(0, 0);
                        collider.size = tiledSize;
                        collider.group = 2;
                        collider
                        collider.apply();
                    }
                }
            }
        }
    }

    update(deltaTime: number) {
        
    }
}


