
let pams = {}

function pamInit(name, data, textures) {
    pams[name] = data
    pams[name].textures = textures

    console.log('pam = ' + name)
    for(let image of data.image) {
        let s = image.name.split('|')
        image.texture = textures[s[0]]
        if(image.transform.length != 6) debugger
    }
    data.actionFrame = {}
    // for(let sp of data.sprite) {
    //     // if(sp.frame.length > 1) debugger
    // }
    for(let [index, frame] of data.main_sprite.frame.entries()) {
        if(frame.label != null) {
            data.actionFrame[frame.label] = index
        }
    }
}

const hideSprite = new Set(['ground_swatch', 'ground_swatch_plane', '_zombie_egypt_armor2_statesxxx', '_zombie_egypt_armor1_states', 'butter', 'ink'])

class PamSprite extends PIXI.Container {
    constructor(pam, act, frameStart = 0, param = {}) {
        super()
        this.pam = pam
        this.frameStart = this.frame = frameStart
        this.custom = param.custom
        this.act = act
        this.walk = param.walk
        this.walkGround = param.walkGround
        this.doFrame()
    }

    doFrame() {
        let frame = this.act.frame[this.frame]
        if(this.frame == this.frameStart) {  // first frame, remove any
            this.parts = {}
            this.removeChildren()
        }
        for(let remove of frame.remove) {
            let spr = this.parts[remove.index]
            if(spr) {
                this.removeChild(spr)
                delete this.parts[remove.index]
            }
        }
        for(let append of frame.append) {
            if(this.parts[append.index]) continue
            let resourceId = append.resource
            let spr
            if(append.sprite) {
                let spriteData = this.pam.sprite[resourceId]
                spr = new PamSprite(this.pam, spriteData, 0, this.custom)
                // if(spriteData.name == this.walkGround) {
                //     this.ground = 0
                // }
                if(this.walk && spriteData.index == 1) {
                    this.ground = undefined
                }
                if(spriteData.name.startsWith('custom') && spriteData.name != this.custom || hideSprite.has(spriteData.name)) {
                    spr.visible = false
                }
                // container.setTransform(change.transform)
                // container.step()
            } else {
                let image = this.pam.image[resourceId]
                if(!image) debugger
                let texture = image.texture
                spr = new PIXI.Sprite(texture)
                spr.data = image
            }
            spr.zIndex = append.index
            this.parts[append.index] = spr
            this.addChild(spr)
        
        }
        this.sortChildren()
        for(let change of frame.change) {
            let spr = this.parts[change.index]  // image or container
            if(!spr) continue
            if(!change.transform) continue
            if(spr.data) {
                spr.setTransformArray2(spr.data.transform, change.transform)
            } else {
                spr.setTransformArray(change.transform)
            }
            if(change.color) {
                spr.alpha = change.color[3]
            }
            if(this.walk && change.index == 1) {
                if(!this.ground) {
                    this.groundMove = 0
                } else {
                    this.groundMove = spr.x - this.ground
                }
                this.ground = spr.x
            }
        }
        
        if(frame.stop || this.frame >= this.act.frame.length - 1) {
            this.frame = this.frameStart
        } else {
            this.frame++
        }
    }

    step() {
        if(this.act.frame.length > 1) {
            this.doFrame()
        }
        if(this.walk && this.groundMove) {
            if(this.groundMove > 0) {
                this.x -= this.groundMove
            }
        }
        for(let part of Object.values(this.parts)) {
            if(part.step) {
                part.step()
            }
        }
    }

    getSprite(name) {
        for(let part of this.parts) {
            if(part.act.name == name) {
                return part
            }
        }
    }
}

PIXI.Container.prototype.setTransformArray = function(transform) {
    if(transform.length == 2) {
        this.x = transform[0]
        this.y = transform[1]
    } else if(transform.length == 6) {
        this.transform.setFromMatrix(new PIXI.Matrix(...transform))
    } else {
        debugger
    }
}

PIXI.Container.prototype.setTransformArray2 = function(transform, transform2) {
    let mat = transform.length == 6 ? new PIXI.Matrix(...transform) : new PIXI.Matrix(1, 0, 0, 1, ...transform)
    let mat2 = transform2.length == 6 ? new PIXI.Matrix(...transform2) : new PIXI.Matrix(1, 0, 0, 1, ...transform2)
    this.transform.setFromMatrix(mat.append(mat2))
}