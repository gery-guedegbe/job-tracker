import type { Application } from "../../types/index";

interface ListViewProps {
  data: Application[];
}

const ListView = ({ data }: ListViewProps) => {
  return <div>ListView</div>;
};

export default ListView;
