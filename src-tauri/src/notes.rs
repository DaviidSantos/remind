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
