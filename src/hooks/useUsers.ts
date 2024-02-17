import { useInfiniteQuery } from "react-query";
import { getUsers } from "../api/apis";

function useUsers(search: string) {
  const page = 10;
  const queryKey = "getUsers";
  const getUser = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      getUsers({ offset: pageParam, filter: search, size: page }),
    onSuccess: () => {
      console.log("Hello there");
    },
    getNextPageParam: (data, _) => {
      // console.log("data: ", data, _);
    },
    retry: false,
  });

  return getUser;
}

export { useUsers };
