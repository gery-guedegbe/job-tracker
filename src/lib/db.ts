import type { Application, Task, Note, AppSettings } from "../types/index";

const DB_NAME = "JobTrackrDB";
const DB_VERSION = 1;

class Database {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains("applications")) {
          db.createObjectStore("applications", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("tasks")) {
          db.createObjectStore("tasks", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("notes")) {
          db.createObjectStore("notes", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "id" });
        }
      };
    });
  }

  private getStore(storeName: string, mode: IDBTransactionMode = "readonly") {
    if (!this.db) throw new Error("Database not initialized");
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // Applications
  async getApplications(): Promise<Application[]> {
    const store = this.getStore("applications");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addApplication(application: Application): Promise<void> {
    const store = this.getStore("applications", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.add(application);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async updateApplication(application: Application): Promise<void> {
    const store = this.getStore("applications", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(application);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteApplication(id: string): Promise<void> {
    const store = this.getStore("applications", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Tasks
  async getTasks(): Promise<Task[]> {
    const store = this.getStore("tasks");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addTask(task: Task): Promise<void> {
    const store = this.getStore("tasks", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.add(task);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async updateTask(task: Task): Promise<void> {
    const store = this.getStore("tasks", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(task);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteTask(id: string): Promise<void> {
    const store = this.getStore("tasks", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Notes
  async getNotes(): Promise<Note[]> {
    const store = this.getStore("notes");
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addNote(note: Note): Promise<void> {
    const store = this.getStore("notes", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.add(note);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async updateNote(note: Note): Promise<void> {
    const store = this.getStore("notes", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(note);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteNote(id: string): Promise<void> {
    const store = this.getStore("notes", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Settings
  async getSettings(): Promise<AppSettings> {
    const store = this.getStore("settings");
    return new Promise((resolve, reject) => {
      const request = store.get("app-settings");
      request.onsuccess = () => {
        const settings = request.result || {
          id: "app-settings",
          theme: "light",
          language: "fr",
          autoSave: true,
          onboardingCompleted: false,
        };
        resolve(settings);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async updateSettings(settings: AppSettings): Promise<void> {
    const store = this.getStore("settings", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put({ ...settings, id: "app-settings" });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clearAllData(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    const storeNames = ["applications", "tasks", "notes"];
    const promises = storeNames.map((storeName) => {
      const store = this.getStore(storeName, "readwrite");
      return new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    });

    await Promise.all(promises);
  }

  async exportData(): Promise<{
    applications: Application[];
    tasks: Task[];
    notes: Note[];
  }> {
    const [applications, tasks, notes] = await Promise.all([
      this.getApplications(),
      this.getTasks(),
      this.getNotes(),
    ]);
    return { applications, tasks, notes };
  }

  async importData(data: {
    applications?: Application[];
    tasks?: Task[];
    notes?: Note[];
  }): Promise<void> {
    if (data.applications) {
      for (const app of data.applications) {
        await this.addApplication(app);
      }
    }
    if (data.tasks) {
      for (const task of data.tasks) {
        await this.addTask(task);
      }
    }
    if (data.notes) {
      for (const note of data.notes) {
        await this.addNote(note);
      }
    }
  }
}

export const db = new Database();
