const wait = (milliseconds: number) =>
  new Promise<void>((res) => setTimeout(res, milliseconds));

export default wait;
