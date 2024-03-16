// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
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
            delete_note_db,
            rename_note,
            add_card,
            add_tag,
            add_note_tag,
            select_all_notes,
            select_note,
            select_card,
            update_note_path,
            revisao,
            update_note_card,
            select_all_cards,
            select_all_tags,
            get_card_notes,
            get_note_tags,
            delete_tag,
            delete_note_tag,
            get_tag_notes,
            add_reference,
            get_references,
            delete_reference,
            update_favorite,
            get_favorites
        ])
        .setup(|_| {
            folders::create_remind_folder_if_not_exists();
            let _ = db::create_database();
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
fn create_note(note_path: &str, interval: i32, repetition: i32, efactor: f32, due_date: &str) {
    notes::create_note(note_path);
    let _ = db::insert_note(note_path, interval, repetition, efactor, due_date);
}

#[tauri::command]
fn delete_note(path: &str) {
    notes::delete_note(path)
}

#[tauri::command]
fn delete_note_db(id: i32) {
    let _ = db::delete_note(id);
}

#[tauri::command]
fn rename_note(current_path: &str, new_path: &str) {
    notes::rename_note(current_path, new_path)
}

#[tauri::command]
fn add_card(name: &str) {
    let _ = db::insert_card(name);
}

#[tauri::command]
fn add_tag(name: &str) {
    let _ = db::insert_tag(name);
}

#[tauri::command]
fn add_note_tag(note_id: i32, tag_id: i32) {
    let _ = db::add_note_tag(note_id, tag_id);
}

#[tauri::command]
fn select_all_notes() -> Vec<db::Note> {
    let notes = db::get_all_notes().unwrap();
    notes
}

#[tauri::command]
fn select_note(path: &str) -> db::Note {
    let note = db::select_note(path).unwrap();
    note
}

#[tauri::command]
fn select_card(id: i32) -> db::Card {
    let card = db::select_card(id).unwrap();
    card
}

#[tauri::command]
fn update_note_path(path: &str, new_path: &str) {
    let _ = db::update_note_path(path, new_path);
}

#[tauri::command]
fn revisao(path: &str, interval: i32, repetition: i32, efactor: f32, due_date: &str) {
    let _ = db::revision(path, interval, repetition, efactor, due_date);
}

#[tauri::command]
fn update_note_card(note_id: i32, card_id: i32) {
    let _ = db::update_note_card(note_id, card_id);
}

#[tauri::command]
fn select_all_cards() -> Vec<db::Card> {
    let cards = db::get_all_cards().unwrap();
    cards
}

#[tauri::command]
fn select_all_tags() -> Vec<db::Tag> {
    let tags = db::get_all_tags().unwrap();
    tags
}

#[tauri::command]
fn get_card_notes(card_id: i32) -> Vec<db::Note> {
    let notes = db::get_card_notes(card_id).unwrap();
    notes
}

#[tauri::command]
fn get_note_tags(id: i32) -> Vec<db::Tag> {
    let tags = db::get_note_tags(id).unwrap();
    tags
}

#[tauri::command]
fn delete_tag(id: i32) {
    let _ = db::delete_tag(id);
}

#[tauri::command]
fn delete_note_tag(note_id: i32, tag_id: i32) {
    let _ = db::delete_note_tag(note_id, tag_id);
}

#[tauri::command]
fn get_tag_notes(id: i32) -> Vec<db::Note> {
    let notes = db::get_tag_notes(id).unwrap();
    notes
}

#[tauri::command]
fn add_reference(note_id: i32, reference: &str) {
    _ = db::add_reference(note_id, reference)
}

#[tauri::command]
fn get_references(note_id: i32) -> Vec<db::Reference> {
    let references = db::get_note_references(note_id).unwrap();
    references
}

#[tauri::command]
fn delete_reference(id: i32) {
    _ = db::delete_reference(id)
}

#[tauri::command]
fn update_favorite(id: i32, is_favorite: i32) {
    _ = db::update_favorite(id, is_favorite)
}

#[tauri::command]
fn get_favorites() -> Vec<db::Note> {
    let notes = db::get_favorites().unwrap();
    notes
}
