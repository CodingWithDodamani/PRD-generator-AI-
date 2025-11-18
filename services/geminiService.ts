
import { GoogleGenAI } from "@google/genai";
import type { PrdInput, TechStack, VanillaStructure } from '../types';

const getTechStackPreference = (stack: TechStack, vanillaStructure?: VanillaStructure): string => {
    switch (stack) {
        case 'react':
            return 'The user has a preference for a modern stack: React (with Vite) and Tailwind CSS for the frontend, and a Node.js (Express) backend.';
        case 'vue':
            return 'The user has a preference for a modern stack: Vue.js (with Vite) and Tailwind CSS for the frontend, and a Node.js (Express) backend.';
        case 'classic':
             if (vanillaStructure === 'single') {
                return 'The user has a preference for a classic web stack: standard HTML, CSS, and vanilla JavaScript. CRITICAL REQUIREMENT: All code (HTML, CSS, JS) must be contained within a SINGLE index.html file for portability.';
            } else if (vanillaStructure === 'separate') {
                return 'The user has a preference for a classic web stack: standard HTML, CSS, and vanilla JavaScript. Requirement: Use SEPARATE files for structure (index.html), styles (style.css), and logic (script.js).';
            }
            return 'The user has a preference for a classic web stack: standard HTML, CSS, and vanilla JavaScript, likely with a simple backend if needed.';
        case 'mobile':
            return 'The user has a preference for a mobile-focused stack using React Native for cross-platform development and Firebase for backend services.';
        default:
            return '';
    }
}

const PRD_EXAMPLE = `
# Product Requirements Document: YBT AI Image Generator

## 1. Product Overview
- **Product Name:** YBT AI Image Generator
- **Type:** SaaS Web Application
- **Platform:** Web (Responsive), Mobile Web
- **Tech Stack:** Next.js 14 (App Router), Tailwind CSS, Python (FastAPI) for AI orchestration, PostgreSQL (Supabase).

## 2. Product Vision
- **Goal:** Empower digital marketers to create brand-consistent visual assets in seconds without complex prompting.
- **Tagline:** "Enterprise-grade visuals, zero learning curve."

## 3. Target Audience
- **Primary:** Social Media Managers and Digital Marketers.
- **Secondary:** Small Business Owners and Content Creators.

## 4. Key Features
- **Smart Prompting:** AI assists in refining simple keywords into complex image generation prompts.
- **Style Presets:** One-click application of artistic styles (e.g., "Cinematic," "Isometric," "Watercolor").
- **Workspace Management:** Organize generations into project folders with team access controls.

## 5. UI/UX Design Guidelines
- **Theme:** Dark mode default ('Midnight Blue' palette). Clean, distraction-free canvas.
- **Navigation:** Collapsible sidebar (left) for tools; Property inspector (right) for fine-tuning.
- **Key Components:**
  - \`CanvasArea\`: The central interactive zone for image generation.
  - \`PromptBar\`: Floating input component with auto-complete suggestions.

## 6. System Architecture
- **Frontend:** React-based SPA handling state via Zustand. Optimistic UI updates for generation status.
- **Backend:**
  - **API Layer:** FastAPI service handling request validation and rate limiting.
  - **Worker Layer:** Celery workers processing generation jobs asynchronously.
- **Infrastructure:** Vercel (Frontend), AWS ECS (Backend Containers), S3 (Asset Storage).

## 7. Database Schema
\`\`\`prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  tier      Tier     @default(FREE)
  projects  Project[]
}

model Project {
  id        String   @id @default(uuid())
  name      String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  images    Image[]
}

model Image {
  id          String   @id @default(uuid())
  url         String
  promptUsed  String
  createdAt   DateTime @default(now())
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id])
}
\`\`\`

## 8. API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | \`/api/v1/generate\` | Enqueues a generation job. Returns \`jobId\`. |
| GET | \`/api/v1/jobs/{jobId}\` | Polls status of generation (PENDING, PROCESSING, COMPLETED). |
| GET | \`/api/v1/projects\` | Lists all user projects. |

## 9. Security Considerations
- **Authentication:** OAuth 2.0 via Google/GitHub.
- **Input Validation:** All prompts checked against a banned word list to prevent TOS violations.
- **Storage:** Signed URLs for S3 access to prevent public scraping of user assets.

## 10. Core Logic Example (Job Polling)
1. Client sends POST to \`/generate\`. Receives \`jobId\`.
2. Client initiates \`setInterval\` polling \`/jobs/{jobId}\` every 2s.
3. If status is \`COMPLETED\`, client renders image from returned URL.
4. If status is \`FAILED\`, client displays error toast.

## 11. Future Enhancements (Phase 2)
- **In-painting:** Allow users to redraw specific regions.
- **API Access:** Public API for 3rd party integrations.

## 12. Privacy Policy (Summary)
- User generated content is private by default.
- No data training on user images without explicit opt-in.

## 13. Example User Flow
1. User logs in -> Dashboard.
2. Clicks "New Project" -> Enters "Summer Campaign".
3. Types "Beach sunset with product" -> Selects "Photorealistic" style.
4. Clicks Generate -> Waits 5s -> Views result -> Downloads.

## 14. Deliverables
- Fully functional Next.js application.
- Dockerized backend service.
- CI/CD pipeline config (GitHub Actions).
`;

