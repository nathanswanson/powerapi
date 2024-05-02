import { world, } from "@minecraft/server";
import { asWorldProperty } from "../util/world_to_block";
import { firstAdjacentBlock } from "../util/get_adjacent_power";
export class PowerConsumer {
    constructor() {
        this.onTick = this.onTick.bind(this);
        this.beforeOnPlayerPlace = this.beforeOnPlayerPlace.bind(this);
        this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    beforeOnPlayerPlace(e) {
        if (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) === undefined) {
            world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
        }
    }
    onPlayerDestroy(e) {
        world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
    }
    onPlayerInteract(e) {
        e.player.sendMessage(`Power: ${world.getDynamicProperty(asWorldProperty("powerstorage", e.block))}`);
    }
    //max buffer size
    //consumption per tick
    onTick(e) {
        //attempt to transfer power from neighbors
        if (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) <
            this.bufferCapacity - this.consumptionRate) {
            const adjacentblock = firstAdjacentBlock(e.block);
            if (adjacentblock !== undefined) {
                const adjacentPower = world.getDynamicProperty(asWorldProperty("powerstorage", adjacentblock));
                if (adjacentPower >= this.consumptionRate) {
                    world.setDynamicProperty(asWorldProperty("powerstorage", e.block), world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) + this.consumptionRate);
                    world.setDynamicProperty(asWorldProperty("powerstorage", adjacentblock), adjacentPower - this.consumptionRate);
                    this.run(e.block);
                }
            }
        }
        //run the consumer
        if (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) > this.consumptionRate) {
            world.setDynamicProperty(asWorldProperty("powerstorage", e.block), world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) - this.consumptionRate);
            this.run(e.block);
        }
    }
}
