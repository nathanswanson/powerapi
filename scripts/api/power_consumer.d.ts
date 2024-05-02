import { BlockComponentPlayerPlaceBeforeEvent, BlockComponentPlayerDestroyEvent, BlockComponentPlayerInteractEvent, BlockComponentTickEvent, BlockCustomComponent, Block } from "@minecraft/server";
export declare abstract class PowerConsumer implements BlockCustomComponent {
    abstract bufferCapacity: number;
    abstract consumptionRate: number;
    abstract run(block: Block): void;
    constructor();
    beforeOnPlayerPlace(e: BlockComponentPlayerPlaceBeforeEvent): void;
    onPlayerDestroy(e: BlockComponentPlayerDestroyEvent): void;
    onPlayerInteract(e: BlockComponentPlayerInteractEvent): void;
    onTick(e: BlockComponentTickEvent): void;
}
