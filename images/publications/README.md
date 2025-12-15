# Publication Images

This folder contains images for publications displayed on the website.

## How to Add Publication Images

1. Add your publication image to this folder (recommended format: PNG or JPG)
2. Update `data/content.json` to reference the image:

```json
{
  "title": "Your Paper Title",
  ...
  "image": "images/publications/your-image.png"
}
```

## Image Guidelines

- **Recommended height**: 250-400px (width will adjust automatically)
- **Max height**: 300px (enforced by CSS)
- **Format**: PNG or JPG
- **Content**: Paper figure, architecture diagram, or result visualization
