import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Edit, Trash2 } from "lucide-react";
import { CardContent, CardHeader } from "../../../components/ui/CardExtended";

export function NoteCard({ note, locale, onEdit, onDelete }: any) {
  return (
    <Card className="group transition-shadow hover:shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-semibold">
            {note.title || "Sans titre"}
          </h3>

          <div className="flex gap-1 opacity-100 transition-opacity group-hover:opacity-100 lg:opacity-0">
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="text-destructive hover:text-destructive h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-muted-foreground line-clamp-4 text-sm">
          {note.content}
        </p>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag: string, i: number) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-muted-foreground text-xs lg:text-sm">
          {new Date(note.updatedAt).toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  );
}
