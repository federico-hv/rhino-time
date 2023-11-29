"use client";
import { useEffect } from "react";
import "../app/globals.css";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export default function GameView() {
  const { rive, RiveComponent } = useRive({
    src: "/circle.riv",
    artboard: "Parent",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  let jumpInput = useStateMachineInput(rive, "State Machine 1", "Jump");
  let runInput = useStateMachineInput(rive, "State Machine 1", "run");
  let shieldInput = useStateMachineInput(rive, "State Machine 1", "Sheild");

  useEffect(() => {
    if (rive) {
      console.log("RIVE: ", rive, rive.stateMachineInputs("State Machine 1"));
      rive.stateMachineInputs("State Machine 1").forEach((input) => {
        console.log("Input: ", input.name);
      });
    } else {
      console.log("NO RIVE");
    }
    const onKeyDown = (event: any) => {
      console.log("KEYDOWN: ", event.key);
      switch (event.key) {
        case "ArrowUp":
          triggerJump();
          break;
        case "ArrowDown":
          break;
        case "ArrowLeft":
          triggerStop();
          break;
        case "ArrowRight":
          triggerRun();
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [rive, jumpInput, runInput, shieldInput]);

  const triggerJump = () => jumpInput && jumpInput?.fire();

  const triggerRun = () => {
    if (runInput) {
      runInput.value = true;
    }
  };

  const triggerStop = () => {
    if (runInput) {
      runInput.value = false;
    }
  };

  return (
    <div className="bg-black h-[100vh]">
      <RiveComponent className="h-[100vh] w-[100vw]" />
    </div>
  );
}
