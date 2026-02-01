# ARTISAN Studio - Luxury Custom Furniture & Granite Website

Premium custom furniture and granite sink studio website built with Next.js 16, featuring multilingual support, AI-powered kitchen visualization, and an admin dashboard.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Theming**: next-themes (Light/Dark/System)
- **Language**: TypeScript

## Color Palette

### Light Mode
- Background: `#FDFBF7` (Cream/Off-white)
- Foreground: `#111111` (Charcoal/Obsidian)
- Accent: `#B8A078` (Muted Gold)

### Dark Mode
- Background: `#111111` (Deep Obsidian)
- Foreground: `#FDFBF7` (Soft White)
- Accent: `#B8A078` (Champagne Gold)

## Project Structure

```
/app
  /admin          # Admin dashboard (price requests, project manager, pricing table)
    page.tsx
    loading.tsx
  layout.tsx      # Root layout with ThemeProvider
  page.tsx        # Main landing page
  globals.css     # Tailwind config + design tokens

/components
  navigation.tsx       # Glassmorphism navbar with language & theme switcher
  hero.tsx            # Hero section with luxury typography
  portfolio.tsx       # Masonry grid gallery with category filters
  about.tsx           # About section with statistics
  room-visualizer.tsx     # AI Room Visualizer for all products (needs Fal AI integration)
  calculator.tsx      # Interactive price calculator
  chat-widget.tsx     # AI chat widget (ready for n8n integration)
  footer.tsx          # Footer with contact info
  theme-toggle.tsx    # Light/Dark/System theme switcher
  theme-provider.tsx  # next-themes provider

/lib
  language-context.tsx  # Multilingual support (KA/EN/RU)
  utils.ts              # Utility functions (cn)
```

## Features

### 1. Multilingual Support
- Georgian (KA) - Default
- English (EN)
- Russian (RU)

All translations are in `/lib/language-context.tsx`.

### 2. Theme System
- Light Mode (Cream background)
- Dark Mode (Obsidian background)
- System preference detection
- Smooth 300ms transitions

### 3. Navigation
- Glassmorphism effect
- Scroll-aware background
- Mobile responsive with hamburger menu
- Language switcher
- Theme toggle

### 4. Portfolio Gallery
- Category filtering (Laminate Kitchens, Solid Wood, Granite Sinks, Bedrooms)
- Masonry-style grid
- Hover animations with gold accents
- Image zoom effects

### 5. Price Calculator
- Category selection
- Dimension inputs (width, height, depth)
- Material selection
- Add-ons (LED Lighting, Premium Handles, Soft-close)
- Live price calculation in Georgian Lari (GEL)
- Quote request form

### 6. AI Room Visualizer (UI Ready)
Universal furniture visualization tool supporting ALL products:

**Supported Products:**
- Laminate Kitchens (სამზარეულო)
- Bedrooms (საძინებელი)
- Solid Wood Furniture (მასიური ხის ავეჯი)
- Granite Sinks (გრანიტის ნიჟარა)

**Features:**
- Drag & drop image upload
- Product category selection
- Style selection (Modern, Classic, Minimalist, Rustic)
- Generate button with loading states
- Result preview panel
- Download generated image

**Note**: Requires Fal AI integration to function. Connect Fal AI and update the `handleGenerate` function in `/components/room-visualizer.tsx`.

### 7. AI Chat Widget (UI Ready)
- Floating chat button
- Chat interface
- Simulated responses

**Note**: Ready for n8n AI integration.

### 8. Admin Dashboard (`/admin`)
- **Price Requests Tab**: View and manage customer quote requests
- **Project Manager Tab**: Manage portfolio items, toggle featured status
- **Pricing Table Tab**: Edit rates per square meter and addon prices

## Required Integrations

### For Full Functionality:

1. **Fal AI** - For room visualization AI generation (all products)
   - Add `FAL_KEY` environment variable
   - Update `/components/room-visualizer.tsx` handleGenerate function
   - Supports: kitchens, bedrooms, solid wood furniture, granite sinks

2. **Database** (Supabase/Neon recommended) - For storing:
   - Price requests
   - Portfolio items
   - Pricing data

3. **n8n** (Optional) - For AI chat functionality

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Design Tokens (globals.css)

```css
:root {
  --background: #FDFBF7;
  --foreground: #111111;
  --accent: #B8A078;
  --gold: #B8A078;
  --obsidian: #111111;
  --offwhite: #FDFBF7;
}

.dark {
  --background: #111111;
  --foreground: #FDFBF7;
  --accent: #B8A078;
}
```

## Typography

- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)
- **Currency**: Georgian Lari (GEL)

## Notes for AI Assistants

1. **Theme-aware classes**: Use `bg-background`, `text-foreground`, `text-accent`, `bg-primary`, `text-primary-foreground` instead of hardcoded colors like `bg-obsidian` or `text-offwhite`.

2. **Translations**: All text strings should be added to `/lib/language-context.tsx` in all three languages (ka, en, ru).

3. **Currency**: All prices are in Georgian Lari. Display format: `{price} ₾`

4. **Animations**: Use Framer Motion for animations. Follow existing patterns.

5. **Components**: Split code into reusable components. Don't put everything in page.tsx.

## License

Private - ARTISAN Studio
