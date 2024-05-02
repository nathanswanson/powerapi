import { world, } from "@minecraft/server";
import { asWorldProperty } from "../util/world_to_block";
export class PowerGenerator {
    constructor() {
        this.onTick = this.onTick.bind(this);
        this.onPlace = this.onPlace.bind(this);
        this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlace(e) {
        if (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) === undefined) {
            world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
        }
    }
    onPlayerDestroy(e) {
        world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
    }
    onTick(e) {
        //for now just generate power every tick
        if (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) <
            this.bufferCapacity - this.generationRate &&
            this.generateCondition(e.block)) {
            world.setDynamicProperty(asWorldProperty("powerstorage", e.block), world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) + this.generationRate);
            this.resourceUsage(e.block);
        }
    }
    onPlayerInteract(e) {
        e.player.sendMessage(`Power: ${world.getDynamicProperty(asWorldProperty("powerstorage", e.block))}`);
    }
}
