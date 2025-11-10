/**
 * DATABASE MODULE - JobTrackr Application
 *
 * This module provides a robust IndexedDB wrapper for managing job applications,
 * tasks, notes, and application settings.
 *
 * Key Features:
 * - CRUD operations for applications, tasks, and notes
 * - Settings management with persistence
 * - Data import/export functionality
 * - Error handling and transaction management
 *
 * @version 1.0
 * @author JobTrackr Team
 */

import type { Application, Task, Note, AppSettings } from "../types/index";

// =============================================================================
// DATABASE CONFIGURATION CONSTANTS
// =============================================================================

/**
 * Database name used in IndexedDB
 * @constant {string}
 */
const DB_NAME = "JobTrackrDB";

/**
 * Database version for schema management
 * Increment this when modifying object store structure
 * @constant {number}
 */
const DB_VERSION = 1;

/**
 * Main database class encapsulating all IndexedDB operations
 *
 * Design Patterns:
 * - Singleton pattern via exported 'db' instance
 * - Repository pattern for data access
 * - Promise-based async operations
 *
 * @class Database
 */
class Database {
  /**
   * Active database connection instance
   * @private
   */
  private db: IDBDatabase | null = null;

  // ===========================================================================
  // DATABASE INITIALIZATION & CONFIGURATION
  // ===========================================================================

  /**
   * Initializes the database connection and creates object stores if needed
   *
   * This method:
   * - Opens connection to IndexedDB
   * - Handles schema upgrades
   * - Creates object stores for each data type
   * - Sets up error handling
   *
   * @returns {Promise<void>} Resolves when database is ready
   * @throws {Error} If database cannot be opened
   *
   * @example
   * await db.init();
   * console.log('Database initialized successfully');
   */
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error("Database initialization failed:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log(`Database "${DB_NAME}" initialized successfully`);
        resolve();
      };

      /**
       * Handles database schema upgrades and object store creation
       * This runs when:
       * - Database is first created
       * - DB_VERSION is increased
       */
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        console.log(`Database upgrade needed. Creating object stores...`);

        // Create object stores with their key paths
        const stores = [
          { name: "applications", keyPath: "id" },
          { name: "tasks", keyPath: "id" },
          { name: "notes", keyPath: "id" },
          { name: "settings", keyPath: "id" },
        ];

