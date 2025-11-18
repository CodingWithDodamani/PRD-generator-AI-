
# How This Project Was Developed (Developer's Guide)

This document breaks down the development process of the PRD Generator AI. It's designed to help you understand the project's structure, logic, and key decisions, whether for an interview or for onboarding a new team member.

---

### 1. The Core Idea & Goal

The primary goal was to create a tool that could take a simple, high-level app idea from a user and automatically generate a detailed, professional Product Requirements Document (PRD). This solves a common problem for non-technical founders and product managers by providing a structured starting point for development discussions.

A key secondary goal was to make the output "AI-friendly," meaning it could be directly fed into another AI tool (like a code generation model) to continue the development process.

---

### 2. Choosing the Right Tools (The Tech Stack)

-   **Frontend Framework:** **React with TypeScript**. React is perfect for building interactive, component-based UIs. TypeScript was chosen for type safety, which makes the code more robust and easier to maintain, especially as the application grows.
-   **AI Model:** **Google Gemini API (`@google/genai` SDK)**. The Gemini models are powerful and versatile, capable of understanding nuanced instructions and generating high-quality, structured text, which is the core of this application.
-   **Styling:** **Tailwind CSS**. This utility-first CSS framework allows for rapid UI development directly in the HTML/JSX. It keeps the styling consistent and makes creating a responsive design straightforward.
-   **Markdown Rendering:** **`react-markdown`**. To display the AI's output correctly, we needed a library to parse and render Markdown content into HTML. `react-markdown` is a popular and powerful choice for this in the React ecosystem.

---

### 3. Structuring the Project (File Organization)

The project is organized into logical folders to keep the code clean and easy to navigate:

-   `components/`: Contains all the reusable UI building blocks (e.g., `Header.tsx`, `InputForm.tsx`, `PrdDisplay.tsx`). This is a standard practice in React development.
-   `services/`: This folder holds the logic that communicates with external APIs. `geminiService.ts` is the only file here, and it's responsible for all interactions with the Gemini API. This separation of concerns is crucial—it keeps our UI components clean of complex API logic.
-   `types.ts`: A central place to define all the custom TypeScript types used across the application (like `PrdInput`). This promotes code reuse and consistency.
-   `App.tsx`: The main component that acts as the "brain" of the application. It manages the overall state (what the user sees, whether it's loading, if there's an error) and connects all the other components.

---

### 4. The Application's Workflow (Step-by-Step)

Here’s how data flows through the app from user input to final output:

1.  **User Input:** The user interacts with the `InputForm.tsx` component, filling in their idea and other optional details.
2.  **Submitting the Form:** When the "Generate PRD" button is clicked, the form's state (the user's input) is bundled into an object and passed up to the parent `App.tsx` component via a callback function (`onSubmit`).
3.  **Managing State in `App.tsx`:** `App.tsx` receives the data. It immediately sets its state to `isLoading = true` and clears any previous PRD content or errors. This is what makes the loading spinner appear.
4.  **Calling the API Service:** `App.tsx` then calls the `generatePrd` function from `services/geminiService.ts`, passing along the user's form data.
5.  **Prompt Engineering (The "Magic"):** Inside `geminiService.ts`, the `buildPrompt` function takes the user's simple data and constructs a very detailed, carefully engineered prompt. This prompt instructs the Gemini model on *exactly* how to structure the PRD, what sections to include, and the tone to use. This is the most critical part of the application's logic.
6.  **API Request:** The service sends this prompt to the Gemini API using the `@google/genai` SDK. It then `await`s the response.
7.  **Handling the Response:** Once the Gemini API returns the generated text, the service does a quick check to ensure the response isn't empty.
8.  **Updating the UI:** The generated text is returned to `App.tsx`. `App.tsx` updates its state again: `isLoading = false` and `prdContent = "the response from the AI"`. This causes the UI to re-render, hiding the loader and showing the `PrdDisplay.tsx` component.
9.  **Displaying the PRD:** The `PrdDisplay.tsx` component receives the generated text and uses the `react-markdown` library to render it as nicely formatted HTML for the user to read.

---

### 5. Key Development Decisions & Features

-   **Component-Based Design:** Breaking the UI into small, focused components makes the code easier to understand, test, and reuse.
-   **Centralized State Management:** Keeping the main application state (`isLoading`, `error`, `prdContent`) in the top-level `App.tsx` component simplifies data flow. For a larger app, we might use a state management library like Redux or Zustand, but for this scale, `useState` is perfect.
-   **Dedicated API Service:** By creating `geminiService.ts`, we decouple the API logic from the UI. If we ever wanted to switch to a different AI model, we would only need to change this one file, not the entire application.
-   **Evolution of Prompt Engineering:** The quality of the output is almost entirely dependent on the quality of the prompt. The prompt in `buildPrompt` has undergone significant iteration:
    1.  **Initial Version:** Focused on generating a standard, high-level PRD suitable for product managers.
    2.  **Technical Specification Overhaul:** The prompt was completely redesigned to generate a **hyper-detailed technical specification**, not just a PRD. It explicitly asks for database schemas, API endpoints, system architecture, and core logic examples.
    3.  **Security Integration:** Added a "Security Considerations" section to the prompt, ensuring the AI suggests mitigation strategies for potential vulnerabilities (XSS, CSRF, etc.).
    4.  **AI-Parsability Optimization:** Refined the prompt to strictly enforce **Raw Markdown** output and remove all conversational filler. This ensures the output acts as a "Golden Source of Truth" that can be pasted directly into AI IDEs (like Cursor) without confusing the model with extraneous text or inconsistent formatting.
-   **User-Centric Error Handling:** Instead of showing a generic "Error" message, the code inspects the error message from the API. It provides specific, helpful feedback to the user, telling them if the problem is their API key, their network connection, or something else. This creates a much better user experience.
-   **Extensible Input Form:** To add the custom tech stack feature, I created a new, dedicated component (`CustomTechStackForm.tsx`) to handle the specific inputs. The main `InputForm.tsx` was updated to manage the state for showing/hiding this new component and ensuring that the preset stack options and custom stack inputs are mutually exclusive. This approach keeps the main form component clean while allowing for new, complex input sections to be added modularly.
