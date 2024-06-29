import React from 'react'
import styled from '@emotion/styled'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { IconButton, Autocomplete, TextField } from '@mui/material'
import './ScmComponentStyles.css'
import { useController } from 'react-hook-form'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 16px;
`

const HelpText = styled(ReactTooltip)`
  position: absolute;
  font-size: 16px;
  min-width: 100px;
  background: #ccc;
  border-radius: 3px;
  padding: 12px;
  max-width: 200px;
  display: inline-block;
  text-align: left;
`

const FormControlAutoComplete = ({
  fields,
  control,
  selectoptions,
  ...rest
}) => {
  const { field: inputField, fieldState } = useController({
    name: fields.name,
    control,
    defaultValue: '',
    rules: { required: fields.required },
  })

  return (
    <Container>
      <label>
        <p>
          {fields.label}
          <IconButton style={{ position: 'relative' }}>
            <HelpOutlineIcon data-tooltip-id={fields.name} />
          </IconButton>
        </p>
        {fieldState?.error && <span className='error'>Required</span>}
      </label>
      <Autocomplete
        {...rest}
        {...inputField}
        sx={{
          '.MuiOutlinedInput-root': {
            padding: 0,
          },
          '.MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '.MuiAutocomplete-clearIndicator': {
            visibility: 'visible',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            marginRight: '-8px',
          },
        }}
        options={selectoptions}
        freeSolo
        onChange={(e, newValue) => inputField.onChange(newValue)}
        renderInput={params => (
          <TextField
            {...params}
            {...inputField}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
      <HelpText
        id={fields.name}
        place='bottom'
        variant='info'
        content={
          <span>
            {fields.help.text}
            {fields.help.link && fields.help.link !== '' && (
              <a href={fields.help.link} target='_blank'>
                Reference Link
              </a>
            )}
          </span>
        }
        openOnClick={true}
        style={{ pointerEvents: 'all', zIndex: '99' }}
      />
    </Container>
  )
}
export default FormControlAutoComplete
