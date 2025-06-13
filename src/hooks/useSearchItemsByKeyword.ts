import { useInfiniteQuery } from "@tanstack/react-query"
import { SearchRequestparams } from "../models/search"
import { searchItemsByKeyword } from "../apis/searchApi"
import useClientCredentialToken from "./useClientCredentialToken";

const useSearchItemsByKeyword = (params:SearchRequestparams) => {
    const clientCredentialToken = useClientCredentialToken();

    return useInfiniteQuery({
        queryKey: ["search", params],
        queryFn: ({pageParam = 0}) => {
            if (!clientCredentialToken){
                throw new Error ("No token available")
            }
            return searchItemsByKeyword(clientCredentialToken, params)
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {

        }
        
    })
}