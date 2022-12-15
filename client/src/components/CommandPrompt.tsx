import { useInput, useOutput } from "../hooks/useStore";
const CommandPrompt = () => {
  const { addLine, clearConsole } = useOutput();
  const { input, setInput, clearInput } = useInput();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input === "clear") {
      clearConsole();
      clearInput();
      return;
    }
    const payload = input;
    addLine({ prefix: "user", text: input });
    clearInput();
    const res = await fetch("http://localhost:5050/run", {
      method: "POST",
      body: payload,
    });
    const data = await res.text();
    addLine({ prefix: "server", text: "\n" + data });
  }

  return (
    <form className="sticky bottom-0 left-0 p-4 flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        className="input input-ghost input-sm flex-1"
        type="text"
        placeholder="type your commands here"
        value={input}
        onChange={setInput}
      />
      <button className="btn btn-square btn-sm btn-outline">{">"}</button>
    </form>
  );
};

export default CommandPrompt;
