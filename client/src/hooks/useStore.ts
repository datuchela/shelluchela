import create from "zustand";

type Line = {
  color?: string;
  backgroundColor?: string;
  prefix?: string;
  text: string;
};

type Store = {
  input: string;
  output: Line[];
  setInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
  addLine: (line: Line) => void;
  clearConsole: () => void;
};

const useStore = create<Store>((set) => ({
  input: "",
  output: [],
  setInput: (e) => {
    set((state) => ({
      ...state,
      input: e.target.value,
    }));
  },
  clearInput: () => {
    set((state) => ({
      ...state,
      input: "",
    }));
  },
  addLine: (line) => {
    set((state) => ({
      ...state,
      output: [...state.output, line],
    }));
  },
  clearConsole: () => {
    set((state) => ({
      ...state,
      output: [],
    }));
  },
}));

export const useInput = () =>
  useStore((state) => ({
    input: state.input,
    setInput: state.setInput,
    clearInput: state.clearInput,
  }));
export const useOutput = () =>
  useStore((state) => ({
    output: state.output,
    addLine: state.addLine,
    clearConsole: state.clearConsole,
  }));

export default useStore;
