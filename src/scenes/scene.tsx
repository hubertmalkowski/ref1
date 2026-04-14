import { makeScene2D } from '@motion-canvas/2d';
import { voevodsky, title, sylogizm, church, lambda1 } from './slides';
import { makePresentation } from './makeSlide';

export default makeScene2D(function* (view) {
  view.fontFamily("Cambria")
  yield* makePresentation(view, [
    title,
    voevodsky,
    sylogizm,
    church,
    lambda1
  ])
});
