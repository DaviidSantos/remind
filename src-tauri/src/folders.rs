use std::fs;

pub(crate) fn create_remind_folder_if_not_exists() {
    let documents_directory = match dirs::document_dir() {
        Some(path) => path,
        None => {
            eprintln!("Failed to determine the documents directory.");
            return;
        }
    };

    let folder_path = documents_directory.join("remind");
    if !folder_path.exists() {
        if let Err(err) = fs::create_dir(&folder_path) {
            eprintln!("Failed to create folder {:?}: {}", folder_path, err);
        }
    }
}

pub(crate) fn create_new_folder(folder_path: &str) {
    let documents_directory = match dirs::document_dir() {
        Some(path) => path,
        None => {
            eprintln!("Failed to determine the documents directory.");
            return;
        }
    };

    let new_folder_path = documents_directory.join(folder_path);
    if !new_folder_path.exists() {
        if let Err(err) = fs::create_dir(&new_folder_path) {
            eprintln!("Failed to create folder {:?}: {}", new_folder_path, err)
        }
    }
}

pub(crate) fn delete_folder(folder_path: &str) {
    let documents_directory = match dirs::document_dir() {
        Some(path) => path,
        None => {
            eprintln!("Failed to determine the documents directory.");
            return;
        }
    };

    let new_folder_path = documents_directory.join(folder_path);

    if new_folder_path.exists() {
        if let Err(err) = fs::remove_dir_all(&new_folder_path) {
            eprintln!("Failed to delete folder {:?}: {}", new_folder_path, err)
        }
    }
}