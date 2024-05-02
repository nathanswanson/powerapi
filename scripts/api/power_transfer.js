import { world, } from "@minecraft/server";
import { asWorldProperty } from "../util/world_to_block";
export class PowerTransfer {
    constructor() {
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
}
