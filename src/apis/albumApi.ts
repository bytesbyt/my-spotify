import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { getNewReleasesResponse, getSeveralTracksRequest, getSeveralTracksResponse } from "../models/albums";

export const getNewReleases = async (clientCredentialToken:string):Promise<getNewReleasesResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`,
        {
            headers: {
                Authorization: `Bearer ${clientCredentialToken}`,
            },
        }

        );
        return response.data;
    } catch (error) {
        throw new Error("fail to fetch new release");
    }
};

export default getNewReleases;

export const getSeveralTracks = async (params: getSeveralTracksRequest, clientCredentialToken: string): Promise<getSeveralTracksResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/tracks`, {
            headers: {
                Authorization: `Bearer ${clientCredentialToken}`,
            },
            params,
        });
        console.log("several tracks", response.data);
        return response.data;
    } catch (error) {
        throw new Error("fail to fetch several tracks");
    }
};