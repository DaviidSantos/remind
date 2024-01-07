import { AiOutlineFolder } from "react-icons/ai";
import { useExplorerContext } from "../../context/ExplorerContext";

const ToggleExplorerButton = () => {
  const { isOpen, setIsOpen } = useExplorerContext();

  const toggle = function () {
    setIsOpen(!isOpen);
  };

  return (
    <button
      className={`p-3 hover:bg-zinc-700 ${isOpen ? "bg-zinc-700" : ""}`}
      onClick={toggle}
    >
      <AiOutlineFolder className="text-zinc-100" />
    </button>
  );
};

export default ToggleExplorerButton;
