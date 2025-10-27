import type { Application } from "../../types/index";

interface TasksPageProps {
  data: Application[];
}

const TasksPage = ({ data }: TasksPageProps) => {
  return <div>TasksPage</div>;
};

export default TasksPage;
