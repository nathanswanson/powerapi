import {
  BlockComponentOnPlaceEvent,
  BlockComponentPlayerDestroyEvent,
  BlockComponentPlayerInteractEvent,
  BlockComponentTickEvent,
  BlockCustomComponent,
  Block,
  world,
} from "@minecraft/server";
import { asWorldProperty } from "../util/world_to_block";

export abstract class PowerGenerator implements BlockCustomComponent {
  //json provided:
  //max buffer size
  //generation per tick
  //generate condition js
  //resource usage js
  abstract bufferCapacity: number;
  abstract generationRate: number;
  abstract generateCondition: (block: Block) => boolean;
  abstract resourceUsage: (block: Block) => void;

  constructor() {
    this.onTick = this.onTick.bind(this);
    this.onPlace = this.onPlace.bind(this);
    this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
  }

  onPlace(e: BlockComponentOnPlaceEvent): void {
    if (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) === undefined) {
      world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
    }
  }
  onPlayerDestroy(e: BlockComponentPlayerDestroyEvent): void {
    world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
  }

  onTick(e: BlockComponentTickEvent): void {
    //for now just generate power every tick
    if (
      (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) as number) <
        this.bufferCapacity - this.generationRate &&
      this.generateCondition(e.block)
    ) {
      world.setDynamicProperty(
        asWorldProperty("powerstorage", e.block),
        (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) as number) + this.generationRate
      );
      this.resourceUsage(e.block);
    }
  }

  onPlayerInteract(e: BlockComponentPlayerInteractEvent): void {
    e.player!!.sendMessage(`Power: ${world.getDynamicProperty(asWorldProperty("powerstorage", e.block))}`);
  }
}
