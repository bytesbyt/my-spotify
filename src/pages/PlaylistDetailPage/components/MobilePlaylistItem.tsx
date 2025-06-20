import React from 'react'
import { PlaylistTrack } from '../../../models/playlist';
import { Box, Typography, styled } from '@mui/material';
import { Episode, Track } from '../../../models/commonType';

interface MobilePlaylistItemProps{
    item: PlaylistTrack;
}

const MobileItemContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    borderRadius: '8px',
    marginBottom: theme.spacing(1),
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
}));

const AlbumImage = styled('img')({
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    marginRight: '12px',
    objectFit: 'cover',
});

const TrackInfo = styled(Box)({
    flex: 1,
    minWidth: 0,
});

const TrackName = styled(Typography)(({ theme }) => ({
    color: '#ffffff',
    fontWeight: 500,
    fontSize: '14px',               
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '2px',
}));

const ArtistName = styled(Typography)({
    color: '#b3b3b3',
    fontSize: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

const MobilePlaylistItem = ({item}: MobilePlaylistItemProps ) => {
    const isEpisode = (track: Track | Episode ): track is Episode => {
        return "description" in track;
    };

    const getAlbumImage = () => {
        if (isEpisode(item.track)) {
            return item.track.images?.[0]?.url;
        }
        return item.track.album?.images?.[0]?.url;
    };

    const getArtistName = () => {
        if (isEpisode(item.track)) {
            return item.track.show?.name || 'Unknown Show';
        }
        return item.track.artists?.[0]?.name || 'Unknown Artist';
    };

    return (
        <MobileItemContainer>
            <AlbumImage 
                src={getAlbumImage() || '../../../images/fullscreen-bg.jpg'} 
                alt="Album cover"
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                }}
            />
            <TrackInfo>
                <TrackName>
                    {item.track.name || 'Unknown Track'}
                </TrackName>
                <ArtistName>
                    {getArtistName()}
                </ArtistName>
            </TrackInfo>
        </MobileItemContainer>
    )
}

export default MobilePlaylistItem;
