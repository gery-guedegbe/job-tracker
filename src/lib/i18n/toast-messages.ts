import type { Translation } from "./locales/fr";

export function getToastMessages(t: Translation) {
  return {
    success: {
      applicationAdded: () => t.toast.success.applicationAdded,
      applicationUpdated: () => t.toast.success.applicationUpdated,
      applicationDeleted: () => t.toast.success.applicationDeleted,
      statusUpdated: () => t.toast.success.statusUpdated,
      taskAdded: () => t.toast.success.taskAdded,
      taskUpdated: () => t.toast.success.taskUpdated,
      taskDeleted: () => t.toast.success.taskDeleted,
      noteAdded: () => t.toast.success.noteAdded,
      noteUpdated: () => t.toast.success.noteUpdated,
      noteDeleted: () => t.toast.success.noteDeleted,
      settingsSaved: () => t.toast.success.settingsSaved,
      dataImported: () => t.toast.success.dataImported,
      dataExported: () => t.toast.success.dataExported,
      sampleDataLoaded: () => t.toast.success.sampleDataLoaded,
      appReset: () => t.toast.success.appReset,
    },
    error: {
      generic: () => t.toast.error.generic,
      initialization: () => t.toast.error.initialization,
      saveApplication: () => t.toast.error.saveApplication,
      deleteApplication: () => t.toast.error.deleteApplication,
      updateStatus: () => t.toast.error.updateStatus,
      saveTask: () => t.toast.error.saveTask,
      deleteTask: () => t.toast.error.deleteTask,
      saveNote: () => t.toast.error.saveNote,
      deleteNote: () => t.toast.error.deleteNote,
      saveSettings: () => t.toast.error.saveSettings,
      importData: () => t.toast.error.importData,
      exportData: () => t.toast.error.exportData,
      resetApp: () => t.toast.error.resetApp,
    },
  };
}
