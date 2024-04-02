use rusqlite::{named_params, Connection, Result};

use serde::Serialize;

#[derive(Serialize, Debug)]
pub struct Note {
    id: i32,
    path: String,
    tag: String,
    due_date: String,
    interval: i32,
    repetition: i32,
    efactor: f32,
    is_favorite: i32,
    card_id: Option<i32>,
}

#[derive(Serialize)]
pub struct Card {
    id: i32,
    name: String,
}

#[derive(Serialize)]
pub struct Tag {
    name: String,
}

#[derive(Serialize)]
pub struct Reference {
    id: i32,
    note_id: i32,
    reference: String,
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
        "CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY, path TEXT, tag TEXT, due_date INTEGER, interval INTEGER, repetition INTEGER, efactor INTEGER, is_favorite INTEGER, card_id INTEGER REFERENCES cards(id))",
        "CREATE TABLE IF NOT EXISTS note_references(id INTEGER PRIMARY KEY, note_id INTEGER NOT NULL REFERENCES notes(id), reference TEXT)",
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

pub fn insert_note(
    path: &str,
    interval: i32,
    repetition: i32,
    efactor: f32,
    due_date: &str,
) -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;
    let mut statement = conn.prepare("INSERT INTO notes (path, tag, interval, repetition, efactor, due_date, is_favorite) VALUES (@path, '', @interval, @repetition, @efactor, @due_date, @is_favorite)")?;
    statement.execute(named_params! { "@path": path, "@interval": interval, "@repetition": repetition, "@efactor": efactor, "@due_date": due_date, "@is_favorite": 0})?;

    Ok(())
}

pub fn get_all_notes() -> Result<Vec<Note>> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    let mut statement = conn.prepare("SELECT * FROM notes")?;
    let mut rows = statement.query([])?;
    let mut items: Vec<Note> = Vec::new();
    while let Some(row) = rows.next()? {
        let note: Note = Note {
            id: row.get(0)?,
            path: row.get(1)?,
            tag: row.get(2)?,
            due_date: row.get(3)?,
            interval: row.get(4)?,
            repetition: row.get(5)?,
            efactor: row.get(6)?,
            is_favorite: row.get(7)?,
            card_id: row.get(8)?,
        };

        items.push(note);
    }

    Ok(items)
}

pub fn get_tag_notes(tag: &str) -> Result<Vec<Note>> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    let mut statement = conn.prepare("SELECT * FROM notes WHERE tag = ?")?;
    let mut rows = statement.query(&[&tag])?;
    let mut items: Vec<Note> = Vec::new();
    while let Some(row) = rows.next()? {
        let note: Note = Note {
            id: row.get(0)?,
            path: row.get(1)?,
            tag: row.get(2)?,
            due_date: row.get(3)?,
            interval: row.get(4)?,
            repetition: row.get(5)?,
            efactor: row.get(6)?,
            is_favorite: row.get(7)?,
            card_id: row.get(8)?,
        };

        items.push(note);
    }

    Ok(items)
}

pub fn select_note(path: &str) -> Result<Note> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    let mut statement = conn.prepare("SELECT * FROM notes WHERE path LIKE ?")?;
    let mut rows = statement.query(&[&format!("%{}", path)])?;
    let mut note: Note = {
        Note {
            id: 0,
            path: "".to_string(),
            tag: "".to_string(),
            due_date: "".to_string(),
            interval: 0,
            repetition: 0,
            efactor: 0.0,
            is_favorite: 0,
            card_id: None,
        }
    };

    while let Some(row) = rows.next()? {
        note.id = row.get(0)?;
        note.path = row.get(1)?;
        note.tag = row.get(2)?;
        note.due_date = row.get(3)?;
        note.interval = row.get(4)?;
        note.repetition = row.get(5)?;
        note.efactor = row.get(6)?;
        note.is_favorite = row.get(7)?;
        note.card_id = row.get(8)?;
    }

    Ok(note)
}

pub fn select_card(id: i32) -> Result<Card> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    let mut statement = conn.prepare("SELECT * FROM cards WHERE id = ?")?;
    let mut rows = statement.query(&[&id])?;
    let mut card: Card = {
        Card {
            id: 0,
            name: "".to_string(),
        }
    };

    while let Some(row) = rows.next()? {
        card.id = row.get(0)?;
        card.name = row.get(1)?;
    }

    Ok(card)
}

pub fn update_note_path(path: &str, new_path: &str) -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;
    let mut statement = conn.prepare("UPDATE notes SET path = @new_path WHERE path = @path")?;
    statement.execute(named_params! { "@path": path, "@new_path": new_path})?;

    Ok(())
}

pub fn get_all_cards() -> Result<Vec<Card>> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    let mut statement = conn.prepare("SELECT * FROM cards")?;
    let mut rows = statement.query([])?;
    let mut items: Vec<Card> = Vec::new();
    while let Some(row) = rows.next()? {
        let card: Card = Card {
            id: row.get(0)?,
            name: row.get(1)?,
        };

        items.push(card);
    }

    Ok(items)
}

