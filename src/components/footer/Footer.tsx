import { useTranslation } from "../../lib/i18n";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card mt-12 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-muted-foreground text-sm">
            <strong>{t.navbar.appName}</strong> {t.footer.version}
          </div>

          <div className="text-muted-foreground text-sm">
            {t.footer.storageInfo}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
