import {Presenter, PresenterState} from '@motion-canvas/core';
import type {Project} from '@motion-canvas/core';

async function main() {
  // Use a variable to prevent Vite from statically resolving the import.
  // At runtime in dist/, this resolves to the bootstrapped Project module.
  const projectPath = './src/project.js';
  const module = await import(/* @vite-ignore */ projectPath);
  const project: Project = module.default;

  const settings = project.meta.getFullRenderingSettings();
  const presenter = new Presenter(project);

  const canvas = presenter.stage.finalBuffer;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.objectFit = 'contain';
  canvas.style.display = 'block';
  document.body.appendChild(canvas);

  document.addEventListener('click', () => {
    presenter.resume();
  });

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        presenter.resume();
        e.preventDefault();
        break;

      case 'ArrowLeft':
      case 'PageUp':
        presenter.requestPreviousSlide();
        e.preventDefault();
        break;

      case 'f':
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
        e.preventDefault();
        break;
    }
  });

  await presenter.present({
    name: project.name,
    fps: settings.fps,
    slide: null,
    size: settings.size,
    resolutionScale: settings.resolutionScale,
    colorSpace: settings.colorSpace,
    background: settings.background,
  });
}

main().catch(console.error);
