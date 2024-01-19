import { AiOutlineLeft } from "react-icons/ai";
import { useExplorerContext } from "../../context/ExplorerContext";

const Favorits = () => {
  const { setExplorerMode } = useExplorerContext();

  return (
    <section className="grow min-h-0 py-4">
      <div className="flex items-center gap-4 mb-7">
        <button onClick={() => setExplorerMode("FILE_TREE")}>
          <AiOutlineLeft className="h-4 text-zinc-100" />
        </button>
         <span className="text-zinc-200 text-sm">Favoritos</span>
      </div>
    </section>
  );
};

export default Favorits;
