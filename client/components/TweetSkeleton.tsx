import { Skeleton } from "@/components/ui/skeleton";

const TweetSkeleton = () => {
  return (
    <div className="flex flex-col justify-between items-start gap-4 w-full h-full p-4 pt-5 dark:bg-[#1e2732] rounded-xl border-[1px] dark:border-[#415464]">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-2 mt-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
        <Skeleton className="relative -top-3 h-8 w-8 rounded-md" />
      </div>
      <Skeleton className="right-2h-10 w-full h-24 rounded-md" />
      <Skeleton className="right-2h-10 w-full h-48 rounded-md" />
    </div>
  );
};

export default TweetSkeleton;
