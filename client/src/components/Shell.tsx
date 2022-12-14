import { useRef, useEffect, useState } from "react";
import { useOutput } from "../hooks/useStore";
import CommandPrompt from "./CommandPrompt";

// useDrag
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

const Shell = () => {
  const { output, addLine } = useOutput();
  const outputEndRef = useRef<HTMLDivElement>(null);

  // types some text on initial load
  useEffect(() => {
    const firstMessage = window.setTimeout(() => {
      addLine({ prefix: "shelluchela", text: "welcome!" });
    }, 500);
    const secondMessage = window.setTimeout(() => {
      addLine({ prefix: "shelluchela", text: "You can start typing commands" });
    }, 1500);

    return () => {
      window.clearTimeout(firstMessage);
      window.clearTimeout(secondMessage);
    };
  }, []);

  // scrolls to bottom every time output changes
  useEffect(() => {
    if (!outputEndRef.current) return;
    outputEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  // Dragging + animations
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ offset: [x, y], down }) => api.start({ x, y, immediate: down }));

  return (
    <>
      <animated.div
        className="flex flex-col justify-between mockup-code before:hidden w-[600px] h-[500px] pt-0 pb-0 overflow-hidden"
        style={{ x, y }}
      >
        <div
          {...bind()}
          className="w-full px-4 py-2 select-none cursor-grab active:cursor-grabbing border-b border-gray-800"
        >
          shellucha
        </div>
        <div className="flex flex-col justify-between w-full px-3 pb-2 flex-1">
          <pre className="language-undefined flex-[8] px-2 pb-2 overflow-y-auto overflow-x-hidden">
            <code className="flex flex-col flex-wrap max-w-full">
              {output.map((line, index) => (
                <div key={index}>
                  <span className="text-pink-400">{line.prefix}: </span>
                  <span>{line.text}</span>
                </div>
              ))}
              <div ref={outputEndRef}></div>
            </code>
          </pre>
          <CommandPrompt />
        </div>
      </animated.div>
    </>
  );
};

export default Shell;
