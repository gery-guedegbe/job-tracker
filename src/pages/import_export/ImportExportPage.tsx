/**
 * PAGE IMPORT/EXPORT - JobTrackr Application
 *
 * Cette page permet aux utilisateurs d'exporter et d'importer leurs données
 * au format JSON ou CSV. Elle inclut des fonctionnalités de sauvegarde,
 * de restauration et de transfert de données.
 *
 * Fonctionnalités principales :
 * - Export des données en JSON (complet) et CSV (applications seulement)
 * - Import de données depuis un fichier JSON
 * - Validation des données importées
 * - Gestion des erreurs et feedback utilisateur
 *
 * @component
 * @version 1.0
 */

import { useState, useRef } from "react";
import { Download, Upload, FileJson, FileSpreadsheet } from "lucide-react";
import { useTranslation } from "../../lib/i18n";
import { db } from "../../lib/db";
import toast from "react-hot-toast";
import { Card } from "../../components/ui/Card";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/CardExtended";
import { Button } from "../../components/ui/button";

/**
 * Props du composant ImportExportPage
 *
 * @interface ImportExportPageProps
 * @property {() => void} onDataImported - Callback appelé après un import réussi
 *                                 pour rafraîchir les données dans l'application
 */
interface ImportExportPageProps {
  onDataImported: () => void;
}

/**
 * Composant principal pour la gestion de l'import et l'export des données
 *
 * Ce composant fournit une interface utilisateur pour :
 * - Exporter les données en JSON (complet) ou CSV (applications)
 * - Importer des données depuis un fichier JSON
 * - Valider l'intégrité des données importées
 * - Donner des conseils sur la gestion des données
 *
 * @param {ImportExportPageProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant rendu
 *
 * @example
 * <ImportExportPage onDataImported={refreshApplications} />
 */
