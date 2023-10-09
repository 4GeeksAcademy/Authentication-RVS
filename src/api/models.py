from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)

    name = db.Column(db.String(120), unique=False, nullable=False)

    password = db.Column(db.String(80), unique=False, nullable=False)

    salt = db.Column(db.String(40), unique=False, nullable=False)

    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self, email, password, name, salt):
        self.name = name
        self.email = email
        self.password = password
        self.is_active = True
        self.salt = salt


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name
        }
    