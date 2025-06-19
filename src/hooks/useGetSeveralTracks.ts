import { useQuery } from "@tanstack/react-query";

import useClientCredentialToken from "./useClientCredentialToken";
import { getSeveralTracks } from "../apis/albumApi";

const useGetSeveralTracks = (trackIds: string, market?: string) => {
    const clientCredentialToken = useClientCredentialToken();
    
    return useQuery({
        queryKey: ["several-tracks", trackIds, market],
        queryFn: async () => {
            if (!clientCredentialToken){
                throw new Error ("No token available");
            }
            const params = {
                ids: trackIds,
                ...(market && { market })
            };
            return getSeveralTracks(params, clientCredentialToken);
        },
        enabled: !!trackIds && !!clientCredentialToken,
    });   
};

export default useGetSeveralTracks;