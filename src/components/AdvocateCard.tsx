"use client";

import { useState } from "react";
import { Advocate } from "../types";
import { removeParentheses, formatPhoneNumber } from "../utils";

interface AdvocateCardProps {
  advocate: Advocate;
}

export const AdvocateCard = ({ advocate }: AdvocateCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedSpecialties = isExpanded
    ? advocate.specialties
    : advocate.specialties.slice(0, 5);

  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow flex flex-col h-full">
      <div className="flex-1 p-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <h3 className="text-sm font-medium text-gray-900">
              {advocate.firstName} {advocate.lastName}, {advocate.degree}
            </h3>
            <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {advocate.yearsOfExperience} years
            </span>
          </div>
          <p className="text-sm text-gray-500">City: {advocate.city}</p>
          <div className="mt-3 mb-4">
            <p className="text-sm text-gray-500 mb-2">Specialties:</p>
            <div className="flex flex-wrap gap-1">
              {displayedSpecialties.map((specialty, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600"
                  title={specialty}
                >
                  {removeParentheses(specialty)}
                </span>
              ))}
              {advocate.specialties.length > 5 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs cursor-pointer hover:underline"
                >
                  {isExpanded
                    ? "Show less"
                    : `+${advocate.specialties.length - 5} more`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`tel:${advocate.phoneNumber}`}
              className="inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <span>Call: {formatPhoneNumber(advocate.phoneNumber)}</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};
