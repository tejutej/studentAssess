import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useState } from 'react'
import Layout from './Layout'
import StudentList from './StudentList'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ padding: '16px 0 0' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const Dashboard = () => {
  const [value, setValue] = useState(
    sessionStorage.getItem('tabvalue')
      ? parseInt(sessionStorage.getItem('tabvalue'))
      : 1
  )

  const a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (event, newValue) => {
    sessionStorage.setItem('tabvalue', newValue)
    setValue(newValue)
  }

  return (
    <Layout>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab
            className='tab-title'
            label='Students'
            {...a11yProps(0)}
          />
          <Tab className='tab-title' label='List' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      {value === 0 && <StudentList />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {value === 1 && <StudentList />}
      </CustomTabPanel>
    </Layout>
  )
}

export default Dashboard
