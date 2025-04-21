import { END_POINT } from "@/constants/endpoint";
import { TApiError } from "@/types/api.types";
import { TContactSearch, TUserSearchResponse } from "@/types/user.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getContacts = async ({ searchQuery }: TContactSearch) => {
  const query =
    searchQuery.length > 0 ? `?searchText=${searchQuery}&page=1` : "";
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.SEARCH}${query}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      //   credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }
  return (await response.json()) as TUserSearchResponse;
};

const useContactQuery = ({
  searchQuery,
}: TContactSearch): UseQueryResult<TUserSearchResponse, TApiError> => {
  return useQuery({
    queryKey: ["contacts", searchQuery],
    queryFn: () => getContacts({ searchQuery }),
  });
};

export { useContactQuery };