pub fn update_note_card(note_id: i32, card_id: i32) -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;
    let mut statement = conn.prepare("UPDATE notes SET card_id = @card_id WHERE id = @note_id")?;
    statement.execute(named_params! { "@note_id": note_id, "@card_id": card_id})?;

    Ok(())
}

pub fn revision(
    path: &str,
    interval: i32,
    repetition: i32,
    efactor: f32,
    due_date: &str,
) -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;
    let mut statement = conn.prepare("UPDATE notes SET interval = @interval, repetition = @repetition, efactor = @efactor, due_date = @due_date WHERE path = @path")?;
    statement.execute(named_params! { "@path": path, "@interval": interval, "@repetition": repetition, "@efactor": efactor, "@due_date": due_date})?;

    Ok(())
}

pub fn get_all_tags() -> Result<Vec<Tag>> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    let mut statement = conn.prepare(
        "
        SELECT DISTINCT tag FROM notes;
    ",
    )?;

    let mut rows = statement.query([])?;
    let mut items: Vec<Tag> = Vec::new();

    while let Some(row) = rows.next()? {
        let tag: Tag = Tag { name: row.get(0)? };

        items.push(tag);
    }

    Ok(items)
}

pub fn get_card_notes(card_id: i32) -> Result<Vec<Note>> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    let mut statement =
        conn.prepare("SELECT * FROM notes WHERE card_id = ? AND due_date = DATE('now');")?;
    let mut rows = statement.query(&[&card_id])?;
    let mut items: Vec<Note> = Vec::new();
    while let Some(row) = rows.next()? {
        let note: Note = Note {
            id: row.get(0)?,
            path: row.get(1)?,
            tag: row.get(2)?,
            due_date: row.get(3)?,
            interval: row.get(4)?,
            repetition: row.get(5)?,
            efactor: row.get(6)?,
            is_favorite: row.get(7)?,
            card_id: row.get(8)?,
        };

        items.push(note);
    }

    Ok(items)
}

pub fn insert_card(name: &str) -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;
    let mut statement = conn.prepare("INSERT INTO cards (name) VALUES (@name)")?;
    statement.execute(named_params! { "@name": name})?;

    Ok(())
}

pub fn update_tag(note_id: i32, tag: &str) -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;
    let mut statement = conn.prepare("UPDATE notes SET tag = @tag WHERE id = @note_id")?;
    statement.execute(named_params! { "@tag": tag, "@note_id": note_id})?;

    Ok(())
}

pub fn delete_note(path: &str) -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    let mut statement = conn.prepare(
        "DELETE FROM note_references WHERE note_id = (SELECT id FROM notes WHERE path = @path)",
    )?;

    statement.execute(named_params! { "@path": path})?;

    let mut statement = conn.prepare("DELETE FROM notes WHERE path = @path;")?;
    
    statement.execute(named_params! { "@path": path})?;

    Ok(())
}

pub fn add_reference(note_id: i32, reference: &str) -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;
    let mut statement = conn
        .prepare("INSERT INTO note_references(note_id, reference) VALUES (@note_id, @reference)")?;
    statement.execute(named_params! { "@note_id": note_id, "@reference": reference})?;

    Ok(())
}

pub fn get_note_references(note_id: i32) -> Result<Vec<Reference>> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    let mut statement = conn.prepare(
        "
        SELECT * FROM note_references
        WHERE note_id = ?
    ",
    )?;

    let mut rows = statement.query(&[&note_id])?;
    let mut items: Vec<Reference> = Vec::new();

    while let Some(row) = rows.next()? {
        let reference: Reference = Reference {
            id: row.get(0)?,
            note_id: row.get(1)?,
            reference: row.get(2)?,
        };

        items.push(reference);
    }

    Ok(items)
}

pub fn delete_reference(id: i32) -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;
    let mut statement = conn.prepare("DELETE FROM note_references WHERE id = @id;")?;
    statement.execute(named_params! { "@id": id})?;

    Ok(())
}

pub fn update_favorite(id: i32, is_favorite: i32) -> Result<()> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;
    let mut statement =
        conn.prepare("UPDATE notes set is_favorite = @is_favorite WHERE id = @id;")?;
    statement.execute(named_params! { "@is_favorite": is_favorite, "@id": id})?;

    Ok(())
}

pub fn get_favorites() -> Result<Vec<Note>> {
    let documents_directory = tauri::api::path::document_dir().unwrap_or_default();
    let db = documents_directory
        .join("remind/data.db")
        .into_os_string()
        .into_string()
        .unwrap();
    let conn = Connection::open(db)?;

    let mut statement = conn.prepare("SELECT * FROM notes WHERE is_favorite = 1")?;
    let mut rows = statement.query([])?;
    let mut items: Vec<Note> = Vec::new();
    while let Some(row) = rows.next()? {
        let note: Note = Note {
            id: row.get(0)?,
            path: row.get(1)?,
            tag: row.get(2)?,
            due_date: row.get(3)?,
            interval: row.get(4)?,
            repetition: row.get(5)?,
            efactor: row.get(6)?,
            is_favorite: row.get(7)?,
            card_id: row.get(8)?,
        };

        items.push(note);
    }

    Ok(items)
}
