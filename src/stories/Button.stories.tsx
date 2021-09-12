import { Button } from '@chakra-ui/button'
import { ComponentMeta } from '@storybook/react'

export default {
  title: 'Design System/Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const Default = () => <Button>Button</Button>

export const Disabled = () => <Button isDisabled>Button</Button>
