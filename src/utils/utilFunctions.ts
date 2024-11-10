export const setDate = () =>{
    const now = new Date();
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',   // e.g., "January"
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false     // 12-hour format, set to false for 24-hour format
      }).format(now);
}
export const makeId = (length:number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


