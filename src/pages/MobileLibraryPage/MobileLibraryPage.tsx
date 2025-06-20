import { Box } from '@mui/material'
import React from 'react'
import LibraryHead from '../../layout/components/LibraryHead'
import Library from '../../layout/components/Library'

const MobileLibraryPage: React.FC = () => {
  return (
    <Box sx ={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: { xs: 1, sm: 2}
    }}>
        <LibraryHead />
        <Box sx ={{ flexGrow: 1, overflow: 'hidden'}}>
            <Library />
        </Box>
        
    </Box>
  )
}

export default MobileLibraryPage
