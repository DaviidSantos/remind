// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod folders;

fn main() {
  tauri::Builder::default()
  .setup(|_| {
    folders::create_remind_folder_if_not_exists();
    Ok(())
  })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
