import {
  BlockComponentOnPlaceEvent,
  BlockComponentPlayerDestroyEvent,
  BlockCustomComponent,
  world,
} from "@minecraft/server";
import { asWorldProperty } from "../util/world_to_block";

export abstract class PowerTransfer implements BlockCustomComponent {
  constructor() {
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
}
