import { useFileTreeContext } from "../../context/FileTreeContext";
import Folder from "./Folder";
import File from "./File";

const FileTree = () => {
  const { fileTree, setCurrentNode } = useFileTreeContext();

  return (
    fileTree && (
      <section
        className="flex flex-col space-y-4 grow min-h-0 py-4"
        onClick={() => setCurrentNode(fileTree.path)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {fileTree?.children
            .sort((a, b) => {
              if (a.is_folder === b.is_folder) {
                return 0;
              }

              return a.is_folder ? -1 : 1;
            })
            .map((node) => (
              <>
                {node.is_folder ? (
                  <Folder {...node} />
                ) : (
                  <File path={node.path} />
                )}
              </>
            ))}
        </div>
      </section>
    )
  );
};

export default FileTree;
