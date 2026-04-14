import { beginSlide, fadeTransition, useTransition, waitFor } from "@motion-canvas/core";
import { Layout, View2D } from "@motion-canvas/2d";
import { ThreadGenerator } from "@motion-canvas/core";

export function makeSlide(
  name: string | null,
  setup: (view: View2D) => ThreadGenerator | void,
) {
  return function* (view: View2D): ThreadGenerator {
    view.removeChildren()
    const gen = setup(view);
    if (gen) yield* gen;
    if(name) {
      yield* fadeTransition(0.5);
      yield* beginSlide(name)
      yield* waitFor(0.5)
    }
  };
}


export function* makePresentation(
  view: View2D,
  setups: ((view: View2D) => ThreadGenerator | void)[]
) {
  for (let setup of setups) {
    const gen = setup(view);
    if (gen) yield* gen;
  }
}
