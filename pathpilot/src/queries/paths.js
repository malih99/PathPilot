import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/learningPaths";

export function usePaths() {
  return useQuery({
    queryKey: ["paths"],
    queryFn: api.listPaths,
  });
}

export function useCreatePath() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createPath,
    onSuccess: (created) => {
      qc.setQueryData(["paths"], (old = []) => [created, ...(old || [])]);
    },
  });
}
