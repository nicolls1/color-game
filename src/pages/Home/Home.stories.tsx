import { ComponentMeta } from '@storybook/react'
import Home from 'pages/Home/Home'

export default {
  title: 'Page/Home',
  component: Home,
} as ComponentMeta<typeof Home>

export const Default = () => <Home currentPage="http://my-site.com/" />
