/**
 * Database Module Tests
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * PHASE 4 : Test d'une logique métier complexe
 *
 * DÉFIS :
 * ──────
 * 1. La database utilise IndexedDB (pas disponible en Node.js)
 * 2. Les opérations sont asynchrones (Promise-based)
 * 3. Il faut mocker Dexie/IndexedDB pour tester
 *
 * SOLUTION :
 * ─────────
 * Utiliser 'idb' - une implémentation complète d'IndexedDB pour les tests
 * https://www.npmjs.com/package/idb
 *
 * OU utiliser fake-indexeddb :
 * https://www.npmjs.com/package/fake-indexeddb
 *
 * POUR CETTE PHASE : On va tester les opérations de manière "unitaire"
 * en mockant certaines dépendances.
 *
 * IMPORTANT : En production, on utiliserait `vitest-indexeddb` ou `idb`
 * mais pour l'apprentissage, on montre les concepts clés de mocking.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { Application, Task, Note } from "../types";

/**
 * IMPORTANT : Pour tester la database réellement, il faudrait :
 * 1. Installer fake-indexeddb : npm install --save-dev fake-indexeddb
 * 2. Importer dans setup.ts : import 'fake-indexeddb/auto'
 * 3. Puis on pourrait importer db depuis lib/db.ts
 *
 * Pour cette démo éducative, on va montrer comment structurer les tests
 * sans dépendre du vrai IndexedDB.
 */

/**
 * ============================================================================
 * SCÉNARIO DE TEST : Simulation de la Database
 * ============================================================================
 *
 * Au lieu de tester la vraie DB (qui dépend de IndexedDB),
 * on crée une version simplifiée pour montrer les concepts.
 *
 * C'est comme faire un "test d'intégration" sans la vraie DB.
 */

interface MockDatabaseStore {
  applications: Map<string, Application>;
  tasks: Map<string, Task>;
  notes: Map<string, Note>;
}

/**
 * Classe simplifiée pour simuler la database
 * C'est la même logique que la vraie, mais en mémoire
 */
class MockDatabase {
  private stores: MockDatabaseStore = {
    applications: new Map(),
    tasks: new Map(),
    notes: new Map(),
  };

  async init(): Promise<void> {
    // Simuler une initialisation asynchrone
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Mock database initialized");
        resolve();
      }, 10);
    });
  }

  // ===== APPLICATIONS CRUD =====
  async getApplications(): Promise<Application[]> {
    return Array.from(this.stores.applications.values());
  }

  async addApplication(app: Application): Promise<void> {
    if (this.stores.applications.has(app.id)) {
      throw new Error(`Application ${app.id} already exists`);
    }
    this.stores.applications.set(app.id, app);
  }

  async updateApplication(app: Application): Promise<void> {
    this.stores.applications.set(app.id, app);
  }

  async deleteApplication(id: string): Promise<void> {
    this.stores.applications.delete(id);
  }

  // ===== TASKS CRUD =====
  async getTasks(): Promise<Task[]> {
    return Array.from(this.stores.tasks.values());
  }

  async addTask(task: Task): Promise<void> {
    if (this.stores.tasks.has(task.id)) {
      throw new Error(`Task ${task.id} already exists`);
    }
    this.stores.tasks.set(task.id, task);
  }

  async updateTask(task: Task): Promise<void> {
    this.stores.tasks.set(task.id, task);
  }

  async deleteTask(id: string): Promise<void> {
    this.stores.tasks.delete(id);
  }

  // ===== NOTES CRUD =====
  async getNotes(): Promise<Note[]> {
    return Array.from(this.stores.notes.values());
  }

  async addNote(note: Note): Promise<void> {
    if (this.stores.notes.has(note.id)) {
      throw new Error(`Note ${note.id} already exists`);
    }
    this.stores.notes.set(note.id, note);
  }

  async updateNote(note: Note): Promise<void> {
    this.stores.notes.set(note.id, note);
  }

  async deleteNote(id: string): Promise<void> {
    this.stores.notes.delete(id);
  }

  // ===== UTILITY =====
  async clearAllData(): Promise<void> {
    this.stores.applications.clear();
    this.stores.tasks.clear();
    this.stores.notes.clear();
  }
}

/**
 * ============================================================================
 * TESTS
 * ============================================================================
 */

