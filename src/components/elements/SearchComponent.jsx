"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import RepositoryCard from "@/components/elements/RepositoryCard";
import { Input } from "@/components/ui/input";
import { debounce } from "underscore";

export default function SearchComponent({ initialRepos, initialHasMore }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [repos, setRepos] = useState(initialRepos);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [error, setError] = useState(null);

  useEffect(() => {
    clearURLParams();
  }, []);

  useEffect(() => {
    setRepos((prevRepos) =>
      page === 1 ? initialRepos : [...prevRepos, ...initialRepos]
    );
    setHasMore(initialHasMore);
    setError(null);
  }, [initialRepos, initialHasMore]);

  const clearURLParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.delete("page");
    router.replace(`?${params.toString()}`, { shallow: true });
  };

  const updateURLParams = (newQuery, newPage = 1) => {
    const params = new URLSearchParams();
    if (newQuery) params.set("query", newQuery);
    if (newPage > 1) params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { shallow: true });
  };

  const handleSearch = debounce((e) => {
    const newQuery = e.target.value;
    updateURLParams(newQuery);
    setRepos([]);
    setError(null);
  }, 2000);

  const loadMore = () => {
    try {
      updateURLParams(query, page + 1);
    } catch (err) {
      setError("An error occurred while loading more repositories.");
      setHasMore(false);
    }
  };

  return (
    <>
      <div className="flex items-center mb-6 space-x-2">
        <Input
          type="text"
          placeholder="Search for repositories"
          className="w-full sm:w-2/3 md:w-1/2 p-2 mx-auto border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleSearch}
          defaultValue={query}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <InfiniteScroll
        dataLength={repos?.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<p className="text-center">Loading more repositories...</p>}
        endMessage={
          <p className="text-center">No more repositories to load.</p>
        }
      >
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {repos?.map((repo, index) => (
            <RepositoryCard key={repo.id || index} repo={repo} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
