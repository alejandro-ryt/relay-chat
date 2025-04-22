import { END_POINT } from "@/constants/endpoint";
import { QUERY_KEY } from "@/constants/fetchQuery";
import { TApiError } from "@/types/api.types";
import { TAddContact, TUserSearchResponse } from "@/types/user.types";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

const getContacts = async (searchQuery: string) => {
  const query =
    searchQuery.length > 0 ? `?searchText=${searchQuery}&page=1` : "";
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.SEARCH}${query}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }
  return (await response.json()) as TUserSearchResponse;
};

const useContactQuery = (
  searchQuery: string
): UseQueryResult<TUserSearchResponse, TApiError> => {
  return useQuery({
    queryKey: [QUERY_KEY.CONTACTS, searchQuery],
    queryFn: () => getContacts(searchQuery),
  });
};

const addContact = async ({ contactId, userId }: TAddContact) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.ADD_CONTACT}/${userId}/${contactId}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }
  return response.ok;
};

const useAddContactMutation = (): UseMutationResult<
  boolean,
  TApiError,
  TAddContact
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH_DETAIL] });
    },
  });
};

const deleteContact = async ({ contactId, userId }: TAddContact) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.REMOVE_CONTACT}/${userId}/${contactId}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }
  return response.ok;
};

const useDeleteContactMutation = (): UseMutationResult<
  boolean,
  TApiError,
  TAddContact
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH_DETAIL] });
    },
  });
};

const blockContact = async ({ contactId, userId }: TAddContact) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${END_POINT.BLOCK_CONTACT}/${userId}/${contactId}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const errorData: TApiError = await response.json();
    throw errorData;
  }
  return response.ok;
};

const useBlockContactMutation = (): UseMutationResult<
  boolean,
  TApiError,
  TAddContact
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blockContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH_DETAIL] });
    },
  });
};

export {
  useContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useBlockContactMutation,
};
