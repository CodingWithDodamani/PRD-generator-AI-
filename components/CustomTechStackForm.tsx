
import React from 'react';
import type { CustomTechStack } from '../types';

interface CustomTechStackFormProps {
  stack: CustomTechStack;
  onChange: (stack: CustomTechStack) => void;
}

const stackFields: { key: keyof CustomTechStack; label: string; placeholder: string }[] = [
  { key: 'frontend', label: 'Frontend', placeholder: 'e.g., SvelteKit, UnoCSS' },
  { key: 'backend', label: 'Backend', placeholder: 'e.g., Go, Gin' },
  { key: 'database', label: 'Database', placeholder: 'e.g., MongoDB, Redis' },
  { key: 'deployment', label: 'Deployment', placeholder: 'e.g., Docker on AWS' },
];

export const CustomTechStackForm: React.FC<CustomTechStackFormProps> = ({ stack, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...stack,
      [name]: value,
    });
  };

  return (
    <div className="space-y-3 p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5 mt-2 transition-colors">
      {stackFields.map((field) => (
        <div key={field.key}>
          <label htmlFor={field.key} className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-1">
            {field.label}
          </label>
          <input
            type="text"
            id={field.key}
            name={field.key}
            value={stack[field.key]}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-xs text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-colors"
            placeholder={field.placeholder}
          />
        </div>
      ))}
    </div>
  );
};
