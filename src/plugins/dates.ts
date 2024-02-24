export function timeSince(isoDate: string) {
  const now = new Date();
  const past = new Date(isoDate);
  const secondsPast = (now.getTime() - past.getTime()) / 1000;

  if (secondsPast < 60) {
    return secondsPast === 1 ? 'pred 1 sekundou' : `pred ${Math.floor(secondsPast)} sekundami`;
  }
  if (secondsPast < 3600) {
    const minutes = Math.floor(secondsPast / 60);
    return minutes === 1 ? 'pred 1 minútou' : `pred ${minutes} minútami`;
  }
  if (secondsPast <= 86400) {
    const hours = Math.floor(secondsPast / 3600);
    return hours === 1 ? 'pred 1 hodinou' : `pred ${hours} hodinami`;
  }
  if (secondsPast > 86400) {
    const days = Math.floor(secondsPast / 86400);
    return days === 1 ? 'pred 1 dňom' : `pred ${days} dňami` ;
  }
}