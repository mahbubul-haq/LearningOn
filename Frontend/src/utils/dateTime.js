export const convertTime = (timeString) => {
    const date = new Date(timeString);
    let diff = Math.abs(new Date() - date);
    let time = "";
    /// convert to days hours and minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);

    if (days > 0) {
        time += days + "d ";
    }
    if (hours > 0 && time === "") {
        time += hours + "h ";
    }
    if (minutes > -1 && time === "") {
        time += minutes + "m ";
    }
    return time + "ago";
};