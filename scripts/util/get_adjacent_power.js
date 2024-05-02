import { world } from "@minecraft/server";
import { asWorldProperty } from "./world_to_block";
export function firstAdjacentBlock(block) {
    const adjacentBlocks = [block.east(1), block.west(1), block.north(1), block.south(1), block.above(1), block.below(1)];
    return adjacentBlocks.find((aBlock) => aBlock !== undefined && getBlockPower(aBlock) > 0);
}
function getBlockPower(block) {
    try {
        return world.getDynamicProperty(asWorldProperty("powerstorage", block));
    }
    catch (error) {
        return 0;
    }
}
