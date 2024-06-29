import styled from '@emotion/styled'

const StyledButton = styled.input`
  display: inline-block;
  padding: 0px 24px;
  height: 36px;
  border: none;
  border-radius: 4px;
  background: #5f80a3;
  color: white;
  cursor: pointer;
  transition: background 0.25s ease-in-out;
  :disabled {
    background: #ccc;
    cursor: default;
    :hover {
      background: #ccc;
    }
  }
  :hover {
    background: #456485;
  }
  :focus {
    border-color: var(--blueTeal);
  }
`

const Button = ({ onClick, type = 'submit', value, disabled }) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      type={type}
      value={value}
    />
  )
}

export default Button
