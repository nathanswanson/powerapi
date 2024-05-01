import {
  BlockComponentOnPlaceEvent,
  BlockComponentPlayerDestroyEvent,
  BlockComponentPlayerInteractEvent,
  BlockComponentStepOnEvent,
  BlockComponentTickEvent,
  BlockCustomComponent,
  BlockPermutation,
  world,
} from "@minecraft/server";
import { MinecraftBlockTypes } from "@minecraft/vanilla-data";
import { asWorldProperty } from "../util/world_to_block";

export abstract class PowerStorage implements BlockCustomComponent {
  abstract bufferCapacity: number; //figure out how to make this dynamic this is 256z = 8 units of power
  constructor() {
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
    this.onTick = this.onTick.bind(this);
    this.onPlace = this.onPlace.bind(this);
    this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
  }

  onPlace(e: BlockComponentOnPlaceEvent): void {
    if (world.getDynamicProperty(asWorldProperty("powerstorage", e.block)) === undefined) {
      world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
    }
  }

  onPlayerDestroy(e: BlockComponentPlayerDestroyEvent): void {
    world.setDynamicProperty(asWorldProperty("powerstorage", e.block), 0);
  }

  onPlayerInteract(e: BlockComponentPlayerInteractEvent): void {}

  onTick(e: BlockComponentTickEvent): void {
    //this checks to see if can transfer power from neighbors
  }
}
