import { fetchRepos } from "@/apis/repositoryAction";
import SearchComponent from "@/components/elements/SearchComponent";

export default async function Home({ searchParams }) {
  const query = searchParams?.query || "";
  const page = parseInt(searchParams?.page || 1, 10);
  const { repos, hasMore } = await fetchRepos(query, page);

  return (
    <div className="container mx-auto p-4">
      <SearchComponent initialRepos={repos} initialHasMore={hasMore} />
    </div>
  );
}
