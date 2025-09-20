import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // Filter data based on search term
  let filteredData = advocateData;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredData = advocateData.filter((advocate) =>
      `${advocate.firstName} ${advocate.lastName}`.toLowerCase().includes(searchLower) ||
      advocate.city.toLowerCase().includes(searchLower) ||
      advocate.degree.toLowerCase().includes(searchLower) ||
      advocate.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchLower)
      )
    );
  }

  // Calculate pagination
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return Response.json({
    data: paginatedData,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });
}
