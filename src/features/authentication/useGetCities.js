import React from "react";
import { useQuery } from "react-query";
import { getCitiesForCountry } from "../../services/apiAuth";

export default function useGetCities() {
  const { data, isLoading, error } = useQuery({
    queryKey: "getCitiesApi",
    queryFn: () => getCitiesForCountry("India"),
  });
  return { data, isLoading, error };
}
