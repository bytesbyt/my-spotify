import { useMutation } from "@tanstack/react-query"

const useCreatePlaylist = () => {
    return useMutation({
        mutationFn: () => {
            return createPlaylist()
        }
    })
    onSuccess: () => {
        
    }
}