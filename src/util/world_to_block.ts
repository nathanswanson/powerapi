import { Block } from "@minecraft/server";

export function asWorldProperty(property: string, block: Block) {
  return `${block.location.x}-${block.location.y}-${block.location.z}-${property}`;
}
