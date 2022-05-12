class Reanim extends PIXI.Container {
    constructor(acts) {
        super()
        this.actionList = acts
        this.frame = 0
        this.parts = new Map()

        for(let act of this.actionList[this.frame]) {
            let texture = loader.resources[act.i].texture
            let a = new PIXI.Sprite(texture)
            a.position.set(act.x, act.y)
            // a.pivot.set(-act.x + texture.width, -act.y + texture.height)
            // a.pivot.set(0, 0)
            a.scale.set(act.sx, act.sy)
            if(act.kx != undefined) {
                if(act.kx != 0 || act.ky != 0) {
                    // a.skew.set(act.kx, act.ky)
                }
            }
            this.parts.set(act.i, a)
            this.addChild(a)
        }
    }

    step() {
        this.frame++
        if(this.frame >= this.actionList.length) {
            this.frame = 0
        }
        for(let p of this.parts.values()) {
            p.alpha = 0
        }
        for(let act of this.actionList[this.frame]) {
            let a = this.parts.get(act.i)
            if(!a) {
                a = new PIXI.Sprite(loader.resources[act.i].texture)
                this.addChild(a)
                this.parts.set(act.i, a)
            } else {
                a.alpha = 1
            }
            a.position.set(act.x, act.y)
            // a.pivot.set(-act.x, -act.y)
            a.scale.set(act.sx, act.sy)
            if(act.kx != undefined) {
                // a.skew.set(act.kx, act.ky)
            }
        }
    }

}