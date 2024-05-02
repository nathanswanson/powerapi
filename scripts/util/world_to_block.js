export function asWorldProperty(property, block) {
    return `${block.location.x}-${block.location.y}-${block.location.z}-${property}`;
}
