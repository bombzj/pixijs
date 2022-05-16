class Reanim extends PIXI.Container {
    constructor(acts, ref) {
        super()
        this.ref = ref
        this.actionList = acts
        this.frame = 0
        this.parts = []
        this.offsetX = this.offsetY = 0

        for(let act of this.actionList[this.frame]) {
            if(act.i == 'peashooter_stalk_top') {
                this.ox = 31
                this.oy = 41
            }
            if(!loader.resources[act.i]) debugger
            let texture = loader.resources[act.i].texture
            let a = new PIXI.Sprite(texture)
            a.position.set(act.x, act.y)
            // a.pivot.set(-act.x + texture.width, -act.y + texture.height)
            // a.pivot.set(0, 0)
            a.scale.set(act.sx, act.sy)
            a.skew.set(-act.ky, act.kx)
            if(act.a) {
                a.alpha = act.a
            }
            this.parts.push(a)
            this.addChild(a)
        }
    }

    step() {
        this.frame++
        if(this.frame >= this.actionList.length) {
            this.frame = 0
        }
        let list = this.actionList[this.frame]
        for(let i = this.parts.length;i < list.length;i++) {
            let act = list[i]
            let a = new PIXI.Sprite(loader.resources[act.i].texture)
            this.addChild(a)
            this.parts.push(a)
        }
        for(let i = 0;i < this.parts.length;i++) {
            let part = this.parts[i]
            if(i < list.length) {
                part.alpha =  1
                let act = list[i]
                part.texture = loader.resources[act.i].texture
                if(act.i == 'peashooter_stalk_top') {
                    this.offsetX = act.x - this.ox
                    this.offsetY = act.y - this.oy
                }
                if(this.ref) {
                    part.position.set(act.x + this.ref.offsetX, act.y + this.ref.offsetY)
                } else {
                    part.position.set(act.x, act.y)
                }
                part.scale.set(act.sx, act.sy)
                part.skew.set(-act.ky, act.kx)
                part.alpha = act.a == undefined ? 1 : act.a
                if(act.i.indexOf('duck') != -1// || act.i.indexOf('cone') != -1
                 || act.i.indexOf('bucket') != -1
                 || act.i.indexOf('zombie_screendoor1') != -1
                 || act.i.indexOf('zombie_outerarm_screendoor') != -1
                 || act.i.indexOf('zombie_innerarm_screendoor_hand') != -1
                 || act.i.indexOf('zombie_innerarm_screendoor') != -1
                 || act.i.indexOf('mustache') != -1
                 || act.i.indexOf('_tie') != -1
                 || act.i.indexOf('flag') != -1) {
                    part.alpha = 0
                }
            } else {
                part.alpha =  0
            }
        }
    }

}