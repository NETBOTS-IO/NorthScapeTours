export const generateSlug = (title: string): string => {
  const slug = title
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Remove non-word characters except spaces and hyphens
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .slice(0, 50); // Limit to 50 characters
  return slug;
};
