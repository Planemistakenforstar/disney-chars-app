import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setFilters, resetFilters } from "@/store/disneySlice";
import { Input, InputLabel, Button, Checkbox, Slider } from "@mui/material";
import { RotateCcw } from "lucide-react";

export const CustomFilterForm = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.disney);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  const handleTvShowsChange = (event: Event, value: number[]) => {
    console.log(event);
    dispatch(setFilters({ minTvShows: value[0] }));
  };

  const handleVideoGamesChange = (event: Event, value: number[]) => {
    console.log(event);
    dispatch(setFilters({ minVideoGames: value[0] }));
  };

  const handleAlliesChange = (checked: boolean) => {
    console.log(event);

    dispatch(setFilters({ hasAllies: checked }));
  };

  const handleEnemiesChange = (checked: boolean) => {
    dispatch(setFilters({ hasEnemies: checked }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="disney-card p-6">
      <div className="flex items-center justify-center mb-6">
        <Button
          variant="text"
          size="small"
          onClick={handleReset}
          className="text-muted-foreground hover:text-primary"
        >
          <RotateCcw className="w-5 h-5 mx-2 mt-2" />
          Reset
        </Button>
        <h2 className="text-lg font-semibold flex gap-2 text-blue-400">
          Filter Characters
        </h2>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="grid grid-cols-2 gap-6">
          <Input
            id="search"
            type="text"
            placeholder="Search characters by name..."
            value={filters.search}
            onChange={handleSearchChange}
            className=" !border-blue-300 !text-blue-500"
          />{" "}
        </div>

        {/* TV Shows Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-blue-400">
              <InputLabel className="text-blue-400 text-sm font-medium !text-blue-500">
                Min TV Shows
              </InputLabel>
              <span className="text-sm text-primary font-semibold">
                {filters.minTvShows}
              </span>
            </div>
            <Slider
              value={[filters.minTvShows]}
              onChange={handleTvShowsChange}
              max={20}
              step={1}
              className="w-full border-blue-300"
            />
          </div>

          {/* Video Games Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <InputLabel className="text-sm font-medium !text-blue-500">
                Min Video Games
              </InputLabel>
              <span className="text-sm font-semibold !text-blue-500">
                {filters.minVideoGames}
              </span>
            </div>
            <Slider
              value={[filters.minVideoGames]}
              onChange={handleVideoGamesChange}
              max={20}
              step={1}
              className="w-full border-blue-300 !text-blue-500"
            />
          </div>
        </div>

        {/* Checkboxes */}
        {/* Mobile: stacked, Desktop: side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {/* Has Allies */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="hasAllies"
              checked={filters.hasAllies}
              onChange={event => handleAlliesChange(event.target.checked)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <InputLabel
              htmlFor="hasAllies"
              className="text-sm font-medium cursor-pointer !text-blue-500 border-blue-500 "
            >
              Has Allies
            </InputLabel>
          </div>

          {/* Has Enemies */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="hasEnemies"
              checked={filters.hasEnemies}
              onChange={event => handleEnemiesChange(event.target.checked)}
              className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <InputLabel
              htmlFor="hasEnemies"
              className="text-sm font-medium cursor-pointer !text-blue-500"
            >
              Has Enemies
            </InputLabel>
          </div>
        </div>
      </div>
    </div>
  );
};
