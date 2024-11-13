"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const RepositoryCard = ({ repo }) => {
  return (
    <Link href={`/repository/${repo.id}`}>
      <Card className="rounded-lg hover:shadow-lg transition-shadow duration-200 min-h-[20rem]">
        <CardHeader>
          <h2 className="text-xl font-semibold">{repo.name}</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {repo.description || "No description available"}
          </p>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-500">
            <div>Stars: {repo.stargazers_count}</div>
            <div>Forks: {repo.forks_count}</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RepositoryCard;