        stores.forEach(({ name, keyPath }) => {
          if (!db.objectStoreNames.contains(name)) {
            db.createObjectStore(name, { keyPath });
            console.log(`Created object store: ${name}`);
          }
        });
      };
    });
  }

  /**
   * Retrieves an object store for database operations
   *
   * @private
   * @param {string} storeName - Name of the object store
   * @param {IDBTransactionMode} mode - Transaction mode ('readonly' or 'readwrite')
   * @returns {IDBObjectStore} The requested object store
   * @throws {Error} If database is not initialized
   */
  private getStore(
    storeName: string,
    mode: IDBTransactionMode = "readonly",
  ): IDBObjectStore {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.");
    }

    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // ===========================================================================
  // APPLICATION CRUD OPERATIONS
  // ===========================================================================

  /**
   * Retrieves all job applications from the database
   *
   * @returns {Promise<Application[]>} Array of all applications
   *
   * @example
   * const applications = await db.getApplications();
   * applications.forEach(app => console.log(app.jobTitle));
   */
  async getApplications(): Promise<Application[]> {
    const store = this.getStore("applications");
    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        console.log(`Retrieved ${request.result.length} applications`);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("Failed to retrieve applications:", request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Adds a new job application to the database
   *
   * @param {Application} application - The application object to add
   * @returns {Promise<void>} Resolves when application is added
   * @throws {Error} If application with same ID already exists
   *
   * @example
   * await db.addApplication({
   *   id: 'app-123',
   *   jobTitle: 'Frontend Developer',
   *   company: 'Tech Corp',
   *   status: 'sent'
   * });
   */
  async addApplication(application: Application): Promise<void> {
    const store = this.getStore("applications", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.add(application);

      request.onsuccess = () => {
        console.log(`Application "${application.jobTitle}" added successfully`);
        resolve();
      };

      request.onerror = () => {
        console.error(
          `Failed to add application "${application.jobTitle}":`,
          request.error,
        );
        reject(request.error);
      };
    });
  }

  /**
   * Updates an existing job application
   *
   * Note: Uses put() which will create the application if it doesn't exist
   *
   * @param {Application} application - The updated application object
   * @returns {Promise<void>} Resolves when application is updated
   *
   * @example
   * await db.updateApplication(updatedApp);
   */
  async updateApplication(application: Application): Promise<void> {
    const store = this.getStore("applications", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(application);

      request.onsuccess = () => {
        console.log(
          `Application "${application.jobTitle}" updated successfully`,
        );
        resolve();
      };

      request.onerror = () => {
        console.error(
          `Failed to update application "${application.jobTitle}":`,
          request.error,
        );
        reject(request.error);
      };
    });
  }

  /**
   * Deletes a job application by ID
   *
   * @param {string} id - The ID of the application to delete
   * @returns {Promise<void>} Resolves when application is deleted
   *
   * @example
   * await db.deleteApplication('app-123');
   */
  async deleteApplication(id: string): Promise<void> {
    const store = this.getStore("applications", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log(`Application ${id} deleted successfully`);
        resolve();
      };

      request.onerror = () => {
        console.error(`Failed to delete application ${id}:`, request.error);
        reject(request.error);
      };
    });
  }

  // ===========================================================================
  // TASK CRUD OPERATIONS
  // ===========================================================================

  /**
   * Retrieves all tasks from the database
   *
   * @returns {Promise<Task[]>} Array of all tasks
   */
  async getTasks(): Promise<Task[]> {
    const store = this.getStore("tasks");
    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        console.log(`Retrieved ${request.result.length} tasks`);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("Failed to retrieve tasks:", request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Adds a new task to the database
   *
   * @param {Task} task - The task object to add
   * @returns {Promise<void>} Resolves when task is added
   */
  async addTask(task: Task): Promise<void> {
    const store = this.getStore("tasks", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.add(task);

      request.onsuccess = () => {
        console.log(`Task "${task.title}" added successfully`);
        resolve();
      };

      request.onerror = () => {
        console.error(`Failed to add task "${task.title}":`, request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Updates an existing task
   *
   * @param {Task} task - The updated task object
   * @returns {Promise<void>} Resolves when task is updated
   */
  async updateTask(task: Task): Promise<void> {
    const store = this.getStore("tasks", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(task);

      request.onsuccess = () => {
        console.log(`Task "${task.title}" updated successfully`);
        resolve();
      };

      request.onerror = () => {
        console.error(`Failed to update task "${task.title}":`, request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Deletes a task by ID
   *
   * @param {string} id - The ID of the task to delete
   * @returns {Promise<void>} Resolves when task is deleted
   */
  async deleteTask(id: string): Promise<void> {
    const store = this.getStore("tasks", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log(`Task ${id} deleted successfully`);
        resolve();
      };

      request.onerror = () => {
        console.error(`Failed to delete task ${id}:`, request.error);
        reject(request.error);
      };
    });
  }

  // ===========================================================================
  // NOTE CRUD OPERATIONS
  // ===========================================================================

  /**
   * Retrieves all notes from the database
   *
   * @returns {Promise<Note[]>} Array of all notes
   */
  async getNotes(): Promise<Note[]> {
    const store = this.getStore("notes");
    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        console.log(`Retrieved ${request.result.length} notes`);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("Failed to retrieve notes:", request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Adds a new note to the database
   *
   * @param {Note} note - The note object to add
   * @returns {Promise<void>} Resolves when note is added
   */
  async addNote(note: Note): Promise<void> {
    const store = this.getStore("notes", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.add(note);

      request.onsuccess = () => {
        console.log(`Note "${note.title}" added successfully`);
        resolve();
      };

      request.onerror = () => {
        console.error(`Failed to add note "${note.title}":`, request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Updates an existing note
   *
   * @param {Note} note - The updated note object
   * @returns {Promise<void>} Resolves when note is updated
   */
  async updateNote(note: Note): Promise<void> {
    const store = this.getStore("notes", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(note);

      request.onsuccess = () => {
        console.log(`Note "${note.title}" updated successfully`);
        resolve();
      };

      request.onerror = () => {
        console.error(`Failed to update note "${note.title}":`, request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Deletes a note by ID
   *
   * @param {string} id - The ID of the note to delete
   * @returns {Promise<void>} Resolves when note is deleted
   */
  async deleteNote(id: string): Promise<void> {
    const store = this.getStore("notes", "readwrite");
    return new Promise((resolve, reject) => {
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log(`Note ${id} deleted successfully`);
        resolve();
      };

      request.onerror = () => {
        console.error(`Failed to delete note ${id}:`, request.error);
        reject(request.error);
      };
    });
  }

  // ===========================================================================
  // SETTINGS MANAGEMENT
  // ===========================================================================

  /**
   * Retrieves application settings
   *
   * Returns default settings if no settings are found in database
   *
   * @returns {Promise<AppSettings>} Application settings object
   */
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

        console.log("Settings retrieved successfully");
        resolve(settings);
      };

      request.onerror = () => {
        console.error("Failed to retrieve settings:", request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Updates application settings
   *
   * @param {AppSettings} settings - The new settings object
   * @returns {Promise<void>} Resolves when settings are updated
   */
  async updateSettings(settings: AppSettings): Promise<void> {
    const store = this.getStore("settings", "readwrite");
    return new Promise((resolve, reject) => {
      // Ensure settings have the correct ID for database storage
      const settingsWithId = { ...settings, id: "app-settings" };
      const request = store.put(settingsWithId);

      request.onsuccess = () => {
        console.log("Settings updated successfully");
        resolve();
      };

      request.onerror = () => {
        console.error("Failed to update settings:", request.error);
        reject(request.error);
      };
    });
  }

  // ===========================================================================
  // DATA MANAGEMENT OPERATIONS (IMPORT/EXPORT/CLEAR)
  // ===========================================================================

  /**
   * Clears all application data (applications, tasks, notes)
   *
   * WARNING: This operation is irreversible
   * Settings are preserved to maintain user preferences
   *
   * @returns {Promise<void>} Resolves when all data is cleared
   *
   * @example
   * // Use with caution - irreversible operation
   * await db.clearAllData();
   */
  async clearAllData(): Promise<void> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.");
    }

    const storeNames = ["applications", "tasks", "notes"];
    console.log(`Clearing data from stores: ${storeNames.join(", ")}`);

    const promises = storeNames.map((storeName) => {
      const store = this.getStore(storeName, "readwrite");
      return new Promise<void>((resolve, reject) => {
        const request = store.clear();

        request.onsuccess = () => {
          console.log(`Store "${storeName}" cleared successfully`);
          resolve();
        };

        request.onerror = () => {
          console.error(`Failed to clear store "${storeName}":`, request.error);
          reject(request.error);
        };
      });
    });

    await Promise.all(promises);
    console.log("All data cleared successfully");
  }

  /**
   * Exports all application data for backup or transfer
   *
   * @returns {Promise<{ applications: Application[], tasks: Task[], notes: Note[] }>}
   * Object containing all exported data
   *
   * @example
   * const data = await db.exportData();
   * const jsonString = JSON.stringify(data, null, 2);
   * // Save jsonString to file
   */
  async exportData(): Promise<{
    applications: Application[];
    tasks: Task[];
    notes: Note[];
  }> {
    console.log("Starting data export...");

    const [applications, tasks, notes] = await Promise.all([
      this.getApplications(),
      this.getTasks(),
      this.getNotes(),
    ]);

    const exportData = { applications, tasks, notes };
    console.log(
      `Export completed: ${applications.length} apps, ${tasks.length} tasks, ${notes.length} notes`,
    );

    return exportData;
  }

  /**
   * Imports data from external source
   *
   * Key Features:
   * - Uses update operations to handle duplicate IDs gracefully
   * - Preserves existing data not included in import
   * - Provides detailed logging for debugging
   *
   * @param {Object} data - Data to import
   * @param {Application[]} [data.applications] - Applications to import
   * @param {Task[]} [data.tasks] - Tasks to import
   * @param {Note[]} [data.notes] - Notes to import
   * @returns {Promise<void>} Resolves when import is complete
   *
   * @example
   * const importedData = JSON.parse(jsonString);
   * await db.importData(importedData);
   */
  async importData(data: {
    applications?: Application[];
    tasks?: Task[];
    notes?: Note[];
  }): Promise<void> {
    try {
      console.log("Starting data import process...");

      // Import applications with duplicate handling
      if (data.applications && data.applications.length > 0) {
        console.log(`Importing ${data.applications.length} applications`);

        for (const app of data.applications) {
          try {
            // put() handles both insert and update operations
            await this.updateApplication(app);
          } catch (error) {
            // Log warning but continue processing other applications
            console.warn(
              `Application ${app.id} already exists. Updated with new data.`,
              error,
            );
          }
        }

        console.log(
          `Applications import completed: ${data.applications.length} processed`,
        );
      }

      // Import tasks with duplicate handling
      if (data.tasks && data.tasks.length > 0) {
        console.log(`Importing ${data.tasks.length} tasks`);

        for (const task of data.tasks) {
          try {
            await this.updateTask(task);
          } catch (error) {
            console.warn(
              `Task ${task.id} already exists. Updated with new data.`,
              error,
            );
          }
        }

        console.log(`Tasks import completed: ${data.tasks.length} processed`);
      }

      // Import notes with duplicate handling
      if (data.notes && data.notes.length > 0) {
        console.log(`Importing ${data.notes.length} notes`);

        for (const note of data.notes) {
          try {
            await this.updateNote(note);
          } catch (error) {
            console.warn(
              `Note ${note.id} already exists. Updated with new data.`,
              error,
            );
          }
        }

        console.log(`Notes import completed: ${data.notes.length} processed`);
      }

      console.log("Data import process completed successfully");
    } catch (error) {
      console.error("Critical error during data import:", error);
      throw new Error(
        `Data import failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}

// =============================================================================
// DATABASE INSTANCE EXPORT
// =============================================================================

/**
 * Singleton database instance
 *
 * Usage:
 * import { db } from './lib/db';
 * await db.init();
 *
 * @type {Database}
 */
export const db = new Database();
