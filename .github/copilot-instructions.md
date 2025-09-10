# About This Project

This is a Next.js 15 application using the App Router. The project's standout feature is a dynamic, interactive 3D background rendered using React Three Fiber and Spline. It uses Sanity as a headless CMS for content, Prisma for database interaction, and Tailwind CSS for styling.

## Core Architecture

### The 3D Background

The most complex part of the application is the 3D background. The logic is carefully separated to handle server-side and client-side rendering.

-   **`app/components/BackgroundWrapper.tsx`**: This is the server-side entry point for the background. It uses `next/dynamic` to load `ClientBackgroundWrapper`.
-   **`app/components/ClientBackgroundWrapper.tsx`**: This component ensures the 3D scene is only rendered on the client. It wraps `ThreeCanvas`.
-   **`app/components/ThreeCanvas.jsx`**: This is where the React Three Fiber `Canvas` is set up.
-   **`app/components/BackgroundScene.jsx`**: This component contains the actual Three.js/Spline scene, models (`public/gun.glb`), and animations.

When working with the background, remember that most of the 3D logic is in `.jsx` files and is client-side only.

### Content Management with Sanity

The project uses `next-sanity` to fetch content from a Sanity CMS. You'll find configuration in `sanity.config.ts` (if present) and client logic in `sanity.client.ts` (if present). When adding new content types, you'll need to update the Sanity schema and then query it in the Next.js app.

### Database and API

Prisma is used as the ORM. The schema is defined in `prisma/schema.prisma`. API routes in `app/api/` handle database operations.

## Key Libraries & Frameworks

-   **Next.js 15 (App Router)**: The core framework.
-   **React Three Fiber / Drei / Spline**: For the 3D background.
-   **Sanity**: For content management.
-   **Prisma**: For database access.
-   **Tailwind CSS**: For styling.
-   **Framer Motion**: For UI animations.
-   **Zustand**: For client-side state management.
-   **React Hook Form & Zod**: For forms and validation.

## Developer Workflow

The project uses `pnpm` as the package manager.

-   **Run the development server**:
    ```bash
    pnpm dev
    ```
-   **Create a production build**:
    ```bash
    pnpm build
    ```
-   **Run database migrations**:
    ```bash
    pnpm prisma migrate dev
    ```

## Component Structure

-   Reusable, general-purpose components are in `app/components/`.
-   Components specific to a page should be co-located with that page's `page.tsx` file.
-   The 3D rendering logic is a good example of separating client-side concerns from server-rendered components. Use `ClientBackgroundWrapper.tsx` as a reference for creating new client-only, interactive components.
