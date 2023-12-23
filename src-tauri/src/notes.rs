use std::fs;

pub(crate) fn create_note(note_path: &str) {
    let documents_directory = match dirs::document_dir() {
        Some(path) => path,
        None => {
            eprintln!("Failed to determine the documents directory.");
            return;
        }
    };

    let note = documents_directory.join(note_path.to_owned() + ".md");
    if !note.exists() {
        if let Err(err) = fs::write(&note, "") {
            eprintln!("Failed to create file {:?}: {}", note, err);
        }
    }
}

pub(crate) fn delete_note(note_path: &str) {
    let documents_directory = match dirs::document_dir() {
        Some(path) => path,
        None => {
            eprintln!("Failed to determine the documents directory.");
            return;
        }
    };

    let new_note_path = documents_directory.join(note_path);

    if new_note_path.exists() {
        if let Err(err) = fs::remove_file(&new_note_path) {
            eprintln!("Failed to delete note {:?}: {}", new_note_path, err)
        }
    }
}
