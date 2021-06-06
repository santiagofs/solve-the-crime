import type { LevelConfig } from "../types";

import heroes from "../collections/heroes";
import villains from "../collections/villains";

export default <LevelConfig>{
  number: 1,
  collections: { heroes, villains },
  itemsPerCollection: 3,
  boundaries: { x: 2, y: 2 },
};