describe("Database Module - Applications CRUD", () => {
  let db: MockDatabase;

  /**
   * beforeEach()
   * ────────────
   * Lancé AVANT chaque test
   * Utile pour préparer l'état initial
   */
  beforeEach(async () => {
    // Créer une nouvelle instance de DB avant chaque test
    db = new MockDatabase();
    await db.init();
  });

  /**
   * afterEach()
   * ───────────
   * Lancé APRÈS chaque test
   * Utile pour nettoyer les résidus
   */
  afterEach(async () => {
    // Nettoyer la DB après chaque test
    await db.clearAllData();
  });

  /**
   * ==========================================
   * TEST 1 : Ajouter une application
   * ==========================================
   *
   * AAA Pattern :
   * - ARRANGE : Créer les données de test
   * - ACT : Ajouter l'application
   * - ASSERT : Vérifier qu'elle a été ajoutée
   */
  it("should add an application and retrieve it", async () => {
    // ✅ ARRANGE
    const testApp: Application = {
      id: "app-1",
      jobTitle: "Senior React Developer",
      company: "Tech Corp",
      status: "sent",
      applicationDate: "2025-01-01",
      notes: "Great company",
      tags: ["react", "typescript"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // ✅ ACT
    await db.addApplication(testApp);
    const applications = await db.getApplications();

    // ✅ ASSERT
    expect(applications).toHaveLength(1);
    expect(applications[0]).toEqual(testApp);
    expect(applications[0].jobTitle).toBe("Senior React Developer");
  });

  /**
   * ==========================================
   * TEST 2 : Récupérer plusieurs applications
   * ==========================================
   */
  it("should retrieve multiple applications", async () => {
    // ✅ ARRANGE
    const apps: Application[] = [
      {
        id: "app-1",
        jobTitle: "Frontend Developer",
        company: "Company A",
        status: "sent",
        applicationDate: "2025-01-01",
        notes: "",
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "app-2",
        jobTitle: "Backend Developer",
        company: "Company B",
        status: "interview",
        applicationDate: "2025-01-02",
        notes: "",
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    // ✅ ACT
    await db.addApplication(apps[0]);
    await db.addApplication(apps[1]);
    const retrieved = await db.getApplications();

    // ✅ ASSERT
    expect(retrieved).toHaveLength(2);
    expect(retrieved.map((a) => a.jobTitle)).toContain("Frontend Developer");
    expect(retrieved.map((a) => a.jobTitle)).toContain("Backend Developer");
  });

  /**
   * ==========================================
   * TEST 3 : Mettre à jour une application
   * ==========================================
   *
   * CONCEPT IMPORTANT : "Équivalence d'observables"
   * ─────────────────────────────────────────────
   * Après une mise à jour, l'application devrait :
   * - Garder le même ID
   * - Avoir les nouvelles données
   * - Être la seule copie en base
   */
  it("should update an application", async () => {
    // ✅ ARRANGE
    const app: Application = {
      id: "app-1",
      jobTitle: "Junior Developer",
      company: "Startup Inc",
      status: "sent",
      applicationDate: "2025-01-01",
      notes: "Initial notes",
      tags: ["startup"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.addApplication(app);

    // Créer une version mise à jour
    const updatedApp: Application = {
      ...app,
      status: "interview",
      notes: "Updated notes after call with HR",
      updatedAt: new Date().toISOString(),
    };

    // ✅ ACT
    await db.updateApplication(updatedApp);
    const applications = await db.getApplications();

    // ✅ ASSERT
    expect(applications).toHaveLength(1);
    expect(applications[0].status).toBe("interview");
    expect(applications[0].notes).toBe("Updated notes after call with HR");
    expect(applications[0].id).toBe("app-1"); // ID unchanged
  });

  /**
   * ==========================================
   * TEST 4 : Supprimer une application
   * ==========================================
   */
  it("should delete an application", async () => {
    // ✅ ARRANGE
    const app: Application = {
      id: "app-1",
      jobTitle: "Developer",
      company: "Company",
      status: "sent",
      applicationDate: "2025-01-01",
      notes: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.addApplication(app);

    // ✅ ACT
    await db.deleteApplication("app-1");
    const applications = await db.getApplications();

    // ✅ ASSERT
    expect(applications).toHaveLength(0);
  });

  /**
   * ==========================================
   * TEST 5 : Dupliquer un ID devrait échouer
   * ==========================================
   *
   * C'est un test d'ERREUR
   * On vérifie que la DB rejette les doublons.
   *
   * PATTERNS :
   * - expect(promise).rejects.toThrow() : Attendre une erreur
   * - async/await : Promesses
   */
  it("should reject adding duplicate application ID", async () => {
    // ✅ ARRANGE
    const app: Application = {
      id: "app-1",
      jobTitle: "Developer",
      company: "Company",
      status: "sent",
      applicationDate: "2025-01-01",
      notes: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.addApplication(app);

    // ✅ ACT et ASSERT
    // .rejects = attendre qu'une promesse soit rejetée
    // .toThrow() = vérifier qu'une erreur est lancée
    await expect(db.addApplication(app)).rejects.toThrow("already exists");
  });
});

/**
 * ============================================================================
 * Tests des TASKS
 * ============================================================================
 */
describe("Database Module - Tasks CRUD", () => {
  let db: MockDatabase;

  beforeEach(async () => {
    db = new MockDatabase();
    await db.init();
  });

  afterEach(async () => {
    await db.clearAllData();
  });

  /**
   * TEST : Cycle complet Task
   * ──────────────────────────
   *
   * "Cycle complet" = Add → Read → Update → Delete
   * C'est un test "end-to-end" pour une seule entité
   */
  it("should perform full CRUD cycle for tasks", async () => {
    // ✅ ARRANGE
    const task: Task = {
      id: "task-1",
      title: "Prepare cover letter",
      description: "Write cover letter for TechCorp position",
      dueDate: "2025-01-10",
      completed: false,
      applicationId: "app-1",
      createdAt: new Date().toISOString(),
    };

    // CREATE
    await db.addTask(task);
    let tasks = await db.getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Prepare cover letter");

    // UPDATE
    const updatedTask = { ...task, completed: true };
    await db.updateTask(updatedTask);
    tasks = await db.getTasks();
    expect(tasks[0].completed).toBe(true);

    // DELETE
    await db.deleteTask("task-1");
    tasks = await db.getTasks();
    expect(tasks).toHaveLength(0);
  });

  /**
   * TEST : Filtrer les tasks par applicationId
   * ────────────────────────────────────────────
   *
   * Cas réaliste : Une application peut avoir plusieurs tasks
   */
  it("should retrieve tasks for specific application", async () => {
    // ✅ ARRANGE
    const task1: Task = {
      id: "task-1",
      title: "Task 1",
      description: "For app 1",
      dueDate: "2025-01-10",
      completed: false,
      applicationId: "app-1",
      createdAt: new Date().toISOString(),
    };

    const task2: Task = {
      id: "task-2",
      title: "Task 2",
      description: "For app 1",
      dueDate: "2025-01-11",
      completed: false,
      applicationId: "app-1",
      createdAt: new Date().toISOString(),
    };

    const task3: Task = {
      id: "task-3",
      title: "Task 3",
      description: "For app 2",
      dueDate: "2025-01-12",
      completed: false,
      applicationId: "app-2",
      createdAt: new Date().toISOString(),
    };

    // ✅ ACT
    await db.addTask(task1);
    await db.addTask(task2);
    await db.addTask(task3);

    const allTasks = await db.getTasks();
    const app1Tasks = allTasks.filter((t) => t.applicationId === "app-1");

    // ✅ ASSERT
    expect(allTasks).toHaveLength(3);
    expect(app1Tasks).toHaveLength(2);
    expect(app1Tasks.map((t) => t.title)).toEqual(["Task 1", "Task 2"]);
  });
});

/**
 * ============================================================================
 * Tests des NOTES
 * ============================================================================
 */
describe("Database Module - Notes CRUD", () => {
  let db: MockDatabase;

  beforeEach(async () => {
    db = new MockDatabase();
    await db.init();
  });

  afterEach(async () => {
    await db.clearAllData();
  });

  /**
   * TEST : Ajouter et récupérer des notes
   * ─────────────────────────────────────
   */
  it("should add and retrieve notes", async () => {
    // ✅ ARRANGE
    const note: Note = {
      id: "note-1",
      title: "Interview Tips",
      content: "Remember to ask about team dynamics",
      tags: ["interview", "preparation"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // ✅ ACT
    await db.addNote(note);
    const notes = await db.getNotes();

    // ✅ ASSERT
    expect(notes).toHaveLength(1);
    expect(notes[0].title).toBe("Interview Tips");
    expect(notes[0].tags).toContain("interview");
  });

  /**
   * TEST : Mettre à jour une note
   * ──────────────────────────────
   */
  it("should update note content", async () => {
    // ✅ ARRANGE
    const note: Note = {
      id: "note-1",
      title: "Company Research",
      content: "Founded in 2020",
      tags: ["research"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.addNote(note);

    // ✅ ACT
    const updatedNote = {
      ...note,
      content: "Founded in 2020, now 500+ employees",
      updatedAt: new Date().toISOString(),
    };
    await db.updateNote(updatedNote);

    const notes = await db.getNotes();

    // ✅ ASSERT
    expect(notes[0].content).toBe("Founded in 2020, now 500+ employees");
    expect(notes[0].id).toBe("note-1"); // ID unchanged
  });
});

/**
 * ============================================================================
 * Tests d'INTERACTIONS entre entités
 * ============================================================================
 */
describe("Database Module - Cross-entity operations", () => {
  let db: MockDatabase;

  beforeEach(async () => {
    db = new MockDatabase();
    await db.init();
  });

  afterEach(async () => {
    await db.clearAllData();
  });

  /**
   * TEST : Scénario réaliste
   * ──────────────────────────
   *
   * Ajouter une application, lui ajouter des tasks,
   * puis supprimer l'application
   */
  it("should handle realistic workflow - application with tasks", async () => {
    // ✅ ARRANGE - Créer une application
    const app: Application = {
      id: "app-1",
      jobTitle: "Senior Developer",
      company: "TechCorp",
      status: "to_apply",
      applicationDate: "2025-01-01",
      notes: "",
      tags: ["tech"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Créer des tasks pour cette application
    const task1: Task = {
      id: "task-1",
      title: "Prepare cover letter",
      description: "",
      dueDate: "2025-01-05",
      completed: false,
      applicationId: "app-1",
      createdAt: new Date().toISOString(),
    };

    const task2: Task = {
      id: "task-2",
      title: "Fix resume",
      description: "",
      dueDate: "2025-01-04",
      completed: false,
      applicationId: "app-1",
      createdAt: new Date().toISOString(),
    };

    // ✅ ACT - Ajouter tout
    await db.addApplication(app);
    await db.addTask(task1);
    await db.addTask(task2);

    // Vérifier l'état initial
    let apps = await db.getApplications();
    let tasks = await db.getTasks();
    expect(apps).toHaveLength(1);
    expect(tasks).toHaveLength(2);

    // Marquer les tasks comme complétées
    await db.updateTask({ ...task1, completed: true });
    await db.updateTask({ ...task2, completed: true });

    // Mettre à jour l'application à "sent"
    await db.updateApplication({ ...app, status: "sent" });

    // ✅ ASSERT - Vérifier l'état final
    apps = await db.getApplications();
    tasks = await db.getTasks();

    expect(apps[0].status).toBe("sent");
    expect(tasks.every((t) => t.completed)).toBe(true);
  });

  /**
   * TEST : Vérifier que les données restent isolées
   * ───────────────────────────────────────────────
   *
   * Chaque type d'entité (app, task, note) doit être séparé
   */
  it("should keep data isolated between stores", async () => {
    // ✅ ARRANGE et ACT
    const app: Application = {
      id: "app-1",
      jobTitle: "Developer",
      company: "Company",
      status: "sent",
      applicationDate: "2025-01-01",
      notes: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const task: Task = {
      id: "task-1",
      title: "Task",
      description: "",
      dueDate: "2025-01-10",
      completed: false,
      applicationId: "app-1",
      createdAt: new Date().toISOString(),
    };

    const note: Note = {
      id: "note-1",
      title: "Note",
      content: "Content",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.addApplication(app);
    await db.addTask(task);
    await db.addNote(note);

    // ✅ ASSERT
    const apps = await db.getApplications();
    const tasks = await db.getTasks();
    const notes = await db.getNotes();

    expect(apps).toHaveLength(1);
    expect(tasks).toHaveLength(1);
    expect(notes).toHaveLength(1);

    // Supprimer l'application ne doit pas affecter les tasks/notes
    await db.deleteApplication("app-1");

    const appsAfter = await db.getApplications();
    const tasksAfter = await db.getTasks();
    const notesAfter = await db.getNotes();

    expect(appsAfter).toHaveLength(0);
    expect(tasksAfter).toHaveLength(1); // Task reste !
    expect(notesAfter).toHaveLength(1); // Note reste !
  });
});
