import { education, experience, lifeSection } from "../data/site-content";

export type ResumeExperience = (typeof experience)[number];
export type ResumeEducation = (typeof education)[number];
export type ResumeLifeSection = typeof lifeSection;

export type ResumeContent = {
  experience: ResumeExperience[];
  education: ResumeEducation[];
  lifeSection: ResumeLifeSection;
};

const CONTENTFUL_SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT ?? "master";
const CONTENTFUL_RESUME_ENTRY_ID = import.meta.env.VITE_CONTENTFUL_RESUME_ENTRY_ID;
const CONTENTFUL_RESUME_CONTENT_TYPE = import.meta.env.VITE_CONTENTFUL_RESUME_CONTENT_TYPE ?? "resumeContent";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isImageMeta(value: unknown): value is { src: string; alt: string; caption: string } {
  return (
    isRecord(value) &&
    isString(value.src) &&
    isString(value.alt) &&
    isString(value.caption)
  );
}

function isExperienceItem(value: unknown): value is ResumeExperience {
  return (
    isRecord(value) &&
    isString(value.title) &&
    isString(value.company) &&
    isString(value.location) &&
    isString(value.date) &&
    isStringArray(value.stack) &&
    isImageMeta(value.image) &&
    isStringArray(value.bullets)
  );
}

function isEducationItem(value: unknown): value is ResumeEducation {
  return (
    isRecord(value) &&
    isString(value.title) &&
    isString(value.org) &&
    isString(value.location) &&
    isString(value.date) &&
    isImageMeta(value.image)
  );
}

function isLifeSection(value: unknown): value is ResumeLifeSection {
  return (
    isRecord(value) &&
    isString(value.title) &&
    isString(value.date) &&
    isString(value.body) &&
    isImageMeta(value.image)
  );
}

function isResumeContent(value: unknown): value is ResumeContent {
  return (
    isRecord(value) &&
    Array.isArray(value.experience) &&
    value.experience.every(isExperienceItem) &&
    Array.isArray(value.education) &&
    value.education.every(isEducationItem) &&
    isLifeSection(value.lifeSection)
  );
}

export function getFallbackResumeContent(): ResumeContent {
  return {
    experience,
    education,
    lifeSection
  };
}

export function isContentfulResumeConfigured() {
  return Boolean(CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN);
}

export async function fetchContentfulResumeContent(): Promise<ResumeContent | null> {
  if (!isContentfulResumeConfigured()) {
    return null;
  }

  const baseUrl = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries`;
  const params = new URLSearchParams({
    access_token: CONTENTFUL_ACCESS_TOKEN
  });

  const url = CONTENTFUL_RESUME_ENTRY_ID
    ? `${baseUrl}/${CONTENTFUL_RESUME_ENTRY_ID}?${params.toString()}`
    : `${baseUrl}?${new URLSearchParams({
        ...Object.fromEntries(params.entries()),
        content_type: CONTENTFUL_RESUME_CONTENT_TYPE,
        limit: "1"
      }).toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Contentful request failed: ${response.status}`);
  }

  const data = (await response.json()) as unknown;
  const fields = CONTENTFUL_RESUME_ENTRY_ID
    ? (isRecord(data) ? data.fields : null)
    : isRecord(data) &&
        Array.isArray(data.items) &&
        data.items.length > 0 &&
        isRecord(data.items[0])
      ? data.items[0].fields
      : null;

  if (!isResumeContent(fields)) {
    throw new Error(
      "Contentful resume entry is missing fields or does not match the expected resumeContent shape."
    );
  }

  return fields;
}
