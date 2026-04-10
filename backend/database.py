"""
SQLite database setup for RiskLab.
Uses Python's built-in sqlite3 — no installation needed.
Database file: risklab.db (created automatically on first run)
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'risklab.db')


def get_db():
    """Get a database connection."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # rows behave like dicts
    return conn


def init_db():
    """Create tables if they don't exist."""
    conn = get_db()
    cursor = conn.cursor()

    cursor.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT    NOT NULL,
            email       TEXT    NOT NULL UNIQUE,
            password    TEXT    NOT NULL,
            join_date   TEXT    NOT NULL,
            created_at  TEXT    DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS simulations (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email  TEXT    NOT NULL,
            stock_id    TEXT    NOT NULL,
            profile     TEXT,
            decision    TEXT    NOT NULL,
            investment  REAL,
            final_value REAL,
            pnl         REAL,
            return_pct  REAL,
            sim_date    TEXT    NOT NULL,
            created_at  TEXT    DEFAULT (datetime('now')),
            FOREIGN KEY (user_email) REFERENCES users(email)
        );
    ''')

    conn.commit()
    conn.close()
    print(f"Database ready at: {DB_PATH}")
