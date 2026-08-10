import React from "react";
import { Composition } from "remotion";
import { CreateLaunch } from "./compositions/CreateLaunch";
import { HomeFilm } from "./compositions/HomeFilm";
import { OperateLaunch } from "./compositions/OperateLaunch";
import { TransformLaunch } from "./compositions/TransformLaunch";
import { COMPOSITION_META } from "./lib/timing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMPOSITION_META.HomeFilm.id}
        component={HomeFilm}
        durationInFrames={COMPOSITION_META.HomeFilm.durationInFrames}
        fps={COMPOSITION_META.HomeFilm.fps}
        width={COMPOSITION_META.HomeFilm.width}
        height={COMPOSITION_META.HomeFilm.height}
      />
      <Composition
        id={COMPOSITION_META.CreateLaunch.id}
        component={CreateLaunch}
        durationInFrames={COMPOSITION_META.CreateLaunch.durationInFrames}
        fps={COMPOSITION_META.CreateLaunch.fps}
        width={COMPOSITION_META.CreateLaunch.width}
        height={COMPOSITION_META.CreateLaunch.height}
      />
      <Composition
        id={COMPOSITION_META.TransformLaunch.id}
        component={TransformLaunch}
        durationInFrames={COMPOSITION_META.TransformLaunch.durationInFrames}
        fps={COMPOSITION_META.TransformLaunch.fps}
        width={COMPOSITION_META.TransformLaunch.width}
        height={COMPOSITION_META.TransformLaunch.height}
      />
      <Composition
        id={COMPOSITION_META.OperateLaunch.id}
        component={OperateLaunch}
        durationInFrames={COMPOSITION_META.OperateLaunch.durationInFrames}
        fps={COMPOSITION_META.OperateLaunch.fps}
        width={COMPOSITION_META.OperateLaunch.width}
        height={COMPOSITION_META.OperateLaunch.height}
      />
    </>
  );
};
