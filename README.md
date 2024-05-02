# Bedrock Power API

Bedrock Power API Library, allows other modders to implement a shared power system. This is a NPM library not an addon.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Future Plans](#future-plans)

## Installation

> :warning: : This Library requires Experimental Beta Features in Minecraft.

1. In your addon run:  `npm i https://github.com/nathanswanson/powerapi.git`

## Usage

When creating a custom block, extend the
```typescript
export class BlockQuarry extends PowerConsumer {
  bufferCapacity = 4096; //How much power this block can store
  consumptionRate = 5; //How much power should be consumed every run()
  run() {
    //one tick (for quarry this would be mining one block)
  }
}
```
## Future Plans

* Reduce dynamic property access call.
* Implement block dynamic property when it is released from Mojang.
* Cables - currently blocks have to be adjacent.