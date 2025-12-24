import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../services/api";

export function useIngest() {
    const [text, setText] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: api.ingest,
        onSuccess: () => {
            setText("");
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["analytics"] });
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        mutation.mutate(text);
    };

    return {
        text,
        setText,
        submit,
        isLoading: mutation.isPending
    };
}
