// Only works with phone numbers that are 10 digits long example: 1234567890
export const formatPhoneNumber = (phoneNumber: number) => {
  const phoneStr = phoneNumber.toString();
  return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(
    6
  )}`;
};
