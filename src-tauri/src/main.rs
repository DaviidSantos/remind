// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod folders;
mod file_tree;

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![
    read_file_tree
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
