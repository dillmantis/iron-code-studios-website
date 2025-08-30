# WYSIWYG Testing Instructions

## ✅ Setup Complete!

Your VS Code is now configured for WYSIWYG editing with the following features:

### Installed Extensions:
- ✅ **Live Server** - Real-time preview
- ✅ **HTML CSS Support** - Enhanced editing
- ✅ **Auto Rename Tag** - Smart tag editing
- ✅ **Prettier** - Code formatting
- ✅ **CSS Peek** - Hover for CSS rules
- ✅ **Highlight Matching Tag** - Visual tag matching

### Live Server Running:
🌐 **Your site is live at:** http://localhost:8001

## 🧪 Test the WYSIWYG Features

### 1. Test Live Preview:
1. Open `index.html` in VS Code
2. Scroll down to the "WYSIWYG Test Zone" section (around line 540)
3. Try changing:
   - The title text "WYSIWYG Test Zone"
   - The gradient colors `#667eea` to `#ff6b6b` 
   - Add new content like `<strong>Bold text here</strong>`
4. Save the file (Cmd+S) and watch the browser update automatically!

### 2. Test Auto-completion:
1. Try typing `<div class="` - you should see CSS class suggestions
2. Type `<h` - you should see HTML tag completions
3. Type `style="background:` - you should see CSS property suggestions

### 3. Test Emmet Abbreviations:
1. Type `div.container>h2+p` and press Tab
2. Type `ul>li*3` and press Tab
3. Type `div.card{Card $}*3` and press Tab

### 4. Test Auto-formatting:
1. Add some messy HTML like: `<div><h1>Test</h1><p>Paragraph</p></div>`
2. Press Alt+Shift+F (or Cmd+Shift+F on Mac) to auto-format

### 5. Test Live Server Features:
- **Right-click on index.html** → "Open with Live Server" for port 5500
- Or use **Command Palette** (Cmd+Shift+P) → "Live Preview: Start Server" for port 3001

## 🎯 Advanced WYSIWYG Tips

### Split View Editing:
1. Open `index.html` and `css/main.css` side by side
2. Use **View** → **Editor Layout** → **Split Right**
3. Edit CSS in one pane and see changes in the browser

### CSS Peek Feature:
1. Hover over any class name like `hero-title` in HTML
2. You'll see a popup showing the CSS rules
3. Click the popup to jump to the CSS file

### Auto Rename Tags:
1. Find an HTML tag like `<div class="container">`
2. Change `div` to `section` - the closing tag updates automatically!

## 🔧 Useful Keyboard Shortcuts:
- `Cmd+D` - Select next occurrence
- `Cmd+/` - Toggle comment
- `Cmd+Shift+P` - Command palette
- `Cmd+Shift+F` - Format document
- `Ctrl+Space` - Trigger suggestions
- `Cmd+Click` - Go to definition

## 🎨 Try These Live Edits:

In the WYSIWYG Test Zone section, try changing:

```html
<!-- Change this: -->
<h2 style="font-size: 2.5rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">✨ WYSIWYG Test Zone ✨</h2>

<!-- To this: -->
<h2 style="font-size: 3rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); animation: pulse 2s infinite;">🚀 Live Editing Rocks! 🚀</h2>
```

Save and watch the magic happen!

## 📱 Responsive Testing:
- Open Chrome DevTools (F12)
- Click the device toggle icon
- Test different screen sizes while editing

Enjoy your new WYSIWYG editing environment! 🎉
