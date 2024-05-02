import { BlockComponentOnPlaceEvent, BlockComponentPlayerDestroyEvent, BlockComponentPlayerInteractEvent, BlockComponentTickEvent, BlockCustomComponent, Block } from "@minecraft/server";
export declare abstract class PowerGenerator implements BlockCustomComponent {
    abstract bufferCapacity: number;
    abstract generationRate: number;
    abstract generateCondition: (block: Block) => boolean;
    abstract resourceUsage: (block: Block) => void;
    constructor();
    onPlace(e: BlockComponentOnPlaceEvent): void;
    onPlayerDestroy(e: BlockComponentPlayerDestroyEvent): void;
    onTick(e: BlockComponentTickEvent): void;
    onPlayerInteract(e: BlockComponentPlayerInteractEvent): void;
}
