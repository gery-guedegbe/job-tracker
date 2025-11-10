import type { Translation } from "./fr";

export const en: Translation = {
  common: {
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    search: "Search",
    filter: "Filter",
    reset: "Reset",
    export: "Export",
    import: "Import",
    close: "Close",
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    skip: "Skip",
    finish: "Finish",
    yes: "Yes",
    no: "No",
    all: "All",
    none: "None",
    other: "Other",
  },

  navbar: {
    appName: "JobTrackr",
    kanban: "Kanban",
    list: "List",
    dashboard: "Dashboard",
    tasks: "Tasks",
    notes: "Notes",
    importExport: "Import/Export",
    settings: "Settings",
    toggleTheme: "Toggle theme",
    menu: "Menu",
  },

  footer: {
    madeWith: "Made with",
    by: "by",
    allRightsReserved: "All rights reserved",
    version: "v1.0.0 - Local job application manager",
    storageInfo: "All your data is stored locally in your browser",
  },

  onboarding: {
    slide1: {
      title: "Welcome to JobTrackr",
      description:
        "Manage all your job applications in one place. Track your progress, organize your searches, and never miss an opportunity.",
    },
    slide2: {
      title: "Organize with Kanban",
      description:
        "Visualize your applications with our intuitive Kanban board. Drag and drop to change statuses and keep a clear overview.",
    },
    slide3: {
      title: "Analyze Your Results",
      description:
        "View detailed statistics on your applications. Identify trends and optimize your job search strategy.",
    },
    loadSampleData: "Load sample data",
    getStarted: "Get Started",
  },

  statuses: {
    to_apply: "To Apply",
    sent: "Sent",
    followed_up: "Followed Up",
    interview: "Interview",
    offer: "Offer Received",
    rejected: "Rejected",
  },

  kanban: {
    title: "Kanban View",
    subtitle: "Manage your applications with drag and drop",
    addApplication: "New Application",
    emptyColumn: "No applications in this column",
    dropHere: "Drop here",
  },

  list: {
    title: "List View",
    subtitle: "All your applications at a glance",
    addApplication: "New Application",
    searchPlaceholder: "Search by job title or company...",
    filterByStatus: "Filter by status",
    columns: {
      jobTitle: "Job Title",
      company: "Company",
      status: "Status",
      applicationDate: "Application Date",
      actions: "Actions",
    },
    emptyState: "No applications found",
    emptyStateDescription: "Start by adding your first application",
  },

  dashboard: {
    title: "Dashboard",
    subtitle: "Statistics and overview of your applications",
    metrics: {
      totalApplications: "Total Applications",
      responseRate: "Response Rate",
      interviews: "Interviews",
      offers: "Offers Received",
    },
    charts: {
      statusDistribution: "Distribution by Status",
      monthlyTrend: "Monthly Trend",
      applicationsPerMonth: "Applications per Month",
    },
    emptyState: "No data available",
    emptyStateDescription: "Add applications to see your statistics",
  },

  tasks: {
    title: "Tasks and Reminders",
    subtitle: "Manage your actions and follow-ups",
    addTask: "New Task",
    sections: {
      today: "Today",
      thisWeek: "This Week",
      later: "Later",
      completed: "Completed",
    },
    emptyState: "No tasks",
    emptyStateDescription: "Create your first task to stay organized",
    markComplete: "Mark as complete",
    markIncomplete: "Mark as incomplete",
    dueDate: "Due date",
    linkedTo: "Linked to",
    noLinkedApplication: "No linked application",
  },

  notes: {
    title: "Personal Notes",
    subtitle: "Keep your ideas and important information",
    addNote: "New Note",
    searchPlaceholder: "Search in notes...",
    emptyState: "No notes",
    emptyStateDescription: "Create your first note to get started",
    lastUpdated: "Last updated",
    tags: "Tags",
    untitledNote: "Untitled note",
    noSearchResults: "No notes match your search",
    tryDifferentKeywords: "Try different keywords",
  },

  importExport: {
    title: "Import / Export Data",
    subtitle: "Backup and restore your data locally",
    export: {
      title: "Export My Data",
      description: "Download your applications, tasks and notes",
      json: {
        title: "JSON Export",
        description:
          "Complete format including all data (applications, tasks, notes)",
        button: "Export as JSON",
      },
      csv: {
        title: "CSV Export",
        description: "Spreadsheet format for applications only",
        button: "Export as CSV",
      },
      info: "JSON files contain all your data and can be reimported. CSV files only contain applications.",
    },
    import: {
      title: "Import My Data",
      description: "Restore your data from a JSON file",
      button: "Import from JSON file",
      success: "Data imported successfully!",
      error: "Error importing data",
      warning:
        "⚠️ Imported data will be added to your existing data. It will not replace your current data.",
    },
    storage: {
      title: "About Local Storage",
      description:
        "JobTrackr stores all your data locally in your browser using IndexedDB. Your data is never sent to an external server.",
      tips: "Tips:",
      tip1: "Export your data regularly to create backups",
      tip2: "Keep your export files in a safe place",
      tip3: "If you change browsers, import your data from your last export",
      tip4: "Deleting browser data will erase all your information",
    },
    csvHeaders: {
      jobTitle: "Job Title",
      company: "Company",
      status: "Status",
      date: "Date",
      notes: "Notes",
      tags: "Tags",
    },
    errors: {
      noDataToExport: "No data to export",
      invalidFile: "Invalid file",
      noValidData: "No valid data found in the file",
      invalidFileType: "Only JSON files are accepted",
      fileTooLarge: "File is too large (max 10MB)",
      invalidJson: "Invalid JSON format",
      storageQuotaExceeded: "Insufficient storage space",
    },
  },

  settings: {
    title: "Settings",
    subtitle: "Customize your JobTrackr experience",
    appearance: {
      title: "Appearance",
      description: "Customize the application appearance",
      theme: {
        label: "Theme",
        description: "Changes applied in real-time",
        light: "Light",
        dark: "Dark",
      },
    },
    language: {
      title: "Language",
      description: "Select the interface language",
      label: "Interface Language",
      labelDescription: "French or English",
      french: "Français",
      english: "English",
    },
    general: {
      title: "General",
      description: "General application settings",
      autoSave: {
        label: "Auto-save",
        description: "Automatically save changes",
      },
    },
    dangerZone: {
      title: "Danger Zone",
      description: "Irreversible actions on your data",
      clearData: {
        button: "Clear All Data",
        title: "Clear all data?",
        description:
          "This action will delete all your applications, tasks, and notes, but will keep your settings (theme, language). Remember to export your data before continuing.",
        confirm: "Yes, clear data",
      },
      reset: {
        button: "Reset Application",
        title: "Reset application completely?",
        description:
          "This action is irreversible. All your applications, tasks, notes AND settings will be permanently deleted. Remember to export your data before continuing.",
        confirm: "Yes, reset everything",
      },
    },
    saveButton: "Save Changes",
    about: {
      title: "About",
      version: "v1.0.0",
      description: "Local job application management app without registration.",
      storage: "All your data is stored locally in your browser.",
    },
  },

  modal: {
    add: {
      title: "New Application",
      description: "Add the details of your new application",
    },
    edit: {
      title: "Edit Application",
      description: "Update your application information",
    },
    fields: {
      jobTitle: {
        label: "Job Title",
        placeholder: "e.g. Full Stack Developer",
      },
      company: {
        label: "Company",
        placeholder: "e.g. Google",
      },
      status: {
        label: "Status",
        placeholder: "Select a status",
      },
      applicationDate: {
        label: "Application Date",
      },
      tags: {
        label: "Tags",
        placeholder: "Press Enter to add",
        description: "Add tags to organize your applications",
      },
      notes: {
        label: "Notes",
        placeholder: "Additional information about this application...",
      },
    },
    deleteConfirm: {
      title: "Confirm Deletion",
      description:
        "Are you sure you want to delete this application? This action is irreversible.",
      confirm: "Delete",
    },
  },

  taskModal: {
    add: {
      title: "New Task",
      description: "Create a new task or reminder",
    },
    edit: {
      title: "Edit Task",
      description: "Update your task information",
    },
    fields: {
      title: {
        label: "Title",
        placeholder: "e.g. Follow up with Company X",
      },
      description: {
        label: "Description",
        placeholder: "Task details...",
      },
      dueDate: {
        label: "Due Date",
      },
      linkedApplication: {
        label: "Linked Application (optional)",
        placeholder: "Select an application",
        none: "None",
      },
    },
    deleteConfirm: {
      title: "Confirm Deletion",
      description: "Are you sure you want to delete this task?",
      confirm: "Delete",
    },
  },

  noteModal: {
    add: {
      title: "New Note",
      description: "Add a new note to organize your ideas",
    },
    edit: {
      title: "Edit Note",
      description: "Edit your personal note",
    },
    fields: {
      title: {
        label: "Title",
        placeholder: "Note title (optional)",
      },
      content: {
        label: "Content",
        placeholder: "Write your note here...",
        required: "Content *",
      },
      tags: {
        label: "Tags",
        placeholder: "Add a tag",
        add: "Add",
      },
    },
    deleteConfirm: {
      title: "Confirm Deletion",
      description: "Are you sure you want to delete the note",
      descriptionSuffix: "? This action is irreversible.",
      confirm: "Delete",
      cancel: "Cancel",
    },
    save: "Save",
    update: "Update",
  },

  toast: {
    success: {
      applicationAdded: "Application added successfully!",
      applicationUpdated: "Application updated successfully!",
      applicationDeleted: "Application deleted successfully!",
      statusUpdated: "Status updated!",
      taskAdded: "Task added successfully!",
      taskUpdated: "Task updated successfully!",
      taskDeleted: "Task deleted successfully!",
      noteAdded: "Note added successfully!",
      noteUpdated: "Note updated successfully!",
      noteDeleted: "Note deleted successfully!",
      settingsSaved: "Settings saved successfully!",
      dataImported: "Data imported successfully!",
      dataExported: "Data exported successfully!",
      sampleDataLoaded: "Sample data loaded successfully!",
      dataCleared: "All data has been cleared!",
      appReset: "Application reset successfully!",
    },
    error: {
      generic: "An error occurred",
      initialization: "Error initializing application",
      saveApplication: "Error saving application",
      deleteApplication: "Error deleting application",
      updateStatus: "Error updating status",
      saveTask: "Error saving task",
      deleteTask: "Error deleting task",
      saveNote: "Error saving note",
      deleteNote: "Error deleting note",
      saveSettings: "Error saving settings",
      importData: "Error importing data",
      exportData: "Error exporting data",
      clearData: "Error clearing data",
      invalidImportFormat:
        "Invalid file format. Please import a valid JSON file.",
      resetApp: "Error resetting application",
    },
  },
};
