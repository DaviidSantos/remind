import { AiOutlineLeft } from "react-icons/ai";
import { useExplorerContext } from "../../context/ExplorerContext";

const Favorits = () => {
  const { setExplorerMode } = useExplorerContext();

  return (
    <section className="grow min-h-0 py-4">
      <div className="flex items-center gap-4 mb-7">
        <button onClick={() => setExplorerMode("FILE_TREE")}>
          <AiOutlineLeft className="h-3 text-zinc-400" />
        </button>
        <span className="text-zinc-400 text-xs">Favoritos</span>
      </div>
    </section>
  );
};

export default Favorits;
