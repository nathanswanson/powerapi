import { BlockComponentOnPlaceEvent, BlockComponentPlayerDestroyEvent, BlockCustomComponent } from "@minecraft/server";
export declare abstract class PowerTransfer implements BlockCustomComponent {
    constructor();
    onPlace(e: BlockComponentOnPlaceEvent): void;
    onPlayerDestroy(e: BlockComponentPlayerDestroyEvent): void;
}
