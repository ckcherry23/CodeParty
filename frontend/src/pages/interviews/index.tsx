import DifficultySelector from "@/components/common/difficulty-selector";
import { columns } from "@/components/interviews/leaderboard/columns";
import { DataTable } from "@/components/interviews/leaderboard/data-table";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TypographyBodyHeavy,
  TypographyH1,
  TypographyH2,
  TypographySmall,
} from "@/components/ui/typography";
import { useMatchmaking } from "@/hooks/useMatchmaking";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

type Difficulty = "easy" | "medium" | "hard" | "any";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const leaderboardData = [
  {
    displayName: "John Doe",
    attempts: 10,
    photoURL: "https://i.pravatar.cc/300",
  },
  {
    displayName: "Jane Doe",
    attempts: 98,
    photoURL: "https://i.pravatar.cc/300",
  },
  {
    displayName: "John Doe",
    attempts: 1,
    photoURL: "https://i.pravatar.cc/300",
  },
  {
    displayName: "Jane Doe",
    attempts: 132,
    photoURL: "https://i.pravatar.cc/300",
  },
  {
    displayName: "John Doe",
    attempts: 3410,
    photoURL: "https://i.pravatar.cc/300",
  },
  {
    displayName: "Jane Doe",
    attempts: 1340,
    photoURL: "https://i.pravatar.cc/300",
  },
  {
    displayName: "John Doe",
    attempts: 130,
    photoURL: "https://i.pravatar.cc/300",
  },
  {
    displayName: "Jane Doe",
    attempts: 10234,
    photoURL: "https://i.pravatar.cc/300",
  },
];


export default function Interviews() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  const router = useRouter();
  const { joinQueue } = useMatchmaking();

  const onClickSearch = () => {
    try {
      joinQueue([difficulty], "python"); // TODO: update with actual language
      console.log("Joined queue");
      router.push("/interviews/find-match");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-12 mx-auto max-w-7xl">
      <TypographyH1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary w-min mb-1">
        Interviews
      </TypographyH1>

      <TypographyBodyHeavy>
        Try out mock interviews with your peers!
      </TypographyBodyHeavy>

      <div className="flex justify-between">
        <div className="flex-col flex gap-4 mt-12">
          <TypographyH2 className="text-primary">Quick Match</TypographyH2>
          <div>
            <TypographySmall>Choose question difficulty</TypographySmall>
            <DifficultySelector
              onChange={(value) => setDifficulty(value)}
              showAny={true}
              defaultValue={difficulty}
            />
          </div>

          <div>
            <TypographySmall>Choose programming language</TypographySmall>
            <div className="pt-3 pb-10">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[240px] justify-between"
                  >
                    {value
                      ? frameworks.find((framework) => framework.value === value)
                        ?.label
                      : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button onClick={onClickSearch} variant={"default"} className="w-fit px-6">
            Practice with a peer!
          </Button>
        </div>
        <div className="flex-col flex gap-4">
          <TypographyH2 className="text-primary">
            Leaderboard
          </TypographyH2>
          <DataTable columns={columns} data={leaderboardData} />
          <div></div>
        </div>
      </div>
    </div>
  );
}
