import { _decorator, Component, Node, TiledMap, RigidBody2D, PhysicsSystem2D, ERigidBody2DType, Vec2, BoxCollider2D, UITransform, resources, TiledMapAsset, Vec3, MouseJoint2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {

    @property({type: Node})
    public mapNode: Node | null = null;

    public static physicGroupType = {
        wall : 1 << 1,
        player: 1 << 2,
        smog: 1 << 3
    };

    initMapNode(mapNode) {
        if (mapNode){
            mapNode.getComponent(UITransform).setAnchorPoint(new Vec2(0, 0));

            let map = mapNode.getComponent(TiledMap);
            map.enableCulling = false;

            let tiledSize = map.getTileSize();
            
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

    init(mapNameArr) {
        for (let index = 0; index < mapNameArr.length; index++) {
            for (let j = 0; j < mapNameArr[index].length; j++) {
                const element = mapNameArr[index][j];

                if (!element || element == '00000') continue;

                resources.load(`maps/${element}`, TiledMapAsset, (err, asset) => {
                    let node = new Node();
                    let map = node.addComponent(TiledMap);

                    let x = (j - Math.floor(mapNameArr[index].length / 2)) * 384;
                    let y = -(index - Math.floor(mapNameArr[index].length / 2)) * 384;
                    node.setPosition(new Vec3(x, y ,0));
                    
                    map.tmxAsset = asset;
                    node.parent = this.mapNode;
                    this.initMapNode(node);
                })
            }
            
        }
    }

    onLoad() {
        let mapNameArr = [
            ['00000', '01000', '00000'],
            ['00010', '11110', '00100'],
            ['00000', '10000', '00000'],
        ]

        this.init(mapNameArr);
    }

    start() {
        // let p = PhysicsSystem2D.instance;
        // p.debugDrawFlags = 1;
    }

    update(deltaTime: number) {
        
    }
}


