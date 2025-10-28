import { Search } from "lucide-react";
import { Input } from "../../../components/ui/Input";

export function NotesSearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />

      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-11 pl-10"
      />
    </div>
  );
}
