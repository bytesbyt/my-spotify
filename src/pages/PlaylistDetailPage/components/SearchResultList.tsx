import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Track } from '../../../models/commonType';
import useAddItemToPlaylist from '../../../hooks/useAddItemToPlaylist';
import { useParams } from 'react-router';
import useGetCurrentUserProfile from '../../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../../utils/auth';
import { renderUnauthorizedError } from './RenderUnauthorizedError';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: '100%',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableCell-root': {
    borderBottom: 'none',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5),
    },
  },
}));

const AlbumImage = styled('img')({
  borderRadius: '4px',
  marginRight: '12px',
});

interface SearchResultListProps {
  list: Track[];
}

const SearchResultList = ({ list }: SearchResultListProps) => {
  const { id } = useParams<{ id: string }>();
  const { mutate: addItemToPlaylist } = useAddItemToPlaylist();
  const { data: user } = useGetCurrentUserProfile();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAddItemtoPlaylist = (uri: string) => {
    if (id && user) {
      addItemToPlaylist({ playlist_id: id, uris: [uri] });
    } else {
      getSpotifyAuthUrl();
    }
  };

  return (
    <StyledTableContainer>
      <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
        <TableBody>
          {list.map((track, index) => (
            <StyledTableRow key={`${track.id}-${index}`}>
              <TableCell sx={{ width: { xs: '60%', sm: '50%' } }}>
                <Box display="flex" alignItems="center">
                  <Box>
                    <AlbumImage 
                      src={track.album?.images[0].url} 
                      width={isMobile ? "32px" : "40px"} 
                      height={isMobile ? "32px" : "40px"}
                    />
                  </Box>
                  <Box sx={{ 
                    minWidth: 0,
                    '& > *': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }
                  }}>
                    <Typography 
                      fontWeight={700}
                      variant={isMobile ? "body2" : "body1"}
                    >
                      {track.name}
                    </Typography>
                    <Typography 
                      color="text.secondary"
                      variant={isMobile ? "caption" : "body2"}
                    >
                      {track.artists ? track.artists[0].name : 'Unknown Artist'}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell 
                sx={{ 
                  width: { xs: '40%', sm: '30%' },
                  display: { xs: 'none', sm: 'table-cell' }
                }}
              >
                <Typography 
                  variant={isMobile ? "caption" : "body2"}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {track.album?.name}
                </Typography>
              </TableCell>
              <TableCell 
                sx={{ 
                  width: { xs: '40%', sm: '20%' },
                  textAlign: 'right'
                }}
              >
                <Button
                  onClick={() => {
                    if (track.uri) {
                      handleAddItemtoPlaylist(track.uri);
                    }
                    return renderUnauthorizedError();
                  }}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    minWidth: { xs: '60px', sm: '80px' },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  Add
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default SearchResultList;
