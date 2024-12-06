export function getCurrentDateForDatabase() {
    const currentDate = new Date();
    return currentDate.toISOString();
}