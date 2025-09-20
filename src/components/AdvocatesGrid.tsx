import { AdvocateCard, SkeletonCard } from "./";
import { Advocate } from "../types";

interface AdvocatesGridProps {
  advocates: Advocate[];
  isLoading: boolean;
}

export const AdvocatesGrid = ({ advocates, isLoading }: AdvocatesGridProps) => {
  if (isLoading) {
    return (
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {advocates.map((advocate) => (
        <AdvocateCard key={advocate.id} advocate={advocate} />
      ))}
    </ul>
  );
};
