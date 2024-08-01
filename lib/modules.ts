import { Module } from "./types";

const getModuleStatus = (
  modules: Module[],
  index: number,
  firstLock?: boolean,
) => {
  if (index === 0) {
    if (firstLock) {
      return "lock";
    } else {
      return modules[0].completed ? "completed" : "in-process";
    }
  } else {
    if (modules[index].completed) {
      return "completed";
    } else {
      return modules[index - 1].completed ? "in-process" : "lock";
    }
  }
};

const getModuleIsCompleted = (modules: Module[]): boolean => {
  let isCompleted = true;
  if (!modules.length) {
    isCompleted = false;
  }

  isCompleted = modules.every((module) => module.completed);

  return isCompleted;
};

export { getModuleStatus, getModuleIsCompleted };
