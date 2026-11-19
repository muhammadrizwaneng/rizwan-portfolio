"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

// next-themes 0.4.x renders an inline <script> to set the theme before paint.
// It runs from the server HTML; on the client React 19 warns about any
// executable <script> in the tree, so mark it inert there.
const scriptProps =
  typeof window === "undefined"
    ? undefined
    : ({ type: "application/json" } as const)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  )
}
