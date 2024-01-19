use rusqlite::{named_params, Connection, Result};

use serde::Serialize;

#[derive(Serialize)]
pub struct Note {
    id: i32,
    path: String,
    due_date: String,
    interval: i32,
    repetition: i32,
    efactor: f32,
    card_id: Option<i32>,
}

#[derive(Serialize)]
pub struct Card {
    id: i32,
    name: String,
}

#[derive(Serialize)]
pub struct Tag {
    id: i32,
    name: String,
}

pub fn create_database() -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    // Define your SQL statements
    let sql_statements = [
      "CREATE TABLE IF NOT EXISTS cards(id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE)",
      "CREATE TABLE IF NOT EXISTS tags(id INTEGER PRIMARY KEY, name TEXT)",
      "CREATE TABLE IF NOT EXISTS my_references(id INTEGER PRIMARY KEY, reference TEXT)",
      "CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY, path TEXT, due_date INTEGER, interval INTEGER, repetition INTEGER, efactor INTEGER, card_id INTEGER REFERENCES cards(id))",
      "CREATE TABLE IF NOT EXISTS note_tags(id INTEGER PRIMARY KEY, note_id INTEGER NOT NULL REFERENCES notes(id), tag_id INTEGER NOT NULL REFERENCES tags(id))",
      "CREATE TABLE IF NOT EXISTS note_references(id INTEGER PRIMARY KEY, note_id INTEGER NOT NULL REFERENCES notes(id), reference_id INTEGER NOT NULL REFERENCES my_references(id))",
  ];

    for statement in &sql_statements {
        match conn.execute(statement, []) {
            Ok(_) => {}
            Err(err) => {
                eprintln!("Error creating table: {}", err);
                // Handle the error as needed
            }
        }
    }

    Ok(())
}
