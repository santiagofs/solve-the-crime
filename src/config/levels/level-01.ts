import type { LevelConfig } from "../types";

import heroes from "../collections/heroes";
import villains from "../collections/villains";

export default <LevelConfig>{
  collections: { heroes, villains },
  itemsPerCollection: 3,
  boundaries: { x: 3, y: 3 },
};
