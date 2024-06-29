import styled from '@emotion/styled'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { IconButton } from '@mui/material'
import { useController } from 'react-hook-form'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 8px;
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

const FormControlComponent = ({ fields, control, ...rest }) => {
  const { field: inputField, fieldState } = useController({
    name: fields.name,
    control,
    defaultValue: '',
    rules: {
      required: fields.required,
      maxLength: fields.maxLength,
      minLength: fields.minLength,
    },
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
        {fieldState?.error && inputField.value == '' && (
          <span className='error'>Required</span>
        )}
        {fieldState?.error &&
          fields.name == 'name' &&
          inputField.value.length > fields.maxLength.value && (
            <span className='error'>{fields.maxLength.message}</span>
          )}
        {fieldState?.error &&
          fields.name == 'name' &&
          inputField.value.length < fields.minLength.value && (
            <span className='error'>{fields.minLength.message}</span>
          )}
      </label>

      <input
        {...inputField}
        placeholder={fields.disabled ? '' : `Enter ${fields.label}`}
        {...rest}
        disabled={fields.disabled ? true : false}
      />
      <HelpText
        id={fields.name}
        place='bottom'
        variant='info'
        content={
          <span>
            {fields.help.text}{' '}
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

export default FormControlComponent
