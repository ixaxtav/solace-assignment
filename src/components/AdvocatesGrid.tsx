import AdvocateCard from "./AdvocateCard";
import { Advocate } from "../types";

interface AdvocatesGridProps {
  advocates: Advocate[];
  isLoading: boolean;
}

const AdvocatesGrid = ({ advocates, isLoading }: AdvocatesGridProps) => {
  if (isLoading) {
    return "Loading...";
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {advocates.map((advocate) => (
        <div key={advocate.id}>
          {advocate.firstName} {advocate.lastName}
        </div>
      ))}
    </ul>
  );
};
