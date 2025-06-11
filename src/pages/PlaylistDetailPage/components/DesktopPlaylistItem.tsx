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

    const cellStyle = { borderBottom: "none" };

    return (
        <TableRow> 
            <TableCell sx={cellStyle}> {index} </TableCell>
            <TableCell sx={cellStyle}> {item.track.name || 'No Name'} </TableCell>
            <TableCell sx={cellStyle}> {isEpisode(item.track) ? "N/A": item.track?.album?.name } </TableCell>
            <TableCell sx={cellStyle}>
                {item.added_at
                    ? new Date(item.added_at).toISOString(). split('T')[0]
                    : 'Unknown'}
            </TableCell>
            <TableCell sx={cellStyle}> 
                {item. track. duration_ms
                    ? new Date (item.track.duration_ms).toISOString().substr(14,5)
                    : 'Unknown'}
            </TableCell>
        </TableRow>
    )
}

export default DesktopPlaylistItem;
