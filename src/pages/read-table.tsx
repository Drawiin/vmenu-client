import dynamic from 'next/dynamic'

import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
  loading: () => {
    const Loading = <CircularProgress />
    return Loading
  }
})

const ReadTable: React.FC = () => {
  const onScan = (result?: string) => {
    result && console.log(result)
  }

  return (
    <Box>
      <QrReader
        onScan={onScan}
        onError={e => console.log(e)}
        facingMode="environment"
      />
    </Box>
  )
}

export default ReadTable
