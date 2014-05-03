# voxel-health

Stores player health value (voxel.js plugin)

[![Build Status](https://travis-ci.org/deathcap/voxel-health.png)](https://travis-ci.org/deathcap/voxel-health)

(for UI, see also [voxel-health-bar](https://github.com/deathcap/voxel-health-bar))

## Usage

Load with [voxel-plugins](https://github.com/deathcap/voxel-plugins), options:

* `maxHealth` (10), `minHealth` (0): valid health value range, outside will be clamped
* `startHealth` (defaults to maxHealth): initial starting health value

### API

Methods:

* hurt(amount)
* heal(amount)

Events:

* health: emitted with new and old value on any change
* hurt, heal: emitted when hurt and healed, respectively
* die: emitted when health reaches minimum

## License

MIT

