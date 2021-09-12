import { Input } from '@chakra-ui/input'
import { ComponentMeta } from '@storybook/react'

export default {
  title: 'Design System/Input',
  component: Input,
} as ComponentMeta<typeof Input>

export const Default = () => <Input />

export const Disabled = () => <Input isDisabled value="disabled value" />

export const ReadOnly = () => <Input isReadOnly value="read only value" />
