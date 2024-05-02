import { world, } from "@minecraft/server";
import { asWorldProperty } from "../util/world_to_block";
export class PowerStorage {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
        this.onTick = this.onTick.bind(this);
        this.onPlace = this.onPlace.bind(this);
        this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
    }
    onPlace(e) {
        if (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) === undefined) {
            world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
        }
    }
    onPlayerDestroy(e) {
        world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
    }
    onPlayerInteract(e) { }
    onTick(e) {
        //this checks to see if can transfer power from neighbors
    }
}
