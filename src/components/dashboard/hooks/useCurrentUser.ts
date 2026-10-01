import { useUser } from "@clerk/react";

function useCurrentUser() {
  const { user } = useUser();
  const username = user?.firstName;
  return username;
}

export default useCurrentUser;