import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/learningPaths";

export function usePaths() {
  return useQuery({
    queryKey: ["paths"],
    queryFn: api.listPaths,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}

export function useCreatePath() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createPath,
    onSuccess: (created) => {
      qc.setQueryData(["paths"], (old) => {
        if (!old) return [created];
        if (Array.isArray(old)) return [created, ...old];
        if (old.items) return { ...old, items: [created, ...old.items] };
        return old;
      });
    },
  });
}

export function useDeletePath() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deletePath,
    onSuccess: (_, id) => {
      qc.setQueryData(["paths"], (old) => {
        if (Array.isArray(old)) return old.filter((p) => p.id !== id);
        if (old?.items)
          return { ...old, items: old.items.filter((p) => p.id !== id) };
        return old;
      });
    },
  });
}
