import { PathsDashboard } from '@/Components/App/Routing'
import { Box, Button, Title } from '@mantine/core'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const TestsPage: FC = () => {
  return (
    <Box>
        <Title order={1} pt={20} pb={20}>Каталог тестов</Title>
        <Link to={PathsDashboard.MBTI}>
            <Button>MBTI</Button>
        </Link>
    </Box>
  )
}

export default TestsPage