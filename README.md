# Tyler Style Portfolio

A personal portfolio website with a clean, academic design inspired by Tyler Hou's website.

## Features

- **Clean Academic Design**: Minimalist layout with focus on content
- **Solarized Light Theme**: Easy on the eyes with professional color scheme
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Typography**: Beautiful serif fonts (Garamond) for elegant reading experience
- **Sections Include**:
  - About/Bio
  - Research Publications
  - Blog Posts
  - Education History
  - Work Experience

## Tech Stack

- Pure HTML5
- CSS3 with CSS Grid and Flexbox
- Google Fonts (EB Garamond, Inconsolata)
- Font Awesome Icons
- No JavaScript required for core functionality

## Getting Started

### Prerequisites

- A modern web browser
- (Optional) Node.js for development server

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd tyler-style-portfolio
```

2. Open directly in browser:
```bash
open index.html
```

Or use a local server:

```bash
# Using Python
python3 -m http.server 8000

# Or using Node.js
npx serve .
```

3. Visit `http://localhost:8000` in your browser

## Customization

### Adding Your Content

1. **Profile Image**: Replace the placeholder in `assets/profile.jpg`
2. **Personal Info**: Update name, email, and social links in `index.html`
3. **About Section**: Modify the biography paragraphs
4. **Research/Publications**: Add your papers and publications
5. **Blog Posts**: Link to your blog articles
6. **Education & Work**: Update with your experience

### Styling

The site uses CSS variables for the Solarized Light color scheme. You can customize colors in `css/style.css`:

```css
:root {
    --base03: #002b36;
    --base02: #073642;
    --base01: #586e75;
    --base00: #657b83;
    --base0: #839496;
    --base1: #93a1a1;
    --base2: #eee8d5;
    --base3: #fdf6e3;
    --yellow: #b58900;
    --orange: #cb4b16;
    --red: #dc322f;
    --magenta: #d33682;
    --violet: #6c71c4;
    --blue: #268bd2;
    --cyan: #2aa198;
    --green: #859900;
}
```

## Deployment

This is a static site that can be deployed anywhere:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repo
- **Any Static Host**: Upload the files

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this template for your own portfolio!

## Acknowledgments

- Design inspired by Tyler Hou's personal website
- Typography: EB Garamond and Inconsolata fonts
- Color scheme: Solarized Light by Ethan Schoonover
- Icons: Font Awesome
