# Random Fact Generator - Design Notes

## Overview
This document outlines the visual design decisions for the Random Fact Generator application.

## Design Philosophy
The design aims to create an engaging, modern experience that makes learning random facts feel exciting and fun. The aesthetic draws from dark mode UI trends with vibrant accent colors to create visual interest without overwhelming the user.

## Color Palette

### Primary Colors
- **Background Dark** (`#0f0f1a`): Deep navy-black for the main background, creating a modern dark theme base
- **Background Secondary** (`#1a1a2e`): Slightly lighter navy for depth layers
- **Card Background** (`#16213e`): Distinct card surface color

### Accent Colors
- **Primary Accent** (`#e94560`): Vibrant coral-red for main actions and highlights
- **Secondary Accent** (`#f9ed69`): Warm yellow for variety and contrast
- **Tertiary Accent** (`#08d9d6`): Electric cyan for success states and secondary highlights

### Text Colors
- **Primary Text** (`#ffffff`): High contrast white for main content
- **Secondary Text** (`#a0a0b0`): Muted gray for subtitles and labels
- **Muted Text** (`#6c6c7c`): Very muted for empty states

## Typography
- **Font Family**: Segoe UI / Inter / system fonts for broad compatibility
- **Title**: Large, bold (2-3rem) with gradient text effect
- **Body/Facts**: 1.1-1.4rem with comfortable line-height (1.7)
- **Buttons**: 1rem, semi-bold for clear readability

## Layout & Spacing
- **Single column layout**: Centered content for focused experience
- **Card-based design**: Fact displayed in a prominent card with depth
- **Generous spacing**: 16px base unit with larger gaps for breathing room
- **Responsive breakpoints**: Mobile-first with tablet (768px) and desktop overrides

## Components

### Header
- Gradient text title for visual impact
- Subtle subtitle in muted color
- Fade-in animation on load

### Fact Card
- Gradient background for depth
- Decorative quote mark watermark
- Colored top border accent (gradient)
- Minimum height for consistent layout
- States:
  - **Default**: Shows fact text
  - **Loading**: Spinner animation, hidden text
  - **Error**: Red-tinted border, error message

### Buttons
- **Primary (New Fact)**: Coral-red with glow shadow, gradient hover effect
- **Secondary (Copy)**: Transparent with border, subtle hover fill
- Icon button variant for copy action
- Hover: Slight lift with enhanced shadow
- Active: Pressed state
- Copied state: Cyan background for feedback

### Toast Notification
- Fixed bottom position
- Slides up with fade for copy confirmation
- Cyan color to match success state

### Footer
- Minimal, muted text
- Link to API source in accent color

## Visual Effects

### Background
- Layered radial gradients in corners for ambient atmosphere
- Subtle color tints (coral, cyan, yellow) at different positions

### Shadows
- Card shadow with colored tint (coral)
- Button shadow with glow effect
- Cyan glow for accent elements

### Animations
- **Page load sequence**: Staggered fade-in for header → card → buttons
- **Button hover**: Slide shimmer effect
- **Loading**: Smooth spinner
- **Transitions**: All interactive elements have smooth 0.3s transitions

## Responsive Behavior
- **Mobile (< 480px)**: 
  - Reduced padding
  - Full-width buttons stacked vertically
  - Smaller title size
- **Tablet/Desktop (≥ 768px)**:
  - Larger padding in card
  - Increased spacing

## Accessibility Considerations
- High contrast mode support
- Reduced motion support (`prefers-reduced-motion`)
- Clear focus states via button hover effects
- Semantic HTML structure
- Minimum touch targets (48px)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS custom properties for theming
- Standard flexbox and CSS animations
