import { useFileTreeContext } from "../../context/FileTreeContext";
import Folder from "./Folder";
import File from "./File";

const FileTree = () => {
  const { fileTree, setCurrentNode } = useFileTreeContext();

  return (
    fileTree && (
      <section
        className="grow min-h-0 py-4"
        onClick={() => setCurrentNode(fileTree.path)}
      >
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col">
          {fileTree?.children
            .sort((a, b) => {
              if (a.is_folder === b.is_folder) {
                return 0;
              }

              return a.is_folder ? -1 : 1;
            })
            .filter((node) => !node.path.endsWith(".db"))
            .map((node) => (
              <>
                {node.is_folder ? (
                  <Folder {...node} key={node.path} />
                ) : (
                  <File path={node.path} key={node.path} />
                )}
              </>
            ))}
        </div>
      </section>
    )
  );
};

export default FileTree;
