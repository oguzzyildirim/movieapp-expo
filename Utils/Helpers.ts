export const extractYear = (dateString?: string): string => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear().toString();
};