function ImportExportPage({ onDataImported }: ImportExportPageProps) {
  // ===========================================================================
  // ÉTATS ET RÉFÉRENCES
  // ===========================================================================

  /**
   * État pour gérer l'affichage pendant l'export
   * @state {boolean}
   */
  const [isExporting, setIsExporting] = useState(false);

  /**
   * État pour gérer l'affichage pendant l'import
   * @state {boolean}
   */
  const [isImporting, setIsImporting] = useState(false);

  /**
   * Référence vers l'input fichier caché pour l'import
   * @ref {React.RefObject<HTMLInputElement>}
   */
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Hook de traduction pour l'internationalisation
   * @hook
   */
  const { t } = useTranslation();

  // ===========================================================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - EXPORT
  // ===========================================================================

  /**
   * Exporte toutes les données de l'application au format JSON
   *
   * Processus :
   * 1. Récupère toutes les données depuis la base
   * 2. Crée un blob JSON avec indentation
   * 3. Génère un lien de téléchargement
   * 4. Déclenche le téléchargement automatique
   *
   * @async
   * @returns {Promise<void>}
   *
   * @example
   * await handleExportJSON();
   * // Télécharge un fichier jobtrackr-export-2024-01-01.json
   */
  const handleExportJSON = async (): Promise<void> => {
    try {
      setIsExporting(true);
      console.log("Début de l'export JSON...");

      // Récupération de toutes les données
      const data = await db.exportData();

      // Création du blob JSON avec indentation pour la lisibilité
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });

      // Création d'une URL temporaire pour le téléchargement
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Nom du fichier avec date actuelle
      a.download = `jobtrackr-export-${new Date().toISOString().split("T")[0]}.json`;
      a.click();

      // Nettoyage de l'URL temporaire
      URL.revokeObjectURL(url);

      console.log("Export JSON terminé avec succès");
      toast.success(t.toast.success.dataExported);
    } catch (error) {
      console.error("Erreur lors de l'export JSON:", error);
      toast.error(t.toast.error.exportData);
    } finally {
      setIsExporting(false);
    }
  };

  /**
   * Exporte les applications au format CSV
   *
   * Convertit les données des applications en format CSV avec :
   * - En-têtes traduites
   * - Données nettoyées (sauts de ligne remplacés)
   * - Tags convertis en chaîne séparée par des points-virgules
   *
   * @async
   * @returns {Promise<void>}
   */
  const handleExportCSV = async (): Promise<void> => {
    try {
      setIsExporting(true);
      console.log("Début de l'export CSV...");

      const data = await db.exportData();

      // En-têtes du CSV traduites
      const headers = [
        t.importExport.csvHeaders.jobTitle,
        t.importExport.csvHeaders.company,
        t.importExport.csvHeaders.status,
        t.importExport.csvHeaders.date,
        t.importExport.csvHeaders.notes,
        t.importExport.csvHeaders.tags,
      ];

      // Conversion des applications en lignes CSV
      const rows = data.applications.map((app) => [
        app.jobTitle,
        app.company,
        app.status,
        app.applicationDate,
        // Nettoyage des notes : remplacement des sauts de ligne
        app.notes.replace(/\n/g, " "),
        // Conversion des tags en chaîne séparée par des points-virgules
        app.tags.join("; "),
      ]);

      // Construction du contenu CSV
      const csv = [
        headers.join(","), // Ligne d'en-tête
        ...rows.map((row) =>
          // Chaque cellule est entourée de guillemets pour échapper les virgules
          row.map((cell) => `"${cell}"`).join(","),
        ),
      ].join("\n");

      // Création et téléchargement du fichier CSV
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `jobtrackr-export-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();

      URL.revokeObjectURL(url);

      console.log(
        `Export CSV terminé : ${data.applications.length} applications exportées`,
      );
      toast.success(t.toast.success.dataExported);
    } catch (error) {
      console.error("Erreur lors de l'export CSV:", error);
      toast.error(t.toast.error.exportData);
    } finally {
      setIsExporting(false);
    }
  };

  // ===========================================================================
  // GESTIONNAIRES D'ÉVÉNEMENTS - IMPORT
  // ===========================================================================

  /**
   * Valide la structure des données importées
   *
   * Vérifie que :
   * - Les données sont un objet valide
   * - Au moins un tableau (applications, tasks ou notes) est présent
   * - Les tableaux sont bien des tableaux
   *
   * @param {any} data - Données à valider
   * @returns {boolean} True si les données sont valides
   *
   * @private
   */
  const isValidImportData = (data: any): boolean => {
    // Vérification de base
    if (!data || typeof data !== "object") {
      console.warn("Données d'import invalides : pas un objet");
      return false;
    }

    // Vérification qu'au moins un tableau valide est présent
    const hasValidData =
      (data.applications && Array.isArray(data.applications)) ||
      (data.tasks && Array.isArray(data.tasks)) ||
      (data.notes && Array.isArray(data.notes));

    if (!hasValidData) {
      console.warn("Données d'import invalides : aucun tableau valide trouvé");
      return false;
    }

    console.log("Données d'import validées avec succès");
    return true;
  };

  /**
   * Gère l'import de données depuis un fichier JSON
   *
   * Processus :
   * 1. Lecture du fichier
   * 2. Parsing et validation JSON
   * 3. Validation de la structure des données
   * 4. Import dans la base de données
   * 5. Rafraîchissement de l'application
   *
   * @async
   * @param {React.ChangeEvent<HTMLInputElement>} event - Événement de changement de fichier
   * @returns {Promise<void>}
   */
  const handleImportJSON = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("Aucun fichier sélectionné");
      return;
    }

    try {
      setIsImporting(true);
      console.log("Début de l'import JSON...");

      // Lecture du contenu du fichier
      const text = await file.text();

      // Parsing JSON avec gestion d'erreur
      let data;
      try {
        data = JSON.parse(text);
        console.log("Fichier JSON parsé avec succès");
      } catch (parseError) {
        console.error("Erreur de parsing JSON:", parseError);
        toast.error(t.toast.error.invalidImportFormat);
        return;
      }

      // Validation de la structure des données
      if (!isValidImportData(data)) {
        toast.error(t.toast.error.invalidImportFormat);
        return;
      }

      // Import des données dans la base
      await db.importData(data);

      // Rafraîchissement des données dans l'application parente
      onDataImported();

      console.log("Import JSON terminé avec succès");
      toast.success(t.toast.success.dataImported);
    } catch (error) {
      console.error("Erreur lors de l'import JSON:", error);
      toast.error(t.toast.error.importData);
    } finally {
      setIsImporting(false);
      // Réinitialisation de l'input pour permettre le re-import du même fichier
      event.target.value = "";
    }
  };

  // ===========================================================================
  // RENDU DU COMPOSANT
  // ===========================================================================

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-4 lg:p-6">
      {/* En-tête de la page */}
      <div>
        <h2 className="mb-2 text-2xl font-semibold">{t.importExport.title}</h2>
        <p className="text-muted-foreground">{t.importExport.subtitle}</p>
      </div>

      {/* Section principale Export/Import */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* =====================================================================
            CARTE D'EXPORT
        ===================================================================== */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              {t.importExport.export.title}
            </CardTitle>

            <CardDescription>
              {t.importExport.export.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Bouton d'export JSON */}
            <Button
              onClick={handleExportJSON}
              disabled={isExporting}
              className="w-full gap-2"
              variant="outline"
            >
              <FileJson className="h-4 w-4" />
              {t.importExport.export.json.button}
            </Button>

            {/* Bouton d'export CSV */}
            <Button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="w-full gap-2"
              variant="outline"
            >
              <FileSpreadsheet className="h-4 w-4" />
              {t.importExport.export.csv.button}
            </Button>

            {/* Information supplémentaire */}
            <p className="text-muted-foreground mt-4 text-xs">
              {t.importExport.export.info}
            </p>
          </CardContent>
        </Card>

        {/* =====================================================================
            CARTE D'IMPORT
        ===================================================================== */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {t.importExport.import.title}
            </CardTitle>

            <CardDescription>
              {t.importExport.import.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Bouton d'import qui déclenche l'input fichier caché */}
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="w-full gap-2"
              variant="outline"
            >
              <Upload className="h-4 w-4" />
              {isImporting ? t.common.loading : t.importExport.import.button}
            </Button>

            {/* Input fichier caché pour l'import */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />

            {/* Avertissement important sur l'import */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
              <p className="text-xs text-amber-800 dark:text-amber-200">
                {t.importExport.import.warning}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* =======================================================================
          CARTE D'INFORMATIONS SUR LE STOCKAGE
      ======================================================================= */}
      <Card>
        <CardHeader>
          <CardTitle>{t.importExport.storage.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-muted-foreground text-sm">
            {t.importExport.storage.description}
          </p>

          <div className="space-y-2 text-sm">
            <p className="font-medium">{t.importExport.storage.tips}</p>

            <ul className="text-muted-foreground list-inside list-disc space-y-1">
              <li>{t.importExport.storage.tip1}</li>
              <li>{t.importExport.storage.tip2}</li>
              <li>{t.importExport.storage.tip3}</li>
              <li>{t.importExport.storage.tip4}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ImportExportPage;
