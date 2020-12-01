import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/CloseOutlined'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      caretColor: theme.palette.primary.main,
      fontSize: 20
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
)

const SearchBar: React.FC<{
  onTextChange: (text: string) => void
  onSubmit: (text: string) => void
}> = ({ onSubmit, onTextChange }) => {
  const classes = useStyles()
  const [value, setValue] = useState('')

  const clearInput = () => {
    setValue('')
  }

  const onSubmitClicked = () => {
    onSubmit(value)
    clearInput()
  }

  const onValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(event.target.value)
    onTextChange(event.target.value)
  }

  return (
    <Paper className={classes.root} elevation={0}>
      <IconButton
        className={classes.iconButton}
        aria-label="menu"
        color="primary"
        onClick={clearInput}
      >
        <CancelIcon />
      </IconButton>
      <InputBase
        value={value}
        className={classes.input}
        placeholder="Buscar pratos"
        onChange={onValueChange}
        inputProps={{ 'aria-label': 'Buscar pratos' }}
      />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="search"
        onClick={onSubmitClicked}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
