import { Heading } from '@chakra-ui/layout'
import { ComponentMeta } from '@storybook/react'

export default {
  title: 'Design System/Heading',
  component: Heading,
} as ComponentMeta<typeof Heading>

export const xl = () => (
  <Heading size="xl">The quick brown fox jumps over the lazy dog.</Heading>
)

export const lg = () => (
  <Heading size="lg">The quick brown fox jumps over the lazy dog.</Heading>
)

export const md = () => (
  <Heading size="md">The quick brown fox jumps over the lazy dog.</Heading>
)

export const sm = () => (
  <Heading size="sm">The quick brown fox jumps over the lazy dog.</Heading>
)
