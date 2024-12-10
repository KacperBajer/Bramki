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
export function formatDateFromDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function isValidEmail(email: string) {
    const domain = "@live.zs1mm.edu.pl";
    return email.endsWith(domain);
}
export function getCurrentDatePlus15Minutes() {
    let now = new Date(); 
    now.setMinutes(now.getMinutes() + 15);
    return now;
}
export function getCurrentDate(): string {
    return new Date().toISOString();
}
  