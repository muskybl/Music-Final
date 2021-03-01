import React, { useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import AppContext from '../../context/app-context'
import { useHistory } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
const filter = createFilterOptions()
const Search = () => {
    const { homePage: { suggestSearch = [] } } = useContext(AppContext)
    const [value, setValue] = React.useState({
        content: '',
        id: '',
        category: ''
    });
    const history = useHistory()

    React.useEffect(() => {
        (value !== null && value.content !== '') && history.push(`/search/${value.content}`)
    }, [value])
    return (
        <Autocomplete
            popper={{ backgroundColor: 'red' }}
            size='small'
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        content: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        content: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        content: `Search "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={suggestSearch}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.content;
            }}
            renderOption={(option) => option.content}
            style={{ width: 285 }}
            freeSolo
            renderInput={(params) => (
                <Tooltip title='How do you feel today ?' placement='top' arrow>
                    <TextField
                        {...params}
                        label="Search everything" color="secondary" />
                </Tooltip>
            )}
        />
    )
}
export default React.memo(Search)