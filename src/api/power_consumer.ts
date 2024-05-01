import {
  BlockComponentPlayerPlaceBeforeEvent,
  BlockComponentPlayerDestroyEvent,
  BlockComponentPlayerInteractEvent,
  BlockComponentTickEvent,
  BlockCustomComponent,
  BlockStates,
  Block,
  world,
} from "@minecraft/server";
import { asWorldProperty } from "../util/world_to_block";
import { firstAdjacentBlock } from "../util/get_adjacent_power";

export abstract class PowerConsumer implements BlockCustomComponent {
  abstract bufferCapacity: number;
  abstract consumptionRate: number;
  abstract run(block: Block): void;
  constructor() {
    this.onTick = this.onTick.bind(this);
    this.beforeOnPlayerPlace = this.beforeOnPlayerPlace.bind(this);
    this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
  }

  beforeOnPlayerPlace(e: BlockComponentPlayerPlaceBeforeEvent): void {
    if (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) === undefined) {
      world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
    }
  }

  onPlayerDestroy(e: BlockComponentPlayerDestroyEvent): void {
    world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
  }

  onPlayerInteract(e: BlockComponentPlayerInteractEvent): void {
    e.player!!.sendMessage(`Power: ${world.getDynamicProperty(asWorldProperty("powerstorage", e.block))}`);
  }

  //max buffer size
  //consumption per tick
  onTick(e: BlockComponentTickEvent): void {
    //attempt to transfer power from neighbors
    if (
      (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) as number) <
      this.bufferCapacity - this.consumptionRate
    ) {
      const adjacentblock = firstAdjacentBlock(e.block);
      if (adjacentblock !== undefined) {
        const adjacentPower = world.getDynamicProperty(asWorldProperty("powerstorage", adjacentblock)) as number;
        if (adjacentPower >= this.consumptionRate) {
          world.setDynamicProperty(
            asWorldProperty("powerstorage", e.block),
            (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) as number) + this.consumptionRate
          );
          world.setDynamicProperty(
            asWorldProperty("powerstorage", adjacentblock),
            adjacentPower - this.consumptionRate
          );
          this.run(e.block);
        }
      }
    }
    //run the consumer
    if ((world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) as number) > this.consumptionRate) {
      world.setDynamicProperty(
        asWorldProperty("powerstorage", e.block),
        (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) as number) - this.consumptionRate
      );
      this.run(e.block);
    }
  }
}
