// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_tree;
mod folders;
mod notes;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            read_file_tree,
            create_folder,
            delete_folder,
            rename_folder,
            create_note,
            delete_note,
            rename_note
        ])
        .setup(|_| {
            folders::create_remind_folder_if_not_exists();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn read_file_tree() -> file_tree::TreeNode {
    let documents_dir = tauri::api::path::document_dir().unwrap_or_default();
    let remind_folder_path = documents_dir.join("Remind");
    let file_tree = file_tree::build_tree(remind_folder_path);
    file_tree
}

#[tauri::command]
fn create_folder(path: &str) {
    folders::create_new_folder(path)
}

#[tauri::command]
fn delete_folder(path: &str) {
    folders::delete_folder(path)
}
#[tauri::command]
fn rename_folder(current_path: &str, new_path: &str) {
    folders::rename_folder(current_path, new_path)
}

#[tauri::command]
fn create_note(note_path: &str) {
    notes::create_note(note_path)
}

#[tauri::command]
fn delete_note(path: &str) {
    notes::delete_note(path)
}

#[tauri::command]
fn rename_note(current_path: &str, new_path: &str) {
    notes::rename_note(current_path, new_path)
}
