# Project Blueprint

## Overview

This project is a web-based Itinerary Planner that allows users to generate travel itineraries and get hotel suggestions. The application is designed to be user-friendly, visually appealing, and responsive, providing a seamless experience on both mobile and web platforms.

## Design and Features

### Visual Design

-   **Aesthetics:** The application incorporates modern design principles, with a focus on clean spacing, visually balanced layouts, and polished styles.
-   **Color Palette:** A vibrant and energetic color palette is used to create a visually appealing user interface.
-   **Typography:** Expressive and relevant typography is used to emphasize key information and enhance readability.
-   **Iconography:** Icons are used to enhance user understanding and improve navigation.
-   **Interactivity:** Interactive elements such as buttons and forms have a modern look and feel, with subtle animations and shadow effects to create a sense of depth.

### Features

-   **Itinerary Generation:** Users can generate a travel itinerary by specifying a destination, travel dates, and the number of people.
-   **Hotel Suggestions:** The application provides hotel suggestions based on the selected destination.
-   **Day/Night Mode:** A day/night mode toggle allows users to switch between a light and dark theme.

## Current Change: Add Day/Night Mode

### Plan

1.  **HTML:** Add a theme switcher toggle to the `index.html` file.
2.  **CSS:**
    -   Add CSS variables to `style.css` to define the color palette for both light and dark themes.
    -   Add styles for the theme switcher toggle.
    -   Use the CSS variables to style the application, ensuring that the colors adapt to the selected theme.
3.  **JavaScript:**
    -   Add an event listener to the theme switcher toggle to detect when the user changes the theme.
    -   When the theme is changed, update the `data-theme` attribute on the `<html>` element to apply the new theme.
    -   Store the selected theme in local storage so that it persists across sessions.

### Implementation Details

-   The theme switcher is a simple checkbox with a slider.
-   CSS variables are used to define the colors for the light and dark themes. This makes it easy to update the color scheme in the future.
-   JavaScript is used to handle the theme switching logic and to store the user's preferred theme in local storage.
