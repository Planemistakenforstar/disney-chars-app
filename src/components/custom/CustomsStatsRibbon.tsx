import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";
import { Users, Tv, Gamepad2, Film, Sparkles } from "lucide-react";

export const CustomStatsRibbon = () => {
  const { filteredCharacters, characters } = useAppSelector(
    state => state.disney,
  );

  const stats = useMemo(() => {
    const totalTvShows = filteredCharacters.reduce(
      (acc, char) => acc + char.tvShows.length,
      0,
    );
    const totalVideoGames = filteredCharacters.reduce(
      (acc, char) => acc + char.videoGames.length,
      0,
    );
    const totalFilms = filteredCharacters.reduce(
      (acc, char) => acc + char.films.length,
      0,
    );
    const withAllies = filteredCharacters.filter(
      char => char.allies.length > 0,
    ).length;

    return { totalTvShows, totalVideoGames, totalFilms, withAllies };
  }, [filteredCharacters]);

  const statItems = [
    {
      icon: Users,
      label: "Characters",
      value: filteredCharacters.length,
      total: characters.length,
    },
    { icon: Film, label: "Film Appearances", value: stats.totalFilms },
    { icon: Tv, label: "TV Appearances", value: stats.totalTvShows },
    { icon: Gamepad2, label: "Game Appearances", value: stats.totalVideoGames },
    { icon: Sparkles, label: "With Allies", value: stats.withAllies },
  ];

  return (
    <div className="p-4 mb-6 text-blue-400">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statItems.map(({ icon: Icon, label, value, total }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            <div className="p-2 rounded-lg bg-primary/20">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">
                {value.toLocaleString()}
                {total && (
                  <span className="text-sm font-normal text-muted-foreground">
                    /{total}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
