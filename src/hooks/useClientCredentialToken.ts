import { useQuery } from "@tanstack/react-query"
import { getClientCredentialToken } from "../apis/authApi"

const useClientCredentialToken = () => {
    useQuery({
        queryKey: ['client-credential-token'],
        queryFn: getClientCredentialToken


    })
}