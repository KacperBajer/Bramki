export function getCurrentDateForDatabase() {
    const currentDate = new Date();
    return currentDate.toISOString();
}
export function formatDate(isoDate: string) {
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    return date.toLocaleDateString('pl-PL', options);
}

export function isValidEmail(email: string) {
    const domain = "@live.zs1mm.edu.pl";
    return email.endsWith(domain);
}