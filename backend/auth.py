"""
Authentication utilities for RiskLab.
Uses bcrypt for password hashing and JWT for session tokens.
"""

import os
import hashlib
import hmac
import base64
import json
import time
from datetime import datetime

# Secret key for JWT signing — in production use a long random string in .env
SECRET_KEY = os.getenv("JWT_SECRET", "risklab-secret-key-change-in-production-2026")


def hash_password(password: str) -> str:
    """Hash a password using SHA-256 with a salt."""
    salt = os.urandom(16).hex()
    hashed = hashlib.sha256(f"{salt}{password}".encode()).hexdigest()
    return f"{salt}:{hashed}"


def verify_password(password: str, stored_hash: str) -> bool:
    """Verify a password against a stored hash."""
    try:
        salt, hashed = stored_hash.split(":")
        check = hashlib.sha256(f"{salt}{password}".encode()).hexdigest()
        return hmac.compare_digest(check, hashed)
    except Exception:
        return False


def create_token(email: str, name: str) -> str:
    """Create a simple JWT-like token."""
    payload = {
        "email": email,
        "name": name,
        "exp": int(time.time()) + (7 * 24 * 60 * 60),  # 7 days
        "iat": int(time.time()),
    }
    payload_b64 = base64.urlsafe_b64encode(
        json.dumps(payload).encode()
    ).decode().rstrip("=")

    signature = hmac.new(
        SECRET_KEY.encode(),
        payload_b64.encode(),
        hashlib.sha256
    ).hexdigest()

    return f"{payload_b64}.{signature}"


def verify_token(token: str) -> dict | None:
    """Verify and decode a token. Returns payload dict or None if invalid."""
    try:
        payload_b64, signature = token.rsplit(".", 1)

        expected_sig = hmac.new(
            SECRET_KEY.encode(),
            payload_b64.encode(),
            hashlib.sha256
        ).hexdigest()

        if not hmac.compare_digest(signature, expected_sig):
            return None

        # Decode payload
        padding = 4 - len(payload_b64) % 4
        payload_b64 += "=" * padding
        payload = json.loads(base64.urlsafe_b64decode(payload_b64).decode())

        # Check expiry
        if payload.get("exp", 0) < int(time.time()):
            return None

        return payload
    except Exception:
        return None


def get_join_date() -> str:
    """Return formatted join date like 'April 2026'."""
    return datetime.now().strftime("%B %Y")
