import React from 'react'
import { PlaylistTrack } from '../../../models/playlist';
import { TableCell, TableRow } from '@mui/material';
import { Episode, Track } from '../../../models/commonType';

interface DesktopPlaylistItemProps{
    index : number;
    item: PlaylistTrack;
}

const DesktopPlaylistItem = ({item, index}: DesktopPlaylistItemProps ) => {
    const isEpisode = (track: Track | Episode ): track is Episode => {
        return "description" in track;
    };

    return (
        <TableRow> 
            <TableCell> {index} </TableCell>
            <TableCell> {item.track.name || 'No Name'} </TableCell>
            <TableCell> {isEpisode(item.track) ? "N/A": item.track?.album?.name } </TableCell>
            <TableCell>
                {item.added_at
                    ? new Date(item.added_at).toISOString(). split('T')[0]
                    : 'Unknown'}
            </TableCell>
            <TableCell> 
                {item. track. duration_ms
                    ? new Date (item.track.duration_ms).toISOString().substr(14,5)
                    : 'Unknown'}
            </TableCell>
        </TableRow>
    )
}

export default DesktopPlaylistItem;
