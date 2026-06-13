import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Database from "better-sqlite3";
import path from "path";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const db = new Database(path.join(process.cwd(), "dev.db"));

    // Check if user exists
    const existingUser = db.prepare("SELECT id FROM User WHERE email = ?").get(email);
    if (existingUser) {
      db.close();
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const id = 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    
    db.prepare("INSERT INTO User (id, name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))").run(id, name, email, hashedPassword);
    db.close();

    return NextResponse.json({ message: "Account created successfully", userId: id }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
