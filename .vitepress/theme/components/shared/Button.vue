<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[var(--vp-c-brand-1)] hover:bg-[var(--vp-c-brand-2)] rounded-full ![text-decoration:none]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 ![text-decoration:none]',
        outline:
          'border border-[var(--vp-c-brand-1)] ![text-decoration:none]',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 [text-decoration:none]',
        ghost: 'fill-[var(--vp-c-ghost)] hover:!text-[var(--vp-c-brand-1)] !text-[var(--vp-c-ghost)] hover:fill-[var(--vp-c-brand-1)] ![text-decoration:none]',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-[40px] px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <component :is="as" class="w-max flex justify-center items-center gap-1" :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')">
    <slot />
  </component>
</template>
