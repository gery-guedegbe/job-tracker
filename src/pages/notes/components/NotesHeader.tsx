import { Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";

export function NotesHeader({
  title,
  subtitle,
  onAdd,
}: {
  title: string;
  subtitle: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <Button onClick={onAdd} className="h-11 gap-2">
        <Plus className="h-4 w-4" />
        {title}
      </Button>
    </div>
  );
}
