import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { DisneyCharacter } from "@/types/disney";

import {
  setSortDirection,
  setSelectedCharacter,
  setModalOpen,
  setCurrentPage,
  setItemsPerPage,
} from "@/store/disneySlice";

import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Badge,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Tv,
  Gamepad2,
  Users,
  Swords,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 200, 500];

export const CustomCharacterTable = () => {
  const dispatch = useAppDispatch();
  const {
    filteredCharacters,
    loading,
    currentPage,
    itemsPerPage,
    sortDirection,
  } = useAppSelector(state => state.disney);

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCharacters = filteredCharacters.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleViewDetails = (character: DisneyCharacter) => {
    dispatch(setSelectedCharacter(character));
    dispatch(setModalOpen(true));
  };

  const handlePageSizeChange = (value: number) => {
    dispatch(setItemsPerPage(Number(+value)));
  };

  const getSortIcon = () => {
    if (sortDirection === "asc") return <ArrowUp className="w-4 h-4" />;
    if (sortDirection === "desc") return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  const handleSortToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (sortDirection === null) {
      dispatch(setSortDirection("asc"));
    } else if (sortDirection === "asc") {
      dispatch(setSortDirection("desc"));
    } else {
      dispatch(setSortDirection(null));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (loading) {
    return (
      <div className="disney-card p-8">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-lg text-muted-foreground">
            Loading Disney magic...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="p-2 border-border bg-secondary/30 text-center">
        <h2 className="text-xl font-semibold gap-2 !text-blue-500">
          Disney Characters
        </h2>
      </div>
      <div className="text-center gap-2 my-5">
        <span className="text-sm !text-blue-500">Show:</span>
        <FormControl size="small" className="w-24">
          <Select
            value={itemsPerPage}
            onChange={e => handlePageSizeChange(e.target.value)}
            className="bg-background !border-blue-500 border-2 !text-blue-500"
          >
            {PAGE_SIZE_OPTIONS.map(size => (
              <MenuItem key={size} value={size} className="!text-blue-500">
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <span className="text-sm !text-blue-500">per page</span>
      </div>

      <div className="overflow-x-auto">
        <Table className="h-32 w-32 bg-blue-200 rounded-3xl">
          <TableHead>
            {/* TableRow inside TableHead */}
            <TableRow>
              {/* Use TableCell for individual header cells, NOT TableHead */}
              <TableCell className="font-semibold text-white !text-blue-500">
                <Button
                  onClick={handleSortToggle}
                  className="flex items-center gap-1 hover:bg-primary/20 hover:text-primary -ml-2"
                >
                  Character Name
                  {getSortIcon()}
                </Button>
                {/**TODO */}
                {/* <Button onClick={handleAscDescOrder}>Close</Button> */}
              </TableCell>
              <TableCell className="font-semibold !text-blue-500">
                <div className="flex items-center gap-1">
                  <Tv className="w-4 h-4" />
                  TV Shows
                </div>
              </TableCell>
              <TableCell className="font-semibold !text-blue-500">
                <div className="flex items-center gap-1">
                  <Gamepad2 className="w-4 h-4" />
                  Video Games
                </div>
              </TableCell>
              <TableCell className="font-semibold !text-blue-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Allies
                </div>
              </TableCell>
              <TableCell className="font-semibold !text-blue-500">
                <div className="flex items-center gap-1">
                  <Swords className="w-4 h-4" />
                  Enemies
                </div>
              </TableCell>
              <TableCell className="font-semibold text-primary !text-blue-500">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedCharacters.map(character => (
              <TableRow
                key={character._id}
                className="hover:bg-secondary/20 transition-colors cursor-pointer"
                onClick={() => handleViewDetails(character)}
              >
                <TableCell className="font-medium !text-blue-500">
                  {character.name}
                </TableCell>
                <TableCell className="font-medium !text-blue-500">
                  <Badge className="bg-accent/20 text-accent-foreground">
                    {character.tvShows.length}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium !text-blue-500">
                  <Badge className="bg-primary/20 text-primary">
                    {character.videoGames.length}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium !text-blue-500">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {character.allies.length > 0 ? (
                      character.allies.slice(0, 2).map((ally, idx) => (
                        <Badge
                          key={idx}
                          className="text-xs border-green-500/50 text-green-400"
                        >
                          {ally}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        None
                      </span>
                    )}
                    {character.allies.length > 2 && (
                      <Badge className="text-xs">
                        +{character.allies.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium !text-blue-500">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {character.enemies.length > 0 ? (
                      character.enemies.slice(0, 2).map((enemy, idx) => (
                        <Badge
                          key={idx}
                          className="text-xs border-red-500/50 text-red-400"
                        >
                          {enemy}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        None
                      </span>
                    )}
                    {character.enemies.length > 2 && (
                      <Badge className="text-xs">
                        +{character.enemies.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={e => {
                      e.stopPropagation();
                      handleViewDetails(character);
                    }}
                    className="hover:bg-primary/20 hover:text-primary"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-4  flex items-center justify-between bg-secondary/10">
        <span className="text-sm text-muted-foreground text-blue-400">
          Showing {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredCharacters.length)} of{" "}
          {filteredCharacters.length}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outlined"
            size="medium"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-border hover:bg-primary/20 hover:text-primary"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "text" : "outlined"}
                  size="medium"
                  onClick={() => handlePageChange(pageNum)}
                  className={
                    currentPage === pageNum
                      ? "bg-primary text-primary-foreground"
                      : "border-border hover:bg-primary/20"
                  }
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-border hover:bg-primary/20 hover:text-primary"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
