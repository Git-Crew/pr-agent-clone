"use client";

import Link from "next/link";

import { siGithub } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const repositories = [
  {
    label: "Agent PR",
    href: "https://github.com/MrSpideyNihal/Pr-agent",
  },
  {
    label: "FixMySlop",
    href: "https://github.com/MrSpideyNihal/FixMySlop",
  },
] as const;

export function GitHubRepositoriesMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" aria-label="Open GitCrew projects on GitHub">
          <SimpleIcon icon={siGithub} className="fill-primary-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {repositories.map((repository) => (
            <DropdownMenuItem key={repository.href} asChild>
              <Link prefetch={false} href={repository.href} target="_blank" rel="noreferrer">
                {repository.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
