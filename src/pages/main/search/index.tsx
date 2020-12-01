import useSearch from '@domain/utils/hooks/useSearch'
import Box from '@material-ui/core/Box'
import SearchBar from '@presentation/components/search/SearchBar'
import Preview from '@presentation/components/search/Preview'

const Orders: React.FC = () => {
  const [results, getResults] = useSearch()

  return (
    <Box
      width={1.0}
      height="100vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <SearchBar
        onTextChange={query => getResults(query)}
        onSubmit={query => getResults(query)}
      />
      <Preview sugestions={results} />
    </Box>
  )
}

export default Orders
