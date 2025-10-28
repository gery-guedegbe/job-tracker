import { useState } from "react";
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

interface ImportExportPageProps {
  onDataImported: () => void;
}

function ImportExportPage({ onDataImported }: ImportExportPageProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const { t } = useTranslation();

  const handleExportJSON = async () => {
    try {
      setIsExporting(true);
      const data = await db.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `jobtrackr-export-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(t.toast.success.dataExported);
    } catch (error) {
      toast.error(t.toast.error.exportData);
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      const data = await db.exportData();

      // Convert applications to CSV
      const headers = [
        t.importExport.csvHeaders.jobTitle,
        t.importExport.csvHeaders.company,
        t.importExport.csvHeaders.status,
        t.importExport.csvHeaders.date,
        t.importExport.csvHeaders.notes,
        t.importExport.csvHeaders.tags,
      ];
      const rows = data.applications.map((app) => [
        app.jobTitle,
        app.company,
        app.status,
        app.applicationDate,
        app.notes.replace(/\n/g, " "),
        app.tags.join("; "),
      ]);

      const csv = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `jobtrackr-export-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(t.toast.success.dataExported);
    } catch (error) {
      toast.error(t.toast.error.exportData);
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportJSON = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsImporting(true);
      const text = await file.text();
      const data = JSON.parse(text);

      await db.importData(data);
      onDataImported();
      toast.success(t.toast.success.dataImported);
    } catch (error) {
      toast.error(t.toast.error.importData);
      console.error(error);
    } finally {
      setIsImporting(false);
      // Reset input
      event.target.value = "";
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h2 className="mb-2 text-2xl font-semibold">{t.importExport.title}</h2>
        <p className="text-muted-foreground">{t.importExport.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Export Section */}
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
            <Button
              onClick={handleExportJSON}
              disabled={isExporting}
              className="w-full gap-2"
              variant="outline"
            >
              <FileJson className="h-4 w-4" />
              {t.importExport.export.json.button}
            </Button>

            <Button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="w-full gap-2"
              variant="outline"
            >
              <FileSpreadsheet className="h-4 w-4" />
              {t.importExport.export.csv.button}
            </Button>

            <p className="text-muted-foreground mt-4 text-xs">
              {t.importExport.export.info}
            </p>
          </CardContent>
        </Card>

        {/* Import Section */}
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
            <label htmlFor="import-file">
              <Button
                disabled={isImporting}
                className="w-full gap-2"
                variant="outline"
              >
                <span>
                  <Upload className="h-4 w-4" />
                  {t.importExport.import.button}
                </span>
              </Button>

              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
              <p className="text-xs text-amber-800 dark:text-amber-200">
                {t.importExport.import.warning}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
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
