CREATE TABLE film (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, image TEXT, search_text TEXT);
CREATE TABLE film_detail (
    film_id INTEGER,
    title TEXT,
    link TEXT PRIMARY KEY
);