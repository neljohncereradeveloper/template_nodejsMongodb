export const getAge = (birthDate: Date) =>
  Math.floor(
    ((new Date() as any) - new Date(birthDate).getTime()) / 3.15576e10
  );