const buildPrompt = (data: PrdInput): string => {
  const { 
      idea, 
      platform, 
      scope, 
      features, 
      audience, 
      techStack, 
      customTechStack, 
      vanillaStructure,
      monetization,
      successMetrics
  } = data;

  let techStackPreference = '';
  const customStackValues = Object.values(customTechStack).filter(Boolean);

  if (customStackValues.length > 0) {
      const stackDetails = [
          customTechStack.frontend && `Frontend: ${customTechStack.frontend}`,
          customTechStack.backend && `Backend: ${customTechStack.backend}`,
          customTechStack.database && `Database: ${customTechStack.database}`,
          customTechStack.deployment && `Deployment: ${customTechStack.deployment}`,
      ].filter(Boolean).join('\n');
      techStackPreference = `The user has provided a custom technology stack preference:\n${stackDetails}`;
  } else if (techStack) {
      techStackPreference = getTechStackPreference(techStack, vanillaStructure);
  }

  // Scope-specific logic
  let roleDefinition = `Act as an expert Product Manager and Lead Software Architect.`;
  let scopeInstructions = '';
  let structureInstructions = '';

  if (scope === 'frontend') {
    roleDefinition = `Act as an expert Product Manager specializing in Frontend Architecture and UI/UX Design.`;
    
    scopeInstructions = `
    **GENERATION SCOPE: FRONTEND PROTOTYPE (NO BACKEND)**
    The user has explicitly requested a **Frontend-only** specification.
    - **Focus:** UI Components, Client-side State Management, UX Flows, Mock Data, Routing, and Styling.
    - **Exclude:** Database Schemas, Server-side API logic, DevOps/Deployment (unless static hosting).
    - **Mocking:** Describe how to mock the backend data (e.g. using JSON files or simple fetch wrappers) to make the prototype functional.
    - **Tech Stack Note:** Ensure the Technology Preference is applied specifically to the Frontend Scope (ignore backend tech in the stack if irrelevant, or use it only for context).
    `;
    
    structureInstructions = `
    **Structure Adaptation (FRONTEND MODE):**
    Instead of the Standard PRD structure, use this Frontend-Specific structure:
    1. **Product Overview**
    2. **Product Vision & UI/UX Goals**
    3. **Target Audience**
    4. **Key Features (Frontend Focus)**
    ${monetization ? '5. **Monetization Strategy** (UI Implications)' : ''}
    ${successMetrics ? '6. **Success Metrics** (UX KPIs)' : ''}
    7. **Tech Stack (Frontend Only)**
    8. **Frontend Architecture** (Folder Structure, Routing, State Management)
    9. **Component Hierarchy & Specifications** (Detailed breakdown of key components)
    10. **Data Layer & Mocking Strategy** (Interfaces, Mock Data shape)
    11. **UI Design System** (Colors, Typography, Responsiveness)
    12. **User Flows**
    13. **Future Backend Integration Notes**
    `;
  } else {
      // Fullstack default
      scopeInstructions = `**GENERATION SCOPE: PRODUCTION READY FULL-STACK**\nInclude all backend, database, and devops requirements.`;
      structureInstructions = `
      **Structure:** You MUST follow the exact section numbering, titles, and depth of the REFERENCE EXAMPLE below, but you must ADD specific sections for "Monetization Strategy" and "Success Metrics" if the user provided input for them.
      `;
  }

  let prompt = `
${roleDefinition} Your task is to generate a comprehensive, "Golden Source of Truth" Product Requirements Document (PRD).

**Target Audience for this Document:**
1.  **Human Developers:** Needs to be readable, professional, and clear.
2.  **AI Coding Assistants (LLMs):** The output must be structured, precise, and unambiguous so that it can be pasted into an AI IDE (like Cursor, Copilot, or Windsurf) to generate the actual codebase without further prompting.

**User's Input:**
- **Core App Idea:** ${idea}
${platform ? `- **Target Platform:** ${platform}` : ''}
${features ? `- **Key Features Requested:** ${features}` : ''}
${audience ? `- **Target Audience:** ${audience}` : ''}
${monetization ? `- **Monetization Strategy:** ${monetization}` : ''}
${successMetrics ? `- **Success Metrics / KPIs:** ${successMetrics}` : ''}
${techStackPreference ? `- **Technology Preference:** ${techStackPreference}` : ''}

${scopeInstructions}

**Strict Output Rules (CRITICAL):**
1.  **Raw Markdown Only:** Output *only* valid Markdown. Do NOT wrap the response in a code block (e.g., do NOT use \`\`\`markdown at the start).
2.  **No Conversational Filler:** Do NOT include "Here is your PRD," "I hope this helps," or any other conversational text. Start directly with the document title.
3.  **Precise Terminology:** Use standard technical naming conventions (camelCase for JSON, PascalCase for components, etc.) in the technical sections.
${structureInstructions}

**REFERENCE EXAMPLE (GOLD STANDARD):**
---
${PRD_EXAMPLE}
---

**Generate the PRD for the User's Input following the Reference Example structure (unless overridden by Scope instructions above). If Monetization or Success Metrics are provided in the input, create dedicated sections for them.**
  `;

  return prompt.trim();
};

export const generatePrdStream = async function* (data: PrdInput): AsyncGenerator<string, void, unknown> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = buildPrompt(data);

  try {
    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });
    
    for await (const chunk of responseStream) {
        if (chunk.text) {
            yield chunk.text;
        }
    }

  } catch (error) {
    console.error("Error during PRD generation:", error);
    throw error;
  }
};
