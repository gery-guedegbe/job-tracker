export const fr = {
  common: {
    loading: "Chargement...",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    add: "Ajouter",
    search: "Rechercher",
    filter: "Filtrer",
    reset: "Réinitialiser",
    export: "Exporter",
    import: "Importer",
    close: "Fermer",
    confirm: "Confirmer",
    back: "Retour",
    next: "Suivant",
    skip: "Passer",
    finish: "Terminer",
    yes: "Oui",
    no: "Non",
    all: "Tous",
    none: "Aucun",
    other: "Autre",
  },

  navbar: {
    appName: "JobTrackr",
    kanban: "Kanban",
    list: "Liste",
    dashboard: "Tableau de bord",
    tasks: "Tâches",
    notes: "Notes",
    importExport: "Import/Export",
    settings: "Paramètres",
    toggleTheme: "Basculer le thème",
    menu: "Menu",
  },

  footer: {
    madeWith: "Fait avec",
    by: "par",
    allRightsReserved: "Tous droits réservés",
    version: "v1.0.0 - Gestionnaire de candidatures local",
    storageInfo:
      "Toutes vos données sont stockées localement dans votre navigateur",
  },

  onboarding: {
    slide1: {
      title: "Bienvenue sur JobTrackr",
      description:
        "Gérez toutes vos candidatures en un seul endroit. Suivez vos progrès, organisez vos recherches et ne manquez jamais une opportunité.",
    },
    slide2: {
      title: "Organisez avec le Kanban",
      description:
        "Visualisez vos candidatures avec notre tableau Kanban intuitif. Glissez-déposez pour changer les statuts et gardez une vue d'ensemble claire.",
    },
    slide3: {
      title: "Analysez vos résultats",
      description:
        "Consultez des statistiques détaillées sur vos candidatures. Identifiez les tendances et optimisez votre stratégie de recherche d'emploi.",
    },
    loadSampleData: "Charger des données d'exemple",
    getStarted: "Commencer",
  },

  statuses: {
    to_apply: "À postuler",
    sent: "Envoyée",
    followed_up: "Relancée",
    interview: "Entretien",
    offer: "Offre reçue",
    rejected: "Rejetée",
  },

  kanban: {
    title: "Vue Kanban",
    subtitle: "Gérez vos candidatures avec le glisser-déposer",
    addApplication: "Nouvelle candidature",
    emptyColumn: "Aucune candidature dans cette colonne",
    dropHere: "Déposez ici",
  },

  list: {
    title: "Vue Liste",
    subtitle: "Toutes vos candidatures en un coup d'œil",
    addApplication: "Nouvelle candidature",
    searchPlaceholder: "Rechercher par poste ou entreprise...",
    filterByStatus: "Filtrer par statut",
    columns: {
      jobTitle: "Poste",
      company: "Entreprise",
      status: "Statut",
      applicationDate: "Date de candidature",
      actions: "Actions",
    },
    emptyState: "Aucune candidature trouvée",
    emptyStateDescription: "Commencez par ajouter votre première candidature",
  },

  dashboard: {
    title: "Tableau de bord",
    subtitle: "Statistiques et aperçu de vos candidatures",
    metrics: {
      totalApplications: "Total candidatures",
      responseRate: "Taux de réponse",
      interviews: "Entretiens",
      offers: "Offres reçues",
    },
    charts: {
      statusDistribution: "Répartition par statut",
      monthlyTrend: "Évolution mensuelle",
      applicationsPerMonth: "Candidatures par mois",
    },
    emptyState: "Aucune donnée disponible",
    emptyStateDescription:
      "Ajoutez des candidatures pour voir vos statistiques",
  },

  tasks: {
    title: "Tâches et rappels",
    subtitle: "Gérez vos actions et suivis",
    addTask: "Nouvelle tâche",
    sections: {
      today: "Aujourd'hui",
      thisWeek: "Cette semaine",
      later: "Plus tard",
      completed: "Terminées",
    },
    emptyState: "Aucune tâche",
    emptyStateDescription: "Créez votre première tâche pour rester organisé",
    markComplete: "Marquer comme terminée",
    markIncomplete: "Marquer comme non terminée",
    dueDate: "Échéance",
    linkedTo: "Lié à",
    noLinkedApplication: "Aucune candidature liée",
  },

  notes: {
    title: "Notes personnelles",
    subtitle: "Gardez vos idées et informations importantes",
    addNote: "Nouvelle note",
    searchPlaceholder: "Rechercher dans les notes...",
    emptyState: "Aucune note",
    emptyStateDescription: "Créez votre première note pour commencer",
    lastUpdated: "Dernière mise à jour",
    tags: "Tags",
    untitledNote: "Note sans titre",
    noSearchResults: "Aucune note ne correspond à votre recherche",
    tryDifferentKeywords: "Essayez avec d'autres mots-clés",
  },

  importExport: {
    title: "Import / Export de données",
    subtitle: "Sauvegardez et restaurez vos données localement",
    export: {
      title: "Exporter mes données",
      description: "Téléchargez vos candidatures, tâches et notes",
      json: {
        title: "Export JSON",
        description:
          "Format complet incluant toutes les données (candidatures, tâches, notes)",
        button: "Exporter en JSON",
      },
      csv: {
        title: "Export CSV",
        description: "Format tableur pour les candidatures uniquement",
        button: "Exporter en CSV",
      },
      info: "Les fichiers JSON contiennent toutes vos données et peuvent être réimportés. Les fichiers CSV ne contiennent que les candidatures.",
    },
    import: {
      title: "Importer mes données",
      description: "Restaurez vos données depuis un fichier JSON",
      button: "Importer depuis un fichier JSON",
      success: "Données importées avec succès !",
      error: "Erreur lors de l'import des données",
      warning:
        "⚠️ Les données importées seront ajoutées à vos données existantes. Elles ne remplaceront pas vos données actuelles.",
    },
    storage: {
      title: "À propos du stockage local",
      description:
        "JobTrackr stocke toutes vos données localement dans votre navigateur en utilisant IndexedDB. Vos données ne sont jamais envoyées à un serveur externe.",
      tips: "Conseils :",
      tip1: "Exportez régulièrement vos données pour créer des sauvegardes",
      tip2: "Conservez vos fichiers d'export dans un endroit sûr",
      tip3: "Si vous changez de navigateur, importez vos données depuis votre dernier export",
      tip4: "La suppression des données du navigateur effacera toutes vos informations",
    },
    csvHeaders: {
      jobTitle: "Poste",
      company: "Entreprise",
      status: "Statut",
      date: "Date",
      notes: "Notes",
      tags: "Tags",
    },
  },

  settings: {
    title: "Paramètres",
    subtitle: "Personnalisez votre expérience JobTrackr",
    appearance: {
      title: "Apparence",
      description: "Personnalisez l'apparence de l'application",
      theme: {
        label: "Thème",
        description: "Changement appliqué en temps réel",
        light: "Clair",
        dark: "Sombre",
      },
    },
    language: {
      title: "Langue",
      description: "Sélectionnez la langue de l'interface",
      label: "Langue de l'interface",
      labelDescription: "Français ou Anglais",
      french: "Français",
      english: "English",
    },
    general: {
      title: "Général",
      description: "Paramètres généraux de l'application",
      autoSave: {
        label: "Sauvegarde automatique",
        description: "Sauvegarder automatiquement les modifications",
      },
    },
    dangerZone: {
      title: "Zone dangereuse",
      description: "Actions irréversibles sur vos données",
      clearData: {
        button: "Supprimer toutes les données",
        title: "Supprimer toutes les données ?",
        description:
          "Cette action supprimera toutes vos candidatures, tâches et notes, mais conservera vos paramètres (thème, langue). Pensez à exporter vos données avant de continuer.",
        confirm: "Oui, supprimer les données",
      },
      reset: {
        button: "Réinitialiser l'application",
        title: "Réinitialiser l'application complètement ?",
        description:
          "Cette action est irréversible. Toutes vos candidatures, tâches, notes ET paramètres seront définitivement supprimés. Pensez à exporter vos données avant de continuer.",
        confirm: "Oui, réinitialiser tout",
      },
    },
    saveButton: "Enregistrer les modifications",
    about: {
      title: "À propos",
      version: "v1.0.0",
      description:
        "Application de gestion de candidatures locale et sans inscription.",
      storage:
        "Toutes vos données sont stockées localement dans votre navigateur.",
    },
  },

  modal: {
    add: {
      title: "Nouvelle candidature",
      description: "Ajoutez les détails de votre nouvelle candidature",
    },
    edit: {
      title: "Modifier la candidature",
      description: "Mettez à jour les informations de votre candidature",
    },
    fields: {
      jobTitle: {
        label: "Poste",
        placeholder: "ex: Développeur Full Stack",
      },
      company: {
        label: "Entreprise",
        placeholder: "ex: Google",
      },
      status: {
        label: "Statut",
        placeholder: "Sélectionnez un statut",
      },
      applicationDate: {
        label: "Date de candidature",
      },
      tags: {
        label: "Tags",
        placeholder: "Appuyez sur Entrée pour ajouter",
        description: "Ajoutez des tags pour organiser vos candidatures",
      },
      notes: {
        label: "Notes",
        placeholder: "Informations supplémentaires sur cette candidature...",
      },
    },
    deleteConfirm: {
      title: "Confirmer la suppression",
      description:
        "Êtes-vous sûr de vouloir supprimer cette candidature ? Cette action est irréversible.",
      confirm: "Supprimer",
    },
  },

  taskModal: {
    add: {
      title: "Nouvelle tâche",
      description: "Créez une nouvelle tâche ou un rappel",
    },
    edit: {
      title: "Modifier la tâche",
      description: "Mettez à jour les informations de votre tâche",
    },
    fields: {
      title: {
        label: "Titre",
        placeholder: "ex: Relancer l'entreprise X",
      },
      description: {
        label: "Description",
        placeholder: "Détails de la tâche...",
      },
      dueDate: {
        label: "Date d'échéance",
      },
      linkedApplication: {
        label: "Candidature liée (optionnel)",
        placeholder: "Sélectionnez une candidature",
        none: "Aucune",
      },
    },
    deleteConfirm: {
      title: "Confirmer la suppression",
      description: "Êtes-vous sûr de vouloir supprimer cette tâche ?",
      confirm: "Supprimer",
    },
  },

  noteModal: {
    add: {
      title: "Nouvelle note",
      description: "Ajoutez une nouvelle note pour organiser vos idées",
    },
    edit: {
      title: "Modifier la note",
      description: "Modifiez votre note personnelle",
    },
    fields: {
      title: {
        label: "Titre",
        placeholder: "Titre de la note (optionnel)",
      },
      content: {
        label: "Contenu",
        placeholder: "Écrivez votre note ici...",
        required: "Contenu *",
      },
      tags: {
        label: "Tags",
        placeholder: "Ajouter un tag",
        add: "Ajouter",
      },
    },
    deleteConfirm: {
      title: "Confirmer la suppression",
      description: "Êtes-vous sûr de vouloir supprimer la note",
      descriptionSuffix: "? Cette action est irréversible.",
      confirm: "Supprimer",
      cancel: "Annuler",
    },
    save: "Enregistrer",
    update: "Mettre à jour",
  },

  toast: {
    success: {
      applicationAdded: "Candidature ajoutée avec succès !",
      applicationUpdated: "Candidature mise à jour avec succès !",
      applicationDeleted: "Candidature supprimée avec succès !",
      statusUpdated: "Statut mis à jour !",
      taskAdded: "Tâche ajoutée avec succès !",
      taskUpdated: "Tâche mise à jour avec succès !",
      taskDeleted: "Tâche supprimée avec succès !",
      noteAdded: "Note ajoutée avec succès !",
      noteUpdated: "Note mise à jour avec succès !",
      noteDeleted: "Note supprimée avec succès !",
      settingsSaved: "Paramètres enregistrés avec succès !",
      dataImported: "Données importées avec succès !",
      dataExported: "Données exportées avec succès !",
      sampleDataLoaded: "Données d'exemple chargées avec succès !",
      dataCleared: "Toutes les données ont été supprimées !",
      appReset: "Application réinitialisée avec succès !",
    },
    error: {
      generic: "Une erreur est survenue",
      initialization: "Erreur lors de l'initialisation de l'application",
      saveApplication: "Erreur lors de l'enregistrement de la candidature",
      deleteApplication: "Erreur lors de la suppression de la candidature",
      updateStatus: "Erreur lors de la mise à jour du statut",
      saveTask: "Erreur lors de l'enregistrement de la tâche",
      deleteTask: "Erreur lors de la suppression de la tâche",
      saveNote: "Erreur lors de l'enregistrement de la note",
      deleteNote: "Erreur lors de la suppression de la note",
      saveSettings: "Erreur lors de l'enregistrement des paramètres",
      importData: "Erreur lors de l'import des données",
      exportData: "Erreur lors de l'export des données",
      clearData: "Erreur lors de la suppression des données",
      invalidImportFormat:
        "Format de fichier invalide. Veuillez importer un fichier JSON valide.",
      resetApp: "Erreur lors de la réinitialisation",
    },
  },
};

export type Translation = typeof fr;
