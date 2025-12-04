export const convertTime = (timeString) => {
    const date = new Date(timeString);
    let diff = Math.abs(new Date() - date);
    let time = "";
    /// convert to days hours and minutes
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    diff -= years * (1000 * 60 * 60 * 24 * 365);
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    diff -= months * (1000 * 60 * 60 * 24 * 30);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    
    if (years > 0) {
        time += years + "y ";
    } else if (months > 0) {
        time += months + "mo ";
    } else if (days > 0) {
        time += days + "d ";
    } else if (hours > 0) {
        time += hours + "h ";
    } else if (minutes > -1) {
        time += minutes + "m ";
    }
    return time + "ago";
};
