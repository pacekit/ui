# Contributing to PaceKit

First off, thank you for considering contributing to PaceKit! 🎉 We love our community and are excited to see your contributions. These guidelines will help you get started.

---

## Code of Conduct

We have a **Code of Conduct** to ensure our community is welcoming and inclusive for everyone. Please take a moment to read it before you start.

---

## Getting Started 🚀

Ready to contribute? Here’s how to set up your development environment:

1.  **Fork the Repository**: Click the 'Fork' button at the top right of the PaceKit GitHub page.

2.  **Clone Your Fork**: Clone your forked repository to your local machine.

    ```bash
    git clone [https://github.com/your-username/ui.git](https://github.com/your-username/ui.git)
    ```

3.  **Create a New Branch**: Move into the project directory and create a new branch for your feature or bug fix.

    ```bash
    cd ui
    git checkout -b your-branch-name
    ```

4.  **Install & Run**: Install the project dependencies and start the development server. You can use any package manager (`npm`, `yarn`, `pnpm`).
    ```bash
    npm install
    npm run dev
    ```

---

## How to Add a New Component 💡

Adding a new animated component is the best way to contribute. Follow these four steps to ensure your component is integrated correctly.

### 1. Create the Component

First, create your component file and place it in the following directory:

- `src/components/gsap/`

We use **GSAP** for all animations, so make sure your component leverages its power for smooth interactions.

### 2. Add Component Demos

Showcase your component! A default demo is required, but feel free to add more to show off different variations.

- Add the default demo here: `src/demo/components/{your-component-name}/default.tsx`
- Add any additional demos in the same folder: `src/demo/components/{your-component-name}/`

### 3. Write the Documentation

Documentation helps others use your component. We use **Fumadocs** for our documentation site.

- Create an MDX file for your component: `/src/content/docs/components/{your-component-name}.mdx`
- To make it appear in the sidebar, add the filename to `/src/content/docs/components/meta.json`.

    ```json
    // src/content/docs/components/meta.json
    {
        "pages": [
            "...",
            "your-component-name" // <-- Add your component's filename here
        ]
    }
    ```

### 4. Register the Component

The final step is to register your component so it can be used throughout the library.

- Open the registry file: `src/lib/registry/gsap-component.ts`
- Add an entry for your new component. You can copy an existing entry and modify it. This step is straightforward—just follow the existing format!

---

## Submitting a Pull Request

Once your component is ready, push your branch to your fork and open a pull request.

1.  **Push your branch**:
    ```bash
    git push origin your-branch-name
    ```
2.  **Open a Pull Request**: Go to the PaceKit repository on GitHub and click "New pull request".
3.  **Provide Details**: Fill out the pull request template with a clear title and a detailed description of your changes.

Thank you again for your contribution. Let's build amazing things together! ❤️
