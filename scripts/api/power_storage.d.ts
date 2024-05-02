import { BlockComponentOnPlaceEvent, BlockComponentPlayerDestroyEvent, BlockComponentPlayerInteractEvent, BlockComponentTickEvent, BlockCustomComponent } from "@minecraft/server";
export declare abstract class PowerStorage implements BlockCustomComponent {
    abstract bufferCapacity: number;
    constructor();
    onPlace(e: BlockComponentOnPlaceEvent): void;
    onPlayerDestroy(e: BlockComponentPlayerDestroyEvent): void;
    onPlayerInteract(e: BlockComponentPlayerInteractEvent): void;
    onTick(e: BlockComponentTickEvent): void;
}
