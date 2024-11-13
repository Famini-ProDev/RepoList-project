const GITHUB_API_BASE_URL = "https://api.github.com";

export const fetchRepoDetails = async (id) => {
  const res = await fetch(`${GITHUB_API_BASE_URL}/repositories/${id}`);
  const data = await res.json();
  return data;
};

export const fetchRepos = async (query, page) => {
  if (!query) return { repos: [], hasMore: false };

  try {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/search/repositories?q=${query}&page=${page}&per_page=10`
    );

    if (!response.ok) throw new Error("Failed to fetch repositories");

    const data = await response.json();
    const hasMore = data.items.length === 10;

    return { repos: data.items || [], hasMore };
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return { repos: [], hasMore: false };
  }
};
