# Enable GitHub Pages

To host the interactive roadmap as a live website:

1. Go to your repo **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**
3. **Branch:** `main` (or `master`)
4. **Folder:** `/docs` ← **Must be /docs, NOT / (root)**
5. Click **Save**

Your site will be live at:
```
https://<your-username>.github.io/Senior-Data-Scientist-Roadmap/
```

It may take 1–2 minutes to deploy.

---

## Troubleshooting

**Seeing README instead of the interactive roadmap?**
- Ensure **Folder** is set to **/docs** (not root)
- The `.nojekyll` file in docs/ disables Jekyll so `index.html` is served correctly
