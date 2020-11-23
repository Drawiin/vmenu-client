import QrReader from 'react-qr-reader'

import Box from '@material-ui/core/Box'

const ReadTable: React.FC = () => {
  const onScan = (result: string) => {
    console.log(result)
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
