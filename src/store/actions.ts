// import type { State } from './state'
// type Commit = (mutationName: string, payload: any) => void

// export const initialize = async ({commit:Commit, state:State}) => {
//   const cols = state.collectionNames
//   for (col of cols) {
//     const config: [string, string][] = (
//       await import(`@/config/collections/${colName}.ts`)
//     ).default;
//   }
// }

// export default {
//   initialize
// }
// (arg: {
//   coord: { x: number; y: number };
//   keyA: string;
//   keyB: string;
//   nameA: string;
//   nameB: string;
// }) => void;

// const collections: { [colName: string]: { [itemName: string]: string } } =
//       {};
//     for (const colName of level.collectionNames) {
//       const config: [string, string][] = (
//         await import(`@/config/collections/${colName}.ts`)
//       ).default;
//       collections[colName] = {};
//       for (const item of config) {
//         const icon: string = await import("@/assets/icons/" + item[1]).then(
//           (module) => module.default
//         );

//         collections[colName][item[0]] = icon;
//       }
//     }
