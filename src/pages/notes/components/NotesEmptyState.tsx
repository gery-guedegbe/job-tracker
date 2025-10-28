import { StickyNote, Plus } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/button";
import { CardContent } from "../../../components/ui/CardExtended";

export function NotesEmptyState({
  isCompletelyEmpty,
  title,
  description,
  addLabel,
  onAdd,
}: {
  isCompletelyEmpty: boolean;
  title: string;
  description: string;
  addLabel: string;
  onAdd: () => void;
}) {
  return (
    <Card>
      <CardContent className="py-12 text-center">
        <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <StickyNote className="text-primary h-8 w-8" />
        </div>

        <h3 className="mb-2 text-lg font-semibold">{title}</h3>

        <p className="text-muted-foreground mb-4">{description}</p>

        {isCompletelyEmpty && (
          <Button onClick={onAdd} className="h-11 gap-2">
            <Plus className="h-4 w-4" />
            {addLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
