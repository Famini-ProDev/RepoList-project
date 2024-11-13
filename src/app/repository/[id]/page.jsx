import { fetchRepoDetails } from "@/apis/repositoryAction";
import { Button } from "@/components/ui/button";

export default async function Page({ params }) {
  const { id } = params;
  const data = await fetchRepoDetails(id);
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
        <p className="text-lg text-gray-700 mb-6">
          {data.description || "No description available"}
        </p>

        <div className="space-y-3 mb-6">
          <div>
            <strong>Stars:</strong> {data.stargazers_count}
          </div>
          <div>
            <strong>Forks:</strong> {data.forks_count}
          </div>
          <div>
            <strong>Open Issues:</strong> {data.open_issues_count}
          </div>
        </div>
        <Button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200">
          Visit Repository
        </Button>
      </div>
    </div>
  );
}
